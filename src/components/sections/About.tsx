"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: dividerScroll } = useScroll({
    target: dividerRef,
    offset: ["start end", "center center"]
  });

  // Smooth parallax for the image
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Scroll animations for the partition divider
  const lineWidth = useTransform(dividerScroll, [0.1, 0.95], ["0%", "100%"]);
  const labelOpacity = useTransform(dividerScroll, [0.7, 0.95], [0, 1]);

  return (
    <section id="about" ref={containerRef} className="pt-12 lg:pt-16 pb-24 lg:pb-40 bg-[#0c0c0c] relative overflow-hidden border-b border-white/5">
      {/* Scroll-Animated Divider Partition */}
      <div ref={dividerRef} className="w-full relative h-[40px] flex items-center justify-center pointer-events-none mb-10 lg:mb-14">
        {/* Underlay Line */}
        <div className="absolute inset-x-0 h-px bg-white/5" />
        
        {/* Animated Golden Drawing Line */}
        <motion.div 
          style={{ width: lineWidth }}
          className="absolute h-px bg-gradient-to-r from-transparent via-terra-bronze to-transparent left-1/2 -translate-x-1/2" 
        />
        
        {/* Floating Brand Stamp */}
        <motion.div
          style={{ opacity: labelOpacity }}
          className="relative bg-[#0c0c0c] px-6 py-1.5 border border-white/5 rounded-full flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-terra-gold animate-pulse" />
          <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-terra-beige whitespace-nowrap">
            EST. TERRA MAN &amp; CO.
          </span>
        </motion.div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-terra-bronze/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: Gallery Image & Caption (5 cols) */}
          <div className="lg:col-span-5 w-full space-y-6">
            <div className="relative h-[50vh] lg:h-[70vh] w-full rounded-lg overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Luxury gold border overlays */}
              <div className="absolute top-4 bottom-4 left-4 right-4 border border-terra-bronze/10 pointer-events-none z-20" />
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-terra-bronze/30 pointer-events-none z-20" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-terra-bronze/30 pointer-events-none z-20" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-terra-bronze/30 pointer-events-none z-20" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-terra-bronze/30 pointer-events-none z-20" />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0c0c]/80 z-10" />
              
              <motion.div 
                style={{ y: yImage }}
                className="relative w-full h-[120%] -top-[10%] overflow-hidden"
              >
                <Image
                  src="/images/about-bg.png"
                  alt="Textured earth showing deep layers of minerals"
                  fill
                  className="object-cover filter contrast-110 grayscale-[10%]"
                  priority
                />
              </motion.div>
            </div>
            
            {/* Elegant Sub-caption */}
            <p className="text-white/80 text-sm md:text-base font-light leading-relaxed font-sans border-l-2 border-terra-bronze pl-4">
              Sourced from the earth, formulated with scientific precision. Every drop is crafted to respect your skin&apos;s natural balance.
            </p>
          </div>

          {/* RIGHT COLUMN: Philosophy Story & Pillars (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-10">
            <div>
              <span className="text-terra-bronze uppercase tracking-[0.25em] text-xs font-semibold block mb-4">
                Our Philosophy
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
                Quiet confidence, rooted in nature.
              </h2>

              {/* Brand Tagline Manifesto Box */}
              <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-[#161619] via-[#121215] to-[#161619] border border-terra-gold/30 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-terra-gold/5 rounded-full blur-2xl pointer-events-none" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-terra-gold font-bold block mb-2">
                  OUR ESSENTIAL BELIEF
                </span>
                <blockquote className="font-serif text-2xl md:text-3xl text-terra-beige font-medium italic leading-snug">
                  &ldquo;Because men deserve better.&rdquo;
                </blockquote>
                <p className="text-xs text-white/60 font-sans mt-2 font-light">
                  Uncompromising formulations engineered for real results without unnecessary synthetics.
                </p>
              </div>
              
              <p className="text-white/95 text-base md:text-lg font-light leading-relaxed mb-10 font-sans">
                We believe that grooming is not a chore, but an intentional ritual. An act of pause to ground yourself and face the world with calm, focused energy.
              </p>

              {/* Core Pillars List - High Contrast and Legible */}
              <div className="space-y-8 border-t border-white/10 pt-8">
                
                {/* Pillar 1 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                  <div className="md:col-span-3 font-mono text-sm font-bold text-terra-bronze uppercase tracking-widest flex items-center md:items-start gap-2">
                    <span>01 / PURITY</span>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-white/90 text-sm md:text-base font-light leading-relaxed font-sans">
                      We formulate using clean, active organic ingredients. Absolutely free of parabens, synthetic colorants, sulfates, or artificial fragrances. Safe, honest skincare for men.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                  <div className="md:col-span-3 font-mono text-sm font-bold text-terra-bronze uppercase tracking-widest flex items-center md:items-start gap-2">
                    <span>02 / RITUAL</span>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-white/90 text-sm md:text-base font-light leading-relaxed font-sans">
                      Grooming should be a moment to center yourself. Our products provide sensory markers in your daily schedule, offering a clean transition from action to rest.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                  <div className="md:col-span-3 font-mono text-sm font-bold text-terra-bronze uppercase tracking-widest flex items-center md:items-start gap-2">
                    <span>03 / DESIGN</span>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-white/90 text-sm md:text-base font-light leading-relaxed font-sans">
                      We house our active formulas in simple, recyclable glass containers. Minimal styling designed to look refined on your bathroom shelf while preserving ingredient potency.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
