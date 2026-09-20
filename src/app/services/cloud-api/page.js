"use client";

import { Cloud, Network, Database, Server, ShieldCheck, Workflow } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "Cloud Migration", desc: "Smoothly transition your legacy systems to modern cloud infrastructures (AWS, Azure, GCP) with zero downtime and data loss.", icon: Cloud },
  { title: "Custom API Development", desc: "Build secure, RESTful, and GraphQL APIs to enable seamless communication between your internal systems and external apps.", icon: Network },
  { title: "Third-Party Integration", desc: "Connect your software with essential third-party services like payment gateways, CRMs, social platforms, and marketing tools.", icon: Workflow },
  { title: "Cloud Architecture & DevOps", desc: "Design highly available, auto-scaling architectures and implement CI/CD pipelines for faster, more reliable software delivery.", icon: Server },
  { title: "Microservices", desc: "Break down monolithic applications into agile, independently deployable microservices that are easier to scale and maintain.", icon: Database },
  { title: "Cloud Security & Monitoring", desc: "Implement robust security protocols, identity management, and 24/7 monitoring to protect your cloud assets from threats.", icon: ShieldCheck },
];

export default function CloudApiPage() {
  
  // Animation Variants for Cloud & API Data Flow Effect
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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
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
      
      {/* 1. Reusable Hero Section */}
      <HeroSection 
        bgImage="/cloud-hero-bg.jpg" // public folder mein cloud computing ka background daal dena
        subtitle="Service Detail"
        title={<>Cloud & API <br className="hidden md:block" /> Integration</>}
        description="We build secure, scalable cloud architectures and connect disparate systems through robust APIs to create a unified, highly efficient digital ecosystem."
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
              At SyncWard Technologies, we eliminate data silos and modernise your IT infrastructure. Whether you are migrating to the cloud for better scalability, building custom APIs to share data securely, or automating deployments through DevOps, our solutions ensure your systems communicate flawlessly and perform reliably under any load.
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