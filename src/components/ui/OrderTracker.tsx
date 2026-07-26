"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PackageCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  XCircle,
  Printer,
  ShoppingBag,
  X,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Search,
  FileText,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import { products } from "@/lib/data";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderType {
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
  updatedAt?: string;
}

interface OrderTrackerProps {
  orders: OrderType[];
  isLoading?: boolean;
}

export function OrderTracker({ orders, isLoading = false }: OrderTrackerProps) {
  const { addItem, setIsOpen: setIsCartOpen } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "price-high" | "price-low">("newest");

  // Resolve product thumbnail image
  const getItemImage = (item: OrderItem) => {
    if (item.image) return item.image;
    const match = products.find(
      (p) =>
        p.id === item.productId ||
        p.name.toLowerCase() === item.title.toLowerCase() ||
        item.title.toLowerCase().includes(p.name.toLowerCase()) ||
        p.name.toLowerCase().includes(item.title.toLowerCase())
    );
    return match?.image || "/images/products/face-wash/front-side.jpeg";
  };

  // Reorder functionality: find matching product from dataset or fallback
  const handleReorder = (order: OrderType) => {
    order.items.forEach((item) => {
      const matched = products.find((p) => p.id === item.productId || p.name.toLowerCase() === item.title.toLowerCase());
      if (matched) {
        addItem(matched, item.quantity);
      } else {
        // Fallback product structure
        addItem(
          {
            id: item.productId || `prod-${Math.random()}`,
            name: item.title,
            tagline: "TERRA Grooming Essential",
            price: item.price,
            image: getItemImage(item),
            category: "Grooming",
            theme: "Ritual Care",
            ingredients: ["Active Formulation"],
            description: item.title,
          },
          item.quantity
        );
      }
    });
    setIsCartOpen(true);
  };

  // Status Stepper Calculations
  const getStepIndex = (status: OrderType["status"]) => {
    switch (status) {
      case "pending":
        return 0;
      case "paid":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  const steps = [
    { label: "Order Placed", icon: PackageCheck, desc: "Order details received" },
    { label: "Payment Confirmed", icon: CreditCard, desc: "Transaction authorized" },
    { label: "In Transit", icon: Truck, desc: "Handed to express courier" },
    { label: "Delivered", icon: CheckCircle2, desc: "Package safely delivered" },
  ];

  // Filtering and Sorting
  const filteredOrders = orders
    .filter((order) => {
      if (filterStatus === "active" && !["pending", "paid", "shipped"].includes(order.status)) return false;
      if (filterStatus === "delivered" && order.status !== "delivered") return false;
      if (filterStatus === "cancelled" && order.status !== "cancelled") return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchItem = order.items.some((i) => i.title.toLowerCase().includes(q));
      const matchCity = order.customer?.city?.toLowerCase().includes(q);
      return matchId || matchItem || matchCity;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "price-high") return b.totalAmount - a.totalAmount;
      if (sortBy === "price-low") return a.totalAmount - b.totalAmount;
      return 0;
    });

  const getStatusBadge = (status: OrderType["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Delivered
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            In Transit
          </span>
        );
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-950/60 border border-blue-500/40 text-blue-300 text-[11px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Processing
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-terra-bronze/20 border border-terra-bronze/40 text-terra-gold text-[11px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-terra-gold animate-pulse" />
            Order Received
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-[11px] font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Cancelled
          </span>
        );
    }
  };

  const handlePrintReceipt = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#121212] border border-white/10 p-12 rounded-xl text-center space-y-4 shadow-xl">
        <div className="w-8 h-8 border-2 border-terra-gold border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs uppercase font-mono tracking-[0.25em] text-white/50">
          Retrieving Order Vault &amp; Dispatch Records...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#121215] border border-white/10 p-6 rounded-xl shadow-xl">
        
        {/* Filter Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "All Orders", count: orders.length },
            { id: "active", label: "Active / In Transit", count: orders.filter((o) => ["pending", "paid", "shipped"].includes(o.status)).length },
            { id: "delivered", label: "Delivered", count: orders.filter((o) => o.status === "delivered").length },
            { id: "cancelled", label: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length },
          ].map((tab) => {
            const isActive = filterStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-2 rounded text-xs font-mono transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-terra-bronze text-terra-black font-bold shadow"
                    : "bg-[#181818] border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${isActive ? "bg-black/30 text-terra-black" : "bg-white/10 text-white/50"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Sort Selection */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order Ref ID or Product..."
              className="w-full bg-[#181818] border border-white/10 rounded pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-terra-gold transition-colors font-sans"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full sm:w-auto bg-[#181818] border border-white/10 rounded px-3 py-2 text-xs text-white/70 focus:outline-none focus:border-terra-gold transition-colors font-mono cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List Container */}
      {filteredOrders.length === 0 ? (
        <div className="bg-[#121212] border border-white/10 p-12 text-center rounded-xl space-y-4 shadow-xl">
          <PackageCheck className="w-12 h-12 text-white/20 mx-auto" />
          <h3 className="font-serif text-white text-xl">No matching orders found</h3>
          <p className="text-xs text-white/50 max-w-md mx-auto font-sans">
            {searchQuery
              ? `No orders matching "${searchQuery}". Try adjusting your search term or filter.`
              : "You haven't placed any grooming orders yet."}
          </p>
          {searchQuery ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
              className="px-4 py-2 bg-terra-bronze/20 border border-terra-bronze/40 text-terra-gold text-xs font-mono uppercase rounded hover:bg-terra-bronze/30 transition-colors"
            >
              Clear Filter Controls
            </button>
          ) : (
            <Link
              href="/#collection"
              className="inline-block px-6 py-3 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-bold text-xs uppercase tracking-[0.2em] rounded hover:brightness-110 transition-all font-mono"
            >
              Explore Grooming Collection &rarr;
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const stepIdx = getStepIndex(order.status);
            const isCancelled = order.status === "cancelled";

            return (
              <div
                key={order._id}
                className="bg-[#121212] border border-white/10 hover:border-terra-bronze/40 p-6 lg:p-8 rounded-xl transition-all duration-300 relative shadow-xl group space-y-6"
              >
                {/* HUD Framing Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />

                {/* Card Top Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">Order Ref</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <h3 className="text-white font-mono text-xl font-bold tracking-tight">{order.orderId}</h3>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono">
                    <div>
                      <span className="text-white/40 text-[10px] uppercase tracking-widest block">Date Placed</span>
                      <span className="text-white/80">{new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] uppercase tracking-widest block">Payment</span>
                      <span className="text-terra-gold uppercase font-bold">{order.paymentMethod || "COD"}</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] uppercase tracking-widest block">Total</span>
                      <span className="text-terra-gold text-base font-bold">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* VISUAL STEPPER TRACKER (4 STAGES) */}
                {!isCancelled && (
                  <div className="bg-[#161616] p-5 rounded-lg border border-white/5 space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-terra-gold">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-terra-gold" /> Live Dispatch Tracker
                      </span>
                      <span className="text-white/40 font-normal">
                        Estimated Delivery: 2–4 Business Days
                      </span>
                    </div>

                    {/* Stepper Progress Bar */}
                    <div className="relative flex items-center justify-between pt-2">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full" />
                      <div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-terra-bronze via-terra-gold to-emerald-400 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
                        style={{
                          width: stepIdx === 0 ? "0%" : stepIdx === 1 ? "33%" : stepIdx === 2 ? "66%" : "100%",
                        }}
                      />

                      {steps.map((st, idx) => {
                        const Icon = st.icon;
                        const isDone = idx <= stepIdx;
                        const isCurrent = idx === stepIdx;

                        return (
                          <div key={idx} className="relative z-10 flex flex-col items-center group/step cursor-default">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isDone
                                  ? isCurrent
                                    ? "bg-terra-gold text-terra-black ring-4 ring-terra-gold/20 scale-110 font-bold"
                                    : "bg-emerald-950 border border-emerald-500/50 text-emerald-400"
                                  : "bg-[#181818] border border-white/20 text-white/30"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span
                              className={`mt-2 text-[10px] font-mono uppercase tracking-wider text-center max-w-[80px] hidden sm:block ${
                                isCurrent ? "text-terra-gold font-bold" : isDone ? "text-white/80" : "text-white/30"
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cancelled Banner */}
                {isCancelled && (
                  <div className="bg-rose-950/30 border border-rose-500/30 p-4 rounded text-xs text-rose-300 flex items-center gap-3 font-sans">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <strong className="block font-medium text-white">Order Cancelled</strong>
                      This order was cancelled. Any authorized charges have been released back to your original payment method.
                    </div>
                  </div>
                )}

                {/* Items Summary with Clickable Product Navigation */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
                  <div className="space-y-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">Items Purchased</span>
                      <span className="text-[10px] font-mono text-terra-gold/60 uppercase tracking-widest">Click item to view product</span>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => {
                        const imgUrl = getItemImage(item);
                        return (
                          <div key={idx} className="flex items-center justify-between text-xs text-white/80 bg-[#161616] p-2.5 rounded border border-white/5 hover:border-terra-gold/40 transition-all group/item">
                            <Link
                              href="/#collection"
                              className="flex items-center gap-3 group/link flex-grow cursor-pointer"
                              title="Click to view product details"
                            >
                              <div className="w-10 h-10 rounded bg-black/50 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center group-hover/link:border-terra-gold transition-colors">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={imgUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover/link:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <span className="font-serif text-sm text-white font-medium group-hover/link:text-terra-gold transition-colors flex items-center gap-1.5 leading-tight">
                                  {item.title}
                                  <ArrowUpRight className="w-3 h-3 text-terra-gold opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                </span>
                                <span className="text-white/40 font-mono text-[11px]">Qty: {item.quantity} × ₹{item.price}</span>
                              </div>
                            </Link>

                            <span className="font-mono text-terra-gold font-bold text-sm shrink-0 pl-3">₹{item.price * item.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2.5 bg-[#181818] border border-white/15 text-white/80 hover:text-white hover:border-terra-gold/50 rounded transition-colors text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-terra-gold" /> View Dossier
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-bold rounded hover:brightness-110 transition-all text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Buy Again
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* EXPANDABLE ORDER DOSSIER DETAIL MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#121212] border border-white/15 w-full max-w-3xl rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Corner Brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-terra-gold pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-terra-gold pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-terra-gold pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-terra-gold pointer-events-none" />

              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-terra-gold">Official Order Dossier</span>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <h2 className="text-2xl font-serif text-white">{selectedOrder.orderId}</h2>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 lg:p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-140px)] hide-scrollbar font-sans">
                
                {/* 1. Address & Customer Dossier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#161616] p-5 rounded border border-white/5 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-terra-gold flex items-center gap-1.5 font-bold">
                      <MapPin className="w-3.5 h-3.5" /> Shipping Address
                    </span>
                    <div className="text-xs text-white/80 space-y-1 leading-relaxed">
                      <p className="font-serif text-base text-white font-medium">{selectedOrder.customer?.fullName || "Valued Customer"}</p>
                      <p>{selectedOrder.customer?.address}</p>
                      <p>{selectedOrder.customer?.city}, {selectedOrder.customer?.postalCode}</p>
                      <p className="text-white/40">{selectedOrder.customer?.country || "India"}</p>
                    </div>
                  </div>

                  <div className="bg-[#161616] p-5 rounded border border-white/5 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-terra-gold flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Contact &amp; Payment Details
                    </span>
                    <div className="text-xs text-white/80 space-y-2 font-mono">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-white/40" />
                        <span>{selectedOrder.customer?.email}</span>
                      </div>
                      {selectedOrder.customer?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-white/40" />
                          <span>{selectedOrder.customer.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-1 border-t border-white/5 text-terra-gold">
                        <CreditCard className="w-3.5 h-3.5 text-terra-gold" />
                        <span>Method: {selectedOrder.paymentMethod || "COD"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Items Breakdown Table with Clickable Navigation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">Itemized Formulation Order</span>
                    <span className="text-[10px] font-mono text-terra-gold/60 uppercase tracking-widest">Click product row to view details</span>
                  </div>

                  <div className="border border-white/10 rounded-lg overflow-hidden bg-[#141414]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#1a1a1a] border-b border-white/10 text-terra-gold font-mono uppercase tracking-wider">
                          <th className="py-3 px-4">Product</th>
                          <th className="py-3 px-4 text-center">Qty</th>
                          <th className="py-3 px-4 text-right">Unit Price</th>
                          <th className="py-3 px-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-sans">
                        {selectedOrder.items.map((item, idx) => {
                          const imgUrl = getItemImage(item);
                          return (
                            <tr key={idx} className="hover:bg-white/5 transition-colors group/modalrow">
                              <td className="py-3.5 px-4">
                                <Link
                                  href="/#collection"
                                  onClick={() => setSelectedOrder(null)}
                                  className="flex items-center gap-3 group/prodlink cursor-pointer"
                                  title="Click to view product details"
                                >
                                  <div className="w-12 h-12 rounded bg-black/60 border border-white/10 overflow-hidden shrink-0 group-hover/prodlink:border-terra-gold transition-colors">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imgUrl} alt={item.title} className="w-full h-full object-cover group-hover/prodlink:scale-110 transition-transform duration-300" />
                                  </div>
                                  <div>
                                    <span className="font-serif text-base text-white font-medium group-hover/prodlink:text-terra-gold transition-colors flex items-center gap-1">
                                      {item.title}
                                      <ArrowUpRight className="w-3.5 h-3.5 text-terra-gold opacity-0 group-hover/prodlink:opacity-100 transition-opacity" />
                                    </span>
                                    <span className="text-[10px] font-mono text-terra-gold/80 uppercase tracking-wider">Explore Formulation</span>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-3.5 px-4 text-center font-mono text-white/60">
                                {item.quantity}
                              </td>
                              <td className="py-3.5 px-4 text-right font-mono text-white/60">
                                ₹{item.price}
                              </td>
                              <td className="py-3.5 px-4 text-right font-mono text-terra-gold font-bold">
                                ₹{item.price * item.quantity}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Financial Summary */}
                <div className="bg-[#161616] p-5 rounded-lg border border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-white/60">
                    <span>Items Subtotal</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Express Delivery</span>
                    <span className="text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Estimated Tax (GST 18% Incl.)</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between text-sm text-terra-gold font-bold pt-2 border-t border-white/10">
                    <span>Grand Total Paid</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-[#161616] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrintReceipt}
                    className="px-3.5 py-2 border border-white/15 rounded text-xs font-mono text-white/80 hover:text-terra-gold hover:border-terra-gold/50 transition-colors flex items-center gap-2 bg-[#121212]"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Receipt
                  </button>
                  <a
                    href={`/contact?subject=${encodeURIComponent(`Order Inquiry: ${selectedOrder.orderId}`)}`}
                    className="px-3.5 py-2 border border-white/15 rounded text-xs font-mono text-white/80 hover:text-terra-gold hover:border-terra-gold/50 transition-colors flex items-center gap-2 bg-[#121212]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Support Inquiry
                  </a>
                </div>

                <button
                  onClick={() => {
                    handleReorder(selectedOrder);
                    setSelectedOrder(null);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-terra-bronze to-terra-gold text-terra-black font-bold rounded hover:brightness-110 transition-all text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Reorder All Items
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
