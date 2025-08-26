import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant for technical support tickets.
      Respond ONLY in valid JSON. No markdown or extra formatting.
      Format:
      {
        "title": "...",
        "summary": "...",
        "priority": "low|medium|high",
        "description": "...",
        "relatedSkills": ["React", "Node.js"]
      }`,
        });

      const response = await supportAgent.run(`
        Analyze the ticket and respond ONLY in strict JSON:
        - Title: ${ticket.title}
        - Description: ${ticket.description}
      `);

    // extract response
    let raw = response.output?.[0]?.content?.trim() || "";
    if (!raw) {
      console.log("AI returned empty response");
      return {
        summary: "",
        priority: "medium",
        description: "",
        relatedSkills: [],
      };
    }

  // remove ```json ... ``` backticks
  const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
  const jsonString = match ? match[1] : raw;

  try {
    const parsed = JSON.parse(jsonString);
    console.log("AI response:", parsed);
    return parsed;
  } catch (e) {
    console.log("Failed to parse:", jsonString, e.message);
    return {
      summary: "",
      priority: "medium",
      description: "",
      relatedSkills: [],
    };
  }
};

export default analyzeTicket;
