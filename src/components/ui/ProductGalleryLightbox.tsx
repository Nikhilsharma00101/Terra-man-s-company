"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product, ProductGalleryItem } from "@/lib/data";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ProductGalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  initialIndex?: number;
}

export function ProductGalleryLightbox({
  isOpen,
  onClose,
  product,
  initialIndex = 0,
}: ProductGalleryLightboxProps) {
  const gallery: ProductGalleryItem[] = product.gallery || [
    {
      id: "default-01",
      url: product.image,
      tag: "STUDIO",
      label: "01 Studio Bottle",
      caption: product.tagline || product.name,
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Sync initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
        setIsZoomed(false);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, gallery.length, onClose]);

  if (!isOpen) return null;

  const currentItem = gallery[activeIndex] || gallery[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none"
      >
        {/* TOP CONTROL BAR */}
        <div className="w-full px-6 py-5 flex items-center justify-between border-b border-white/10 relative z-20 bg-black/40">
          <div className="flex items-center gap-4">
            <span className="text-terra-gold font-mono text-xs uppercase tracking-[0.25em] px-2.5 py-1 rounded bg-terra-gold/10 border border-terra-gold/25">
              {currentItem.tag}
            </span>
            <div>
              <h4 className="text-white font-serif text-lg md:text-xl tracking-tight">
                {product.name}
              </h4>
              <p className="text-white/50 text-xs font-sans">
                {currentItem.label} &mdash; {currentItem.caption}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Simple Zoom Toggle Button */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                isZoomed
                  ? "bg-terra-gold text-terra-black border-terra-gold"
                  : "bg-white/5 border-white/15 hover:border-terra-gold text-white/80 hover:text-white"
              }`}
              aria-label="Toggle Zoom"
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>

            {/* View Counter */}
            <div className="text-right font-mono text-xs text-white/50 hidden sm:block">
              <span className="text-terra-beige font-semibold">0{activeIndex + 1}</span> / 0{gallery.length}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 border border-white/15 hover:border-terra-gold text-white/80 hover:text-white transition-all cursor-pointer group"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* MAIN STAGE WITH PREV / NEXT NAVIGATION */}
        <div className="relative flex-1 flex items-center justify-center p-6 md:p-12 overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,91,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Left Arrow Button */}
          <button
            onClick={() => {
              setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
              setIsZoomed(false);
            }}
            className="absolute left-6 md:left-10 z-30 p-4 rounded-full bg-black/60 border border-white/15 hover:border-terra-gold text-white/80 hover:text-terra-gold transition-all duration-300 cursor-pointer shadow-2xl hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Image Container */}
          <div 
            onClick={() => setIsZoomed(!isZoomed)}
            className="relative w-full max-w-4xl h-full flex items-center justify-center cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full h-[60vh] md:h-[70vh] max-w-3xl flex items-center justify-center"
              >
                {/* Background Texture if applicable */}
                {currentItem.bgTexture && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none rounded-lg overflow-hidden">
                    <Image
                      src={currentItem.bgTexture}
                      alt="Texture"
                      fill
                      className="object-cover mix-blend-overlay filter brightness-75"
                    />
                  </div>
                )}

                {/* Frame luxury accents */}
                <div className="absolute inset-2 border border-terra-gold/15 pointer-events-none rounded-lg" />
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-terra-gold/40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-terra-gold/40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-terra-gold/40 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-terra-gold/40 pointer-events-none" />

                <Image
                  src={currentItem.url}
                  alt={currentItem.label}
                  fill
                  className="object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] p-6 transition-all duration-300"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => {
              setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
              setIsZoomed(false);
            }}
            className="absolute right-6 md:right-10 z-30 p-4 rounded-full bg-black/60 border border-white/15 hover:border-terra-gold text-white/80 hover:text-terra-gold transition-all duration-300 cursor-pointer shadow-2xl hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* BOTTOM THUMBNAIL FILMSTRIP TRAY */}
        <div className="w-full py-4 px-6 border-t border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center gap-4 overflow-x-auto">
          {gallery.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsZoomed(false);
                }}
                className={`relative group flex items-center gap-3 px-4 py-2.5 rounded border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-terra-gold/15 border-terra-gold text-terra-beige shadow-[0_0_15px_rgba(176,141,91,0.25)]"
                    : "bg-white/5 border-white/10 hover:border-white/30 text-white/60 hover:text-white"
                }`}
              >
                <div className="relative w-8 h-10 overflow-hidden rounded bg-black/40">
                  <Image
                    src={item.url}
                    alt={item.label}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-terra-gold">
                    {item.tag}
                  </span>
                  <span className="font-serif text-xs tracking-normal">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
