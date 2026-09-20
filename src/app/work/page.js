import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Server component to fetch fresh projects from MongoDB
async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export const metadata = {
  title: "Our Work | SyncWard Technologies",
  description: "Explore our latest projects and digital solutions.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Recent Work</h1>
          <p className="text-slate-500 text-sm md:text-base">
            Discover how we build scalable, high-performance web applications and digital experiences for our clients.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>No projects found. Add some from the admin panel!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project._id.toString()} 
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative w-full h-[220px] bg-slate-100 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block bg-[#f0f5ff] text-[#286ef0] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack?.map((tech, index) => (
                        <span key={index} className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-md border border-slate-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                {project.liveUrl && (
                  <div className="px-6 pb-6 pt-0">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center text-sm font-bold text-[#286ef0] hover:text-[#1d5ce0] transition-colors"
                    >
                      View Live Project <ArrowRight size={16} className="ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}