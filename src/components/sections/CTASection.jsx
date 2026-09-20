import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <div className="relative overflow-hidden bg-[#060d1e] border border-white/10 rounded-3xl p-6 md:px-10 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl group my-4">
      
      {/* Decorative Background Glow (Size reduced) */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#286ef0] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>

      {/* Content Section */}
      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <Rocket size={14} className="text-[#286ef0]" />
          <p className="text-[#286ef0] font-bold text-[10px] tracking-widest uppercase">
            Let's Build Together
          </p>
        </div>
        
        {/* Heading size reduced slightly */}
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white mb-2">
          Ready to turn your idea into <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">reality?</span>
        </h2>
        
        <p className="text-[#a0aabf] text-[13px] md:text-sm font-medium max-w-lg leading-relaxed">
          Get in touch with us today and let's create something amazing that drives real impact.
        </p>
      </div>

      {/* Buttons Section with Links (Padding and gaps reduced) */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
        <Link href="/contact" className="w-full sm:w-auto">
          <Button className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-full px-6 py-5 text-[13px] font-bold shadow-[0_0_15px_rgba(40,110,240,0.2)] hover:shadow-[0_0_25px_rgba(40,110,240,0.4)] transition-all">
            Start a Project <ArrowRight size={14} className="ml-2" />
          </Button>
        </Link>
        
        <Link href="/work" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-5 text-[13px] font-semibold bg-transparent transition-all">
            View Our Work
          </Button>
        </Link>
      </div>
      
    </div>
  );
}