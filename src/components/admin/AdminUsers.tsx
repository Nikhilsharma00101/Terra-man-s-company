"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Loader2 } from "lucide-react";

export interface AdminUserItem {
  id: string;
  email: string;
  name: string;
  role: string;
  totalOrders: number;
  lastLoginAt?: string;
  createdAt?: string;
}

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/users", window.location.origin);
      if (searchQuery) url.searchParams.set("search", searchQuery);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      } else {
        alert(data.error || "Failed to update user role.");
      }
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#f4f0ea]">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 bg-[#121215] border border-white/10 p-6 md:p-7 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-2.5 font-medium">
            <Users className="w-6 h-6 text-terra-gold" /> Registered User Accounts
          </h2>
          <p className="text-sm text-white/70 mt-1">Manage customer profiles and system privileges</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search email or name..."
            className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none shadow-inner"
          />
          <Search className="w-4.5 h-4.5 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#121215] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-14 text-center text-sm text-white/60 flex items-center justify-center gap-2.5">
            <Loader2 className="w-5 h-5 animate-spin text-terra-gold" /> Loading user directory...
          </div>
        ) : users.length === 0 ? (
          <div className="p-14 text-center text-sm text-white/60">No registered user accounts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/60 font-mono uppercase tracking-wider text-xs bg-white/[0.03]">
                  <th className="py-4 px-5">User</th>
                  <th className="py-4 px-5">Role</th>
                  <th className="py-4 px-5">Total Orders</th>
                  <th className="py-4 px-5">Last Login</th>
                  <th className="py-4 px-5">Joined Date</th>
                  <th className="py-4 px-5 text-right">Role Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => {
                  const isPrimaryDevAdmin = u.email.toLowerCase() === "nikhil18981@gmail.com";
                  return (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-full bg-terra-bronze/30 border border-terra-bronze/50 flex items-center justify-center text-terra-gold font-bold text-sm">
                            {u.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-base flex items-center gap-2">
                              {u.name || u.email.split("@")[0]}
                              {isPrimaryDevAdmin && (
                                <span className="bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs px-2 py-0.5 rounded font-mono uppercase font-bold">
                                  Primary Admin
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono text-white/60">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-3 py-1 rounded-full border text-xs uppercase font-mono tracking-wider font-semibold ${
                            u.role === "admin"
                              ? "bg-terra-bronze/25 border-terra-bronze text-terra-gold"
                              : "bg-white/10 border-white/20 text-white/80"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-mono text-white font-bold text-base">{u.totalOrders} Orders</td>
                      <td className="py-4 px-5 text-white/70 font-mono text-xs">
                        {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-4 px-5 text-white/70 font-mono text-xs">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-4 px-5 text-right">
                        {isPrimaryDevAdmin ? (
                          <span className="text-xs text-white/50 italic font-mono font-medium">Protected Admin</span>
                        ) : (
                          <select
                            value={u.role}
                            disabled={updatingId === u.id}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-3 py-1.5 text-xs font-mono text-white font-semibold focus:outline-none cursor-pointer"
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
