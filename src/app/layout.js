import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/com/Navbar";
import Footer from "@/com/Footer";
import PropTypes from "prop-types";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⭐ SEO Metadata
export const metadata = {
  // title: "SAG Engineering Product | Manufacturers  Suppliers  Exporter of Commercial Kitchen equipments stainless steel products galley equipments | Mumbai Pune India",
  title:  "SAG Engineering | Commercial Kitchen Equipment Manufacturer, Supplier & Exporter",
  description:
    "SAG Engineering provides high-quality SCO tages, engineering tools, industrial parts, and manufacturing solutions.",

 keywords: [
  "commercial kitchen equipment",
  "kitchen equipment manufacturer",
  "stainless steel kitchen equipment",
  "hotel kitchen equipment",
  "restaurant kitchen equipment",
  "industrial kitchen equipment",
  "fast food equipment",
  "bakery equipment",
  "canteen kitchen equipment",
  "catering equipment",
  "galley equipment",
  "commercial cooking range",
  "SS kitchen products",
  "kitchen equipment supplier",
  "kitchen equipment exporter",
  "Mumbai kitchen equipment manufacturer",
  "Pune kitchen equipment supplier",
  "SAG Engineering"
],

  openGraph: {
    // title: "SAG Engineering Product | Manufacturers  Suppliers  Exporter of Commercial Kitchen equipments stainless steel products galley equipments | Mumbai Pune India",
    title:  "SAG Engineering | Commercial Kitchen Equipment Manufacturer, Supplier & Exporter",
    description:
      "Your trusted partner for SCO tages, engineering tools, and industrial manufacturing solutions.",
    url: "https://yourwebsite.com",
    siteName: "SAG Engineering",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ⭐ Layout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Extra SEO */}
        <meta
          name="keywords"
          content="SCO, Tages, SAG Engineering, Industrial Tools, Engineering Parts, Manufacturing Solutions"
        />
        <meta name="author" content="SAG Engineering" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Navbar />

        {/* Page content */}
        {children}

        <Footer />

        {/* Floating WhatsApp + Call Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
          {/* WhatsApp */}
          <a
            href="https://wa.me/+919892084449" // 🔁 Replace with real number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaWhatsapp size={24} />
          </a>

          {/* Call */}
          <a
            href="tel:+919892084449" // 🔁 Replace with real number
            className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Phone size={24} />
          </a>
          <a
  href="mailto:sales@sagenginnering.in"
  className="flex items-center justify-center w-14 h-14 
             bg-red-500 text-white rounded-full shadow-lg
             hover:scale-110 transition-transform"
>
  <Mail size={24} />
</a>

        </div>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
