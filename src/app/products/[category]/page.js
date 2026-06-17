"use client";
import React, { useEffect, useState } from 'react';
import { Search, Award, Loader2, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function ProductsPage() {
  const params = useParams();

  const [categories,          setCategories         ] = useState([{ id: 'All', name: 'All Products' }]);
  const [selectedCategoryId,  setSelectedCategoryId ] = useState('All');
  const [searchTerm,          setSearchTerm         ] = useState('');
  const [products,            setProducts           ] = useState([]);
  const [loading,             setLoading            ] = useState(true);
  const [currentPage,         setCurrentPage        ] = useState(1);
  const [totalPages,          setTotalPages         ] = useState(1);
  const [sidebarOpen,         setSidebarOpen        ] = useState(false);

  /* 1. Fetch categories */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/category");
        const data = await res.json();
        if (data.success) {
          setCategories([{ id: 'All', name: 'All Products' }, ...data.categories]);
        }
      } catch (e) { console.error("Failed to fetch categories", e); }
    })();
  }, []);

  /* 2. Match URL slug to category */
  useEffect(() => {
    if (!params?.category || categories.length <= 1) return;
    const slug = params.category;
    if (slug === 'All' || slug === 'all') {
      setSelectedCategoryId('All'); setCurrentPage(1);
    } else {
      const match = categories.find(c =>
        c.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      );
      if (match) { setSelectedCategoryId(match.id); setCurrentPage(1); }
    }
  }, [params, categories]);

  /* 3. Fetch products */
  useEffect(() => {
    if (categories.length === 1 && categories[0].id === 'All') return;
    (async () => {
      try {
        setLoading(true);
        const url = selectedCategoryId === 'All'
          ? `/api/getproducts?page=${currentPage}`
          : `/api/getproducts/getcatid?categoryId=${selectedCategoryId}&page=${currentPage}`;
        const res  = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data   || []);
          setTotalPages(data.totalPages || 1);
        } else { setProducts([]); }
      } catch (e) { console.error("Failed to fetch products", e); }
      finally { setLoading(false); }
    })();
  }, [selectedCategoryId, currentPage, categories.length]);

  const handleCategoryChange = (id) => {
    setSelectedCategoryId(id);
    setCurrentPage(1);
    setSidebarOpen(false);
  };

  const getImageSrc = (p) => {
    if (!p.image) return "/placeholder-product.jpg";
    if (p.image.startsWith("data:image")) return p.image;
    return `data:image/jpeg;base64,${p.image}`;
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCategoryName =
    categories.find(c => c.id === selectedCategoryId)?.name || 'All Products';

  return (
    <div className="min-h-screen bg-[#F4F6F8] mt-36">

      {/* ── Header banner ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0B1A35] via-[#1a3158] to-[#0B1A35] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-[#41BCF5]/20 border border-[#41BCF5]/30 text-[#41BCF5]
                           text-xs font-bold uppercase tracking-widest mb-4">
            <Award size={12} /> Premium Quality
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">
            Our Products
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of premium stainless steel solutions
            designed for modern commercial kitchens and healthcare facilities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="lg:w-64 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-base font-black text-[#0B1A35] mb-4
                             flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#41BCF5]" />
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm
                                font-medium transition-all duration-200 flex items-center
                                justify-between group ${
                      selectedCategoryId === cat.id
                        ? 'bg-[#41BCF5] text-white shadow-md shadow-[#41BCF5]/30'
                        : 'text-gray-600 hover:bg-[#41BCF5]/10 hover:text-[#0B1A35]'
                    }`}>
                    <span className="truncate pr-2">{cat.name}</span>
                    {selectedCategoryId === cat.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality badge */}
            <div className="bg-gradient-to-br from-[#0B1A35] to-[#1a3158]
                            rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#41BCF5]/20 rounded-xl flex items-center
                                justify-center">
                  <Award className="text-[#41BCF5]" size={20} />
                </div>
                <h4 className="font-bold text-sm">Quality Assured</h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                All products are manufactured using premium-grade stainless steel
                with ISO-standard quality control.
              </p>
            </div>
          </aside>

          {/* ── Main content ──────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Search + breadcrumb */}
            <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200
                             bg-white text-gray-900 text-sm placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-[#41BCF5]/50
                             focus:border-[#41BCF5] shadow-sm transition-shadow"
                />
              </div>
              <span className="text-sm text-gray-500 flex-shrink-0">
                <span className="font-semibold text-[#0B1A35]">{selectedCategoryName}</span>
                {!loading && ` · ${filteredProducts.length} items`}
              </span>
              {/* Mobile category dropdown */}
              <div className="lg:hidden w-full sm:w-auto">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white
                             text-gray-900 text-sm focus:outline-none
                             focus:ring-2 focus:ring-[#41BCF5]/50">
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="animate-spin text-[#41BCF5] mb-4" size={36} />
                <p className="text-gray-500 font-medium">Loading products…</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <Link href={`/product/${product.slug}`} key={product.id}>
                      <article className="group bg-white rounded-2xl border border-gray-100
                                          shadow-sm hover:shadow-xl hover:-translate-y-1
                                          transition-all duration-300 overflow-hidden
                                          flex flex-col h-full">
                        {/* Image */}
                        <div className="relative h-52 bg-gray-50 overflow-hidden flex
                                        items-center justify-center p-3">
                          <img
                            src={getImageSrc(product)}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain
                                       group-hover:scale-105 transition-transform
                                       duration-500 mix-blend-multiply"
                            onError={(e) => { e.currentTarget.src = "/placeholder-product.jpg"; }}
                          />
                          {/* Category badge */}
                          <span className="absolute top-3 left-3 text-[10px] font-bold
                                           uppercase tracking-wider px-2.5 py-1 rounded-full
                                           bg-white/90 text-[#41BCF5] border border-[#41BCF5]/20">
                            {product.category || 'General'}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-bold text-gray-900 text-base mb-1.5
                                         line-clamp-2 group-hover:text-[#41BCF5]
                                         transition-colors leading-snug">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-2 flex-1 leading-relaxed">
                            {product.short_description || product.description}
                          </p>

                          <div className="mt-4 pt-4 border-t border-gray-100
                                          flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-400
                                             uppercase tracking-wider">View Details</span>
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center
                                            justify-center group-hover:bg-[#41BCF5]
                                            group-hover:text-white transition-colors duration-300">
                              <ChevronRight size={16} />
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Empty state */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-24 bg-white rounded-3xl
                                  border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center
                                    justify-center mx-auto mb-4">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Try adjusting your search or selecting a different category.
                    </p>
                    <button
                      onClick={() => { handleCategoryChange('All'); setSearchTerm(''); }}
                      className="px-6 py-2.5 bg-[#41BCF5] hover:bg-[#0B1A35] text-white
                                 rounded-xl text-sm font-bold transition-colors">
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {filteredProducts.length > 0 && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-xl border border-gray-200 text-gray-600
                                 hover:bg-[#41BCF5] hover:text-white hover:border-[#41BCF5]
                                 disabled:opacity-40 disabled:cursor-not-allowed
                                 transition-colors shadow-sm">
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                        .reduce((acc, p, idx, arr) => {
                          if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((p, idx) =>
                          p === '…'
                            ? <span key={`dot${idx}`} className="text-gray-400 px-1">…</span>
                            : (
                              <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-9 h-9 rounded-xl text-sm font-bold
                                            transition-colors ${
                                  p === currentPage
                                    ? 'bg-[#41BCF5] text-white shadow-md shadow-[#41BCF5]/30'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#41BCF5] hover:text-[#41BCF5]'
                                }`}>
                                {p}
                              </button>
                            )
                        )}
                    </div>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2.5 rounded-xl border border-gray-200 text-gray-600
                                 hover:bg-[#41BCF5] hover:text-white hover:border-[#41BCF5]
                                 disabled:opacity-40 disabled:cursor-not-allowed
                                 transition-colors shadow-sm">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
