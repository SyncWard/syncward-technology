import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import HeroSection from "@/components/common/HeroSection";
import ContactForm from "@/components/common/ContactForm"; // <-- Imported here

export const metadata = {
  title: "Contact Us | SyncWard Technologies",
  description: "Let's Build Something Great Together",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. Reusable Hero Section */}
      <HeroSection 
        bgImage="/background/contact-hero-bg.jpg"
        subtitle="Contact Us"
        title={<>Let's Build Something <br className="hidden md:block" /> Great</>}
        description="Have a project in mind? We'd love to hear from you. Get in touch and let's create something amazing together."
      />

      {/* 2. Contact Info & Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 flex flex-col gap-10 pt-4">
              
              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#f0f5ff] rounded-full flex items-center justify-center text-[#286ef0] shrink-0">
                  <Mail size={20} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1">Email Us</h4>
                  <a href="mailto:connect@syncward.com" className="text-slate-500 text-[14px] hover:text-[#286ef0] transition-colors">
                    connect@syncward.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#f0f5ff] rounded-full flex items-center justify-center text-[#286ef0] shrink-0">
                  <Phone size={20} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1">Call Us</h4>
                  <a href="tel:+910000000000" className="text-slate-500 text-[14px] hover:text-[#286ef0] transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#f0f5ff] rounded-full flex items-center justify-center text-[#286ef0] shrink-0">
                  <MapPin size={20} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-slate-900 mb-1">Visit Us</h4>
                  <p className="text-slate-500 text-[14px]">
                    Kal Nimbala, Maharashtra, India
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Contact Form Component */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

          </div>

        {/* 3. Map Section */}
          <div className="relative w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden mt-20 border border-slate-100 shadow-sm bg-slate-900 group">
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7593.303146534274!2d76.49022185869138!3d17.901738599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf5f06e188e0ab%3A0xe55fb3b2f03acc1c!2sZ.p.p.s%20School%20Kal%20Nimbala!5e0!3m2!1sen!2sin!4v1789226082328!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)" }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
            
            <a 
              href="https://maps.app.goo.gl/dGFQdsT2uAAA4GaB9?g_st=iw" 
              target="_blank" 
              rel="noreferrer"
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label="View on Google Maps"
            ></a>
            
            {/* Floating Overlay Card */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:right-10 md:left-auto bg-[#0a1224]/95 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl min-w-[280px] z-20 pointer-events-none md:pointer-events-auto">
              <h4 className="text-white text-[16px] font-bold mb-1">Our Office</h4>
              <p className="text-[#a0aabf] text-[13px] mb-5">Z.p.p.s School, Kal Nimbala, Maharashtra</p>
              
              <a 
                href="https://maps.app.goo.gl/dGFQdsT2uAAA4GaB9?g_st=iw" 
                target="_blank" 
                rel="noreferrer"
                className="pointer-events-auto"
              >
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-full px-5 py-2 text-[12px] font-semibold bg-transparent transition-all">
                  View on Map <ArrowRight size={14} className="ml-2" />
                </Button>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}