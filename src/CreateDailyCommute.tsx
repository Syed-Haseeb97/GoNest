import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  DollarSign, 
  Car, 
  SlidersHorizontal, 
  ArrowRight, 
  ArrowLeft,
  Route,
  Sparkles,
  Check,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Award
} from "lucide-react";

interface CreateDailyCommuteProps {
  onFindMatches: (commuteData: any) => void;
  onBack: () => void;
}

export default function CreateDailyCommute({ onFindMatches, onBack }: CreateDailyCommuteProps) {
  // Input fields
  const [pickup, setPickup] = useState<string>("Melrose District, Boston");
  const [destination, setDestination] = useState<string>("Innovation Science Park, Cambridge");
  const [arrivalTime, setArrivalTime] = useState<string>("08:30");
  const [returnTime, setReturnTime] = useState<string>("17:30");
  const [travelDaysOption, setTravelDaysOption] = useState<string>("Weekdays"); // Everyday, Weekdays, Weekends, Custom
  const [customDays, setCustomDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  
  // Vehicle Preferences
  const [vehiclePref, setVehiclePref] = useState<string>("Car"); // Auto Rickshaw, Shared Auto, Car, Van, Bike, Cab, No Preference
  const [passengersTogether, setPassengersTogether] = useState<number>(1);
  const [budgetPref, setBudgetPref] = useState<number>(250); // Monthly budget max

  // Ride preferences check list
  const [ridePreferences, setRidePreferences] = useState<string[]>([
    "Quiet Ride", "AC Preferred"
  ]);

  // Derived metrics calculations based on inputs
  const [estDistance, setEstDistance] = useState<number>(22.8); // kms
  const [estSavings, setEstSavings] = useState<number>(278); // $ Savings / month

  useEffect(() => {
    // Generate simulated dynamic changes when parameters change
    const isWeekdays = travelDaysOption === "Weekdays";
    const daysMultiplier = travelDaysOption === "Everyday" ? 30 : isWeekdays ? 22 : 8;
    const computedDistance = pickup.length > 5 ? Math.min(70, (pickup.length + destination.length) * 0.56) : 20;
    setEstDistance(parseFloat(computedDistance.toFixed(1)));
    
    // Cost of driving alone = distance in km * 2 * days * $0.38 per km + tolls
    const soloCost = (computedDistance * 2 * daysMultiplier * 0.38) + 120; // assumed parking/tolls
    // Split cost
    const splitCost = (soloCost * 0.28) + 15;
    const savings = Math.max(40, soloCost - splitCost);
    setEstSavings(Math.round(savings));
  }, [pickup, destination, travelDaysOption]);

  const toggleDay = (day: string) => {
    if (customDays.includes(day)) {
      setCustomDays(customDays.filter(d => d !== day));
    } else {
      setCustomDays([...customDays, day]);
    }
  };

  const toggleRidePref = (pref: string) => {
    if (ridePreferences.includes(pref)) {
      setRidePreferences(ridePreferences.filter(p => p !== pref));
    } else {
      setRidePreferences([...ridePreferences, pref]);
    }
  };

  const handleSearchTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    onFindMatches({
      pickup,
      destination,
      arrivalTime,
      returnTime,
      travelDaysOption,
      travelDays: travelDaysOption === "Custom Days" ? customDays : travelDaysOption,
      vehiclePref,
      passengersTogether,
      budgetPref,
      ridePreferences,
      estDistance,
      estSavings
    });
  };

  return (
    <div id="create-daily-commute-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Visual background ambient details */}
      <div className="absolute top-[-5%] left-[-10%] w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-emerald-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Step progress heading */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-900">
          <button 
            type="button"
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-bold">Step 3 of 3</span>
            <div className="flex space-x-1.5">
              <span className="w-2 h-1.5 rounded-full bg-indigo-500/40" />
              <span className="w-2 h-1.5 rounded-full bg-indigo-500/40" />
              <span className="w-5 h-1.5 rounded-full bg-indigo-500" />
            </div>
          </div>
        </div>

        {/* Headline block */}
        <div className="text-left space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white leading-tight">
            Configure Your Commute
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Configure your pickup coordinates, work timings, and personal co-ride preferences.
          </p>
        </div>

        <form onSubmit={handleSearchTrigger} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SECTION (TIMING & ROUTING) - 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* ROUTING CARDS */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
                <Route className="w-4 h-4 text-indigo-400" />
                <span>Geographic Route Coordinates</span>
              </h3>

              {/* Pickup Location */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="pickup-loc" className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>Pickup Location (Home Area)</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    id="pickup-loc"
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                    placeholder="Enter neighborhood landmark or street name..."
                  />
                </div>
              </div>

              {/* Destination Location */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="dest-loc" className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <span>Destination (Office / School / Campus)</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    id="dest-loc"
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                    placeholder="Enter corporate tech park, college campus..."
                  />
                </div>
              </div>
            </div>

            {/* TIMINGS & RECURRING DAYS */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Schedule & Recurrence Model</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Arrival Time */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="arrival-time" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Target Arrival
                  </label>
                  <input
                    id="arrival-time"
                    type="time"
                    required
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                  />
                </div>

                {/* Return Time */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="return-time" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Target Return Departure
                  </label>
                  <input
                    id="return-time"
                    type="time"
                    required
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                  />
                </div>

              </div>

              {/* Recurring schedule options */}
              <div className="space-y-2 text-left pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Recurring Days</span>
                <div className="grid grid-cols-4 gap-2">
                  {["Everyday", "Weekdays", "Weekends", "Custom Days"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTravelDaysOption(option)}
                      className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        travelDaysOption === option 
                          ? "bg-indigo-600 border-indigo-500 text-white" 
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom days selectors if chosen */}
              {travelDaysOption === "Custom Days" && (
                <div className="flex justify-between gap-1.5 pt-2 text-left">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                    const selected = customDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`w-9 h-9 rounded-lg border text-[10px] font-black transition-all flex items-center justify-center cursor-pointer ${
                          selected 
                            ? "bg-indigo-500/20 border-indigo-500 text-indigo-300" 
                            : "bg-slate-950 border-slate-850 text-slate-500 hover:border-slate-800"
                        }`}
                      >
                        {day[0]}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PREFERENCES BLOCK */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                <span>Comfort & Ride Parameters</span>
              </h3>

              {/* Vehicle Preference */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Vehicle Tier Preference</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Auto Rickshaw", "Shared Auto", "Car", "Van", "Bike", "Cab", "No Preference"].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setVehiclePref(tier)}
                      className={`py-2.5 px-2 text-[10px] font-extrabold rounded-lg border text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                        vehiclePref === tier
                          ? "bg-indigo-600/15 border-indigo-500 text-indigo-300"
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800"
                      }`}
                    >
                      <Car className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{tier}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers together & Budget Preferential Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Passengers count */}
                <div className="space-y-2 text-left">
                  <label htmlFor="passengers-num" className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>Riders Together</span>
                  </label>
                  <select
                    id="passengers-num"
                    value={passengersTogether}
                    onChange={(e) => setPassengersTogether(parseInt(e.target.value))}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    <option value={1}>1 Passenger (Just Me)</option>
                    <option value={2}>2 Passengers (Me + Peer)</option>
                    <option value={3}>3 Passengers</option>
                  </select>
                </div>

                {/* Budget Limit Slider */}
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <label htmlFor="budget-slider" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Max Monthly Budget
                    </label>
                    <span className="text-xs font-bold text-emerald-400 font-mono">${budgetPref}/mo</span>
                  </div>
                  <input
                    id="budget-slider"
                    type="range"
                    min="100"
                    max="600"
                    step="25"
                    value={budgetPref}
                    onChange={(e) => setBudgetPref(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

              </div>

              {/* Ride Preferences checkbox list */}
              <div className="space-y-2.5 text-left pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Cabin Custom Rules</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Quiet Ride", 
                    "Conversation Friendly", 
                    "Music Allowed", 
                    "Women Only (if available)", 
                    "AC Preferred", 
                    "Extra Luggage Space", 
                    "Wheelchair Accessible"
                  ].map((rule) => {
                    const checked = ridePreferences.includes(rule);
                    return (
                      <button
                        key={rule}
                        type="button"
                        onClick={() => toggleRidePref(rule)}
                        className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          checked 
                            ? "bg-slate-900 border-indigo-500/40 text-slate-100 shadow-inner" 
                            : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        <span className="text-[11px] font-semibold leading-none">{rule}</span>
                        <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                          checked 
                            ? "bg-indigo-600 border-indigo-500 text-white" 
                            : "border-slate-800 bg-slate-950"
                        }`}>
                          {checked && <Check className="w-3 h-3 stroke-[3px]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SECTION (MAP / ROUTE PREVIEW) - 5 cols */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
            
            {/* SAVINGS METRICS & SUMMARY CONTAINER */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 text-left relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />

              <div className="space-y-4">
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider block w-fit">
                  ⚡ Optimal Match Algorithm
                </span>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Estimated Monthly Savings</h4>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">${estSavings}</span>
                    <span className="text-xs text-slate-400">/ month saved</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-850 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Est. Route Distance</span>
                    <span className="text-sm font-extrabold text-slate-200 mt-0.5 font-mono block">{estDistance} kms</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Est. Time in Transit</span>
                    <span className="text-sm font-extrabold text-slate-200 mt-0.5 font-mono block">~32 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAP PLACEHOLDER */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden shadow-sm text-left">
              <div className="p-4 border-b border-slate-850/80 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Matched Trajectory View</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              </div>
              
              {/* Simulated Map Canvas Graphics (Inline SVG) */}
              <div className="h-48 bg-slate-950 relative flex items-center justify-center overflow-hidden">
                
                {/* Abstract grid lines simulating city map */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10" y1="0" x2="10" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="40" y1="0" x2="40" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="80" y1="0" x2="80" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="120" y1="0" x2="120" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="240" y1="0" x2="240" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="280" y1="0" x2="280" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="320" y1="0" x2="320" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="360" y1="0" x2="360" y2="200" stroke="white" strokeWidth="1" />

                  <line x1="0" y1="20" x2="400" y2="20" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="130" x2="400" y2="130" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="170" x2="400" y2="170" stroke="white" strokeWidth="1" />
                </svg>

                {/* Simulated route line trajectory */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Neon Indigo Route Path */}
                  <path 
                    d="M 40 140 Q 150 110 180 60 T 320 40" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    className="opacity-90"
                  />
                  
                  {/* Pulse travel animation dot */}
                  <circle cx="180" cy="60" r="4.5" fill="#38bdf8" className="animate-[pulse_1.5s_infinite]">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 40 140 Q 150 110 180 60 T 320 40" />
                  </circle>

                  {/* Start Point Pin (Pickup) */}
                  <circle cx="40" cy="140" r="7" fill="#10b981" />
                  <circle cx="40" cy="140" r="12" stroke="#10b981" strokeWidth="2" fill="none" className="animate-ping opacity-60" />

                  {/* Destination Point Pin */}
                  <circle cx="320" cy="40" r="7" fill="#6366f1" />
                  <circle cx="320" cy="40" r="12" stroke="#6366f1" strokeWidth="2" fill="none" className="animate-ping opacity-60" />
                </svg>

                {/* Small labels on Map */}
                <div className="absolute bottom-4 left-4 bg-slate-900/95 border border-slate-800 px-2 py-1 rounded-md text-[9px] font-bold text-slate-300">
                  📍 A: Melrose
                </div>
                <div className="absolute top-4 right-4 bg-slate-900/95 border border-slate-800 px-2 py-1 rounded-md text-[9px] font-bold text-slate-300">
                  🎯 B: Innovation Park
                </div>
              </div>

              {/* Distances validation banner */}
              <div className="p-3.5 bg-slate-900/60 border-t border-slate-850 flex items-start space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-400 leading-normal">
                  Locations are processed securely. Your exact coordinates are generalized by 300 meters inside neighborhood zones to preserve complete physical anonymity.
                </p>
              </div>
            </div>

            {/* ACTION SUBMIT */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 cursor-pointer text-sm sm:text-base"
            >
              <span>Find Matching Commutes</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>

        </form>

      </div>

      {/* Security footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
