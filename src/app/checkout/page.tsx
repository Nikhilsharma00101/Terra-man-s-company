"use client";

import { useCart } from "@/components/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Check, Lock, ArrowLeft, Plus, Minus, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const steps = [
  { id: "01", title: "Contact", subtitle: "Your details" },
  { id: "02", title: "Shipping", subtitle: "Where to send it" },
  { id: "03", title: "Payment", subtitle: "Complete order" }
];

export default function CheckoutPage() {
  const { items, cartTotal, updateQuantity } = useCart();
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
    }, 3500);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-terra-beige flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-[#1A1A1A] to-[#0a0a0a] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terra-bronze/15 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-serif mb-4 tracking-tighter">Your cart is empty</h1>
          <p className="text-white/60 mb-12 font-light text-lg">Return to the shop and select your items.</p>
          <Link href="/" className="group inline-flex items-center gap-4 bg-transparent border border-terra-beige/30 text-terra-beige px-8 py-4 uppercase tracking-[0.3em] text-xs font-medium hover:bg-terra-beige hover:text-terra-black transition-all duration-500">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-terra-beige relative overflow-hidden font-sans">
      
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 bg-[#1A1A1A] z-0" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-terra-bronze/20 rounded-full blur-[150px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-terra-gold/15 rounded-full blur-[120px] pointer-events-none z-0" 
      />

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        {/* Header - Minimalist */}
        <header className="container mx-auto px-6 lg:px-12 py-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-[0.3em] text-xs font-medium">Back</span>
          </Link>
          <span className="text-xl font-serif tracking-[0.2em] text-terra-beige/90">TERRA</span>
          <div className="w-10 flex justify-end">
            <span className="text-sm font-mono text-terra-bronze font-semibold">{steps[currentStep].id}/03</span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-12">
            
            {/* Left Side: Step Info */}
            <div className="lg:col-span-4 hidden lg:flex flex-col justify-center h-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <span className="text-[25vw] font-serif text-white/[0.06] leading-none absolute -left-16 -top-32 select-none pointer-events-none">
                    {steps[currentStep].id}
                  </span>
                  <div className="relative z-10">
                    <span className="text-terra-bronze uppercase tracking-[0.4em] text-sm font-semibold mb-4 block">
                      Step {steps[currentStep].id}
                    </span>
                    <h2 className="text-6xl font-serif text-terra-beige mb-4 tracking-tighter leading-none">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-white/70 font-light text-lg">
                      {steps[currentStep].subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress Indicator Dots */}
              <div className="flex gap-4 mt-12">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`w-12 h-1 transition-all duration-500 ${index === currentStep ? "bg-terra-bronze" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side: The Form & Summary Area */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              
              {/* Form Container */}
              <div className="relative bg-[#222] p-8 rounded-lg border border-white/10">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center md:text-left"
                    >
                      <div className="w-16 h-16 bg-terra-bronze/20 rounded-full flex items-center justify-center mb-8 border border-terra-bronze/30 mx-auto md:mx-0">
                        <Check className="w-8 h-8 text-terra-bronze" />
                      </div>
                      <h2 className="text-5xl font-serif mb-6 leading-tight">Order<br />Confirmed.</h2>
                      <p className="text-white/70 mb-12 font-light text-base leading-relaxed max-w-md">
                        Thank you for your order. We have sent a confirmation email to your address.
                      </p>
                      <Link href="/" className="group inline-flex items-center gap-4 bg-terra-beige text-terra-black px-8 py-4 uppercase tracking-[0.3em] text-xs font-medium hover:bg-white transition-all duration-500">
                        <span>Return to Shop</span>
                        <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={currentStep}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      {/* Step 1: Contact */}
                      {currentStep === 0 && (
                        <div className="space-y-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="email">Email Address</label>
                            <input 
                              id="email" 
                              type="email" 
                              required 
                              value={formData.email}
                              onChange={handleInputChange}
                              className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                              placeholder="you@example.com" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="phone">Phone Number</label>
                            <input 
                              id="phone" 
                              type="tel" 
                              required 
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                              placeholder="+1 (555) 000-0000" 
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 2: Shipping */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="name">Full Name</label>
                            <input 
                              id="name" 
                              type="text" 
                              required 
                              value={formData.name}
                              onChange={handleInputChange}
                              className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                              placeholder="Alexander Drake" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="address">Street Address</label>
                            <input 
                              id="address" 
                              type="text" 
                              required 
                              value={formData.address}
                              onChange={handleInputChange}
                              className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                              placeholder="123 Street Name" 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="city">City</label>
                              <input 
                                id="city" 
                                type="text" 
                                required 
                                value={formData.city}
                                onChange={handleInputChange}
                                className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                                placeholder="New York" 
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="postal">Postal Code</label>
                              <input 
                                id="postal" 
                                type="text" 
                                required 
                                value={formData.postal}
                                onChange={handleInputChange}
                                className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                                placeholder="10001" 
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Payment */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          {/* Payment Method Selector */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("card")}
                              className={`p-3 border ${paymentMethod === "card" ? "border-terra-bronze bg-white/5 text-terra-beige" : "border-white/10 text-white/50"} text-xs uppercase tracking-wider font-medium text-center hover:border-terra-bronze hover:text-terra-beige transition-colors flex flex-col items-center gap-2`}
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Card</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("upi")}
                              className={`p-3 border ${paymentMethod === "upi" ? "border-terra-bronze bg-white/5 text-terra-beige" : "border-white/10 text-white/50"} text-xs uppercase tracking-wider font-medium text-center hover:border-terra-bronze hover:text-terra-beige transition-colors flex flex-col items-center gap-2`}
                            >
                              <span className="text-sm font-bold">UPI</span>
                              <span>UPI</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("cash")}
                              className={`p-3 border ${paymentMethod === "cash" ? "border-terra-bronze bg-white/5 text-terra-beige" : "border-white/10 text-white/50"} text-xs uppercase tracking-wider font-medium text-center hover:border-terra-bronze hover:text-terra-beige transition-colors flex flex-col items-center gap-2`}
                            >
                              <span className="text-sm font-bold">COD</span>
                              <span>Cash</span>
                            </button>
                          </div>

                          {/* Conditional Rendering based on paymentMethod */}
                          {paymentMethod === "card" && (
                            <div className="space-y-6">
                              <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="cardNumber">Card Number</label>
                                <input 
                                  id="cardNumber" 
                                  type="text" 
                                  required 
                                  value={formData.cardNumber}
                                  onChange={handleInputChange}
                                  className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                                  placeholder="•••• •••• •••• ••••" 
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                  <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="expiry">Expiry Date</label>
                                  <input 
                                    id="expiry" 
                                    type="text" 
                                    required 
                                    value={formData.expiry}
                                    onChange={handleInputChange}
                                    className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                                    placeholder="MM/YY" 
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="cvc">CVC</label>
                                  <input 
                                    id="cvc" 
                                    type="text" 
                                    required 
                                    value={formData.cvc}
                                    onChange={handleInputChange}
                                    className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                                    placeholder="•••" 
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === "upi" && (
                            <div className="space-y-6">
                              <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium" htmlFor="upiId">UPI ID</label>
                                <input 
                                  id="upiId" 
                                  type="text" 
                                  required 
                                  value={formData.upiId}
                                  onChange={handleInputChange}
                                  className="bg-transparent border-b border-white/30 py-3 text-xl text-terra-beige placeholder:text-white/30 focus:outline-none focus:border-terra-bronze transition-colors font-serif" 
                                  placeholder="username@upi" 
                                />
                              </div>
                              <div className="text-white/50 text-xs text-center font-light">
                                You will need to approve the payment in your UPI app.
                              </div>
                            </div>
                          )}

                          {paymentMethod === "cash" && (
                            <div className="text-white/70 text-sm text-center py-6 font-light">
                              Pay in cash upon delivery. Please have the exact amount ready.
                            </div>
                          )}

                          <div className="flex items-center gap-3 text-white/50 text-sm font-light pt-4">
                            <Lock className="w-4 h-4" />
                            <span className="uppercase tracking-widest text-xs">Secured by standard protocol</span>
                          </div>
                        </div>
                      )}

                      {/* Navigation Controls */}
                      <div className="flex justify-between items-center pt-6 border-t border-white/20">
                        {currentStep > 0 ? (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-medium flex items-center gap-2 group"
                          >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Return</span>
                          </button>
                        ) : (
                          <div />
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative flex items-center gap-4 text-terra-beige hover:text-white transition-colors"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 border-2 border-terra-beige border-t-transparent rounded-full animate-spin" />
                              <span className="uppercase tracking-[0.2em] text-xs font-medium">Processing</span>
                            </div>
                          ) : (
                            <>
                              <span className="uppercase tracking-[0.2em] text-xs font-medium">
                                {currentStep === steps.length - 1 ? `Pay ₹${cartTotal}` : "Proceed"}
                              </span>
                              <div className="w-8 h-px bg-terra-beige/50 group-hover:w-12 transition-all duration-300" />
                              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-12">
                <div className="glass bg-white/[0.05] p-8 border border-white/20 rounded-lg relative overflow-hidden">
                  {/* Subtle top light line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra-bronze/50 to-transparent" />
                  
                  <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium block mb-6">Your Order</span>
                  
                  <div className="space-y-6 max-h-[30vh] overflow-y-auto pr-2 mb-6 border-b border-white/10 pb-6 hide-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="relative w-12 h-16 bg-terra-black rounded-sm overflow-hidden flex-shrink-0 border border-white/20">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover opacity-80"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-14">
                          <div>
                            <h3 className="font-serif text-terra-beige text-sm leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-white/50 hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs text-white/70 font-mono font-semibold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-white/50 hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <span className="text-terra-beige/80 text-xs font-mono font-semibold">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 text-xs uppercase tracking-[0.1em] font-light text-white/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white/90 font-mono font-semibold">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-terra-bronze font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-terra-beige border-t border-white/10 pt-4 mt-4">
                      <span className="text-sm uppercase tracking-[0.2em] font-semibold">Total</span>
                      <span className="text-xl font-serif font-semibold">₹{cartTotal}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer - Minimalist */}
        <footer className="container mx-auto px-6 lg:px-12 py-8 flex justify-between items-center border-t border-white/10 text-xs uppercase tracking-[0.2em] text-white/50 font-light">
          <span>© 2026 TERRA</span>
          <span className="hidden md:inline">Secure Processing</span>
          <span>Shift Perspective</span>
        </footer>
      </div>
    </div>
  );
}
