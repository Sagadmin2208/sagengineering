"use client";
import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Clock, Send,
  Building, CheckCircle, Award, Globe,
  ChevronDown, ChevronUp,
} from 'lucide-react';

/* ── Static data ──────────────────────────────────────────────── */
const CONTACT_METHODS = [
  {
    icon:  Phone,
    title: "Call Us",
    lines: ["+91 77386 93862", "+91 98920 84449"],
    note:  "Mon–Sat, 9 AM – 6 PM",
    href:  "tel:+917738693862",
    bg:    "bg-[#41BCF5]",
  },
  {
    icon:  Mail,
    title: "Email Us",
    lines: ["sales@sagenginnering.in"],
    note:  "Reply within 2 hours",
    href:  "mailto:sales@sagenginnering.in",
    bg:    "bg-[#2D7C3C]",
  },
  {
    icon:  MapPin,
    title: "Head Office",
    lines: ["Ghatkopar West", "Mumbai – 400084"],
    note:  "Maharashtra, India",
    href:  "https://maps.google.com/?q=Asalpha+Ghatkopar+West+Mumbai",
    bg:    "bg-[#0B1A35]",
  },
  {
    icon:  Clock,
    title: "Business Hours",
    lines: ["Mon – Sat: 9 AM – 6 PM"],
    note:  "Sunday: Closed",
    href:  null,
    bg:    "bg-orange-500",
  },
];

const QUICK_STATS = [
  { icon: Phone, label: "Avg. Response",      value: "< 2 hrs" },
  { icon: Award, label: "Client Satisfaction", value: "98%"    },
  { icon: Globe, label: "Years Experience",    value: "15+"    },
  { icon: Building, label: "Projects Delivered", value: "800+" },
];

const FAQS = [
  {
    q: "What is your typical lead time for custom equipment?",
    a: "Our standard lead time is 2–4 weeks depending on complexity. We'll provide an accurate timeline during the initial consultation.",
  },
  {
    q: "Do you provide installation and maintenance services?",
    a: "Yes. We offer complete installation services and ongoing maintenance support for all equipment. Our team ensures proper setup and optimal performance.",
  },
  {
    q: "What quality certifications do your products carry?",
    a: "All products meet industry standards for food-grade and medical-grade stainless steel. We maintain strict quality control and can provide documentation on request.",
  },
  {
    q: "Can you manufacture based on our custom designs?",
    a: "Absolutely. Share your drawings, specs, or requirements and our engineering team will build to your exact needs.",
  },
  {
    q: "What is your warranty policy?",
    a: "We provide a comprehensive 1–2 year warranty depending on the equipment, covering manufacturing defects.",
  },
];

const PRODUCT_OPTIONS = [
  "Cooking Equipments", "Bakery Equipments", "Galley Equipment",
  "Hospital Equipment", "Fast Food Equipments", "Refrigeration",
  "Washing Equipment", "Other",
];

