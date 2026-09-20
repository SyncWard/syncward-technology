"use client";

import { Wrench, ShieldCheck, Activity, LifeBuoy, Clock, ArrowUpCircle } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "24/7 Monitoring", desc: "Continuous proactive monitoring of your applications and infrastructure to detect and resolve issues before they impact users.", icon: Clock },
  { title: "Security Patching", desc: "Regular security audits and prompt application of patches to protect your digital assets from the latest vulnerabilities.", icon: ShieldCheck },
  { title: "Bug Fixes & Troubleshooting", desc: "Rapid response to technical glitches, ensuring minimal downtime and a seamless experience for your end-users.", icon: Wrench },
  { title: "Performance Optimization", desc: "Ongoing code and database optimization to ensure your software remains lightning-fast even as user traffic scales.", icon: Activity },
  { title: "Feature Upgrades", desc: "Seamless integration of new features and functionalities to keep your product competitive and aligned with market trends.", icon: ArrowUpCircle },
  { title: "Dedicated Tech Support", desc: "Access to a reliable team of engineers ready to assist you with technical queries, server management, and system administration.", icon: LifeBuoy },
];

export default function MaintenanceSupportPage() {
  
  // Animation Variants for "Steady & Reliable" Effect
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section (Already animated) */}
      <HeroSection 
        bgImage="/maintenance-hero-bg.jpg" // public folder mein server ya IT support ka background daal dena
        subtitle="Service Detail"
        title={<>Maintenance & <br className="hidden md:block" /> IT Support</>}
        description="Ensure your digital assets remain secure, up-to-date, and perform optimally with our comprehensive maintenance and dedicated support services."
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
              At SyncWard Technologies, our relationship doesn't end at launch. We provide ongoing maintenance and dedicated support to keep your software running smoothly. From routine security updates to complex system upgrades, we manage the technical heavy lifting so you can focus entirely on growing your core business.
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