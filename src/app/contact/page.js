import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/common/ContactForm";
import {
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | SyncWard Technologies",
  description:
    "Get in touch with SyncWard Technologies in Pune for custom software development, web & mobile apps, AI automation, and cloud solutions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Hero Banner */}
      <section className="relative bg-[#030914] pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background/contact-hero-bg.jpg"
            alt="Contact SyncWard Technologies Pune"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#030914] via-[#030914]/90 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-[#286ef0] font-bold text-[11px] sm:text-xs tracking-widest uppercase mb-3 md:mb-4">
            Contact Us
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4 md:mb-6 max-w-2xl">
            Let&apos;s Build Something Exceptional Together
          </h1>
          <p className="text-[#a0aabf] text-sm sm:text-base font-medium leading-relaxed max-w-xl">
            Have a project in mind, need an AI automation workflow, or want to
            scale your engineering team? Reach out and our team will respond
            within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 sm:py-16 md:py-24 flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Contact Info & Trust Highlights */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <p className="text-[#286ef0] font-bold text-xs tracking-widest uppercase mb-2">
                  Get In Touch
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Start a Conversation
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Whether you are launching an MVP or modernizing enterprise
                  infrastructure, we provide end-to-end architecture, design,
                  and full-stack execution.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="flex flex-col gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#286ef0] flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                      Email Us Directly
                    </p>
                    <a
                      href="mailto:contact@syncwardtech.co.in"
                      className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#286ef0] transition-colors break-all"
                    >
                      contact@syncwardtech.co.in
                    </a>
                    <p className="text-xs text-slate-500 mt-1">
                      For project inquiries, partnerships & support
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#286ef0] flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                      Headquarters
                    </p>
                    <p className="text-sm sm:text-base font-bold text-slate-900">
                      Pune, Maharashtra, India
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Serving clients across India & globally
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#286ef0] flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                      Working Hours
                    </p>
                    <p className="text-sm sm:text-base font-bold text-slate-900">
                      Mon – Sat: 9:30 AM – 7:30 PM IST
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Guaranteed response within 1 business day
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Partner Box */}
              <div className="bg-[#030914] text-white p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#286ef0]" />
                  What happens after you submit?
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Zap size={16} className="text-[#286ef0] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Rapid Discovery:</strong>{" "}
                      Our engineering lead reviews your requirements within 24
                      hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck
                      size={16}
                      className="text-[#286ef0] shrink-0 mt-0.5"
                    />
                    <span>
                      <strong className="text-white">
                        Architecture & Roadmap:
                      </strong>{" "}
                      We prepare a clear technical scope, timeline, and cost
                      estimate.
                    </span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <a
                    href="https://www.linkedin.com/company/syncward-technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    LinkedIn <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/SyncWard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    GitHub <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://www.instagram.com/syncwardtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    Instagram <ArrowUpRight size={13} />
                  </a>
                  <Link
                    href="/work"
                    className="hover:text-white inline-flex items-center gap-1 transition-colors ml-auto text-[#286ef0] font-semibold"
                  >
                    Explore Our Work <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}