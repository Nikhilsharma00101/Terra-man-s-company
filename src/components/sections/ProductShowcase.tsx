"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { products, ProductGalleryItem } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { Tooltip } from "@/components/ui/Tooltip";
import { ProductGalleryLightbox } from "@/components/ui/ProductGalleryLightbox";
import { Heart, Maximize2, Layers, ZoomIn } from "lucide-react";

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "usage">("details");

  // Simple Click Zoom state inside chamber (toggle 1.3x scale)
  const [isClickZoomed, setIsClickZoomed] = useState(false);

  // Lightbox Modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Autoplay & Interaction States
  const [isInteracted, setIsInteracted] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const product = products[activeProductIndex];
  const gallery: ProductGalleryItem[] = product.gallery || [
    {
      id: "default-01",
      url: product.image,
      tag: "STUDIO",
      label: "01 Studio Bottle",
      caption: product.tagline || product.name,
    },
  ];

  const currentGalleryItem = gallery[activeGalleryIndex] || gallery[0];

  // Reset active gallery index and zoom when product changes
  useEffect(() => {
    setActiveGalleryIndex(0);
    setIsClickZoomed(false);
  }, [activeProductIndex]);

  // Autoplay Effect (cycles gallery images or products every 5s if uninteracted)
  useEffect(() => {
    if (isInteracted || isMouseOver || isClickZoomed || isLightboxOpen) return;

    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => {
        if (prev < gallery.length - 1) {
          return prev + 1;
        } else {
          setActiveProductIndex((prodPrev) => (prodPrev === 0 ? 1 : 0));
          return 0;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isInteracted, isMouseOver, isClickZoomed, isLightboxOpen, gallery.length]);

  // Genuine product highlights & directions extracted directly from packaging
  const details = product.id === "terra-face-wash"
    ? [
        "Specifically formulated for oily & acne prone skin",
        "Enriched with Niacinamide, Salicylic Acid & Hyaluronic Acid",
        "Infused with Green Tea & Tea Tree botanicals",
        "100% Sulfate Free, Paraben Free, and Cruelty Free"
      ]
    : [
        "Nourishes, softens, and strengthens facial hair",
        "Relieves dryness and comforts skin underneath the beard",
        "Blended with Sweet Almond, Jojoba, Argan, Castor & Black Seed oils",
        "Enriched with Natural Vitamin E & Lavender oil"
      ];

  const instructions = product.id === "terra-face-wash"
    ? "Apply a small amount on wet face and gently massage in circular motions. Rinse thoroughly with water. Use twice daily for best results."
    : "Take 2-3 drops on your palm. Apply evenly to your beard and the skin underneath. Massage gently and style as desired. Use daily for best results.";

  // Background texture mapping fallback
  const bgTextureSrc = currentGalleryItem.bgTexture || (
    product.id === "terra-face-wash" ? "/images/water-ripple.png" : "/images/oil-texture.png"
  );

  return (
    <>
      <section
        id="collection"
        ref={containerRef}
        className="relative bg-[#0c0c0c] pt-24 lg:pt-40 pb-12 lg:pb-16 overflow-hidden"
      >
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-terra-bronze/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-terra-gold/3 rounded-full blur-[80px] pointer-events-none z-0" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT COLUMN: Section Header & Product Selector */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col justify-between">
              <div>
                <span className="text-terra-bronze uppercase tracking-[0.25em] text-xs font-semibold block mb-4">
                  Curated Selection
                </span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-terra-beige leading-[0.95] tracking-tighter mb-6">
                  THE<br />COLLECTION
                </h2>
                <p className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-sm font-sans mb-8">
                  Meticulously crafted formulas using earth-derived ingredients, refined for the modern gentleman&apos;s daily ritual.
                </p>
              </div>

              {/* Minimalist Tab Switcher */}
              <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProductIndex(idx);
                      setIsClickZoomed(false);
                      setIsInteracted(true);
                    }}
                    onMouseEnter={() => setIsMouseOver(true)}
                    onMouseLeave={() => setIsMouseOver(false)}
                    className="group text-left flex items-center gap-5 cursor-pointer focus:outline-none"
                  >
                    <span className={`font-mono text-sm font-semibold transition-colors duration-300 ${activeProductIndex === idx ? "text-terra-bronze" : "text-white/30"}`}>
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className={`font-serif text-xl md:text-2xl tracking-normal transition-colors duration-300 ${activeProductIndex === idx ? "text-white font-medium" : "text-white/50 group-hover:text-white/80"}`}>
                        {p.name.replace("TERRA ", "")}
                      </span>
                      <div className={`h-[2px] bg-terra-bronze transition-all duration-500 mt-2 ${activeProductIndex === idx ? "w-20" : "w-0 group-hover:w-10"}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Selected Product Detail Card & Multi-Angle Chamber */}
            <div className="lg:col-span-8 font-sans">
              <div 
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
                onTouchStart={() => setIsInteracted(true)}
                className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                
                {/* Multi-Image Product Chamber (Left 48% of card) */}
                <div 
                  className="w-full md:w-[48%] min-h-[420px] md:min-h-[600px] bg-[#161616] flex flex-col items-center justify-between relative overflow-hidden group border-b md:border-b-0 md:border-r border-white/5 p-4"
                >
                  {/* TOP TOOLBAR: View Selector Pills & Quick Action Icons */}
                  <div className="w-full flex items-center justify-between z-30 relative gap-2 pb-2">
                    {/* View Angle Pills */}
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
                      {gallery.map((gItem, gIdx) => {
                        const isActive = activeGalleryIndex === gIdx;
                        return (
                          <button
                            key={gItem.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveGalleryIndex(gIdx);
                              setIsClickZoomed(false);
                              setIsInteracted(true);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-semibold transition-all duration-300 cursor-pointer ${
                              isActive
                                ? "bg-terra-gold text-terra-black shadow-md font-bold"
                                : "text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {gItem.tag}
                          </button>
                        );
                      })}
                    </div>

                    {/* Action Icon Group (Toggle Zoom + Lightbox + Wishlist) */}
                    <div className="flex items-center gap-2">
                      <Tooltip content={isClickZoomed ? "Reset Scale" : "Simple Zoom"} position="left">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsClickZoomed(!isClickZoomed);
                          }}
                          className={`p-2 rounded-full border transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 ${
                            isClickZoomed
                              ? "bg-terra-gold text-terra-black border-terra-gold"
                              : "bg-black/60 backdrop-blur-md border-white/15 text-white/70 hover:text-terra-gold"
                          }`}
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </Tooltip>

                      <Tooltip content="Fullscreen Exhibition" position="left">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsLightboxOpen(true);
                          }}
                          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-terra-gold text-white/70 hover:text-terra-gold transition-all duration-300 cursor-pointer shadow-lg hover:scale-110"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </Tooltip>

                      <Tooltip content={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"} position="left">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-terra-gold text-terra-gold transition-all duration-300 cursor-pointer shadow-lg hover:scale-110"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? "fill-terra-gold text-terra-gold" : "text-white/70 hover:text-terra-gold"}`} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Ambient radial glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,91,0.06)_0%,transparent_70%)] pointer-events-none" />
                  
                  {/* Dynamic Texture Layer */}
                  <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 opacity-15 group-hover:opacity-25">
                    <Image
                      src={bgTextureSrc}
                      alt="Texture"
                      fill
                      className="object-cover mix-blend-overlay filter brightness-[0.7] grayscale-[10%]"
                    />
                  </div>

                  {/* Luxury Gallery Frame Lines & Corners */}
                  <div className="absolute top-4 bottom-4 left-4 right-4 border border-terra-bronze/10 pointer-events-none z-0" />
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-terra-bronze/30 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-terra-bronze/30 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-terra-bronze/30 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-terra-bronze/30 pointer-events-none" />
                  
                  {/* Vertical brand text watermark */}
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] uppercase tracking-[0.35em] text-terra-bronze/35 font-serif whitespace-nowrap pointer-events-none select-none hidden sm:block">
                    TERRA // {currentGalleryItem.tag} VIEW 0{activeGalleryIndex + 1}
                  </div>

                  {/* MAIN IMAGE STAGE (CLICK TO TOGGLE ZOOM OR OPEN LIGHTBOX) */}
                  <div 
                    onClick={() => setIsClickZoomed(!isClickZoomed)}
                    className="relative w-full flex-1 flex items-center justify-center overflow-hidden my-auto py-4 cursor-pointer"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentGalleryItem.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: isClickZoomed ? 1.4 : 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-[190px] h-[260px] md:w-[240px] md:h-[340px]"
                      >
                        <Image
                          src={currentGalleryItem.url}
                          alt={currentGalleryItem.label}
                          fill
                          className="object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] transition-all duration-300"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* BOTTOM CAPTION BAR */}
                  <div className="w-full flex items-center justify-between pt-2 border-t border-white/10 z-20">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-terra-gold" />
                      <span className="text-xs text-white/80 font-serif">
                        {currentGalleryItem.label}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="text-[10px] font-mono uppercase tracking-widest text-terra-gold hover:underline cursor-pointer"
                    >
                      Expand View &rarr;
                    </button>
                  </div>
                </div>

                {/* Product Details Section (Right 52% of card) */}
                <div className="w-full md:w-[52%] p-8 md:p-10 flex flex-col justify-between bg-[#121212]">
                  <div>
                    
                    {/* Boutique Price Tag Section */}
                    <div className="flex justify-between items-center mb-5 pb-5 border-b border-white/10">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.2em] text-terra-bronze font-bold">
                          {product.category}
                        </span>
                        <span className="text-[11px] text-white/55 font-sans mt-1">
                          {product.id === "terra-face-wash" ? "100ml e 3.4 fl. oz." : "50ml e 1.7 fl. oz."}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/45 block mb-0.5">Price</span>
                        <span className="text-2xl font-serif text-terra-beige font-semibold">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tight mb-4 leading-tight">
                      {product.name}
                    </h3>
                    
                    <p className="text-white/90 text-sm md:text-base font-light leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Clean Tab Controls */}
                    <div className="flex gap-8 border-b border-white/10 pb-3 mb-6 font-semibold text-sm">
                      <button
                        onClick={() => {
                          setActiveTab("details");
                          setIsInteracted(true);
                        }}
                        className={`pb-2 transition-all duration-300 relative cursor-pointer focus:outline-none ${activeTab === "details" ? "text-terra-beige" : "text-white/50 hover:text-white/80"}`}
                      >
                        Details
                        {activeTab === "details" && (
                          <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-terra-bronze" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("ingredients");
                          setIsInteracted(true);
                        }}
                        className={`pb-2 transition-all duration-300 relative cursor-pointer focus:outline-none ${activeTab === "ingredients" ? "text-terra-beige" : "text-white/50 hover:text-white/80"}`}
                      >
                        Ingredients
                        {activeTab === "ingredients" && (
                          <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-terra-bronze" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("usage");
                          setIsInteracted(true);
                        }}
                        className={`pb-2 transition-all duration-300 relative cursor-pointer focus:outline-none ${activeTab === "usage" ? "text-terra-beige" : "text-white/50 hover:text-white/80"}`}
                      >
                        Ritual
                        {activeTab === "usage" && (
                          <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-terra-bronze" />
                        )}
                      </button>
                    </div>

                    {/* Tab Display Panel */}
                    <div className="min-h-[150px] text-sm md:text-base font-light text-white/90 leading-relaxed">
                      <AnimatePresence mode="wait">
                        {activeTab === "details" && (
                          <motion.ul
                            key="details"
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -3 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3 list-disc pl-4"
                          >
                            {details.map((item, i) => (
                              <li key={i} className="text-white/95">
                                {item}
                              </li>
                            ))}
                          </motion.ul>
                        )}

                        {activeTab === "ingredients" && (
                          <motion.div
                            key="ingredients"
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -3 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2"
                          >
                            <p className="text-white/70 italic text-sm">Key Active Ingredients:</p>
                            <p className="text-white font-semibold font-serif text-lg tracking-normal mb-3">
                              {product.ingredients.join(", ")}
                            </p>
                            <p className="text-sm text-white/80 leading-relaxed">
                              Formulated without parabens, phthalates, synthetic colorants, or sulfates. Safe for sensitive skin types.
                            </p>
                          </motion.div>
                        )}

                        {activeTab === "usage" && (
                          <motion.p
                            key="usage"
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -3 }}
                            transition={{ duration: 0.2 }}
                            className="text-white/95 font-light"
                          >
                            {instructions}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Add to Cart & Wishlist Actions */}
                  <div className="mt-8 border-t border-white/10 pt-6 flex items-center gap-3">
                    <button
                      onClick={() => addItem(product)}
                      className="flex-1 flex border border-terra-bronze/35 group/btn cursor-pointer bg-transparent overflow-hidden rounded-sm transition-all duration-300 hover:border-terra-beige shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
                    >
                      {/* Add to Cart (Left 70%) */}
                      <div className="flex-1 py-4 text-center relative overflow-hidden bg-terra-beige transition-colors duration-500 group-hover/btn:bg-white flex items-center justify-center">
                        <span className="text-terra-black font-bold uppercase tracking-[0.25em] text-xs md:text-sm transition-transform duration-500 group-hover/btn:scale-105">
                          Add to Cart
                        </span>
                      </div>
                      
                      {/* Price Chamber (Right 30%) */}
                      <div className="w-[30%] py-4 border-l border-terra-bronze/30 flex items-center justify-center bg-[#151515] group-hover/btn:bg-[#1c1c1c] transition-all duration-300">
                        <span className="text-terra-beige font-serif text-sm md:text-base font-semibold group-hover/btn:text-white transition-colors duration-300">
                          ₹{product.price}
                        </span>
                      </div>
                    </button>

                    {/* Wishlist Heart Button */}
                    <Tooltip content={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"} position="top">
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-4 border rounded-sm flex items-center justify-center transition-all duration-300 cursor-pointer ${
                          isInWishlist(product.id)
                            ? "bg-terra-bronze/20 border-terra-gold text-terra-gold"
                            : "border-white/15 hover:border-white/40 text-white/70 hover:text-white bg-[#151515]"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-terra-gold text-terra-gold" : ""}`} />
                      </button>
                    </Tooltip>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FULLSCREEN EXHIBITION LIGHTBOX MODAL */}
      <ProductGalleryLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        product={product}
        initialIndex={activeGalleryIndex}
      />
    </>
  );
}
