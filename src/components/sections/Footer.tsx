"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-terra-black border-t border-white/5 pt-32 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Massive Brand Title in Footer */}
        <div className="mb-24 overflow-hidden">
          <h2 className="text-[15vw] font-serif text-terra-beige/10 leading-none tracking-tighter text-center select-none">
            TERRA MAN&apos;S CO.
          </h2>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Column 1: Brand Statement & Newsletter (Wide) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[200px]">
            <div>
              <span className="text-terra-bronze uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
                Stay Grounded
              </span>
              <p className="text-white/50 text-sm max-w-sm font-light leading-relaxed mb-8">
                Subscribe to receive updates on new collections, brand stories, and exclusive rituals.
              </p>
            </div>

            {/* Minimalist Newsletter Form */}
            <div className="relative max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-terra-bronze transition-colors font-light"
              />
              <button className="absolute right-0 bottom-3 text-white/50 hover:text-terra-beige transition-colors">
                <MoveRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:col-span-1 lg:block"></div>

          {/* Column 2: Links - Shop */}
          <div className="lg:col-span-2">
            <h4 className="text-terra-beige uppercase tracking-[0.2em] text-xs font-semibold mb-6">Explore</h4>
            <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest font-light">
              <li><Link href="#collection" className="hover:text-terra-beige transition-colors">All Products</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Skincare</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Grooming</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Kits</Link></li>
            </ul>
          </div>

          {/* Column 3: Links - Brand */}
          <div className="lg:col-span-2">
            <h4 className="text-terra-beige uppercase tracking-[0.2em] text-xs font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest font-light">
              <li><Link href="#about" className="hover:text-terra-beige transition-colors">Our Philosophy</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-terra-beige transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Links - Social */}
          <div className="lg:col-span-2">
            <h4 className="text-terra-beige uppercase tracking-[0.2em] text-xs font-semibold mb-6">Connect</h4>
            <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest font-light">
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Vimeo</Link></li>
              <li><Link href="#" className="hover:text-terra-beige transition-colors">Pinterest</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-white/20 text-[10px] uppercase tracking-[0.3em] font-light">
          <p>© {new Date().getFullYear()} TERRA Man&apos;s Co. All rights reserved.</p>
          
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-terra-beige transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-terra-beige transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
