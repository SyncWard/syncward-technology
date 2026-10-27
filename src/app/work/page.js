import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectGallery from "@/components/sections/ProjectGallery";
import CTASection from "@/components/sections/CTASection";

// Ensure newly published projects from Admin show up immediately
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Work | SyncWard Technologies",
  description:
    "Explore our latest full-stack web applications, mobile apps, AI solutions, and enterprise software case studies.",
};

async function getProjects() {
  try {
    await connectDB();
    // Only fetch Active projects (or legacy projects without a status field)
    const projects = await Project.find({
      status: { $nin: ["Draft", "Archived"] },
    })
      .sort({ featured: -1, createdAt: -1 })
      .lean();

    // Safely serialize MongoDB ObjectIds and Dates for Client Component props
    return projects.map((p) => ({
      _id: p._id.toString(),
      title: p.title || "",
      description: p.description || "",
      category: p.category || "Web Development",
      image: p.image || "",
      techStack: Array.isArray(p.techStack) ? p.techStack : [],
      liveUrl: p.liveUrl || "",
      featured: Boolean(p.featured),
    }));
  } catch (error) {
    console.error("Failed to fetch projects on /work:", error.message);
    return [];
  }
}

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ProjectGallery initialProjects={projects} />
      <CTASection />
    </div>
  );
}