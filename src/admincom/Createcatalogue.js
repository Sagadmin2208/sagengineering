import React, { useState, useEffect } from "react";
import { Package, Upload, FileText, Image, Trash2, } from "lucide-react";

const CreateCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    categoryId: "",
    description: "",
    imageFile: null,
    pdfFile: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(""), 5000);
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        showMessage(data.message || "Failed to fetch categories", true);
      }
    } catch (err) {
      showMessage(err.message || "Network error fetching categories", true);
    }
  };

  // Fetch existing products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/catalogue");
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else showMessage(data.message || "Failed to fetch products", true);
    } catch (err) {
      showMessage(err.message || "Network error", true);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormState((prev) => ({ ...prev, [name]: files[0] }));
      
      // Create image preview
      if (name === "imageFile" && files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create new product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!formState.name.trim()) return showMessage("Product name is required", true);

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", formState.name);
      if (formState.categoryId) formData.append("categoryId", formState.categoryId);
      if (formState.description) formData.append("description", formState.description);
      if (formState.imageFile) formData.append("image", formState.imageFile);
      if (formState.pdfFile) formData.append("pdf", formState.pdfFile);

      const res = await fetch("/api/catalogue", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showMessage("Product created successfully!");
        setFormState({ name: "", categoryId: "", description: "", imageFile: null, pdfFile: null });
        setImagePreview(null);
        document.getElementById("imageFile").value = "";
        document.getElementById("pdfFile").value = "";
        fetchProducts();
      } else {
        showMessage(data.message || "Error creating product", true);
      }
    } catch (err) {
      showMessage(err.message || "Network error", true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    setFormState((prev) => ({ ...prev, imageFile: null }));
    document.getElementById("imageFile").value = "";
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "N/A";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Product Catalogue</h1>
          <p className="text-gray-600">Manage your product inventory efficiently</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg shadow-md animate-fade-in ${
            message.isError 
              ? "bg-red-100 border-l-4 border-red-500 text-red-700" 
              : "bg-green-100 border-l-4 border-green-500 text-green-700"
          }`}>
            <p className="font-semibold">{message.text}</p>
          </div>
        )}

        {/* Create Product Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          </div>

          <form onSubmit={handleCreateProduct} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="categoryId">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formState.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                placeholder="Enter product description..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Image
                </label>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={clearImagePreview}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <Image className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span>
                    <input
                      type="file"
                      id="imageFile"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
                {formState.imageFile && !imagePreview && (
                  <p className="text-sm text-gray-600 mt-2">Selected: {formState.imageFile.name}</p>
                )}
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product PDF
                </label>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <FileText className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium">Click to upload PDF</span>
                  <span className="text-xs text-gray-500 mt-1">PDF up to 10MB</span>
                  <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    accept=".pdf"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                {formState.pdfFile && (
                  <p className="text-sm text-gray-600 mt-2 flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {formState.pdfFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? "Creating Product..." : "Create Product"}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Existing Products</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
                >
                  {/* Product Image */}
                  {product.imageUrl ? (
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {getCategoryName(product.categoryId)}
                      </span>
                    </div>

                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    )}

                    {/* PDF Link */}
                    {product.pdfFile && (
                      <a
                        href={product.pdfFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium mb-3"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View PDF
                      </a>
                    )}

                    {/* Footer */}
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Created: {new Date(product.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products found. Create your first product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCatalogue;