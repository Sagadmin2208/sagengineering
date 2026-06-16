"use client";
import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Upload, X, Calendar, Tag, Link2 } from 'lucide-react';
import dynamic from 'next/dynamic';


// Dynamically import Jodit Editor to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function Post() {
  const editor = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    metaDescription: '',
    canonicalUrl: '',
    tags: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Jodit Editor Configuration
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Write your blog content...',
      minHeight: 400,
      toolbar: true,
      spellcheck: true,
      language: 'en',
      toolbarButtonSize: 'medium',
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: 'insert_clear_html',
      buttons: [
        'source',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'video',
        'table',
        'link',
        '|',
        'align',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'copyformat',
        '|',
        'symbol',
        'fullsize',
        'print',
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      removeButtons: [],
      disablePlugins: [],
      events: {},
      textIcons: false,
    }),
    []
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (newContent) => {
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('metaDescription', formData.metaDescription);
    form.append('canonicalUrl', formData.canonicalUrl);
    form.append('tags', formData.tags);
    if (imageFile) {
      form.append('mainImage', imageFile);
    }

    try {
      setLoading(true);
      const res = await fetch('/api/blog', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus({ type: 'success', message: 'Blog post created successfully!' });
        setFormData({
          title: '',
          content: '',
          metaDescription: '',
          canonicalUrl: '',
          tags: '',
        });
        setImageFile(null);
        setImagePreview(null);
        fetchBlogs();
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to create blog post' });
      }
    } catch {

      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Blog Manager</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Create New Post</h2>

          {submitStatus.message && (
            <div className={`p-4 rounded-lg mb-6 ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <div className="border border-slate-300 rounded-lg overflow-hidden">
                <JoditEditor
                  ref={editor}
                  value={formData.content}
                  config={editorConfig}
                  onBlur={handleContentChange}
                  onChange={() => { }} // controlled by onBlur
                  tabIndex={1}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
              <input
                type="text"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SEO meta description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Canonical URL</label>
              <input
                type="text"
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/blog-post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="technology, web-development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Main Image</label>
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                  <Upload size={48} className="text-slate-400 mb-2" />
                  <span className="text-slate-600">Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Blog Post'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">All Posts</h2>

          {loading && blogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No blog posts yet</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div key={blog.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                  {blog.mainImage && (
                    <img src={blog.mainImage} alt={blog.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{blog.title}</h3>
                    <div
                      className="text-slate-600 text-sm mb-3 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="space-y-2 text-xs text-slate-500">
                      {blog.tags && (
                        <div className="flex items-center gap-2">
                          <Tag size={14} />
                          <span>{blog.tags}</span>
                        </div>
                      )}
                      {blog.canonicalUrl && (
                        <div className="flex items-center gap-2">
                          <Link2 size={14} />
                          <span className="truncate">{blog.canonicalUrl}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}