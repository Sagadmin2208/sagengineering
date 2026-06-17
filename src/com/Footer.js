import { Mail, Phone, MapPin, Youtube, Instagram, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const socialLinks = [
  { Icon: Youtube,   href: "https://www.youtube.com/@prashantgatkal4956",           label: "YouTube"   },
  { Icon: Instagram, href: "https://www.instagram.com/sagengineering_products/",     label: "Instagram" },
  { Icon: Linkedin,  href: "https://www.linkedin.com/in/sag-engineering-products/",  label: "LinkedIn"  },
  { Icon: Facebook,  href: "https://www.facebook.com/SAGEngineeringProducts/",       label: "Facebook"  },
];

const quickLinks = [
  { href: "/",                              label: "Home"        },
  { href: "/about",                         label: "About Us"    },
  { href: "/products/cooking-equipments",   label: "Products"    },
  { href: "/services",                      label: "Services"    },
  { href: "/blog",                          label: "Blog"        },
  { href: "/gallery",                       label: "Gallery"     },
  { href: "/contact",                       label: "Contact"     },
];

const productLinks = [
  { label: "Cooking Equipments",    slug: "cooking-equipments"    },
  { label: "Bakery Equipments",     slug: "bakery-equipments"     },
  { label: "Galley Equipment",      slug: "galley-equipment"      },
  { label: "Fast Food Equipments",  slug: "fast-food-equipments"  },
  { label: "Food Processing",       slug: "food-processing-equipments" },
  { label: "Hospital Equipment",    slug: "hospital-equipment"    },
];

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href}
        className="text-gray-400 hover:text-[#41BCF5] text-sm transition-colors
                   flex items-center gap-2 group py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#41BCF5]
                          flex-shrink-0 transition-colors" />
        {children}
      </Link>
    </li>
  );
}

function SectionHeading({ children }) {
  return (
    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5
                   flex items-center gap-2">
      <span className="w-1 h-4 bg-[#41BCF5] rounded-full inline-block flex-shrink-0" />
      {children}
    </h4>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B1A35]">
      {/* Thin gradient accent line at top */}
      <div className="h-[3px] bg-gradient-to-r from-[#41BCF5] via-[#2D7C3C] to-[#41BCF5]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Company Info ─────────────────────────────────────── */}
          <div>
            <img src="/logomain.jpeg" alt="SAG Engineering Products"
              className="h-14 w-auto mb-5 rounded-lg object-contain" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium manufacturer, supplier &amp; exporter of commercial kitchen
              equipment and stainless steel products. Based in Mumbai, serving
              clients across India and internationally.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-[#41BCF5] rounded-lg
                             flex items-center justify-center transition-colors duration-200">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ──────────────────────────────────────── */}
          <div>
            <SectionHeading>Quick Links</SectionHeading>
            <ul className="space-y-1">
              {quickLinks.map(({ href, label }) => (
                <FooterLink key={label} href={href}>{label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Products ─────────────────────────────────────────── */}
          <div>
            <SectionHeading>Our Products</SectionHeading>
            <ul className="space-y-1">
              {productLinks.map(({ label, slug }) => (
                <FooterLink key={label} href={`/products/${slug}`}>{label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Contact ──────────────────────────────────────────── */}
          <div>
            <SectionHeading>Contact Us</SectionHeading>
            <div className="space-y-4">
              {/* Phone */}
              <a href="tel:+919892084449"
                className="flex items-start gap-3 text-gray-400 hover:text-[#41BCF5] transition-colors group">
                <div className="w-9 h-9 bg-white/10 group-hover:bg-[#41BCF5]/20 rounded-lg
                                flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                  <Phone className="w-4 h-4 text-[#41BCF5]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Call Us</p>
                  <p className="text-sm font-medium">+91 98920 84449</p>
                  <p className="text-sm">+91 90820 08085</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:sales@sagenginnering.in"
                className="flex items-start gap-3 text-gray-400 hover:text-[#41BCF5] transition-colors group">
                <div className="w-9 h-9 bg-white/10 group-hover:bg-[#41BCF5]/20 rounded-lg
                                flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                  <Mail className="w-4 h-4 text-[#41BCF5]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Email Us</p>
                  <p className="text-sm">sales@sagenginnering.in</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center
                                justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#41BCF5]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Head Office</p>
                  <p className="text-sm">Ghatkopar West,<br />Mumbai – 400084</p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white/5 rounded-xl px-4 py-3 mt-1">
                <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                  Business Hours
                </p>
                <p className="text-sm text-gray-400">Mon – Sat &nbsp;|&nbsp; 9:00 AM – 6:00 PM</p>
                <p className="text-sm text-gray-500">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} S.A.G. Engineering Products. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <a href="https://www.newnessmarketing.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#41BCF5] transition-colors text-xs">
                Design: Newness Marketing
              </a>
              <span className="text-gray-700 hidden sm:inline">|</span>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">
                Privacy Policy
              </a>
              <span className="text-gray-700 hidden sm:inline">|</span>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
