import { NextResponse } from "next/server";
import mongoose from "mongoose";

// DB connect
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
};

// Schema
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// Model
const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

// POST
export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    await Message.create({ name, email, message });

    // ✅ Import INSIDE function (CRITICAL)
    const { Resend } = await import("resend");

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Debug
    console.log("RESEND KEY:", process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "Nitin Portfolio <onboarding@resend.dev>",
      to: ["nraj67609@gmail.com"],
      subject: "New Portfolio Message 🚀",
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    console.log("EMAIL RESPONSE:", response);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return NextResponse.json({ success: false });
  }
}