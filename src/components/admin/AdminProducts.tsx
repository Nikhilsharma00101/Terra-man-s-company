"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Package, Plus, Edit2, Trash2, X, Loader2, Sparkles, Search, AlertTriangle, CheckCircle2, Image as ImageIcon } from "lucide-react";

export interface AdminProduct {
  _id: string;
  productId: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: string;
  theme: string;
  ingredients: string[];
  description: string;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
}

export function AdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter and Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    price: 899,
    image: "/images/products/face-wash/front-side.jpeg",
    category: "Skincare",
    theme: "Luxury Grooming",
    ingredients: "Niacinamide, Salicylic Acid",
    description: "",
    stock: 50,
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      tagline: "",
      price: 899,
      image: "/images/products/face-wash/front-side.jpeg",
      category: "Skincare",
      theme: "Luxury Grooming",
      ingredients: "Niacinamide, Salicylic Acid",
      description: "",
      stock: 50,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      tagline: product.tagline || "",
      price: product.price,
      image: product.image,
      category: product.category,
      theme: product.theme || "Luxury Grooming",
      ingredients: Array.isArray(product.ingredients) ? product.ingredients.join(", ") : "",
      description: product.description,
      stock: product.stock || 50,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        ingredients: formData.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
        ...(editingProduct ? { _id: editingProduct._id, productId: editingProduct.productId } : {}),
      };

      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert(data.error || "Failed to save product.");
      }
    } catch (err) {
      console.error("Failed to submit product form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string, id: string) => {
    if (!confirm("Are you sure you want to delete this product from catalog?")) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}&productId=${productId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // Quick Stock Adjustment (+/- units)
  const handleQuickStock = async (product: AdminProduct, change: number) => {
    const newStock = Math.max(0, (product.stock || 0) + change);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, stock: newStock }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.map((p) => (p._id === product._id ? { ...p, stock: newStock } : p)));
      }
    } catch (err) {
      console.error("Failed to update stock:", err);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredients?.some((ing) => ing.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 font-sans text-[#f4f0ea]">
      {/* Header Bar & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 bg-[#121215] border border-white/10 p-6 md:p-7 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-terra-gold bg-terra-bronze/20 px-2 py-0.5 rounded border border-terra-bronze/30 font-semibold">
              Inventory &amp; Formulations
            </span>
          </div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-2.5 font-medium">
            <Package className="w-6 h-6 text-terra-gold" /> Product Inventory Catalog
          </h2>
          <p className="text-xs text-white/60 font-sans">Manage active formulations, ingredients, pricing, and stock levels</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, ingredients..."
              className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none font-sans"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-3 py-2 text-xs text-white/80 font-mono focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Skincare">Skincare</option>
            <option value="Grooming">Grooming</option>
            <option value="Bodycare">Bodycare</option>
            <option value="Fragrance">Fragrance</option>
          </select>

          {/* Add Product Button */}
          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all cursor-pointer shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Formulation
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="p-14 text-center text-xs font-mono text-white/60 flex items-center justify-center gap-2.5 uppercase tracking-wider">
          <Loader2 className="w-4 h-4 animate-spin text-terra-gold" /> Loading product catalog...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-[#121215] border border-white/10 p-12 text-center rounded-2xl text-xs font-mono text-white/50 uppercase tracking-wider">
          No products match your search or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isLowStock = (product.stock || 0) > 0 && (product.stock || 0) <= 10;
            const isOutOfStock = (product.stock || 0) === 0;

            return (
              <div
                key={product._id}
                className="bg-[#121215] border border-white/10 hover:border-terra-bronze/50 rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Image Container with Badges */}
                  <div className="relative h-52 w-full bg-[#161616] rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] uppercase font-mono text-terra-gold border border-white/15 font-bold">
                      {product.category}
                    </span>

                    {/* Stock Status Badge */}
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold flex items-center gap-1 border ${
                        isOutOfStock
                          ? "bg-rose-950/80 border-rose-500/50 text-rose-300"
                          : isLowStock
                          ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                          : "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                      }`}
                    >
                      {isOutOfStock ? (
                        <>Out of Stock</>
                      ) : isLowStock ? (
                        <><AlertTriangle className="w-3 h-3 text-amber-400" /> Low Stock ({product.stock})</>
                      ) : (
                        <><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Stock: {product.stock}</>
                      )}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-xl text-white font-medium leading-tight">{product.name}</h3>
                      <span className="font-mono text-terra-gold font-bold text-lg">₹{product.price}</span>
                    </div>
                    {product.tagline && (
                      <p className="text-xs text-terra-beige/80 italic font-serif">{product.tagline}</p>
                    )}
                    <p className="text-xs text-white/60 line-clamp-3 leading-relaxed pt-1 font-sans">{product.description}</p>
                  </div>

                  {/* Ingredients Tag Chips */}
                  {product.ingredients?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="bg-white/5 border border-white/10 text-white/70 px-2 py-0.5 rounded text-[10px] font-mono"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Stock Controls & Actions Footer */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 bg-[#161616] p-2 rounded border border-white/5">
                    <span>Quick Stock Adjust:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleQuickStock(product, -5)}
                        className="px-2 py-0.5 bg-white/5 hover:bg-white/15 text-rose-300 rounded font-bold"
                        title="Reduce 5 units"
                      >
                        -5
                      </button>
                      <span className="text-white font-bold px-1">{product.stock || 0}</span>
                      <button
                        onClick={() => handleQuickStock(product, 10)}
                        className="px-2 py-0.5 bg-white/5 hover:bg-white/15 text-emerald-300 rounded font-bold"
                        title="Add 10 units"
                      >
                        +10
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-terra-gold/50 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-terra-gold" /> Edit Specs
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.productId, product._id)}
                      className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/70 border border-rose-500/30 text-rose-300 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Product Modal with Live Preview & Portal */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#121215] border border-white/20 max-w-2xl w-full rounded-2xl shadow-2xl p-7 space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto my-auto font-sans">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-xl font-serif text-white font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-terra-gold" />
                {editingProduct ? "Edit Formulation Specifications" : "Add New Formulation"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
              
              {/* Form Image Preview Banner */}
              <div className="flex items-center gap-4 bg-[#161616] p-4 rounded-xl border border-white/10">
                <div className="w-16 h-16 rounded bg-black/60 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                  {formData.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-white/30" />
                  )}
                </div>
                <div className="space-y-1 font-mono">
                  <span className="text-[10px] text-terra-gold uppercase tracking-wider block font-bold">Image Live Preview</span>
                  <p className="text-white/60 text-xs truncate max-w-md">{formData.image || "No image specified"}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">Formulation Title *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. TERRA Charcoal Face Wash"
                  className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">Price (INR ₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono font-bold"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">Initial Stock Units *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">Sub-headline / Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Deep Cleansing. Oil Defense."
                  className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono cursor-pointer"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Bodycare">Bodycare</option>
                    <option value="Fragrance">Fragrance</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">Image Asset Path</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">
                  Active Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="e.g. Niacinamide, Salicylic Acid, Green Tea"
                  className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-white/60 block font-semibold">Full Formulation Story *</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product story & benefits..."
                  className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none leading-relaxed font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl hover:brightness-110 transition-all cursor-pointer font-mono shadow-lg"
              >
                {editingProduct ? "Save Formulation Changes" : "Create Product"}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
