import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030914] text-white border-t border-white/10 pt-16 md:pt-20 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Footer Links Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 py-12 md:py-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image 
                src="/Header-logo.png" 
                alt="SyncWard Technologies" 
                width={150} 
                height={35} 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-[#a0aabf] text-[12px] md:text-[13px] mt-2">
              Innovative Solutions. Lasting Impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-[13px] text-[#a0aabf]">
              <li><Link href="/" className="hover:text-[#286ef0] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#286ef0] transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-[#286ef0] transition-colors">Services</Link></li>
              <li><Link href="/work" className="hover:text-[#286ef0] transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-[#286ef0] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-5">Services</h4>
            <ul className="flex flex-col gap-3 text-[13px] text-[#a0aabf]">
              <li><Link href="/services" className="hover:text-[#286ef0] transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-[#286ef0] transition-colors">Mobile App Development</Link></li>
              <li><Link href="/services" className="hover:text-[#286ef0] transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services" className="hover:text-[#286ef0] transition-colors">E-commerce</Link></li>
              <li><Link href="/services" className="hover:text-[#286ef0] transition-colors">Cloud & AI</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 lg:col-span-1 mt-4 lg:mt-0">
            <h4 className="text-white font-semibold text-[14px] mb-5">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-[13px] text-[#a0aabf]">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#286ef0] shrink-0" />
                <a href="mailto:connect@syncward.com" className="hover:text-white transition-colors">connect@syncward.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#286ef0] shrink-0" />
                <a href="tel:+910000000000" className="hover:text-white transition-colors">+91 00000 00000</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#286ef0] shrink-0 mt-0.5" />
                <span>Pune, Maharashtra, India</span>
              </li>
            </ul>
            
            {/* Custom SVG Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-[#a0aabf] hover:text-white hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Link>
              <Link href="#" className="text-[#a0aabf] hover:text-white hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Link>
              <Link href="#" className="text-[#a0aabf] hover:text-white hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link href="#" className="text-[#a0aabf] hover:text-white hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[#a0aabf] text-[11px]">
          <p>&copy; {new Date().getFullYear()} SyncWard Technologies. All rights reserved.</p>
          <div className="flex gap-4">
            {/* FIXED LINKS HERE */}
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}