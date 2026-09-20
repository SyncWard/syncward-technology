import Image from "next/image";
import { Target, Eye, Rocket, CheckCircle2 } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "About Us | SyncWard Technologies",
  description: "Learn about our mission, vision, and the team behind SyncWard Technologies.",
};

const teamMembers = [
  {
    name: "Vishnu Survase",
    role: "Founder & CEO",
    image: "/team/lead.svg", // public/team/ folder me image daal dena
  },
  {
    name: "Shubham Tade",
    role: "Chief Technology Officer & AI ML Engineer",
    image: "/team/project-manager.svg",
  },
  {
    name: "Venkat Birajdar",
    role: "Digital marketing Associate",
    image: "/team/ui-ux-design.svg",
  },
  {
    name: "Rohan Mehta",
    role: "Lead Developer",
    image: "/team/full-stack-engineer.svg",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Compact Hero Section */}
      <HeroSection 
        bgImage="/background/about-hero-bg.jpg" // public folder mein corporate/office ki dark image rakh lena
        subtitle="About SyncWard"
        title={<>Innovating the Future of <br className="hidden md:block" /> Digital Business</>}
        description="We are a team of passionate technologists, designers, and strategists dedicated to delivering exceptional digital solutions."
      />

      {/* 2. Our Story Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-slate-900 leading-[1.2] mb-6">
              Our Journey Started With a Simple Idea
            </h2>
            <div className="text-slate-600 text-[14px] md:text-[15px] leading-relaxed space-y-5">
              <p>
                Founded with a vision to bridge the gap between complex technology and business growth, SyncWard Technologies started as a small team of tech enthusiasts. Today, we have grown into a full-service technology agency.
              </p>
              <p>
                We believe that great software is not just about writing code; it's about solving real-world problems. Over the years, we have partnered with startups and enterprises alike to architect scalable web apps, design intuitive interfaces, and deploy reliable cloud infrastructures.
              </p>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-slate-100">
              <div>
                <h4 className="text-4xl font-bold text-[#286ef0] mb-2">50+</h4>
                <p className="text-slate-500 text-sm font-medium">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-[#286ef0] mb-2">99%</h4>
                <p className="text-slate-500 text-sm font-medium">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-100 group">
            <Image 
              src="/our-story.png" // Team discussion ya office ki image
              alt="Our Story"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Overlay Gradient for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="bg-[#f8fafc] py-16 md:py-24 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#f0f5ff] rounded-xl flex items-center justify-center text-[#286ef0] mb-6">
                <Target size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                To empower businesses globally by delivering high-quality, scalable, and innovative technology solutions. We strive to be the trusted technology partner that organizations rely on to navigate their digital transformation journey seamlessly.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#f0f5ff] rounded-xl flex items-center justify-center text-[#286ef0] mb-6">
                <Eye size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                To be at the forefront of technological innovation, constantly pushing boundaries to create software that not only meets today's needs but anticipates tomorrow's challenges. We envision a future where technology makes business operations effortless.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Team Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4">Meet The Team</h2>
            <p className="text-slate-500 text-[14px] md:text-base">
              The brilliant minds behind SyncWard Technologies. Our diverse team of experts is united by a shared passion for problem-solving and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 border-[#f8fafc] shadow-lg group-hover:border-[#286ef0]/20 transition-colors duration-300">
                  {/* Agar image nahi mili toh ek default empty state aayega Next.js ki wajah se, isliye images zaroor daalna */}
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-[18px] font-bold text-slate-900 mb-1 group-hover:text-[#286ef0] transition-colors">
                  {member.name}
                </h4>
                <p className="text-[#a0aabf] text-[13px] font-medium uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Reusable CTA */}
      <section className="bg-[#030914] py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTASection />
        </div>
      </section>

    </div>
  );
}