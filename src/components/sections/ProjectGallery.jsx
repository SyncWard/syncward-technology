"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";

export default function ProjectGallery({ initialProjects = [] }) {
  const [activeTab, setActiveTab] = useState("All");

  // Dynamically build category tabs from actual projects so filters never mismatch
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      initialProjects.map((p) => p.category).filter(Boolean)
    );
    return ["All", ...Array.from(uniqueCategories)];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return initialProjects;
    return initialProjects.filter((project) => project.category === activeTab);
  }, [initialProjects, activeTab]);

  return (
    <>
      {/* Hero Section (Dark Theme with Mobile-Friendly Filter Bar) */}
      <section className="relative bg-[#030914] pt-28 pb-14 md:pt-40 md:pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background/work-hero-bg.jpg"
            alt="SyncWard Work Background"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#030914] via-[#030914]/90 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-[#286ef0] font-bold text-[11px] tracking-widest uppercase mb-3 md:mb-4">
            Our Work
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-4 md:mb-6 max-w-2xl">
            Projects That Make an Impact
          </h1>
          <p className="text-[#a0aabf] text-sm md:text-base font-medium leading-relaxed max-w-xl mb-8 md:mb-12">
            Explore our recent engineering deliverables and see how we help
            businesses build, scale, and succeed across web, mobile, and AI.
          </p>

          {/* Horizontal Scrollable Filter Tabs for Android & iOS */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full bg-white/5 w-fit p-1.5 rounded-2xl sm:rounded-full border border-white/10 backdrop-blur-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs md:text-[13px] font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    activeTab === cat
                      ? "bg-[#286ef0] text-white shadow-md"
                      : "text-[#a0aabf] hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="bg-white py-14 md:py-24 flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project._id || project.id}
                  className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image Box */}
                    <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden border-b border-slate-100">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Layers size={32} />
                        </div>
                      )}
                      <span className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#286ef0] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-5">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-50 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live Link Footer (Accessible on Desktop, Android & iOS) */}
                  {project.liveUrl && (
                    <div className="px-6 pb-6 pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#286ef0] hover:text-[#1d5ce0] transition-colors"
                      >
                        View Live Project <ArrowUpRight size={16} />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 max-w-md mx-auto">
              <div className="w-14 h-14 bg-blue-50 text-[#286ef0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layers size={26} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                New Case Studies Coming Soon
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                We are currently documenting our latest client deployments. Get
                in touch to see a live demo tailored to your industry.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#286ef0] hover:bg-[#1d5ce0] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
              >
                Request a Demo
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}