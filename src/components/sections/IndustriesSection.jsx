"use client";

import { Building2, ShoppingBag, HeartPulse, GraduationCap, Plane, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  { name: "FinTech & Banking", desc: "Automated document intelligence for compliance auditing and secure financial data extraction.", icon: Wallet },
  { name: "Healthcare", desc: "HIPAA-compliant LLM pipelines for medical record parsing and automated patient triage.", icon: HeartPulse },
  { name: "Retail & E-commerce", desc: "Agentic workflows for inventory forecasting and personalized customer intelligence.", icon: ShoppingBag },
  { name: "Real Estate", desc: "Automated contract analysis and unstructured property data orchestration.", icon: Building2 },
  { name: "Travel & Logistics", desc: "Predictive reasoning models for fleet optimization and routing intelligence.", icon: Plane },
  { name: "Education (EdTech)", desc: "Generative AI infrastructure for personalized learning management.", icon: GraduationCap },
];

export default function IndustriesSection({ showHeader = true }) {
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section className="bg-white py-16 md:py-24 border-y border-slate-50">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {showHeader && (
          <motion.div 
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-[#286ef0] font-bold text-[11px] tracking-widest uppercase mb-3">
              Industries We Serve
            </p>
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 leading-[1.15] tracking-tight mb-4">
              Solutions Across <br className="hidden md:block"/> Various Sectors
            </h2>
            <p className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed">
              Our core AI platform and LLM reasoning engines are designed to automate complex workflows across multiple enterprise sectors.
            </p>
          </motion.div>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
        >
          {industries.map((industry, index) => (
            <motion.div 
              variants={itemVariants}
              key={index} 
              className="group flex flex-col gap-4 p-6 rounded-2xl hover:bg-[#f8fafc] transition-colors duration-300 cursor-default"
            >
              <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-[#286ef0] group-hover:bg-[#286ef0] group-hover:text-white transition-all duration-300">
                <industry.icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2 group-hover:text-[#286ef0] transition-colors">
                  {industry.name}
                </h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">
                  {industry.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}