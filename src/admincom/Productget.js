"use client";

import React, { useEffect, useState } from "react";
import {
  Loader2,
  Trash2,
  Pencil,
  Save,
  X,
  Image as ImageIcon,
} from "lucide-react";

export default function Productget() {
  // ======================
  // STATE
  // ======================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    slug: "",
    category: "",
    short_description: "",
    long_description: "",
    features: [],
    applications: [],
    specifications: {},
    variants: [],
    images: [],
  });

  // ======================
  // FETCH PRODUCTS
  // ======================
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/getproducts");
      const result = await res.json();
      if (res.ok && result.success) {
        setProducts(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`/api/admin/productsdel/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditData({
      name: product.name || "",
      slug: product.slug || "",
      category: product.category || "",
      short_description: product.short_description || "",
      long_description: product.long_description || "",
      features: product.features || [],
      applications: product.applications || [],
      specifications: product.specifications || {},
      variants: product.variants || [],
      images: [],
    });
  };

  // ======================
  // UPDATE ALL FIELDS
  // ======================
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();

      formData.append("product_id", id);
      formData.append("name", editData.name);
      formData.append("slug", editData.slug);
      formData.append("category", editData.category);
      formData.append("short_description", editData.short_description);
      formData.append("long_description", editData.long_description);
      formData.append("features", JSON.stringify(editData.features));
      formData.append("applications", JSON.stringify(editData.applications));
      formData.append("specifications", JSON.stringify(editData.specifications));
      formData.append("variants", JSON.stringify(editData.variants));

      if (editData.images.length > 0) {
        editData.images.forEach((img) => {
          formData.append("images", img);
        });
      }

      const res = await fetch("/api/products/update", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        alert("Update failed");
        return;
      }

      alert("Product updated successfully");
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Update error");
    }
  };

  // ======================
  // IMAGE
  // ======================
  const getImageUrl = (img) =>
    img ? `data:image/jpeg;base64,${img}` : null;

  // ======================
  // UI
  // ======================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Product Manager</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl shadow-sm p-4"
          >
            {/* IMAGE */}
            <div className="h-40 bg-gray-100 rounded mb-4 overflow-hidden">
              {product.image ? (
                <img
                  src={getImageUrl(product.image)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <ImageIcon />
                </div>
              )}
            </div>

            {editingId === product.id ? (
              <div className="space-y-2">
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  placeholder="Name"
                  className="input"
                />
                <input
                  value={editData.slug}
                  onChange={(e) =>
                    setEditData({ ...editData, slug: e.target.value })
                  }
                  placeholder="Slug"
                  className="input"
                />
                <input
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  placeholder="Category"
                  className="input"
                />

                <textarea
                  value={editData.short_description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      short_description: e.target.value,
                    })
                  }
                  placeholder="Short Description"
                  className="textarea"
                />

                <textarea
                  value={editData.long_description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      long_description: e.target.value,
                    })
                  }
                  placeholder="Long Description"
                  className="textarea"
                  rows={4}
                />

                <textarea
                  value={JSON.stringify(editData.features, null, 2)}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      features: JSON.parse(e.target.value),
                    })
                  }
                  className="textarea font-mono"
                  placeholder="Features (JSON Array)"
                />

                <textarea
                  value={JSON.stringify(editData.specifications, null, 2)}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      specifications: JSON.parse(e.target.value),
                    })
                  }
                  className="textarea font-mono"
                  placeholder="Specifications (JSON Object)"
                />

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      images: [...e.target.files],
                    })
                  }
                />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdate(product.id)}
                    className="btn-success"
                  >
                    <Save size={14} /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn-secondary"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.short_description}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn-primary"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn-danger"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
