"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, FileText } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from APIs
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesRes = await fetch('/api/category');
      const categoriesData = await categoriesRes.json();
      
      // Fetch products
      const productsRes = await fetch('/api/catalogue');
      const productsData = await productsRes.json();
      
      if (categoriesData.success && productsData.success) {
        setCategories(categoriesData.categories);
        setProducts(productsData.products);
      }
    } catch (err) {
      console.error('Error fetching gallery data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Build category list with "All"
  const categoryNames = ["All", ...categories.map(cat => cat.name)];

  // Filter products by category
  const filteredItems =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.categoryName === selectedCategory);

  const openLightbox = (product) => setSelectedImage(product);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction) => {
    const currentIndex = filteredItems.findIndex((p) => p.id === selectedImage.id);
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    }
    setSelectedImage(filteredItems[newIndex]);
  };

  const handleViewPDF = (pdfUrl, e) => {
    e.stopPropagation();
    window.open(pdfUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 mt-30 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 mt-30">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0B1A35" }}>
          Our Gallery
        </h1>
        <p className="text-lg text-gray-600">Browse our project images</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {categoryNames.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:shadow-md"
            }`}
            style={{
              backgroundColor: selectedCategory === category ? "#41BCF5" : "white",
              borderColor: selectedCategory === category ? "#2D7C3C" : "#E5E7EB",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-all cursor-pointer relative group"
            onClick={() => openLightbox(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* PDF Button Overlay */}
            {item.pdfFile && (
              <button
                onClick={(e) => handleViewPDF(item.pdfFile, e)}
                className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                title="View PDF"
              >
                <FileText className="w-5 h-5 text-gray-700" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.name}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />

            {/* PDF Button in Lightbox */}
            {selectedImage.pdfFile && (
              <button
                onClick={(e) => handleViewPDF(selectedImage.pdfFile, e)}
                className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                View PDF
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;