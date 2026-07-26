"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/sections/Footer";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatusMessage({
        type: "success",
        text: "Thank you. Your message has been received and saved to our database.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setStatusMessage({
        type: "error",
        text: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18
      }
    }
  };

  return (
    <main className="flex-1 bg-[#0c0c0c] text-terra-beige selection:bg-terra-bronze/30 flex flex-col min-h-screen relative overflow-hidden">
      <Navbar />
      <CartDrawer />

      {/* Background Image with Dark Overlays for Readability */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/contact-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/90 via-[#0c0c0c]/70 to-[#0c0c0c]/95 z-0 pointer-events-none" />
      
      {/* Decorative background grid and flows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 opacity-50" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-terra-bronze/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-terra-gold/5 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />

      {/* Main Content Workspace */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow container mx-auto px-6 lg:px-12 relative z-10 pt-36 pb-24 lg:pt-48 lg:pb-36"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Editorial Page Header */}
          <motion.div variants={itemVariants} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.3em] text-terra-bronze font-semibold">Get in Touch</span>
              <div className="w-8 h-px bg-terra-bronze/40" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.05] mb-6">
              Let&apos;s Start a<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-beige via-terra-gold to-terra-bronze">
                New Ritual.
              </span>
            </h1>
            
            <p className="text-white/80 max-w-xl text-base md:text-lg font-light leading-relaxed font-sans">
              Have a question about our active formulas, custom orders, or your grooming schedule? Reach out directly. Our studio team is ready to assist.
            </p>
          </motion.div>

          {/* HUD Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT COLUMN: Contact Information (5 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
              <h2 className="text-sm uppercase tracking-[0.25em] text-white/50 font-bold font-mono">
                Contact Details
              </h2>

              {/* Dossier 01: Email */}
              <div className="group relative bg-[#121212] border border-white/5 p-6 rounded transition-all duration-300 hover:border-terra-bronze/30 shadow-lg">
                {/* Gold Brackets */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-terra-bronze/30 group-hover:border-terra-bronze pointer-events-none transition-colors" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-terra-bronze/30 group-hover:border-terra-bronze pointer-events-none transition-colors" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-terra-bronze flex-shrink-0 bg-[#161616]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="mb-1">
                      <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block">Email</span>
                    </div>
                    <a href="mailto:support@terraman.co" className="text-white font-serif text-lg hover:text-terra-gold transition-colors block">
                      support@terraman.co
                    </a>
                    <span className="text-white/40 text-xs block mt-1">For order status, bulk inquiries, or ingredients advice.</span>
                  </div>
                </div>
              </div>

              {/* Dossier 02: Phone */}
              <div className="group relative bg-[#121212] border border-white/5 p-6 rounded transition-all duration-300 hover:border-terra-bronze/30 shadow-lg">
                {/* Gold Brackets */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-terra-bronze/30 group-hover:border-terra-bronze pointer-events-none transition-colors" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-terra-bronze/30 group-hover:border-terra-bronze pointer-events-none transition-colors" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-terra-bronze flex-shrink-0 bg-[#161616]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="mb-1">
                      <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block">Phone</span>
                    </div>
                    <a href="tel:+919876543210" className="text-white font-serif text-lg hover:text-terra-gold transition-colors block">
                      +91 98765 43210
                    </a>
                    <span className="text-white/40 text-xs block mt-1">Available Monday to Friday, 10:00 AM – 6:00 PM IST.</span>
                  </div>
                </div>
              </div>

              {/* Dossier 03: Studio */}
              <div className="group relative bg-[#121212] border border-white/5 p-6 rounded transition-all duration-300 hover:border-terra-bronze/30 shadow-lg">
                {/* Gold Brackets */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-terra-bronze/30 group-hover:border-terra-bronze pointer-events-none transition-colors" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-terra-bronze/30 group-hover:border-terra-bronze pointer-events-none transition-colors" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-terra-bronze flex-shrink-0 bg-[#161616]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="mb-1">
                      <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block">Main Studio</span>
                    </div>
                    <p className="text-white font-serif text-lg leading-relaxed">
                      Block A, Connaught Place,<br />
                      New Delhi, Delhi 110001
                    </p>
                    <span className="text-white/40 text-xs block mt-1">Visits by prior schedule. Main laboratory and showroom.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: HUD Message Chamber (7 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="relative bg-[#121212] border border-white/5 p-8 lg:p-10 rounded shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                {/* Fine HUD Framing Lines */}
                <div className="absolute top-4 bottom-4 left-4 right-4 border border-terra-bronze/5 pointer-events-none z-0" />
                
                {/* HUD Corner Brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-terra-bronze/35 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-terra-bronze/35 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-terra-bronze/35 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-terra-bronze/35 pointer-events-none" />

                {/* Form header */}
                <div className="mb-10 pb-4 border-b border-white/5 relative z-10 select-none">
                  <h3 className="text-lg font-serif text-white">Send a Message</h3>
                </div>

                {statusMessage && (
                  <div
                    className={`mb-6 p-4 rounded border flex items-start gap-3 relative z-10 text-sm ${
                      statusMessage.type === "success"
                        ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                        : "bg-rose-950/40 border-rose-500/30 text-rose-300"
                    }`}
                  >
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                {/* Styled HUD Floating Form */}
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Full Name Input */}
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-sm"
                        placeholder="Full Name"
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute left-0 top-3 text-white/40 text-xs uppercase tracking-wider transition-all pointer-events-none
                        peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 
                        peer-focus:-top-4 peer-focus:text-xs peer-focus:text-terra-gold
                        peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/50"
                      >
                        Full Name
                      </label>
                    </div>

                    {/* Email Address Input */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-sm"
                        placeholder="Email Address"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute left-0 top-3 text-white/40 text-xs uppercase tracking-wider transition-all pointer-events-none
                        peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 
                        peer-focus:-top-4 peer-focus:text-xs peer-focus:text-terra-gold
                        peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/50"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-sm"
                      placeholder="Subject"
                    />
                    <label 
                      htmlFor="subject" 
                      className="absolute left-0 top-3 text-white/40 text-xs uppercase tracking-wider transition-all pointer-events-none
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 
                      peer-focus:-top-4 peer-focus:text-xs peer-focus:text-terra-gold
                      peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/50"
                    >
                      Subject
                    </label>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-sm resize-none"
                      placeholder="Message"
                    />
                    <label 
                      htmlFor="message" 
                      className="absolute left-0 top-3 text-white/40 text-xs uppercase tracking-wider transition-all pointer-events-none
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 
                      peer-focus:-top-4 peer-focus:text-xs peer-focus:text-terra-gold
                      peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/50"
                    >
                      Message
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative flex items-center justify-center gap-3 border border-terra-bronze/35 group/btn cursor-pointer bg-transparent overflow-hidden rounded-sm transition-colors duration-300 hover:text-terra-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover/btn:translate-x-0 transition-transform duration-400 ease-out z-0" />
                    <span className="relative z-10 py-4 uppercase tracking-[0.25em] text-xs font-semibold flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          Sending <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
