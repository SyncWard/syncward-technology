"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection({ bgImage, subtitle, title, description }) {
  
  // Staggered Animation setup
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    }
  };

  return (
    <section className="relative bg-[#030914] pt-24 pb-10 md:pt-28 md:pb-12 overflow-hidden border-b border-white/5">
      
      {/* Background Image smooth fade & scale-in */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }} 
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={bgImage} 
          alt="Background"
          fill
          priority
          className="object-cover object-center mix-blend-overlay"
        />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#030914] via-[#030914]/90 to-transparent"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1200px] mx-auto px-6 relative z-10"
      >
        {subtitle && (
          <motion.div variants={itemVariants}>
            <p className="text-[#286ef0] font-bold text-[10px] tracking-widest uppercase mb-2">
              {subtitle}
            </p>
          </motion.div>
        )}
        
        <motion.h1 
          variants={itemVariants}
          className="text-white text-2xl md:text-3xl lg:text-[40px] font-bold leading-[1.15] tracking-tight mb-3 max-w-2xl"
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p 
            variants={itemVariants}
            className="text-[#a0aabf] text-[13px] md:text-sm font-medium leading-relaxed max-w-xl"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}