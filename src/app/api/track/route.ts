import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ✅ Proper DB connection function
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
};

// ✅ Schema
const VisitSchema = new mongoose.Schema({
  type: String,
  createdAt: { type: Date, default: Date.now },
});

// ✅ Model
const Visit =
  mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

// ✅ POST request
export async function POST(req: Request) {
  try {
    // 🔥 Ensure DB is connected
    await connectDB();

    const { type } = await req.json();

    await Visit.create({ type });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("TRACK ERROR:", error);
    return NextResponse.json({ success: false });
  }
}