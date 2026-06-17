"use client";
import React from 'react';
import {
  ChevronRight, ArrowRight, Users, Target, Eye, Heart,
  CheckCircle, Factory, Shield, Zap, Settings, Globe,
  Trophy, User, Award, MapPin,
} from 'lucide-react';
import Link from 'next/link';

/* ── Static data ──────────────────────────────────────────────── */
const milestones = [
  { year: "2009", title: "Company Founded",       desc: "S.A.G. Engineering Products established in Mumbai under Mr. Prashant Gatkal." },
  { year: "2012", title: "Hospital Equipment",    desc: "Specialized in medical-grade stainless steel, including premium scrub sinks." },
  { year: "2015", title: "Food Industry Expansion", desc: "Extended expertise to food & beverage equipment for commercial applications." },
  { year: "2018", title: "Kitchen Solutions",     desc: "Launched comprehensive hotel and restaurant kitchen appliance manufacturing." },
  { year: "2021", title: "Quality Certification", desc: "Achieved industry certifications and expanded client base to 200+ customers." },
  { year: "2024", title: "Market Leadership",     desc: "Serving 500+ satisfied clients with cutting-edge stainless steel solutions." },
];

const values = [
  { icon: Shield,  title: "Quality First",       desc: "Every product undergoes rigorous testing to meet the highest industry standards.",    color: "#41BCF5" },
  { icon: Users,   title: "Customer Centric",    desc: "Our clients' success is our success — built through exceptional service.",             color: "#2D7C3C" },
  { icon: Zap,     title: "Innovation",          desc: "Continuously evolving manufacturing processes and designs to stay ahead.",             color: "#0B1A35" },
  { icon: Heart,   title: "Integrity",           desc: "Honest practices, transparent communication, and ethical operations in everything.",   color: "#41BCF5" },
  { icon: Globe,   title: "Sustainability",      desc: "Committed to eco-friendly manufacturing and responsible business practices.",          color: "#2D7C3C" },
  { icon: Trophy,  title: "Excellence",          desc: "Striving for perfection from design to delivery in every aspect of our business.",    color: "#0B1A35" },
];

const capabilities = [
  {
    icon:     Factory,
    title:    "Advanced Manufacturing",
    desc:     "State-of-the-art facility equipped with modern machinery for precision manufacturing.",
    features: ["CNC Machining", "Welding Expertise", "Quality Control", "Custom Fabrication"],
    color:    "#41BCF5",
  },
  {
    icon:     Settings,
    title:    "Custom Solutions",
    desc:     "Tailored designs and engineering solutions to meet specific client requirements.",
    features: ["Design Consultation", "3D Modeling", "Prototype Development", "Scalable Production"],
    color:    "#2D7C3C",
  },
  {
    icon:     CheckCircle,
    title:    "Quality Assurance",
    desc:     "Comprehensive quality management ensuring consistent product excellence at every stage.",
    features: ["Material Testing", "Process Validation", "Final Inspection", "Performance Guarantee"],
    color:    "#0B1A35",
  },
];

const pillars = [
  { icon: Target, title: "Our Mission", body: "To deliver exceptional stainless steel solutions that exceed customer expectations while maintaining the highest standards of quality, innovation, and service excellence." },
  { icon: Eye,    title: "Our Vision",  body: "To become India's leading manufacturer of premium stainless steel equipment, recognised for innovation, reliability, and customer-centric solutions across all industries." },
  { icon: Heart,  title: "Our Values",  body: "Integrity, quality, innovation, and customer satisfaction form the foundation of everything we do, ensuring lasting partnerships and sustainable business growth." },
];

