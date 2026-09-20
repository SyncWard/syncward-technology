"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
        
        <div className="w-12 h-12 bg-[#286ef0]/10 text-[#286ef0] rounded-2xl flex items-center justify-center mb-6">
          <Lock size={22} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Portal</h1>
        <p className="text-slate-500 text-sm mb-8">Enter your secure password to access the dashboard.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#286ef0] outline-none text-[14px]"
              required
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl py-6 text-[14px] font-bold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Login to Dashboard"}
          </Button>
        </form>

      </div>
    </div>
  );
}