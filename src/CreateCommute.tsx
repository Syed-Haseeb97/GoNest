import React, { useState } from "react";
import { 
  Car, 
  Bike, 
  Navigation, 
  MapPin, 
  Calendar, 
  Clock, 
  RotateCcw, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Loader2, 
  ArrowLeft, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Armchair,
  Accessibility,
  Briefcase,
  VolumeX,
  Compass,
  RefreshCw,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CreateCommuteProps {
  onBack: () => void;
  onSuccess: (commuteDetails: any) => void;
}

export default function CreateCommute({ onBack, onSuccess }: CreateCommuteProps) {
  // 1. Trip Name States
  const [tripName, setTripName] = useState("Office");
  const [customTripName, setCustomTripName] = useState("");

  // 2. Origin & Destination States
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isUsingLocation, setIsUsingLocation] = useState(false);

  // 3. Travel Days States
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ]);

  // 4. Time States
  const [arrivalTime, setArrivalTime] = useState("08:30");
  const [hasReturnCommute, setHasReturnCommute] = useState(false);
  const [returnArrivalTime, setReturnArrivalTime] = useState("17:30");

  // 5. Vehicle Preferences
  const [vehiclePreference, setVehiclePreference] = useState("Car");

  // 6. Additional Preferences (collapsible)
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [seatingPreference, setSeatingPreference] = useState("No Preference");
  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [extraLuggage, setExtraLuggage] = useState(false);
  const [quietRide, setQuietRide] = useState(false);

  // UX & Simulation States
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [simulationStep, setSimulationStep] = useState<"form" | "simulating" | "success">("form");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Toggle Day Selection
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Set Quick Day Options
  const setQuickDays = (mode: "weekdays" | "everyday") => {
    if (mode === "weekdays") {
      setSelectedDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    } else {
      setSelectedDays([...daysOfWeek]);
    }
  };

  // Geo Location Simulation (UI only)
  const handleUseCurrentLocation = () => {
    setIsUsingLocation(true);
    setOrigin("Loading location...");
    setTimeout(() => {
      setOrigin("Oakwood Hills Residency, Block C");
      setIsUsingLocation(false);
    }, 1200);
  };

  // Primary Action Form Submission
  const handleFindMatches = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!origin.trim()) {
      setValidationError("Please specify your origin point.");
      return;
    }
    if (!destination.trim()) {
      setValidationError("Please specify your destination point.");
      return;
    }
    if (selectedDays.length === 0) {
      setValidationError("Please select at least one travel day.");
      return;
    }

    setIsLoading(true);
    
    // Simulate smart matching process
    setTimeout(() => {
      setIsLoading(false);
      setSimulationStep("simulating");
      
      // Secondary simulation step to show loading match-making registry
      setTimeout(() => {
        setSimulationStep("success");
      }, 2500);
    }, 1200);
  };

  const activeTripName = tripName === "Custom" ? customTripName : tripName;

  // Custom Inline vehicle icon renderer
  const renderVehicleIcon = (type: string, size = "w-5 h-5") => {
    switch (type) {
      case "Car":
        return <Car className={size} />;
      case "Bike":
        return <Bike className={size} />;
      case "Auto Rickshaw":
        return (
          <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="18" r="3" />
            <path d="M6 15h12v-3a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v3Z" />
            <path d="m14 8 2-5h3" />
          </svg>
        );
      case "Shared Auto":
        return (
          <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="18" r="3" />
            <path d="M4 12V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
            <path d="M3 15h18" />
            <circle cx="12" cy="10" r="1" />
          </svg>
        );
      case "Van":
        return (
          <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="11" rx="2" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M14 6v5" />
            <path d="M2 11h20" />
          </svg>
        );
      default:
        return <Compass className={size} />;
    }
  };

  return (
    <div id="create-commute-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative overflow-x-hidden pb-16 pt-6 px-4 sm:px-6">
      
      {/* Background glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* MATCHMAKING SIMULATION LOADING VIEW */}
      {simulationStep === "simulating" && (
        <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-xl mx-auto text-center space-y-8 z-20 relative">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin flex items-center justify-center" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Car className="w-8 h-8 text-indigo-400 animate-bounce" />
            </div>
          </div>
          <div className="space-y-3">
            <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              GoNest Route Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Establishing Your Cohort Match
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Scanning local registries for commuters traveling from <span className="text-white font-bold">{origin}</span> to <span className="text-white font-bold">{destination}</span> sharing matching timings and days.
            </p>
          </div>

          <div className="w-full bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center space-x-3.5 text-left">
            <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-300">Filtering verified commuters only</p>
              <p className="text-[11px] text-slate-500 leading-normal mt-0.5">We bypass volatile dynamic routing and guarantee flat cost sharing with safe neighborhood co-travelers.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION VIEW */}
      {simulationStep === "success" && (
        <div className="min-h-[85vh] flex flex-col items-center justify-center max-w-xl mx-auto text-center space-y-6 z-20 relative">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
              Commute Setup Locked!
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Your recurring commute <strong className="text-indigo-300">"{activeTripName || "Default Route"}"</strong> has been formulated. Your pilot runs begin this week!
            </p>
          </div>

          {/* Locked Commute details recap */}
          <div className="w-full bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-slate-800 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Commute Details</span>
              <span className="text-xs font-bold text-emerald-400">{vehiclePreference} Cohort</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-slate-200"><span className="text-slate-500 font-medium">From:</span> {origin}</p>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-slate-200"><span className="text-slate-500 font-medium">To:</span> {destination}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm pt-1 border-t border-slate-800/40">
                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                <p className="text-slate-300"><span className="text-slate-500 font-medium">Days:</span> {selectedDays.length === 7 ? "Every Day" : selectedDays.join(", ")}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <p className="text-slate-300">
                  <span className="text-slate-500 font-medium">Timings:</span> Arrive by {arrivalTime} 
                  {hasReturnCommute && ` | Return at ${returnArrivalTime}`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => onSuccess({
                tripName: activeTripName,
                pickupAddress: origin,
                pickupLocation: { lat: 28.6139, lng: 77.2090 },
                destinationAddress: destination,
                destinationLocation: { lat: 28.6250, lng: 77.2200 },
                departureTime: arrivalTime,
                returnTime: hasReturnCommute ? returnArrivalTime : "",
                days: selectedDays,
                vehiclePreference: vehiclePreference,
                seatsRequired: 1,
                recurring: true,
                active: true
              })}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Go to Commute Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSimulationStep("form");
                setSelectedDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
                setHasReturnCommute(false);
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer"
            >
              Setup Another Commute
            </button>
          </div>
        </div>
      )}

      {/* MASTER CREATE COMMUTE FORM VIEW */}
      {simulationStep === "form" && (
        <div className="max-w-5xl mx-auto z-10 relative">
          
          {/* Top Row back navigation & page index tracking */}
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-850">
            <button 
              onClick={onBack}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900/50 hover:bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-xl cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="text-right">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Commute Setup</span>
              <span className="text-xs font-semibold text-slate-300 block mt-0.5">Step 2 of 2</span>
            </div>
          </div>

          {/* Page Intro Block */}
          <div className="text-left space-y-3 mb-8 max-w-2xl">
            <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded-full tracking-wider flex items-center space-x-1 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Create Recurring Commute</span>
            </span>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white leading-tight">
              Establish Your Daily Commute Route
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Skip the dynamic surge pricing and the daily scheduling hassle. Formulate your single recurring commute route below. We will pair you with community peer cohorts.
            </p>
          </div>

          {/* Validation Alert Box */}
          {validationError && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm font-semibold flex items-center space-x-2.5 mb-6 text-left"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{validationError}</span>
            </motion.div>
          )}

          {/* Grid Layout containing Form on Left & Live Summary on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT FORM BLOCK (Lg spans 7 columns) */}
            <form onSubmit={handleFindMatches} className="lg:col-span-7 space-y-6 text-left">
              
              {/* Section 1: Trip Label */}
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">1. Trip Name (Optional)</h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {["Office", "College", "School", "Gym", "Custom"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setTripName(label);
                        if (label !== "Custom") setCustomTripName("");
                      }}
                      className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        tripName === label
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-md"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Optional custom input */}
                {tripName === "Custom" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-2"
                  >
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tutoring Center, Coworking Space"
                      value={customTripName}
                      onChange={(e) => setCustomTripName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                    />
                  </motion.div>
                )}
              </div>

              {/* Section 2 & 3: Origin & Destination */}
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">2. Origin & Destination</h3>
                </div>

                {/* Origin Location input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="originInput" className="text-xs font-bold text-slate-400">
                      Starting From (Origin)
                    </label>
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={isUsingLocation}
                      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center space-x-1 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>{isUsingLocation ? "Locating..." : "Use Current Location"}</span>
                    </button>
                  </div>
                  <div className="relative group">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-rose-500 pointer-events-none" />
                    <input
                      id="originInput"
                      type="text"
                      required
                      disabled={isUsingLocation}
                      placeholder="Enter neighborhood, apartment, or address"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder-slate-600 font-semibold"
                    />
                  </div>
                </div>

                {/* Destination Location input */}
                <div className="space-y-1.5">
                  <label htmlFor="destInput" className="text-xs font-bold text-slate-400 block">
                    Heading To (Destination)
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-500 pointer-events-none" />
                    <input
                      id="destInput"
                      type="text"
                      required
                      placeholder="Enter campus, college complex, or corporate park"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder-slate-600 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Travel Days */}
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">3. Travel Days</h3>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => setQuickDays("weekdays")}
                      className="text-[10px] font-extrabold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      Weekdays
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickDays("everyday")}
                      className="text-[10px] font-extrabold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      Every Day
                    </button>
                  </div>
                </div>

                {/* Day Picker Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {daysOfWeek.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`py-2 px-3 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-sm"
                            : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 5 & 6: Arrival & Return Times */}
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">4. Timings Setup</h3>
                </div>

                {/* Onward Ride */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="arrivalTimePicker" className="text-xs font-bold text-slate-400">
                      I want to arrive by
                    </label>
                    <input
                      id="arrivalTimePicker"
                      type="time"
                      required
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                    />
                  </div>

                  {/* Return Commute Toggle wrapper */}
                  <div className="flex flex-col justify-end space-y-2">
                    <div className="flex items-center justify-between bg-slate-950 border border-slate-850 p-3 rounded-xl">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-200">Return Commute</p>
                        <p className="text-[10px] text-slate-500">Same route back home</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHasReturnCommute(!hasReturnCommute)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-indigo-500 ${
                          hasReturnCommute ? "bg-indigo-600" : "bg-slate-800"
                        }`}
                      >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                          hasReturnCommute ? "translate-x-5" : "translate-x-0"
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Return Ride details */}
                {hasReturnCommute && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"
                  >
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="returnArrivalTimePicker" className="text-xs font-bold text-slate-400">
                        Return ride arrival back home
                      </label>
                      <input
                        id="returnArrivalTimePicker"
                        type="time"
                        required
                        value={returnArrivalTime}
                        onChange={(e) => setReturnArrivalTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Section 7: Vehicle Preference */}
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">5. Preferred Vehicle Class</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Car", "Bike", "Auto Rickshaw", "Shared Auto", "Van", "No Preference"].map((type) => {
                    const isSelected = vehiclePreference === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setVehiclePreference(type)}
                        className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-3.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600/15 border-indigo-500 text-white shadow-md"
                            : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`${isSelected ? "text-indigo-400" : "text-slate-500"}`}>
                            {renderVehicleIcon(type, "w-5 h-5")}
                          </span>
                          {isSelected && (
                            <span className="w-4.5 h-4.5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-bold tracking-tight">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 8: Additional Preferences (Collapsible) */}
              <div className="bg-slate-900/30 border border-slate-850 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(!preferencesOpen)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-900/40 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">6. Advanced Comfort Prefs</h3>
                  </div>
                  {preferencesOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {preferencesOpen && (
                  <div className="px-5 pb-5 border-t border-slate-850/80 pt-4 space-y-5 text-left bg-slate-950/20">
                    
                    {/* Seating preference selection */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Seating Preference</p>
                      <div className="flex flex-wrap gap-2">
                        {["Window Seat", "Aisle Seat", "No Preference"].map((seat) => (
                          <button
                            key={seat}
                            type="button"
                            onClick={() => setSeatingPreference(seat)}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              seatingPreference === seat
                                ? "bg-indigo-600 border-indigo-500 text-white"
                                : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            {seat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Checkbox triggers */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      
                      <button
                        type="button"
                        onClick={() => setWheelchairAccessible(!wheelchairAccessible)}
                        className={`p-3 rounded-xl border text-left flex items-start space-x-2.5 cursor-pointer transition-colors ${
                          wheelchairAccessible ? "bg-indigo-600/10 border-indigo-500 text-white" : "bg-slate-950 border-slate-850 text-slate-400"
                        }`}
                      >
                        <Accessibility className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold">Wheelchair</p>
                          <p className="text-[9px] text-slate-500">Accessible vehicle</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExtraLuggage(!extraLuggage)}
                        className={`p-3 rounded-xl border text-left flex items-start space-x-2.5 cursor-pointer transition-colors ${
                          extraLuggage ? "bg-indigo-600/10 border-indigo-500 text-white" : "bg-slate-950 border-slate-850 text-slate-400"
                        }`}
                      >
                        <Briefcase className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold">Extra Luggage</p>
                          <p className="text-[9px] text-slate-500">Trunk space required</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuietRide(!quietRide)}
                        className={`p-3 rounded-xl border text-left flex items-start space-x-2.5 cursor-pointer transition-colors ${
                          quietRide ? "bg-indigo-600/10 border-indigo-500 text-white" : "bg-slate-950 border-slate-850 text-slate-400"
                        }`}
                      >
                        <VolumeX className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold">Quiet Ride</p>
                          <p className="text-[9px] text-slate-500">No chat preferred</p>
                        </div>
                      </button>

                    </div>

                  </div>
                )}
              </div>

              {/* Find matches primary button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Formulating Commute...</span>
                    </>
                  ) : (
                    <>
                      <span>Find My Commute Matches</span>
                      <ChevronRight className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* RIGHT SIDEBAR: LIVE COMMUTE PREVIEW SUMMARY CARD (Lg spans 5 columns) */}
            <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-6">
              
              <div className="bg-slate-900/60 border border-indigo-500/15 backdrop-blur-md rounded-2xl p-6 shadow-xl relative overflow-hidden">
                
                {/* Glow bar header */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500" />
                
                <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">Cohort Review</span>
                    <h3 className="text-sm font-black text-white">{activeTripName || "Unnamed Commute"}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg">
                    Recurring Setup
                  </span>
                </div>

                <div className="py-5 space-y-4 text-left">
                  
                  {/* Origin Visual indicator */}
                  <div className="flex items-start space-x-3.5 relative">
                    {/* Visual Connector Dotted line */}
                    <div className="absolute left-2.5 top-6 bottom-[-18px] w-0.5 border-l border-dashed border-slate-700" />
                    
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 mt-0.5 border border-rose-500/20">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pick-up From</p>
                      <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">
                        {origin || <span className="text-slate-600 italic">Please enter your neighborhood address...</span>}
                      </p>
                    </div>
                  </div>

                  {/* Destination visual indicator */}
                  <div className="flex items-start space-x-3.5 pt-1">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Drop-off At</p>
                      <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">
                        {destination || <span className="text-slate-600 italic">Please enter your campus/workplace destination...</span>}
                      </p>
                    </div>
                  </div>

                  {/* Frequency Indicator */}
                  <div className="pt-4 border-t border-slate-850 space-y-3">
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Travel Days</span>
                      <span className="font-semibold text-indigo-300">
                        {selectedDays.length === 7 ? "Every Day" : `${selectedDays.length} Days / Week`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Arrival Target</span>
                      <span className="font-semibold text-slate-200 flex items-center space-x-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Arrive by {arrivalTime}</span>
                      </span>
                    </div>

                    {/* Return timing */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Return Ride</span>
                      <span className="font-semibold text-slate-200 flex items-center space-x-1.5 font-mono">
                        {hasReturnCommute ? (
                          <>
                            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Return at {returnArrivalTime}</span>
                          </>
                        ) : (
                          <span className="text-slate-600 italic">No return planned</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Vehicle Class</span>
                      <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                        {renderVehicleIcon(vehiclePreference, "w-4 h-4 text-indigo-400")}
                        <span>{vehiclePreference}</span>
                      </span>
                    </div>

                    {/* comfort criteria summary inline badge list */}
                    {(seatingPreference !== "No Preference" || wheelchairAccessible || extraLuggage || quietRide) && (
                      <div className="pt-2 border-t border-slate-850/60 space-y-1.5">
                        <p className="text-[9px] text-slate-500 font-bold uppercase">Comfort Criteria</p>
                        <div className="flex flex-wrap gap-1.5">
                          {seatingPreference !== "No Preference" && (
                            <span className="text-[9px] font-bold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full">
                              {seatingPreference}
                            </span>
                          )}
                          {wheelchairAccessible && (
                            <span className="text-[9px] font-bold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full">
                              Wheelchair Accessible
                            </span>
                          )}
                          {extraLuggage && (
                            <span className="text-[9px] font-bold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full">
                              Luggage Room
                            </span>
                          )}
                          {quietRide && (
                            <span className="text-[9px] font-bold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full">
                              Quiet Trip
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Flat Rate Saving Pitch info bubble */}
                <div className="bg-indigo-950/30 border border-indigo-500/10 rounded-xl p-3.5 flex items-start space-x-2.5 text-left mt-2">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-indigo-300 leading-normal">
                    🛡️ By pooling on consistent schedules, GoNest co-travelers save an average of <strong>73% per month</strong> compared to standard taxi booking systems.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
