"use client"
import React, { useState } from 'react';
import { Award, Shield, Truck,  Info, Zap, Settings, Users,  X, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';

function ProductDetailsPage() {
  const params = useParams();
  const slug = params?.slug || 'not-found';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    file: null,
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Inquiry submitted!");
    setIsModalOpen(false);
  };

  const [activeTab, setActiveTab] = useState('overview');

  // Fetch product by slug from API
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`/api/getbyslugproduct/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProduct({
            ...data.data,
            name: data.data.name,
            slug: data.data.slug,
            image: data.data.image,
            category: data.data.category,
            shortDescription: data.data.short_description,
            longDescription: data.data.long_description,
            images: data.data.images || [],
            features: data.data.features || [],
            applications: data.data.applications || [],
            specifications: data.data.specifications || {},
            variants: data.data.variants || [],
            benefits: [
              {
                icon: Shield,
                title: 'Hygiene & Safety',
                description: 'Food-grade stainless steel surfaces with flame protection.'
              },
              {
                icon: Settings,
                title: 'Custom Engineering',
                description: 'Designed to match your kitchen layout and workflow.'
              },
              {
                icon: Award,
                title: 'Durability',
                description: 'Heavy-duty construction ensures long service life.'
              },
              {
                icon: Zap,
                title: 'High Performance',
                description: 'Efficient burners deliver fast, even heating.'
              }
            ]
          });
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product');
        setLoading(false);
      });
  }, [slug]);

  // Tabs Configuration: Removed "Applications & Packing"
  const tabs = [
    { id: 'overview', label: 'Description' },
    { id: 'specifications', label: 'Specification' }
  ];

  // Removed unused handleBackClick function

  const getImageSrc = (image) => {
    if (!image) return "https://placehold.co/600x400?text=No+Image";
    if (image.startsWith("/9j/") || image.length > 200) {
      return image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;
    }
    if (image.startsWith("http") || image.startsWith("/")) {
      return image;
    }
    return `data:image/jpeg;base64,${image}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin"></div></div>;
  if (error || !product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-white mt-40 font-sans text-gray-800">
      
      {/* 1. TOP SECTION: Clean Split (Image Left | Intro Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Main Image + Thumbnails */}
          <div className="lg:col-span-5 space-y-4">
          {/* <div className="border border-gray-200 p-2 rounded-lg overflow-hidden"> */}
  <img
    src={getImageSrc(product.image)}
    alt={product.name}
    className="
      w-full 
      h-80 lg:h-96 
      object-contain 
      bg-gray-50 
      rounded-md
      transition-transform 
      duration-500 
      ease-in-out
      hover:scale-110
    "
  />
{/* </div> */}

            {/* Thumbnails Placeholder */}
          
          </div>

          {/* RIGHT: Title & Short Description (Clean Text Area) */}
          <div className="lg:col-span-7 flex flex-col justify-start">
             {/* Category Tag */}
             <div className="mb-2">
                {/* <span className="text-sm font-bold text-black uppercase tracking-wider">
                    {product.category}
                </span> */}
             </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-indigo-950 mb-6 border-b-2 border-indigo-100 pb-4 inline-block">
              {product.name}
            </h1>
            
            <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
              <p>{product.shortDescription}</p>

               <p className="mt-4 text-sm text-gray-500">
               
                <span className="font-bold text-black">Product Category:</span>   {product.category} 
                
              </p>
              <p className="mt-4 text-sm text-gray-500">
                <span className="font-bold text-black ml-3">Availability:</span> In Stock
               
                
              </p>
              
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-auto">
              <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-[#41BCF5] text-white px-8 py-3 rounded hover:bg-indigo-800 transition font-bold shadow-md">
                Send Inquiry
              </button>
              <a href="tel:+919892084449" className="flex-1 border-2 border-[#41BCF5] text-[#41BCF5] px-8 py-3 rounded hover:bg-indigo-50 transition font-bold text-center">
                Request Quote
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. TABS BAR (Reduced to 2 Tabs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex flex-wrap border-b-4 border-[#41BCF5]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 font-bold text-sm md:text-base tracking-wide uppercase transition-colors
                ${activeTab === tab.id 
                  ? 'bg-[#41BCF5] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TAB CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        
        {/* TAB: DESCRIPTION (Combined Overview + Applications + Packing) */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* -- Part A: Main Text & Features -- */}
            <div>
              <h3 className="text-xl font-bold text-[#41BCF5] mb-4 flex items-center">
                <Info className="mr-2" size={20}/> Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.longDescription || product.shortDescription}
                <br /><br />
                Our {product.name} is engineered for superior performance in demanding environments. 
                Below are the key characteristics that make this product the preferred choice for professionals.
              </p>

              {/* Key Features List */}
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#41BCF5] mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Key Features:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <ChevronRight className="text-indigo-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* -- Part B: Applications (Moved from separate tab) -- */}
            <div>
               <h3 className="text-xl font-bold text-[#41BCF5] mb-6 flex items-center border-t border-gray-200 pt-8">
                  <Users className="mr-2" size={20}/> Applications & Usage
              </h3>
              
              <div className="prose prose-indigo max-w-none mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.applications.map((app, index) => (
                          <div key={index} className="flex">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#41BCF5] text-white font-bold text-sm mr-4 flex-shrink-0">
                                  {index + 1}
                              </span>
                              <div>
                                  <h4 className="text-lg font-bold text-gray-900 mb-1">{app}</h4>
                                  <p className="text-sm text-gray-600">
                                      Optimized for {app.toLowerCase()} environments.
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
            </div>

            {/* -- Part C: Packing Info (Moved from separate tab) -- */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                    <Truck className="mr-2" size={18} /> Packing & Delivery
                </h4>
                <p className="text-sm text-blue-800">
                    Standard packing includes secure, impact-resistant crating. 
                    Custom packing options available for export. 
                    Lead time: 3-5 business days for standard models.
                </p>
            </div>

            {/* -- Part D: Benefits Grid -- */}
            <div className="pt-8">
                <h4 className="font-bold text-gray-900 mb-4">Why Choose This Product?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                    <div key={index} className="bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
                        <Icon className="text-[#41BCF5] mb-2" size={24} />
                        <h5 className="font-bold text-sm mb-1">{benefit.title}</h5>
                        <p className="text-xs text-gray-500">{benefit.description}</p>
                    </div>
                    );
                })}
                </div>
            </div>
          </div>
        )}

        {/* TAB: SPECIFICATION */}
        {activeTab === 'specifications' && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-[#41BCF5] mb-6 flex items-center">
                <Settings className="mr-2" size={20}/> Technical Specifications
            </h3>
            
            <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {Object.entries(product.specifications).map(([key, value], idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 w-1/3">{key}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Variants Table */}
        {product.variants && product.variants.length > 0 && (
  <div className="mt-8">
    <h4 className="font-bold text-gray-900 mb-3">Available Models</h4>

    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-500">
        {/* TABLE HEADER */}
        <thead className="text-xs text-white uppercase bg-[#41BCF5]">
          <tr>
            {product.variants.map((variant, i) => (
              <th key={i} className="px-6 py-3">
                {variant.variant_key}
              </th>
            ))}
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {Array.from({
            length: Math.max(
              ...product.variants.map(v => v.values.length)
            ),
          }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b hover:bg-gray-50"
            >
              {product.variants.map((variant, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  {variant.values[rowIndex] || "-"}
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-1 text-[#41BCF5]">Send Inquiry</h2>
            <p className="text-sm text-gray-500 mb-6"> We&apos;ll get back to you within 24 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              <input type="tel" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" required />
              <textarea name="description" placeholder="Message / Specific Requirements" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none h-24" />
              <button type="submit" className="w-full bg-[#41BCF5] text-white py-3 rounded-lg font-bold hover:bg-indigo-800 transition shadow-lg">Submit Inquiry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;