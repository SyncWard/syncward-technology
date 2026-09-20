import ServicesSection from "@/components/sections/ServicesSection";
import HeroSection from "@/components/common/HeroSection";

export const metadata = {
  title: "Our Services | SyncWard Technologies",
  description: "Technology Solutions for a Smarter Tomorrow",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Reusable Hero Section */}
      <HeroSection 
        bgImage="/background/services-hero-bg.jpg"
        subtitle="Our Services"
        title={<>Technology Solutions for a <br className="hidden md:block" /> Smarter Tomorrow</>}
        description="We offer a wide range of services to help businesses build, innovate and grow in the digital age."
      />

      {/* 2. Reusable Services Grid */}
      <ServicesSection showHeader={false} ctaTheme="blue" />

    </div>
  );
}