/* ── Sub-components ────────────────────────────────────────────── */
function Label({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

const inputCls = `w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                  text-gray-900 placeholder-gray-400 bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-[#41BCF5]/50
                  focus:border-[#41BCF5] focus:bg-white transition-all`;

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5
                   text-left hover:bg-gray-50 transition-colors">
        <span className="font-bold text-[#0B1A35] text-sm leading-snug">{q}</span>
        {open
          ? <ChevronUp   size={18} className="text-[#41BCF5] flex-shrink-0 mt-0.5" />
          : <ChevronDown size={18} className="text-gray-400  flex-shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed
                        border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', subject: '', message: '', productInterest: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        company: '', subject: '', message: '', productInterest: '',
      });
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8]">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0B1A35] via-[#1a3158] to-[#0B1A35]
                      pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-[#41BCF5]/20 border border-[#41BCF5]/30 text-[#41BCF5]
                           text-xs font-bold uppercase tracking-widest mb-5">
            <Mail size={12} /> Get in Touch
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let&apos;s bring efficiency and innovation to your commercial kitchen.
            Our team typically responds within 2 hours.
          </p>
        </div>
      </div>

      {/* ── Quick stats ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_STATS.map(({ icon: Icon, label, value }) => (
            <div key={label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100
                         text-center hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#41BCF5]/10 rounded-xl flex items-center
                              justify-center mx-auto mb-3">
                <Icon size={18} className="text-[#41BCF5]" />
              </div>
              <p className="text-2xl font-black text-[#0B1A35]">{value}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact method cards ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_METHODS.map(({ icon: Icon, title, lines, note, href, bg }) => {
            const Wrapper = href
              ? ({ children }) => (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer">{children}</a>
                )
              : ({ children }) => <div>{children}</div>;
            return (
              <Wrapper key={title}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100
                                shadow-sm hover:shadow-lg hover:-translate-y-1
                                transition-all duration-300 group h-full">
                  <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center
                                   justify-center mb-4 group-hover:scale-105
                                   transition-transform duration-300`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-black text-[#0B1A35] mb-2">{title}</h3>
                  {lines.map((l, i) => (
                    <p key={i} className="text-gray-700 font-medium text-sm">{l}</p>
                  ))}
                  <p className="text-gray-400 text-xs mt-1">{note}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>

      {/* ── Form + Office ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Contact form */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-[#0B1A35] mb-1">
              Send Us a Message
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Fill in the form and we&apos;ll respond within 2 hours during business hours.
            </p>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center
                                justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-black text-[#0B1A35] mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Thank you for contacting us. We&apos;ll respond within 2 hours.
                </p>
                <button onClick={() => setIsSubmitted(false)}
                  className="bg-[#41BCF5] text-white px-6 py-2.5 rounded-xl
                             font-bold text-sm hover:bg-[#0B1A35] transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label required>First Name</Label>
                    <input type="text" name="firstName" value={formData.firstName}
                      onChange={handleInputChange} placeholder="Rahul"
                      className={inputCls} required />
                  </div>
                  <div>
                    <Label required>Last Name</Label>
                    <input type="text" name="lastName" value={formData.lastName}
                      onChange={handleInputChange} placeholder="Sharma"
                      className={inputCls} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label required>Email</Label>
                    <input type="email" name="email" value={formData.email}
                      onChange={handleInputChange} placeholder="you@company.com"
                      className={inputCls} required />
                  </div>
                  <div>
                    <Label required>Phone</Label>
                    <input type="tel" name="phone" value={formData.phone}
                      onChange={handleInputChange} placeholder="+91 98xxx xxxxx"
                      className={inputCls} required />
                  </div>
                </div>

                <div>
                  <Label>Company / Restaurant Name</Label>
                  <input type="text" name="company" value={formData.company}
                    onChange={handleInputChange} placeholder="Hotel Grand etc."
                    className={inputCls} />
                </div>

                <div>
                  <Label>Product Interest</Label>
                  <select name="productInterest" value={formData.productInterest}
                    onChange={handleInputChange} className={inputCls}>
                    <option value="">Select a category…</option>
                    {PRODUCT_OPTIONS.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Subject</Label>
                  <input type="text" name="subject" value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Quote for 4-burner cooking range"
                    className={inputCls} />
                </div>

                <div>
                  <Label required>Message</Label>
                  <textarea name="message" value={formData.message}
                    onChange={handleInputChange} rows={4}
                    placeholder="Describe your requirements, quantity, dimensions…"
                    className={`${inputCls} resize-none`} required />
                </div>

                <button type="submit"
                  className="w-full bg-[#41BCF5] hover:bg-[#0B1A35] text-white
                             py-3.5 rounded-xl font-bold shadow-lg
                             hover:shadow-xl transition-all duration-300
                             flex items-center justify-center gap-2 group">
                  <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Office info + map */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h3 className="text-lg font-black text-[#0B1A35] mb-5 flex items-center gap-2">
                <Building size={17} className="text-[#41BCF5]" /> Our Offices
              </h3>
              <div className="space-y-5">
                {[
                  {
                    label: "Head Office — Mumbai",
                    addr:  "Survey No. 23, G. No. 15, DK Market, Subhash Nagar, Jangleshwar Road, Asalpha Village, Ghatkopar West, Mumbai – 400084",
                  },
                  {
                    label: "Branch Office — Pune",
                    addr:  "Sr. No. 50/9A/4, Flat No. 13, SAI PRASAD, GHULE Nagar, Vadgaon Bk, Haveli, Pune – 411041",
                  },
                ].map(({ label, addr }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#41BCF5]/10 rounded-lg flex items-center
                                    justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={15} className="text-[#41BCF5]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0B1A35] text-sm mb-0.5">{label}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{addr}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-8 h-8 bg-[#41BCF5]/10 rounded-lg flex items-center
                                  justify-center flex-shrink-0">
                    <Phone size={15} className="text-[#41BCF5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1A35] text-sm">+91 77386 93862</p>
                    <p className="text-gray-500 text-sm">+91 98920 84449</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#41BCF5]/10 rounded-lg flex items-center
                                  justify-center flex-shrink-0">
                    <Mail size={15} className="text-[#41BCF5]" />
                  </div>
                  <a href="mailto:sales@sagenginnering.in"
                    className="text-sm text-gray-600 hover:text-[#41BCF5] transition-colors">
                    sales@sagenginnering.in
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <MapPin size={15} className="text-[#41BCF5]" />
                <h4 className="font-bold text-[#0B1A35] text-sm">Find Us on Map</h4>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2!2d72.913!3d19.074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sGhatkopar+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SAG Engineering Location"
              />

              <div className="px-5 py-3">
                <a
                  href="https://maps.app.goo.gl/ajWVcBtUmgZF3NBT7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#41BCF5] hover:text-[#0B1A35] transition-colors"
                  aria-label="Open SAG Engineering office location in Google Maps"
                >
                  <MapPin size={12} /> Open in Google Maps
                </a>
              </div>
            </div>
              
            {/* Immediate assistance box */}
            <div className="bg-gradient-to-r from-[#0B1A35] to-[#1a3158]
                            rounded-2xl p-6 text-white">
              <h4 className="font-black mb-4">Need Immediate Assistance?</h4>
              <div className="space-y-3">
                {[
                  { icon: Phone, title: "Direct Line",     sub: "+91 77386 93862" },
                  { icon: Clock, title: "Response Time",   sub: "Within 2 hours (business hours)" },
                  { icon: Award, title: "Satisfaction Rate", sub: "98% happy clients" },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center
                                    justify-center flex-shrink-0">
                      <Icon size={14} className="text-[#41BCF5]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{title}</p>
                      <p className="text-white/60 text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#0B1A35] mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">Quick answers to common queries about our process</p>
        </div>
        <div className="space-y-3">
          {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </div>
    </div>
  );
}
