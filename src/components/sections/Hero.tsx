"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MoveRight, ShoppingBag, Check, Sparkles, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { products, Product } from "@/lib/data";
import { useCart } from "@/components/CartProvider";

export function Hero() {
  const { addItem, setIsOpen: setIsCartOpen } = useCart();
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(1); // Default to Beard Oil (index 1)
  const [addedItem, setAddedItem] = useState(false);

  const activeProduct: Product = products[selectedProductIndex] || products[0];

  const handleAddToCart = () => {
    addItem(activeProduct);
    setAddedItem(true);
    setTimeout(() => {
      setAddedItem(false);
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full bg-[#0c0c0c] text-terra-beige flex flex-col justify-between pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden">
      {/* Soft Ambient Radial Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-terra-bronze/10 blur-[130px] rounded-full" />
        <Image
          src="/images/hero-bg.png"
          alt="Terra background texture"
          fill
          className="object-cover object-center opacity-30 filter grayscale-[20%] brightness-[0.5]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0c0c0c]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1300px] w-full mx-auto px-6 md:px-12 flex flex-col justify-between flex-1 gap-12 lg:gap-16">
        
        {/* Editorial Top Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-terra-gold font-bold flex items-center gap-1.5 px-3 py-1 rounded-full bg-terra-gold/10 border border-terra-gold/20">
                <Sparkles className="w-3 h-3" /> TERRA MAN&apos;S CO.
              </span>
              <div className="w-10 h-px bg-terra-bronze/40" />
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white leading-[1.05] tracking-tight font-normal">
              Raw Earth.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-beige via-terra-gold to-terra-bronze">
                Refined Care.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed font-sans">
              Formulated with natural botanical oils and active minerals. High-performance grooming essentials crafted for balance, nourishment, and effortless daily care.
            </p>

            <div className="flex items-center gap-4 pt-1">
              <a
                href="#collection"
                className="group relative inline-flex items-center gap-3 border border-terra-bronze/40 px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-terra-beige hover:text-terra-black overflow-hidden rounded-sm transition-colors duration-300"
              >
                <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Collection <MoveRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Hero Interactive Feature Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto pt-4">
          
          {/* Product Switcher & Details (Left Column - 6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-6">
            
            {/* Product Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 max-w-fit">
              {products.map((prod, idx) => {
                const isActive = selectedProductIndex === idx;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-terra-gold text-terra-black font-bold shadow-md"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    0{idx + 1} {prod.category}
                  </button>
                );
              })}
            </div>

            {/* Selected Product Information */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs uppercase font-mono tracking-[0.2em] text-terra-bronze font-semibold block mb-1">
                    FLAGSHIP FORMULATION
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                    {activeProduct.name}
                  </h2>
                </div>

                <p className="text-white/80 text-sm font-light leading-relaxed">
                  {activeProduct.description}
                </p>

                {/* Key Active Ingredients */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-terra-gold block mb-2 font-semibold">
                    KEY BOTANICALS & ACTIVES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[11px] text-white/80 font-sans"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={addedItem}
                    className="flex items-center gap-3 bg-terra-beige hover:bg-white text-terra-black font-mono font-bold text-xs uppercase tracking-[0.2em] py-3.5 px-7 rounded-sm transition-all duration-300 shadow-lg"
                  >
                    {addedItem ? (
                      <>
                        <Check className="w-4 h-4 text-terra-black" />
                        <span>ADDED TO CART ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-terra-black" />
                        <span>ADD TO CART • ₹{activeProduct.price}</span>
                      </>
                    )}
                  </button>

                  <a
                    href="#collection"
                    className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-terra-gold transition-colors py-2 px-1"
                  >
                    View Full Details &rarr;
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Clean Product Visual Card (Right Column - 6 Cols) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[380px] h-[380px] lg:h-[440px] rounded-2xl bg-[#141414] border border-white/10 p-8 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              
              {/* Card Header Tag */}
              <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-terra-bronze uppercase border-b border-white/10 pb-3">
                <span>{activeProduct.category}</span>
                <span className="text-white/50">TERRA FORMULATION</span>
              </div>

              {/* Product Bottle Image */}
              <div className="relative w-full h-[240px] lg:h-[280px] my-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      fill
                      className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card Footer */}
              <div className="w-full flex justify-between items-center text-xs font-mono text-white/80 border-t border-white/10 pt-3">
                <span className="truncate max-w-[200px] font-serif">{activeProduct.name}</span>
                <span className="text-terra-gold font-bold">₹{activeProduct.price}</span>
              </div>

            </div>
          </div>

        </div>

        {/* Clean Bottom Quality Guarantee Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-wider text-white/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-terra-gold" />
            <span>100% SULFATE, PARABEN & CRUELTY FREE</span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <span>NATURAL BOTANICAL INGREDIENTS</span>
            <span>•</span>
            <span>DERMATOLOGICALLY TESTED</span>
          </div>

          <div>
            <span>FAST EXPRESS SHIPPING</span>
          </div>
        </div>

      </div>
    </section>
  );
}
