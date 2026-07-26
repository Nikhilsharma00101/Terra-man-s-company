"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, ShoppingBag, Eye, Trash2, X, Loader2, Download, Printer, Mail, ExternalLink, Filter } from "lucide-react";
import { StatusBadge } from "./AdminDashboard";
import { products } from "@/lib/data";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface AdminOrder {
  _id: string;
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOrder, setActiveOrder] = useState<AdminOrder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getItemImage = (item: OrderItem) => {
    if (item.image) return item.image;
    const match = products.find(
      (p) =>
        p.id === item.productId ||
        p.name.toLowerCase() === item.title.toLowerCase() ||
        item.title.toLowerCase().includes(p.name.toLowerCase())
    );
    return match?.image || "/images/products/face-wash/front-side.jpeg";
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/orders", window.location.origin);
      if (selectedStatus !== "all") url.searchParams.set("status", selectedStatus);
      if (searchQuery) url.searchParams.set("search", searchQuery);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus, searchQuery]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus as AdminOrder["status"] } : o))
        );
        if (activeOrder && activeOrder.orderId === orderId) {
          setActiveOrder({ ...activeOrder, status: newStatus as AdminOrder["status"] });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm(`Are you sure you want to delete order ${orderId}?`)) return;

    try {
      const res = await fetch(`/api/admin/orders?orderId=${orderId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
        if (activeOrder?.orderId === orderId) setActiveOrder(null);
      }
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  // Export Filtered Orders to CSV
  const handleExportCSV = () => {
    if (orders.length === 0) return;

    const headers = ["Order ID", "Customer Name", "Email", "Phone", "Address", "City", "Postal Code", "Country", "Items", "Total Amount (INR)", "Payment Method", "Status", "Date Placed"];
    const rows = orders.map((o) => [
      `"${o.orderId}"`,
      `"${o.customer?.fullName || ""}"`,
      `"${o.customer?.email || ""}"`,
      `"${o.customer?.phone || ""}"`,
      `"${(o.customer?.address || "").replace(/"/g, '""')}"`,
      `"${o.customer?.city || ""}"`,
      `"${o.customer?.postalCode || ""}"`,
      `"${o.customer?.country || "India"}"`,
      `"${o.items.map((i) => `${i.quantity}x ${i.title}`).join("; ")}"`,
      o.totalAmount,
      `"${o.paymentMethod || "COD"}"`,
      `"${o.status}"`,
      `"${new Date(o.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `TERRA_Orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#f4f0ea]">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 bg-[#121215] border border-white/10 p-6 md:p-7 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-terra-gold bg-terra-bronze/20 px-2 py-0.5 rounded border border-terra-bronze/30 font-semibold">
              Logistics &amp; Fulfillment
            </span>
          </div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-2.5 font-medium">
            <ShoppingBag className="w-6 h-6 text-terra-gold" /> Store Orders Vault
          </h2>
          <p className="text-xs text-white/60 font-sans">Inspect, update fulfillment status, and export customer order manifests</p>
        </div>

        {/* Search, Filter & CSV Export */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, customer name, email..."
              className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none font-sans"
            />
          </div>

          {/* Status Filter Dropdown / Tabs */}
          <div className="flex bg-[#1a1a1e] border border-white/15 rounded-xl p-1 overflow-x-auto text-xs hide-scrollbar w-full sm:w-auto">
            {["all", "pending", "paid", "shipped", "delivered", "cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors font-mono text-xs font-semibold cursor-pointer shrink-0 ${
                  selectedStatus === st
                    ? "bg-terra-bronze text-terra-black font-bold shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            disabled={orders.length === 0}
            className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/15 hover:border-terra-gold text-terra-beige text-xs font-mono uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            title="Export filtered orders to CSV"
          >
            <Download className="w-3.5 h-3.5 text-terra-gold" /> Export CSV
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#121215] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-14 text-center text-xs font-mono text-white/60 flex items-center justify-center gap-2.5 uppercase tracking-wider">
            <Loader2 className="w-4 h-4 animate-spin text-terra-gold" /> Fetching store order manifests...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-14 text-center text-xs font-mono text-white/50 uppercase tracking-wider">
            No orders found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 font-mono uppercase tracking-wider bg-white/[0.02]">
                  <th className="py-4 px-5">Order Ref</th>
                  <th className="py-4 px-5">Customer &amp; City</th>
                  <th className="py-4 px-5">Items Purchased</th>
                  <th className="py-4 px-5">Total Amount</th>
                  <th className="py-4 px-5">Payment</th>
                  <th className="py-4 px-5">Status Switcher</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-5 font-mono text-terra-gold font-bold text-sm">{order.orderId}</td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white text-sm">{order.customer.fullName}</div>
                      <div className="text-xs text-white/50 font-mono">{order.customer.email}</div>
                      <div className="text-[11px] text-white/40">{order.customer.city}, {order.customer.country || "India"}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="space-y-1.5">
                        {order.items.map((it, idx) => {
                          const imgUrl = getItemImage(it);
                          return (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <div className="w-7 h-7 rounded bg-black/50 border border-white/10 overflow-hidden shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imgUrl} alt={it.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="truncate max-w-[200px]">
                                <span className="font-mono text-terra-gold font-bold">{it.quantity}x</span>{" "}
                                <span className="text-white/90">{it.title}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-white text-sm">₹{order.totalAmount.toLocaleString()}</td>
                    <td className="py-4 px-5 text-white/80 font-mono text-xs font-semibold">{order.paymentMethod || "COD"}</td>
                    <td className="py-4 px-5">
                      <select
                        value={order.status}
                        disabled={updatingId === order.orderId}
                        onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                        className="bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-lg px-2.5 py-1 text-xs font-mono text-white font-semibold focus:outline-none cursor-pointer"
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveOrder(order)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-terra-beige hover:text-white transition-colors cursor-pointer border border-white/10"
                          title="Inspect Order Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.orderId)}
                          className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 transition-colors cursor-pointer border border-rose-500/30"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EXPANDABLE ADMIN ORDER DOSSIER MODAL WITH REACT PORTAL */}
      {mounted && activeOrder && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#121215] border border-white/20 max-w-2xl w-full rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto font-sans my-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono text-terra-gold tracking-widest font-semibold">Admin Order Dossier</span>
                <h3 className="text-2xl font-serif text-white font-bold">{activeOrder.orderId}</h3>
                <p className="text-xs text-white/50 mt-1 font-mono">
                  Placed on {new Date(activeOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Status Switcher Bar */}
            <div className="bg-[#1a1a1e] border border-white/15 p-4 rounded-xl flex items-center justify-between">
              <span className="text-xs text-white/80 font-mono font-medium">Order Status:</span>
              <div className="flex items-center gap-3">
                <StatusBadge status={activeOrder.status} />
                <select
                  value={activeOrder.status}
                  onChange={(e) => handleUpdateStatus(activeOrder.orderId, e.target.value)}
                  className="bg-black border border-white/30 rounded-lg px-3 py-1 text-xs text-white font-mono font-bold cursor-pointer"
                >
                  <option value="pending">pending</option>
                  <option value="paid">paid</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer Info Dossier */}
            <div className="space-y-3 border-b border-white/10 pb-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-mono text-terra-gold tracking-wider font-semibold">Customer &amp; Shipping Details</h4>
                <a
                  href={`mailto:${activeOrder.customer.email}?subject=${encodeURIComponent(`TERRA Order Status: ${activeOrder.orderId}`)}`}
                  className="text-xs font-mono text-terra-gold hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> Email Customer
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-white/40 block font-mono uppercase text-[10px]">Full Name</span>
                  <span className="text-white font-serif text-base font-semibold">{activeOrder.customer.fullName}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-mono uppercase text-[10px]">Email Address</span>
                  <span className="text-white font-mono">{activeOrder.customer.email}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-mono uppercase text-[10px]">Phone Number</span>
                  <span className="text-white font-mono">{activeOrder.customer.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-mono uppercase text-[10px]">Payment Method</span>
                  <span className="text-terra-gold font-mono font-bold uppercase">{activeOrder.paymentMethod || "COD"}</span>
                </div>
                <div className="col-span-2 bg-[#161616] p-3 rounded border border-white/5">
                  <span className="text-white/40 block font-mono uppercase text-[10px]">Shipping Address</span>
                  <span className="text-white/90 leading-relaxed font-sans">
                    {activeOrder.customer.address}, {activeOrder.customer.city}, {activeOrder.customer.postalCode},{" "}
                    {activeOrder.customer.country || "India"}
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Order Table with Thumbnails */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono text-white/40 tracking-wider font-semibold">Ordered Formulations</h4>
              <div className="space-y-2">
                {activeOrder.items.map((item, idx) => {
                  const imgUrl = getItemImage(item);
                  return (
                    <div key={idx} className="flex justify-between items-center bg-[#161616] border border-white/10 p-3 rounded-lg text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-black/60 border border-white/10 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-serif text-sm text-white font-medium">{item.title}</div>
                          <div className="text-[10px] font-mono text-white/40">ID: {item.productId}</div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-white/60">{item.quantity} × ₹{item.price}</div>
                        <div className="text-terra-gold font-bold">₹{item.quantity * item.price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 border border-white/15 rounded text-xs font-mono text-white/80 hover:text-terra-gold hover:border-terra-gold/50 transition-colors flex items-center gap-2 bg-[#161616]"
              >
                <Printer className="w-3.5 h-3.5" /> Print Order Invoice
              </button>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-white/40 block">Grand Total Paid</span>
                <span className="font-serif text-2xl text-white font-bold">₹{activeOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
