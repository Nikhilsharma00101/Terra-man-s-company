"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    tag: "MEHTA",
    fullName: "Rahul Mehta",
    role: "Architect",
    quote: "The Purifying Face Wash is an absolute game-changer. My skin feels deeply cleansed yet remarkably hydrated. The matte finish is perfect.",
    rating: 5,
    metric: "SKIN HYDRATION +42%"
  },
  {
    id: 2,
    tag: "SINGH",
    fullName: "Vikram Singh",
    role: "Creative Director",
    quote: "The Signature Beard Oil tames my wild beard like nothing else. The sandalwood aroma is intoxicating and lasts all day. Pure luxury.",
    rating: 5,
    metric: "FOLLICLE SHEEN 10/10"
  },
  {
    id: 3,
    tag: "KAPOOR",
    fullName: "Aditya Kapoor",
    role: "Founder",
    quote: "Terra has completely elevated my daily grooming routine into a mindful ritual. I feel grounded and confident every morning.",
    rating: 5,
    metric: "RITUAL COMPLIANCE 100%"
  },
  {
    id: 4,
    tag: "VERMA",
    fullName: "Zayn Verma",
    role: "Photographer",
    quote: "Minimalist packaging, explosive results. This is what modern men's skincare should be.",
    rating: 5,
    metric: "MATTE DURATION 12H"
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay functionality
  useEffect(() => {
    if (isInteracted) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isInteracted]);

  const handleSelect = (index: number) => {
    setIsInteracted(true);
    setActiveIndex(index);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="relative bg-[#0c0c0c] py-24 lg:py-40 overflow-hidden border-t border-white/5">
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-terra-bronze/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-terra-gold/3 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-24 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-terra-bronze font-semibold">User Experience</span>
            <div className="w-8 h-px bg-terra-bronze/40" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.05] mb-6">
            Voices of the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-beige via-terra-gold to-terra-bronze">
              Daily Transition.
            </span>
          </h2>
        </div>

        {/* HUD Interactive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT SIDE: Vertical Selector Tabs (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono block mb-2">
                INDEX // REVIEWERS
              </span>
              
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {testimonials.map((t, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelect(index)}
                      className={`relative w-full text-left p-4 rounded-sm transition-all duration-300 border focus:outline-none flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? "bg-[#121212] border-terra-bronze/40 shadow-lg text-white"
                          : "bg-transparent border-white/5 hover:border-white/10 text-white/50 hover:text-white/80"
                      }`}
                    >
                      {/* Active Bracket Indicators */}
                      {isActive && (
                        <>
                          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-terra-bronze pointer-events-none" />
                          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-terra-bronze pointer-events-none" />
                        </>
                      )}
                      
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono tracking-wider opacity-40">
                          [0{index + 1}]
                        </span>
                        <span className={`font-serif text-base tracking-wide transition-colors ${isActive ? 'text-terra-gold' : ''}`}>
                          {t.fullName}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-white/40 font-light mt-0.5">
                          {t.role}
                        </span>
                      </div>
                      
                      <ChevronRight className={`w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 ${isActive ? 'text-terra-gold translate-x-0 opacity-100' : '-translate-x-2'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Stats Metric HUD bar */}
            <div className="hidden lg:block border border-white/5 p-4 bg-black/40 rounded-sm font-mono text-[10px] uppercase tracking-widest text-white/30">
              <div className="flex justify-between mb-1">
                <span>RATING STATUS</span>
                <span className="text-terra-gold">ACTIVE</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                  className="bg-terra-bronze h-full"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Animated Testimonial Showcase Chamber (7 Columns) */}
          <div className="lg:col-span-7 relative bg-[#121212] border border-white/5 rounded-sm p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-[460px]">
            
            {/* Fine HUD framing inside showcase */}
            <div className="absolute top-4 bottom-4 left-4 right-4 border border-terra-bronze/5 pointer-events-none z-0" />
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-terra-bronze/35 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-terra-bronze/35 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-terra-bronze/35 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-terra-bronze/35 pointer-events-none" />

            {/* Rotating SVG telemetry dial */}
            <div className="absolute -right-16 -top-16 opacity-[0.04] pointer-events-none z-0 select-none">
              <svg className="w-[300px] h-[300px] animate-spin-slow-cw" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="text-white" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="20 5 2 5" className="text-white" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
                className="relative z-10 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-8 select-none">
                    <Quote className="text-terra-bronze/10 w-16 h-16 absolute -top-8 -left-6" />
                    
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-terra-bronze text-terra-bronze" />
                      ))}
                    </div>

                    {/* HUD active client indicator */}
                    <span className="text-[10px] font-mono text-white/30 tracking-widest">
                      ID // TST_{activeTestimonial.tag}
                    </span>
                  </div>

                  <p className="text-xl md:text-2xl font-serif text-terra-beige leading-relaxed mb-8">
                    &quot;{activeTestimonial.quote}&quot;
                  </p>
                </div>

                {/* Bottom author specs row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-white/5 pt-6 select-none">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-terra-bronze/10 border border-terra-bronze/35 rounded-sm flex items-center justify-center text-terra-gold font-serif text-xl font-medium">
                      {activeTestimonial.fullName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-serif text-lg tracking-wide">{activeTestimonial.fullName}</h4>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-wider">{activeTestimonial.role}</p>
                    </div>
                  </div>

                  <div className="text-right font-mono text-[9px] uppercase tracking-widest text-terra-bronze">
                    <span>{activeTestimonial.metric}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
