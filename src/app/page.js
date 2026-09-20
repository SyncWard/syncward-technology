import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection"; // <-- CTA Import kiya

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      
      <StatsBar />
      
      {/* showHeader={true} by default hota hai, par explicit kar diya clarity ke liye */}
      <ServicesSection showHeader={true} />
      
      <WhyChooseSection />
      
      <TechnologiesSection showHeader={true} />
      
      <IndustriesSection showHeader={true} />
      
      <ProcessSection />
      
      {/* Final Call to Action */}
      <section className="bg-[#030914] py-16 md:py-24 mt-auto">
        <div className="max-w-[1200px] mx-auto px-6">
          <CTASection />
        </div>
      </section>
    </main>
  );
}