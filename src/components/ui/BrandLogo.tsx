"use client";

import { motion } from "framer-motion";

export function BrandLogo() {
  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center cursor-pointer group py-1"
      whileTap={{ scale: 0.98 }}
    >
      {/* Self-contained CSS for Molten Gold Text Shimmer */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes text-shine {
          to {
            background-position: 200% center;
          }
        }
        .shimmer-text {
          background: linear-gradient(
            to right,
            var(--color-terra-beige) 20%,
            var(--color-terra-gold) 40%,
            var(--color-terra-bronze) 60%,
            var(--color-terra-beige) 80%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: text-shine 6s linear infinite;
        }
      `}} />

      {/* Subtle background glow on logo hover */}
      <div className="absolute inset-0 bg-terra-bronze/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Styled Typography Font Text with Spring-based Letter-Spacing */}
      <motion.span
        initial={{ letterSpacing: "0.15em", opacity: 0 }}
        animate={{ letterSpacing: "0.32em", opacity: 1 }}
        whileHover={{ letterSpacing: "0.42em" }}
        transition={{ 
          letterSpacing: { type: "spring", stiffness: 120, damping: 20 },
          opacity: { duration: 0.8 } 
        }}
        className="font-serif text-2xl font-bold uppercase tracking-[0.32em] shimmer-text select-none text-center relative z-10 leading-none"
      >
        TERRA
      </motion.span>

      {/* Animated Underline with Gliding Light Particle */}
      <div className="w-[100px] h-[6px] relative mt-1.5 overflow-visible z-10">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 6" fill="none">
          {/* Base divider */}
          <motion.line
            x1="0"
            y1="3"
            x2="100"
            y2="3"
            stroke="var(--color-terra-bronze)"
            strokeWidth="0.8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="origin-center opacity-60"
          />
          {/* Gliding gold dot */}
          <motion.circle
            r="1.2"
            fill="var(--color-terra-gold)"
            animate={{ cx: [5, 95, 5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            cy="3"
          />
        </svg>
      </div>

    </motion.div>
  );
}
