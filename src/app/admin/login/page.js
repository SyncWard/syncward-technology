"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.replace("/admin");
        router.refresh();
        // Keep loading true during navigation so the button doesn't flicker
        return;
      } else {
        setError(data.error || "Invalid credentials.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-slate-500 hover:text-slate-900 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to SyncWard Website
        </Link>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
          <div className="w-12 h-12 bg-[#286ef0]/10 text-[#286ef0] rounded-2xl flex items-center justify-center mb-6">
            <Lock size={22} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            SyncWard Admin Portal
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Enter your administrator password to manage leads and projects.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="admin-password"
                className="text-[13px] font-semibold text-slate-700"
              >
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl py-6 text-[14px] font-bold shadow-md transition-all disabled:opacity-50"
            >
              {loading ? "Verifying & Signing In..." : "Login to Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}