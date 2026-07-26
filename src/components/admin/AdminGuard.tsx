"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { ShieldAlert, ShieldCheck, KeyRound, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, openAuthModal } = useAuth();
  const [devEmail, setDevEmail] = useState("nikhil18981@gmail.com");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"initial" | "otp">("initial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isAdmin = user && (user.email.toLowerCase() === "nikhil18981@gmail.com" || user.role === "admin");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devEmail) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: devEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("otp");
      } else {
        setErrorMsg(data.error || "Failed to send authorization code.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: devEmail, otp: otpCode }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
      } else {
        setErrorMsg(data.error || "Invalid verification code.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f4f0ea] flex flex-col items-center justify-center p-6 font-sans">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-9 h-9 text-terra-gold animate-spin" />
          <p className="text-sm font-mono uppercase tracking-[0.25em] text-white/70 font-medium">Authenticating TERRA Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f4f0ea] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-terra-bronze/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-lg w-full bg-[#121214]/95 backdrop-blur-2xl border border-white/15 p-9 rounded-2xl shadow-2xl relative z-10 space-y-7">
          {/* Header Icon */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-terra-bronze/20 border border-terra-bronze/50 flex items-center justify-center text-terra-gold shadow-lg">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-terra-gold font-bold">Restricted Access</span>
              <h2 className="text-3xl font-serif text-white tracking-wide font-medium">TERRA Admin Portal</h2>
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              This portal is restricted to authorized personnel. In development mode, access is enabled for{" "}
              <span className="text-terra-gold font-mono font-semibold underline decoration-terra-bronze">nikhil18981@gmail.com</span>.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-rose-950/50 border border-rose-500/40 text-rose-200 text-sm p-3.5 rounded-xl text-center font-medium">
              {errorMsg}
            </div>
          )}

          {step === "initial" ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70 block font-mono font-semibold">
                  Admin Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={devEmail}
                    onChange={(e) => setDevEmail(e.target.value)}
                    className="w-full bg-[#1a1a1e] border border-white/20 focus:border-terra-gold rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                    placeholder="nikhil18981@gmail.com"
                    required
                  />
                  <KeyRound className="w-4.5 h-4.5 text-white/40 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 font-mono"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Code...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Authenticate Admin Access
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70 block font-mono text-center font-semibold">
                  Enter 6-Digit Authorization Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-[#1a1a1e] border border-terra-gold/60 focus:border-terra-gold rounded-xl px-4 py-3.5 text-center tracking-[0.5em] font-mono text-xl text-white font-bold focus:outline-none shadow-inner"
                  placeholder="000000"
                  required
                />
                <p className="text-xs text-white/50 text-center font-mono">
                  (Check server log terminal for OTP code in development mode)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-terra-bronze to-terra-gold text-black font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 font-mono"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying Code...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Unlock Admin Dashboard
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep("initial")}
                className="w-full text-white/60 hover:text-white text-xs py-1 transition-colors text-center block font-mono"
              >
                Change Admin Email
              </button>
            </form>
          )}

          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs text-white/60 font-medium">
            <Link href="/" className="hover:text-terra-gold flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Return to Storefront
            </Link>
            <button
              onClick={() => openAuthModal()}
              className="hover:text-terra-gold transition-colors font-mono"
            >
              Sign In Modal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
