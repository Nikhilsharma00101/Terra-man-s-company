"use client";

import { useCart } from "@/components/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Check, ArrowLeft, Plus, Minus, CreditCard, Landmark, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const steps = [
  { id: "01", title: "Information", subtitle: "Your contact details" },
  { id: "02", title: "Shipping", subtitle: "Where to deliver" },
  { id: "03", title: "Payment", subtitle: "Finalize your order" }
];

export default function CheckoutPage() {
  const { items, cartTotal, updateQuantity, removeItem } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, upi, cash
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    postal: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    upiId: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      nextStep();
      return;
    }
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 3000);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] text-terra-beige flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terra-bronze/10 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Your bag is empty</h1>
          <p className="text-white/50 font-light text-base leading-relaxed">
            Select high-performance essentials from our collection to begin your checkout ritual.
          </p>
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center gap-4 border border-terra-bronze/35 px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] text-terra-beige hover:text-terra-black bg-transparent overflow-hidden rounded-sm transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Shop
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-terra-beige relative overflow-hidden font-sans selection:bg-terra-bronze/30">
      
      {/* Background visual layers */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15] mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: "url('/images/contact-bg.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-terra-bronze/5 rounded-full blur-[140px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-terra-gold/3 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        {/* Minimalist Header */}
        <header className="container mx-auto px-6 lg:px-12 py-8 flex justify-between items-center border-b border-white/5 bg-black/20 select-none">
          <Link href="/" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-[0.3em] text-xs font-semibold">Back</span>
          </Link>
          <span className="text-2xl font-serif tracking-[0.25em] text-white">TERRA</span>
          <span className="text-sm font-mono text-terra-gold/80">{steps[currentStep].id}/03</span>
        </header>

        {/* Workspace */}
        <div className="flex-grow flex items-center py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Vertical Timeline (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-12">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-mono block">
                  ORDER STATUS // PROGRESS
                </span>
                
                <div className="flex flex-row lg:flex-col gap-4 lg:gap-8 justify-between lg:justify-start">
                  {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    return (
                      <div key={step.id} className="flex-1 lg:flex-none flex items-center lg:items-start gap-4">
                        {/* Bullet indicator */}
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-sm border flex items-center justify-center font-mono text-sm transition-all duration-500 ${
                            isActive
                              ? "bg-[#121212] border-terra-bronze text-terra-gold shadow-[0_0_15px_rgba(212,163,89,0.15)]"
                              : isCompleted
                              ? "bg-terra-bronze/10 border-terra-bronze/40 text-terra-gold"
                              : "border-white/10 text-white/30"
                          }`}>
                            {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                          </div>
                        </div>

                        {/* Labels */}
                        <div className="hidden md:flex flex-col">
                          <span className={`text-sm uppercase tracking-wider font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/45'}`}>
                            {step.title}
                          </span>
                          <span className="text-xs text-white/30 font-light mt-0.5">
                            {step.subtitle}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative HUD metadata panel */}
              <div className="hidden lg:block border border-white/5 p-5 bg-[#121212]/50 backdrop-blur-md rounded-sm select-none relative">
                {/* Gold brackets */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-terra-bronze/30" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-terra-bronze/30" />
                
                <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">TERRA TRANSACTION PROTOCOL</h4>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  All transaction operations utilize standard encryption for safe data transmission.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Forms & Summary (8 Columns) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Form Container (7 Cols on medium+) */}
              <div className="md:col-span-7 relative bg-[#121212]/60 border border-white/5 p-6 sm:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                
                {/* HUD Corners */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-terra-bronze/30 pointer-events-none" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-terra-bronze/30 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-terra-bronze/30 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-terra-bronze/30 pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ type: "spring" as const, stiffness: 200, damping: 25 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-terra-bronze/10 border border-terra-bronze/35 rounded-sm flex items-center justify-center mb-6 mx-auto">
                        <Check className="w-6 h-6 text-terra-gold" />
                      </div>
                      <h2 className="text-4xl font-serif text-white tracking-tight mb-4">Order Confirmed</h2>
                      <p className="text-white/60 font-light text-base leading-relaxed max-w-sm mx-auto mb-8">
                        Thank you for your order. We have sent a confirmation email to your address with all delivery specs.
                      </p>
                      
                      <Link 
                        href="/" 
                        className="group relative flex items-center justify-center gap-3 border border-terra-bronze/35 w-full py-4 text-xs font-mono uppercase tracking-[0.25em] text-terra-beige hover:text-terra-black bg-transparent overflow-hidden rounded-sm transition-colors duration-300"
                      >
                        <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />
                        <span className="relative z-10 flex items-center gap-2 text-xs font-semibold">
                          Return to Shop <MoveRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={currentStep}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ type: "spring" as const, stiffness: 200, damping: 22 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      {/* Step 1: Info */}
                      {currentStep === 0 && (
                        <div className="space-y-8">
                          <h3 className="font-serif text-white text-xl border-b border-white/5 pb-2">Contact Details</h3>
                          
                          {/* Email Field */}
                          <div className="relative">
                            <input 
                              id="email" 
                              type="email" 
                              required 
                              value={formData.email}
                              onChange={handleInputChange}
                              className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                              placeholder="Email Address" 
                            />
                            <label 
                              htmlFor="email" 
                              className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                formData.email ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                              } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                            >
                              Email Address
                            </label>
                          </div>

                          {/* Phone Field */}
                          <div className="relative">
                            <input 
                              id="phone" 
                              type="tel" 
                              required 
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                              placeholder="Phone Number" 
                            />
                            <label 
                              htmlFor="phone" 
                              className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                formData.phone ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                              } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                            >
                              Phone Number
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Shipping */}
                      {currentStep === 1 && (
                        <div className="space-y-8">
                          <h3 className="font-serif text-white text-xl border-b border-white/5 pb-2">Delivery Address</h3>
                          
                          {/* Name Field */}
                          <div className="relative">
                            <input 
                              id="name" 
                              type="text" 
                              required 
                              value={formData.name}
                              onChange={handleInputChange}
                              className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                              placeholder="Full Name" 
                            />
                            <label 
                              htmlFor="name" 
                              className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                formData.name ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                              } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                            >
                              Full Name
                            </label>
                          </div>

                          {/* Address Field */}
                          <div className="relative">
                            <input 
                              id="address" 
                              type="text" 
                              required 
                              value={formData.address}
                              onChange={handleInputChange}
                              className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                              placeholder="Street Address" 
                            />
                            <label 
                              htmlFor="address" 
                              className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                formData.address ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                              } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                            >
                              Street Address
                            </label>
                          </div>

                          {/* City & Postal */}
                          <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                              <input 
                                id="city" 
                                type="text" 
                                required 
                                value={formData.city}
                                onChange={handleInputChange}
                                className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                                placeholder="City" 
                              />
                              <label 
                                htmlFor="city" 
                                className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                  formData.city ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                                } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                              >
                                City
                              </label>
                            </div>

                            <div className="relative">
                              <input 
                                id="postal" 
                                type="text" 
                                required 
                                value={formData.postal}
                                onChange={handleInputChange}
                                className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                                placeholder="Postal Code" 
                              />
                              <label 
                                htmlFor="postal" 
                                className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                  formData.postal ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                                } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                              >
                                Postal Code
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Payment */}
                      {currentStep === 2 && (
                        <div className="space-y-8">
                          <h3 className="font-serif text-white text-xl border-b border-white/5 pb-2">Payment Method</h3>
                          
                          {/* Payment tabs */}
                          <div className="grid grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("card")}
                              className={`p-3 border rounded-sm flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 focus:outline-none ${
                                paymentMethod === "card"
                                  ? "border-terra-bronze bg-white/5 text-white"
                                  : "border-white/5 text-white/40 hover:border-white/10 hover:text-white/60"
                              }`}
                            >
                              <CreditCard className="w-5 h-5" />
                              <span className="text-xs uppercase tracking-wider">Card</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("upi")}
                              className={`p-3 border rounded-sm flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 focus:outline-none ${
                                paymentMethod === "upi"
                                  ? "border-terra-bronze bg-white/5 text-white"
                                  : "border-white/5 text-white/40 hover:border-white/10 hover:text-white/60"
                              }`}
                            >
                              <Landmark className="w-5 h-5" />
                              <span className="text-xs uppercase tracking-wider">UPI</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("cash")}
                              className={`p-3 border rounded-sm flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 focus:outline-none ${
                                paymentMethod === "cash"
                                  ? "border-terra-bronze bg-white/5 text-white"
                                  : "border-white/5 text-white/40 hover:border-white/10 hover:text-white/60"
                              }`}
                            >
                              <Truck className="w-5 h-5" />
                              <span className="text-xs uppercase tracking-wider">COD</span>
                            </button>
                          </div>

                          {/* Render method inputs */}
                          <div className="pt-2">
                            {paymentMethod === "card" && (
                              <div className="space-y-6">
                                <div className="relative">
                                  <input 
                                    id="cardNumber" 
                                    type="text" 
                                    required 
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                                    placeholder="Card Number" 
                                  />
                                  <label 
                                    htmlFor="cardNumber" 
                                    className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                      formData.cardNumber ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                                    } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                                  >
                                    Card Number
                                  </label>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="relative">
                                    <input 
                                      id="expiry" 
                                      type="text" 
                                      required 
                                      value={formData.expiry}
                                      onChange={handleInputChange}
                                      className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                                      placeholder="MM/YY" 
                                    />
                                    <label 
                                      htmlFor="expiry" 
                                      className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                        formData.expiry ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                                      } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                                    >
                                      Expiry Date
                                    </label>
                                  </div>

                                  <div className="relative">
                                    <input 
                                      id="cvc" 
                                      type="text" 
                                      required 
                                      value={formData.cvc}
                                      onChange={handleInputChange}
                                      className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                                      placeholder="CVC" 
                                    />
                                    <label 
                                      htmlFor="cvc" 
                                      className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                        formData.cvc ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                                      } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                                    >
                                      CVC
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}

                            {paymentMethod === "upi" && (
                              <div className="relative">
                                <input 
                                  id="upiId" 
                                  type="text" 
                                  required 
                                  value={formData.upiId}
                                  onChange={handleInputChange}
                                  className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-terra-gold transition-colors placeholder-transparent text-base font-serif" 
                                  placeholder="UPI ID" 
                                />
                                <label 
                                  htmlFor="upiId" 
                                  className={`absolute left-0 transition-all pointer-events-none uppercase tracking-wider ${
                                    formData.upiId ? '-top-4 text-white/50 text-[10px]' : 'top-3 text-white/40 text-sm'
                                  } peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-terra-gold`}
                                >
                                  UPI ID
                                </label>
                              </div>
                            )}

                            {paymentMethod === "cash" && (
                              <p className="text-white/50 text-sm font-light leading-relaxed">
                                Cash on delivery options are active. Pay upon receipt of order.
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Navigation Panel */}
                      <div className="flex justify-between items-center pt-6 border-t border-white/5 select-none">
                        {currentStep > 0 ? (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-2 group cursor-pointer focus:outline-none"
                          >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                            <span>Return</span>
                          </button>
                        ) : (
                          <div />
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative flex items-center justify-center gap-3 border border-terra-bronze/35 px-6 py-3 cursor-pointer bg-transparent overflow-hidden rounded-sm transition-all duration-300 hover:text-terra-black focus:outline-none disabled:opacity-50"
                        >
                          <span className="absolute inset-0 bg-terra-beige -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />
                          
                          {isSubmitting ? (
                            <span className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
                              <span className="w-3.5 h-3.5 border border-terra-black border-t-transparent rounded-full animate-spin" />
                              Processing
                            </span>
                          ) : (
                            <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.2em]">
                              {currentStep === steps.length - 1 ? `Confirm ₹${cartTotal.toLocaleString("en-IN")}` : "Continue"}
                            </span>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary Panel (5 Cols on medium+) */}
              <div className="md:col-span-5 md:sticky md:top-12">
                <div className="relative bg-[#121212]/30 border border-white/5 p-6 rounded-sm backdrop-blur-sm">
                  {/* Subtle HUD style line */}
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-terra-bronze/40 to-transparent" />
                  
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-mono block mb-5">
                    INDEX // ITEMS
                  </span>
                  
                  {/* Scrollable list */}
                  <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar border-b border-white/5 pb-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center group relative">
                        
                        {/* Remove item button for quick edits */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="absolute -top-1 -right-1 p-0.5 bg-black/80 hover:bg-red-950/80 border border-white/10 hover:border-red-400/20 text-white/40 hover:text-red-400 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Plus className="w-3.5 h-3.5 rotate-45" />
                        </button>

                        <div className="relative w-14 h-20 bg-black rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover opacity-80"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-16">
                          <div>
                            <h4 className="font-serif text-white text-sm leading-tight line-clamp-1">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 select-none">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center border border-white/10 rounded-sm hover:bg-white/5 transition-all text-white/40 hover:text-white cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs text-white font-mono w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center border border-white/10 rounded-sm hover:bg-white/5 transition-all text-white/40 hover:text-white cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                          <span className="text-white/60 text-xs font-mono">₹{item.price.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Totals */}
                  <div className="space-y-3 pt-5 text-xs uppercase tracking-wider text-white/50">
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span className="text-white font-mono">₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Delivery</span>
                      <span className="text-terra-gold font-mono">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-white border-t border-white/5 pt-4 mt-4 select-none">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="text-2xl font-serif text-terra-gold">₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Minimalist Footer */}
        <footer className="container mx-auto px-6 lg:px-12 py-8 flex justify-between items-center border-t border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono select-none bg-black/25">
          <span>© 2026 TERRA</span>
          <span className="hidden md:inline">Standard terms</span>
          <span>Shift Perspective</span>
        </footer>
      </div>
    </div>
  );
}
