"use client";
import { ArrowRight, Award, Users, Target, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const FALLBACK_IMAGES = [
  "./Cooking Equipments.png",
  "./Commercial Kitchen Exhaut Hood 4.jpeg",
  "./Cooking Equipments 1.jpeg",
  "./Cooking Equipments 2.jpg",
];

const STATS = [
  { icon: Award,  value: "15+",  label: "Years Experience" },
  { icon: Users,  value: "500+", label: "Happy Clients"     },
  { icon: Star,   value: "5.0",  label: "Google Rating"     },
  { icon: Target, value: "24/7", label: "Customer Support"  },
];

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages]   = useState([]);
  const [loading, setLoading]                     = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/homepage');
        const data     = await response.json();
        if (data.success && data.images?.length > 0) {
          setBackgroundImages(data.images.map(img => img.imageUrl));
        } else {
          setBackgroundImages(FALLBACK_IMAGES);
        }
      } catch {
        setBackgroundImages(FALLBACK_IMAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (backgroundImages.length === 0) return;
    const id = setInterval(
      () => setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length),
      5000
    );
    return () => clearInterval(id);
  }, [backgroundImages]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#071122] mt-24">

      {/* ── Background layer ──────────────────────────────────── */}
      <div className="absolute inset-0">
        {!loading && backgroundImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            aria-hidden
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchPriority={idx === 0 ? 'high' : 'auto'}
            decoding={idx === 0 ? 'sync' : 'async'}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071122]/95 via-[#071122]/75 to-[#071122]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071122]/80 via-transparent to-transparent" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col justify-center py-20">

          {/* Two-column hero layout */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left: copy */}
            <div className="space-y-7 text-center lg:text-left animate-fadeInUp">

              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 bg-[#41BCF5]/15 border border-[#41BCF5]/30
                              backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-[#41BCF5] rounded-full animate-pulse" />
                <span className="text-[#41BCF5] text-xs font-bold tracking-widest uppercase">
                  Premium Quality — Mumbai, India
                </span>
              </div>

              {/* Heading */}
              <div>
                <p className="text-[#41BCF5] text-sm font-semibold uppercase tracking-widest mb-3">
                  Manufacturers · Exporters · Suppliers
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08]">
                  S.A.G <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-[#41BCF5] to-[#2D7C3C] bg-clip-text text-transparent">
                    Engineering
                  </span>
                  <br />Products
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-[#41BCF5] to-[#2D7C3C]
                                mt-4 rounded-full mx-auto lg:mx-0" />
              </div>

              {/* Sub-copy */}
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Commercial kitchen equipment, galley systems &amp; stainless steel solutions
                engineered for restaurants, hotels, hospitals, and food service operations.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link href="/products/All">
                  <button className="group px-7 py-3.5 bg-[#41BCF5] hover:bg-white text-white
                                     hover:text-[#0B1A35] font-bold rounded-xl shadow-lg
                                     hover:shadow-[#41BCF5]/30 hover:shadow-2xl
                                     transition-all duration-300 flex items-center gap-2">
                    Explore Products
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="group px-7 py-3.5 border-2 border-white/30 hover:border-[#41BCF5]
                                     text-white font-bold rounded-xl
                                     hover:bg-[#41BCF5]/10 transition-all duration-300
                                     flex items-center gap-2">
                    Get a Quote
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Carousel dots */}
              {!loading && backgroundImages.length > 1 && (
                <div className="flex gap-2 justify-center lg:justify-start pt-2">
                  {backgroundImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      aria-label={`Image ${idx + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'w-7 h-2.5 bg-[#41BCF5]'
                          : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Image showcase */}
            <div className="relative hidden lg:block">
              {/* Glow ring */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#41BCF5]/20 to-[#2D7C3C]/20
                              rounded-3xl blur-xl" />
              {/* Frame */}
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-2
                              border border-white/10 shadow-2xl">
                <div className="overflow-hidden rounded-xl h-[520px] bg-gray-900">
                  {loading ? (
                    <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                  ) : (
                    backgroundImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`SAG Engineering Product ${idx + 1}`}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        fetchPriority={idx === 0 ? 'high' : 'auto'}
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover
                                    transition-all duration-1000 ${
                          idx === currentImageIndex
                            ? 'opacity-100 scale-[1.02]'
                            : 'opacity-0 scale-[1.05]'
                        }`}
                      />
                    ))
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
              </div>

              {/* Floating info card */}
              <div className="absolute -bottom-5 left-4 right-4
                              bg-gradient-to-r from-[#41BCF5] to-[#2D7C3C]
                              rounded-xl p-4 shadow-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">Revitalize Your Commercial Kitchen</p>
                    <p className="text-white/70 text-xs">ISO-grade stainless steel solutions</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats band ──────────────────────────────────────── */}
          <div className="mt-20 lg:mt-28">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl
                             px-4 py-5 text-center hover:bg-white/10 hover:border-[#41BCF5]/30
                             transition-all duration-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#41BCF5] to-[#2D7C3C]
                                  rounded-xl flex items-center justify-center mx-auto mb-3
                                  group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-black text-white mb-0.5">{value}</div>
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
