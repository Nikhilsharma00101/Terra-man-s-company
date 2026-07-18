"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth parallax scroll effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0c0c0c] text-terra-beige flex flex-col justify-between py-12 lg:py-16"
    >
      {/* Background Image Layer with Dark Vignette for High Readability */}
      <motion.div 
        style={{ y: yBg, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10 lg:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 z-10" />
        <Image
          src="/images/hero-bg.png"
          alt="Abstract cracked earth background"
          fill
          className="object-cover object-center filter grayscale-[20%] contrast-110 brightness-[0.7]"
          priority
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-between flex-1 gap-16 lg:gap-0">
        
        {/* Top Header Row (Metadata) */}
        <div className="flex items-center pt-8 lg:pt-10 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3.5"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-terra-bronze font-bold">TERRA MAN&apos;S CO.</span>
            <div className="w-8 h-px bg-terra-bronze/40" />
          </motion.div>
        </div>

        {/* Middle Section: Clean 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto relative z-20">
          
          {/* LEFT SIDE: Typography & CTA (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-center w-full">
            <motion.div
              style={{ y: yText }}
              className="flex flex-col space-y-5 lg:space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.3em] text-terra-bronze font-semibold">Nº 01 / ESSENTIALS</span>
                <div className="w-10 h-px bg-terra-bronze/40" />
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white leading-[1.05] tracking-tight">
                Raw Earth.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-beige via-terra-gold to-terra-bronze">
                  Refined Care.
                </span>
              </h1>
              
              <p className="text-white/80 text-sm sm:text-base font-light max-w-md leading-relaxed font-sans pb-4">
                Formulated with active volcanic minerals and rich botanical oils. High-performance grooming products designed for the modern gentleman&apos;s aesthetic.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pt-2">
                <a
                  href="#collection"
                  className="group relative flex items-center justify-center gap-4 border border-terra-bronze/35 px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] text-terra-beige hover:text-terra-black bg-transparent overflow-hidden rounded-sm transition-colors duration-300"
                >
                  <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Collection <MoveRight className="w-3.5 h-3.5" />
                  </span>
                </a>
                <a
                  href="#about"
                  className="uppercase tracking-[0.2em] text-[10px] font-semibold text-white/50 hover:text-terra-beige transition-colors py-2 px-1 focus:outline-none"
                >
                  Our Story
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Floating Showcase Chamber (6 Columns) */}
          <div className="lg:col-span-6 flex justify-center items-center relative h-[300px] lg:h-[500px] w-full">
            
            {/* Concentric rotating SVG dial */}
            <div className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none opacity-20">
              <svg className="w-[280px] h-[280px] lg:w-[440px] lg:h-[440px] animate-spin-slow-cw origin-center" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="85" fill="none" stroke="var(--color-terra-bronze)" strokeWidth="0.4" strokeDasharray="3 8" />
                <circle cx="100" cy="100" r="92" fill="none" stroke="var(--color-terra-gold)" strokeWidth="0.6" strokeDasharray="25 6 3 6" />
              </svg>
            </div>

            {/* Slowly Floating Product Composition */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-[180px] h-[240px] lg:w-[260px] lg:h-[350px] z-10 pointer-events-none"
            >
              <Image
                src="/images/hero-composition.png"
                alt="Floating premium product bottles composition"
                fill
                className="object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)]"
                priority
              />
            </motion.div>
          </div>

        </div>

        {/* Bottom Section (Pillars footer) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 lg:pb-0 select-none border-t border-white/5 pt-6">
          <div className="font-sans text-[11px] text-white/50 tracking-wider">
            <span>NATURAL SOURCING // SCIENTIFIC PRECISION</span>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
            <div>
              <p className="text-terra-bronze mb-0.5">01 / DEEP PURGING</p>
              <p>Charcoal & Volcanic Ash</p>
            </div>
            <div>
              <p className="text-terra-bronze mb-0.5">02 / MEDITATIVE HYDRATION</p>
              <p>Sandalwood & Argan Oil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
