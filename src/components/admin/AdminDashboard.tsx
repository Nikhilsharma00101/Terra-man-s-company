"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  DollarSign,
  ShoppingBag,
  Users,
  MessageSquare,
  Sparkles,
  Database,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Package,
  Eye,
  TrendingUp,
  CreditCard,
  Mail,
  X
} from "lucide-react";

export interface StatsData {
  totalRevenue: number;
  ordersCount: number;
  usersCount: number;
  contactsCount: number;
  newContactsCount: number;
  subscribersCount: number;
  productsCount: number;
  statusBreakdown: Record<string, number>;
  dbConnected: boolean;
}

export interface RecentOrder {
  _id: string;
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    city: string;
    postalCode?: string;
    country?: string;
  };
  items?: Array<{ productId: string; title: string; price: number; quantity: number; image?: string }>;
  totalAmount: number;
  paymentMethod?: string;
  status: string;
  createdAt: string;
}

export function AdminDashboard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<RecentOrder | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders || []);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeedData = async () => {
    setIsSeeding(true);
    setSeedMsg("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedMsg(data.message);
        fetchStats();
      } else {
        setSeedMsg(data.error || "Failed to seed demo data.");
      }
    } catch (err) {
      setSeedMsg("Error triggering demo seed.");
    } finally {
      setIsSeeding(false);
    }
  };

  const aov = stats?.ordersCount ? Math.round(stats.totalRevenue / stats.ordersCount) : 0;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 bg-white/5 rounded-2xl border border-white/10" />
          ))}
        </div>
        <div className="h-64 bg-white/5 rounded-2xl border border-white/10" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans text-[#f4f0ea]">
      {/* Top Banner / System Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#121215] border border-white/10 rounded-2xl p-6 md:p-7 gap-5 shadow-xl relative overflow-hidden group">
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />

        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono tracking-[0.2em] font-semibold text-terra-gold bg-terra-bronze/20 px-2.5 py-0.5 rounded border border-terra-bronze/30">
              System Telemetry
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h2 className="text-2xl font-serif text-white tracking-wide">Executive Overview</h2>
          <p className="text-sm text-white/70 leading-relaxed">Real-time revenue metrics, order velocity, and database state</p>
        </div>

        <div className="flex flex-wrap items-center gap-3.5">
          {/* DB Status Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs font-mono">
            <Database className="w-4 h-4 text-terra-gold" />
            <span className="text-white/60">DB Status:</span>
            {stats?.dbConnected ? (
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" /> Offline
              </span>
            )}
          </div>

          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/10 cursor-pointer"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSeedData}
            disabled={isSeeding}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all cursor-pointer shadow-lg disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isSeeding ? "Seeding..." : "Seed Demo Data"}
          </button>
        </div>
      </div>

      {seedMsg && (
        <div className="bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs p-4 rounded-xl flex items-center justify-between shadow-lg font-mono">
          <span className="font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {seedMsg}
          </span>
          <button onClick={() => setSeedMsg("")} className="text-white/70 hover:text-white underline">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Metric Cards Grid (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Total Revenue */}
        <div className="bg-[#121215] border border-white/10 hover:border-terra-bronze/50 transition-all rounded-2xl p-5 space-y-3 shadow-lg group">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-white/50">Total Gross Volume</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white tracking-wide font-bold">
              ₹{stats?.totalRevenue.toLocaleString() || "0"}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight className="w-3 h-3" /> Cumulative Revenue
            </div>
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-[#121215] border border-white/10 hover:border-terra-bronze/50 transition-all rounded-2xl p-5 space-y-3 shadow-lg group">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-white/50">Average Order Value</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white tracking-wide font-bold">
              ₹{aov.toLocaleString()}
            </div>
            <div className="text-[11px] text-white/50 font-mono mt-1 font-medium">Per Transaction Average</div>
          </div>
        </div>

        {/* Orders Count */}
        <div
          onClick={() => onNavigate("orders")}
          className="bg-[#121215] border border-white/10 hover:border-terra-bronze/50 transition-all rounded-2xl p-5 space-y-3 shadow-lg group cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-white/50">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShoppingBag className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white tracking-wide font-bold">{stats?.ordersCount || 0}</div>
            <div className="text-[11px] text-amber-300 font-mono mt-1 font-medium">
              {stats?.statusBreakdown?.pending || 0} Pending Dispatch
            </div>
          </div>
        </div>

        {/* Registered Members */}
        <div
          onClick={() => onNavigate("users")}
          className="bg-[#121215] border border-white/10 hover:border-terra-bronze/50 transition-all rounded-2xl p-5 space-y-3 shadow-lg group cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-white/50">Members</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-4.5 h-4.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white tracking-wide font-bold">{stats?.usersCount || 0}</div>
            <div className="text-[11px] text-white/50 font-mono mt-1 font-medium">User Accounts</div>
          </div>
        </div>

        {/* Action Required Inquiries */}
        <div
          onClick={() => onNavigate("contacts")}
          className="bg-[#121215] border border-white/10 hover:border-terra-bronze/50 transition-all rounded-2xl p-5 space-y-3 shadow-lg group cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-white/50">Unread Inbox</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 relative">
              <MessageSquare className="w-4.5 h-4.5" />
              {(stats?.newContactsCount || 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              )}
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif text-white tracking-wide font-bold">{stats?.newContactsCount || 0}</div>
            <div className="text-[11px] text-rose-400 font-mono mt-1 font-semibold">Requires Attention</div>
          </div>
        </div>
      </div>

      {/* Middle Section: Orders Status Distribution & Catalog Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Status Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-[#121215] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">Order Pipeline Breakdown</h3>
            <ShoppingBag className="w-4 h-4 text-terra-gold" />
          </div>

          <div className="space-y-4 pt-1">
            {[
              { label: "Pending", key: "pending", color: "bg-amber-400", count: stats?.statusBreakdown?.pending || 0 },
              { label: "Paid", key: "paid", color: "bg-blue-400", count: stats?.statusBreakdown?.paid || 0 },
              { label: "Shipped", key: "shipped", color: "bg-purple-400", count: stats?.statusBreakdown?.shipped || 0 },
              { label: "Delivered", key: "delivered", color: "bg-emerald-400", count: stats?.statusBreakdown?.delivered || 0 },
              { label: "Cancelled", key: "cancelled", color: "bg-rose-400", count: stats?.statusBreakdown?.cancelled || 0 },
            ].map((item) => {
              const percentage = stats?.ordersCount ? Math.round((item.count / stats.ordersCount) * 100) : 0;
              return (
                <div key={item.key} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/80 font-medium">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} /> {item.label}
                    </span>
                    <span className="font-mono text-white/70">{item.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Module Access (7 cols) */}
        <div className="lg:col-span-7 bg-[#121215] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <div>
              <h3 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">Catalog &amp; Subscriptions Vault</h3>
              <p className="text-xs text-white/50 font-sans mt-0.5">Direct module management</p>
            </div>
            <Package className="w-4 h-4 text-terra-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div
              onClick={() => onNavigate("products")}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 cursor-pointer transition-colors space-y-2 group"
            >
              <div className="text-[10px] text-terra-gold font-mono uppercase tracking-wider font-semibold">Products Catalog</div>
              <div className="text-2xl font-serif text-white font-bold">{stats?.productsCount || 0} Items</div>
              <div className="text-xs text-white/60 font-medium group-hover:text-terra-gold transition-colors font-mono">Manage Inventory &rarr;</div>
            </div>

            <div
              onClick={() => onNavigate("subscribers")}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 cursor-pointer transition-colors space-y-2 group"
            >
              <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider font-semibold">Subscribers</div>
              <div className="text-2xl font-serif text-white font-bold">{stats?.subscribersCount || 0} Emails</div>
              <div className="text-xs text-white/60 font-medium group-hover:text-emerald-400 transition-colors font-mono">Export CSV Vault &rarr;</div>
            </div>

            <div
              onClick={() => onNavigate("contacts")}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 cursor-pointer transition-colors space-y-2 group"
            >
              <div className="text-[10px] text-rose-400 font-mono uppercase tracking-wider font-semibold">Customer Inquiries</div>
              <div className="text-2xl font-serif text-white font-bold">{stats?.contactsCount || 0} Messages</div>
              <div className="text-xs text-white/60 font-medium group-hover:text-rose-400 transition-colors font-mono">View Inbox &rarr;</div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Store Orders Section */}
      <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 md:p-7 space-y-5 shadow-xl">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-serif text-white font-medium">Recent Store Transactions</h3>
            <p className="text-xs text-white/50 mt-0.5 font-sans">Latest customer orders</p>
          </div>
          <button
            onClick={() => onNavigate("orders")}
            className="text-xs text-terra-gold hover:underline font-mono uppercase tracking-wider font-semibold"
          >
            View All Orders &rarr;
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10 text-xs font-mono text-white/50 uppercase tracking-wider">
            No transaction records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 font-mono uppercase tracking-wider bg-white/[0.02]">
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Delivery City</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors font-sans">
                    <td className="py-4 px-4 font-mono text-terra-gold font-bold text-sm">{order.orderId}</td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white text-sm">{order.customer.fullName}</div>
                      <div className="text-xs text-white/50 font-mono">{order.customer.email}</div>
                    </td>
                    <td className="py-4 px-4 text-white/80">{order.customer.city}</td>
                    <td className="py-4 px-4 font-mono font-bold text-white text-sm">₹{order.totalAmount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-terra-gold text-terra-beige text-xs font-mono rounded transition-colors"
                      >
                        Inspect &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Order Detail Modal with Portal */}
      {mounted && selectedOrder && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-white/20 max-w-lg w-full rounded-2xl p-6 space-y-6 shadow-2xl relative my-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-terra-gold">Transaction Record</span>
                <h3 className="text-xl font-serif text-white font-bold">{selectedOrder.orderId}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 rounded bg-white/5 text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-white/80 font-sans">
              <div className="bg-[#161616] p-4 rounded border border-white/5 space-y-1 font-mono">
                <p className="text-white font-serif text-sm font-semibold">{selectedOrder.customer?.fullName}</p>
                <p className="text-white/60">{selectedOrder.customer?.email}</p>
                <p className="text-white/60">City: {selectedOrder.customer?.city}</p>
              </div>

              <div className="flex justify-between items-center bg-[#161616] p-4 rounded border border-white/5 font-mono">
                <span>Grand Total</span>
                <span className="text-terra-gold text-base font-bold">₹{selectedOrder.totalAmount}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  onNavigate("orders");
                }}
                className="px-4 py-2 bg-terra-bronze text-terra-black font-bold text-xs font-mono uppercase rounded hover:brightness-110 transition-all"
              >
                View Full Orders Manager &rarr;
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-950/60 border-amber-500/40 text-amber-300",
    paid: "bg-blue-950/60 border-blue-500/40 text-blue-300",
    shipped: "bg-purple-950/60 border-purple-500/40 text-purple-300",
    delivered: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
    cancelled: "bg-rose-950/60 border-rose-500/40 text-rose-300",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded border text-[10px] uppercase font-mono tracking-wider font-bold inline-block ${
        styles[status] || "bg-white/10 border-white/20 text-white/80"
      }`}
    >
      {status}
    </span>
  );
}