/* ── Page ───────────────────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F8]">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0B1A35] via-[#1a3158] to-[#0B1A35]
                      pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-[#41BCF5]/20 border border-[#41BCF5]/30 text-[#41BCF5]
                           text-xs font-bold uppercase tracking-widest mb-5">
            <Award size={12} /> Est. 2009 · Mumbai, India
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5">
            About S.A.G. Engineering Products
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            At SAG Engineering Products, we take pride in being Mumbai&apos;s premier provider
            of commercial kitchen equipment. From state-of-the-art cooking ranges to advanced
            bakery equipment, our products are designed with precision, durability,
            and innovation at their core.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/contact">
              <button className="group bg-[#41BCF5] hover:bg-white text-white
                                 hover:text-[#0B1A35] px-8 py-3.5 rounded-xl font-bold
                                 shadow-lg transition-all duration-300 flex items-center gap-2">
                Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/products/All">
              <button className="border-2 border-white/30 hover:border-[#41BCF5]
                                 text-white hover:text-[#41BCF5] px-8 py-3.5 rounded-xl
                                 font-bold transition-all duration-300">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Key stats ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "15+",  label: "Years Experience"  },
            { value: "500+", label: "Happy Clients"      },
            { value: "1000+",label: "Products Delivered" },
            { value: "98%",  label: "Satisfaction Rate"  },
          ].map(({ value, label }) => (
            <div key={label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100
                         text-center hover:shadow-md transition-shadow">
              <p className="text-3xl font-black text-[#0B1A35]">{value}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5 uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission / Vision / Values ─────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1A35] mb-3">
              What We Stand For
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100
                           hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#41BCF5] rounded-2xl flex items-center
                                justify-center mb-6 group-hover:scale-105
                                transition-transform duration-300">
                  <Icon className="text-white" size={26} />
                </div>
                <h3 className="text-xl font-black text-[#0B1A35] mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core values ───────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1A35] mb-3">
              What Drives Us
            </h2>
            <p className="text-gray-500">The values baked into every product we build</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title}
                className="flex items-start gap-5 p-6 bg-[#F4F6F8] rounded-2xl
                           border border-transparent hover:border-gray-200
                           hover:bg-white hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                flex-shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: `${color}18`, color }}>
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="font-black text-[#0B1A35] mb-1.5">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1A35] mb-3">
              Our Journey
            </h2>
            <p className="text-gray-500">
              From humble beginnings to industry leadership
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5
                            bg-gradient-to-b from-[#41BCF5] to-[#2D7C3C]
                            hidden sm:block" />

            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-start gap-6">
                  {/* Year bubble */}
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0B1A35] text-white
                                  rounded-2xl flex flex-col items-center justify-center
                                  shadow-lg z-10 relative">
                    <span className="text-[10px] font-bold text-[#41BCF5] uppercase tracking-wide">
                      {m.year.slice(0, 2)}
                    </span>
                    <span className="text-lg font-black">{m.year.slice(2)}</span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm
                                  border border-gray-100 hover:shadow-md
                                  hover:border-[#41BCF5]/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] font-bold text-[#41BCF5] uppercase
                                       tracking-widest">{m.year}</span>
                    </div>
                    <h4 className="font-black text-[#0B1A35] text-base mb-1">{m.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1A35] mb-3">
              Our Capabilities
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              State-of-the-art facilities and expertise that enable us to deliver exceptional results
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-7">
            {capabilities.map(({ icon: Icon, title, desc, features, color }) => (
              <div key={title}
                className="bg-[#F4F6F8] rounded-2xl p-8 border border-gray-100
                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                                mb-6 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-black text-[#0B1A35] mb-3">{title}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed text-sm">{desc}</p>
                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckCircle size={15} className="text-[#41BCF5] flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1A35] mb-3">
              Leadership
            </h2>
            <p className="text-gray-500">The vision behind S.A.G. Engineering Products</p>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Avatar */}
              <div className="text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-[#41BCF5] to-[#0B1A35]
                                rounded-3xl flex items-center justify-center mx-auto mb-5
                                shadow-xl">
                  <User className="text-white" size={52} />
                </div>
                <h3 className="text-xl font-black text-[#0B1A35]">Mr. Prashant Gatkal</h3>
                <p className="text-[#41BCF5] font-semibold text-sm mt-1">
                  Proprietor &amp; Founder
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-[#41BCF5]/10 rounded-full
                                 text-xs font-bold text-[#41BCF5]">
                  15+ Years Experience
                </span>
              </div>

              {/* Bio + skills */}
              <div className="lg:col-span-2 space-y-5">
                <p className="text-gray-600 leading-relaxed">
                  Visionary leader with extensive experience in stainless steel manufacturing
                  and business development. Under his leadership, S.A.G. Engineering has grown
                  from a local supplier into a trusted name serving 500+ clients across India.
                </p>
                <div>
                  <h4 className="font-black text-[#0B1A35] mb-3 text-sm uppercase
                                  tracking-wider">Areas of Expertise</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Business Strategy", "Quality Management", "Client Relations", "Product Development"].map(s => (
                      <div key={s} className="flex items-center gap-2.5">
                        <ChevronRight size={14} className="text-[#41BCF5] flex-shrink-0" />
                        <span className="text-sm text-gray-700">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office locations ──────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#0B1A35] text-center mb-8">
            Our Locations
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                city:    "Mumbai Head Office",
                addr:    "G. No. 15, DK Market, Subhash Nagar, Jangleshwar Rd, Asalpha Village, Ghatkopar West, Mumbai – 400084",
                primary: true,
              },
              {
                city:    "Pune Branch",
                addr:    "Sr. No. 50/9A/4, Flat No. 13, SAI PRASAD, GHULE Nagar, Vadgaon Bk, Haveli, Pune – 411041",
                primary: false,
              },
            ].map(({ city, addr, primary }) => (
              <div key={city}
                className={`rounded-2xl p-6 border flex gap-4 ${
                  primary
                    ? 'bg-[#0B1A35] border-[#41BCF5]/20'
                    : 'bg-[#F4F6F8] border-gray-100'
                }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                 flex-shrink-0 ${
                  primary ? 'bg-[#41BCF5]/20' : 'bg-white'
                }`}>
                  <MapPin size={18}
                    className={primary ? 'text-[#41BCF5]' : 'text-[#41BCF5]'} />
                </div>
                <div>
                  <p className={`font-black text-sm mb-1 ${
                    primary ? 'text-white' : 'text-[#0B1A35]'
                  }`}>{city}</p>
                  <p className={`text-xs leading-relaxed ${
                    primary ? 'text-gray-400' : 'text-gray-500'
                  }`}>{addr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-[#0B1A35] via-[#1a3158] to-[#0B1A35]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Ready to Experience the S.A.G. Difference?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join 500+ satisfied clients who trust us for their commercial kitchen and
            stainless steel equipment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="group bg-[#41BCF5] hover:bg-white text-white
                                 hover:text-[#0B1A35] px-8 py-3.5 rounded-xl font-bold
                                 shadow-lg transition-all duration-300
                                 flex items-center gap-2">
                Contact Us Today
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/products/All">
              <button className="border-2 border-white/30 hover:border-[#41BCF5]
                                 text-white hover:text-[#41BCF5] px-8 py-3.5 rounded-xl
                                 font-bold transition-all duration-300">
                View Our Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
