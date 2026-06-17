"use client";
import React from "react";
import {
  MapPin, Star, ArrowRight, Award, Users, Shield,
  Cog, Building, Zap, CheckCircle, Globe, Truck,
  Factory, Phone, Mail,
} from 'lucide-react';
import Hero from '@/com/Hero';
import Link from "next/link";

/* ── Static data ──────────────────────────────────────────────── */
const services = [
  {
    icon:    Factory,
    title:   "Advanced Manufacturing",
    description: "Precision-engineered stainless steel fabrication with strict quality control at every stage.",
    accent:  "#2D7C3C",
    bg:      "from-green-50 to-emerald-50",
    border:  "#2D7C3C",
  },
  {
    icon:    Truck,
    title:   "Nationwide Supply",
    description: "Seamless logistics and supply chain management across India — on time, every time.",
    accent:  "#0B1A35",
    bg:      "from-blue-50 to-slate-50",
    border:  "#41BCF5",
  },
  {
    icon:    Globe,
    title:   "Global Exports",
    description: "Trusted international partnerships for comprehensive, world-class product solutions.",
    accent:  "#41BCF5",
    bg:      "from-cyan-50 to-blue-50",
    border:  "#2D7C3C",
  },
];

const products = [
  {
    title:       "Hospital Equipment",
    subtitle:    "Healthcare-Grade Solutions",
    description: "Premium medical-grade stainless steel equipment — surgical fixtures, scrub sinks, and specialized furniture engineered for healthcare environments.",
    image:       "/Chapati Pressing Machine 350 ,600 &1000 Per Hour.webp",
    features:    ["Medical-Grade Steel", "Antimicrobial Surface", "Corrosion Resistant", "Easy Sterilization"],
    badge:       "ISO Certified",
    stats:       { projects: "300+", label: "Healthcare Projects" },
  },
  {
    title:       "Commercial Kitchen",
    subtitle:    "Professional Appliances",
    description: "High-performance kitchen equipment for hotels, restaurants, and canteens — built for durability, efficiency, and modern culinary demands.",
    image:       "/Commercial Kitchen Exhaut Hood 4.jpeg",
    features:    ["Galley Hot Plate", "Food Warming Showcase", "Salamander", "Pot Burner"],
    badge:       "Premium Quality",
    stats:       { projects: "800+", label: "Kitchen Projects" },
  },
];

const qualities = [
  { icon: Shield, title: "Premium Finishing",    desc: "Mirror-polish surfaces with meticulous attention to detail.",  color: "#2D7C3C", bg: "#2D7C3C15" },
  { icon: Zap,    title: "Corrosion Protection", desc: "Advanced coatings designed for harsh commercial environments.", color: "#0B1A35", bg: "#0B1A3515" },
  { icon: Award,  title: "Superior Strength",    desc: "Heavy-duty construction for long service life.",               color: "#41BCF5", bg: "#41BCF515" },
  { icon: Star,   title: "Modern Aesthetics",    desc: "Contemporary designs that blend form and function.",           color: "#2D7C3C", bg: "#2D7C3C15" },
];

