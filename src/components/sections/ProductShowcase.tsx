"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { products } from "@/lib/data";
import { useCart } from "@/components/CartProvider";

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "usage">("details");

  // Autoplay & Interaction States
  const [isInteracted, setIsInteracted] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const product = products[activeProductIndex];

  // Autoplay Effect (cycles every 6 seconds, pauses on interaction/hover/touch)
  useEffect(() => {
    if (isInteracted || isMouseOver || isZoomed) return;

    const interval = setInterval(() => {
      setActiveProductIndex((prev) => (prev === 0 ? 1 : 0));
    }, 6000);

    return () => clearInterval(interval);
  }, [isInteracted, isMouseOver, isZoomed]);

  // Professional product summaries & steps
  const details = product.id === "terra-face-wash"
    ? [
        "Deeply cleanses without stripping essential skin moisture",
        "Draws out daily toxins and micro-impurities from pores",
        "Formulated with natural volcanic minerals for skin health",
        "Leaves a fresh, clean, natural matte skin texture"
      ]
    : [
        "Softens coarse facial hair and deeply conditions underlying skin",
        "Relieves dryness and daily skin irritation under the beard",
        "Absorbs quickly with a non-greasy, lightweight premium feel",
        "Infuses hair with a subtle, warm woody fragrance profile"
      ];

  const instructions = product.id === "terra-face-wash"
    ? "Lather a small amount between damp palms. Massage gently onto damp skin in circular motions, avoiding the eye area. Rinse thoroughly with cool water. Suitable for daily morning and evening use to keep skin fresh."
    : "Dispense 3-4 drops into your palm. Rub hands together to warm the oil, then massage into clean facial hair and the skin underneath. Use a comb or fingertips to style. Apply daily for best results.";

  // Zoom coordinate tracker
  const handleMouseMoveZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomCoords({ x: xPercent, y: yPercent });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomCoords({ x: 50, y: 50 });
  };

  // Background texture mapping
  const bgTexture = product.id === "terra-face-wash"
    ? { src: "/images/water-ripple.png", alt: "Water texture", opacity: "opacity-15 group-hover:opacity-25" }
    : { src: "/images/oil-texture.png", alt: "Oil texture", opacity: "opacity-10 group-hover:opacity-20" };

  return (
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
          
          {/* LEFT COLUMN: Section Header & Product Selector (Sticky on Desktop) */}
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
                    setIsZoomed(false);
                    setIsInteracted(true); // Stop autoplay on explicit product click
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

          {/* RIGHT COLUMN: Selected Product Detail Card */}
          <div className="lg:col-span-8 font-sans">
            <div 
              onMouseEnter={() => setIsMouseOver(true)}
              onMouseLeave={() => setIsMouseOver(false)}
              onTouchStart={() => setIsInteracted(true)} // Stop autoplay on any touch interaction (scroll/swipe/tap)
              className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              
              {/* Product Image Chamber (Left 45% of card) */}
              <div 
                className="w-full md:w-[45%] h-[340px] md:h-[580px] bg-[#161616] flex items-center justify-center relative overflow-hidden group border-b md:border-b-0 md:border-r border-white/5 md:cursor-none"
                onMouseMove={handleMouseMoveZoom}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Ambient radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,91,0.05)_0%,transparent_70%)] pointer-events-none" />
                
                {/* Subtle Thematic Background Texture */}
                <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${bgTexture.opacity}`}>
                  <Image
                    src={bgTexture.src}
                    alt={bgTexture.alt}
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
                <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] uppercase tracking-[0.35em] text-terra-bronze/35 font-serif whitespace-nowrap pointer-events-none select-none">
                  TERRA MAN&apos;S CO. // FORMULA 0{activeProductIndex + 1}
                </div>

                {/* Floating Precision Zoom Image */}
                <div className="relative w-[150px] h-[200px] md:w-[220px] md:h-[300px] overflow-hidden pointer-events-none z-10 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: isZoomed ? 1.8 : 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`
                      }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)]"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Floating Custom Zoom Indicator Cursor */}
                {isZoomed && (
                  <div 
                    className="absolute pointer-events-none z-30 font-mono text-[9px] uppercase tracking-widest text-terra-beige bg-terra-black/85 px-2.5 py-1 border border-terra-bronze/25 rounded shadow-lg hidden md:block"
                    style={{
                      left: `${mousePos.x}px`,
                      top: `${mousePos.y}px`,
                      transform: "translate(-50%, -120%)"
                    }}
                  >
                    [ zoom ]
                  </div>
                )}

                {/* Subtle category tag */}
                <div className="absolute bottom-6 right-6 z-20">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Details Section (Right 55% of card) */}
              <div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col justify-between bg-[#121212]">
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

                  {/* Clean Tab Controls with Higher Contrast & Touch Targets */}
                  <div className="flex gap-8 border-b border-white/10 pb-3 mb-6 font-semibold text-sm">
                    <button
                      onClick={() => {
                        setActiveTab("details");
                        setIsInteracted(true); // Stop autoplay on tab selection click
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
                        setIsInteracted(true); // Stop autoplay on tab selection click
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
                        setIsInteracted(true); // Stop autoplay on tab selection click
                      }}
                      className={`pb-2 transition-all duration-300 relative cursor-pointer focus:outline-none ${activeTab === "usage" ? "text-terra-beige" : "text-white/50 hover:text-white/80"}`}
                    >
                      Ritual
                      {activeTab === "usage" && (
                        <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-terra-bronze" />
                      )}
                    </button>
                  </div>

                  {/* Tab Display Panel - High Contrast Text */}
                  <div className="min-h-[160px] text-sm md:text-base font-light text-white/90 leading-relaxed">
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

                {/* Add to Cart Action - Split Button */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <button
                    onClick={() => addItem(product)}
                    className="w-full flex border border-terra-bronze/35 group/btn cursor-pointer bg-transparent overflow-hidden rounded-sm transition-all duration-300 hover:border-terra-beige shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
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
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
