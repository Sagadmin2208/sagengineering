"use client";
import React from "react";
import { MapPin, Star, ArrowRight, Award, Users, Shield, Cog, Building, Zap, CheckCircle, Globe, Truck, Factory } from 'lucide-react';
import Hero from '@/com/Hero';
import Link from "next/link";

export default function SAGHomepage() {

  const services = [
    {
      icon: Factory,
      title: "Advanced Manufacturing",
      description: "Cutting-edge facilities with precision engineering and quality assurance",
      color: "from-green-600 to-green-500",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: Truck,
      title: "Nationwide Supply",
      description: "Seamless logistics and supply chain management across India",
      color: "from-blue-900 to-blue-700",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: Globe,
      title: "Strategic Trading",
      description: "Global partnerships for comprehensive product solutions",
      color: "from-green-500 to-green-400",
      bgColor: "from-green-50 to-green-100"
    }
  ];

  const products = [
    {
      title: "Hospital Equipment",
      subtitle: "Hospital-Grade Solutions",
      description: "Premium medical-grade stainless steel solutions including surgical equipment, scrub sinks, and specialized medical furniture designed for healthcare excellence.",
      image: "/Chapati Pressing Machine 350 ,600 &1000 Per Hour.webp",
      features: ["Medical Grade Steel", "Antimicrobial Surface", "Corrosion Resistant", "Easy Sterilization"],
      badge: "ISO Certified",
      stats: { projects: "500+", rating: "4.9" }
    },
    {
      title: "Commercial Kitchen",
      subtitle: "Professional Appliances",
      description: "High-performance kitchen equipment for commercial and residential use, engineered for durability, efficiency, and modern culinary demands.",
      image: "/Commercial Kitchen Exhaut Hood 4.jpeg",
      features: ["Galley Hot Plate", "Food Warming Showcase", "Salamander", "Pot Burner"],
      badge: "Premium Quality",
      stats: { projects: "800+", rating: "4.8" }
    }
  ];

  const qualities = [
    {
      icon: Shield,
      title: "Premium Finishing",
      desc: "Mirror-polish surface treatment with attention to detail",
      primaryColor: "#2D7C3C",
      bgColor: "#41BCF520"
    },
    {
      icon: Zap,
      title: "Corrosion Protection",
      desc: "Advanced coating for harsh environment resistance",
      primaryColor: "#0B1A35",
      bgColor: "#0B1A3520"
    },
    {
      icon: Award,
      title: "Superior Strength",
      desc: "High tensile strength for long-lasting performance",
      primaryColor: "#2D7C3C",
      bgColor: "#2D7C3C20"
    },
    {
      icon: Star,
      title: "Modern Aesthetics",
      desc: "Contemporary designs that blend form and function",
      primaryColor: "#41BCF5",
      bgColor: "#41BCF520"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full border mb-4"
              style={{ 
                backgroundColor: '#41BCF520', 
                borderColor: '#41BCF540' 
              }}
            >
              <Cog className="w-4 h-4 mr-2" style={{ color: '#2D7C3C' }} />
              <span className="text-sm font-medium" style={{ color: '#2D7C3C' }}>Our Expertise</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: '#0B1A35' }}
            >
              Core Services
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#333333' }}
            >
              Comprehensive solutions backed by years of expertise and state-of-the-art infrastructure
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`relative group bg-gradient-to-br ${service.bgColor} p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100`}
              >
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                    <service.icon className="text-white" size={32} />
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-4 group-hover:transition-colors duration-300"
                    style={{ color: '#0B1A35' }}
                    onMouseEnter={(e) => e.target.style.color = '#2D7C3C'}
                    onMouseLeave={(e) => e.target.style.color = '#0B1A35'}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: '#333333' }}
                  >
                    {service.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section 
        id="products" 
        className="py-24"
        style={{ backgroundColor: '#F4F6F8' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full border mb-4"
              style={{ 
                backgroundColor: '#2D7C3C20', 
                borderColor: '#2D7C3C40' 
              }}
            >
              <Building className="w-4 h-4 mr-2" style={{ color: '#2D7C3C' }} />
              <span className="text-sm font-medium" style={{ color: '#2D7C3C' }}>Premium Products</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: '#0B1A35' }}
            >
              Engineered for Excellence
            </h2>
            <p 
              className="text-xl max-w-4xl mx-auto"
              style={{ color: '#333333' }}
            >
              Industry-leading stainless steel solutions that set new standards in quality, durability, and performance across healthcare and culinary sectors
            </p>
          </div>

          <div className="space-y-16">
            {products.map((product, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: '#41BCF520', 
                          color: '#2D7C3C' 
                        }}
                      >
                        ✓ {product.badge}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div 
                            className="text-2xl font-bold"
                            style={{ color: '#0B1A35' }}
                          >{product.stats.projects}</div>
                          <div 
                            className="text-xs"
                            style={{ color: '#333333' }}
                          >Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center text-2xl font-bold" style={{ color: '#0B1A35' }}>
                            <Star className="w-5 h-5 mr-1" style={{ color: '#41BCF5' }} fill="currentColor" />
                            {product.stats.rating}
                          </div>
                          <div 
                            className="text-xs"
                            style={{ color: '#333333' }}
                          >Rating</div>
                        </div>
                      </div>
                    </div>

                    <h3 
                      className="text-3xl md:text-4xl font-bold mb-2"
                      style={{ color: '#0B1A35' }}
                    >
                      {product.title}
                    </h3>
                    <p 
                      className="text-xl font-semibold mb-6"
                      style={{ color: 'black' }}
                    >
                      {product.subtitle}
                    </p>
                    <p 
                      className="text-lg leading-relaxed mb-8"
                      style={{ color: '#333333' }}
                    >
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                        <CheckCircle className="flex-shrink-0" size={18} style={{ color: '#41BCF5' }} />
                        <span className="font-medium text-sm" style={{ color: '#333333' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/products/cooking-equipments">
                      <button 
                        className="text-white px-8 bg-[#41BCF5] py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group"
                       
                      >
                        View Products
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button 
                        className="border-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
                        style={{ 
                          borderColor: '#0B1A35', 
                          color: '#0B1A35' 
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#0B1A35';
                          e.target.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#0B1A35';
                        }}
                      >
                        Request Quote
                      </button>
                    </Link>
                  </div>
                </div>

                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Floating elements */}
                  <div 
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl shadow-xl opacity-20 group-hover:opacity-40 group-hover:rotate-12 transition-all duration-500"
                    style={{ background: 'linear-gradient(135deg, #2D7C3C 0%, #41BCF5 100%)' }}
                  ></div>
                  <div 
                    className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl shadow-lg opacity-20 group-hover:opacity-40 group-hover:-rotate-12 transition-all duration-500"
                    style={{ background: 'linear-gradient(135deg, #0B1A35 0%, #2D7C3C 100%)' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Qualities Grid */}
          <div className="mt-24 bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h3 
                className="text-3xl font-bold mb-4"
                style={{ color: '#0B1A35' }}
              >Why Choose Our Products</h3>
              <p 
                className="text-lg"
                style={{ color: '#333333' }}
              >Excellence in every detail, engineered for your success</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualities.map((quality, index) => (
                <div 
                  key={index} 
                  className="text-center group p-6 rounded-2xl transition-all duration-300"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F4F6F8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      color: quality.primaryColor,
                      backgroundColor: quality.bgColor 
                    }}
                  >
                    <quality.icon className="text-current" size={24} />
                  </div>
                  <h4 
                    className="font-bold mb-3 text-lg"
                    style={{ color: '#0B1A35' }}
                  >{quality.title}</h4>
                  <p 
                    className="leading-relaxed"
                    style={{ color: '#333333' }}
                  >{quality.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div 
                  className="inline-flex items-center px-4 py-2 rounded-full border mb-4"
                  style={{ 
                    backgroundColor: '#0db6ffff', 
                    borderColor: '#222526ff' 
                  }}
                >
                  <Users className="w-4 h-4 mr-2" style={{ color: '#002F4C ' }} />
                  <span className="text-sm font-medium" style={{ color: '#002F4C ' }}>About S.A.G.</span>
                </div>
                <h2 
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ color: '#0B1A35' }}
                >
                  Powered by Expertise & Innovation
                </h2>
                <p 
                  className="text-xl leading-relaxed mb-6"
                  style={{ color: '#333333' }}
                >
                  <span className="font-bold" style={{ color: '#0B1A35' }}>S.A.G. Engineering Products</span> are a prominent entity engaged in manufacturing, supplying, and trading a remarkable gamut of Hospital Equipment and Kitchen Appliances. Our success is driven by a dedicated team of professionals including procurement specialists, innovative designers, skilled manufacturing personnel, and quality control experts—all working in harmony to exceed expectations.
                </p>

                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: '#333333' }}
                >
                  Located in <span className="font-bold" style={{ color: '#2D7C3C' }}>Mumbai, Maharashtra</span>, our advanced infrastructure spans multiple specialized units for manufacturing, design, R&D, and warehousing under one integrated facility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div 
                  className="p-6 rounded-2xl border group hover:shadow-lg transition-all duration-300"
                  style={{ 
                    background: 'linear-gradient(135deg, #41BCF510 0%, #2D7C3C10 100%)',
                    borderColor: '#41BCF540'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: '#41BCF5' }}
                  >
                    <Users className="text-white" size={24} />
                  </div>
                  <h4 
                    className="font-bold mb-2 text-lg"
                    style={{ color: '#0B1A35' }}
                  >Expert Workforce</h4>
                  <p style={{ color: '#333333' }}>Skilled professionals across all operational departments</p>
                </div>
                <div 
                  className="p-6 rounded-2xl border group hover:shadow-lg transition-all duration-300"
                  style={{ 
                    background: 'linear-gradient(135deg, #0B1A3510 0%, #2D7C3C10 100%)',
                    borderColor: '#0B1A3540'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: '#41BCF5 ' }}
                  >
                    <Building className="text-white" size={24} />
                  </div>
                  <h4 
                    className="font-bold mb-2 text-lg"
                    style={{ color: '#0B1A35' }}
                  >Modern Infrastructure</h4>
                  <p style={{ color: '#333333' }}>State-of-the-art facility in Mumbai&apos;s industrial hub</p>
                </div>
              </div>

            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/Cooking Equipments.png"
                  alt="Manufacturing Facility"
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Location Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 group hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: '#41BCF5' }}
                  >
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p 
                      className="font-bold text-lg"
                      style={{ color: '#0B1A35' }}
                    >Mumbai Hub</p>
                    <p style={{ color: '#333333' }}>Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}

    </div>
  );
}