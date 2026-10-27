"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // Hidden honeypot field to trap spam bots
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Silent bot trap: if hidden 'website' input is filled, pretend success without hitting DB
    if (formData.website) {
      setStatus({
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      });
      return;
    }

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setStatus({
        success: false,
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: cleanMessage,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          success: true,
          message: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        setStatus({
          success: false,
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Network error. Please check your internet connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  // text-base (16px) on mobile prevents iOS Safari from auto-zooming on input focus
  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] focus:ring-2 focus:ring-[#286ef0]/15 outline-none transition-all text-base md:text-[14px] text-slate-900 placeholder:text-slate-400";

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <h3 className="text-xl md:text-[22px] font-bold text-slate-900 mb-6 md:mb-8">
        Send Us a Message
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Honeypot field - invisible to humans */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-[13px] font-semibold text-slate-700">
              Your Name *
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClasses}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-[13px] font-semibold text-slate-700">
              Your Email *
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              maxLength={150}
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-phone" className="text-[13px] font-semibold text-slate-700">
              Phone Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              maxLength={25}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-subject" className="text-[13px] font-semibold text-slate-700">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              maxLength={200}
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help you?"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-[13px] font-semibold text-slate-700">
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project requirements, timeline, or goals..."
            rows={4}
            className={`${inputClasses} resize-none`}
            required
          />
        </div>

        {status && (
          <div
            role="alert"
            className={`p-3.5 rounded-xl text-sm font-medium flex items-start gap-2.5 border ${
              status.success
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}
          >
            {status.success ? (
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] active:scale-[0.99] text-white rounded-xl py-6 mt-1 text-[14px] font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            "Sending Message..."
          ) : (
            <>
              Send Message <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}