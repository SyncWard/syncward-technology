"use client";

import { Monitor, Smartphone, PenTool, ShoppingCart, Cloud, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const services = [
  { title: "Web Development", desc: "Architecting high-performance, responsive web platforms and distributed frontend systems built for scale.", icon: Monitor, link: "/services/web-development" },
  { title: "Mobile Apps", desc: "Building resilient iOS and Android applications with offline-first synchronization, real-time data streaming, and native device performance.", icon: Smartphone, link: "/services/mobile-apps" },
  { title: "UI/UX Design", desc: "Crafting unified enterprise dashboards, data visualization interfaces, and intuitive human-in-the-loop workflows for our AI-driven software platforms.", icon: PenTool, link: "/services/ui-ux-design" },
  { title: "E-commerce Solutions", desc: "Developing LLM-powered semantic search, intelligent recommendation engines, and automated inventory forecasting models for digital commerce infrastructure.", icon: ShoppingCart, link: "/services/e-commerce" },
  { title: "Cloud & DevOps", desc: "Deploying automated CI/CD pipelines, secure API infrastructure, and high-availability cloud environments to support heavy AI workloads.", icon: Cloud, link: "/services/cloud-api" },
  { title: "AI & Automation", desc: "Smart AI integrations and workflow automation to streamline operations and boost efficiency.", icon: Brain, link: "/services/ai-automation" },
];

export default function ServicesSection({ showHeader = true, ctaTheme = "light" }) {
  
  // Framer Motion Variants
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <section className={`py-16 md:py-24 ${ctaTheme === "blue" ? "bg-[#f8fafc]" : "bg-white"}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Conditional Header */}
        {showHeader && (
          <motion.div 
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-[#286ef0] font-bold text-[11px] tracking-widest uppercase mb-3">
              Our Services
            </p>
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 leading-[1.15] tracking-tight mb-4">
              Comprehensive Technology <br className="hidden md:block" /> Solutions
            </h2>
            <p className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed">
              SyncWard delivers high-throughput LLM pipelines, autonomous reasoning agents, and secure enterprise infrastructure built for complex workflow automation.
            </p>
          </motion.div>
        )}

        {/* Services Grid with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Link href={service.link} className="block h-full">
                <div className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#f0f5ff] rounded-xl flex items-center justify-center text-[#286ef0] mb-6 group-hover:bg-[#286ef0] group-hover:text-white transition-colors duration-300">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  {/* Title & Desc */}
                  <h3 className="text-[18px] font-bold text-slate-900 mb-3 group-hover:text-[#286ef0] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed flex-grow">
                    {service.desc}
                  </p>

                  {/* Arrow Link */}
                  <div className="mt-6 flex items-center text-[13px] font-bold text-[#286ef0] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Explore Service <span className="ml-1">&rarr;</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional Bottom CTA */}
        {ctaTheme === "light" && showHeader && (
          <motion.div 
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16 text-center"
          >
            <Link href="/services">
              <Button variant="outline" className="rounded-full px-8 py-6 text-[14px] font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#286ef0] transition-all shadow-sm">
                View Platform Architecture &rarr;
              </Button>
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}