import { Quicksand } from "next/font/google";
import "./globals.css";
import PrelineScript from "./components/PrelineScript";
import ScrollToTopButton from "./components/ScrollToTopButton";

const q = Quicksand({ subsets: ["latin"] });

export const viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  generator: "Next.js",
  title: "Electricity Monitoring System",
  description: "Electricity Monitoring System (EMONS) official website",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Wibawa Solusi Elektrik",
    "Electricity Monitoring System",
    "Electrical Monitoring",
    "EMONS",
    "emons website",
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
      name: "Electricity Monitoring System",
      url: "https://emons.id/",
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${quicksand.className} scroll-smooth bg-black max-h-[400px] overflow-y-auto transition duration-300 ease-in-out antialiased [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        <div
          aria-label="rootNode"
          title="Electricity Monitoring System"
          className="rootNode"
        >
          {/* Landing Navigation */}
          <main>{children}</main>
          <ScrollToTopButton />
          {/* Landing Footer */}
        </div>
      </body>
      <PrelineScript />
    </html>
  );
}
