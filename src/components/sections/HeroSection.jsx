// src/components/sections/HeroSection.jsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Har element 0.15s ke gap se aayega
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }, // Premium smooth easing
    },
  };

  return (
    <div className="relative w-full bg-[#030914] flex flex-col min-h-[85vh] justify-center overflow-hidden">
      
      {/* Full Background Image Layer */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/bg-hero.png" // Make sure ye image public folder mein ho
          alt="SyncWard Technologies Digital Solutions Background"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center md:object-right lg:object-center opacity-70 md:opacity-100"
        />
      </motion.div>

      {/* Responsive Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b md:bg-gradient-to-r from-[#030914] via-[#030914]/80 to-transparent"></div>

      {/* Hero Content Layer */}
      <section className="max-w-[1400px] w-full mx-auto px-6 md:px-12 pt-16 pb-32 md:pt-24 md:pb-48 lg:pt-32 lg:pb-40 relative z-10">
        
        {/* Left Content Container with Framer Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[580px] flex flex-col items-start text-left"
        >
          
          {/* Top Tagline */}
          <motion.p variants={itemVariants} className="text-[#a0aabf] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Innovation <span className="text-[#1d64ff] mx-2">/</span>
            Technology <span className="text-[#1d64ff] mx-2">/</span>
            Growth
          </motion.p>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-white text-3xl sm:text-4xl lg:text-[52px] font-extrabold leading-[1.2] tracking-tight mb-6">
            We Build Digital <br className="hidden sm:block" />
            Products That Move <br className="hidden sm:block" />
            <span className="text-[#286ef0]">Businesses Forward.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p variants={itemVariants} className="text-[#a0aabf] text-sm md:text-[15px] font-medium leading-relaxed mb-8 max-w-[500px]">
            <span className="text-white font-semibold">
              SyncWard Technologies
            </span>{" "}
            is a modern software development company, delivering innovative,
            scalable and user-centric solutions for businesses of all sizes.
          </motion.p>

          {/* Buttons with Links */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button className="bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-full px-7 py-5 text-sm font-medium shadow-[0_4px_14px_0_rgba(40,110,240,0.39)] w-full sm:w-auto transition-all">
                Start a Project &rarr;
              </Button>
            </Link>
            
            <Link href="/work" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-7 py-5 text-sm font-medium bg-transparent w-full sm:w-auto transition-all"
              >
                Our Work
              </Button>
            </Link>
          </motion.div>
          
        </motion.div>
      </section>
    </div>
  );
}