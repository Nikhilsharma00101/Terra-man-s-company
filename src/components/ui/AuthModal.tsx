"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ShieldCheck, ArrowRight, Loader2, RefreshCw, KeyRound, CheckCircle2 } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, setUser } = useAuth();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [devOtpCode, setDevOtpCode] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthModalOpen]);

  // Resend timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  if (!isAuthModalOpen) return null;

  const resetModal = () => {
    setStep("email");
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setDevOtpCode(null);
    setErrorMsg(null);
    setSuccessMsg(null);
    closeAuthModal();
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send verification code.");
      }

      setStep("otp");
      setResendTimer(60);
      if (data.devOtp) {
        setDevOtpCode(data.devOtp);
      }
      setSuccessMsg(`Authorization code sent to ${email}`);

      // Auto focus first OTP input after step switch
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send code.";
      setErrorMsg(msg);
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMsg(null);

    // Auto advance focus to next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs[5].current?.focus();
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit authorization code.");
      return;
    }

    setIsVerifying(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid or expired authorization code.");
      }

      setUser(data.user);
      setSuccessMsg("Authorization verified. Welcome to Terra.");

      setTimeout(() => {
        resetModal();
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification failed.";
      setErrorMsg(msg);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetModal}
          className="absolute inset-0 bg-[#060606]/85 backdrop-blur-md"
        />

        {/* HUD Glass Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-sm p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 text-terra-beige"
        >
          {/* Subtle Background Glows & Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0 opacity-40" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-terra-bronze/10 rounded-full blur-[90px] pointer-events-none z-0" />

          {/* HUD Corner Brackets */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-terra-bronze/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-terra-bronze/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-terra-bronze/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-terra-bronze/40 pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={resetModal}
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-2 rounded-full z-20 focus:outline-none"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="relative z-10 mb-8 select-none">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-terra-bronze font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Terra Security Portal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              {step === "email" ? "Member Authorization" : "Enter Verification Code"}
            </h2>
            <p className="text-xs text-white/60 font-sans mt-2 leading-relaxed">
              {step === "email"
                ? "Enter your email to receive a single-use authorization code."
                : `Enter the 6-digit authorization code sent to ${email}.`}
            </p>
          </div>

          {/* Status Banners */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 mb-6 p-3.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5"
            >
              <X className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 mb-6 p-3.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* Dev Mode OTP Banner (for instant testing convenience) */}
          {devOtpCode && step === "otp" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 mb-6 p-4 rounded bg-terra-bronze/10 border border-terra-bronze/40 text-terra-beige text-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-terra-gold shrink-0" />
                <span>
                  <strong className="text-white">Dev Mode OTP Code:</strong>{" "}
                  <span className="font-mono text-terra-gold text-sm tracking-widest font-bold ml-1">
                    {devOtpCode}
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOtp(devOtpCode.split(""));
                }}
                className="text-[10px] uppercase tracking-wider text-terra-gold hover:underline underline-offset-2 ml-2"
              >
                Auto-fill
              </button>
            </motion.div>
          )}

          {/* STEP 1: EMAIL FORM */}
          {step === "email" && (
            <form onSubmit={handleSendOtp} className="space-y-6 relative z-10">
              <div className="relative">
                <div className="absolute left-0 top-3.5 text-white/40 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="auth-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/15 pl-7 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-sm"
                  placeholder="Email Address"
                />
                <label
                  htmlFor="auth-email"
                  className="absolute left-7 top-3 text-white/40 text-xs uppercase tracking-wider transition-all pointer-events-none
                  peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 
                  peer-focus:-top-4 peer-focus:text-xs peer-focus:text-terra-gold peer-focus:left-0
                  peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/50 peer-valid:left-0"
                >
                  Email Address
                </label>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full relative flex items-center justify-center gap-3 border border-terra-bronze/40 group/btn cursor-pointer bg-transparent overflow-hidden rounded-sm transition-colors duration-300 hover:text-terra-black disabled:opacity-50"
              >
                <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover/btn:translate-x-0 transition-transform duration-400 ease-out z-0" />
                <span className="relative z-10 py-4 uppercase tracking-[0.25em] text-xs font-semibold flex items-center gap-2">
                  {isSending ? (
                    <>
                      Sending Code <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Request Code <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>
            </form>
          )}

          {/* STEP 2: OTP INPUT FORM */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 relative z-10">
              
              {/* 6 Digit Split Input Boxes */}
              <div className="flex justify-between items-center gap-2 sm:gap-3 py-2" onPaste={handlePaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 sm:w-14 h-12 sm:h-14 bg-[#181818] border border-white/15 focus:border-terra-gold rounded text-center text-xl sm:text-2xl font-mono text-white focus:outline-none transition-colors shadow-inner"
                  />
                ))}
              </div>

              {/* Submit Verification Code Button */}
              <button
                type="submit"
                disabled={isVerifying || otp.join("").length !== 6}
                className="w-full relative flex items-center justify-center gap-3 border border-terra-bronze/40 group/btn cursor-pointer bg-transparent overflow-hidden rounded-sm transition-colors duration-300 hover:text-terra-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover/btn:translate-x-0 transition-transform duration-400 ease-out z-0" />
                <span className="relative z-10 py-4 uppercase tracking-[0.25em] text-xs font-semibold flex items-center gap-2">
                  {isVerifying ? (
                    <>
                      Verifying Code <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Authorize & Enter <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>

              {/* Auxiliary links: Resend & Change Email */}
              <div className="flex items-center justify-between text-[11px] text-white/50 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="hover:text-terra-beige transition-colors uppercase tracking-wider"
                >
                  Change Email
                </button>

                <button
                  type="button"
                  disabled={resendTimer > 0 || isSending}
                  onClick={handleSendOtp}
                  className="flex items-center gap-1.5 hover:text-terra-beige transition-colors uppercase tracking-wider disabled:opacity-40"
                >
                  <RefreshCw className={`w-3 h-3 ${isSending ? "animate-spin" : ""}`} />
                  {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend Code"}
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
