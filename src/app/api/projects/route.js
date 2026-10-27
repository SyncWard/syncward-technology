import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const query = statusFilter ? { status: statusFilter } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { title, description, category, image, techStack, liveUrl, status, featured } = body;

    if (!title || !description || !category || !image) {
      return NextResponse.json(
        { success: false, error: "Title, description, category, and image are required." },
        { status: 400 }
      );
    }

    const parsedTechStack = Array.isArray(techStack)
      ? techStack.map((t) => String(t).trim()).filter(Boolean)
      : typeof techStack === "string"
      ? techStack.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const project = await Project.create({
      title: String(title).trim(),
      description: String(description).trim(),
      category: String(category).trim(),
      image: String(image).trim(),
      techStack: parsedTechStack,
      liveUrl: liveUrl ? String(liveUrl).trim() : "",
      status: ["Active", "Draft", "Archived"].includes(status) ? status : "Active",
      featured: Boolean(featured),
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    const status = error.name === "ValidationError" ? 400 : 500;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
      { status }
    );
  }
}