"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The Purifying Face Wash is an absolute game-changer. My skin feels deeply cleansed yet remarkably hydrated. The matte finish is perfect.",
    author: "Rahul Mehta",
    role: "Architect",
    rating: 5,
    size: "large"
  },
  {
    id: 2,
    quote: "The Signature Beard Oil tames my wild beard like nothing else. The sandalwood aroma is intoxicating and lasts all day. Pure luxury.",
    author: "Vikram Singh",
    role: "Creative Director",
    rating: 5,
    size: "medium"
  },
  {
    id: 3,
    quote: "Terra has completely elevated my daily grooming routine into a mindful ritual. I feel grounded and confident every morning.",
    author: "Aditya Kapoor",
    role: "Founder",
    rating: 5,
    size: "medium"
  },
  {
    id: 4,
    quote: "Minimalist packaging, explosive results. This is what modern men's skincare should be.",
    author: "Zayn Khan",
    role: "Photographer",
    rating: 5,
    size: "small"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-[#141414] py-24 lg:py-40 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-terra-bronze/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-24 text-center mx-auto">
          <span className="text-terra-bronze uppercase tracking-[0.3em] text-xs font-semibold block mb-4">
            The Experience
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-terra-beige leading-[0.9] tracking-tighter mb-6">
            VOICES OF THE RITUAL
          </h2>
          <p className="text-white/70 max-w-md mx-auto text-sm md:text-base font-light leading-relaxed">
            Real stories from the discerning gentlemen who have made Terra a part of their daily transition.
          </p>
        </div>

        {/* Unique Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Large (Spans 2 cols on desktop if we wanted, but let's do a vertical stagger instead) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-[#1C1C1C]/50 backdrop-blur-md border border-white/5 p-8 lg:p-12 rounded-2xl flex flex-col justify-between hover:border-terra-bronze/20 transition-colors duration-500 group min-h-[350px]"
          >
            <div className="relative">
              <Quote className="text-terra-bronze/10 w-20 h-20 absolute -top-10 -left-6 z-0" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-terra-bronze text-terra-bronze" />
                  ))}
                </div>
                <p className="text-2xl md:text-3xl font-serif text-terra-beige leading-relaxed mb-8">
                  &quot;{testimonials[0].quote}&quot;
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-12 h-12 bg-terra-bronze/20 rounded-full flex items-center justify-center text-terra-bronze font-serif text-xl">
                {testimonials[0].author.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-medium tracking-wide">{testimonials[0].author}</h4>
                <p className="text-white/40 text-sm font-light">{testimonials[0].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Medium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1 bg-[#1C1C1C]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-terra-bronze/20 transition-colors duration-500 min-h-[350px]"
          >
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-terra-bronze text-terra-bronze" />
                ))}
              </div>
              <p className="text-lg font-light text-white/80 leading-relaxed mb-8 italic">
                &quot;{testimonials[1].quote}&quot;
              </p>
            </div>
            
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 font-serif">
                {testimonials[1].author.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-medium tracking-wide">{testimonials[1].author}</h4>
                <p className="text-white/40 text-sm font-light">{testimonials[1].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Medium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="col-span-1 bg-[#1C1C1C]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-terra-bronze/20 transition-colors duration-500 min-h-[350px]"
          >
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-terra-bronze text-terra-bronze" />
                ))}
              </div>
              <p className="text-lg font-light text-white/80 leading-relaxed mb-8 italic">
                &quot;{testimonials[2].quote}&quot;
              </p>
            </div>
            
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 font-serif">
                {testimonials[2].author.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-medium tracking-wide">{testimonials[2].author}</h4>
                <p className="text-white/40 text-sm font-light">{testimonials[2].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Small / Accent (Spans 2 cols on desktop for a unique look) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 bg-gradient-to-br from-terra-bronze/20 to-transparent backdrop-blur-md border border-terra-bronze/10 p-8 lg:p-10 rounded-2xl flex flex-col justify-between hover:border-terra-bronze/30 transition-colors duration-500"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
              <p className="text-xl font-serif text-terra-beige leading-relaxed md:max-w-[70%]">
                &quot;{testimonials[3].quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-terra-beige text-terra-black rounded-full flex items-center justify-center font-bold">
                  ZK
                </div>
                <div>
                  <h4 className="text-white font-medium tracking-wide">{testimonials[3].author}</h4>
                  <p className="text-white/40 text-xs font-light">{testimonials[3].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
