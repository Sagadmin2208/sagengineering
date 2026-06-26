"use client";
import React, { useEffect, useState } from 'react';
import { Phone, Mail, Menu, X, Award, ChevronDown, ArrowRight, FileText, Youtube, Instagram, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const pathname = usePathname();

  const getImageSrc = (imgData) => {
    if (!imgData) return '/placeholder-image.jpg';
    if (imgData.startsWith('http') || imgData.startsWith('data:')) return imgData;
    return `data:image/png;base64,${imgData}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res  = await fetch('/api/category');
        const data = await res.json();
        if (data.success) {
          const formatted = data.categories.map(cat => ({
            name:  cat.name,
            image: getImageSrc(cat.image),
            link:  `/products/${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
          }));
          setProductCategories([
            { name: 'All Products', image: formatted[0]?.image || '', link: '/products/All' },
            ...formatted,
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch categories for navbar:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    if (hideTimeout) { clearTimeout(hideTimeout); setHideTimeout(null); }
    setShowProducts(true);
  };
  const handleMouseLeave = () => {
    const t = setTimeout(() => setShowProducts(false), 280);
    setHideTimeout(t);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close everything on navigation */
  useEffect(() => { setIsMenuOpen(false); setShowProducts(false); }, [pathname]);

  const isActive         = (href) => pathname === href;
  const isProductsActive = pathname?.startsWith('/products') || pathname?.startsWith('/product');
  const navLinks = ['About', 'Services', 'Contact', 'Blog', 'Gallery'];

  const socialLinks = [
    { Icon: Youtube,   href: "https://www.youtube.com/@prashantgatkal4956",            label: "YouTube"   },
    { Icon: Instagram, href: "https://www.instagram.com/sagengineering_products/",      label: "Instagram" },
    { Icon: Linkedin,  href: "https://www.linkedin.com/in/sag-engineering-products/",   label: "LinkedIn"  },
    { Icon: Facebook,  href: "https://www.facebook.com/SAGEngineeringProducts/",        label: "Facebook"  },
  ];

  const linkCls = (active) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
      active
        ? 'text-[#41BCF5] bg-[#41BCF5]/10'
        : 'text-[#333333] hover:text-[#41BCF5] hover:bg-gray-50'
    }`;

  return (
    <div className="fixed top-0 w-full z-50">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="bg-[#0B1A35] text-white py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Contact info */}
            <div className="flex items-center gap-5 text-sm">
              <a href="tel:+917738693862"
                className="flex items-center gap-2 hover:text-[#41BCF5] transition-colors group">
                <span className="w-5 h-5 bg-[#41BCF5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-2.5 h-2.5" />
                </span>
                <span className="font-medium">+91 77386 93862</span>
              </a>

              <a href="mailto:sales@sagenginnering.in"
                className="hidden sm:flex items-center gap-2 hover:text-[#41BCF5] transition-colors">
                <span className="w-5 h-5 bg-[#41BCF5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-2.5 h-2.5" />
                </span>
                <span className="font-medium">sales@sagenginnering.in</span>
              </a>

              <span className="hidden lg:flex items-center gap-1.5 text-white/50 text-xs">
                <FileText className="w-3 h-3" /> GST: 27AQZPG1192J1Z9
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs hidden sm:inline mr-1">Follow:</span>
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-6 h-6 bg-white/10 hover:bg-[#41BCF5] rounded flex items-center justify-center transition-colors duration-200">
                  <Icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main nav ────────────────────────────────────────────── */}
      <nav className={`transition-all duration-400 bg-white ${
        isScrolled ? 'shadow-md py-2' : 'shadow-sm py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/logomain.jpeg" alt="S.A.G. Engineering Products"
                width={160} height={48}
                className="h-12 w-auto object-contain"
                priority />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className={linkCls(isActive('/'))}>Home</Link>

              {/* Products mega-menu */}
              <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link href="/products/All"
                  className={`${linkCls(isProductsActive)} flex items-center gap-1`}>
                  Products
                  <ChevronDown size={13}
                    className={`transition-transform duration-300 ${showProducts ? 'rotate-180 text-[#41BCF5]' : ''}`} />
                </Link>

                {showProducts && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                                  w-[860px] bg-white rounded-2xl shadow-2xl
                                  border border-gray-100 animate-fadeInDown">
                    <div className="p-5">
                      <div className="grid grid-cols-6 gap-2">
                        {productCategories.slice(0, 12).map((cat, i) => (
                          <Link key={i} href={cat.link} onClick={() => setShowProducts(false)}
                            className="flex flex-col items-center text-center p-3 rounded-xl
                                       hover:bg-[#F4F6F8] transition-all duration-200 group">
                            <div className="w-14 h-14 rounded-xl overflow-hidden mb-2 bg-gray-50
                                            border border-gray-100 group-hover:border-[#41BCF5]/40
                                            transition-colors flex-shrink-0">
                              <img src={cat.image} alt={cat.name}
                                className="w-full h-full object-cover"
                                loading="lazy" decoding="async" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wide
                                             text-[#0B1A35] group-hover:text-[#41BCF5]
                                             transition-colors leading-tight">
                              {cat.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
                        <Link href="/products/All" onClick={() => setShowProducts(false)}
                          className="inline-flex items-center gap-2 text-sm font-bold
                                     px-6 py-2.5 rounded-xl bg-[#0B1A35] text-white
                                     hover:bg-[#41BCF5] transition-colors duration-200">
                          View All Products <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`}
                  className={linkCls(isActive(`/${item.toLowerCase()}`))}>
                  {item}
                </Link>
              ))}

              <Link href="/contact">
                <button className="ml-3 bg-[#41BCF5] hover:bg-[#0B1A35] text-white
                                   px-5 py-2.5 rounded-xl font-bold text-sm shadow
                                   hover:shadow-lg transition-all duration-300
                                   flex items-center gap-2 group">
                  <Award size={14} className="group-hover:rotate-12 transition-transform" />
                  Get Quote
                </button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-[#41BCF5]/10
                         transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu">
              {isMenuOpen
                ? <X    size={22} className="text-[#0B1A35]" />
                : <Menu size={22} className="text-[#0B1A35]" />}
            </button>
          </div>

          {/* ── Mobile menu ──────────────────────────────────────── */}
          {isMenuOpen && (
            <div className="lg:hidden mt-3 pb-4 border-t border-gray-100 animate-fadeInDown">
              <div className="flex flex-col gap-1 pt-3">

                <Link href="/" onClick={() => setIsMenuOpen(false)}
                  className={linkCls(isActive('/'))}>Home</Link>

                {/* Mobile products accordion */}
                <div>
                  <button onClick={() => setShowProducts(!showProducts)}
                    className={`${linkCls(isProductsActive)} w-full flex justify-between`}>
                    Products
                    <ChevronDown size={14}
                      className={`transition-transform ${showProducts ? 'rotate-180' : ''}`} />
                  </button>
                  {showProducts && (
                    <div className="mx-3 mt-1 bg-gray-50 rounded-xl p-3 space-y-0.5">
                      {productCategories.map((cat, i) => (
                        <Link key={i} href={cat.link}
                          onClick={() => { setShowProducts(false); setIsMenuOpen(false); }}
                          className="block py-2 px-3 rounded-lg text-sm text-gray-600
                                     hover:text-[#41BCF5] hover:bg-white transition-colors">
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navLinks.map((item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={linkCls(isActive(`/${item.toLowerCase()}`))}>
                    {item}
                  </Link>
                ))}

                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-2">
                  <button className="w-full bg-[#41BCF5] text-white py-3 px-6
                                     rounded-xl font-bold text-sm flex items-center
                                     justify-center gap-2 hover:bg-[#0B1A35] transition-colors">
                    <Award size={15} /> Get Your Quote
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
