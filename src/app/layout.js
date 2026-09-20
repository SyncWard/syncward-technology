import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "SyncWard Technologies | Full-Stack Development & Solutions",
    template: "%s | SyncWard Technologies",
  },
  description: "SyncWard Technologies builds high-performance, scalable web applications using Next.js, MongoDB, and Tailwind CSS.",
  keywords: ["Web Development", "Next.js Agency", "MongoDB", "Tailwind CSS", "SyncWard Technologies", "Full-Stack Solutions"],
  authors: [{ name: "SyncWard Technologies" }],
  creator: "SyncWard Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://syncwardtech.com",
    title: "SyncWard Technologies | Full-Stack Development",
    description: "Building scalable, high-performance web applications and custom digital products.",
    siteName: "SyncWard Technologies",
    images: [
      {
        url: "/about-banner.jpg",
        width: 1200,
        height: 630,
        alt: "SyncWard Technologies Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncWard Technologies",
    description: "Building scalable full-stack digital solutions.",
    images: ["/about-banner.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900 antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}