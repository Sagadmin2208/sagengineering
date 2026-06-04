"use client";
import React, { useEffect, useState } from 'react';
import { ChevronRight, Phone, Mail, ArrowRight, Menu, X, Award, ChevronDown, FileText, Youtube, Instagram, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  
  // 🔹 STATE FOR CATEGORIES FROM API
  const [productCategories, setProductCategories] = useState([]);

  // --- HELPER TO FIX IMAGE DISPLAY ---
  const getImageSrc = (imgData) => {
    if (!imgData) return '/placeholder-image.jpg'; // Fallback if no image
    if (imgData.startsWith('http') || imgData.startsWith('data:')) {
      return imgData;
    }
    return `data:image/png;base64,${imgData}`;
  };

  // 🔹 FETCH CATEGORIES ON MOUNT
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        const data = await res.json();
        if (data.success) {
          // Transform API data to match your navbar structure
          const formattedCategories = data.categories.map(cat => ({
            name: cat.name,
            // Use helper to format image, fallback if null
            image: getImageSrc(cat.image), 
            // Generate link slug from name (e.g., "Cooking Equipments" -> "cooking-equipments")
            link: `/products/${cat.name.toLowerCase().replace(/\s+/g, '-')}` 
          }));
          
          // Add "All" category manually at the start if you want
          const allCategory = {
             name: 'All',
             image: formattedCategories[0]?.image || '', // Use first cat image as fallback
             link: '/products/All'
          };

          setProductCategories([allCategory, ...formattedCategories]);
        }
      } catch (error) {
        console.error("Failed to fetch categories for navbar:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle hover enter
  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setShowProducts(true);
  };

  // Handle hover leave with delay
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowProducts(false);
    }, 300); 
    setHideTimeout(timeout);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Enhanced Top Bar */}
      <div
        className="text-white py-3 border-b border-gray-200/30"
        style={{ backgroundColor: '#0B1A35' }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              {/* Phone - always visible */}
              <div className="flex items-center sm:space-x-2 space-x-1 hover:text-green-300 transition-colors duration-300">
                <div
                  className="rounded-full flex items-center justify-center sm:w-5 sm:h-5 w-4 h-4"
                  style={{ backgroundColor: '#41BCF5' }}
                >
                  <Phone className="sm:w-3 sm:h-3 w-2.5 h-2.5" />
                </div>
                <span className="font-medium sm:text-base text-sm">
                  +91 9892084449
                </span>
              </div>

              {/* Email - hidden on mobile */}
              <div className="hidden sm:flex items-center sm:space-x-2 space-x-1 hover:text-green-300 transition-colors duration-300">
                <div
                  className="rounded-full flex items-center justify-center sm:w-5 sm:h-5 w-4 h-4"
                  style={{ backgroundColor: '#41BCF5' }}
                >
                  <Mail className="sm:w-3 sm:h-3 w-2.5 h-2.5" />
                </div>
                <span className="font-medium sm:text-base text-sm">
                  sales@sagenginnering.in
                </span>
              </div>

              <div className="hidden lg:flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#41BCF5' }}
                >
                  <FileText size={12} />
                </div>
                <span className="font-medium">GST: 27AQZPG1192J1Z9</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Connect:</span>
              <div className="flex space-x-2">
                {/* Social Icons */}
                <a href="https://www.youtube.com/@prashantgatkal4956" target="_blank" rel="noopener noreferrer">
                  <div className="w-6 h-6 hover:opacity-80 rounded-md flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-105" style={{ backgroundColor: '#41BCF5' }}>
                    <Youtube className="w-3 h-3 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                </a>
                <a href="https://www.instagram.com/sagengineering_products/" target="_blank" rel="noopener noreferrer">
                  <div className="w-6 h-6 hover:opacity-80 rounded-md flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-105" style={{ backgroundColor: '#41BCF5' }}>
                    <Instagram className="w-3 h-3 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/sag-engineering-products/" target="_blank" rel="noopener noreferrer">
                  <div className="w-6 h-6 hover:opacity-80 rounded-md flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-105" style={{ backgroundColor: '#41BCF5' }}>
                    <Linkedin className="w-3 h-3 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                </a>
                <a href="https://www.facebook.com/SAGEngineeringProducts/" target="_blank" rel="noopener noreferrer">
                  <div className="w-6 h-6 hover:opacity-80 rounded-md flex items-center justify-center transition-all duration-300 cursor-pointer group hover:scale-105" style={{ backgroundColor: '#41BCF5' }}>
                    <Facebook className="w-3 h-3 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Navigation */}
      <nav className={`transition-all duration-700 ${isScrolled ? 'bg-white/98 backdrop-blur-xl shadow-2xl py-3 border-b border-gray-100' : 'bg-white/95 backdrop-blur-lg py-5 shadow-lg'}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <Link href="/">
                  <img src='/logomain.jpeg' alt="S.A.G. Engineering Logo" className="w-44 h-15 " />
                </Link>
              </div>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                href="/"
                className="relative px-5 py-3 rounded-2xl transition-all duration-300 font-semibold group overflow-hidden"
                style={{ color: '#333333' }}
                onMouseEnter={(e) => e.target.style.color = '##41BCF5'}
                onMouseLeave={(e) => e.target.style.color = '#333333'}
              >
                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl opacity-10" style={{ backgroundColor: '#41BCF5' }}></div>
                <span className="relative">Home</span>
              </Link>

              {/* Enhanced Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="relative flex items-center px-5 py-3 rounded-2xl transition-all duration-300 font-semibold group overflow-hidden"
                  style={{ color: '#333333' }}
                  onMouseEnter={(e) => e.target.style.color = '##41BCF5'}
                  onMouseLeave={(e) => e.target.style.color = '#333333'}
                >
                  <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl opacity-10" style={{ backgroundColor: '#41BCF5' }}></div>
                  <Link href='/products/cooking-equipments' ><span className="relative mr-1">Products</span></Link>
                  <ChevronDown
                    size={16}
                    className={`relative transition-all duration-500 ${showProducts ? 'rotate-180' : ''}`}
                    style={{ color: showProducts ? '##41BCF5' : 'inherit' }}
                  />
                </button>

                {showProducts && (
                  <div className="absolute top-full left-1/2 mt-3 w-[900px] bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 animate-fadeInDown -translate-x-1/2">
                    <div className="p-6">
                      <div className="grid grid-cols-6 gap-6">
                        {/* 🔹 MAPPED FROM API STATE */}
                        {productCategories.slice(0, 12).map((category, index) => (
                          <Link
                            key={index}
                            href={category.link}
                            onClick={() => setShowProducts(false)}
                          >
                            <div
                              className="flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg"
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F4F6F8'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-16 h-16 object-cover mb-2 rounded-lg"
                              />
                              <h3
                                className="font-bold text-sm uppercase tracking-wide"
                                style={{ color: '#0B1A35' }}
                              >
                                {category.name}
                              </h3>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                        <Link
                          href="/products/All"
                          onClick={() => setShowProducts(false)}
                          className="inline-flex items-center font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300"
                          style={{ color: '##41BCF5', backgroundColor: '#F4F6F8' }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#41BCF5';
                            e.target.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#F4F6F8';
                            e.target.style.color = '##41BCF5';
                          }}
                        >
                          Explore All Products
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {['About', 'Services', 'Contact', 'Blog', 'Gallery'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative px-5 py-3 rounded-2xl transition-all duration-300 font-semibold group overflow-hidden"
                  style={{ color: '#333333' }}
                  onMouseEnter={(e) => e.target.style.color = '##41BCF5'}
                  onMouseLeave={(e) => e.target.style.color = '#333333'}
                >
                  <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl opacity-10" style={{ backgroundColor: '#41BCF5' }}></div>
                  <span className="relative">{item}</span>
                </Link>
              ))}

              <Link href='/contact'>
                <button
                  className="ml-6 bg-[#41BCF5] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
                >
                  <span className="relative flex items-center">
                    <Award className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={16} />
                    Get Quote
                  </span>
                </button>
              </Link>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden p-4 rounded-2xl transition-all duration-300 group"
              style={{ backgroundColor: '#F4F6F8' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#41BCF520'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#F4F6F8'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative">
                {isMenuOpen ?
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-300" style={{ color: '##41BCF5' }} /> :
                  <Menu size={24} className="group-hover:scale-110 transition-transform duration-300" style={{ color: '#0B1A35' }} />
                }
              </div>
            </button>
          </div>

         {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-8 pb-8 border-t border-gray-100">
              <div className="flex flex-col space-y-3 pt-8">
                
                {/* 1. Added onClick to close menu on Home click */}
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="transition-all duration-300 py-4 px-6 rounded-2xl font-semibold group"
                  style={{ color: '#333333' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#41BCF5';
                    e.target.style.backgroundColor = '#F4F6F8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#333333';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" style={{ backgroundColor: '#41BCF5' }}></div>
                    Home
                  </span>
                </Link>

                {/* Enhanced Mobile Products */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowProducts(!showProducts)}
                    className="w-full text-left flex items-center justify-between transition-all duration-300 py-4 px-6 rounded-2xl font-semibold group"
                    style={{ color: '#333333' }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#41BCF5';
                      e.target.style.backgroundColor = '#F4F6F8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#333333';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" style={{ backgroundColor: '#41BCF5' }}></div>
                      Products
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-all duration-500 ${showProducts ? 'rotate-180' : ''}`}
                      style={{ color: showProducts ? '#41BCF5' : 'inherit' }}
                    />
                  </button>

                  {showProducts && (
                    <div className="ml-6 space-y-2 rounded-2xl p-4" style={{ backgroundColor: '#F4F6F8' }}>
                      {/* 🔹 MAPPED FROM API STATE (Mobile) - You already had this correct! */}
                      {productCategories.map((category, index) => (
                        <Link
                          key={index}
                          href={category.link}
                          onClick={() => {
                            setShowProducts(false);
                            setIsMenuOpen(false);
                          }}
                          className="block py-3 px-4 rounded-xl text-sm transition-all duration-300 group"
                          style={{ color: '#333333' }}
                          onMouseEnter={(e) => {
                            e.target.style.color = '#41BCF5';
                            e.target.style.backgroundColor = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#333333';
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <span className="flex items-center">
                            <ChevronRight size={12} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {['About', 'Services', 'Contact', 'Blog', 'Gallery'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    // 2. Added onClick here to close menu for mapped items
                    onClick={() => setIsMenuOpen(false)}
                    className="transition-all duration-300 py-4 px-6 rounded-2xl font-semibold group"
                    style={{ color: '#333333' }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#41BCF5';
                      e.target.style.backgroundColor = '#F4F6F8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#333333';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" style={{ backgroundColor: '#41BCF5' }}></div>
                      {item}
                    </span>
                  </Link>
                ))}

                {/* 3. Added onClick to the final CTA Quote button */}
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <button
                    className="text-white px-8 py-5 rounded-2xl mt-6 font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group w-full"
                    style={{ background: '#41BCF5' }}
                  >
                    <span className="relative flex items-center justify-center">
                      <Award className="mr-2" size={20} />
                      Get Your Quote Now
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;