"use client";

import { Monitor, Server, ShoppingCart, Layout, ShieldCheck, Zap } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "Frontend Development", desc: "Interactive and responsive user interfaces using React and Next.js.", icon: Layout },
  { title: "Backend Development", desc: "Secure and scalable server-side architectures using Node.js and Python.", icon: Server },
  { title: "E-Commerce Solutions", desc: "Custom online stores with seamless payment gateway integrations.", icon: ShoppingCart },
  { title: "Web Applications", desc: "Complex, data-driven web apps tailored to your business workflows.", icon: Monitor },
  { title: "Performance Optimization", desc: "Lightning-fast load times and optimized Core Web Vitals.", icon: Zap },
  { title: "Security & Maintenance", desc: "Regular updates, vulnerability checks, and ongoing support.", icon: ShieldCheck },
];

export default function WebDevelopmentPage() {
  
  // Animation Variants for "Slide & Build" Effect
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
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
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section (Automatically gets background zoom & text slide animation) */}
      <HeroSection 
        bgImage="/web-hero-bg.jpg" // public folder mein ek web dev / coding background daal dena
        subtitle="Service Detail"
        title={<>Modern & Scalable <br className="hidden md:block" /> Web Development</>}
        description="We build lightning-fast, highly secure, and exceptionally designed web applications that drive real business growth and engage your users."
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
              At SyncWard Technologies, we don't just build websites; we engineer digital experiences. Whether you need a corporate portal, a high-traffic e-commerce platform, or a complex SaaS product, our full-stack engineering team delivers solutions that are robust, secure, and ready to scale.
            </p>
          </motion.div>

          {/* Sub-Services Grid (With Animations & Hover Effects) */}
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