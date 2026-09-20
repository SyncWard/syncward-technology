"use client";
import { useState } from "react";
import Image from "next/image";

const categories = ["All", "Web Apps", "Mobile Apps", "E-commerce", "Others"];

export default function ProjectGallery({ initialProjects }) {
  const [activeTab, setActiveTab] = useState("All");

  // Filtering Logic
  const filteredProjects = activeTab === "All"
    ? initialProjects
    : initialProjects.filter(project => project.category === activeTab);

  return (
    <>
      {/* Hero Section (Dark Theme with Tabs) */}
      <section className="relative bg-[#030914] pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/work-hero-bg.jpg" // Dark background image save kar lena
            alt="Work Background"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#030914] via-[#030914]/90 to-transparent"></div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <p className="text-[#286ef0] font-bold text-[11px] tracking-widest uppercase mb-4">
            Our Work
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-6 max-w-2xl">
            Projects That Make an Impact
          </h1>
          <p className="text-[#a0aabf] text-[14px] md:text-base font-medium leading-relaxed max-w-xl mb-12">
            Explore some of our recent work and see how we've helped businesses build, grow and succeed.
          </p>

          {/* Filter Tabs Container */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 w-fit p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full text-[12px] md:text-[13px] font-semibold transition-all duration-300 ${
                  activeTab === cat
                    ? "bg-[#286ef0] text-white shadow-md"
                    : "text-[#a0aabf] hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid Section (Light Theme) */}
      <section className="bg-white py-16 md:py-24 flex-grow">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="group cursor-pointer flex flex-col">
                  {/* Project Image Box */}
                  <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  {/* Project Details */}
                  <h3 className="text-[17px] font-bold text-slate-900 mb-1.5 group-hover:text-[#286ef0] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-[13px] font-medium">
                    {project.industry}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-slate-500 text-lg">No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}