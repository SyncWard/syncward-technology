"use client";

import { Code2, Building2, Cloud, RefreshCw, Network, CheckCircle } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "Enterprise Software", desc: "Robust and scalable applications designed to streamline complex corporate workflows and improve productivity.", icon: Building2 },
  { title: "SaaS Development", desc: "End-to-end development of Software-as-a-Service products with multi-tenant architectures and subscription models.", icon: Cloud },
  { title: "Legacy Modernization", desc: "Upgrade and migrate outdated systems to modern, cloud-based technologies without losing critical data.", icon: RefreshCw },
  { title: "API Development", desc: "Secure and well-documented APIs to seamlessly connect your software with third-party services and mobile apps.", icon: Network },
  { title: "CRM & ERP Solutions", desc: "Custom-built resource planning and customer management systems tailored exactly to how your business operates.", icon: Code2 },
  { title: "Quality Assurance", desc: "Rigorous automated and manual testing to ensure your software is bug-free, secure, and performs flawlessly.", icon: CheckCircle },
];

export default function CustomSoftwarePage() {
  
  // Animation Variants for "Structured Block Build-Up" Effect
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section (Already animated) */}
      <HeroSection 
        bgImage="/software-hero-bg.jpg" // public folder mein ek tech/code background daal dena
        subtitle="Service Detail"
        title={<>Custom Software <br className="hidden md:block" /> Development</>}
        description="We build scalable, secure, and bespoke software solutions designed to solve your most complex business challenges and streamline operations."
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
              At SyncWard Technologies, we don't believe in one-size-fits-all. We architect and develop custom software applications from the ground up, ensuring they perfectly align with your business processes, scale effortlessly as you grow, and integrate seamlessly with your existing digital infrastructure.
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