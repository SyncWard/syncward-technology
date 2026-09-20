"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, RefreshCw, ShieldCheck, Target, Play } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { title: "Experienced Team", description: "Skilled developers, designers and problem-solvers.", icon: Users },
  { title: "Agile Process", description: "Fast, flexible and transparent development process.", icon: RefreshCw },
  { title: "Quality First", description: "Clean code, rigorous testing and long-term support.", icon: ShieldCheck },
  { title: "Client-Centric Approach", description: "Your success is our priority.", icon: Target },
];

export default function WhyChooseSection() {
  const leftColumnVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="bg-[#f8fafc] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left Column: Text & Image */}
        <motion.div 
          variants={leftColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col"
        >
          <p className="text-[#286ef0] font-bold text-[11px] tracking-widest uppercase mb-3">
            Why SyncWard
          </p>
          <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
            Why Choose SyncWard?
          </h2>
          <p className="text-slate-500 text-[13px] md:text-sm font-medium leading-relaxed max-w-[450px] mb-10">
            We combine technical expertise with a deep understanding of business needs to deliver solutions that make a real impact.
          </p>

          <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden mt-4 group">
            <Image 
              src="/WhyChooseImage.PNG" 
              alt="Why Choose Us"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 right-0 w-[75%] md:w-[65%] bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95 backdrop-blur-md p-6 rounded-tl-2xl rounded-br-2xl text-white shadow-2xl border-t border-l border-white/10">
              <p className="font-semibold text-sm md:text-base leading-snug mb-5">
                Turning your ideas into powerful digital experiences.
              </p>
              <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors">
                <Play size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Grid & Button */}
        <motion.div 
          variants={rightColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6 mb-12">
            {features.map((feature, index) => (
              <motion.div variants={featureItemVariants} key={index} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f0f5ff] text-[#286ef0] flex items-center justify-center shrink-0">
                  <feature.icon size={22} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1.5">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed pr-4">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={featureItemVariants}>
            <Link href="/about">
              <Button variant="outline" className="rounded-full px-7 py-5 text-[13px] font-semibold border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all">
                Learn More &rarr;
              </Button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}