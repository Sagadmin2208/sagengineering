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
    default: "SAG Engineering Products | Commercial Kitchen Equipment Manufacturer Mumbai",
    template: "%s | SAG Engineering Products",
  },
  description:
    "ISO-certified manufacturer, supplier & exporter of commercial kitchen, hospital, galley, bakery, fast-food & stainless steel equipment in Mumbai, India.",

  keywords: [
    "commercial kitchen equipment manufacturer Mumbai",
    "stainless steel kitchen equipment supplier India",
    "SAG Engineering Products Mumbai",
    "commercial kitchen equipment exporter India",
    "industrial kitchen equipment manufacturer Maharashtra",
    "hospital equipment manufacturer Mumbai",
    "galley equipment supplier India",
    "bakery equipment manufacturer Mumbai",
    "fast food equipment supplier Mumbai",
    "food processing equipment manufacturer India",
    "commercial kitchen exhaust hood manufacturer",
    "stainless steel salamander grill supplier",
    "galley hot plate manufacturer India",
    "chapati pressing machine manufacturer",
    "food warming showcase supplier Mumbai",
    "pot burner manufacturer India",
    "scrub sink for hospitals manufacturer",
    "surgical fixtures stainless steel supplier",
    "commercial kitchen pot burner Mumbai",
    "stainless steel hospital furniture manufacturer",
    "kitchen equipment manufacturer Ghatkopar",
    "commercial kitchen equipment supplier Mumbai Maharashtra",
    "stainless steel fabrication Mumbai",
    "hotel kitchen equipment supplier Mumbai",
    "restaurant kitchen equipment Mumbai",
    "canteen kitchen equipment supplier India",
    "ship galley equipment manufacturer India",
    "marine galley equipment supplier Mumbai",
    "buy commercial kitchen equipment online India",
    "commercial kitchen equipment price India",
    "ISO certified kitchen equipment manufacturer",
    "custom stainless steel kitchen fabrication",
    "commercial kitchen equipment for hotels and restaurants",
    "wholesale kitchen equipment supplier India",
    "export quality stainless steel kitchen equipment",
    "best commercial kitchen equipment company Mumbai",
    "hospital grade stainless steel equipment India",
    "antimicrobial stainless steel equipment manufacturer",
    "corrosion resistant kitchen equipment supplier",
    "heavy duty commercial cooking equipment India",
    "kitchen equipment for cloud kitchens India",
    "kitchen equipment for catering business India",
    "stainless steel equipment for hospitals and hotels",
    "SAG Engineering Products reviews",
    "SAG Engineering kitchen equipment catalogue",
    "Prashant Gatkal SAG Engineering",
    "SAG Engineering Products Ghatkopar contact",
    "top kitchen equipment manufacturers Mumbai",
    "leading commercial kitchen equipment exporters India",
    "trusted stainless steel equipment company India",
  ],

  authors: [{ name: "S.A.G. Engineering Products" }],
  creator: "S.A.G. Engineering Products",
  publisher: "S.A.G. Engineering Products",

  openGraph: {
    title: "SAG Engineering Products | Commercial Kitchen Equipment Manufacturer Mumbai",
    description:
      "ISO-certified manufacturer, supplier & exporter of commercial kitchen, hospital, galley, bakery, fast-food & stainless steel equipment in Mumbai, India.",
    url: "https://www.sagengineering.in",
    siteName: "SAG Engineering Products",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SAG Engineering Products | Commercial Kitchen Equipment Mumbai",
    description:
      "ISO-certified manufacturer, supplier & exporter of commercial kitchen, hospital, galley and stainless steel equipment based in Mumbai, India.",
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
            href="https://wa.me/917738693862?text=Hello%2C%20I%20am%20interested%20in%20your%20products."
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
            href="tel:+917738693862"
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
              +91 77386 93862
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
