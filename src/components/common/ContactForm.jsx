"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // <-- Phone field added here
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ success: true, message: "Message sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus({ success: false, message: result.error || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setStatus({ success: false, message: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <h3 className="text-[20px] md:text-[22px] font-bold text-slate-900 mb-8">
        Send Us a Message
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">Your Name *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] focus:ring-1 focus:ring-[#286ef0] outline-none transition-all text-[14px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">Your Email *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] focus:ring-1 focus:ring-[#286ef0] outline-none transition-all text-[14px]"
              required
            />
          </div>
        </div>

        {/* Phone Number Field Added */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-slate-700">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] focus:ring-1 focus:ring-[#286ef0] outline-none transition-all text-[14px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-slate-700">Subject</label>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] focus:ring-1 focus:ring-[#286ef0] outline-none transition-all text-[14px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-slate-700">Message *</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project..." 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] focus:ring-1 focus:ring-[#286ef0] outline-none transition-all text-[14px] resize-none"
            required
          ></textarea>
        </div>

        {status && (
          <p className={`text-sm font-medium ${status.success ? "text-green-600" : "text-red-600"}`}>
            {status.message}
          </p>
        )}

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl py-6 mt-2 text-[14px] font-bold shadow-md transition-all disabled:opacity-50"
        >
          {loading ? "Sending..." : <>Send Message <ArrowRight size={16} className="ml-2" /></>}
        </Button>
      </form>
    </div>
  );
}