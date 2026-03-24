import { NextResponse } from "next/server";
import mongoose from "mongoose";

// connect DB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "portfolio-db", // 🔥 FIX
    });
  }
};

// ✅ DEFINE SCHEMAS AGAIN (IMPORTANT)
const VisitSchema = new mongoose.Schema({
  type: String,
  createdAt: { type: Date, default: Date.now },
});

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// ✅ CREATE MODELS SAFELY
const Visit =
  mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

// ✅ API
export async function GET() {
  try {
    await connectDB();

    const visits = await Visit.countDocuments({ type: "visit" });
    const github = await Visit.countDocuments({ type: "github_click" });
    const linkedin = await Visit.countDocuments({ type: "linkedin_click" });
    const cv = await Visit.countDocuments({ type: "cv_download" });
    const messages = await Message.countDocuments();

   return NextResponse.json({
  visits: visits || 0,
  github: github || 0,
  linkedin: linkedin || 0,
  cv: cv || 0,
  messages: messages || 0,
});

  } catch (error) {
  console.error("ADMIN ERROR:", error);
  return NextResponse.json({
    visits: 0,
    github: 0,
    linkedin: 0,
    cv: 0,
    messages: 0,
  });
}
}