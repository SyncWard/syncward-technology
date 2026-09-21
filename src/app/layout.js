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
  description: "SyncWard Technologies is a premier software agency specializing in custom software, mobile app development, AI automation, and scalable cloud solutions.",
  keywords: [
    "SyncWard", 
    "SyncWard Technologies", 
    "syncwardtech",
    "Sync Ward", 
    "Custom Software Development", 
    "Mobile App Development", 
    "AI Automation", 
    "Cloud API Solutions",
    "Sync Ward"
  ],
  authors: [{ name: "SyncWard Technologies" }],
  creator: "SyncWard Technologies",
  verification: {
    google: "Gjv4GOFrVIi3Yw5CMqRv3UrRKzqBVFERczhEjgOtdi0",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://syncwardtech.vercel.app", // Update this when you buy the custom domain
    title: "SyncWard Technologies | Full-Stack Development",
    description: "SyncWard Technologies is a premier software agency specializing in custom software, mobile app development, AI automation, and scalable cloud solutions.",
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
    description: "SyncWard Technologies is a premier software agency specializing in custom software, mobile app development, AI automation, and scalable cloud solutions.",
    images: ["/about-banner.jpg"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SyncWard Technologies",
    url: "https://syncwardtech.vercel.app",
    logo: "https://syncwardtech.vercel.app/header-logo.png",
    description: "SyncWard Technologies is a premier software agency specializing in custom software, mobile app development, AI automation, and scalable cloud solutions for modern businesses.",
    sameAs: [
      "https://github.com/SyncWard"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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