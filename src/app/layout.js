import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.syncwardtech.co.in"),
  title: {
    default: "SyncWard Technologies | Full-Stack Development & IT Solutions",
    template: "%s | SyncWard Technologies",
  },
  description:
    "SyncWard Technologies is an AI product studio developing proprietary enterprise platforms, autonomous reasoning agents, and scalable cloud infrastructure.",
  keywords: [
    "SyncWard",
    "SyncWard Technologies",
    "syncwardtech",
    "Sync Ward",
    "Custom Software Development",
    "Mobile App Development",
    "AI Automation",
    "Cloud API Solutions",
    "IT Solutions Pune",
  ],
  authors: [{ name: "SyncWard Technologies" }],
  creator: "SyncWard Technologies",
  verification: {
    google: "4X9X5NqPEfCv9T5ZmIi6B-uZOQBO1ilHP32mLUcyeHI",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.syncwardtech.co.in",
    title: "SyncWard Technologies | Full-Stack Development",
    description:
      "SyncWard Technologies is an AI product studio developing proprietary enterprise platforms, autonomous reasoning agents, and scalable cloud infrastructure.",
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
    description:
      "SyncWard Technologies is an AI product studio developing proprietary enterprise platforms, autonomous reasoning agents, and scalable cloud infrastructure.",
    images: ["/about-banner.jpg"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SyncWard Technologies",
    url: "https://www.syncwardtech.co.in",
    // Fixed case-sensitivity to match public/Header-logo.png
    logo: "https://www.syncwardtech.co.in/Header-logo.png",
    description:
      "SyncWard Technologies is an AI product studio developing proprietary enterprise platforms, autonomous reasoning agents, and scalable cloud infrastructure.",
    sameAs: [
      "https://github.com/SyncWard",
      "https://www.linkedin.com/company/syncward-technology",
      "https://www.instagram.com/syncwardtech",
      "https://x.com/SyncWardTech",
      "https://www.facebook.com/share/1FjaZLQVG3",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} bg-white text-slate-900 antialiased flex flex-col min-h-screen`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}