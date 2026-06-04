"use client";
import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Save, UploadCloud, CheckCircle, 
  AlertCircle, Package, Loader2, ArrowLeft, ImageIcon, Pencil, 
} from "lucide-react";

export default function ProductManager() {
  // 🔹 View State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track if we are editing

  // 🔹 Product List State
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(true);

  // 🔹 Form Loading & Message
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  // 🔹 Form States (Used for both Add and Edit)
  const [product, setProduct] = useState({
    name: "", slug: "", category: "", short_description: "", long_description: "",
  });
  
  // Dynamic Fields
  const [features, setFeatures] = useState([{ value: "" }]);
  const [applications, setApplications] = useState([{ value: "" }]);
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);
  
  // 🔹 VARIANTS STATE (Matches your CURL structure)
  // Structure: [{ variant_key: "Dimension", values: ["48x30", "42x30"] }]
  const [variants, setVariants] = useState([]); 

  // Image States
  const [images, setImages] = useState([]); // New files to upload
  const [existingImages, setExistingImages] = useState([]); // URLs from DB for editing

  /* ===============================
      1. FETCH DATA
  =============================== */
  const fetchProducts = async () => {
    try {
      setFetchingProducts(true);
      const res = await fetch("/api/getproducts");
      const result = await res.json();
      if (res.ok && result.success) {
        setProducts(result.products || result.data || []);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setFetchingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category");
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    } catch (error) { console.error(error); } 
    finally { setCategoryLoading(false); }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  /* ===============================
      2. HELPERS
  =============================== */
  const getImageUrl = (imageField) => {
    if (!imageField) return null;
    if (Array.isArray(imageField) && imageField.length > 0) return imageField[0];
    return imageField;
  };

  const resetForm = () => {
    setProduct({ name: "", slug: "", category: "", short_description: "", long_description: "" });
    setFeatures([{ value: "" }]);
    setApplications([{ value: "" }]);
    setImages([]);
    setExistingImages([]);
    setSpecifications([{ key: "", value: "" }]);
    setVariants([]);
    setMessage("");
    setEditingId(null);
  };

  const handleToggle = () => {
    if (!showForm) resetForm();
    setShowForm(!showForm);
  };

  /* ===============================
      3. EDIT LOGIC
  =============================== */
  const handleEdit = (prod) => {
    setEditingId(prod.id); 
    
    // 1. Basic Info
    setProduct({
      name: prod.name || "",
      slug: prod.slug || "",
      category: prod.category || "",
      short_description: prod.short_description || "",
      long_description: prod.long_description || "",
    });

    // 2. Existing Images
    const imgs = prod.images || prod.image;
    setExistingImages(Array.isArray(imgs) ? imgs : (imgs ? [imgs] : []));
    setImages([]);

    // 3. Features
    if (prod.features && Array.isArray(prod.features)) {
      setFeatures(prod.features.map(f => ({ value: f })));
    } else {
      setFeatures([{ value: "" }]);
    }

    // 4. Applications
    if (prod.applications && Array.isArray(prod.applications)) {
      setApplications(prod.applications.map(a => ({ value: a })));
    } else {
      setApplications([{ value: "" }]);
    }

    // 5. Specifications
    if (prod.specifications && typeof prod.specifications === 'object') {
      const specs = Object.entries(prod.specifications).map(([key, value]) => ({ key, value }));
      setSpecifications(specs.length > 0 ? specs : [{ key: "", value: "" }]);
    } else {
      setSpecifications([{ key: "", value: "" }]);
    }

    // 6. Variants - Populate state from API data
    if (prod.variants && Array.isArray(prod.variants)) {
        // Ensure values is always an array
        const formattedVariants = prod.variants.map(v => ({
            variant_key: v.variant_key || "",
            values: Array.isArray(v.values) ? v.values : []
        }));
        setVariants(formattedVariants);
    } else {
        setVariants([]);
    }

    setShowForm(true); 
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    // Add your delete API call here if needed
    setProducts(products.filter(p => p.id !== id));
  };

  /* ===============================
      4. DYNAMIC FIELD HELPERS
  =============================== */
  const addFeature = () => setFeatures([...features, { value: "" }]);
  const updateFeature = (i, v) => { const u = [...features]; u[i].value = v; setFeatures(u); };
  const removeFeature = (i) => setFeatures(features.filter((_, x) => x !== i));

  const addApplication = () => setApplications([...applications, { value: "" }]);
  const updateApplication = (i, v) => { const u = [...applications]; u[i].value = v; setApplications(u); };
  const removeApplication = (i) => setApplications(applications.filter((_, x) => x !== i));

  const addSpecField = () => setSpecifications([...specifications, { key: "", value: "" }]);
  const updateSpecField = (i, f, v) => { const u = [...specifications]; u[i][f] = v; setSpecifications(u); };
  const removeSpecField = (i) => setSpecifications(specifications.filter((_, x) => x !== i));

  // 🔹 Variant Helpers
  const addVariantGroup = () => {
    setVariants([...variants, { variant_key: "", values: [""] }]);
  };

  const updateVariantKey = (index, key) => {
    const newVariants = [...variants];
    newVariants[index].variant_key = key;
    setVariants(newVariants);
  };

  const addVariantValue = (groupIndex) => {
    const newVariants = [...variants];
    newVariants[groupIndex].values.push("");
    setVariants(newVariants);
  };

  const updateVariantValue = (groupIndex, valueIndex, value) => {
    const newVariants = [...variants];
    newVariants[groupIndex].values[valueIndex] = value;
    setVariants(newVariants);
  };

  const removeVariantValue = (groupIndex, valueIndex) => {
    const newVariants = [...variants];
    newVariants[groupIndex].values = newVariants[groupIndex].values.filter((_, i) => i !== valueIndex);
    setVariants(newVariants);
  };

  const removeVariantGroup = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  /* ===============================
      5. HANDLE SUBMIT (ADD OR UPDATE)
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Prepare Specifications Object
    const specObject = {};
    specifications.forEach(({ key, value }) => { if (key && value) specObject[key] = value; });

    // 🔹 Prepare Variants Array (Filter empty ones)
    const cleanedVariants = variants
      .filter(v => v.variant_key.trim() !== "") // Remove groups without keys
      .map(v => ({
        variant_key: v.variant_key,
        values: v.values.filter(val => val.trim() !== "") // Remove empty value strings
      }))
      .filter(v => v.values.length > 0); // Remove groups with no values left

    const formData = new FormData();
    if (editingId) formData.append("product_id", editingId);

    formData.append("name", product.name);
    formData.append("slug", product.slug);
    formData.append("category", product.category);
    formData.append("short_description", product.short_description);
    formData.append("long_description", product.long_description);

    // Append Images
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) formData.append("images", images[i]);
    }

    // JSON Stringify arrays/objects for the API
    formData.append("features", JSON.stringify(features.map(f => f.value.trim()).filter(v => v !== "")));
    formData.append("applications", JSON.stringify(applications.map(a => a.value.trim()).filter(v => v !== "")));
    formData.append("specifications", JSON.stringify(specObject));
    formData.append("variants", JSON.stringify(cleanedVariants));

    try {
      const url = editingId ? "/api/admin/update" : "/api/postproduct"; 
      
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setMessage(`success: Product ${editingId ? "Updated" : "Added"} Successfully`);
        setTimeout(() => {
          fetchProducts();
          setShowForm(false);
          resetForm();
        }, 1500);
      } else {
        setMessage(`error: ${data.message || "Operation failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("error: Server error");
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-700";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your inventory.</p>
          </div>
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all ${
              showForm ? "bg-white text-gray-700 border border-gray-300" : "bg-blue-600 text-white"
            }`}
          >
            {showForm ? <><ArrowLeft size={20} /> Back to List</> : <><Plus size={20} /> Add New Product</>}
          </button>
        </div>

        {/* ==========================
            VIEW 1: PRODUCT LIST
           ========================== */}
        {!showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
             {fetchingProducts && (
               <div className="p-12 text-center flex flex-col items-center text-gray-500">
                 <Loader2 className="animate-spin w-8 h-8 mb-2 text-blue-600" />
                 <p>Loading...</p>
               </div>
             )}

             {!fetchingProducts && products.length > 0 && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                 {products.map((product) => (
                   <div key={product.id} className="bg-white border rounded-xl shadow-sm p-4 flex flex-col h-full hover:shadow-md transition-shadow">
                     <div className="h-40 bg-gray-100 rounded mb-4 overflow-hidden relative border border-gray-100">
                       {getImageUrl(product.images || product.image) ? (
                       <img
  src={getImageUrl(product.images || product.image)}
  alt={product.name}
  className="w-full h-full object-contain bg-white"
/>

                       ) : <div className="h-full flex items-center justify-center text-gray-400"><ImageIcon /></div>}
                     </div>
                     <div className="flex flex-col flex-1">
                        <h2 className="font-bold text-lg text-gray-800">{product.name}</h2>
                        <p className="text-xs text-blue-600 font-semibold uppercase mb-2">{product.category}</p>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.short_description}</p>
                        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                          <button onClick={() => handleEdit(product)} className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded text-sm transition-colors">
                            <Pencil size={14} /> Edit
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-sm transition-colors ml-auto">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {/* ==========================
            VIEW 2: FORM (ADD & EDIT)
           ========================== */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className={`px-8 py-6 text-white ${editingId ? "bg-orange-600" : "bg-gradient-to-r from-blue-600 to-indigo-700"}`}>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Package className="w-6 h-6" /> {editingId ? "Edit Product" : "Add New Product"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              
              {/* 1. BASIC INFO */}
              <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Product Name</label>
                    <input className={inputClass} value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className={labelClass}>Slug</label>
                    <input className={inputClass} value={product.slug} onChange={(e) => setProduct({ ...product, slug: e.target.value })} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Category</label>
                    <select className={inputClass} value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} required disabled={categoryLoading}>
                      <option value="" disabled>Select a Category...</option>
                      {categories.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                   <label className={labelClass}>Short Description</label>
                   <textarea className={`${inputClass} min-h-[80px]`} value={product.short_description} onChange={(e) => setProduct({ ...product, short_description: e.target.value })} />
                </div>
                <div>
                   <label className={labelClass}>Long Description</label>
                   <textarea className={`${inputClass} min-h-[150px]`} value={product.long_description} onChange={(e) => setProduct({ ...product, long_description: e.target.value })} />
                </div>
              </section>

              {/* 2. MEDIA UPLOAD */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                {editingId && existingImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Current Images:</p>
                    <div className="flex gap-2 flex-wrap">
                      {existingImages.map((img, idx) => (
                        <div key={idx} className="w-20 h-20 border rounded overflow-hidden">
                           <img src={img} alt="prev" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
  <UploadCloud className="w-8 h-8 text-blue-500 mb-2" />
  <p className="text-sm text-gray-500">
    {editingId ? "Upload New Images" : "Click to upload images"}
  </p>

  <input
    type="file"
    className="hidden"
    multiple
    accept="image/*"
    onChange={(e) => setImages(Array.from(e.target.files))}
  />
</label>

                {images.length > 0 && (
  <div className="grid grid-cols-4 gap-3 mt-4">
    {images.map((file, index) => (
      <div key={index} className="relative group">
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="w-full h-24 object-cover rounded-lg border"
        />

        {/* Remove image */}
        <button
          type="button"
          onClick={() =>
            setImages(images.filter((_, i) => i !== index))
          }
          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}

              </div>

              {/* 3. FEATURES & APPLICATIONS */}
              <div className="grid md:grid-cols-2 gap-6">
                 {/* Features */}
                 <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex justify-between mb-2">
                       <h3 className="font-bold">Features</h3>
                       <button type="button" onClick={addFeature} className="text-green-600 text-sm font-bold">+ Add</button>
                    </div>
                    {features.map((item, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input className={inputClass} value={item.value} onChange={(e) => updateFeature(i, e.target.value)} placeholder="Feature..." />
                        <button type="button" onClick={() => removeFeature(i)} className="text-red-500"><Trash2 size={16} /></button>
                      </div>
                    ))}
                 </div>
                 {/* Applications */}
                 <div className="bg-gray-50 p-4 rounded-xl border">
                    <div className="flex justify-between mb-2">
                       <h3 className="font-bold">Applications</h3>
                       <button type="button" onClick={addApplication} className="text-green-600 text-sm font-bold">+ Add</button>
                    </div>
                    {applications.map((item, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input className={inputClass} value={item.value} onChange={(e) => updateApplication(i, e.target.value)} placeholder="Application..." />
                        <button type="button" onClick={() => removeApplication(i)} className="text-red-500"><Trash2 size={16} /></button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* 4. SPECIFICATIONS */}
              <div className="bg-gray-50 p-6 rounded-xl border">
                  <div className="flex justify-between mb-4">
                     <h3 className="font-bold">Specifications</h3>
                     <button type="button" onClick={addSpecField} className="text-green-600 font-bold text-sm">+ Add Spec</button>
                  </div>
                  {specifications.map((item, i) => (
                    <div key={i} className="flex gap-3 mb-2">
                      <input className={inputClass} placeholder="Key" value={item.key} onChange={(e) => updateSpecField(i, "key", e.target.value)} />
                      <input className={inputClass} placeholder="Value" value={item.value} onChange={(e) => updateSpecField(i, "value", e.target.value)} />
                      <button type="button" onClick={() => removeSpecField(i)} className="text-red-500"><Trash2 size={18} /></button>
                    </div>
                  ))}
              </div>

              {/* 5. VARIANTS (UPDATED STRUCTURE) */}
              <div className="bg-gray-50 p-6 rounded-xl border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Variants</h3>
                  <button type="button" onClick={addVariantGroup} className="text-green-600 font-bold text-sm">+ Add Variant Group</button>
                </div>
                
                {variants.map((variantGroup, groupIndex) => (
                  <div key={groupIndex} className="bg-white p-4 rounded-lg border mb-4 shadow-sm">
                    <div className="flex gap-3 mb-3 items-center">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Variant Key</label>
                        <input 
                          className={inputClass} 
                          placeholder="e.g. Dimension, Burner" 
                          value={variantGroup.variant_key} 
                          onChange={(e) => updateVariantKey(groupIndex, e.target.value)} 
                        />
                      </div>
                      <button type="button" onClick={() => removeVariantGroup(groupIndex)} className="text-red-500 self-end mb-2 p-2 hover:bg-red-50 rounded-full">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                         <label className="text-xs font-bold text-gray-500 uppercase">Values</label>
                         <button type="button" onClick={() => addVariantValue(groupIndex)} className="text-blue-600 text-xs font-bold">+ Add Value</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {variantGroup.values.map((val, valIndex) => (
                          <div key={valIndex} className="flex gap-1 items-center">
                            <input 
                              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                              value={val} 
                              onChange={(e) => updateVariantValue(groupIndex, valIndex, e.target.value)}
                              placeholder="Value"
                            />
                            <button type="button" onClick={() => removeVariantValue(groupIndex, valIndex)} className="text-red-400 hover:text-red-600">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {variants.length === 0 && (
                   <p className="text-gray-400 text-sm italic text-center py-4">No variants added yet. Click &quot;+ Add Variant Group&quot; to start.</p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4 border-t border-gray-100">
                <button type="submit" disabled={loading} className={`w-full flex justify-center items-center gap-2 py-3.5 px-6 rounded-xl text-white font-bold text-lg shadow-lg ${loading ? "bg-gray-400" : editingId ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"}`}>
                  {loading ? "Saving..." : <><Save size={20} /> {editingId ? "Update Product" : "Save New Product"}</>}
                </button>
              </div>

              {/* NOTIFICATION MESSAGE */}
              {message && (
                <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${message.startsWith("success") ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                  {message.startsWith("success") ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}