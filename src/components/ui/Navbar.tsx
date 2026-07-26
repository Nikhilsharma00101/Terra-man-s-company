"use client";

import { useCart } from "@/components/CartProvider";
import { useAuth } from "@/components/AuthProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { useState, useEffect } from "react";
import { ShoppingBag, User as UserIcon, LogOut, ShieldCheck, Heart, X, Sparkles, ArrowRight, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { Tooltip } from "@/components/ui/Tooltip";

export function Navbar() {
  const { items, setIsOpen: setIsCartOpen } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [time, setTime] = useState("");

  // Scroll & Instant Flash states for Mobile Quick Dock
  const [isSubBarVisible, setIsSubBarVisible] = useState(true);
  const [isFlashed, setIsFlashed] = useState(false);

  // Real-time Clock effect
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Europe/Rome",
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth, throttled scroll listener for mobile sub-dock
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentY = window.scrollY;

      // Always show near top of page
      if (currentY < 80) {
        setIsSubBarVisible(true);
      } else {
        const diff = currentY - lastY;
        // Require at least 10px scroll delta to prevent micro-jitter distortion
        if (diff > 10) {
          setIsSubBarVisible(false);
        } else if (diff < -10) {
          setIsSubBarVisible(true);
        }
      }
      lastY = currentY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Trigger instant flash appearance on mobile whenever item count changes
  useEffect(() => {
    if (cartItemCount > 0 || wishlistCount > 0) {
      setIsSubBarVisible(true);
      setIsFlashed(true);
      const timer = setTimeout(() => {
        setIsFlashed(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount, wishlistCount]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/#collection", label: "The Collection", num: "01", desc: "Crafted grooming essentials" },
    { href: "/#about", label: "Our Philosophy", num: "02", desc: "Earth-derived formulation ethos" },
    { href: "/contact", label: "Contact Us", num: "03", desc: "Inquiries & store locator" },
  ];

  {/* HAUTE-LUXURY EXECUTIVE CONTROL CAPSULE (Account + Wishlist + Cart) */}
  const renderQuickDockStrip = (isMobileDock = false) => (
    <div
      className={`relative p-1 bg-[#0c0c0e]/95 backdrop-blur-2xl border rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] transition-all duration-500 flex items-center ${
        isMobileDock
          ? isFlashed
            ? "border-terra-gold shadow-[0_0_25px_rgba(212,163,89,0.45)] scale-105"
            : "border-terra-bronze/35 hover:border-terra-gold/50"
          : "border-white/15 hover:border-terra-gold/50 shadow-2xl"
      }`}
    >
      {/* Subtle Background Radial Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-terra-bronze/10 via-transparent to-terra-gold/10 rounded-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-1">
        {/* 1. MEMBER ACCOUNT TILE */}
        {user ? (
          <div className="relative">
            <Tooltip content="Member Dossier" position="bottom">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#1c1c22] to-[#121215] border border-terra-bronze/40 hover:border-terra-gold text-terra-gold flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md group active:scale-95"
              >
                <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-br from-terra-bronze to-terra-gold text-black flex items-center justify-center text-xs font-mono font-extrabold shadow-sm">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </button>
            </Tooltip>

            {/* Account Dropdown */}
            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-56 bg-[#101013] border border-terra-bronze/40 rounded-2xl p-3 shadow-2xl z-50 text-xs font-sans space-y-1.5 backdrop-blur-2xl"
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-[10px] text-terra-gold uppercase tracking-widest font-mono font-bold">MEMBER DOSSIER</p>
                    <p className="text-white font-medium truncate mt-0.5">{user.email}</p>
                  </div>

                  {(user.email.toLowerCase() === "nikhil18981@gmail.com" || user.role === "admin") && (
                    <Link
                      href="/admin"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-terra-gold hover:bg-terra-bronze/20 rounded-xl transition-colors font-medium cursor-pointer border border-terra-bronze/40 bg-terra-bronze/10"
                    >
                      <ShieldCheck className="w-4 h-4 text-terra-gold" /> Admin Portal
                    </Link>
                  )}

                  <Link
                    href="/account"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-terra-bronze" /> Account & Orders
                  </Link>

                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors text-left cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Tooltip content="Sign In / Register" position="bottom">
            <button
              onClick={() => openAuthModal()}
              className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#1c1c22] to-[#121215] border border-white/10 hover:border-terra-gold text-white/80 hover:text-terra-gold flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md group active:scale-95"
            >
              <UserIcon className="w-4.5 h-4.5 text-terra-gold group-hover:scale-110 transition-transform" />
            </button>
          </Tooltip>
        )}

        {/* Tactical Separator Dot */}
        <div className="w-1 h-1 rounded-full bg-terra-bronze/40 mx-0.5" />

        {/* 2. SAVED WISHLIST TILE */}
        <Tooltip content={wishlistCount > 0 ? `${wishlistCount} Saved Essentials` : "Saved Wishlist"} position="bottom">
          <button
            onClick={() => {
              setIsWishlistOpen(true);
              setIsMenuOpen(false);
            }}
            className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#1c1c22] to-[#121215] border border-white/10 hover:border-terra-gold flex items-center justify-center relative transition-all duration-300 cursor-pointer shadow-md group active:scale-95"
          >
            <Heart
              className={`w-4.5 h-4.5 transition-all duration-300 ${
                wishlistCount > 0
                  ? "fill-terra-gold text-terra-gold filter drop-shadow-[0_0_8px_rgba(212,163,89,0.6)]"
                  : "text-white/70 group-hover:text-terra-gold group-hover:scale-110"
              }`}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-black text-[10px] font-mono font-extrabold h-4 min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-lg border border-black/50 animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>
        </Tooltip>

        {/* Tactical Separator Dot */}
        <div className="w-1 h-1 rounded-full bg-terra-bronze/40 mx-0.5" />

        {/* 3. SHOPPING BAG CART TILE */}
        <Tooltip content={cartItemCount > 0 ? `${cartItemCount} Items in Cart` : "Shopping Cart"} position="bottom">
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsMenuOpen(false);
            }}
            className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#1c1c22] to-[#121215] border border-white/10 hover:border-terra-gold flex items-center justify-center relative transition-all duration-300 cursor-pointer shadow-md group active:scale-95"
          >
            <ShoppingBag
              className={`w-4.5 h-4.5 transition-all duration-300 ${
                cartItemCount > 0
                  ? "text-terra-gold font-bold filter drop-shadow-[0_0_8px_rgba(212,163,89,0.6)]"
                  : "text-white/70 group-hover:text-terra-gold group-hover:scale-110"
              }`}
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-terra-gold to-amber-500 text-black text-[10px] font-mono font-extrabold h-4 min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-lg border border-black/50">
                {cartItemCount}
              </span>
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <>
      {/* Top Announcement Micro Banner */}
      <div className="bg-[#08080a] border-b border-white/5 py-2 px-4 text-center select-none relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-terra-gold">
          <Sparkles className="w-3 h-3 text-terra-gold animate-pulse hidden sm:inline" />
          <span>Because Men Deserve Better</span>
          <span className="text-white/30">|</span>
          <span className="text-white/70">Free Shipping on Orders Over ₹1,500</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0c]/90 backdrop-blur-2xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="block" onClick={() => setIsMenuOpen(false)}>
              <BrandLogo />
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop Only) */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] font-medium text-white/70 hover:text-terra-gold transition-colors relative py-1 group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terra-bronze transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            
            {/* Desktop Unified Quick-Dock Strip (lg:block) */}
            <div className="hidden lg:block">
              {renderQuickDockStrip(false)}
            </div>

            {/* Mobile Menu Toggle Button (lg:hidden) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-2xl bg-[#141417] border border-white/15 hover:border-terra-gold/50 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md group"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-terra-gold" />
              ) : (
                <div className="w-4 h-3.5 flex flex-col justify-between items-end">
                  <span className="w-full h-[1.5px] bg-white group-hover:bg-terra-gold transition-colors duration-300 rounded-full" />
                  <span className="w-2/3 h-[1.5px] bg-terra-gold transition-colors duration-300 rounded-full" />
                  <span className="w-full h-[1.5px] bg-white group-hover:bg-terra-gold transition-colors duration-300 rounded-full" />
                </div>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE-ONLY FLOATING QUICK-DOCK STRIP (lg:hidden) */}
      <div
        className={`fixed top-[116px] sm:top-[128px] right-4 sm:right-6 z-50 lg:hidden transition-all duration-300 ease-out will-change-transform ${
          (isSubBarVisible || isFlashed) && !isMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
            : "-translate-y-6 opacity-0 pointer-events-none scale-95"
        }`}
      >
        {renderQuickDockStrip(true)}
      </div>

      {/* 
        REVAMPED EXECUTIVE MOBILE FULL-SCREEN NAVIGATION PORTAL
        High-depth z-60 overlay with luxury typography & member cards
      */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#08080a] z-60 flex flex-col justify-between p-6 sm:p-10 font-sans overflow-hidden select-none"
          >
            {/* Background Ambient Glows & Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,154,108,0.12),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.06),transparent_50%)] pointer-events-none" />

            {/* Header inside Portal */}
            <div className="flex justify-between items-center relative z-10 border-b border-white/10 pb-5">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <BrandLogo />
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-terra-gold hover:text-white transition-all cursor-pointer font-mono text-xs uppercase tracking-widest"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Middle Main Content Grid */}
            <div className="flex-1 my-auto py-8 relative z-10 flex flex-col justify-center max-w-xl mx-auto w-full space-y-8">
              
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-terra-gold tracking-[0.3em] font-semibold block">
                  EXPLORE DESTINATIONS
                </span>
                <p className="text-xs text-white/50 font-serif italic">Meticulous formulations for the modern ritual.</p>
              </div>

              {/* Navigation List */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-[#121215]/80 border border-white/10 hover:border-terra-gold/50 transition-all cursor-pointer shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-terra-gold font-extrabold">{link.num}</span>
                        <div>
                          <h3 className="font-serif text-2xl sm:text-3xl text-terra-beige group-hover:text-white transition-colors leading-none">
                            {link.label}
                          </h3>
                          <p className="text-[11px] text-white/50 font-sans mt-1 font-light">{link.desc}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-terra-gold group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Member Quick Status Card */}
              {user ? (
                <div className="bg-gradient-to-r from-terra-bronze/20 to-terra-gold/10 border border-terra-bronze/40 p-4 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono text-terra-gold tracking-wider block font-semibold">
                      AUTHENTICATED MEMBER
                    </span>
                    <p className="text-sm font-serif text-white truncate max-w-[200px]">{user.email}</p>
                  </div>
                  <Link
                    href={user.email.toLowerCase() === "nikhil18981@gmail.com" || user.role === "admin" ? "/admin" : "/account"}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3.5 py-2 bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-mono font-bold text-xs uppercase rounded-xl hover:brightness-110 transition-all"
                  >
                    {user.email.toLowerCase() === "nikhil18981@gmail.com" || user.role === "admin" ? "Admin" : "Account"}
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-bold text-xs tracking-wider uppercase rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl font-mono"
                >
                  <UserIcon className="w-4 h-4" /> Member Sign In / Access Dossier
                </button>
              )}
            </div>

            {/* Footer Bar inside Portal */}
            <div className="relative z-10 border-t border-white/10 pt-5 flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50">
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-terra-gold" />
                <span>GMT+1 {time || "00:00:00"}</span>
              </div>
              <span className="text-terra-gold">TERRA MAN&apos;S CO.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
