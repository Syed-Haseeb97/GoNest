import React from "react";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Languages, 
  Briefcase, 
  Car, 
  TrendingUp, 
  Calendar, 
  ArrowLeft, 
  ShieldCheck, 
  Heart, 
  Check, 
  Sparkles,
  Award
} from "lucide-react";

interface ProfilePageProps {
  onBack: () => void;
  onEditProfile: () => void;
  onViewCommute: () => void;
  profileData?: any;
}

export default function ProfilePage({ onBack, onEditProfile, onViewCommute, profileData = {} }: ProfilePageProps) {
  // Safe defaults
  const fullName = profileData.fullName || "James Miller";
  const email = profileData.email || "james.miller@bostoncampus.edu";
  const phone = profileData.phone || "+1 (555) 019-2834";
  const emergencyContact = profileData.emergencyContact || "+1 (555) 014-4322";
  const preferredLanguage = profileData.preferredLanguage || "English";
  const homeAddress = profileData.homeAddress || "482 Windmill Hill Lane, Boston";
  const city = profileData.city || "Boston";
  const stateProvince = profileData.stateProvince || "Massachusetts";
  const college = profileData.college || "Northeastern University";
  const company = profileData.company || "Vertex Pharmaceuticals";
  const vehiclePref = profileData.vehiclePref || "Car (Sedan)";
  const ridePreferences = profileData.ridePreferences || ["Quiet Ride", "AC Preferred", "No Preference"];

  return (
    <div id="profile-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-[-5%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

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
            Commuter Credentials
          </span>
        </div>

        {/* HERO CARD / BASIC INFO */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Large Avatar Photo */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-black text-4xl shadow-md border-2 border-slate-900">
              <span>{fullName.substring(0, 1)}</span>
            </div>
            <span className="absolute bottom-[-4px] right-[-4px] bg-indigo-600 p-1.5 rounded-lg border border-slate-900 text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </span>
          </div>

          <div className="space-y-2 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2.5xl font-black text-slate-100">{fullName}</h2>
                <span className="inline-flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Verified Peer Commuter</span>
                </span>
              </div>
              <div className="shrink-0">
                <button
                  onClick={onEditProfile}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl transition-all text-xs cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Daily commuter to {company}. Highly verified partner matching 95% punctuality tolerances.
            </p>
          </div>
        </div>

        {/* HISTORIC METRICS */}
        <div className="grid grid-cols-3 gap-4 text-left">
          
          <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Trips Completed</span>
            <p className="text-xl font-extrabold text-white mt-1 font-mono">142</p>
            <p className="text-[9px] text-indigo-400 font-semibold mt-0.5">98% success rate</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Money Saved</span>
            <p className="text-xl font-extrabold text-white mt-1 font-mono">$1,248</p>
            <p className="text-[9px] text-emerald-400 font-semibold mt-0.5">73% fuel division</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Member Since</span>
            <p className="text-xs font-black text-white mt-2 font-mono">Jan 2026</p>
            <p className="text-[9px] text-indigo-400 font-semibold mt-1">Verified Veteran</p>
          </div>

        </div>

        {/* DETAILS LISTS */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-left space-y-6 shadow-sm">
          <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-slate-850/60">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Profile Credentials</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
            
            {/* Phone */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Phone Number</span>
              <p className="text-slate-200 font-semibold flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{phone}</span>
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Vetted Email Address</span>
              <p className="text-slate-200 font-semibold flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{email}</span>
              </p>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Emergency Guardian Contact</span>
              <p className="text-slate-200 font-semibold flex items-center space-x-2">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>{emergencyContact}</span>
              </p>
            </div>

            {/* Language */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Preferred Language</span>
              <p className="text-slate-200 font-semibold flex items-center space-x-2">
                <Languages className="w-3.5 h-3.5 text-slate-400" />
                <span>{preferredLanguage}</span>
              </p>
            </div>

            {/* Home Address */}
            <div className="space-y-1 sm:col-span-2">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Secure Home Node Landmark</span>
              <p className="text-slate-200 font-semibold flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{homeAddress}, {city}, {stateProvince}</span>
              </p>
            </div>

            {/* Academic/Professional Association */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Verified Academic Association</span>
              <p className="text-slate-200 font-semibold flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{college || "Northeastern University"}</span>
              </p>
            </div>

            {/* Corporate Hub */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Verified Corporate Office</span>
              <p className="text-slate-200 font-semibold flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{company || "Vertex Pharmaceuticals"}</span>
              </p>
            </div>

          </div>
        </div>

        {/* COMFORT & PREFERENCES CARDS */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-left space-y-5 shadow-sm">
          <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-slate-850/60">
            <Car className="w-4 h-4 text-indigo-400" />
            <span>Co-Ride Cabin Metrics</span>
          </h3>

          <div className="space-y-4 text-xs">
            {/* Preferred Vehicle Tier */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Preferred Vehicle Tier</span>
              <div className="bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-xl inline-flex items-center space-x-2 text-indigo-300 font-bold">
                <Car className="w-4 h-4 text-indigo-400" />
                <span>{vehiclePref}</span>
              </div>
            </div>

            {/* Custom Rules Checklist */}
            <div className="space-y-1.5">
              <span className="text-slate-500 font-bold uppercase text-[9px] tracking-wider block">Vetted Cabin Custom Rules</span>
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
        </div>

        {/* ACTIONS */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onViewCommute}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer text-xs"
          >
            <span>View Commute Coordinates</span>
          </button>

          <button
            onClick={onBack}
            className="w-full sm:w-auto text-slate-400 hover:text-white font-bold py-3 px-6 rounded-xl border border-slate-850 transition-all cursor-pointer text-xs"
          >
            Return to Dashboard
          </button>
        </div>

      </div>

      {/* Security footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
