"use client";

import { PenTool, Layout, Eye, MousePointer2, Layers, MonitorSmartphone } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "User Research & Strategy", desc: "Understanding your audience through deep research to create designs that truly resonate with their needs and behaviors.", icon: Eye },
  { title: "Wireframing & Prototyping", desc: "Low and high-fidelity prototypes to visualize the user journey and validate concepts before development begins.", icon: Layout },
  { title: "Visual UI Design", desc: "Stunning, pixel-perfect interfaces that reflect your brand identity and captivate your users at first glance.", icon: PenTool },
  { title: "Interaction Design", desc: "Engaging micro-interactions and smooth animations that make your digital product feel alive and intuitive.", icon: MousePointer2 },
  { title: "Design Systems", desc: "Comprehensive component libraries and style guides to maintain visual consistency across all your platforms.", icon: Layers },
  { title: "Usability Testing", desc: "Rigorous testing with real users to identify friction points and optimize the overall digital experience.", icon: MonitorSmartphone },
];

export default function UIUXDesignPage() {
  
  // Animation Variants for "Elegant Float & Reveal" Effect
  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, opacity: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section (Already animated) */}
      <HeroSection 
        bgImage="/uiux-hero-bg.jpg" // public folder mein ek design/figma related background daal dena
        subtitle="Service Detail"
        title={<>UI/UX Design & <br className="hidden md:block" /> Strategy</>}
        description="We craft beautiful, intuitive, and human-centric digital experiences that delight users and drive meaningful business results."
      />

      {/* 2. Service Overview & Offerings */}
      <section className="bg-[#f8fafc] py-16 md:py-24 flex-grow overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <motion.div 
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16 max-w-3xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What We Do</h2>
            <p className="text-slate-600 leading-relaxed">
              At SyncWard Technologies, design is more than just aesthetics; it's about solving problems. We bridge the gap between human behavior and technology by designing user interfaces that are not only visually stunning but also highly functional, accessible, and perfectly aligned with your business goals.
            </p>
          </motion.div>

          {/* Sub-Services Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {offerings.map((item, index) => (
              <motion.div 
                variants={cardVariants}
                key={index} 
                className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 bg-[#f0f5ff] rounded-xl flex items-center justify-center text-[#286ef0] mb-6 group-hover:bg-[#286ef0] group-hover:text-white transition-colors duration-300">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-[18px] font-bold text-slate-900 mb-3 group-hover:text-[#286ef0] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Reusable CTA */}
      <section className="bg-[#030914] py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTASection />
        </div>
      </section>

    </div>
  );
}