"use client";

import { motion } from "framer-motion";

export default function StatsBar() {
  // Container animation: Slide up and stagger children
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15, // Har stat ek ke baad ek aayega
      },
    },
  };

  return (
    <div className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-12 -mt-16 md:-mt-24 mb-4">
      {/* Floating Card Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="bg-[#030914]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] rounded-2xl md:rounded-3xl py-8 md:py-12 px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 gap-x-4 md:gap-x-8"
      >
        <StatBox number="50+" label="Projects Delivered" />
        <StatBox number="20+" label="Happy Clients" />
        <StatBox number="5+" label="Years of Experience" />
        <StatBox number="100%" label="Client Satisfaction" />
      </motion.div>
    </div>
  );
}

function StatBox({ number, label }) {
  // Individual stat animation: Slight scale up and fade in
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
  };

  return (
    <motion.div 
      variants={itemVariants}
      // Mobile par border hataya hai clean look ke liye, desktop par border rahega
      className="flex flex-col items-center md:items-start border-none md:border-l md:border-white/10 md:pl-8 md:first:border-none md:first:pl-0 text-center md:text-left"
    >
      <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 tracking-tight">
        {number}
      </h3>
      <p className="text-[#a0aabf] text-sm md:text-base font-medium">{label}</p>
    </motion.div>
  );
}