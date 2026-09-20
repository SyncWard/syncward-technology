import TechnologiesSection from "@/components/sections/TechnologiesSection";
import HeroSection from "@/components/common/HeroSection";

export const metadata = {
  title: "Technologies | SyncWard Technologies",
  description: "Modern, industry-leading technologies we use to build robust and scalable solutions.",
};

export default function TechnologiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section */}
      <HeroSection 
        bgImage="/background/tech-hero-bg.jpg" // public folder mein dark coding/tech background image daal lena
        subtitle="Our Tech Stack"
        title={<>Powered by Modern <br className="hidden md:block" /> Technologies</>}
        description="We leverage industry-leading tools and frameworks to build robust, scalable, and future-ready digital solutions for your business."
      />

      {/* 2. Reusable Component (Header hidden) */}
      <div className="flex-grow">
        <TechnologiesSection showHeader={false} />
      </div>

    </div>
  );
}