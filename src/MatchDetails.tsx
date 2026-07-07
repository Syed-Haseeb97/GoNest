import React, { useState } from "react";
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  RotateCcw, 
  Car, 
  Bike, 
  ShieldCheck, 
  Lock, 
  Check, 
  Loader2, 
  ChevronRight, 
  ArrowLeft, 
  TrendingDown, 
  Sparkles, 
  Languages, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Award,
  VolumeX,
  Compass,
  Heart,
  CalendarDays
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MatchDetailsProps {
  cohortData?: {
    id?: string;
    firstName?: string;
    compatibilityScore?: number;
    vehicleType?: string;
    pickupDistance?: string;
    arrivalTimeDifference?: string;
    sharedDays?: string[];
    badges?: string[];
    sharedPreferences?: string[];
    routeSimilarity?: string;
    monthlySavings?: string;
    avatarBg?: string;
  };
  onBack: () => void;
  onRequestJoin: () => void;
}

export default function MatchDetails({ cohortData = {}, onBack, onRequestJoin }: MatchDetailsProps) {
  // Safe defaults representing a highly compatible commuter (Arjun is the default)
  const firstName = cohortData.firstName || "Arjun";
  const compatibilityScore = cohortData.compatibilityScore || 98;
  const vehicleType = cohortData.vehicleType || "Car (Sedan)";
  const pickupDistance = cohortData.pickupDistance || "300 meters";
  const arrivalTimeDifference = cohortData.arrivalTimeDifference || "5 mins early";
  const sharedDays = cohortData.sharedDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const routeSimilarity = cohortData.routeSimilarity || "99% Overlap (Direct Freeway Trajectory)";
  const monthlySavings = cohortData.monthlySavings || "$145 / month";
  const avatarBg = cohortData.avatarBg || "from-indigo-500 to-cyan-500";
  const badges = cohortData.badges || ["Highly Compatible", "Verified"];

  // Page static details
  const origin = "Oakwood Hills Residency, Block C";
  const destination = "Campus Central, Tech Park";
  const arrivalTime = "08:30";
  const returnArrivalTime = "17:30";
  const hasReturnTrip = true;

  // UX Interactions
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestToJoin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRequestSent(true);
    }, 1500);
  };

  const handleFinish = () => {
    onRequestJoin();
  };

  return (
    <div id="match-details-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-6 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Dynamic ambient color blur blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* REQUEST SUCCESS OVERLAY MODAL */}
      <AnimatePresence>
        {requestSent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">Request Dispatched!</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We sent your pool proposal to <strong className="text-indigo-300">{firstName}</strong>.
                </p>
                <p className="text-xs text-slate-500 leading-normal">
                  Once {firstName} approves your shared schedule coordinates, we will unlock your private messaging portal and secure pickup details.
                </p>
              </div>

              {/* Secure banner */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center space-x-3 text-left">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-300">Vetting Framework Active</p>
                  <p className="text-[11px] text-slate-500 leading-snug">All monthly billing calculations and route adjustments are completed automatically.</p>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Return to Dashboard</span>
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
            <span>Back to Matches</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Cohort Profile</span>
            <span className="text-xs font-semibold text-slate-300 block mt-0.5">Vetting Evaluation</span>
          </div>
        </div>

        {/* Title section */}
        <div className="text-left space-y-3 mb-8">
          <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded-full tracking-wider flex items-center space-x-1 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Direct Cohort Analysis</span>
          </span>
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white leading-tight">
            Commute Match Details
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Inspect this commuter's route consistency, compatibility metrics, and vehicle safety logs before requesting to join their recurring daily pool.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: PROFILE & COMPATIBILITY (Spans 5 columns on md+) */}
          <div className="md:col-span-5 space-y-6">
            
            {/* 1. Profile Card */}
            <div className="bg-slate-900/40 border border-slate-850 backdrop-blur-md rounded-2xl p-6 text-center space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
              
              {/* Profile Avatar Placeholder */}
              <div className="relative w-24 h-24 mx-auto">
                <div className={`w-full h-full rounded-full bg-gradient-to-tr ${avatarBg} flex items-center justify-center text-white font-black text-3xl shadow-lg relative`}>
                  <span>{firstName.substring(0, 1)}</span>
                </div>
                <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              {/* Bio details */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-center space-x-2">
                  <h3 className="text-xl font-black text-slate-100">{firstName}</h3>
                  <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Verified ID
                  </span>
                </div>
                <p className="text-xs text-slate-400">Regular Passenger & Commuter</p>
              </div>

              {/* Top KPI statistics */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-850/80">
                <div className="bg-slate-950/40 border border-slate-850 p-2.5 rounded-xl text-left">
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Member Since</p>
                  <p className="text-xs font-bold text-slate-200 mt-0.5">Oct 2025</p>
                </div>
                <div className="bg-slate-950/40 border border-slate-850 p-2.5 rounded-xl text-left">
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Languages</p>
                  <p className="text-xs font-bold text-slate-200 mt-0.5 truncate">Eng, Hindi</p>
                </div>
              </div>

              {/* Compatibility Highlight Score */}
              <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-between text-left">
                <div className="space-y-0.5">
                  <p className="text-[9px] text-indigo-400 font-bold uppercase">Compatibility Score</p>
                  <p className="text-xs text-slate-300 font-medium">Excellent schedule overlap</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">{compatibilityScore}%</span>
                </div>
              </div>

            </div>

            {/* 2. Compatibility Breakdown Progress Bars */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl text-left space-y-4 shadow-lg">
              <div className="border-b border-slate-850/60 pb-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compatibility Breakdown</h3>
              </div>

              <div className="space-y-3.5">
                {/* Route overlapping progression */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Route Match</span>
                    <span className="font-bold text-slate-200">99%</span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "99%" }} />
                  </div>
                </div>

                {/* Schedule/Timing progression */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Schedule Match</span>
                    <span className="font-bold text-slate-200">95%</span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>

                {/* Vehicle preference progression */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Vehicle Preference Match</span>
                    <span className="font-bold text-slate-200">100%</span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

                {/* Travel Days Match */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Travel Days Overlap</span>
                    <span className="font-bold text-slate-200">100%</span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: ROUTE SUMMARY & DETAILS & ACTIONS (Spans 7 columns on md+) */}
          <div className="md:col-span-7 space-y-6 text-left">
            
            {/* 1. Commute Details */}
            <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="border-b border-slate-850/80 pb-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Commute Overview</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Origin (Pickup Location)</p>
                    <p className="text-xs font-semibold text-slate-200 leading-normal mt-0.5">{origin}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">({pickupDistance} from you)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Destination (Drop-off)</p>
                    <p className="text-xs font-semibold text-slate-200 leading-normal mt-0.5">{destination}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">({routeSimilarity.split("(")[0]})</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-850/60">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Travel Days</span>
                  <p className="text-xs font-bold text-slate-300 flex items-center space-x-1">
                    <CalendarDays className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Mon - Fri Overlap</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Arrival Target</span>
                  <p className="text-xs font-bold text-slate-300 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Arrive by {arrivalTime}</span>
                  </p>
                  <span className="text-[9px] text-emerald-400 font-bold uppercase block mt-1">
                    ({arrivalTimeDifference})
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Vehicle Class</span>
                  <p className="text-xs font-bold text-slate-300 flex items-center space-x-1">
                    <Car className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{vehicleType}</span>
                  </p>
                </div>
              </div>

              {/* Return trip option */}
              {hasReturnTrip && (
                <div className="bg-slate-950/40 border border-slate-850 p-3.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase block">Return Commute Enabled</span>
                      <span className="font-bold text-slate-200 mt-0.5 block">Same route back home</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-300 font-mono">Depart {returnArrivalTime}</span>
                </div>
              )}

            </div>

            {/* 2. Shared Preferences */}
            <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl space-y-3.5 shadow-xl">
              <div className="border-b border-slate-850/80 pb-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shared Preferences Match</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-2">
                  <VolumeX className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Quiet Ride</span>
                </span>
                <span className="text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Non-Smoking</span>
                </span>
                <span className="text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                  Window Seat
                </span>
                <span className="text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                  Extra Luggage Space
                </span>
                <span className="text-xs font-bold text-slate-300 bg-slate-950 border border-slate-850/60 px-3.5 py-1.5 rounded-xl opacity-50">
                  Wheelchair Accessible
                </span>
              </div>
            </div>

            {/* 3. Estimated Savings highlights */}
            <div className="bg-gradient-to-r from-indigo-950/40 to-indigo-900/20 border border-indigo-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-indigo-400">
                  <TrendingDown className="w-4.5 h-4.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Estimated Monthly Savings</span>
                </div>
                <p className="text-xs text-slate-300 max-w-sm">
                  Pooling coordinates direct cost-sharing on a daily recurring basis. Skip the peak-hour dynamic pricing surges.
                </p>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <p className="text-2xl sm:text-3xl font-black text-white">{monthlySavings}</p>
                <p className="text-[10px] text-slate-500 font-medium">Save ~75% vs commuting alone</p>
              </div>
            </div>

            {/* 4. Safety Information Block */}
            <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Privacy & Safety Notice</h4>
              </div>

              <div className="space-y-2 text-xs text-slate-400 leading-normal pl-6">
                <p>🛡️ <strong className="text-slate-300">Verified Profile:</strong> Users undergo official verification filters prior to posting recurring listings.</p>
                <p>🔒 <strong className="text-slate-300">Secure Matching:</strong> Exact geographic coordinate addresses are never shared publicly.</p>
                <p>💬 Personal contact numbers and pickup nodes remain entirely secure until both cohort members accept.</p>
              </div>
            </div>

            {/* Action triggers */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onBack}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs sm:text-sm text-center"
              >
                Back to Matches
              </button>

              <button
                onClick={handleRequestToJoin}
                disabled={isLoading}
                className="w-full sm:flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>Dispatching Request...</span>
                  </>
                ) : (
                  <>
                    <span>Request to Join {firstName}'s Commute</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
