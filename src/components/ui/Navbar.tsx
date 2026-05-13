"use client";

import { useCart } from "@/components/CartProvider";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const { items, setIsOpen } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* 
        FLOATING MODULAR ISLANDS NAVBAR
        A highly unique layout using floating glass pills.
      */}
      <div className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 flex justify-between items-center pointer-events-none">

        {/* Left Island: Logo */}
        <div className="bg-[#1C1C1C]/90 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full flex items-center justify-center pointer-events-auto hover:border-white/20 transition-colors">
          <Link href="/" className="hover:opacity-80 transition-opacity block">
            <Image
              src="/images/logo-new.png"
              alt="Terra Logo"
              width={240}
              height={80}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center Island: Navigation Links (Desktop Only) */}
        {!isMobile && (
          <div className="bg-[#1C1C1C]/90 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full flex items-center justify-center gap-8 text-xs uppercase tracking-[0.3em] font-medium text-white/70 pointer-events-auto">
            <Link href="/#collection" className="hover:text-terra-beige hover:tracking-[0.35em] transition-all duration-300">
              Collection
            </Link>
            <Link href="/#about" className="hover:text-terra-beige hover:tracking-[0.35em] transition-all duration-300">
              Philosophy
            </Link>
            <Link href="/contact" className="hover:text-terra-beige hover:tracking-[0.35em] transition-all duration-300">
              Contact
            </Link>
          </div>
        )}

        {/* Right Island: Cart & Menu (Mobile) */}
        <div className="bg-[#1C1C1C]/90 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center justify-center gap-4 pointer-events-auto hover:border-white/20 transition-colors">
          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative text-white/70 hover:text-terra-beige transition-colors flex items-center gap-2 group"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="bg-terra-bronze text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
            <span className="hidden md:inline text-xs uppercase tracking-[0.2em] font-medium ml-1">Cart</span>
          </button>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/70 hover:text-terra-beige transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>

      </div>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-terra-black/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-10 text-2xl font-serif text-terra-beige">
              <Link
                href="/#collection"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors tracking-wide"
              >
                Collection
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors tracking-wide"
              >
                Our Philosophy
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-white transition-colors tracking-wide"
              >
                Contact
              </Link>
            </nav>

            {/* Decorative Grid in Menu */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/10" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