/* ── Component ────────────────────────────────────────────────── */
export default function SAGHomepage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/* ══ Services ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                             bg-[#41BCF5]/10 border border-[#41BCF5]/30 text-sm
                             font-semibold text-[#2D7C3C] mb-4">
              <Cog className="w-4 h-4" /> Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1A35] mb-4">
              Core Services
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Comprehensive engineering solutions backed by years of expertise
              and state-of-the-art infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, description, accent, bg, border }) => (
              <div key={title}
                className={`relative group bg-gradient-to-br ${bg} p-8 rounded-3xl
                             border border-gray-100 hover:shadow-2xl hover:-translate-y-2
                             transition-all duration-400 overflow-hidden`}>
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                  style={{ backgroundColor: border }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                                shadow-lg group-hover:scale-105 group-hover:rotate-3
                                transition-all duration-300"
                  style={{ backgroundColor: accent }}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#0B1A35] mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Products ══════════════════════════════════════════════ */}
      <section id="products" className="py-24 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                             bg-[#2D7C3C]/10 border border-[#2D7C3C]/30 text-sm
                             font-semibold text-[#2D7C3C] mb-4">
              <Building className="w-4 h-4" /> Premium Products
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1A35] mb-4">
              Engineered for Excellence
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              Industry-leading stainless steel solutions setting new standards in quality,
              durability, and performance across healthcare and culinary sectors.
            </p>
          </div>

          <div className="space-y-20">
            {products.map((product, index) => (
              <div key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>

                {/* Copy */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#41BCF5]/10 text-[#2D7C3C]
                                     text-sm font-semibold rounded-full">
                      ✓ {product.badge}
                    </span>
                    <span className="text-2xl font-black text-[#0B1A35]">
                      {product.stats.projects}
                    </span>
                    <span className="text-sm text-gray-500">{product.stats.label}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-[#0B1A35] mb-1">
                      {product.title}
                    </h3>
                    <p className="text-[#41BCF5] font-semibold text-lg mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 p-3
                                              bg-white rounded-xl shadow-sm border
                                              border-gray-100 hover:border-[#41BCF5]/40
                                              transition-colors">
                        <CheckCircle size={16} className="text-[#41BCF5] flex-shrink-0" />
                        <span className="font-medium text-sm text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/products/cooking-equipments">
                      <button className="group bg-[#41BCF5] hover:bg-[#0B1A35] text-white
                                         px-7 py-3.5 rounded-xl font-bold shadow-lg
                                         hover:shadow-xl transition-all duration-300
                                         flex items-center gap-2">
                        View Products
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button className="border-2 border-[#0B1A35] text-[#0B1A35]
                                         hover:bg-[#0B1A35] hover:text-white
                                         px-7 py-3.5 rounded-xl font-bold
                                         transition-all duration-300">
                        Request Quote
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="absolute -inset-3 bg-gradient-to-tr from-[#41BCF5]/15
                                  to-[#2D7C3C]/10 rounded-3xl blur-xl opacity-0
                                  group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 lg:h-96 object-cover
                                 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40
                                    via-transparent to-transparent opacity-0
                                    group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Qualities grid */}
          <div className="mt-24 bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-black text-[#0B1A35] mb-2">Why Choose Our Products</h3>
              <p className="text-gray-500">Excellence in every detail, engineered for your success</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualities.map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title}
                  className="text-center p-6 rounded-2xl hover:shadow-md
                             hover:-translate-y-1 transition-all duration-300 group
                             border border-transparent hover:border-gray-100">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                                  mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: bg, color }}>
                    <Icon size={22} />
                  </div>
                  <h4 className="font-bold text-[#0B1A35] mb-2">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ About ═════════════════════════════════════════════════ */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <div className="space-y-7">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                 bg-[#41BCF5]/10 border border-[#41BCF5]/30 text-sm
                                 font-semibold text-[#0B1A35] mb-4">
                  <Users className="w-4 h-4 text-[#41BCF5]" /> About S.A.G.
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#0B1A35] mt-4 mb-5">
                  Powered by Expertise &amp; Innovation
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  <span className="font-bold text-[#0B1A35]">S.A.G. Engineering Products</span>{" "}
                  is a prominent entity engaged in manufacturing, supplying, and trading a
                  comprehensive range of hospital equipment and commercial kitchen appliances.
                  Our success is driven by a dedicated team of procurement specialists,
                  designers, skilled technicians, and quality control experts.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Located in{" "}
                  <span className="font-bold text-[#2D7C3C]">Mumbai, Maharashtra</span>,
                  our advanced infrastructure spans manufacturing, design, R&amp;D, and
                  warehousing — all under one integrated facility.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users,    title: "Expert Workforce",     desc: "Skilled professionals across all departments" },
                  { icon: Building, title: "Modern Infrastructure", desc: "State-of-the-art facility in Mumbai" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title}
                    className="p-5 rounded-2xl border border-[#41BCF5]/20
                               bg-gradient-to-br from-[#41BCF5]/5 to-transparent
                               hover:shadow-md hover:border-[#41BCF5]/40
                               transition-all duration-300 group">
                    <div className="w-11 h-11 rounded-xl bg-[#41BCF5] flex items-center
                                    justify-center mb-3 group-hover:scale-110
                                    transition-transform duration-300">
                      <Icon className="text-white" size={20} />
                    </div>
                    <h4 className="font-bold text-[#0B1A35] mb-1">{title}</h4>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image with floating badge */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/Cooking Equipments.png"
                  alt="SAG Engineering Facility"
                  className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A35]/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5
                              shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 bg-[#41BCF5] rounded-2xl flex items-center
                                  justify-center">
                    <MapPin className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1A35]">Mumbai Head Office</p>
                    <p className="text-gray-500 text-sm">Ghatkopar West, Maharashtra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA Band ══════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#0B1A35] via-[#1a2f5c] to-[#0B1A35] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Ready to upgrade your kitchen setup?
              </h3>
              <p className="text-[#41BCF5]/80">
                Get a free quote from our engineering team today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/contact">
                <button className="group bg-[#41BCF5] hover:bg-white text-white hover:text-[#0B1A35]
                                   px-8 py-3.5 rounded-xl font-bold shadow-lg
                                   transition-all duration-300 flex items-center gap-2">
                  <Award size={16} className="group-hover:rotate-12 transition-transform" />
                  Get Free Quote
                </button>
              </Link>
              <a href="tel:+919892084449">
                <button className="border-2 border-white/30 hover:border-[#41BCF5]
                                   text-white px-8 py-3.5 rounded-xl font-bold
                                   transition-all duration-300 flex items-center gap-2">
                  <Phone size={16} /> Call Us Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
