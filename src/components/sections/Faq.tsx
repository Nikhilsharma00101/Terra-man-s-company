"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How should I integrate the Face Wash into my routine?",
    answer: "Use it twice daily, morning and night. Apply a small amount to damp skin, massage gently in circular motions to activate the charcoal, and rinse thoroughly with cold water to close pores."
  },
  {
    id: 2,
    question: "Is the Beard Oil suitable for sensitive skin?",
    answer: "Absolutely. Our formulation uses natural, lightweight oils like argan and jojoba that are non-comedogenic (won't clog pores) and perfect for all skin types, including sensitive skin."
  },
  {
    id: 3,
    question: "Where are Terra products formulated and made?",
    answer: "All Terra products are proudly researched, formulated, and crafted in small batches in India, using ethically sourced natural ingredients from sustainable suppliers."
  },
  {
    id: 4,
    question: "Do you ship internationally?",
    answer: "Currently we ship within India only. We are working on bringing the Terra ritual to the rest of the world very soon. Stay subscribed to our newsletter for updates."
  }
];

export function Faq() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" className="relative bg-[#141414] py-24 lg:py-40 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terra-bronze/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Side: Sticky Header (Spans 4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <span className="text-terra-bronze uppercase tracking-[0.3em] text-xs font-semibold block mb-4">
              Information
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-terra-beige leading-[0.9] tracking-tighter mb-6">
              CURIOSTIES & ANSWERS
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">
              We believe in complete transparency. If you have a question that isn&apos;t covered here, please reach out to us.
            </p>
          </div>

          {/* Right Side: Accordion (Spans 8 cols) */}
          <div className="lg:col-span-8 divide-y divide-white/5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              
              return (
                <div key={faq.id} className="py-6 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex justify-between items-center text-left group"
                  >
                    <h3 className={`text-xl lg:text-2xl font-serif transition-colors duration-300 ${isOpen ? "text-terra-beige" : "text-white/80 group-hover:text-terra-beige"}`}>
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? "border-terra-bronze bg-terra-bronze text-terra-black rotate-45" : "border-white/10 text-white/50 group-hover:border-white/30"}`}>
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/60 text-sm font-light leading-relaxed pt-4 max-w-2xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
