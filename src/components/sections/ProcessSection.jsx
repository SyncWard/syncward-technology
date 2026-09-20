"use client";

import { MessageSquare, PenTool, Code, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Discovery", desc: "We start by understanding your business goals, target audience, and project requirements.", icon: MessageSquare },
  { step: "02", title: "Design", desc: "Our team creates intuitive wireframes and stunning UI designs tailored to your brand.", icon: PenTool },
  { step: "03", title: "Development", desc: "We write clean, scalable code using modern technologies to bring the designs to life.", icon: Code },
  { step: "04", title: "Deployment", desc: "Rigorous testing is done before launching your product to ensure a flawless experience.", icon: Rocket },
];

export default function ProcessSection() {
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section className="bg-[#030914] py-16 md:py-24 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <p className="text-[#286ef0] font-bold text-[11px] tracking-widest uppercase mb-3">
            Our Process
          </p>
          <h2 className="text-3xl md:text-[40px] font-bold text-white leading-[1.15] tracking-tight mb-4">
            How We Bring Ideas <br className="hidden md:block"/> to Reality
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {steps.map((item, index) => (
            <motion.div variants={itemVariants} key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-[#0a1224] border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:border-[#286ef0]/50 transition-all duration-300 shadow-xl">
                <item.icon size={32} className="text-[#286ef0]" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#286ef0] text-white text-[12px] font-bold flex items-center justify-center border-4 border-[#030914]">
                  {item.step}
                </div>
              </div>
              <h3 className="text-[18px] font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-[#a0aabf] text-[13px] leading-relaxed px-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}