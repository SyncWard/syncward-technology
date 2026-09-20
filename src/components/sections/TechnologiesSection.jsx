"use client";
import Image from "next/image";

const technologies = [
  { name: "React", icon: "/tech/react.svg" },
  { name: "Next.js", icon: "/tech/nextdotjs.svg" },
  { name: "Node.js", icon: "/tech/nodejs.svg" },
  { name: "MongoDB", icon: "/tech/mongodb.svg" },
  { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
  { name: "AWS", icon: "/tech/aws.svg" },
  { name: "Tailwind CSS", icon: "/tech/tailwind-css.svg" },
  { name: "Git", icon: "/tech/git.svg" },
  // Nayi Technologies (Inke SVGs public/tech/ folder mein daal dena)
  { name: "TypeScript", icon: "/tech/typescript.svg" },
  { name: "Docker", icon: "/tech/docker.svg" },
  { name: "Kubernetes", icon: "/tech/kubernetes.svg" },
  { name: "Python", icon: "/tech/python.svg" },
  { name: "Firebase", icon: "/tech/firebase.svg" },
  { name: "Figma", icon: "/tech/figma.svg" },
  { name: "GraphQL", icon: "/tech/graphql.svg" },
  { name: "Redis", icon: "/tech/redis.svg" },
];

export default function TechnologiesSection({ showHeader = true }) {
  return (
    <section className={`py-16 md:py-24 overflow-hidden ${showHeader ? 'bg-white border-t border-slate-50' : 'bg-[#f8fafc]'}`}>
      
      {/* Animation Style Inject */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            width: max-content;
          }
        `
      }} />

      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Conditional Header */}
        {showHeader && (
          <div className="mb-12 max-w-2xl">
            <p className="text-[#286ef0] font-bold text-[11px] tracking-widest uppercase mb-3">
              Technologies
            </p>
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4">
              Tools & Technologies We Use
            </h2>
            <p className="text-slate-500 text-[13px] md:text-sm font-medium leading-relaxed">
              We work with modern, industry-leading technologies to build robust, scalable and future-ready solutions.
            </p>
          </div>
        )}
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden flex group mt-8">
        
        {/* Track gradient fade effect edges */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-4 md:gap-6 animate-scroll group-hover:[animation-play-state:paused] px-2 md:px-3">
          {/* Array ko 2 baar map kiya hai seamless loop ke liye */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center py-6 px-4 w-32 md:w-40 shrink-0 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Image 
                  src={tech.icon} 
                  alt={tech.name} 
                  width={48} 
                  height={48} 
                  className="object-contain"
                />
              </div>
              <span className="text-[12px] md:text-[13px] font-semibold text-slate-700 text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}