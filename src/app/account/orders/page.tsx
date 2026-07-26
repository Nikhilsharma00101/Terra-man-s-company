"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/sections/Footer";
import { OrderTracker, OrderType } from "@/components/ui/OrderTracker";
import { ShieldCheck, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function DedicatedOrdersPage() {
  const { user, isLoading, openAuthModal } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
      <main className="min-h-screen bg-[#0c0c0c] text-terra-beige flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-terra-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">
            Accessing Order Dispatch Records...
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
            Member Authentication Required
          </h1>
          <p className="text-white/60 max-w-md text-sm leading-relaxed mb-8 font-sans">
            Log in to your TERRA member profile to inspect order records, live courier tracking, and invoice details.
          </p>

          <button
            onClick={() => openAuthModal()}
            className="px-8 py-4 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-bold uppercase tracking-[0.25em] text-xs hover:brightness-110 transition-all rounded shadow-lg font-mono"
          >
            Authorize Access
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

      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 opacity-40" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-terra-bronze/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-terra-gold/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-36 pb-24 lg:pt-44 lg:pb-36 flex-grow max-w-7xl">
        <div className="space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <Link
                href="/account"
                className="text-xs font-mono text-white/40 hover:text-terra-gold transition-colors flex items-center gap-1 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Account Dossier
              </Link>
              <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
                Order Vault &amp; Dispatch Tracker
              </h1>
            </div>

            <span className="text-xs font-mono text-terra-gold bg-terra-bronze/20 px-3 py-1.5 rounded border border-terra-bronze/30 font-semibold self-start sm:self-center flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5" /> {orders.length} Total Orders Recorded
            </span>
          </div>

          {/* Revamped Order Tracker Component */}
          <OrderTracker orders={orders} isLoading={loadingOrders} />

        </div>
      </div>

      <Footer />
    </main>
  );
}
