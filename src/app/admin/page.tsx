"use client";

import React, { useState, useEffect } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminContacts } from "@/components/admin/AdminContacts";
import { AdminSubscribers } from "@/components/admin/AdminSubscribers";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useAuth } from "@/components/AuthProvider";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  MessageSquare,
  Mail,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  Sparkles,
  Activity
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "products" | "users" | "contacts" | "subscribers">("dashboard");
  const { user, logout } = useAuth();
  
  // Real-time counter metrics for tab badges
  const [tabMetrics, setTabMetrics] = useState({
    pendingOrders: 0,
    newContacts: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalSubscribers: 0,
  });

  const fetchTabMetrics = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setTabMetrics({
          pendingOrders: data.stats.statusBreakdown?.pending || 0,
          newContacts: data.stats.newContactsCount || 0,
          totalProducts: data.stats.productsCount || 0,
          totalUsers: data.stats.usersCount || 0,
          totalSubscribers: data.stats.subscribersCount || 0,
        });
      }
    } catch (err) {
      console.error("Failed to fetch admin tab metrics:", err);
    }
  };

  useEffect(() => {
    fetchTabMetrics();
    const interval = setInterval(fetchTabMetrics, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
    { id: "orders", label: "Orders", icon: ShoppingBag, badge: tabMetrics.pendingOrders ? `${tabMetrics.pendingOrders} Pending` : null, badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    { id: "products", label: "Products", icon: Package, badge: tabMetrics.totalProducts ? `${tabMetrics.totalProducts}` : null, badgeColor: "bg-terra-bronze/20 text-terra-gold border-terra-bronze/40" },
    { id: "users", label: "Users", icon: Users, badge: tabMetrics.totalUsers ? `${tabMetrics.totalUsers}` : null, badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
    { id: "contacts", label: "Inquiries", icon: MessageSquare, badge: tabMetrics.newContacts ? `${tabMetrics.newContacts} Unread` : null, badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
    { id: "subscribers", label: "Subscribers", icon: Mail, badge: tabMetrics.totalSubscribers ? `${tabMetrics.totalSubscribers}` : null, badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#08080a] text-[#f4f0ea] flex flex-col font-sans selection:bg-terra-bronze selection:text-black">
        
        {/* Ambient Grid Background */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-terra-bronze/5 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Top Command Center Header */}
        <header className="sticky top-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
              <BrandLogo />
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terra-bronze/20 border border-terra-bronze/50 text-terra-gold text-xs font-mono uppercase tracking-[0.15em] font-semibold">
              <ShieldCheck className="w-4 h-4 text-terra-gold" />
              <span>Admin Operations Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Live Telemetry Indicator */}
            <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60">Server Health:</span>
              <span className="text-emerald-400 font-bold">100% Operational</span>
            </div>

            {/* Dev Admin Profile Info */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Signed In As</span>
              <span className="text-xs text-terra-gold font-mono font-medium">{user?.email || "Admin Operator"}</span>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Storefront</span>
            </Link>

            <button
              onClick={logout}
              className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Admin Navigation Bar with Dynamic Badge Counters */}
        <nav className="bg-[#0f0f12] border-b border-white/10 px-6 py-3 overflow-x-auto relative z-30 sticky top-[73px]">
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab);
                    fetchTabMetrics();
                  }}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all relative cursor-pointer shrink-0 ${
                    isActive
                      ? "text-black font-bold shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-terra-bronze to-terra-gold rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2 font-mono">
                    <Icon className="w-4 h-4" />
                    <span className="font-sans font-semibold">{tab.label}</span>
                    {tab.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${tab.badgeColor || "bg-white/10 text-white"}`}>
                        {tab.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Workspace Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 relative z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && (
                <AdminDashboard
                  onNavigate={(tab) => {
                    setActiveTab(tab as typeof activeTab);
                    fetchTabMetrics();
                  }}
                />
              )}
              {activeTab === "orders" && <AdminOrders />}
              {activeTab === "products" && <AdminProducts />}
              {activeTab === "users" && <AdminUsers />}
              {activeTab === "contacts" && <AdminContacts />}
              {activeTab === "subscribers" && <AdminSubscribers />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </AdminGuard>
  );
}
