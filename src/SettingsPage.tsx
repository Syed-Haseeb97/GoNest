import React, { useState } from "react";
import { 
  Settings, 
  ArrowLeft, 
  User, 
  Lock, 
  Bell, 
  Languages, 
  Eye, 
  HelpCircle, 
  Info, 
  LogOut, 
  Trash2, 
  ShieldCheck, 
  MapPin, 
  Check, 
  ChevronRight,
  Sparkles
} from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function SettingsPage({ onBack, onLogout }: SettingsPageProps) {
  // Toggle states
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [locationPermission, setLocationPermission] = useState<boolean>(true);
  const [preferredLanguage, setPreferredLanguage] = useState<string>("English");

  const handleDeleteAccount = () => {
    const confirmation = prompt("To confirm deleting your GoNest account, type 'DELETE' in the input box below. This action is permanent and clears all routing historical passes.");
    if (confirmation === "DELETE") {
      alert("Account deletion sequence initiated. We will securely purge all telemetry coordinates in 24 hours.");
      onLogout();
    } else {
      alert("Deletion sequence cancelled.");
    }
  };

  return (
    <div id="settings-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Visual ambient details */}
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
            GoNest Config
          </span>
        </div>

        {/* TITLE */}
        <div className="text-left space-y-1">
          <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white flex items-center space-x-2.5">
            <Settings className="w-7 h-7 text-indigo-400" />
            <span>Settings Configuration</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Control your secure pairing keys, system privacy alerts, and monthly commute subscription parameters.
          </p>
        </div>

        {/* CONFIG SECTIONS */}
        <div className="space-y-6">
          
          {/* SECTION 1: ACCOUNT & PRIVACY */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 text-left space-y-5 shadow-sm">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-slate-850/60">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Account & Route Privacy</span>
            </h3>

            <div className="space-y-4 text-xs">
              
              {/* Location Vetting toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850">
                <div className="space-y-1 max-w-sm">
                  <h4 className="font-bold text-slate-200">Neighborhood Hub Generalization</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Fuzes home pickup coordinate by 300 meters inside neighborhood zones until match acceptance occurs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLocationPermission(!locationPermission)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    locationPermission ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                    locationPermission ? "translate-x-6" : ""
                  }`} />
                </button>
              </div>

              {/* Secure Identity keys */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-200">Peer Vetting Validation</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Requires co-riders to prove corporate/academic alignment before querying matching routes.
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px]">Secure</span>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 2: SYSTEM PREFERENCES */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 text-left space-y-5 shadow-sm">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-slate-850/60">
              <Bell className="w-4 h-4 text-indigo-400" />
              <span>System & Alert Options</span>
            </h3>

            <div className="space-y-4 text-xs">
              
              {/* Dark Mode toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-200">Visual Theme Selection</h4>
                  <p className="text-[10px] text-slate-500">Enable high-contrast eye safety modes.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    darkMode ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                    darkMode ? "translate-x-6" : ""
                  }`} />
                </button>
              </div>

              {/* Push notifications */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-200">Push & SMS Alerts</h4>
                  <p className="text-[10px] text-slate-500">Send live alerts concerning morning shuttle arrival maneuvers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    pushNotifications ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
                    pushNotifications ? "translate-x-6" : ""
                  }`} />
                </button>
              </div>

              {/* Language selection */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-200">System Language</h4>
                  <p className="text-[10px] text-slate-500">Preferred local navigation dialect.</p>
                </div>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-indigo-300 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
              </div>

            </div>
          </div>

          {/* SECTION 3: HELP & LEGAL */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-slate-850/60">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Help Center & Documentation</span>
            </h3>

            <div className="space-y-2 text-xs">
              <a 
                href="#" 
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900/80 rounded-xl border border-slate-850 transition-colors"
              >
                <span className="font-semibold text-slate-300">Frequently Asked Questions</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <a 
                href="#" 
                className="flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900/80 rounded-xl border border-slate-850 transition-colors"
              >
                <span className="font-semibold text-slate-300">24/7 Safety Dispatch & Escort Desk</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850 text-[10px] text-slate-500 font-bold">
                <span className="flex items-center space-x-1.5">
                  <Info className="w-4 h-4" />
                  <span>App Version</span>
                </span>
                <span>GoNest passenger v3.4.1 (Stable Build)</span>
              </div>
            </div>
          </div>

        </div>

        {/* LOGOUT & DESTRUCTIVE ACTIONS */}
        <div className="pt-6 border-t border-slate-900 space-y-3">
          
          <button
            type="button"
            onClick={onLogout}
            className="w-full bg-slate-900 hover:bg-rose-950/25 text-slate-300 hover:text-rose-400 border border-slate-850 hover:border-rose-900/40 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer text-xs"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Securely Log Out of GoNest</span>
          </button>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-full bg-transparent hover:bg-rose-950/10 text-rose-500 hover:text-rose-400 border border-transparent hover:border-rose-900/20 font-bold py-2 px-6 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-[10px] uppercase tracking-wider"
          >
            <Trash2 className="w-3.5 h-3.5 shrink-0" />
            <span>Delete My Commuter Profile & Data</span>
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
