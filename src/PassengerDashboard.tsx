import React from "react";
import { 
  User, 
  Bell, 
  Settings, 
  MapPin, 
  Clock, 
  Car, 
  Users, 
  ShieldCheck, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Compass, 
  Activity, 
  Leaf, 
  LogOut, 
  ChevronRight, 
  Heart, 
  PhoneCall, 
  Share2, 
  HelpCircle,
  Home,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

interface PassengerDashboardProps {
  firstName?: string;
  onNavigate: (view: any) => void;
}

export default function PassengerDashboard({ firstName = "James", onNavigate }: PassengerDashboardProps) {
  return (
    <div id="passenger-dashboard" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-24 pt-6 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Dynamic blurred ambient light nodes */}
      <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-900">
          <div className="flex items-center space-x-3 text-left">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                <span>{firstName.substring(0, 1)}</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Welcome Back</p>
              <h2 className="text-lg font-black text-slate-100">Good Morning, {firstName}</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button 
              onClick={() => onNavigate("notifications")}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer relative"
              aria-label="View notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            </button>
            <button 
              onClick={() => onNavigate("settings")}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Settings shortcut"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* ACTIVE COMMUTE CARD */}
        <div className="bg-slate-900/45 border border-slate-850/80 rounded-3xl p-6 relative overflow-hidden text-left shadow-xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 tracking-wider">
                  Active Commute
                </span>
                <span className="text-[11px] font-bold text-slate-400">Mon - Fri Routine</span>
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-xl font-black text-white">$145<span className="text-xs text-slate-400 font-medium">/mo pass</span></span>
              <p className="text-[10px] text-emerald-400 font-bold">Saved ~73% vs Solo Rides</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 border-b border-slate-850/60 pb-5 mb-5">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Pickup Location</p>
                <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">Oakwood Hills Residency, Block C</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Destination Drop-off</p>
                <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">Campus Central, Innovation Tech Park</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center mb-6">
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Pickup Departure</p>
              <p className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>08:15 AM</span>
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Return Departure</p>
              <p className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>05:30 PM</span>
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Ride Class</p>
              <p className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mt-0.5">
                <Car className="w-3.5 h-3.5 text-indigo-400" />
                <span>Car (Sedan)</span>
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Group Match</p>
              <p className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>3 Commuters</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate("today-commute")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer text-xs sm:text-sm"
          >
            <span>View Today's Commute</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* QUICK ACTIONS GRID */}
        <div className="space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Quick Controls</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {/* Action 1: My Commute */}
            <button
              onClick={() => onNavigate("today-commute")}
              className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl text-left space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200">My Commute</h4>
              <p className="text-[10px] text-slate-500 leading-snug">Adjust schedules and timings</p>
            </button>

            {/* Action 2: Browse Matches */}
            <button
              onClick={() => onNavigate("matches")}
              className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl text-left space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200">Browse Matches</h4>
              <p className="text-[10px] text-slate-500 leading-snug">Search alternative cohorts</p>
            </button>

            {/* Action 3: Pause Commute */}
            <button
              onClick={() => onNavigate("pause-commute")}
              className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl text-left space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200">Pause Commute</h4>
              <p className="text-[10px] text-slate-500 leading-snug">Temporary hold schedule</p>
            </button>

            {/* Action 4: Ride History */}
            <button
              onClick={() => onNavigate("history")}
              className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl text-left space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-300 flex items-center justify-center border border-indigo-500/10 group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200">Ride History</h4>
              <p className="text-[10px] text-slate-500 leading-snug">Past invoices and statistics</p>
            </button>

            {/* Action 5: Invite Friends */}
            <button
              onClick={() => onNavigate("refer")}
              className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl text-left space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20 group-hover:scale-105 transition-transform">
                <Share2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200">Invite Friends</h4>
              <p className="text-[10px] text-slate-500 leading-snug">Earn lifelong admin discounts</p>
            </button>

            {/* Action 6: Support */}
            <button
              onClick={() => onNavigate("support")}
              className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl text-left space-y-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200">Help & Support</h4>
              <p className="text-[10px] text-slate-500 leading-snug">Connect with safety agents</p>
            </button>

          </div>
        </div>

        {/* MONTHLY INSIGHTS METRICS */}
        <div className="space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span>Monthly Performance Insights</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Money Saved */}
            <div className="bg-slate-900/30 border border-slate-850/60 p-4 rounded-2xl">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Money Saved</span>
              <p className="text-xl font-extrabold text-white mt-1.5 font-mono">$185.00</p>
              <p className="text-[9px] text-emerald-400 font-semibold mt-1">~73% monthly split</p>
            </div>

            {/* Trips Completed */}
            <div className="bg-slate-900/30 border border-slate-850/60 p-4 rounded-2xl">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Trips Completed</span>
              <p className="text-xl font-extrabold text-white mt-1.5 font-mono">42 / 44</p>
              <p className="text-[9px] text-indigo-400 font-semibold mt-1">95.4% consistency</p>
            </div>

            {/* Distance Travelled */}
            <div className="bg-slate-900/30 border border-slate-850/60 p-4 rounded-2xl">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Distance Travelled</span>
              <p className="text-xl font-extrabold text-white mt-1.5 font-mono">480 kms</p>
              <p className="text-[9px] text-indigo-400 font-semibold mt-1">Verified highway logs</p>
            </div>

            {/* CO2 Saved */}
            <div className="bg-slate-900/30 border border-slate-850/60 p-4 rounded-2xl">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">CO₂ Environmental Saved</span>
              <p className="text-xl font-extrabold text-white mt-1.5 font-mono">74.5 kg</p>
              <p className="text-[9px] text-emerald-400 font-semibold mt-1 flex items-center space-x-1">
                <Leaf className="w-3 h-3" />
                <span>Green Commuter Badge</span>
              </p>
            </div>

          </div>
        </div>

        {/* SAFETY FRAMEWORK INFO */}
        <div className="bg-slate-900/20 border border-slate-900 p-5 rounded-2xl text-left space-y-3.5">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4.5 h-4.5 text-indigo-400" />
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">Vetting Standards V3</h4>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-950 border border-slate-850/80 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Commuters</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-950 border border-slate-850/80 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-indigo-400" />
              <span>Emergency Contact Verified</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-950 border border-slate-850/80 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Privacy Encrypted Nodes</span>
            </span>
          </div>
        </div>

      </div>

      {/* BOTTOM NAV BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-900 py-3.5 px-6 z-40 flex justify-around items-center max-w-4xl mx-auto rounded-t-2xl">
        <button 
          onClick={() => onNavigate("dashboard")}
          className="flex flex-col items-center space-y-1 text-indigo-400 cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button 
          onClick={() => onNavigate("matches")}
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold">Matches</span>
        </button>

        <button 
          onClick={() => onNavigate("today-commute")}
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Commute</span>
        </button>

        <button 
          onClick={() => onNavigate("notifications")}
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-white transition-colors cursor-pointer relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          <span className="text-[10px] font-bold">Alerts</span>
        </button>

        <button 
          onClick={() => onNavigate("profile")}
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>

    </div>
  );
}
