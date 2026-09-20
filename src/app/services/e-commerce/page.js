"use client";

import { ShoppingCart, CreditCard, TrendingUp, Package, Store, ShieldCheck } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { motion } from "framer-motion";

const offerings = [
  { title: "Custom Storefronts", desc: "Beautifully designed, mobile-first e-commerce interfaces that reflect your brand and engage shoppers.", icon: Store },
  { title: "Payment Integration", desc: "Secure and seamless integration with multiple payment gateways (Stripe, PayPal, Razorpay) for global transactions.", icon: CreditCard },
  { title: "Inventory Management", desc: "Automated tracking, order fulfillment, and inventory syncing to keep your backend operations running smoothly.", icon: Package },
  { title: "B2B & B2C Marketplaces", desc: "Complex multi-vendor platforms and customized wholesale portals tailored to your specific business model.", icon: ShoppingCart },
  { title: "Conversion Optimization", desc: "Lightning-fast load times and optimized checkout flows designed to reduce cart abandonment and boost sales.", icon: TrendingUp },
  { title: "Security & Compliance", desc: "PCI-compliant architectures with advanced fraud protection to keep your business and customer data safe.", icon: ShieldCheck },
];

export default function EcommercePage() {
  
  // Animation Variants for "Storefront Pop & Spring" Effect
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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      // Spring effect gives a slight, premium bounce - perfect for e-commerce
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section (Already animated) */}
      <HeroSection 
        bgImage="/ecommerce-hero-bg.jpg" // public folder mein shopping/retail background daal dena
        subtitle="Service Detail"
        title={<>E-commerce <br className="hidden md:block" /> Solutions</>}
        description="We build high-converting, scalable, and secure e-commerce platforms that provide seamless shopping experiences and drive online sales."
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
              At SyncWard Technologies, we empower retail businesses to thrive in the digital marketplace. From custom storefront designs to complex multi-vendor architectures, we deliver end-to-end e-commerce solutions that streamline operations, boost conversion rates, and build lasting customer loyalty.
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