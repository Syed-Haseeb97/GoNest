import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Car, 
  MapPin, 
  Info, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  RefreshCw,
  Clock,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (step < 3) handleNext();
        else handleComplete();
      } else if (e.key === "ArrowLeft" && step > 1) {
        handlePrev();
      } else if (e.key === "Escape") {
        onSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance && step < 3) {
      handleNext();
    } else if (distance < -minSwipeDistance && step > 1) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  // SVGs for each step
  const renderIllustration = () => {
    switch (step) {
      case 1:
        return (
          <div className="relative w-full h-56 sm:h-64 flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800/40 overflow-hidden shadow-inner">
            {/* Ambient Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <svg className="w-48 h-48 relative z-10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Calendar Base */}
              <rect x="40" y="50" width="120" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
              <rect x="40" y="50" width="120" height="30" rx="2" fill="#4f46e5" />
              
              {/* Binder Rings */}
              <rect x="65" y="40" width="8" height="20" rx="4" fill="#64748b" />
              <rect x="125" y="40" width="8" height="20" rx="4" fill="#64748b" />

              {/* Grid dots representing recurring dates */}
              <circle cx="65" cy="100" r="5" fill="#10b981" />
              <circle cx="95" cy="100" r="5" fill="#10b981" />
              <circle cx="125" cy="100" r="5" fill="#10b981" />
              
              <circle cx="65" cy="125" r="5" fill="#10b981" />
              <circle cx="95" cy="125" r="5" fill="#10b981" />
              <circle cx="125" cy="125" r="5" fill="#10b981" />

              <circle cx="65" cy="145" r="5" fill="#64748b" />
              <circle cx="95" cy="145" r="5" fill="#10b981" />
              <circle cx="125" cy="145" r="5" fill="#64748b" />

              {/* Recurring Loop Arrows Overlay */}
              <path d="M70,120 C70,75 130,75 130,120" stroke="#818cf8" strokeWidth="3" strokeDasharray="5 3" />
              <path d="M130,120 C130,165 70,165 70,120" stroke="#818cf8" strokeWidth="3" strokeDasharray="5 3" />
              
              {/* Floating Car Indicator */}
              <g transform="translate(85, 110)">
                <rect width="30" height="18" rx="6" fill="#10b981" />
                <circle cx="8" cy="18" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <circle cx="22" cy="18" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <path d="M6,6 L10,2 L20,2 L24,6 Z" fill="#34d399" />
              </g>

              {/* Subtle Sparkles */}
              <circle cx="150" cy="70" r="2" fill="#38bdf8" />
              <circle cx="50" cy="150" r="3" fill="#34d399" />
            </svg>
          </div>
        );
      case 2:
        return (
          <div className="relative w-full h-56 sm:h-64 flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800/40 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <svg className="w-48 h-48 relative z-10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Map Route Path */}
              <path d="M30,150 Q70,50 120,120 T170,40" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
              
              {/* Vetted Pick-up pins on route */}
              <g transform="translate(62, 70)">
                <circle cx="10" cy="10" r="10" fill="#10b981" fillOpacity="0.2" />
                <circle cx="10" cy="10" r="5" fill="#10b981" />
              </g>

              <g transform="translate(108, 105)">
                <circle cx="10" cy="10" r="10" fill="#10b981" fillOpacity="0.2" />
                <circle cx="10" cy="10" r="5" fill="#10b981" />
              </g>

              {/* Commuter Avatars (Representing Multi-passenger matching) */}
              <g transform="translate(145, 120)">
                <circle cx="15" cy="15" r="15" fill="#334155" stroke="#475569" strokeWidth="2" />
                <path d="M5,25 Q15,15 25,25" fill="#64748b" />
                <circle cx="15" cy="11" r="5" fill="#94a3b8" />
              </g>
              <g transform="translate(15, 60)">
                <circle cx="15" cy="15" r="15" fill="#334155" stroke="#475569" strokeWidth="2" />
                <path d="M5,25 Q15,15 25,25" fill="#64748b" />
                <circle cx="15" cy="11" r="5" fill="#94a3b8" />
              </g>

              {/* Matched Vehicle moving along path */}
              <g transform="translate(85, 80)">
                <rect x="0" y="0" width="45" height="26" rx="8" fill="#4f46e5" stroke="#818cf8" strokeWidth="2" />
                <circle cx="12" cy="26" r="5" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
                <circle cx="33" cy="26" r="5" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
                <path d="M8,10 L16,4 L30,4 L38,10 Z" fill="#6366f1" />
                {/* Visual Passenger Indicators inside car */}
                <circle cx="16" cy="12" r="2" fill="#e2e8f0" />
                <circle cx="24" cy="12" r="2" fill="#e2e8f0" />
                <circle cx="32" cy="12" r="2" fill="#e2e8f0" />
              </g>
            </svg>
          </div>
        );
      case 3:
        return (
          <div className="relative w-full h-56 sm:h-64 flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800/40 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <svg className="w-48 h-48 relative z-10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Phone Frame */}
              <rect x="65" y="30" width="70" height="140" rx="16" fill="#1e293b" stroke="#475569" strokeWidth="3" />
              {/* Phone Screen Container */}
              <rect x="70" y="38" width="60" height="124" rx="10" fill="#0f172a" />
              
              {/* Phone Speaker & Camera notches */}
              <rect x="90" y="34" width="20" height="4" rx="2" fill="#475569" />
              
              {/* Route line inside phone */}
              <path d="M80,140 Q100,90 100,120 T120,60" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
              
              {/* Green matched badge overlay on phone */}
              <g transform="translate(78, 75)">
                <rect width="44" height="18" rx="6" fill="#10b981" />
                <text x="22" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">MATCHED</text>
              </g>

              {/* Sparkles / Success indicator loops around the phone */}
              <circle cx="50" cy="60" r="4" fill="#34d399" />
              <path d="M40,60 L60,60 M50,50 L50,70" stroke="#34d399" strokeWidth="1.5" />

              <circle cx="155" cy="130" r="4" fill="#818cf8" />
              <path d="M145,130 L165,130 M155,120 L155,140" stroke="#818cf8" strokeWidth="1.5" />

              {/* Checked circle badge */}
              <g transform="translate(130, 45)">
                <circle cx="14" cy="14" r="14" fill="#10b981" />
                <path d="M8,14 L12,18 L20,10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      id="onboarding-root" 
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-white font-sans antialiased relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic ambient blur blobs for premium look */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main glassmorphism card container */}
      <div className="w-full max-w-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl relative flex flex-col justify-between space-y-8 z-10">
        
        {/* Top Header Row with skip option */}
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Car className="w-4.5 h-4.5" />
            </div>
            <span className="text-base font-extrabold tracking-tight">
              Daily<span className="text-indigo-400">Go</span>
            </span>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center space-x-1.5 bg-slate-950/40 border border-slate-800/60 py-1.5 px-3 rounded-full">
            {[1, 2, 3].map((stepIdx) => (
              <div 
                key={stepIdx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === stepIdx ? "w-6 bg-indigo-500" : "w-1.5 bg-slate-700"
                }`}
              />
            ))}
          </div>

          {/* Skip Button */}
          {step < 3 ? (
            <button 
              onClick={onSkip}
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-950/25 hover:bg-slate-950/60 border border-slate-800/40 px-3 py-1.5 rounded-lg"
            >
              Skip
            </button>
          ) : (
            <div className="w-12 h-6" /> // spacer to keep row balance
          )}
        </div>

        {/* Dynamic content transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 flex flex-col items-center"
          >
            {/* Visual illustration slot */}
            {renderIllustration()}

            {/* Warning Banner explaining GoNest differs from standard ride-hailing */}
            {step < 3 && (
              <div className="w-full bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-3.5 flex items-start space-x-3 text-left">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-[11px] font-extrabold text-indigo-300 uppercase tracking-widest">Platform Safety Notice</p>
                  <p className="text-xs text-slate-300 leading-normal">
                    GoNest is **not** for daily random ride-booking or single trips. It is a recurring monthly commute platform.
                  </p>
                </div>
              </div>
            )}

            {/* Text description module */}
            <div className="text-center space-y-3 px-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {step === 1 && "Commute Smarter Every Day"}
                {step === 2 && "Share Your Route"}
                {step === 3 && "Ready to Get Started?"}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                {step === 1 && "Create one recurring commute instead of booking rides every day. Say goodbye to daily booking hassles and unpredictable prices."}
                {step === 2 && "We'll match you with nearby commuters traveling similar routes and schedules to help reduce monthly travel costs and share the trip in comfort."}
                {step === 3 && "Let's create your profile and your first daily commute setup to see your personalized route options."}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Interactive Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-800/60 pt-6">
          {/* Back Trigger */}
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div className="w-12" /> // spacer to align next button
          )}

          {/* Action indicator labels */}
          <div className="hidden sm:flex items-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <span>Use Arrow Keys</span>
          </div>

          {/* Next or Complete Trigger */}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <span>Get Started</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Elegant minimalist platform policy footnotes */}
      <div className="mt-8 text-center text-[11px] text-slate-600 relative z-10 select-none">
        <p>🛡️ Secure vetting processes, 100% identity checks, and eco-friendly group commuting solutions.</p>
      </div>

    </div>
  );
}
