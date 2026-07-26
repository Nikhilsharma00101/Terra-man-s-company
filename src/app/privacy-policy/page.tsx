"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Footer } from "@/components/sections/Footer";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Cookie,
  Search,
  Printer,
  Share2,
  Check,
  ChevronRight,
  FileText,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Mail,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PolicySection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  content: React.ReactNode;
}

export default function PrivacyPolicyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("section-1");
  const [copied, setCopied] = useState(false);

  // Sections data
  const sections: PolicySection[] = [
    {
      id: "section-1",
      number: "01",
      title: "Introduction & Commitment to Privacy",
      subtitle: "Our philosophy on handling your personal information",
      summary: "TERRA Man's Co. operates with complete transparency and respect for your personal data.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            Welcome to <strong className="text-white font-serif font-normal">TERRA Man&apos;s Co.</strong> (&quot;TERRA&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to safeguarding your privacy and protecting the personal information you entrust to us when visiting our website, exploring our formulation store, or purchasing our premium grooming products.
          </p>
          <p>
            This Privacy Policy outlines how we collect, utilize, store, share, and protect your data. By accessing our platform or utilizing our services, you acknowledge and agree to the practices described herein. If you do not agree with any terms of this policy, please refrain from submitting personal information or using our services.
          </p>
          <div className="p-4 bg-[#161616] border-l-2 border-terra-gold rounded-r text-xs text-white/80 font-mono">
            <strong>Key Note:</strong> We hold ourselves to international standards of data ethics. We never sell your personal data or grooming preferences to third-party data brokers or advertising networks.
          </div>
        </div>
      ),
    },
    {
      id: "section-2",
      number: "02",
      title: "Information We Collect",
      subtitle: "Categories of data gathered during your interaction",
      summary: "We collect information you explicitly provide and automated technical telemetry.",
      content: (
        <div className="space-y-6 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            To deliver an exceptional experience, process orders, and continuously refine our grooming formulations, we collect information across several channels:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#141414] border border-white/5 p-4 rounded">
              <h4 className="font-serif text-white text-base mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terra-gold" /> Personal Identifiers
              </h4>
              <p className="text-xs text-white/60">
                Full name, email address, mobile phone number, shipping address, and billing address provided during checkout, account setup, or newsletter subscription.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/5 p-4 rounded">
              <h4 className="font-serif text-white text-base mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terra-bronze" /> Transaction Records
              </h4>
              <p className="text-xs text-white/60">
                Order history, items purchased, payment status, invoice details, delivery tracking logs, and customer support communications.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/5 p-4 rounded">
              <h4 className="font-serif text-white text-base mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terra-gold" /> Account Credentials
              </h4>
              <p className="text-xs text-white/60">
                Authentication tokens, encrypted password hashes, saved wishlist items, and account preferences managed within your member profile.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/5 p-4 rounded">
              <h4 className="font-serif text-white text-base mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terra-bronze" /> Automated Telemetry
              </h4>
              <p className="text-xs text-white/60">
                IP address, browser type, device information, operating system, referring URLs, time zone settings, and page interaction timestamps.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "section-3",
      number: "03",
      title: "How We Use Your Information",
      subtitle: "Legitimate grounds and purposes for data processing",
      summary: "Data is used strictly to fulfill orders, support users, and refine formulas.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            We process your personal information only when legally permissible and necessary for our legitimate business operations. Specifically:
          </p>
          <ul className="space-y-3 list-none pl-0">
            <li className="flex items-start gap-3 bg-[#141414] p-3.5 rounded border border-white/5">
              <Check className="w-4 h-4 text-terra-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block">Order Fulfillment & Logistics</strong>
                Processing transactions, dispatching packages, dispatching SMS/email tracking alerts, and managing returns or replacements.
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#141414] p-3.5 rounded border border-white/5">
              <Check className="w-4 h-4 text-terra-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block">Customer Care & Advisory</strong>
                Responding to product inquiries, ingredient suitability questions, support tickets, and order modifications.
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#141414] p-3.5 rounded border border-white/5">
              <Check className="w-4 h-4 text-terra-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block">Direct Communications & Ritual Updates</strong>
                Sending promotional updates, new release announcements, and care tips—only if you have opted in to receive them.
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#141414] p-3.5 rounded border border-white/5">
              <Check className="w-4 h-4 text-terra-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block">Platform Security & Fraud Protection</strong>
                Verifying member access, detecting fraudulent transactions, preventing unauthorized breaches, and maintaining system integrity.
              </div>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "section-4",
      number: "04",
      title: "Data Sharing & Third-Party Processors",
      subtitle: "Strictly audited service partners who assist our operations",
      summary: "We share data only with essential payment, shipping, and infrastructure partners.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            We do not sell, lease, or commercialize your personal information to third parties. We share data solely with trusted service providers bound by strict confidentiality and security agreements:
          </p>
          <div className="space-y-3">
            <div className="border border-white/10 p-4 rounded bg-[#121212]">
              <div className="text-terra-beige font-mono text-xs uppercase font-bold tracking-wider mb-1">
                Payment Gateways & Financial Institutions
              </div>
              <p className="text-xs text-white/60">
                Payment details (credit cards, UPI, net banking) are processed directly by PCI-DSS certified gateway partners (such as Razorpay, Stripe, or Cashfree). TERRA never stores raw payment card numbers on our servers.
              </p>
            </div>

            <div className="border border-white/10 p-4 rounded bg-[#121212]">
              <div className="text-terra-beige font-mono text-xs uppercase font-bold tracking-wider mb-1">
                Logistics & Courier Fulfillment Partners
              </div>
              <p className="text-xs text-white/60">
                Shipping information (recipient name, address, telephone number) is shared with authorized courier networks (e.g. BlueDart, Delhivery, DHL) solely for package delivery.
              </p>
            </div>

            <div className="border border-white/10 p-4 rounded bg-[#121212]">
              <div className="text-terra-beige font-mono text-xs uppercase font-bold tracking-wider mb-1">
                Cloud Infrastructure & Analytics
              </div>
              <p className="text-xs text-white/60">
                Secure cloud databases (MongoDB Atlas) and email notification engines (Nodemailer, Resend) facilitate platform uptime and transactional emails.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "section-5",
      number: "05",
      title: "Data Security & Technical Protocols",
      subtitle: "Safeguards implemented to protect your records",
      summary: "256-bit encryption, TLS 1.3 in transit, and role-based database access.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            We deploy robust administrative, technical, and physical safeguards designed to prevent unauthorized access, disclosure, alteration, or destruction of your personal data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="bg-[#161616] p-4 border border-white/5 rounded">
              <div className="text-terra-gold font-mono text-xs uppercase font-bold mb-1">TLS 1.3 & HTTPS</div>
              <p className="text-xs text-white/60">All communications between your browser and our servers are encrypted via HTTPS with modern cipher suites.</p>
            </div>
            <div className="bg-[#161616] p-4 border border-white/5 rounded">
              <div className="text-terra-gold font-mono text-xs uppercase font-bold mb-1">Database Encryption</div>
              <p className="text-xs text-white/60">Stored user credentials, JWT tokens, and account information use salted hashes and AES-256 database storage encryption.</p>
            </div>
          </div>
          <p className="text-xs text-white/50 italic">
            While no method of internet transmission or electronic storage is 100% immune, we continuously audit our infrastructure to adhere to modern security standards.
          </p>
        </div>
      ),
    },
    {
      id: "section-6",
      number: "06",
      title: "Your Data Rights & Choices",
      subtitle: "Empowering you to inspect, amend, or delete your profile",
      summary: "You hold full rights to view, export, modify, or permanently erase your data.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            Depending on your jurisdiction, you possess specific legal rights regarding your personal records:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="font-mono text-terra-gold text-xs font-bold shrink-0 mt-0.5">[ACCESS]</span>
              <div>
                <strong className="text-white font-medium">Right to Access & Portability:</strong> You may request a copy of the personal data we hold about you at any time in a structured, machine-readable format.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-terra-gold text-xs font-bold shrink-0 mt-0.5">[RECTIFY]</span>
              <div>
                <strong className="text-white font-medium">Right to Rectification:</strong> You may update inaccurate or incomplete profile details via your member dashboard or by contacting our team.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-terra-gold text-xs font-bold shrink-0 mt-0.5">[ERASE]</span>
              <div>
                <strong className="text-white font-medium">Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request the permanent deletion of your account and personal identifiers, subject to legal tax retention duties.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-terra-gold text-xs font-bold shrink-0 mt-0.5">[OPT-OUT]</span>
              <div>
                <strong className="text-white font-medium">Right to Opt-Out:</strong> Unsubscribe from marketing emails instantly using the &quot;Unsubscribe&quot; link in any newsletter or by managing preferences.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "section-7",
      number: "07",
      title: "Cookies & Tracking Technologies",
      subtitle: "How we use cookies to personalize your grooming experience",
      summary: "Essential session cookies keep your cart active; zero intrusive tracker scripts.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            Cookies are small text files placed on your device to ensure seamless navigation, remember your cart items, and provide aggregated analytics.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-terra-beige font-mono uppercase tracking-wider">
                  <th className="py-2.5 px-3">Cookie Type</th>
                  <th className="py-2.5 px-3">Purpose</th>
                  <th className="py-2.5 px-3">Lifespan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                <tr>
                  <td className="py-3 px-3 text-white font-medium">Strictly Essential</td>
                  <td className="py-3 px-3 text-white/60">Stores authentication tokens, cart items, and session security state.</td>
                  <td className="py-3 px-3 text-white/50 font-mono">Session / 30 Days</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-white font-medium">Functional Preferences</td>
                  <td className="py-3 px-3 text-white/60">Remembers currency, language, and custom filter choices.</td>
                  <td className="py-3 px-3 text-white/50 font-mono">1 Year</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-white font-medium">Performance Analytics</td>
                  <td className="py-3 px-3 text-white/60">Provides aggregated traffic statistics to optimize website performance.</td>
                  <td className="py-3 px-3 text-white/50 font-mono">90 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-white/50">
            You can modify your browser settings to decline non-essential cookies. However, disabling essential cookies may affect cart and checkout operations.
          </p>
        </div>
      ),
    },
    {
      id: "section-8",
      number: "08",
      title: "Data Retention Policy",
      subtitle: "Timelines for storing and archiving user information",
      summary: "Data is retained as long as your account is active, plus statutory audit periods.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including satisfying legal, accounting, tax, or regulatory reporting requirements.
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs text-white/70">
            <li><strong>Active Profiles:</strong> Retained while your account remains active or until you request account deletion.</li>
            <li><strong>Order & Tax Logs:</strong> Purchase records and financial invoices are retained for up to 7 years in accordance with applicable tax and statutory obligations.</li>
            <li><strong>Support Correspondence:</strong> General inquiry logs are automatically purged after 24 months.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "section-9",
      number: "09",
      title: "Protection of Minors",
      subtitle: "Age requirements for placing orders and submitting data",
      summary: "Our platform and formulas are designed strictly for adults aged 18 and above.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            TERRA Man&apos;s Co. products, services, and online channels are intended exclusively for individuals aged 18 or older. We do not knowingly collect or solicit personal information from individuals under the age of 18.
          </p>
          <p>
            If we learn that we have inadvertently collected personal data from a minor without verifiable parental consent, we will promptly delete that information from our servers. If you believe a minor has provided us with personal data, please contact us immediately at <a href="mailto:support@terraman.co" className="text-terra-gold hover:underline font-mono">support@terraman.co</a>.
          </p>
        </div>
      ),
    },
    {
      id: "section-10",
      number: "10",
      title: "Policy Amendments & Contact Information",
      subtitle: "How updates are published and how to reach our Privacy Officer",
      summary: "Updates are published here with a revised date stamp. Reach out for any inquiries.",
      content: (
        <div className="space-y-4 text-white/70 font-sans text-sm leading-relaxed">
          <p>
            We may periodically update this Privacy Policy to reflect formula additions, operational changes, or new regulatory requirements. Any modifications will be posted on this page with an updated &quot;Effective Date&quot;. We encourage you to review this policy periodically.
          </p>

          <div className="bg-[#141414] border border-terra-bronze/30 p-6 rounded relative overflow-hidden mt-6">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-terra-bronze pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-terra-bronze pointer-events-none" />

            <h4 className="font-serif text-white text-lg mb-2">Privacy & Legal Operations Office</h4>
            <p className="text-xs text-white/60 mb-4 font-sans">
              For any questions regarding your data, privacy rights, or to submit a formal erasure request:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-terra-gold shrink-0" />
                <span>Email: <a href="mailto:support@terraman.co" className="text-terra-gold hover:underline">support@terraman.co</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-terra-gold shrink-0" />
                <span>Hours: Mon – Fri, 10:00 – 18:00 IST</span>
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
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-terra-bronze/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-terra-gold/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Workspace Container */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-36 pb-24 lg:pt-44 lg:pb-32 flex-grow max-w-7xl">
        
        {/* Editorial Hero Header */}
        <div className="space-y-6 mb-16 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-terra-gold bg-terra-bronze/20 px-3 py-1 rounded border border-terra-bronze/30 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-terra-gold" /> Legal &amp; Compliance Dossier
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
                title="Print Policy"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.08]">
            Privacy Policy &amp;<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-beige via-terra-gold to-terra-bronze">
              Data Stewardship.
            </span>
          </h1>

          <p className="text-white/70 max-w-2xl text-base sm:text-lg font-light leading-relaxed font-sans">
            How TERRA Man&apos;s Co. collects, protects, and handles your personal information. Designed around absolute transparency, zero data monetization, and complete user control.
          </p>
        </div>

        {/* Key Guarantees at a Glance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">Zero Data Selling</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              Your data is never sold, traded, or leased to third-party advertisers or data brokers.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">256-bit SSL Security</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              All transactions and stored database fields utilize enterprise-grade encryption standard.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <UserCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">Full User Control</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              Request complete data export or account erasure at any time via support services.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-5 rounded relative group hover:border-terra-bronze/40 transition-colors">
            <div className="w-9 h-9 border border-terra-bronze/30 rounded flex items-center justify-center text-terra-gold mb-3 bg-[#161616]">
              <Cookie className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-serif text-white text-base mb-1">Transparent Cookies</h3>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              Zero cross-site tracker scripts. Strictly essential session cookies for checkout operation.
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
              placeholder="Search policy terms (e.g. cookies, encryption, deletion)..."
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
                  <FileText className="w-3.5 h-3.5" /> Policy Navigation
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
                  Contact Support <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed Legal Policy Sections */}
          <div className="lg:col-span-8 space-y-10">
            {filteredSections.length === 0 ? (
              <div className="bg-[#121212] border border-white/10 p-12 text-center rounded space-y-4">
                <HelpCircle className="w-10 h-10 text-white/20 mx-auto" />
                <h3 className="font-serif text-white text-xl">No matching policy clauses found</h3>
                <p className="text-xs text-white/50 max-w-sm mx-auto font-sans">
                  We couldn&apos;t find any terms matching &quot;{searchQuery}&quot;. Try searching for general terms like &quot;cookies&quot;, &quot;security&quot;, or &quot;erasure&quot;.
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
