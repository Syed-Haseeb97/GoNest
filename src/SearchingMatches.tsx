import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Map, 
  ShieldAlert, 
  Search, 
  Clock, 
  Users, 
  ShieldCheck, 
  Route, 
  Sparkles,
  Loader2,
  X
} from "lucide-react";
import { motion } from "motion/react";

interface SearchingMatchesProps {
  onCancel: () => void;
  onSearchComplete?: () => void;
}

export default function SearchingMatches({ onCancel, onSearchComplete }: SearchingMatchesProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [searchProgress, setSearchProgress] = useState<number>(10);
  
  const searchSteps = [
    { title: "Searching nearby commuters...", desc: "Scanning local verified neighborhood nodes inside a 2.5-km boundary.", status: "active" },
    { title: "Matching routes...", desc: "Calculating optimal travel trajectory and overlap ratio across highway routes.", status: "pending" },
    { title: "Comparing schedules...", desc: "Validating time tolerances within a strict +/- 15 minute target window.", status: "pending" },
    { title: "Calculating compatibility...", desc: "Cross-referencing cabin custom rules, vehicle comfort, and academic/corporate alignment.", status: "pending" },
    { title: "Finding safest matches...", desc: "Reviewing rider validation badges and establishing secure pairing keys.", status: "pending" }
  ];

  useEffect(() => {
    // Dynamic simulated searching flow
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < searchSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          if (onSearchComplete) {
            onSearchComplete();
          }
          return prev;
        }
      });
    }, 2800);

    const progressInterval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(progressInterval);
          return 100;
        }
      });
    }, 120);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onSearchComplete]);

  return (
    <div id="searching-matches-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative flex flex-col justify-center py-20 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Visual background atmospheric lights */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-xl mx-auto z-10 relative w-full">
        
        {/* Animated radar/scanning visual */}
        <div className="relative w-40 h-40 mx-auto mb-10 flex items-center justify-center">
          
          {/* Layered concentric pulse waves */}
          <div className="absolute inset-0 border border-indigo-500/20 rounded-full animate-ping opacity-25" />
          <div className="absolute inset-4 border border-indigo-500/30 rounded-full animate-[pulse_2s_infinite] opacity-40" />
          <div className="absolute inset-10 border border-slate-800 rounded-full flex items-center justify-center bg-slate-900 shadow-xl relative overflow-hidden">
            
            {/* Custom SVG radar scanning hand */}
            <svg 
              className="w-20 h-20 text-indigo-400 animate-[spin_4s_linear_infinite]" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sweepGrad" x1="50" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" stroke="#1f2937" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#1f2937" strokeWidth="1" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#1f2937" strokeWidth="1" />
              
              {/* Spinning gradient wedge */}
              <path d="M50 50 L90 50 A40 40 0 0 0 50 10 Z" fill="url(#sweepGrad)" />
            </svg>

            {/* Pulsing center locator icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>

          </div>
        </div>

        {/* Searching Title Text */}
        <div className="text-center space-y-3.5 mb-10">
          <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-widest inline-flex items-center space-x-1.5">
            <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>Scanning Cohort Registries</span>
          </span>
          <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white leading-tight">
            Finding Your Commute Match
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
            Our route matching algorithm is actively scanning neighborhood clusters to isolate verified co-riders.
          </p>
        </div>

        {/* Dynamic Progress indicator bar */}
        <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl space-y-2 mb-8 text-left shadow-sm">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold">Matching Algorithm Progress</span>
            <span className="text-indigo-400 font-black font-mono">{searchProgress}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_#6366f1]" 
              style={{ width: `${searchProgress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Est. search time: 10-15 seconds</span>
            </span>
            <span>Evaluating 482 active records</span>
          </div>
        </div>

        {/* Stepper matching checklist cards */}
        <div className="space-y-3.5 text-left mb-8">
          {searchSteps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;
            
            return (
              <div 
                key={idx}
                className={`border rounded-xl p-3.5 flex items-start space-x-3.5 transition-all ${
                  isActive 
                    ? "bg-indigo-950/25 border-indigo-500/40 shadow-md" 
                    : isCompleted 
                    ? "bg-slate-900/30 border-slate-850/60 opacity-60" 
                    : "bg-slate-900/10 border-slate-900 opacity-30"
                }`}
              >
                {/* Status Indicator circle icon */}
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center animate-spin">
                      <Loader2 className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-slate-600 flex items-center justify-center text-[10px] font-black">
                      {idx + 1}
                    </div>
                  )}
                </div>

                {/* Step Metadata text */}
                <div className="space-y-0.5">
                  <h4 className={`text-xs font-bold ${isActive ? "text-indigo-300" : isCompleted ? "text-slate-300" : "text-slate-500"}`}>
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cancel Button Option */}
        <div className="border-t border-slate-900 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-850 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center space-x-1.5 mx-auto"
          >
            <X className="w-4 h-4 text-slate-400" />
            <span>Cancel Search</span>
          </button>
        </div>

      </div>

      {/* Security note footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
