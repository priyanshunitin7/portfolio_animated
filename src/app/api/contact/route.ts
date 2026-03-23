import { NextResponse } from "next/server";
import { Resend } from "resend";
import mongoose from "mongoose";

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

// ✅ DB Connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
};

// ✅ Schema
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// ✅ Model
const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

// ✅ POST API
export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    // ✅ Save to DB
    await Message.create({ name, email, message });

    // 🔥 SEND EMAIL (FIXED)
    const response = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "nraj67609@gmail.com",
  subject: "New Portfolio Message 🚀",
  replyTo: email, // ✅ FIXED
  html: `
    <h3>New Message</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b> ${message}</p>
  `,
});

    console.log("EMAIL RESPONSE:", response); // 🔍 debug log

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return NextResponse.json({ success: false });
  }
}