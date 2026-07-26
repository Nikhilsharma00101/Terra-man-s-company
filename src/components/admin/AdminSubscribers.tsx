"use client";

import React, { useState, useEffect } from "react";
import { Mail, Search, Download, Copy, Trash2, Check, Loader2 } from "lucide-react";

export interface SubscriberItem {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/subscribers", window.location.origin);
      if (searchQuery) url.searchParams.set("search", searchQuery);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [searchQuery]);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriberId: id, isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) =>
          prev.map((s) => (s._id === id ? { ...s, isActive: !currentStatus } : s))
        );
      }
    } catch (err) {
      console.error("Failed to toggle subscriber active state:", err);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const res = await fetch(`/api/admin/subscribers?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
    }
  };

  const handleCopyEmails = () => {
    const emailList = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emailList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    const headers = "Email,Status,SubscribedDate\n";
    const rows = subscribers
      .map((s) => `"${s.email}","${s.isActive ? "Active" : "Inactive"}","${new Date(s.createdAt).toISOString()}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `terra_subscribers_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 font-sans text-[#f4f0ea]">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 bg-[#121215] border border-white/10 p-6 md:p-7 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-2.5 font-medium">
            <Mail className="w-6 h-6 text-terra-gold" /> Newsletter Subscribers List
          </h2>
          <p className="text-sm text-white/70 mt-1">Manage mailing list members and export contacts</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscriber email..."
              className="bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none w-full sm:w-72 shadow-inner"
            />
            <Search className="w-4.5 h-4.5 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={handleCopyEmails}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-mono rounded-xl transition-colors cursor-pointer font-semibold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-terra-gold" />}
              {copied ? "Copied!" : "Copy List"}
            </button>

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-2 px-4 py-2.5 bg-terra-bronze/30 hover:bg-terra-bronze/50 border border-terra-bronze text-terra-gold text-xs font-mono rounded-xl transition-colors cursor-pointer font-bold"
            >
              <Download className="w-4 h-4" /> Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-[#121215] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-14 text-center text-sm text-white/60 flex items-center justify-center gap-2.5">
            <Loader2 className="w-5 h-5 animate-spin text-terra-gold" /> Loading subscribers...
          </div>
        ) : subscribers.length === 0 ? (
          <div className="p-14 text-center text-sm text-white/60">No subscribers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/60 font-mono uppercase tracking-wider text-xs bg-white/[0.03]">
                  <th className="py-4 px-5">Subscriber Email</th>
                  <th className="py-4 px-5">Subscription Status</th>
                  <th className="py-4 px-5">Joined Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map((sub) => (
                  <tr key={sub._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-5 font-mono text-white font-semibold text-base">{sub.email}</td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleToggleActive(sub._id, sub.isActive)}
                        className={`px-3 py-1 rounded-full border text-xs uppercase font-mono tracking-wider font-bold cursor-pointer ${
                          sub.isActive
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                            : "bg-rose-500/20 border-rose-500/40 text-rose-300"
                        }`}
                      >
                        {sub.isActive ? "Active" : "Unsubscribed"}
                      </button>
                    </td>
                    <td className="py-4 px-5 text-white/70 font-mono text-xs">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleDeleteSubscriber(sub._id)}
                        className="p-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 transition-colors cursor-pointer"
                        title="Remove Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
