import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Strict type checking to prevent NoSQL object injection
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Name, valid email, and message are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 24-hour anti-spam check
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingSubmission = await Contact.findOne({
      email: cleanEmail,
      createdAt: { $gte: twentyFourHoursAgo },
    });

    if (existingSubmission) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already sent a message today. Please try again tomorrow.",
        },
        { status: 429 }
      );
    }

    // Explicitly whitelist fields so `createdAt` or `status` cannot be spoofed
    const newContact = await Contact.create({
      name: name.trim(),
      email: cleanEmail,
      phone: typeof phone === "string" ? phone.trim() : "",
      subject: typeof subject === "string" && subject.trim() ? subject.trim() : "General Inquiry",
      message: message.trim(),
      status: "New",
    });

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    const status = error.name === "ValidationError" ? 400 : 500;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit message" },
      { status }
    );
  }
}