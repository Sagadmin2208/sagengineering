"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { 
  Calendar, Clock, ArrowLeft, Bookmark, 
  Facebook, Twitter, Linkedin, Link as LinkIcon, 
  Eye, Heart, MessageCircle, Tag, Loader2 
} from 'lucide-react';

function BlogDetails() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchBlogDetails(params.slug);
    }
  }, [params.slug]);

  const fetchBlogDetails = async (slug) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bloggetbyid/${slug}`);
      const data = await response.json();
      
      if (data.success) {
        setBlog(data.blog);
      } else {
        setError('Blog post not found');
      }
    } catch (err) {
      setError('Failed to load blog post. Please try again later.');
      console.error('Error fetching blog details:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Get current URL for SEO
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const tags = blog?.tags ? blog.tags.split(',').map(tag => tag.trim()) : [];
  const readTime = blog ? calculateReadTime(blog.content) : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#41BCF5] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-red-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog Not Found</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/blog')}
            className="bg-[#41BCF5] text-white px-6 py-2 rounded-lg hover:bg-[#35a5d9] transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        {/* Basic Meta Tags */}
        <title>{blog.title} | S.A.G Engineering Blog</title>
        <meta name="description" content={blog.metaDescription || blog.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta name="keywords" content={tags.join(', ')} />
        <meta name="author" content="S.A.G Engineering" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={blog.canonicalUrl || currentUrl} />
        
        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.metaDescription || blog.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:image" content={blog.mainImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="S.A.G Engineering" />
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:modified_time" content={blog.updatedAt} />
        <meta property="article:author" content="S.A.G Engineering" />
        <meta property="article:tag" content={tags.join(', ')} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.metaDescription || blog.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta name="twitter:image" content={blog.mainImage} />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
      </Head>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "image": blog.mainImage,
            "author": {
              "@type": "Organization",
              "name": "S.A.G Engineering"
            },
            "publisher": {
              "@type": "Organization",
              "name": "S.A.G Engineering",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yourdomain.com/logo.png"
              }
            },
            "datePublished": blog.createdAt,
            "dateModified": blog.updatedAt,
            "description": blog.metaDescription || blog.content.replace(/<[^>]*>/g, '').substring(0, 160),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            },
            "keywords": tags.join(', ')
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header Image */}
        <div className="relative h-[500px] bg-gradient-to-br from-slate-900 to-slate-700">
          <img
            src={blog.mainImage}
            alt={blog.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Back Button */}
          <button
            onClick={() => router.push('/blog')}
            className="absolute top-8 left-8 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center space-x-2 border border-white/20"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-[#41BCF5]/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={18} />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye size={18} />
                  <span>{Math.floor(Math.random() * 3000) + 500} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar - Social Share */}
            <div className="lg:w-20 flex lg:flex-col gap-4 lg:sticky lg:top-8 lg:self-start">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
                }`}
              >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                  isBookmarked 
                    ? 'bg-[#41BCF5] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-[#41BCF5]'
                }`}
              >
                <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
              </button>

              <div className="hidden lg:block w-full h-px bg-gray-200 my-2"></div>

              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook size={20} />
              </button>

              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 hover:bg-sky-500 hover:text-white transition-all"
              >
                <Twitter size={20} />
              </button>

              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-700 hover:text-white transition-all"
              >
                <Linkedin size={20} />
              </button>

              <button
                onClick={() => handleShare('copy')}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-700 hover:text-white transition-all"
              >
                <LinkIcon size={20} />
              </button>
            </div>

            {/* Article Content */}
            <div className="flex-1">
              <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                
                {/* Meta Description */}
                {blog.metaDescription && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-[#41BCF5] p-6 rounded-lg mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      {blog.metaDescription}
                    </p>
                  </div>
                )}

                {/* Blog Content */}
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-[#41BCF5] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6
                    prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6
                    prose-li:text-gray-700 prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-[#41BCF5] 
                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                    prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                    prose-img:rounded-lg prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Canonical URL */}
                {blog.canonicalUrl && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Canonical URL:</span>{' '}
                      <a 
                        href={blog.canonicalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#41BCF5] hover:underline"
                      >
                        {blog.canonicalUrl}
                      </a>
                    </p>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag size={18} className="text-gray-600" />
                      {tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-[#41BCF5] hover:text-white transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Share Section */}
              <div className="mt-8 bg-gradient-to-r from-[#41BCF5] to-purple-600 rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Share this article</h3>
                <p className="mb-6 opacity-90">Help others discover this content</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <Facebook size={18} />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <Twitter size={18} />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <LinkIcon size={18} />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;