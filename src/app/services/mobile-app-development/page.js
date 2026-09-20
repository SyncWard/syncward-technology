"use client";

import { Smartphone, Layers, PenTool, Server, Activity, ShieldCheck } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "iOS App Development", desc: "High-performance, secure, and elegant native applications tailored for the Apple ecosystem.", icon: Smartphone },
  { title: "Android App Development", desc: "Robust and scalable native Android applications that reach a massive global audience.", icon: Activity },
  { title: "Cross-Platform Apps", desc: "Cost-effective solutions using React Native and Flutter that work flawlessly on both platforms.", icon: Layers },
  { title: "Mobile UI/UX Design", desc: "Intuitive, user-centric interfaces that keep your users engaged and coming back.", icon: PenTool },
  { title: "Backend & API Integration", desc: "Powerful server-side architectures to sync data and connect your app to third-party services.", icon: Server },
  { title: "App Maintenance", desc: "Continuous monitoring, bug fixes, and updates for new OS versions to keep your app running smoothly.", icon: ShieldCheck },
];

export default function MobileAppDevelopmentPage() {
  
  // Animation Variants for "App Launch" Snappy Effect
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 120, damping: 20 } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section (Already animated) */}
      <HeroSection 
        bgImage="/mobile-hero-bg.jpg" // public folder mein ek mobile/app UI background daal dena
        subtitle="Service Detail"
        title={<>Custom Mobile App <br className="hidden md:block" /> Development</>}
        description="We build intuitive, high-performance mobile applications for iOS and Android that deliver exceptional user experiences and drive real business growth."
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
              At SyncWard Technologies, we transform your ideas into powerful mobile experiences. Whether you need a native iOS app, a feature-rich Android solution, or a hybrid cross-platform application, our team ensures a seamless journey from concept to deployment on the App Store and Google Play.
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