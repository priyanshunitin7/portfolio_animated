import { NextResponse } from "next/server";
import { Resend } from "resend";
import mongoose from "mongoose";

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

// ✅ Proper DB connection function
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

// ✅ POST function
export async function POST(req: Request) {
  try {
    // 🔥 Ensure DB is connected
    await connectDB();

    const { name, email, message } = await req.json();

    // ✅ Save to DB
    await Message.create({ name, email, message });

    // ✅ Send email
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "nraj67609@gmail.com",
      subject: "New Portfolio Message 🚀",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return NextResponse.json({ success: false });
  }
}