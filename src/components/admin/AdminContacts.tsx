"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, Search, Eye, Trash2, X, Loader2 } from "lucide-react";

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export function AdminContacts() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContact, setActiveContact] = useState<ContactMessage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/contacts", window.location.origin);
      if (selectedStatus !== "all") url.searchParams.set("status", selectedStatus);
      if (searchQuery) url.searchParams.set("search", searchQuery);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (err) {
      console.error("Failed to fetch contact inquiries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [selectedStatus, searchQuery]);

  const handleUpdateStatus = async (contactId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) =>
          prev.map((c) => (c._id === contactId ? { ...c, status: newStatus as ContactMessage["status"] } : c))
        );
        if (activeContact && activeContact._id === contactId) {
          setActiveContact({ ...activeContact, status: newStatus as ContactMessage["status"] });
        }
      }
    } catch (err) {
      console.error("Failed to update contact status:", err);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        if (activeContact?._id === id) setActiveContact(null);
      }
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#f4f0ea]">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 bg-[#121215] border border-white/10 p-6 md:p-7 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-2.5 font-medium">
            <MessageSquare className="w-6 h-6 text-terra-gold" /> Customer Inquiries Inbox
          </h2>
          <p className="text-sm text-white/70 mt-1">Review and manage client contact form submissions</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject, email..."
              className="bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none w-full sm:w-72 shadow-inner"
            />
            <Search className="w-4.5 h-4.5 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
          </div>

          <div className="flex bg-[#1a1a1e] border border-white/15 rounded-xl p-1.5 text-sm">
            {["all", "new", "read", "replied"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-lg capitalize transition-colors font-mono text-xs font-semibold cursor-pointer ${
                  selectedStatus === st
                    ? "bg-terra-bronze text-white shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-[#121215] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-14 text-center text-sm text-white/60 flex items-center justify-center gap-2.5">
            <Loader2 className="w-5 h-5 animate-spin text-terra-gold" /> Loading messages...
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-14 text-center text-sm text-white/60">No contact messages found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/60 font-mono uppercase tracking-wider text-xs bg-white/[0.03]">
                  <th className="py-4 px-5">Sender</th>
                  <th className="py-4 px-5">Subject &amp; Preview</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Date Received</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white text-base">{contact.name}</div>
                      <div className="text-xs font-mono text-white/60">{contact.email}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white text-base max-w-[320px] truncate">{contact.subject}</div>
                      <div className="text-xs text-white/60 max-w-[320px] truncate mt-0.5">{contact.message}</div>
                    </td>
                    <td className="py-4 px-5">
                      <select
                        value={contact.status}
                        onChange={(e) => handleUpdateStatus(contact._id, e.target.value)}
                        className="bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-3 py-1.5 text-xs font-mono text-white font-semibold focus:outline-none cursor-pointer"
                      >
                        <option value="new">new</option>
                        <option value="read">read</option>
                        <option value="replied">replied</option>
                      </select>
                    </td>
                    <td className="py-4 px-5 text-white/70 font-mono text-xs">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => {
                            setActiveContact(contact);
                            if (contact.status === "new") handleUpdateStatus(contact._id, "read");
                          }}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-terra-beige hover:text-white transition-colors cursor-pointer"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="p-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 transition-colors cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Message Modal with Portal */}
      {mounted && activeContact && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-white/20 max-w-xl w-full rounded-2xl shadow-2xl p-7 space-y-6 relative overflow-hidden my-auto font-sans">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-mono text-terra-gold tracking-widest font-semibold">Inquiry Message</span>
                <h3 className="text-xl font-serif text-white font-bold mt-1">{activeContact.subject}</h3>
                <p className="text-sm text-white/70 mt-1">
                  From: <span className="text-white font-semibold">{activeContact.name}</span> ({activeContact.email})
                </p>
              </div>
              <button
                onClick={() => setActiveContact(null)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#1a1a1e] border border-white/15 p-5 rounded-xl space-y-2">
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider block font-semibold">Message Content</span>
              <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{activeContact.message}</p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <a
                href={`mailto:${activeContact.email}?subject=Re: ${encodeURIComponent(activeContact.subject)}`}
                onClick={() => handleUpdateStatus(activeContact._id, "replied")}
                className="px-5 py-2.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all font-mono"
              >
                Reply via Email
              </a>

              <div className="flex items-center gap-2.5">
                <span className="text-xs text-white/70 font-mono font-medium">Status:</span>
                <select
                  value={activeContact.status}
                  onChange={(e) => handleUpdateStatus(activeContact._id, e.target.value)}
                  className="bg-black border border-white/30 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-bold cursor-pointer"
                >
                  <option value="new">new</option>
                  <option value="read">read</option>
                  <option value="replied">replied</option>
                </select>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
