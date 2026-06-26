"use client";
import React, { useState } from 'react';
import {
  Award, Shield, Truck, Info, Zap, Settings, Users,
  X, ChevronRight, Phone, Mail, CheckCircle,
  ArrowLeft, Package, Loader2,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/* ── Static benefits (always shown) ────────────────────────────── */
const BENEFITS = [
  { icon: Shield,   title: 'Hygiene & Safety',    desc: 'Food-grade stainless steel with flame protection.' },
  { icon: Settings, title: 'Custom Engineering',  desc: 'Tailored to your kitchen layout and workflow.'     },
  { icon: Award,    title: 'Durability',           desc: 'Heavy-duty build for long service life.'           },
  { icon: Zap,      title: 'High Performance',     desc: 'Efficient design delivers fast, even results.'     },
];

function InputField({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                   text-gray-900 placeholder-gray-400 bg-gray-50
                   focus:outline-none focus:ring-2 focus:ring-[#41BCF5]/50
                   focus:border-[#41BCF5] focus:bg-white transition-all"
      />
    </div>
  );
}

function ProductDetailsPage() {
  const params = useParams();
  const slug   = params?.slug || 'not-found';

  /* ── State ──────────────────────────────────────────────────── */
  const [activeTab,    setActiveTab   ] = useState('over view');
  const [isModalOpen,  setIsModalOpen ] = useState(false);
  const [submitted,    setSubmitted   ] = useState(false);
  const [product,      setProduct     ] = useState(null);
  const [loading,      setLoading     ] = useState(true);
  const [error,        setError       ] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', description: '',
  });

  /* ── Fetch ──────────────────────────────────────────────────── */
  React.useEffect(() => {
    if (!slug) return;
    setLoading(true); setError(null);
    fetch(`/api/getbyslugproduct/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setProduct({
            ...data.data,
            shortDescription: data.data.short_description,
            longDescription:  data.data.long_description,
            images:           data.data.images         || [],
            features:         data.data.features       || [],
            applications:     data.data.applications   || [],
            specifications:   data.data.specifications || {},
            variants:         data.data.variants       || [],
          });
        } else { setProduct(null); }
        setLoading(false);
      })
      .catch(() => { setError('Failed to fetch product'); setLoading(false); });
  }, [slug]);

  /* ── Helpers ─────────────────────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', description: '' });
    }, 2500);
  };

  const getImageSrc = (image) => {
    if (!image) return 'https://placehold.co/600x400?text=No+Image';
    if (image.startsWith('data:') || image.startsWith('http') || image.startsWith('/')) return image;
    return `data:image/jpeg;base64,${image}`;
  };

  const tabs = [
    { id: 'overview',       label: 'Description',    icon: Info     },
    { id: 'specifications', label: 'Specifications', icon: Settings },
  ];

  /* ── Loading / Error states ─────────────────────────────────── */
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-28 bg-[#F4F6F8]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#41BCF5] animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading product…</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-28 bg-[#F4F6F8]">
      <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
        <Package size={36} className="text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Product not found</h2>
      <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
      <Link href="/products/All">
        <button className="flex items-center gap-2 bg-[#41BCF5] text-white px-6 py-2.5
                           rounded-xl font-bold text-sm hover:bg-[#0B1A35] transition-colors">
          <ArrowLeft size={16} /> Browse All Products
        </button>
      </Link>
    </div>
  );

  /* ── Page ───────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#F4F6F8] pt-36">

      {/* ── Breadcrumb strip ────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#41BCF5] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link href="/products/All" className="hover:text-[#41BCF5] transition-colors">Products</Link>
            {product.category && (
              <>
                <ChevronRight size={14} className="text-gray-300" />
                <Link
                  href={`/products/${product.category?.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-[#41BCF5] transition-colors">
                  {product.category}
                </Link>
              </>
            )}
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-[#0B1A35] font-medium truncate max-w-48">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Top split: image + info ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT: Image ──────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100
                            overflow-hidden group">
              <img
                src={getImageSrc(product.image)}
                alt={product.name}
                className="w-full h-72 lg:h-[380px] object-contain
                           group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* In-stock badge under image */}
            <div className="mt-3 flex items-center gap-2 text-sm text-green-700
                            bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
              <CheckCircle size={15} />
              <span className="font-semibold">In Stock</span>
              <span className="text-gray-400 mx-1">·</span>
              <span className="text-gray-600">Ready to ship</span>
            </div>
          </div>

          {/* RIGHT: Info ──────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-5">

            {/* Category + title */}
            {product.category && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase
                               tracking-widest text-[#41BCF5] bg-[#41BCF5]/10 px-3 py-1
                               rounded-full self-start">
                <Package size={11} /> {product.category}
              </span>
            )}

            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-[#0B1A35] leading-tight mb-3">
                {product.name}
              </h1>
              <div className="w-14 h-1 bg-gradient-to-r from-[#41BCF5] to-[#2D7C3C]
                              rounded-full" />
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-gray-600 leading-relaxed text-base">
                {product.shortDescription}
              </p>
            )}

            {/* Quick feature pills (if present) */}
            {product.features?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 6).map((f, i) => (
                  <span key={i} className="text-xs font-medium text-gray-600 bg-gray-100
                                           px-3 py-1.5 rounded-lg border border-gray-200">
                    ✓ {f}
                  </span>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-[#41BCF5] hover:bg-[#0B1A35] text-white px-7 py-3.5
                           rounded-xl font-bold shadow-lg hover:shadow-xl
                           transition-all duration-300 flex items-center justify-center gap-2 group">
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                Send Inquiry
              </button>
              <a href="tel:+919892084449" className="flex-1">
                <button className="w-full border-2 border-[#0B1A35] text-[#0B1A35]
                                   hover:bg-[#0B1A35] hover:text-white px-7 py-3.5
                                   rounded-xl font-bold transition-all duration-300
                                   flex items-center justify-center gap-2 group">
                  <Phone size={16} /> Call for Quote
                </button>
              </a>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-4 pt-1 flex-wrap">
              {[
                { icon: Shield, text: 'Quality Assured' },
                { icon: Truck,  text: 'PAN India Delivery' },
                { icon: Award,  text: 'ISO Standard' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Icon size={13} className="text-[#41BCF5]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm
                        border border-gray-100 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm
                          font-bold transition-all duration-200 ${
                activeTab === id
                  ? 'bg-[#0B1A35] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#0B1A35] hover:bg-gray-50'
              }`}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">

        {/* DESCRIPTION tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">

            {/* Long description */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h3 className="text-lg font-black text-[#0B1A35] mb-4 flex items-center gap-2">
                <Info size={18} className="text-[#41BCF5]" /> Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.longDescription || product.shortDescription}
              </p>
            </div>

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-[#0B1A35] mb-5">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx}
                      className="flex items-start gap-3 p-3 bg-[#F4F6F8] rounded-xl">
                      <ChevronRight size={15}
                        className="text-[#41BCF5] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applications */}
            {product.applications?.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-[#0B1A35] mb-5 flex items-center gap-2">
                  <Users size={18} className="text-[#41BCF5]" /> Applications
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.applications.map((app, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#41BCF5] text-white text-xs
                                       font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{app}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Optimised for {app.toLowerCase()} environments.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Packing & Delivery */}
            <div className="bg-gradient-to-r from-[#F4F6F8] to-blue-50 rounded-2xl p-6
                            border border-blue-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#41BCF5] rounded-xl flex items-center
                              justify-center flex-shrink-0">
                <Truck size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#0B1A35] mb-1">Packing &amp; Delivery</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Standard packing includes secure, impact-resistant crating.
                  Custom export packing available on request.
                  Lead time: 3–5 business days for standard models.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-black text-[#0B1A35] mb-5">
                Why Choose This Product?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BENEFITS.map(({ icon: Icon, title, desc }) => (
                  <div key={title}
                    className="bg-white rounded-2xl p-5 border border-gray-100
                               shadow-sm hover:shadow-md hover:-translate-y-1
                               transition-all duration-300 group">
                    <div className="w-11 h-11 bg-[#41BCF5]/10 rounded-xl flex items-center
                                    justify-center mb-4 group-hover:bg-[#41BCF5]
                                    transition-colors duration-300">
                      <Icon size={20}
                        className="text-[#41BCF5] group-hover:text-white transition-colors" />
                    </div>
                    <h5 className="font-bold text-[#0B1A35] text-sm mb-1.5">{title}</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SPECIFICATIONS tab */}
        {activeTab === 'specifications' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <Settings size={17} className="text-[#41BCF5]" />
                <h3 className="font-black text-[#0B1A35]">Technical Specifications</h3>
              </div>
              {Object.keys(product.specifications).length > 0 ? (
                <table className="min-w-full divide-y divide-gray-100">
                  <tbody className="divide-y divide-gray-100">
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                        <td className="px-6 py-3.5 text-sm font-bold text-[#0B1A35]
                                       w-2/5 border-r border-gray-100">
                          {key}
                        </td>
                        <td className="px-6 py-3.5 text-sm text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No specifications available for this product.
                </div>
              )}
            </div>

            {/* Variants / Models */}
            {product.variants?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                  <Package size={17} className="text-[#41BCF5]" />
                  <h3 className="font-black text-[#0B1A35]">Available Models</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-[#0B1A35] text-white">
                      <tr>
                        {product.variants.map((v, i) => (
                          <th key={i} className="px-6 py-3 text-left text-xs font-bold
                                                  uppercase tracking-wider">
                            {v.variant_key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {Array.from({
                        length: Math.max(...product.variants.map(v => v.values.length))
                      }).map((_, rowIdx) => (
                        <tr key={rowIdx}
                          className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                          {product.variants.map((v, colIdx) => (
                            <td key={colIdx}
                              className="px-6 py-3 text-gray-700 font-medium">
                              {v.values[rowIdx] || '–'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Inquiry Modal ────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
                        bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md
                          relative overflow-hidden animate-fadeInUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B1A35] to-[#1a3158] px-6 py-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20
                           rounded-lg flex items-center justify-center
                           text-white transition-colors">
                <X size={18} />
              </button>
              <h2 className="text-xl font-black text-white">Send Inquiry</h2>
              <p className="text-white/60 text-sm mt-0.5">
                For: <span className="text-white/90">{product.name}</span>
              </p>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center
                                  justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-lg font-black text-[#0B1A35] mb-2">
                    Inquiry Submitted!
                  </h3>
                  <p className="text-gray-500 text-sm">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <InputField label="Your Name"     name="name"        value={formData.name}        onChange={handleChange} placeholder="Rahul Sharma"       required />
                  <InputField label="Email Address" name="email"       value={formData.email}       onChange={handleChange} placeholder="you@company.com" type="email" required />
                  <InputField label="Phone Number"  name="phone"       value={formData.phone}       onChange={handleChange} placeholder="+91 98xxx xxxxx" type="tel"  required />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Message / Requirements
                    </label>
                    <textarea
                      name="description" value={formData.description} onChange={handleChange}
                      placeholder="Quantity, size, customization needed…"
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                 text-gray-900 placeholder-gray-400 bg-gray-50
                                 focus:outline-none focus:ring-2 focus:ring-[#41BCF5]/50
                                 focus:border-[#41BCF5] focus:bg-white transition-all resize-none"
                    />
                  </div>
                  <button type="submit"
                    className="w-full bg-[#41BCF5] hover:bg-[#0B1A35] text-white py-3
                               rounded-xl font-bold shadow-lg transition-colors duration-300
                               flex items-center justify-center gap-2">
                    <Mail size={16} /> Submit Inquiry
                  </button>
                  <p className="text-xs text-center text-gray-400">
                    We respond within 24 business hours
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
