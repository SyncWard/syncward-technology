import IndustriesSection from "@/components/sections/IndustriesSection";
import HeroSection from "@/components/common/HeroSection";

export const metadata = {
  title: "Industries | SyncWard Technologies",
  description: "Empowering businesses across diverse industries with tailored technology solutions.",
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section */}
      <HeroSection 
        bgImage="/background/industries-hero-bg.jpg" // public folder mein koi dark tech image daal lena
        subtitle="Industries We Serve"
        title={<>Empowering Businesses <br className="hidden md:block" /> Across Industries</>}
        description="We build specialized, scalable solutions for diverse sectors, helping organizations solve complex challenges and reach new heights in the digital era."
      />

      {/* 2. Reusable Industries Grid Component */}
      <IndustriesSection showHeader={false} />

    </div>
  );
}