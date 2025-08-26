import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";
import analyzeTicket from "../../utils/ai.js";
import { connectDB } from "../../utils/db.js"; 

export const onTicketCreated = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
      // connect to MongoDB
      await connectDB(process.env.MONGO_URI);

      const { ticketId } = event?.data;

      // fetch ticket
      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);
        if (!ticketObject) throw new NonRetriableError("Ticket not found");
        return ticketObject;
      });

      // initialize status
      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, { status: "TODO" });
      });

      // run AI
      const aiResponse = await analyzeTicket(ticket);

      const relatedSkills = await step.run("ai-processing", async () => {
        let skills = [];
        if (aiResponse) {
          const validPriorities = ["low", "medium", "high"];
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: validPriorities.includes(aiResponse?.priority?.toLowerCase())
              ? aiResponse.priority.toLowerCase()
              : "medium",
            description: aiResponse?.description,
            status: "IN_PROGRESS",
            relatedSkills: aiResponse?.relatedSkills || [],
          });
          skills = aiResponse?.relatedSkills || [];
        }
        return skills;
      });

      // assign user
      const moderator = await step.run("assign-moderator", async () => {
        let user = await User.findOne({
          role: "moderator",
          skills: { $elemMatch: { $regex: relatedSkills.join("|"), $options: "i" } },
        });
        if (!user) user = await User.findOne({ role: "admin" });

        await Ticket.findByIdAndUpdate(ticket._id, {
          assignedTo: user?._id || null,
        });
        return user;
      });

      // send email
      await step.run("send-email-notification", async () => {
        if (moderator) {
          const finalTicket = await Ticket.findById(ticket._id);
          await sendMail(
            moderator.email,
            "Ticket Assigned",
            `A new ticket has been assigned to you: ${finalTicket.title}`
          );
        }
      });

      return { success: true };
    } catch (error) {
      console.error("Error running ticket:", error?.message);
      return { success: false };
    }
  }
);
