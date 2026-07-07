import React from "react";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Car, 
  Users, 
  ShieldCheck, 
  TrendingDown, 
  DollarSign, 
  ArrowLeft, 
  Check, 
  AlertTriangle,
  Sparkles,
  Award
} from "lucide-react";

interface MyCommutePageProps {
  onBack: () => void;
  onEdit: () => void;
  onPause: () => void;
  onCancel: () => void;
  commuteData?: any;
}

export default function MyCommutePage({ 
  onBack, 
  onEdit, 
  onPause, 
  onCancel, 
  commuteData = {} 
}: MyCommutePageProps) {
  
  // Vetted defaults
  const pickup = commuteData.pickup || "Oakwood Hills Residency, Block C";
  const destination = commuteData.destination || "Campus Central, Innovation Tech Park";
  const arrivalTime = commuteData.arrivalTime || "08:15 AM";
  const returnTime = commuteData.returnTime || "05:30 PM";
  const travelDays = commuteData.travelDays || "Mon, Tue, Wed, Thu, Fri";
  const vehiclePref = commuteData.vehiclePref || "Car (Sedan)";
  const ridePreferences = commuteData.ridePreferences || ["Quiet Ride", "AC Preferred"];
  const monthlyCost = commuteData.monthlyCost || 145;
  const monthlySavings = commuteData.monthlySavings || 278;
  const compatibilityScore = commuteData.compatibilityScore || 98;

  // Mock group members
  const members = [
    { name: "Charles B. (Driver)", role: "Verified Professional", avatar: "C" },
    { name: "Siddharth Nair", role: "Vertex Employee", avatar: "S" },
    { name: "Elena Rostova", role: "Northeastern Student", avatar: "E" }
  ];

  return (
    <div id="my-commute-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-2xl mx-auto z-10 relative space-y-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-900">
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1.5 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
            Routine Parameters
          </span>
        </div>

        {/* TITLE */}
        <div className="text-left space-y-1">
          <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white flex items-center space-x-2.5">
            <Calendar className="w-7 h-7 text-indigo-400" />
            <span>My Commute Route</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Review and adjust your recurring schedule, matched co-commuters, and passenger preferences.
          </p>
        </div>

        {/* ACTIVE STATUS BANNER */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between text-left">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">Active Commute Status</span>
            </div>
            <p className="text-xs text-slate-300">Shuttle is scheduled to arrive tomorrow at <strong className="text-white">{arrivalTime}</strong>.</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-slate-200 block font-mono">Score: {compatibilityScore}%</span>
            <span className="text-[10px] text-slate-400 block font-semibold">Match Compatibility</span>
          </div>
        </div>

        {/* MAIN CONFIGURATION DETAILS */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-left space-y-6 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            
            {/* Pickup Location */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Pickup Node</span>
              <p className="text-slate-200 font-semibold text-xs flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{pickup}</span>
              </p>
            </div>

            {/* Destination Drop */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Destination Drop</span>
              <p className="text-slate-200 font-semibold text-xs flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{destination}</span>
              </p>
            </div>

            {/* Timing */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Target Arrival</span>
              <p className="text-slate-200 font-bold text-xs flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{arrivalTime}</span>
              </p>
            </div>

            {/* Return Timing */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Return Departure</span>
              <p className="text-slate-200 font-bold text-xs flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{returnTime}</span>
              </p>
            </div>

            {/* Travel Days */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Travel Days</span>
              <p className="text-slate-200 font-semibold text-xs flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{travelDays}</span>
              </p>
            </div>

            {/* Vehicle Preferred */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Vehicle Preference</span>
              <p className="text-slate-200 font-semibold text-xs flex items-center space-x-2">
                <Car className="w-4 h-4 text-indigo-400" />
                <span>{vehiclePref}</span>
              </p>
            </div>

          </div>

          {/* Cabin custom preferences */}
          <div className="space-y-2 pt-3 border-t border-slate-850/60 text-xs">
            <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Cabin Custom Rules</span>
            <div className="flex flex-wrap gap-2">
              {ridePreferences.map((pref: string, idx: number) => (
                <span 
                  key={idx}
                  className="text-[10px] font-bold text-slate-300 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl flex items-center space-x-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{pref}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FINANCIAL SPLIT DETAILS */}
        <div className="grid grid-cols-2 gap-4 text-left">
          
          <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-1">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Your Monthly Pass Cost</span>
            <div className="flex items-baseline space-x-1.5 pt-1">
              <span className="text-2.5xl font-black text-white font-mono">${monthlyCost}</span>
              <span className="text-[10px] text-slate-400">/ mo split</span>
            </div>
            <p className="text-[9px] text-emerald-400 font-semibold">Auto-renew active</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-1">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Est. Monthly Savings</span>
            <div className="flex items-baseline space-x-1.5 pt-1">
              <span className="text-2.5xl font-black text-emerald-400 font-mono">${monthlySavings}</span>
              <span className="text-[10px] text-slate-400">vs solo driving</span>
            </div>
            <p className="text-[9px] text-indigo-400 font-semibold">~73% fuel division savings</p>
          </div>

        </div>

        {/* CURRENT GROUP MEMBERS COHORT */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-left space-y-4 shadow-sm">
          <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Matched Commuter Pool</span>
          </h3>

          <div className="space-y-3">
            {members.map((member, idx) => (
              <div 
                key={idx} 
                className="p-3 bg-slate-950/80 border border-slate-850 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/10">
                    <span>{member.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{member.name}</h4>
                    <p className="text-[10px] text-slate-500">{member.role}</p>
                  </div>
                </div>

                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Verified ID
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON ACTIONS */}
        <div className="pt-6 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <button
            onClick={onEdit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
          >
            Edit Commute
          </button>

          <button
            onClick={onPause}
            className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
          >
            Pause Commute
          </button>

          <button
            onClick={onCancel}
            className="w-full bg-transparent hover:bg-rose-950/10 text-rose-500 hover:text-rose-400 border border-transparent hover:border-rose-900/20 font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center space-x-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cancel Commute</span>
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
