import React from 'react';
import Link from 'next/link';
import { Home, Package, Phone, ArrowRight, SearchX } from 'lucide-react';


export const metadata = {
  title: '404 — Page Not Found | SAG Engineering Products',
  description: 'The page you are looking for does not exist.',
};

const QUICK_LINKS = [
  { href: '/',              label: 'Home',         icon: Home    },
  { href: '/products/All',  label: 'All Products', icon: Package },
  { href: '/contact',       label: 'Contact Us',   icon: Phone   },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center
                    px-4 py-20">

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#41BCF5]/5
                        rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2D7C3C]/5
                        rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg w-full">

        {/* Icon */}
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center
                        mx-auto mb-6 shadow-lg border border-gray-100">
          <SearchX className="w-12 h-12 text-[#41BCF5]" />
        </div>

        {/* 404 number */}
        <div className="text-[120px] font-black leading-none mb-2
                        bg-gradient-to-r from-[#0B1A35] via-[#41BCF5] to-[#2D7C3C]
                        bg-clip-text text-transparent">
          404
        </div>

        {/* Text */}
        <h1 className="text-2xl font-black text-[#0B1A35] mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of the links below or go back to the homepage.
        </p>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={label} href={href}>
              <button className={`w-full sm:w-auto flex items-center justify-center gap-2
                                  px-6 py-3 rounded-xl font-bold text-sm transition-all
                                  duration-300 group ${
                href === '/'
                  ? 'bg-[#41BCF5] hover:bg-[#0B1A35] text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-[#0B1A35] border border-gray-200 shadow-sm'
              }`}>
                <Icon size={15} />
                {label}
                <ArrowRight size={13}
                  className="opacity-0 group-hover:opacity-100 -ml-1
                             group-hover:translate-x-1 transition-all" />
              </button>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 mb-4">
            Need help? Reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <a href="tel:+919892084449"
              className="flex items-center justify-center gap-2 text-[#41BCF5]
                         hover:text-[#0B1A35] font-semibold transition-colors">
              <Phone size={14} /> +91 98920 84449
            </a>
            <span className="hidden sm:block text-gray-300">|</span>
            <a href="mailto:sales@sagenginnering.in"
              className="flex items-center justify-center gap-2 text-[#41BCF5]
                         hover:text-[#0B1A35] font-semibold transition-colors">
              sales@sagenginnering.in
            </a>
          </div>
        </div>

        {/* Logo at bottom */}
        <div className="mt-10 flex items-center justify-center gap-3 opacity-40">
          <img src="/logomain.jpeg" alt="SAG Engineering" className="h-8 w-auto" />
        </div>
      </div>
    </div>
  );
}
