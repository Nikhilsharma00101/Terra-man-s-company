"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Position offset mapping
  const positionStyles = {
    top: "bottom-full mb-2.5 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2.5 left-1/2 -translate-x-1/2",
    left: "right-full mr-2.5 top-1/2 -translate-y-1/2",
    right: "left-full ml-2.5 top-1/2 -translate-y-1/2",
  };

  const arrowStyles = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-[#0e0e11] border-l-transparent border-r-transparent border-b-transparent border-t-[4px] border-x-[4px]",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-b-[#0e0e11] border-l-transparent border-r-transparent border-t-transparent border-b-[4px] border-x-[4px]",
    left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-[#0e0e11] border-t-transparent border-b-transparent border-r-transparent border-l-[4px] border-y-[4px]",
    right: "left-[-4px] top-1/2 -translate-y-1/2 border-r-[#0e0e11] border-t-transparent border-b-transparent border-l-transparent border-r-[4px] border-y-[4px]",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === "top" ? 4 : position === "bottom" ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: position === "top" ? 4 : position === "bottom" ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`absolute z-[100] pointer-events-none ${positionStyles[position]}`}
          >
            <div className="relative bg-[#0e0e11]/95 backdrop-blur-2xl border border-terra-bronze/40 rounded-lg px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest text-terra-gold shadow-[0_8px_25px_rgba(0,0,0,0.9)] flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-terra-gold animate-pulse" />
              <span className="font-semibold">{content}</span>
              <div className={`absolute w-0 h-0 ${arrowStyles[position]}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
