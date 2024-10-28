import { Quicksand } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import PrelineScript from "@/components/PrelineScript";
import Loader from "@/loading";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const quicksandFont = Quicksand({ subsets: ["latin"] });

export const viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  generator: "Next.js",
  title: "EMONS | Electrical Monitoring System",
  description: "Help you monitoring your electrical in real time!",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "https://emons.id",
  },
  bookmarks: ["https://emons.id/login"],
  appleWebApp: {
    title: "EMONS | Electrical Monitoring System",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "EMONS | Electrical Monitoring System",
    description: "Help you monitoring your electrical in real time!",
    url: "https://emons.id",
    type: "website",
  },
  keywords: [
    "Wibawa Solusi Elektrik",
    "Electrical Monitoring System",
    "Electrical Monitoring",
    "EMONS",
    "EMONS website",
    "Alat pemantau sistem kelistrikan",
    "Pantau Sistem Listrik",
    "Apa itu EMONS",
    "What is EMONS",
    "Aplikasi Pemantau Sistem Kelistrikan",
    "Sistem Kelistrikan terpantau",
    "Real time electrical monitoring system",
    "Electrical Purify",
    "Purify",
    "Electrical",
    "Purification",
    "WISE",
    "Purify System",
    "Memurnikan listrik",
    "Monitoring grounding",
    "apa itu grounding",
    "Grounding listrik",
    "Grounding system",
    "Perbaikan grounding",
    "Auto Voltage Stabilizer",
    "Stabilizer",
    "Grounding optimizer",
    "Sistem pemurnian kelistrikan",
    "Listrik Murni",
    "Apa itu listrik yang murni",
  ],
  authors: [
    {
      name: "Muhammad Hanafi Prasyah",
    },
    {
      name: "Wibawa Solusi Elektrik",
      url: "https://wise.co.id",
    },
    {
      name: "Electrical Monitoring System",
      url: "https://emons.id",
    },
  ],
  creator: "Muhammad Hanafi Prasyah",
  publisher: "Muhammad Hanafi Prasyah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "./manifest.json",
  robots: "./robots.txt",
  category: "technology",
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
};

export default function RootLayout({ children }) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${quicksandFont.className} antialiased scroll-smooth bg-black max-h-[400px] overflow-y-auto transition duration-300 ease-in-out [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        <div aria-label="rootNode" className="rootNode">
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <ScrollToTopButton />
        </div>
      </body>

      <PrelineScript />
    </html>
  );
}
