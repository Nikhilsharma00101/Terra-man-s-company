"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/sections/Footer";
import {
  Scale,
  ShieldAlert,
  FileCheck,
  RotateCcw,
  Search,
  Printer,
  Share2,
  Check,
  FileText,
  HelpCircle,
  Clock,
  ArrowUpRight,
  Mail,
  X,
  AlertTriangle,
  Award
} from "lucide-react";
import Link from "next/link";

interface TermsSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  content: React.ReactNode;
}

export default function TermsOfServicePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("section-1");
  const [copied, setCopied] = useState(false);

  // Sections data
  const sections: TermsSection[] = [
    {
      id: "section-1",
      number: "01",
      title: "Acceptance of Terms & Eligibility",
      subtitle: "The legal foundation governing your use of our platform",
      summary: "Using our website or purchasing products constitutes full acceptance of these binding terms.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding contract between you (&quot;User&quot;, &quot;Customer&quot;, or &quot;You&quot;) and <strong className="text-white font-serif font-normal">TERRA Man&apos;s Co.</strong> (&quot;TERRA&quot;, &quot;Company&quot;, &quot;We&quot;, or &quot;Us&quot;).
          </p>
          <p>
            By accessing our store, creating a member profile, or placing an order for our grooming formulations, you affirm that you are at least 18 years of age and legally competent to enter into this agreement. If you are accessing the platform on behalf of an entity, you warrant that you hold authorized power to bind that entity.
          </p>
          <div className="p-4 bg-[#161616] border-l-2 border-terra-gold rounded-r text-xs text-white/80 font-mono">
            <strong>Important Notice:</strong> If you do not agree with all terms set forth in this document, you are strictly prohibited from using this website or placing orders for TERRA formulations.
          </div>
        </div>
      ),
    },
    {
      id: "section-2",
      number: "02",
      title: "Account Registration & Security",
      subtitle: "Your responsibilities regarding credentials and access",
      summary: "Maintain password secrecy and notify us immediately of any unauthorized access.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            To access certain features—such as tracking order history, managing saved wishlists, or receiving member rewards—you may register an account using a valid email address and password.
          </p>
          <div className="space-y-3">
            <div className="bg-[#141414] border border-white/5 p-4 rounded">
              <h4 className="font-serif text-white text-base mb-1">Credential Confidentiality</h4>
              <p className="text-xs text-white/60">
                You are solely responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account.
              </p>
            </div>
            <div className="bg-[#141414] border border-white/5 p-4 rounded">
              <h4 className="font-serif text-white text-base mb-1">Unauthorized Access Notification</h4>
              <p className="text-xs text-white/60">
                You agree to notify TERRA immediately at <a href="mailto:support@terraman.co" className="text-terra-gold hover:underline font-mono">support@terraman.co</a> upon discovering any security breach or unauthorized usage of your account.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "section-3",
      number: "03",
      title: "Product Information & Availability",
      subtitle: "Formulation specs, handcrafted batches, and pricing integrity",
      summary: "We strive for precision in product listings; prices and availability may change.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            TERRA Man&apos;s Co. formulates high-grade grooming products crafted with botanical extracts and active compounds. While we take meticulous care to ensure descriptions, ingredient lists, bottle volumes, and imagery are accurate:
          </p>
          <ul className="space-y-2 list-disc list-inside text-xs text-white/70">
            <li><strong>Batch Variations:</strong> Natural botanical extracts may exhibit slight variations in hue, texture, or scent across production batches without altering efficacy.</li>
            <li><strong>Price Revisions:</strong> Prices are displayed in Indian Rupees (INR) inclusive of applicable taxes unless stated otherwise. We reserve the right to revise pricing at any time prior to order confirmation.</li>
            <li><strong>Quantity Limits:</strong> We reserve the right to restrict purchase quantities per account or order to prevent commercial resale without authorized distributor agreements.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "section-4",
      number: "04",
      title: "Orders, Payments & Billing",
      subtitle: "Transaction authorization and checkout verification",
      summary: "Full payment is required prior to order dispatch; orders may be canceled for fraud checks.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            Placing an order constitutes an offer to purchase products under these Terms. All orders are subject to acceptance and inventory verification by TERRA.
          </p>
          <div className="space-y-3">
            <div className="border border-white/10 p-4 rounded bg-[#121212]">
              <div className="text-terra-beige font-mono text-xs uppercase font-bold tracking-wider mb-1">
                Accepted Payment Channels
              </div>
              <p className="text-xs text-white/60">
                We accept major Credit/Debit cards (Visa, MasterCard, Amex), UPI payment methods, Net Banking, and verified Digital Wallets. Payments are processed securely via PCI-DSS compliant gateways.
              </p>
            </div>

            <div className="border border-white/10 p-4 rounded bg-[#121212]">
              <div className="text-terra-beige font-mono text-xs uppercase font-bold tracking-wider mb-1">
                Order Refusal &amp; Fraud Holds
              </div>
              <p className="text-xs text-white/60">
                We reserve the right to decline or cancel any order flagged for potential billing discrepancy, unauthorized payment attempt, or unserviceable delivery locations.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "section-5",
      number: "05",
      title: "Shipping, Delivery & Risk of Loss",
      subtitle: "Timelines, carrier handoff, and transfer of title",
      summary: "Risk of loss passes to customer upon carrier receipt; tracking logs provided upon dispatch.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            Orders are processed and dispatched from our primary studio facility within 24 to 48 business hours following payment authorization.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
            <div className="bg-[#161616] p-4 border border-white/5 rounded">
              <div className="text-terra-gold font-mono text-xs uppercase font-bold mb-1">Estimated Delivery</div>
              <p className="text-xs text-white/60">Standard metro shipping takes 2–4 business days; remote areas take 5–7 business days.</p>
            </div>
            <div className="bg-[#161616] p-4 border border-white/5 rounded">
              <div className="text-terra-gold font-mono text-xs uppercase font-bold mb-1">Transfer of Risk</div>
              <p className="text-xs text-white/60">Title and risk of loss for purchased products transfer to the customer upon handoff to the courier carrier.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "section-6",
      number: "06",
      title: "Returns, Refunds & Hygiene Policy",
      subtitle: "14-day return window for unopened items; hygiene safety standards",
      summary: "Unopened products returnable within 14 days; opened grooming items non-returnable due to hygiene.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            Due to the personal hygiene nature of skincare and grooming formulations, strict safety guidelines govern our return and refund process:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-[#141414] p-4 rounded border border-emerald-500/20">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block">Eligible Returns (14 Days)</strong>
                Unopened, unused products in original factory tamper-sealed packaging are eligible for full refund or store exchange within 14 days of delivery.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#141414] p-4 rounded border border-rose-500/20">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block">Non-Returnable Opened Items</strong>
                Products with broken safety seals, opened jars, or used pumps cannot be returned or refunded due to strict personal hygiene protocols.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#141414] p-4 rounded border border-terra-bronze/30">
              <RotateCcw className="w-5 h-5 text-terra-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block">Transit Damage Claims</strong>
                If your package arrives damaged or leaking, email photo evidence to <a href="mailto:support@terraman.co" className="text-terra-gold underline font-mono">support@terraman.co</a> within 48 hours of delivery for immediate replacement.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "section-7",
      number: "07",
      title: "Intellectual Property & Brand Rights",
      subtitle: "Trademarks, formulation patents, website content, and media",
      summary: "All imagery, formulation names, code, and graphics are exclusive property of TERRA Man's Co.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            All content published on this platform—including but not limited to brand names, logos, typography, product titles, custom formulas, text, graphic designs, photo assets, interface layouts, and source code—is the exclusive intellectual property of TERRA Man&apos;s Co. and protected by copyright and trademark laws.
          </p>
          <p className="text-xs text-white/60">
            You are granted a limited, revocable license to access the site for personal, non-commercial shopping purposes. You may not copy, reproduce, distribute, modify, or create derivative works from any content without prior explicit written authorization from TERRA.
          </p>
        </div>
      ),
    },
    {
      id: "section-8",
      number: "08",
      title: "Prohibited Uses & User Conduct",
      subtitle: "Activities strictly prohibited on our website",
      summary: "No unauthorized scraping, reverse engineering, fraud attempts, or system tampering.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>You agree not to engage in any of the following prohibited behaviors:</p>
          <ul className="space-y-2 list-disc list-inside text-xs text-white/70">
            <li>Using automated bots, scrapers, or spider scripts to extract data or place bulk orders without permission.</li>
            <li>Attempting to probe, scan, or breach system security, database firewalls, or authentication protocols.</li>
            <li>Submitting false, misleading, or fraudulent billing addresses, contact numbers, or payment tokens.</li>
            <li>Engaging in conduct that interferes with site availability or disrupts service for other members.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "section-9",
      number: "09",
      title: "Limitation of Liability & Disclaimers",
      subtitle: "Warranty disclaimers and statutory liability caps",
      summary: "Services provided 'As Is'; total liability capped at amount paid for the order in question.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            To the maximum extent permitted by applicable law, TERRA Man&apos;s Co. provides its website and products on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied.
          </p>
          <div className="p-4 bg-[#141414] border-l-2 border-terra-bronze rounded text-xs text-white/70 space-y-2">
            <p>
              <strong>Liability Cap:</strong> In no event shall TERRA, its directors, employees, or suppliers be liable for indirect, incidental, special, or consequential damages resulting from product usage or site access. Our aggregate liability shall not exceed the total price paid by you for the specific product giving rise to the claim.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "section-10",
      number: "10",
      title: "Governing Law, Disputes & Contact Info",
      subtitle: "Legal jurisdiction, arbitration procedures, and customer support",
      summary: "Governed by the laws of India; disputes subject to New Delhi courts jurisdiction.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without giving effect to any principles of conflicts of law.
          </p>
          <p>
            Any legal dispute, claim, or controversy arising out of these Terms or your use of TERRA services shall be subject to the exclusive jurisdiction of the competent courts located in <strong className="text-white font-serif font-normal">New Delhi, India</strong>.
          </p>

          <div className="bg-[#141414] border border-terra-bronze/30 p-6 rounded relative overflow-hidden mt-6">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-terra-bronze pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-terra-bronze pointer-events-none" />

            <h4 className="font-serif text-white text-lg mb-2">Legal Compliance Office</h4>
            <p className="text-xs text-white/60 mb-4 font-sans">
              For questions regarding these Terms of Service or official legal notices:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-terra-gold shrink-0" />
                <span>Email: <a href="mailto:support@terraman.co" className="text-terra-gold hover:underline">support@terraman.co</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-terra-gold shrink-0" />
                <span>Support: Mon – Fri, 10:00 – 18:00 IST</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Handle active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Filter sections by search query
  const filteredSections = sections.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(query) ||
      sec.subtitle.toLowerCase().includes(query) ||
      sec.summary.toLowerCase().includes(query) ||
      sec.number.includes(query)
    );
  });

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-terra-beige flex flex-col relative overflow-hidden selection:bg-terra-bronze/30">
      <Navbar />
      <CartDrawer />

      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 opacity-40" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-terra-bronze/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-terra-gold/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Workspace Container */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-36 pb-24 lg:pt-44 lg:pb-32 flex-grow max-w-7xl">
        
        {/* Editorial Hero Header */}
        <div className="space-y-6 mb-16 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-terra-gold bg-terra-bronze/20 px-3 py-1 rounded border border-terra-bronze/30 flex items-center gap-1.5 font-semibold">
                <Scale className="w-3.5 h-3.5 text-terra-gold" /> Terms of Service Dossier
              </span>
              <div className="w-8 h-px bg-terra-bronze/40" />
              <span className="text-white/40 text-xs font-mono uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3 text-white/30" /> Updated July 2026
              </span>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 border border-white/10 rounded text-xs font-mono text-white/70 hover:text-terra-gold hover:border-terra-gold/40 transition-colors flex items-center gap-2 bg-[#121212]"
                title="Copy Page Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied" : "Share"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 border border-white/10 rounded text-xs font-mono text-white/70 hover:text-terra-gold hover:border-terra-gold/40 transition-colors flex items-center gap-2 bg-[#121212]"
                title="Print Terms"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.08]">
            Terms of Service &amp;<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-beige via-terra-gold to-terra-bronze">
              Member Governance.
            </span>
          </h1>

          <p className="text-white/70 max-w-2xl text-base sm:text-lg font-light leading-relaxed font-sans">
            The formal agreement governing your access, formulation purchases, and member rights at TERRA Man&apos;s Co. Structured for fair commerce and complete clarity.
          </p>
        </div>

        {/* Key Highlights at a Glance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <FileCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">Age 18+ Eligibility</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              Purchases and account registrations are strictly for adult individuals.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <RotateCcw className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">14-Day Return Window</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              Unopened products in original tamper-sealed packaging eligible for full return.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <Award className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">Protected Formulations</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              All product formulas, visual media, and brand identity remain exclusive IP.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">Secure Commerce</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              PCI-DSS verified gateway processing for all order transactions.
            </p>
          </div>
        </div>

        {/* Real-time In-Page Search Bar */}
        <div className="bg-[#121212] border border-white/10 p-4 rounded-xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search terms (e.g. returns, shipping, liability, IP)..."
              className="w-full bg-[#181818] border border-white/10 rounded-lg pl-10 pr-9 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-terra-gold transition-colors font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-white/40 uppercase tracking-wider">
            Showing <span className="text-terra-gold font-bold">{filteredSections.length}</span> of {sections.length} Clauses
          </div>
        </div>

        {/* Main Content Workspace Layout: Sticky Sidebar (4 cols) + Dossier Clauses (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR: Sticky Table of Contents */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-[#121212] border border-white/10 p-6 rounded-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-terra-gold font-semibold flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Terms Navigation
                </span>
                <span className="text-[10px] font-mono text-white/40">10 Clauses</span>
              </div>

              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 hide-scrollbar">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(sec.id);
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth" });
                          setActiveSection(sec.id);
                        }
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded text-xs transition-all ${
                        isActive
                          ? "bg-terra-bronze/20 text-terra-gold font-semibold border-l-2 border-terra-gold pl-3"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-60">{sec.number}</span>
                      <span className="truncate font-sans">{sec.title}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 font-mono">
                <span>Questions?</span>
                <a href="mailto:support@terraman.co" className="text-terra-gold hover:underline flex items-center gap-1">
                  Contact Legal <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed Legal Terms Sections */}
          <div className="lg:col-span-8 space-y-10">
            {filteredSections.length === 0 ? (
              <div className="bg-[#121212] border border-white/10 p-12 text-center rounded space-y-4">
                <HelpCircle className="w-10 h-10 text-white/20 mx-auto" />
                <h3 className="font-serif text-white text-xl">No matching terms found</h3>
                <p className="text-xs text-white/50 max-w-sm mx-auto font-sans">
                  We couldn&apos;t find any terms matching &quot;{searchQuery}&quot;. Try searching for general terms like &quot;returns&quot;, &quot;shipping&quot;, or &quot;liability&quot;.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-terra-bronze/20 border border-terra-bronze/40 text-terra-gold text-xs font-mono uppercase rounded hover:bg-terra-bronze/30 transition-colors"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              filteredSections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="bg-[#121212] border border-white/10 hover:border-white/15 p-8 lg:p-10 rounded-xl relative shadow-xl transition-all duration-300 group"
                >
                  {/* Subtle Corner Accents */}
                  <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />
                  <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />
                  <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-terra-bronze/30 group-hover:border-terra-gold pointer-events-none transition-colors" />

                  {/* Section Title Header */}
                  <div className="border-b border-white/10 pb-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-terra-gold bg-terra-bronze/20 px-2 py-0.5 rounded border border-terra-bronze/30 font-bold">
                        Clause {sec.number}
                      </span>
                      <span className="text-white/40 text-xs font-sans italic">{sec.subtitle}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Body Content */}
                  {sec.content}
                </section>
              ))
            )}
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
