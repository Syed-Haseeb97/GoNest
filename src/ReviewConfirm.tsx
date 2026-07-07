import React, { useState } from "react";
import { 
  Car, 
  Bike, 
  MapPin, 
  Calendar, 
  Clock, 
  RotateCcw, 
  Sliders, 
  Edit3, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Users, 
  Activity, 
  Inbox, 
  Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReviewConfirmProps {
  commuteData?: {
    tripName?: string;
    origin?: string;
    destination?: string;
    selectedDays?: string[];
    arrivalTime?: string;
    hasReturnCommute?: boolean;
    returnArrivalTime?: string;
    vehiclePreference?: string;
    seatingPreference?: string;
    wheelchairAccessible?: boolean;
    extraLuggage?: boolean;
    quietRide?: boolean;
  };
  onBack: () => void;
  onConfirm: () => void;
}

export default function ReviewConfirm({ commuteData = {}, onBack, onConfirm }: ReviewConfirmProps) {
  // Safe defaults if commuteData wasn't fully supplied
  const tripName = commuteData.tripName || "Office";
  const origin = commuteData.origin || "Oakwood Hills Residency, Block C";
  const destination = commuteData.destination || "Campus Central, Tech Park";
  const selectedDays = commuteData.selectedDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const arrivalTime = commuteData.arrivalTime || "08:30";
  const hasReturnCommute = commuteData.hasReturnCommute !== undefined ? commuteData.hasReturnCommute : true;
  const returnArrivalTime = commuteData.returnArrivalTime || "17:30";
  const vehiclePreference = commuteData.vehiclePreference || "Car";
  const seatingPreference = commuteData.seatingPreference || "Window Seat";
  const wheelchairAccessible = commuteData.wheelchairAccessible || false;
  const extraLuggage = commuteData.extraLuggage || false;
  const quietRide = commuteData.quietRide || true;

  // UX Interaction States
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Trigger Confirmation Matcher
  const handleConfirmCommute = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
    }, 1800);
  };

  const handleDone = () => {
    onConfirm();
  };

  // Helper vehicle icon generator
  const renderVehicleIcon = (type: string, className = "w-5 h-5") => {
    switch (type) {
      case "Car":
        return <Car className={className} />;
      case "Bike":
        return <Bike className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  return (
    <div id="review-confirm-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative overflow-x-hidden pb-24 lg:pb-16 pt-6 px-4 sm:px-6">
      
      {/* Background ambient lighting blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* FINAL REGISTRY SUCCESS OVERLAY */}
      <AnimatePresence>
        {isConfirmed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">Matching Initiated!</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We have cataloged your recurring daily commute <strong className="text-indigo-300">"{tripName}"</strong>.
                </p>
                <p className="text-xs text-slate-500 leading-normal">
                  Our routing engine is currently pairing you with commuters who travel parallel paths on compatible schedules. You will receive notifications as matches are verified.
                </p>
              </div>

              {/* Vetted badge */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 text-left">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-300">Identity Guard Activated</p>
                  <p className="text-[11px] text-slate-500 leading-snug">Only verified neighbors matching your specific schedule coordinates will see your route proposal.</p>
                </div>
              </div>

              <button
                onClick={handleDone}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Enter Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Header navigation bar */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-900">
          <button 
            onClick={onBack}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900/50 hover:bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Route</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">MVP Verification</span>
            <span className="text-xs font-semibold text-slate-300 block mt-0.5">Final Review</span>
          </div>
        </div>

        {/* Title module */}
        <div className="text-left space-y-3 mb-8">
          <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded-full tracking-wider flex items-center space-x-1 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Platform Lock-In</span>
          </span>
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white leading-tight">
            Review Your Daily Commute
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Please confirm your recurring commute parameters before we start searching for matching commuter cohorts traveling similar routes and schedules.
          </p>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: CATEGORIZED SUMMARY CARDS (Spans 7 columns on md+) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* 1. Trip Name & Class Card */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between hover:border-slate-800 transition-colors text-left relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              <div className="space-y-1 pl-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Trip Name</span>
                <span className="text-base font-black text-slate-100">{tripName}</span>
              </div>
              <button className="p-2 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Route Coordinates Card */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl hover:border-slate-800 transition-colors text-left relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              
              <div className="flex items-center justify-between border-b border-slate-850/60 pb-3 mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Route Coordinates</span>
                <button className="p-1.5 rounded-lg bg-slate-950/50 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3.5 relative">
                <div className="absolute left-2.5 top-5 bottom-3 w-0.5 border-l border-dashed border-slate-700" />
                
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 mt-0.5 border border-rose-500/20">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Origin Location</p>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-normal">{origin}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Destination Location</p>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-normal">{destination}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Travel Days Summary Card */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between hover:border-slate-800 transition-colors text-left relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              <div className="space-y-1.5 pl-1 flex-grow">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Travel Days</span>
                <div className="flex flex-wrap gap-1">
                  {selectedDays.map((day) => (
                    <span key={day} className="text-[9px] font-extrabold text-indigo-300 bg-indigo-950/60 border border-indigo-900/40 px-2 py-0.5 rounded-md">
                      {day.substring(0, 3)}
                    </span>
                  ))}
                </div>
              </div>
              <button className="p-2 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-4">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4. Timing Preferences Card */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl hover:border-slate-800 transition-colors text-left relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              
              <div className="flex items-center justify-between border-b border-slate-850/60 pb-3 mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Timings Target</span>
                <button className="p-1.5 rounded-lg bg-slate-950/50 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/40 border border-slate-850 p-3 rounded-xl flex items-center space-x-3">
                  <Clock className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Onward Arrival</p>
                    <p className="text-xs font-black text-slate-200">Arrive by {arrivalTime}</p>
                  </div>
                </div>

                {hasReturnCommute ? (
                  <div className="bg-slate-950/40 border border-slate-850 p-3 rounded-xl flex items-center space-x-3">
                    <RotateCcw className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Return Commute</p>
                      <p className="text-xs font-black text-slate-200">Return at {returnArrivalTime}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950/20 border border-slate-900 p-3 rounded-xl flex items-center justify-center text-slate-600 text-xs font-semibold">
                    No return trip setup
                  </div>
                )}
              </div>
            </div>

            {/* 5. Vehicle preference Card */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between hover:border-slate-800 transition-colors text-left relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              <div className="space-y-1 pl-1 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  {renderVehicleIcon(vehiclePreference, "w-5 h-5")}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Vehicle Class</span>
                  <span className="text-sm font-black text-slate-100">{vehiclePreference} Cohort</span>
                </div>
              </div>
              <button className="p-2 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6. Comfort Preferences Card */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl hover:border-slate-800 transition-colors text-left relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              
              <div className="flex items-center justify-between border-b border-slate-850/60 pb-3 mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Advanced Comfort Preferences</span>
                <button className="p-1.5 rounded-lg bg-slate-950/50 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
                  {seatingPreference}
                </span>
                {wheelchairAccessible && (
                  <span className="text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
                    Wheelchair Accessible
                  </span>
                )}
                {extraLuggage && (
                  <span className="text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
                    Extra Trunk Room
                  </span>
                )}
                {quietRide && (
                  <span className="text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
                    Quiet Commute Preferred
                  </span>
                )}
                {!wheelchairAccessible && !extraLuggage && !quietRide && seatingPreference === "No Preference" && (
                  <span className="text-xs text-slate-500 italic">No special preferences configured</span>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: WHAT HAPPENS NEXT & PRIVACY & ACTION (Spans 5 columns on md+) */}
          <div className="md:col-span-5 space-y-6">
            
            {/* What Happens Next Card */}
            <div className="bg-slate-900/50 border border-indigo-500/10 rounded-2xl p-6 text-left space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-100">What Happens Next?</h3>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex items-start space-x-3 text-xs leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-white">Route Engine Scan:</strong> GoNest crawls local verified neighborhood nodes to calculate matched route trajectories.
                  </p>
                </div>

                <div className="flex items-start space-x-3 text-xs leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-white">Cohort Draft Formulation:</strong> You'll receive real-time notifications with the best available monthly schedules.
                  </p>
                </div>

                <div className="flex items-start space-x-3 text-xs leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-white">Review Before Sharing:</strong> Inspect matched passenger counts and vetting profiles before committing to any ride-sharing pool.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Notice Box */}
            <div className="bg-slate-900/30 border border-slate-850 p-4.5 rounded-2xl flex items-start space-x-3 text-left">
              <Lock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">Privacy Lock Engaged</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                  Your exact address is never shared publicly. Matching is based purely on route trajectory, proximity buffers, and general schedules.
                </p>
              </div>
            </div>

            {/* DESKTOP ON-SCREEN PRIMARY ACTION ACTION TRIGGER */}
            <div className="hidden md:block pt-2">
              <button
                onClick={handleConfirmCommute}
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Spinning Engine...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Find Matches</span>
                    <ChevronRight className="w-4.5 h-4.5" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* MOBILE-FIRST STICKY ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur-md p-4 z-40 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="py-3 px-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleConfirmCommute}
          disabled={isLoading}
          className="flex-grow ml-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
              <span>Cataloging...</span>
            </>
          ) : (
            <>
              <span>Confirm & Find Matches</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
