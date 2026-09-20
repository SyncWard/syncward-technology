import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

// 1. Saari leads fetch karne ke liye (Admin Panel ke liye)
export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }); // Nayi lead sabse upar dikhegi
    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 2. Naya message save karne ke liye (Anti-spam 24-hr limit ke sath)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check karo ki pichle 24 ghante mein is email se message aaya hai ya nahi
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const existingSubmission = await Contact.findOne({
      email: cleanEmail,
      createdAt: { $gte: twentyFourHoursAgo }
    });

    if (existingSubmission) {
      return NextResponse.json(
        { 
          success: false, 
          error: "You have already sent a message today. Please try again tomorrow." 
        }, 
        { status: 429 }
      );
    }
    
    const newContact = await Contact.create({
      ...body,
      email: cleanEmail
    });
    
    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}