import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        
        {/* Error Code */}
        <div className="mb-6">
          <span className="bg-[#f0f5ff] text-[#286ef0] text-sm font-bold px-4 py-1.5 rounded-full">
            Error 404
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-slate-500 text-sm md:text-base mb-8">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full bg-[#286ef0] hover:bg-[#1d5ce0] text-white rounded-xl px-6 py-5 text-[14px] font-bold shadow-md transition-all flex items-center justify-center">
              <Home size={16} className="mr-2" /> Back to Home
            </Button>
          </Link>
          
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full rounded-xl px-6 py-5 text-[14px] font-bold border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
              Contact Support
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}