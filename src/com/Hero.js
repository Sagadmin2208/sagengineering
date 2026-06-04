import { ArrowRight, Star, Award, Users, Target } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/homepage');
        const data = await response.json();
        
        if (data.success && data.images && data.images.length > 0) {
          // Extract imageUrl from each image object
          const imageUrls = data.images.map(img => img.imageUrl);
          setBackgroundImages(imageUrls);
        } else {
          // Fallback images if API fails
          setBackgroundImages([
            "./Cooking Equipments.png",
            "./Commercial Kitchen Exhaut Hood 4.jpeg",
            "./Cooking Equipments 1.jpeg",
            "./Cooking Equipments 2.jpg"
          ]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        // Fallback images on error
        setBackgroundImages([
          "./Cooking Equipments.png",
          "./Commercial Kitchen Exhaut Hood 4.jpeg",
          "./Cooking Equipments 1.jpeg",
          "./Cooking Equipments 2.jpg"
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Image carousel effect
  useEffect(() => {
    if (backgroundImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mt-25">

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-transparent"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400/10 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-blue-600/5 rounded-full blur-2xl animate-pulse"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">

          {/* Hero Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">

            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">

              {/* Brand Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium tracking-wider">
                  PREMIUM QUALITY
                </span>
              </div>

              {/* Company Name */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  S.A.G ENGINEERING
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto lg:mx-0 rounded-full"></div>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <p className="text-blue-300 text-base font-medium">
                  Manufacturers, Exporters & Suppliers of
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Commercial
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Kitchen
                  </span>
                  <span className="block">Equipments</span>
                </h1>
              </div>


              {/* Description */}
              <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Premium quality stainless steel kitchen solutions designed for restaurants,
                hotels, and commercial food service operations worldwide.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
               <Link href="/products/All">
      <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
        <span className="flex items-center justify-center">
          Explore Products
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </Link>

    <Link href="/contact">
                <button className="group px-8 py-4 border-2 border-blue-400/50 text-blue-300 font-semibold rounded-xl hover:bg-blue-400/10 hover:border-blue-400 hover:text-white transition-all duration-300">
                  <span className="flex items-center justify-center">
                    Get Quote
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
               </Link>
              </div>

              {/* Image Navigation Dots */}
              {!loading && backgroundImages.length > 0 && (
                <div className="flex space-x-3 justify-center lg:justify-start pt-4">
                  {backgroundImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                          ? 'bg-blue-400 scale-125'
                          : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Image Section */}
            <div className="relative order-1 lg:order-2">

              {/* Main Image Container */}
              <div className="relative group">

                {/* Glowing Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>

                {/* Image Container */}
               <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
  <div className="relative overflow-hidden rounded-xl h-[200px] sm:h-[500px] lg:h-[600px]">
    {loading ? (
      // Loading skeleton
      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse"></div>
    ) : (
      backgroundImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Commercial Kitchen Equipment ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            index === currentImageIndex
              ? 'opacity-100 scale-105'   // active image slightly zoomed in
              : 'opacity-0 scale-115'     // inactive image hidden + zoomed
          }`}
        />
      ))
    )}

    {/* Image Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

    {/* Play Button Overlay */}
    {!loading && (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        
      </div>
    )}
  </div>
</div>


                {/* Floating Badge */}
                <div className="absolute -bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 shadow-2xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base">
                          Revitalize Commercial Kitchen
                        </p>
                        <p className="text-blue-100 text-xs sm:text-sm">
                          Premium Solutions
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 lg:mt-24">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">15+</div>
                  <div className="text-gray-300 text-sm font-medium">Years Experience</div>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">500+</div>
                  <div className="text-gray-300 text-sm font-medium">Happy Clients</div>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-current text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">5.0</div>
                  <div className="text-gray-300 text-sm font-medium">Rating</div>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">24/7</div>
                  <div className="text-gray-300 text-sm font-medium">Support</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 text-white/5" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,30 350,90 600,60 C850,30 1050,90 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>

    </section>
  );
}

export default Hero;