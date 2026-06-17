import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/com/Navbar";
import Footer from "@/com/Footer";
import PropTypes from "prop-types";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ── Fonts ─────────────────────────────────────────────────────── */
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/* ── SEO Metadata ──────────────────────────────────────────────── */
export const metadata = {
  title: {
    default: "SAG Engineering Products | Commercial Kitchen Equipment Manufacturers | Mumbai, India",
    template: "%s | SAG Engineering Products",
  },
  description:
    "S.A.G. Engineering Products is a leading manufacturer, supplier & exporter of commercial kitchen equipment, hospital equipment, galley equipment & stainless steel products based in Mumbai, India.",

  keywords: [
    "commercial kitchen equipment",
    "stainless steel equipment",
    "kitchen equipment manufacturer Mumbai",
    "galley equipment",
    "hospital equipment",
    "bakery equipment",
    "cooking equipment manufacturer",
    "food processing equipment",
    "SAG Engineering Products",
    "kitchen equipment supplier India",
    "commercial kitchen Mumbai",
    "Prashant Gatkal",
    "fast food equipment",
    "hotel kitchen equipment",
  ],

  authors: [{ name: "S.A.G. Engineering Products" }],
  creator: "S.A.G. Engineering Products",
  publisher: "S.A.G. Engineering Products",

  openGraph: {
    title: "SAG Engineering Products | Commercial Kitchen Equipment Manufacturers | Mumbai",
    description:
      "Premium manufacturer, supplier & exporter of commercial kitchen equipment, hospital equipment & stainless steel products. 15+ years experience, 500+ happy clients.",
    url: "https://www.sagengineering.in",
    siteName: "SAG Engineering Products",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SAG Engineering Products — Commercial Kitchen Equipment Mumbai",
    description:
      "Premium manufacturer, supplier & exporter of commercial kitchen equipment & stainless steel products based in Mumbai, India.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: "https://www.sagengineering.in",
  },
};

/* ── Layout ────────────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author"      content="S.A.G. Engineering Products" />
        <meta name="geo.region"  content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <Navbar />

        {children}

        <Footer />

        {/* ── Floating action buttons ──────────────────────────── */}
        <div className="fixed bottom-6 right-5 flex flex-col gap-3 z-50">

          {/* WhatsApp */}
          <a
            href="https://wa.me/919892084449?text=Hello%2C%20I%20am%20interested%20in%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="group relative flex items-center justify-center w-13 h-13
                       bg-[#25D366] text-white rounded-full shadow-lg
                       hover:scale-110 hover:shadow-xl transition-all duration-300">
            <FaWhatsapp size={26} />
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white
                             text-xs font-semibold rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100 transition-opacity
                             pointer-events-none shadow-lg">
              WhatsApp Us
            </span>
          </a>

          {/* Call */}
          <a
            href="tel:+919892084449"
            aria-label="Call us"
            title="Call us"
            className="group relative flex items-center justify-center w-13 h-13
                       bg-[#41BCF5] text-white rounded-full shadow-lg
                       hover:scale-110 hover:shadow-xl transition-all duration-300">
            <Phone size={22} />
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white
                             text-xs font-semibold rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100 transition-opacity
                             pointer-events-none shadow-lg">
              +91 98920 84449
            </span>
          </a>
        </div>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
