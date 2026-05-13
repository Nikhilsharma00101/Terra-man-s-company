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

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-terra-black text-terra-beige flex flex-col justify-between py-12 lg:py-16"
    >
      {/* Background Image - Asymmetric Placement */}
      <motion.div 
        style={{ y: yBg, opacity }}
        className="absolute top-0 right-0 w-full lg:w-2/3 h-1/2 lg:h-full z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-terra-black via-terra-black/80 to-transparent z-10 lg:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-terra-black/50 via-transparent to-terra-black z-10" />
        <Image
          src="/images/hero-bg.png"
          alt="Abstract cracked earth with molten bronze"
          fill
          className="object-cover object-center filter grayscale-[20%] contrast-125"
          priority
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 h-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-between flex-1 gap-12 lg:gap-0">
        
        {/* Top Section - Brand Tagline */}
        <div className="flex justify-between items-start pt-16 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-terra-bronze font-medium">Nº 01 / COLLECTION</span>
            <div className="w-12 h-px bg-terra-bronze/50" />
          </motion.div>
          
          {/* Coordinates - Visible on desktop, maybe smaller on mobile or hidden. Let's make it visible on mobile too but small */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs uppercase tracking-[0.2em] text-white/30"
          >
            <span>45°N, 122°W</span>
          </motion.div>
        </div>

        {/* Middle Section - Robust Layout to prevent overlap */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Side: Typography */}
          <div className="lg:col-span-8 flex flex-col justify-center w-full">
            <motion.div
              style={{ y: yText }}
              className="flex flex-col space-y-4 lg:space-y-6"
            >
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] font-serif leading-[0.9] tracking-tighter text-terra-beige"
              >
                CRAFTED
              </motion.h1>
              
              <div className="flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-8 lg:ml-[10vw]">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] font-serif leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-terra-beige to-terra-bronze"
                >
                  FOR THE
                </motion.h1>
                
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                  className="text-xs uppercase tracking-[0.3em] text-terra-bronze font-light max-w-xs leading-relaxed"
                >
                  An immersive exploration of masculine grooming, rooted in earth and future.
                </motion.span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] font-serif leading-[0.9] tracking-tighter text-terra-beige lg:ml-[5vw]"
              >
                MODERN MAN.
              </motion.h1>
            </motion.div>
          </div>

          {/* Right Side: Product Image (Separated to avoid collision) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end w-full mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
              className="relative w-[60vw] sm:w-[40vw] lg:w-full max-w-xs lg:max-w-none aspect-[3/4] z-20 pointer-events-none"
            >
              <Image
                src="/images/hero-composition.png"
                alt="Floating product composition"
                fill
                className="object-contain filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] lg:drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - CTAs & Scroll Indicator */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <a
              href="#collection"
              className="group relative flex items-center gap-4 text-terra-beige hover:text-white transition-colors"
            >
              <span className="uppercase tracking-[0.3em] text-xs font-medium">Explore Collection</span>
              <div className="w-8 h-px bg-terra-beige/50 group-hover:w-12 transition-all duration-300" />
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#about"
              className="uppercase tracking-[0.3em] text-[10px] font-medium text-white/50 hover:text-terra-beige transition-colors"
            >
              Learn More
            </a>
          </motion.div>

          {/* Minimalist Grid Overlay or Information */}
          <div className="hidden lg:grid grid-cols-2 gap-8 text-xs uppercase tracking-[0.2em] text-white/30">
            <div>
              <p className="text-terra-bronze mb-1">01 / RAW</p>
              <p>Volcanic Ash & Charcoal</p>
            </div>
            <div>
              <p className="text-terra-bronze mb-1">02 / REFINED</p>
              <p>Sandalwood & Argan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient lighting effect */}
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] bg-terra-bronze/10 rounded-full blur-[100px] pointer-events-none z-0" />
    </section>
  );
}
