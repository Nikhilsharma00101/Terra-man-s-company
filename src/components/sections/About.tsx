"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for different layers
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="about" ref={containerRef} className="py-40 bg-terra-black relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Massive Background Text (Asymmetric) */}
        <span className="absolute -top-10 left-10 text-[20vw] font-serif text-white/5 leading-none select-none pointer-events-none">
          MANIFESTO
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Side: Large Tall Image with Overlap */}
          <div className="lg:col-span-5 relative h-[60vh] lg:h-[80vh] w-full">
            <motion.div 
              style={{ y: yImage }}
              className="relative w-full h-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-terra-black/20 via-transparent to-terra-black/80 z-10" />
              <Image
                src="/images/about-bg.png"
                alt="Macro shot of textured earth with bronze vein"
                fill
                className="object-cover filter contrast-125 grayscale-[10%]"
              />
            </motion.div>
            
            {/* Overlapping Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 right-0 lg:-right-20 bg-terra-charcoal p-8 md:p-12 border border-white/10 shadow-2xl max-w-sm z-20"
            >
              <span className="text-terra-bronze uppercase tracking-[0.2em] text-xs font-semibold mb-3 block">
                The Origin
              </span>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                By fusing raw, earth-derived ingredients with advanced formulations, we&apos;ve created a symphony of sensory experiences.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Massive Typography & Story */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-16">
            <motion.div style={{ y: yText }}>
              <span className="text-terra-bronze uppercase tracking-[0.3em] text-xs font-semibold block mb-6">
                The Philosophy
              </span>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-terra-beige leading-[1.1] mb-8 text-balance">
                &quot;TERRA was built for men who carry quiet confidence.&quot;
              </h2>
              
              <div className="w-20 h-px bg-terra-bronze/50 mb-8" />
              
              <p className="text-lg text-white/50 max-w-xl font-light leading-relaxed mb-6">
                We believe that grooming is not a chore, but a ritual. An act of grounding oneself before facing the world. Unapologetically bold. Strikingly minimal.
              </p>
              
              <p className="text-sm text-white/30 max-w-md font-light leading-relaxed">
                Our products are designed to be sensory markers in your day. A moment of pause. A transition from rest to action, or action to rest.
              </p>

              {/* Minimal Grid Detail */}
              <div className="grid grid-cols-2 gap-4 mt-12 border-t border-white/10 pt-8 max-w-sm">
                <div>
                  <p className="text-terra-bronze text-xs uppercase tracking-widest mb-1">Raw</p>
                  <p className="text-white/50 text-xs">Earth-derived</p>
                </div>
                <div>
                  <p className="text-terra-bronze text-xs uppercase tracking-widest mb-1">Refined</p>
                  <p className="text-white/50 text-xs">Scientifically balanced</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Abstract background elements for depth */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-terra-bronze/5 rounded-full blur-[100px] pointer-events-none z-0" />
    </section>
  );
}
