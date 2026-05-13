"use client";

import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex-1 bg-terra-black text-terra-beige selection:bg-terra-bronze/30 flex flex-col min-h-screen">
      <Navbar />
      <CartDrawer />

      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-terra-bronze/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-terra-bronze uppercase tracking-[0.3em] text-xs font-semibold block mb-4">
              Get in Touch
            </span>
            <h1 className="text-6xl md:text-8xl font-serif text-terra-beige leading-[0.9] tracking-tighter mb-6">
              CONNECT WITH US
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
              Have a question about our rituals or products? Reach out to the Terra team. We are here to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 lg:pb-40 relative flex-grow">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

            {/* Left Side: Info (Spans 5 cols) */}
            <div className="lg:col-span-5 space-y-12">

              {/* Contact Info Block */}
              <div className="space-y-8">
                <h2 className="text-2xl font-serif text-terra-beige mb-6">Contact Information</h2>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-terra-bronze/10 rounded-full flex items-center justify-center text-terra-bronze flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Email</span>
                    <a href="mailto:support@terraman.co" className="text-white/90 hover:text-terra-bronze transition-colors text-sm">
                      support@terraman.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-terra-bronze/10 rounded-full flex items-center justify-center text-terra-bronze flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Phone</span>
                    <a href="tel:+919876543210" className="text-white/90 hover:text-terra-bronze transition-colors text-sm">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-terra-bronze/10 rounded-full flex items-center justify-center text-terra-bronze flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Studio</span>
                    <p className="text-white/90 text-sm leading-relaxed">
                      104, Earthly Heights, Design District,<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif text-terra-beige mb-6">Follow the Journey</h2>
                <div className="flex gap-4">
                  {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-xs uppercase tracking-widest text-white/50 hover:text-terra-bronze transition-colors border border-white/10 px-4 py-2 rounded-full"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Form (Spans 7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#1C1C1C]/50 backdrop-blur-md border border-white/5 p-8 lg:p-10 rounded-2xl">
                <h2 className="text-2xl font-serif text-terra-beige mb-8">Send a Message</h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-white/40 text-xs uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-[#141414]/50 border border-white/10 focus:border-terra-bronze/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-white/40 text-xs uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-[#141414]/50 border border-white/10 focus:border-terra-bronze/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-white/40 text-xs uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full bg-[#141414]/50 border border-white/10 focus:border-terra-bronze/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-white/40 text-xs uppercase tracking-wider">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-[#141414]/50 border border-white/10 focus:border-terra-bronze/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-terra-beige text-terra-black py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white transition-colors rounded-lg flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
