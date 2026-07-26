"use client";

import { useWishlist } from "@/components/WishlistProvider";
import { useCart } from "@/components/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function WishlistDrawer() {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem, setIsOpen: setIsCartOpen } = useCart();

  const handleMoveToCart = (product: (typeof wishlistItems)[0]) => {
    addItem(product);
    removeFromWishlist(product.id);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-[#0c0c0e] border-l border-white/10 z-50 flex flex-col justify-between shadow-2xl font-sans text-[#f4f0ea]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121215]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terra-bronze/20 border border-terra-bronze/40 flex items-center justify-center text-terra-gold">
                  <Heart className="w-5 h-5 fill-terra-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-white font-medium">Saved Wishlist</h2>
                  <p className="text-xs text-white/60 font-mono">
                    {wishlistItems.length} Saved {wishlistItems.length === 1 ? "Item" : "Items"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {wishlistItems.length > 0 && (
                  <button
                    onClick={clearWishlist}
                    className="text-xs text-white/50 hover:text-rose-400 font-mono transition-colors mr-2 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">Your wishlist is empty</h3>
                  <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                    Save your favorite ritual products while exploring the collection to view or purchase them later.
                  </p>
                  <Link
                    href="/#collection"
                    onClick={() => setIsWishlistOpen(false)}
                    className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 transition-all cursor-pointer font-mono"
                  >
                    <Sparkles className="w-4 h-4" /> Explore Collection
                  </Link>
                </div>
              ) : (
                wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#121215] border border-white/10 hover:border-terra-bronze/40 p-4 rounded-2xl flex gap-4 items-center justify-between transition-colors shadow-lg group"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-24 bg-[#18181c] rounded-xl overflow-hidden flex-shrink-0 border border-white/10 flex items-center justify-center p-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] uppercase font-mono text-terra-gold tracking-widest block font-semibold">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-lg text-white font-medium leading-tight">{product.name}</h4>
                      <div className="text-base font-mono font-bold text-terra-beige">₹{product.price}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 items-end">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-bold text-xs rounded-xl hover:brightness-110 transition-all cursor-pointer shadow-md font-mono"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Cart
                      </button>

                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-1.5 text-white/40 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#121215] space-y-3">
                <button
                  onClick={() => {
                    wishlistItems.forEach((product) => addItem(product));
                    clearWishlist();
                    setIsWishlistOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-bold text-xs tracking-wider uppercase rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl font-mono"
                >
                  <ShoppingBag className="w-4 h-4" /> Move All Items to Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
