"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { products } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { Plus, MoveRight } from "lucide-react";

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for background elements
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="collection"
      ref={containerRef}
      className="relative bg-[#141414] py-24 lg:py-40 overflow-hidden"
    >
      {/* Ambient background lines or grid - Lighter */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 grid grid-cols-4 lg:grid-cols-12 pointer-events-none opacity-10 z-0"
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-white/20 h-full" />
        ))}
      </motion.div>

      {/* Soft background glows to lift the darkness */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-terra-bronze/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-terra-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <span className="text-terra-bronze uppercase tracking-[0.3em] text-xs font-semibold block mb-4">
            Curated Selection
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-terra-beige leading-[0.9] tracking-tighter mb-6">
            THE<br />COLLECTION
          </h2>
          <p className="text-white/70 max-w-md text-sm md:text-base font-light leading-relaxed">
            Meticulously formulated with raw earth ingredients and refined for the modern gentleman&apos;s aesthetic.
          </p>
        </div>

        {/* Stacked Card Layout on Mobile, Bento Grid on Desktop */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Card 1: Intro / Statement (Spans 4 cols) */}
          <div className="sticky top-24 lg:relative lg:top-0 lg:col-span-4 bg-[#1C1C1C] backdrop-blur-sm p-8 lg:p-12 border border-white/10 flex flex-col justify-between min-h-[300px] lg:min-h-full hover:border-white/20 transition-colors duration-500 rounded-lg">
            <div>
              <span className="text-terra-bronze text-xs font-mono font-semibold mb-4 block">Nº 01</span>
              <h3 className="text-3xl font-serif text-terra-beige mb-4 leading-tight">The Ritual of Grounding</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Grooming is not a chore, but a transition. A moment to pause, breathe, and center yourself before action.
              </p>
            </div>
            <div className="flex items-center gap-2 text-terra-bronze text-xs uppercase tracking-widest font-semibold mt-8">
              <span>Scroll to explore</span>
              <MoveRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {/* Card 2: Product 1 - Face Wash (Spans 8 cols) */}
          <div className="sticky top-32 lg:relative lg:top-0 lg:col-span-8 group bg-[#1A1A1A] border border-white/10 overflow-hidden h-[500px] lg:h-[600px] hover:border-terra-bronze/30 transition-colors duration-500 rounded-lg flex flex-col">
            
            {/* Top Part: Image (Height 65%) */}
            <div className="relative h-[65%] flex items-center justify-center overflow-hidden">
              {/* Ambient Glow behind product */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,91,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Background Texture */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                <Image
                  src="/images/water-ripple.png"
                  alt="Water texture"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Watermark Number behind image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="text-[12rem] lg:text-[18rem] font-serif font-bold text-white/[0.02] select-none">
                  01
                </span>
              </div>

              {/* Product Image */}
              <div className="relative w-[180px] h-[220px] lg:w-[250px] lg:h-[300px] transition-transform duration-700 ease-out group-hover:scale-105 z-10">
                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  fill
                  className="object-contain filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Category Tag (Top Left) */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-terra-bronze uppercase tracking-[0.2em] text-xs font-semibold border border-terra-bronze/30 px-3 py-1 rounded-sm bg-[#141414]/80">
                  Skincare
                </span>
              </div>
              
              {/* Number Tag (Top Right) */}
              <div className="absolute top-4 right-4 z-20">
                <span className="text-white/50 text-xs font-mono font-semibold">01/02</span>
              </div>
            </div>

            {/* Bottom Part: Content (Height 35%) */}
            <div className="h-[35%] bg-[#1C1C1C] p-6 border-t border-white/10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif text-terra-beige mb-1 tracking-tight">
                    {products[0].name}
                  </h3>
                  <p className="text-white/60 text-xs font-light max-w-sm">
                    Deep cleansing with activated charcoal and volcanic ash.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
                <span className="text-lg font-serif text-terra-beige font-semibold">₹{products[0].price}</span>
                <button
                  onClick={() => addItem(products[0])}
                  className="flex items-center gap-2 bg-terra-beige text-terra-black px-4 py-2 uppercase tracking-widest text-[9px] font-semibold hover:bg-white transition-colors rounded-full"
                >
                  <span>Add</span>
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Product 2 - Beard Oil (Spans 8 cols) */}
          <div className="sticky top-40 lg:relative lg:top-0 lg:col-span-8 group bg-[#1A1A1A] border border-white/10 overflow-hidden h-[500px] lg:h-[600px] hover:border-terra-bronze/30 transition-colors duration-500 rounded-lg flex flex-col">
            
            {/* Top Part: Image (Height 65%) */}
            <div className="relative h-[65%] flex items-center justify-center overflow-hidden">
              {/* Ambient Glow behind product */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,91,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Background Texture */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <Image
                  src="/images/oil-texture.png"
                  alt="Oil texture"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Watermark Number behind image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="text-[12rem] lg:text-[18rem] font-serif font-bold text-white/[0.02] select-none">
                  02
                </span>
              </div>

              {/* Product Image */}
              <div className="relative w-[180px] h-[220px] lg:w-[250px] lg:h-[300px] transition-transform duration-700 ease-out group-hover:scale-105 z-10">
                <Image
                  src={products[1].image}
                  alt={products[1].name}
                  fill
                  className="object-contain filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Category Tag (Top Left) */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-terra-bronze uppercase tracking-[0.2em] text-xs font-semibold border border-terra-bronze/30 px-3 py-1 rounded-sm bg-[#141414]/80">
                  Grooming
                </span>
              </div>
              
              {/* Number Tag (Top Right) */}
              <div className="absolute top-4 right-4 z-20">
                <span className="text-white/50 text-xs font-mono font-semibold">02/02</span>
              </div>
            </div>

            {/* Bottom Part: Content (Height 35%) */}
            <div className="h-[35%] bg-[#1C1C1C] p-6 border-t border-white/10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif text-terra-beige mb-1 tracking-tight">
                    {products[1].name}
                  </h3>
                  <p className="text-white/60 text-xs font-light max-w-sm">
                    Softens and tames with argan oil and sandalwood.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
                <span className="text-lg font-serif text-terra-beige font-semibold">₹{products[1].price}</span>
                <button
                  onClick={() => addItem(products[1])}
                  className="flex items-center gap-2 bg-terra-beige text-terra-black px-4 py-2 uppercase tracking-widest text-[9px] font-semibold hover:bg-white transition-colors rounded-full"
                >
                  <span>Add</span>
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Detailed Info / Specs (Spans 4 cols) */}
          <div className="sticky top-48 lg:relative lg:top-0 lg:col-span-4 bg-[#1C1C1C] backdrop-blur-sm p-8 lg:p-12 border border-white/10 flex flex-col justify-between min-h-[300px] lg:min-h-full hover:border-white/20 transition-colors duration-500 rounded-lg">
            <div>
              <span className="text-terra-bronze uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
                The Details
              </span>
              <ul className="space-y-6 text-sm font-light text-white/80">
                <li className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-white/40 text-xs uppercase tracking-wider font-medium">Origin</span>
                  <span className="text-terra-beige">Earthly Sources</span>
                </li>
                <li className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-white/40 text-xs uppercase tracking-wider font-medium">Formulation</span>
                  <span className="text-terra-beige">Paraben Free</span>
                </li>
                <li className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-white/40 text-xs uppercase tracking-wider font-medium">Packaging</span>
                  <span className="text-terra-beige">Recyclable Glass</span>
                </li>
              </ul>
            </div>

            <div className="mt-auto">
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Every element is selected for its grounding properties and efficacy. Refined for the discerning man.
              </p>
            </div>
          </div>

        </div>



      </div>
    </section>
  );
}
