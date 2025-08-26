// db/connect.js
import mongoose from "mongoose";

let isConnected = false; // cache connection

export const connectDB = async (MONGO_URI) => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected (inngest function).");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};
