"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LogOut, ExternalLink, ShieldCheck } from "lucide-react";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  async function handleLogout() {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (isAdminRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        {!isLoginPage && (
          <header className="bg-slate-900 text-white px-6 py-3.5 border-b border-slate-800 sticky top-0 z-40">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2.5 font-bold text-sm tracking-wide">
                <ShieldCheck size={18} className="text-[#286ef0]" />
                <span>SyncWard Admin Console</span>
              </Link>

              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  target="_blank"
                  className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  View Live Site <ExternalLink size={13} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-red-600 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          </header>
        )}
        <main className="flex-grow">{children}</main>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}