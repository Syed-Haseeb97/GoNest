import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  Calendar, 
  Compass, 
  Car, 
  TrendingUp,
  Award
} from "lucide-react";
import { motion } from "motion/react";

interface WelcomeOnboardingProps {
  onBegin: () => void;
  onSkip?: () => void;
}

export default function WelcomeOnboarding({ onBegin, onSkip }: WelcomeOnboardingProps) {
  return (
    <div id="welcome-onboarding-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Premium ambient decorative blurred nodes */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-xl mx-auto z-10 relative">
        
        {/* Progress indicator card */}
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-900">
          <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
            GoNest Onboarding
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-bold">Step 1 of 3</span>
            <div className="flex space-x-1.5">
              <span className="w-5 h-1.5 rounded-full bg-indigo-500" />
              <span className="w-2 h-1.5 rounded-full bg-slate-800" />
              <span className="w-2 h-1.5 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>

        {/* Welcome Illustration */}
        <div className="relative w-44 h-44 mx-auto mb-10 flex items-center justify-center">
          {/* Outer rotating/pulsing ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-full animate-pulse blur-md" />
          <div className="absolute inset-2 bg-slate-900 border border-slate-850 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
            
            {/* Inline premium SVG illustration for shared commute */}
            <svg 
              className="w-28 h-28 text-indigo-400" 
              viewBox="0 0 120 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Central stylized road grid */}
              <path d="M10 90 L110 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-20" />
              <path d="M30 20 L90 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" className="opacity-30" />
              <path d="M90 20 L30 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" className="opacity-30" />

              {/* Central Map Pins */}
              <circle cx="60" cy="55" r="22" stroke="url(#grad1)" strokeWidth="1.5" className="opacity-60" />
              
              {/* Overlapping matching commuters dots */}
              <circle cx="45" cy="45" r="5" fill="#6366f1" />
              <circle cx="75" cy="65" r="5" fill="#10b981" />
              <circle cx="60" cy="75" r="4" fill="#38bdf8" />

              <path d="M45 45 Q 60 30 75 65" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" className="opacity-85" />
            </svg>
          </div>
        </div>

        {/* Headline / Subtitle text */}
        <div className="text-center space-y-3.5 mb-10">
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-black tracking-widest uppercase bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Welcome to GoNest</span>
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight">
            Welcome to GoNest
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Set up your daily commute in less than two minutes. Let us secure a reliable recurring monthly co-ride.
          </p>
        </div>

        {/* Feature Cards Block */}
        <div className="space-y-4 text-left">
          
          {/* Card 1: Save Money */}
          <div className="bg-slate-900/40 border border-slate-850 p-4.5 rounded-2xl flex items-start space-x-4 shadow-md hover:border-slate-800 transition-colors">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-100">Save money every month</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Co-riders divide gas, toll fees, and garage rates fairly on consistent schedules. Bypass peak pricing.
              </p>
            </div>
          </div>

          {/* Card 2: Travel with Verified */}
          <div className="bg-slate-900/40 border border-slate-850 p-4.5 rounded-2xl flex items-start space-x-4 shadow-md hover:border-slate-800 transition-colors">
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-100">Travel with verified commuters</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Secure safety parameters. All co-riders matching in our registry undergo identity validation checkpoints.
              </p>
            </div>
          </div>

          {/* Card 3: Reliable recurring rides */}
          <div className="bg-slate-900/40 border border-slate-850 p-4.5 rounded-2xl flex items-start space-x-4 shadow-md hover:border-slate-800 transition-colors">
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-300 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-100">Reliable recurring rides</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lock in your weekly commute once. Same verified group, identical timing target, total daily relief.
              </p>
            </div>
          </div>

        </div>

        {/* Buttons navigation area */}
        <div className="mt-10 pt-6 border-t border-slate-900 space-y-3">
          <button
            onClick={onBegin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer text-sm sm:text-base"
          >
            <span>Let's Begin</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="w-full bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-850/80 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer text-xs"
            >
              Skip Introduction
            </button>
          )}
        </div>

      </div>

      {/* Safety Note footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
