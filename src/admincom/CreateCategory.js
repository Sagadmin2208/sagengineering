import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Check, X, Folder, Plus, AlertCircle, Upload, Image as ImageIcon } from 'lucide-react';

function CreateCategory() {
  // Create State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null); 
  
  // Data State
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingImage, setEditingImage] = useState(null); // New state for editing image

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(''), 5000);
  };

  // --- HELPER TO FIX IMAGE DISPLAY ---
  const getImageSrc = (imgData) => {
    if (!imgData) return null;
    if (imgData.startsWith('http') || imgData.startsWith('data:')) {
      return imgData;
    }
    return `data:image/png;base64,${imgData}`;
  };

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/category');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.categories);
      } else {
        showMessage(`Error fetching categories: ${data.message}`, true);
      }
    } catch (error) {
      showMessage(`Network error: ${error.message}`, true);
    } finally {
      setLoading(false);
    }
  };

  // Create Category 
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      showMessage('Category name cannot be empty.', true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newCategoryName.trim());
      if (newCategoryImage) {
        formData.append('image', newCategoryImage);
      }

      const response = await fetch('/api/category', {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (data.success) {
        showMessage('Category created successfully!');
        setNewCategoryName('');
        setNewCategoryImage(null);
        document.getElementById('createFileInput').value = ""; // Reset Create Input
        fetchCategories();
      } else {
        showMessage(`Error: ${data.message}`, true);
      }
    } catch (error) {
      showMessage(`Network error: ${error.message}`, true);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetch('/api/category', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage('Category deleted successfully!');
        fetchCategories();
      } else {
        showMessage(`Error: ${data.message}`, true);
      }
    } catch (error) {
      showMessage(`Network error: ${error.message}`, true);
    }
  };

  // Start Edit Mode
  const startEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setEditingImage(null); // Reset edit image
  };

  // Update Category (UPDATED to support Image Change)
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editingName.trim()) {
      showMessage('Category name cannot be empty.', true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id', editingId);
      formData.append('name', editingName.trim());
      
      // Only append image if a new one was selected
      if (editingImage) {
        formData.append('image', editingImage);
      }

      const response = await fetch('/api/category', {
        method: 'PUT',
        body: formData, // Send FormData instead of JSON
      });

      const data = await response.json();

      if (data.success) {
        showMessage('Category updated successfully!');
        setEditingId(null);
        setEditingImage(null);
        fetchCategories();
      } else {
        showMessage(`Error: ${data.message}`, true);
      }
    } catch (error) {
      showMessage(`Network error: ${error.message}`, true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Category Management</h1>
          <p className="text-gray-600">Organize and manage your product categories</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg shadow-md animate-fade-in flex items-start ${
            message.isError 
              ? "bg-red-100 border-l-4 border-red-500 text-red-700" 
              : "bg-green-100 border-l-4 border-green-500 text-green-700"
          }`}>
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <p className="font-semibold">{message.text}</p>
          </div>
        )}

        {/* Create Category Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Category</h2>
          </div>

          <form onSubmit={handleCreateCategory} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                <div className="relative">
                  <input
                    id="createFileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCategoryImage(e.target.files[0])}
                    className="hidden"
                  />
                  <label 
                    htmlFor="createFileInput" 
                    className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  >
                    {newCategoryImage ? (
                      <span className="text-green-600 flex items-center truncate">
                        <ImageIcon className="w-5 h-5 mr-2" />
                        {newCategoryImage.name}
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Image
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 bg-[#BF1A1A] text-white font-bold px-8 py-3 rounded-lg hover:bg-red-700 transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center sm:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Category
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Folder className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Existing Categories
              <span className="ml-3 text-base font-normal text-gray-500">
                ({categories.length} total)
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-500">Loading categories...</p>
            </div>
          ) : categories.length > 0 ? (
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                >
                  {editingId === category.id ? (
                    // ================= EDIT MODE =================
                    <form onSubmit={handleUpdateCategory} className="flex flex-col gap-3 w-full">
                      
                      {/* Name Edit Input */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Edit Name</label>
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                          autoFocus
                        />
                      </div>

                      {/* Image Edit Input (Optional) */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Update Image (Optional)</label>
                        <div className="flex items-center gap-3">
                           {/* Show current image preview if available */}
                           {category.image && !editingImage && (
                              <img src={getImageSrc(category.image)} alt="Current" className="w-10 h-10 rounded object-cover border" />
                           )}
                           <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setEditingImage(e.target.files[0])}
                              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                           />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center shadow-md"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => { setEditingId(null); setEditingImage(null); }}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center shadow-md"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    // ================= DISPLAY MODE =================
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 flex-1">
                        {category.image ? (
                           <img 
                              src={getImageSrc(category.image)} 
                              alt={category.name} 
                              className="w-10 h-10 rounded-lg object-cover border border-gray-200" 
                           />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Folder className="w-5 h-5 text-purple-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                          <p className="text-sm text-gray-500">ID: {category.id}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(category)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center shadow-md hover:scale-105 transform"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center shadow-md hover:scale-105 transform"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No categories found</p>
              <p className="text-gray-400 text-sm">Create your first category to get started!</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default CreateCategory;