"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Clock, ArrowRight, Eye, TrendingUp, BookOpen, Star, Loader2 } from 'lucide-react';

function BlogPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (data.success) {
        const transformedPosts = data.blogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.metaDescription || blog.content.substring(0, 150) + '...',
          content: blog.content,
          category: extractCategory(blog.tags),
          author: 'Admin',
          authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          publishDate: blog.createdAt,
          readTime: calculateReadTime(blog.content),
          image: blog.mainImage,
          tags: blog.tags ? blog.tags.split(',').map(tag => tag.trim()) : [],
          views: Math.floor(Math.random() * 3000) + 500,
          likes: Math.floor(Math.random() * 200) + 50,
          featured: false,
          slug: blog.slug
        }));
        
        setBlogPosts(transformedPosts);
      }
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const extractCategory = (tags) => {
    if (!tags) return 'industry-news';
    const tagLower = tags.toLowerCase();
    if (tagLower.includes('maintenance')) return 'maintenance-tips';
    if (tagLower.includes('case') || tagLower.includes('study')) return 'case-studies';
    if (tagLower.includes('tech') || tagLower.includes('technology')) return 'technology';
    if (tagLower.includes('company') || tagLower.includes('update')) return 'company-updates';
    return 'industry-news';
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleBlogClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

  const categories = [
    { id: 'All', name: 'All Posts', count: blogPosts.length },
    { id: 'industry-news', name: 'Industry News', count: blogPosts.filter(p => p.category === 'industry-news').length },
    { id: 'maintenance-tips', name: 'Maintenance Tips', count: blogPosts.filter(p => p.category === 'maintenance-tips').length },
    { id: 'case-studies', name: 'Case Studies', count: blogPosts.filter(p => p.category === 'case-studies').length },
    { id: 'technology', name: 'Technology', count: blogPosts.filter(p => p.category === 'technology').length },
    { id: 'company-updates', name: 'Company Updates', count: blogPosts.filter(p => p.category === 'company-updates').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#41BCF5] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-red-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Posts</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchBlogs}
            className="bg-[#41BCF5] text-white px-6 py-2 rounded-lg hover:bg-[#35a5d9] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-[#41BCF5] text-white shadow-lg'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-[#41BCF5]'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Articles */}
            {selectedCategory === 'All' && blogPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.slice(0, 2).map((post) => (
                    <div 
                      key={post.id} 
                      onClick={() => handleBlogClick(post.slug)}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{formatDate(post.publishDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Results */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'All' ? 'All Articles' : categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-[#41BCF5] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <BookOpen size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-[#41BCF5] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <TrendingUp size={18} />
                </button>
              </div>
            </div>

            {/* Articles Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-8' 
              : 'space-y-6'
            }>
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => handleBlogClick(post.slug)}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`w-full object-cover ${
                        viewMode === 'list' ? 'h-full' : 'h-48'
                      }`}
                    />
                  </div>
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </span>
                      {post.featured && (
                        <Star className="text-yellow-400 fill-current" size={16} />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#41BCF5] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="mt-4 text-[#41BCF5] hover:text-[#35a5d9] font-semibold flex items-center space-x-1 group">
                      <span>Read More</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;