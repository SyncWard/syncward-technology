"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // <-- Imported usePathname
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // <-- Get current route

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Home ko array mein add kar diya clean logic ke liye
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "Our Work", path: "/work" },
    { name: "Technologies", path: "/technologies" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030914]/95 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <Image 
            src="/Header logo.Png" 
            alt="SyncWard Technologies" 
            width={180} 
            height={45} 
            className="h-9 md:h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7 text-[14px] font-medium">
          {navLinks.map((link) => {
            // Check if current path matches link path
            const isActive = pathname === link.path;
            
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`relative pb-1 transition-colors ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {/* Active Indicator Line */}
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#286ef0] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <Link href="/contact">
            <Button className="bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-full px-7 py-5 text-[14px] font-medium shadow-[0_4px_14px_0_rgba(40,110,240,0.39)] transition-all duration-300">
              Get Started &rarr;
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white p-1 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#030914] z-40 lg:hidden flex flex-col px-6 pb-8 pt-4 border-b border-white/10 shadow-2xl">
          <div className="flex flex-col gap-5 text-[16px] font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors ${
                    isActive ? "text-[#286ef0] font-bold" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}