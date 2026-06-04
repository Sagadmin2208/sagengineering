"use client";
import React, { useEffect, useState } from 'react';
import { Search, Award, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function ProductsPage() {
  const params = useParams();
  
  // ✅ STATES
  const [categories, setCategories] = useState([{ id: 'All', name: 'All Products' }]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('All'); // Track ID instead of Name
  const [searchTerm, setSearchTerm] = useState(''); // ✅ Search state is now used in the UI
  const [viewMode] = useState('grid');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ 1. FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        
        if (data.success) {
          setCategories([
            { id: 'All', name: 'All Products' },
            ...data.categories
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ 2. HANDLE URL PARAMS (Match Slug to Category ID)
  useEffect(() => {
    if (params?.category && categories.length > 1) {
        const slug = params.category;
        
        if (slug === 'All' || slug === 'all') {
            setSelectedCategoryId('All');
            setCurrentPage(1);
        } else {
            const matchedCategory = categories.find(cat => 
                cat.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
            );

            if (matchedCategory) {
                setSelectedCategoryId(matchedCategory.id);
                setCurrentPage(1);
            }
        }
    }
  }, [params, categories]);

  // ✅ 3. FETCH PRODUCTS (Handles Category ID and Pagination)
  useEffect(() => {
    const fetchProducts = async () => {
      // Don't fetch until categories are loaded (avoids double fetching on mount)
      if (categories.length === 1 && categories[0].id === 'All') return; 

      try {
        setLoading(true);
        let url = '';

        // Determine which API to call based on selected category
        if (selectedCategoryId === 'All') {
          url = `/api/getproducts?page=${currentPage}`;
        } else {
          url = `/api/getproducts/getcatid?categoryId=${selectedCategoryId}&page=${currentPage}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.success) {
          setProducts(data.data || []);
          // Fallback to 1 if your API doesn't return totalPages yet
          setTotalPages(data.totalPages || 1); 
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId, currentPage, categories.length]);

  // ✅ HANDLERS
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1); // Reset to page 1 when changing categories
  };

  const getImageSrc = (product) => {
    if (product.image) {
      if (product.image.startsWith("data:image")) return product.image;
      return `data:image/jpeg;base64,${product.image}`;
    }
    return "/placeholder-product.jpg";
  };

  // ✅ LOCAL SEARCH FILTER (Applies user text search to the server-fetched products)
  const filteredProducts = products.filter(product => {
    return product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      
      {/* Header Banner */}
      <div className="bg-[#41BCF5] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">Our Products</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our comprehensive range of premium stainless steel solutions
              designed for modern kitchens and industrial applications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDEBAR: Dynamic Categories (Desktop) */}
          <div className="hidden lg:block lg:w-1/4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                      selectedCategoryId === category.id
                        ? 'bg-[#41BCF5] text-white shadow-lg transform scale-105'
                        : 'hover:bg-blue-50 text-gray-700 hover:text-[#002F4C]'
                    }`}
                  >
                    <span className="font-medium capitalize truncate pr-2">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#41BCF5] rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="text-yellow-300" size={24} />
                <h4 className="font-bold">Quality Assured</h4>
              </div>
              <p className="text-blue-100 text-sm">
                All our products are manufactured using premium grade stainless steel with ISO certification.
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT: Product Grid & Controls */}
          <div className="lg:w-3/4">
            
            {/* Search Bar & Mobile Category Dropdown */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              
              {/* Search Input (Resolves the unused variable error!) */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 p-3 rounded-xl border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#41BCF5]"
                />
              </div>

              {/* Category Dropdown (Mobile Only) */}
              <div className="lg:hidden md:w-1/3">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#41BCF5]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#41BCF5] mb-4" size={40} />
                <p className="text-lg font-semibold text-gray-600">Loading products...</p>
              </div>
            ) : (
              <>
                {/* Grid */}
                <div className={viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
                }>
                  {filteredProducts.map(product => (
                    <Link href={`/product/${product.slug}`} key={product.id}>
                      <div className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${viewMode === 'list' ? 'flex-row' : ''}`}>
                        
                        {/* Image Area */}
                        <div className={`relative bg-gray-50 flex items-center justify-center p-4 ${viewMode === 'list' ? 'w-1/3' : 'h-56'}`}>
                          <img
                            src={getImageSrc(product)}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-product.jpg";
                            }}
                          />
                        </div>

                        {/* Details Area */}
                        <div className={`p-6 flex flex-col flex-1 ${viewMode === 'list' ? 'justify-center' : ''}`}>
                          <div className="mb-auto">
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] uppercase font-bold tracking-wider rounded-full mb-3">
                              {product.category || 'General'}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#41BCF5] transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-3">
                              {product.short_description || product.description}
                            </p>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                             <span className="text-sm font-semibold text-gray-400">View Details</span>
                             <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#41BCF5] group-hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                             </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900">No products found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search criteria or selecting a different category.</p>
                    <button 
                        onClick={() => {
                          handleCategoryChange('All');
                          setSearchTerm(''); // Clear text search too
                        }}
                        className="mt-6 px-6 py-2 bg-[#41BCF5] text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Clear Filters
                    </button>
                  </div>
                )}

                {/* ✅ PAGINATION CONTROLS */}
                {filteredProducts.length > 0 && totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-4 mt-12">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-[#41BCF5] hover:text-white hover:border-[#41BCF5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <span className="text-gray-700 font-medium">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-[#41BCF5] hover:text-white hover:border-[#41BCF5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={24} />
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