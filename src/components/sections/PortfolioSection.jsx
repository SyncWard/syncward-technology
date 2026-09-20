import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web Application",
    image: "/project-1.jpg", // Replace with your image
    tags: ["React", "Node.js", "Tailwind"],
  },
  {
    id: 2,
    title: "Health & Fitness App",
    category: "Mobile App",
    image: "/project-2.jpg", // Replace with your image
    tags: ["React Native", "Firebase"],
  },
  {
    id: 3,
    title: "Global E-Commerce",
    category: "E-commerce Solution",
    image: "/project-3.jpg", // Replace with your image
    tags: ["Next.js", "Stripe", "MongoDB"],
  },
  {
    id: 4,
    title: "AI CRM Platform",
    category: "SaaS Product",
    image: "/project-4.jpg", // Replace with your image
    tags: ["Python", "AWS", "Vue.js"],
  },
];

export default function PortfolioSection() {
  return (
    <section className="bg-[#030914] py-20 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-[#1d64ff] font-bold text-sm tracking-widest uppercase mb-4">
              Our Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#286ef0] to-[#5b8def]">Projects.</span>
            </h2>
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-base font-semibold bg-transparent transition-all hidden md:flex">
            View All Work <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-3xl overflow-hidden bg-[#0a1224] border border-white/10">
              {/* Image Container with Hover Zoom */}
              <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden bg-slate-800">
                {/* Fallback gradient if no image is present */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1d64ff]/20 to-[#030914] z-0"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/30 z-10 group-hover:opacity-0 transition-opacity">
                  [ Image Placeholder: {project.image} ]
                </div>
                
                {/* Uncomment <Image> tag when you have real images */}
                {/* <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out z-10"
                /> */}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[#030914]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                  <div className="bg-[#286ef0] text-white p-4 rounded-full translate-y-8 group-hover:translate-y-0 transition-all duration-300">
                    <ExternalLink size={24} />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 relative z-30 bg-[#0a1224]">
                <p className="text-[#a0aabf] text-sm font-medium mb-3">{project.category}</p>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-[#286ef0] transition-colors">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Button */}
        <Button className="w-full mt-10 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-full py-6 text-base font-semibold transition-all md:hidden">
          View All Work <ArrowRight size={18} className="ml-2" />
        </Button>

      </div>
    </section>
  );
}