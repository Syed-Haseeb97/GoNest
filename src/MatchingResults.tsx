import React, { useState, useEffect } from "react";
import { 
  Car, 
  Bike, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  ArrowLeft, 
  RefreshCw, 
  Percent, 
  AlertCircle, 
  Award, 
  ChevronRight,
  TrendingDown,
  Bell,
  Sliders,
  Check,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MatchingResultsProps {
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
  onSkip: () => void;
  onSelectCohort?: (cohortDetails: any) => void;
}

interface MatchItem {
  id: string;
  firstName: string;
  compatibilityScore: number;
  vehicleType: string;
  pickupDistance: string;
  arrivalTimeDifference: string;
  sharedDays: string[];
  badges: string[];
  sharedPreferences: string[];
  routeSimilarity: string;
  monthlySavings: string;
  avatarBg: string;
}

export default function MatchingResults({ commuteData = {}, onBack, onSkip, onSelectCohort }: MatchingResultsProps) {
  // Safe defaults if routing skipped creation
  const tripName = commuteData.tripName || "Office";
  const origin = commuteData.origin || "Oakwood Hills Residency, Block C";
  const destination = commuteData.destination || "Campus Central, Tech Park";
  const selectedDays = commuteData.selectedDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const arrivalTime = commuteData.arrivalTime || "08:30";
  const vehiclePreference = commuteData.vehiclePreference || "Car";

  // Interaction States
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [notificationRegistered, setNotificationRegistered] = useState(false);
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);

  // Simulated pull-to-refresh or trigger re-evaluation
  const triggerReloadMatches = () => {
    setIsSkeletonLoading(true);
    setExpandedCardId(null);
    setSelectedCohortId(null);
    setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 1500);
  };

  // Run initial skeleton timer on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  // 5 Realistic Placeholder Match Cards
  const matchList: MatchItem[] = [
    {
      id: "match-1",
      firstName: "Arjun",
      compatibilityScore: 98,
      vehicleType: "Car (Sedan)",
      pickupDistance: "300 meters",
      arrivalTimeDifference: "5 mins early",
      sharedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      badges: ["Highly Compatible", "Verified"],
      sharedPreferences: ["Aisle Seat", "Quiet Ride Preferred"],
      routeSimilarity: "99% Overlap (Direct Freeway Trajectory)",
      monthlySavings: "$145 / month",
      avatarBg: "from-indigo-500 to-cyan-500"
    },
    {
      id: "match-2",
      firstName: "Sarah",
      compatibilityScore: 95,
      vehicleType: "Car (EV Hatchback)",
      pickupDistance: "450 meters",
      arrivalTimeDifference: "On Time",
      sharedDays: ["Monday", "Wednesday", "Friday"],
      badges: ["Popular Route", "Verified"],
      sharedPreferences: ["Window Seat", "Extra Luggage Space"],
      routeSimilarity: "96% Overlap (Outer Ring Road Bypass)",
      monthlySavings: "$95 / month",
      avatarBg: "from-purple-500 to-pink-500"
    },
    {
      id: "match-3",
      firstName: "Vikram",
      compatibilityScore: 91,
      vehicleType: "Auto Rickshaw",
      pickupDistance: "150 meters",
      arrivalTimeDifference: "3 mins early",
      sharedDays: ["Monday", "Tuesday", "Thursday", "Friday"],
      badges: ["Verified"],
      sharedPreferences: ["No Preference", "Quiet Ride Preferred"],
      routeSimilarity: "92% Overlap (Inner City Shortcut Alleys)",
      monthlySavings: "$110 / month",
      avatarBg: "from-emerald-500 to-teal-500"
    },
    {
      id: "match-4",
      firstName: "Maya",
      compatibilityScore: 88,
      vehicleType: "Shared Auto",
      pickupDistance: "600 meters",
      arrivalTimeDifference: "7 mins late",
      sharedDays: ["Tuesday", "Wednesday", "Thursday"],
      badges: ["Popular Route"],
      sharedPreferences: ["Aisle Seat", "Wheelchair Accessible"],
      routeSimilarity: "89% Overlap (Express Corridor Way)",
      monthlySavings: "$75 / month",
      avatarBg: "from-amber-500 to-rose-500"
    },
    {
      id: "match-5",
      firstName: "Rohan",
      compatibilityScore: 84,
      vehicleType: "Car (SUV)",
      pickupDistance: "800 meters",
      arrivalTimeDifference: "10 mins early",
      sharedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      badges: ["Verified"],
      sharedPreferences: ["Window Seat", "Extra Luggage Space"],
      routeSimilarity: "85% Overlap (Premium Expressway Access)",
      monthlySavings: "$160 / month",
      avatarBg: "from-blue-600 to-indigo-700"
    }
  ];

  const toggleExpand = (id: string) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

  const handleSelectCohort = (match: MatchItem) => {
    setSelectedCohortId(match.id);
    if (onSelectCohort) {
      setTimeout(() => {
        onSelectCohort(match);
      }, 1200);
    }
  };

  // Helper vehicle icon generator
  const renderVehicleIcon = (type: string, className = "w-4 h-4") => {
    if (type.toLowerCase().includes("car")) return <Car className={className} />;
    if (type.toLowerCase().includes("bike")) return <Bike className={className} />;
    return <Compass className={className} />;
  };

  return (
    <div id="matching-results-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-16 pt-6 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Background ambient gradient glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">

        {/* Header navigation bar */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-900">
          <button 
            onClick={onBack}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900/50 hover:bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Verify Setup</span>
          </button>

          {/* Playground toggle to demonstrate Empty state in iframe context */}
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 rounded-xl p-1.5">
            <button
              onClick={() => { setShowEmptyState(false); triggerReloadMatches(); }}
              className={`px-3 py-1 text-[10px] font-extrabold rounded-lg uppercase tracking-wider transition-all ${
                !showEmptyState ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Show Matches
            </button>
            <button
              onClick={() => setShowEmptyState(true)}
              className={`px-3 py-1 text-[10px] font-extrabold rounded-lg uppercase tracking-wider transition-all ${
                showEmptyState ? "bg-rose-600/20 text-rose-300 border border-rose-500/30" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Empty State
            </button>
          </div>
        </div>

        {/* Title details */}
        <div className="text-left space-y-3 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded-full tracking-wider flex items-center space-x-1 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Matching Engines Live</span>
            </span>
            
            {/* Pull to Refresh trigger simulation style */}
            <button
              onClick={triggerReloadMatches}
              disabled={isSkeletonLoading}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1.5 bg-slate-900/40 border border-slate-850 py-1.5 px-3 rounded-xl cursor-pointer hover:bg-slate-900 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSkeletonLoading ? "animate-spin" : ""}`} />
              <span>Refresh Registry</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white leading-tight">
            Your Commute Matches
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Our route mapping algorithms analyzed local neighborhood trajectories and flagged these certified commuter options matching your parameters.
          </p>
        </div>

        {/* TOP SUMMARY BAR (Glassmorphism layout) */}
        <div className="bg-slate-900/40 border border-slate-850 backdrop-blur-md rounded-2xl p-5 mb-8 text-left grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-500" />
          
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 py-0.5 px-2 rounded-md">
                {tripName} ROUTE
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-xs text-slate-300 font-bold">{selectedDays.join(", ")}</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-bold uppercase w-12 text-[9px]">From:</span>
                <span className="text-slate-200 font-semibold truncate max-w-[280px] sm:max-w-[450px]">{origin}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-bold uppercase w-12 text-[9px]">To:</span>
                <span className="text-slate-200 font-semibold truncate max-w-[280px] sm:max-w-[450px]">{destination}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:border-l md:border-slate-800/80 md:pl-6 space-y-2 text-left md:text-right flex md:flex-col justify-between items-start md:items-end w-full">
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Arrival Target</p>
              <p className="text-sm font-black text-indigo-300 font-mono mt-0.5">{arrivalTime}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Preference</p>
              <p className="text-xs font-semibold text-slate-200 mt-0.5">{vehiclePreference}</p>
            </div>
          </div>
        </div>

        {/* MAIN RESULTS SECTION */}
        <AnimatePresence mode="wait">
          
          {/* SKELETON LOADER ANIMATION */}
          {isSkeletonLoading ? (
            <motion.div 
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-full bg-slate-800" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-850 rounded" />
                        <div className="h-3 w-36 bg-slate-850 rounded" />
                      </div>
                    </div>
                    <div className="h-8 w-16 bg-slate-850 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="h-6 bg-slate-850 rounded-lg" />
                    <div className="h-6 bg-slate-850 rounded-lg" />
                    <div className="h-6 bg-slate-850 rounded-lg" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : showEmptyState ? (
            
            /* BEAUTIFUL EMPTY STATE */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/30 border border-slate-900 rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-16 h-16 bg-slate-950 border border-slate-850 rounded-full flex items-center justify-center text-slate-500 mx-auto">
                <AlertCircle className="w-8 h-8 text-indigo-400" />
              </div>

              <div className="space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-white">We couldn't find a perfect match yet</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  Your route parameters from <strong className="text-slate-300">"{origin.split(",")[0]}"</strong> to <strong className="text-slate-300">"{destination.split(",")[0]}"</strong> are listed. Let us monitor incoming commuter submissions.
                </p>
              </div>

              {/* Notify form widget inside empty state */}
              <div className="pt-2">
                {notificationRegistered ? (
                  <motion.div 
                    initial={{ scale: 0.95 }} 
                    animate={{ scale: 1 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/35 rounded-xl text-emerald-400 text-xs font-bold flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Notification System Configured! We'll alert you.</span>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setNotificationRegistered(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 mx-auto cursor-pointer"
                  >
                    <Bell className="w-4.5 h-4.5" />
                    <span>Notify Me When Available</span>
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            
            /* DYNAMIC MATCH CARDS LIST */
            <motion.div 
              key="match-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 text-left"
            >
              {matchList.map((match) => {
                const isExpanded = expandedCardId === match.id;
                const isSelected = selectedCohortId === match.id;
                return (
                  <div 
                    key={match.id}
                    className={`bg-slate-900/40 border rounded-2xl transition-all overflow-hidden ${
                      isSelected 
                        ? "border-emerald-500 shadow-lg shadow-emerald-500/5 bg-slate-900/75" 
                        : isExpanded 
                          ? "border-indigo-500/40 bg-slate-900/60" 
                          : "border-slate-850 hover:border-slate-800"
                    }`}
                  >
                    {/* Main Row Block */}
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Avatar + Primary stats */}
                      <div className="flex items-start space-x-4">
                        
                        {/* Circular Avatar Placeholder with dynamic gradient */}
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${match.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0 relative`}>
                          <span>{match.firstName.substring(0, 1)}</span>
                          <span className="absolute bottom-[-1px] right-[-1px] w-4 h-4 bg-emerald-500 border border-slate-900 rounded-full" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <h4 className="text-base font-black text-slate-100">{match.firstName}</h4>
                            
                            {/* Compatibility score badge */}
                            <span className="text-[10px] font-black bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 py-0.5 px-2 rounded-full flex items-center space-x-0.5">
                              <span>{match.compatibilityScore}% Match</span>
                            </span>

                            {/* Verification optional badges */}
                            {match.badges.map((b) => (
                              <span 
                                key={b} 
                                className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                  b === "Highly Compatible" 
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                    : "bg-slate-950 text-slate-400 border border-slate-800"
                                }`}
                              >
                                {b}
                              </span>
                            ))}
                          </div>

                          {/* Quick spec checklist */}
                          <div className="flex items-center space-x-3 text-xs text-slate-400 flex-wrap gap-y-1.5 pt-0.5">
                            <span className="flex items-center space-x-1">
                              {renderVehicleIcon(match.vehicleType, "w-3.5 h-3.5 text-indigo-400")}
                              <span>{match.vehicleType}</span>
                            </span>
                            <span className="text-slate-700">•</span>
                            <span className="text-slate-300 font-medium">{match.pickupDistance} away</span>
                            <span className="text-slate-700">•</span>
                            <span className="text-slate-300 font-medium">{match.arrivalTimeDifference}</span>
                          </div>
                        </div>

                      </div>

                      {/* Right-aligned Trigger actions */}
                      <div className="flex items-center space-x-2 sm:self-center self-end">
                        
                        {/* Expand Button */}
                        <button
                          onClick={() => toggleExpand(match.id)}
                          className="p-2.5 rounded-xl bg-slate-950/40 hover:bg-slate-950 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs flex items-center space-x-1"
                        >
                          <span>Cohort Info</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {/* Direct Select button */}
                        <button
                          onClick={() => handleSelectCohort(match)}
                          disabled={isSelected}
                          className={`py-2.5 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center space-x-1 ${
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Chosen</span>
                            </>
                          ) : (
                            <>
                              <span>Select</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>

                      </div>

                    </div>

                    {/* Expandable Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="border-t border-slate-850/60 bg-slate-950/40 overflow-hidden"
                        >
                          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                            
                            {/* Route overlapping */}
                            <div className="space-y-1.5">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Route Trajectory Similarity</p>
                              <p className="text-slate-200 font-semibold leading-relaxed">
                                {match.routeSimilarity}
                              </p>
                            </div>

                            {/* Shared preferences matched */}
                            <div className="space-y-1.5">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Shared Preferences</p>
                              <div className="flex flex-wrap gap-1.5">
                                {match.sharedPreferences.map((pref) => (
                                  <span key={pref} className="text-[9px] font-bold text-indigo-300 bg-indigo-950/50 border border-indigo-900/30 px-2 py-0.5 rounded-full">
                                    {pref}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Estimated savings metric */}
                            <div className="space-y-1.5 bg-indigo-950/20 border border-indigo-500/10 p-3 rounded-xl">
                              <div className="flex items-center space-x-1.5 text-indigo-400">
                                <TrendingDown className="w-4 h-4" />
                                <span className="font-extrabold uppercase text-[9px] tracking-wider">Estimated Monthly Savings</span>
                              </div>
                              <p className="text-lg font-black text-white mt-1">{match.monthlySavings}</p>
                              <p className="text-[9px] text-slate-500 mt-0.5">Calculated based on toll-sharing formulas.</p>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </motion.div>
          )}

        </AnimatePresence>

        {/* BOTTOM NAVIGATION ACTION CONTROL FOOTER */}
        <div className="flex items-center justify-between border-t border-slate-900 pt-8 mt-10">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Setup Options</span>
          </button>

          <button
            onClick={onSkip}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
          >
            Skip matches & exit to Dashboard
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
