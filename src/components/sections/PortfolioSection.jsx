import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

const FALLBACK_PROJECTS = [
  {
    _id: "fallback-1",
    title: "Enterprise FinTech Analytics",
    category: "Web Application",
    description:
      "Real-time financial telemetry dashboard and automated reporting engine for high-volume transactions.",
    image: "",
    techStack: ["Next.js", "Node.js", "Tailwind CSS"],
    liveUrl: "/work",
  },
  {
    _id: "fallback-2",
    title: "AI Workflow & RAG Copilot",
    category: "Cloud & AI",
    description:
      "Autonomous document intelligence and multi-agent workflow automation built for enterprise operations.",
    image: "",
    techStack: ["Python", "FastAPI", "LangGraph"],
    liveUrl: "/work",
  },
  {
    _id: "fallback-3",
    title: "Omnichannel E-Commerce Suite",
    category: "E-Commerce",
    description:
      "High-conversion storefront with dynamic inventory sync, fast checkout, and custom admin analytics.",
    image: "",
    techStack: ["Next.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "/work",
  },
  {
    _id: "fallback-4",
    title: "Healthcare Portal & Booking System",
    category: "Custom Software",
    description:
      "Centralized hospital discovery and patient management platform engineered for scale and reliability.",
    image: "",
    techStack: ["React", "Supabase", "Vercel"],
    liveUrl: "/work",
  },
];

async function getFeaturedProjects() {
  try {
    await connectDB();
    const docs = await Project.find({
      status: { $nin: ["Draft", "Archived"] },
    })
      .sort({ featured: -1, createdAt: -1 })
      .limit(4)
      .lean();

    if (!docs || docs.length === 0) return FALLBACK_PROJECTS;

    return docs.map((p) => ({
      _id: p._id.toString(),
      title: p.title,
      category: p.category,
      description: p.description,
      image: p.image,
      techStack: Array.isArray(p.techStack) ? p.techStack : [],
      liveUrl: p.liveUrl || "",
    }));
  } catch (error) {
    console.error("PortfolioSection DB fetch fallback:", error.message);
    return FALLBACK_PROJECTS;
  }
}

export default async function PortfolioSection() {
  const projects = await getFeaturedProjects();

  return (
    <section className="bg-[#030914] py-16 sm:py-20 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-[#1d64ff] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 md:mb-4">
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#286ef0] to-[#5b8def]">
                Projects.
              </span>
            </h2>
          </div>

          <Link href="/work" className="hidden md:inline-block">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-base font-semibold bg-transparent transition-all cursor-pointer"
            >
              View All Work <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((project) => {
            const isExternal = project.liveUrl?.startsWith("http");
            return (
              <div
                key={project._id}
                className="group relative rounded-3xl overflow-hidden bg-[#0a1224] border border-white/10 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-[240px] sm:h-[320px] lg:h-[360px] w-full overflow-hidden bg-slate-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1d64ff]/25 via-[#0a1224] to-[#030914] flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#286ef0] mb-3">
                        <Code2 size={28} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                        {project.category}
                      </span>
                    </div>
                  )}

                  {/* Desktop Hover Overlay */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={`View ${project.title}`}
                      className="absolute inset-0 bg-[#030914]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden md:flex items-center justify-center"
                    >
                      <div className="bg-[#286ef0] text-white p-4 rounded-full translate-y-6 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <ExternalLink size={22} />
                      </div>
                    </a>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-8 relative z-30 bg-[#0a1224] flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="text-[#286ef0] text-xs sm:text-sm font-semibold">
                        {project.category}
                      </p>
                      {/* Mobile-friendly tap link for Android & iOS */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="md:hidden inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white"
                        >
                          Open <ExternalLink size={13} />
                        </a>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-[#286ef0] transition-colors">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-[#a0aabf] text-sm line-clamp-2 mb-5">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden">
          <Link href="/work" className="block w-full">
            <Button className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-full py-6 text-base font-semibold transition-all">
              View All Work <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}