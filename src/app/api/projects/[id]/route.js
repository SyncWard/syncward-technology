import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 });
    }

    const body = await req.json();
    const updateData = {};

    if (body.title !== undefined) updateData.title = String(body.title).trim();
    if (body.description !== undefined) updateData.description = String(body.description).trim();
    if (body.category !== undefined) updateData.category = String(body.category).trim();
    if (body.image !== undefined) updateData.image = String(body.image).trim();
    if (body.liveUrl !== undefined) updateData.liveUrl = String(body.liveUrl).trim();
    if (body.featured !== undefined) updateData.featured = Boolean(body.featured);
    if (["Active", "Draft", "Archived"].includes(body.status)) {
      updateData.status = body.status;
    }

    if (body.techStack !== undefined) {
      updateData.techStack = Array.isArray(body.techStack)
        ? body.techStack.map((t) => String(t).trim()).filter(Boolean)
        : String(body.techStack)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}