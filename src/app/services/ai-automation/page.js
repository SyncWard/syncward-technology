"use client";

import { Brain, Bot, Zap, LineChart, MessageSquare, Cpu } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "Machine Learning Models", desc: "Tailored algorithms that learn from your data to identify patterns, make predictions, and continuously improve over time.", icon: Brain },
  { title: "Workflow Automation (RPA)", desc: "Streamline repetitive manual tasks with Robotic Process Automation to save time, reduce errors, and cut operational costs.", icon: Zap },
  { title: "Intelligent Chatbots", desc: "AI-powered conversational agents that provide 24/7 customer support, qualify leads, and enhance user engagement seamlessly.", icon: Bot },
  { title: "Predictive Analytics", desc: "Transform raw data into actionable insights, helping you forecast market trends, optimize inventory, and make data-driven decisions.", icon: LineChart },
  { title: "Natural Language Processing", desc: "Extract meaning from text and speech for sentiment analysis, automated document processing, and advanced search capabilities.", icon: MessageSquare },
  { title: "AI System Integration", desc: "Seamlessly integrate cutting-edge AI capabilities into your existing software infrastructure without disrupting current daily operations.", icon: Cpu },
];

export default function AIAutomationPage() {
  
  // "Kuch Alag" Futuristic Blur & Scale Animations
  const textVariants = {
    hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: "easeOut" } 
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
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)", 
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section (Already animated internally) */}
      <HeroSection 
        bgImage="/ai-hero-bg.jpg" // public folder mein futuristic/AI background daal dena
        subtitle="Service Detail"
        title={<>AI & Intelligent <br className="hidden md:block" /> Automation</>}
        description="Leverage the power of Artificial Intelligence and Machine Learning to automate complex workflows, uncover hidden insights, and future-proof your business."
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
              At SyncWard Technologies, we turn the hype of AI into tangible business value. We help organizations identify bottlenecks and deploy smart, automated solutions that augment human capabilities, accelerate decision-making, and unlock entirely new levels of operational efficiency.
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