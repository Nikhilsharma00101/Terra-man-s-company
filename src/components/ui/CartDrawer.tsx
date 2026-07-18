"use client";

import { useCart } from "@/components/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, cartTotal } = useCart();

  const sidebarVariants = {
    closed: { x: "100%", transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 15 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Drawer Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 h-full w-full sm:w-[460px] bg-black/90 backdrop-blur-xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50 flex flex-col overflow-hidden text-terra-beige font-sans"
          >
            {/* HUD Corner Brackets */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-terra-bronze/40 pointer-events-none" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-terra-bronze/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-terra-bronze/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-terra-bronze/40 pointer-events-none" />

            {/* Fine framing border inset */}
            <div className="absolute top-4 bottom-4 left-4 right-4 border border-white/5 pointer-events-none z-0" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/40">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-terra-bronze font-semibold mb-0.5">BAG INDEX</span>
                <h2 className="text-xl font-serif text-white tracking-tight flex items-center gap-2.5">
                  <ShoppingBag className="w-4.5 h-4.5 text-terra-gold" />
                  Your Rituals
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="group p-2 border border-white/10 hover:border-white/30 rounded-sm transition-all duration-300 text-white/50 hover:text-white bg-white/5"
                aria-label="Close cart"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>

            {/* Scrollable Items Panel */}
            <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 select-none">
                  <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center bg-white/5 text-terra-bronze relative mb-2">
                    <ShoppingBag className="w-6 h-6 opacity-60" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-terra-gold rounded-full blur-[2px] animate-pulse" />
                  </div>
                  <h3 className="font-serif text-white text-lg">Your bag is empty</h3>
                  <p className="text-white/40 text-xs max-w-[240px] leading-relaxed">
                    Select high-performance essentials from our collections to start your ritual.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-2 text-xs uppercase tracking-widest text-terra-gold hover:text-white transition-colors border-b border-terra-gold/30 pb-0.5"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="group relative flex gap-5 bg-[#121212] border border-white/5 p-4 rounded-sm transition-all duration-300 hover:border-white/10 shadow-md"
                    >
                      {/* Item index */}
                      <span className="absolute top-2 right-3 text-[9px] font-mono text-white/20 select-none">
                        [0{index + 1}]
                      </span>

                      {/* Product Image Frame */}
                      <div className="relative w-20 h-24 bg-black rounded-sm overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-terra-bronze/30 transition-colors">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>

                      {/* Product Specs / Control */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-white text-base leading-tight group-hover:text-terra-gold transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-terra-beige/60 text-xs mt-1.5 font-mono">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Selector HUD style */}
                          <div className="flex items-center border border-white/10 rounded-sm bg-black/40 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all rounded-sm"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-xs font-mono w-6 text-center text-white font-medium select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all rounded-sm"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* Remove Trigger */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-[11px] font-mono text-white/30 hover:text-red-400/90 transition-colors py-1 group/remove"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3 h-3 text-white/20 group-hover/remove:text-red-400/90 transition-colors" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer Summary Drawer */}
            {items.length > 0 && (
              <div className="relative z-10 p-8 border-t border-white/5 bg-black/60 backdrop-blur-md">
                <div className="space-y-4 mb-8">
                  {/* Dotted HUD Summary Info */}
                  <div className="flex justify-between items-center text-xs font-mono text-white/40">
                    <span>SHIPPING</span>
                    <div className="flex-1 border-b border-dashed border-white/10 mx-3" />
                    <span className="text-white/80">CALCULATED AT CHECKOUT</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-terra-beige">
                    <span className="text-sm tracking-wider uppercase font-semibold text-white/70">TOTAL DUE</span>
                    <div className="flex-1 border-b border-dashed border-white/15 mx-3" />
                    <span className="font-serif text-2xl text-white tracking-tight">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Link 
                  href="/checkout" 
                  onClick={() => setIsOpen(false)}
                  className="w-full relative flex items-center justify-center gap-3 border border-terra-bronze/35 group/btn cursor-pointer bg-transparent overflow-hidden rounded-sm transition-all duration-300 hover:text-terra-black"
                >
                  <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover/btn:translate-x-0 transition-transform duration-400 ease-out z-0" />
                  <span className="relative z-10 py-4 uppercase tracking-[0.25em] text-xs font-semibold">
                    Proceed to Checkout
                  </span>
                </Link>
                
                <p className="text-[10px] text-center text-white/30 font-mono mt-4 uppercase tracking-widest">
                  Checkout // Powered by Terra
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
