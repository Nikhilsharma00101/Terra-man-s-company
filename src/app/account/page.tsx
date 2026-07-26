"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { useCart } from "@/components/CartProvider";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/sections/Footer";
import { OrderTracker, OrderType } from "@/components/ui/OrderTracker";
import {
  ShieldCheck,
  ShoppingBag,
  LogOut,
  Heart,
  Trash2,
  PackageCheck,
  Sparkles,
  User,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { user, isLoading, openAuthModal, logout } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addItem, setIsOpen: setIsCartOpen } = useCart();
  
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist">("orders");

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const res = await fetch("/api/account/orders");
        const data = await res.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0c0c0c] text-terra-beige flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-terra-bronze border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono">
            Accessing Member Dossier...
          </span>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0c0c0c] text-terra-beige flex flex-col justify-between selection:bg-terra-bronze/30">
        <Navbar />
        <CartDrawer />
        
        <div className="container mx-auto px-6 py-40 flex flex-col items-center justify-center text-center relative z-10">
          <div className="w-16 h-16 border border-terra-bronze/40 rounded-full flex items-center justify-center text-terra-gold mb-6 bg-[#141414] shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Member Access Required
          </h1>
          <p className="text-white/60 max-w-md text-sm leading-relaxed mb-8 font-sans">
            Please log in with your email to view your ritual history, live order dispatch tracking, and saved wishlist essentials.
          </p>

          <button
            onClick={() => openAuthModal()}
            className="px-8 py-4 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-bold uppercase tracking-[0.25em] text-xs hover:brightness-110 transition-all rounded shadow-lg font-mono"
          >
            Authorize Member Account
          </button>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-terra-beige flex flex-col relative overflow-hidden selection:bg-terra-bronze/30">
      <Navbar />
      <CartDrawer />

      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 opacity-40" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-terra-bronze/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-terra-gold/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-36 pb-24 lg:pt-44 lg:pb-36 flex-grow max-w-7xl">
        <div className="space-y-12">

          {/* Member Dossier Header */}
          <div className="bg-[#121212] border border-white/10 p-8 lg:p-10 rounded-xl shadow-xl relative overflow-hidden group">
            {/* Fine Framing Corners */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-terra-bronze/40 group-hover:border-terra-gold pointer-events-none transition-colors" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-terra-bronze/40 group-hover:border-terra-gold pointer-events-none transition-colors" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-terra-bronze/40 group-hover:border-terra-gold pointer-events-none transition-colors" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-terra-bronze/40 group-hover:border-terra-gold pointer-events-none transition-colors" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terra-bronze/40 to-terra-gold/20 border border-terra-gold/40 flex items-center justify-center text-terra-gold font-serif text-2xl font-bold shadow-md">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-terra-gold font-mono bg-terra-bronze/20 px-2.5 py-0.5 rounded border border-terra-bronze/30 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3 text-terra-gold" /> Verified Member
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
                    {user.name || user.email.split("@")[0]}
                  </h1>
                  <p className="text-white/50 text-xs font-mono mt-1">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => logout()}
                  className="px-5 py-2.5 border border-white/15 text-white/70 hover:text-rose-400 hover:border-rose-500/40 rounded transition-colors text-xs font-mono uppercase tracking-wider flex items-center gap-2 bg-[#161616]"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Workspace Tabs: Order Vault vs Saved Wishlist */}
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-3 text-sm font-mono uppercase tracking-[0.2em] font-semibold flex items-center gap-2 relative transition-all ${
                activeTab === "orders" ? "text-terra-gold" : "text-white/40 hover:text-white/80"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Vault ({orders.length})</span>
              {activeTab === "orders" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terra-gold rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`pb-3 text-sm font-mono uppercase tracking-[0.2em] font-semibold flex items-center gap-2 relative transition-all ${
                activeTab === "wishlist" ? "text-terra-gold" : "text-white/40 hover:text-white/80"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Saved Wishlist ({wishlistItems.length})</span>
              {activeTab === "wishlist" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terra-gold rounded-full" />
              )}
            </button>
          </div>

          {/* TAB 1: REVAMPED ORDER TRACKER & VAULT */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <OrderTracker orders={orders} isLoading={loadingOrders} />
            </div>
          )}

          {/* TAB 2: SAVED WISHLIST ESSENTIALS */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              {wishlistItems.length === 0 ? (
                <div className="bg-[#121212] border border-white/10 p-12 text-center space-y-4 rounded-xl shadow-xl">
                  <Heart className="w-12 h-12 text-white/20 mx-auto" />
                  <p className="text-white/80 font-serif text-xl">Your wishlist is currently empty</p>
                  <p className="text-white/40 text-xs font-sans max-w-md mx-auto">
                    Click the heart icon on any grooming product to save your essential formulas to your member profile.
                  </p>
                  <Link
                    href="/#collection"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-bold text-xs uppercase tracking-[0.2em] rounded hover:brightness-110 transition-all font-mono"
                  >
                    Explore Collection &rarr;
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#121212] border border-white/10 hover:border-terra-bronze/40 p-6 rounded-xl flex flex-col justify-between space-y-4 transition-colors group shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-mono text-terra-gold tracking-widest font-semibold">
                            {item.category}
                          </span>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-white/40 hover:text-rose-400 transition-colors p-1"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="font-serif text-xl text-white font-medium">{item.name}</h3>
                        <p className="text-xs text-white/60 line-clamp-2">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="font-mono text-lg font-bold text-terra-gold">₹{item.price}</span>
                        <button
                          onClick={() => {
                            addItem(item);
                            removeFromWishlist(item.id);
                            setIsCartOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-bold text-xs rounded hover:brightness-110 transition-all font-mono shadow"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}
