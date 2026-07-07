import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  Compass, 
  ArrowRight,
  UserCheck,
  Send,
  Sparkles,
  Info,
  CalendarCheck
} from "lucide-react";
import { motion } from "motion/react";

interface JoinRequestSentProps {
  cohortData?: {
    id?: string;
    firstName?: string;
  };
  onContinueBrowsing: () => void;
  onGoToDashboard: () => void;
}

export default function JoinRequestSent({ cohortData = {}, onContinueBrowsing, onGoToDashboard }: JoinRequestSentProps) {
  const firstName = cohortData.firstName || "the commuter";

  return (
    <div id="join-request-sent-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-6 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Background ambient lighting blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto z-10 relative">
        
        {/* Header navigation bar */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-900">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Proposal Confirmed</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">System Status</span>
            <span className="text-xs font-semibold text-slate-300 block mt-0.5">Pending Review</span>
          </div>
        </div>

        {/* Success Header Area */}
        <div className="text-center space-y-4 mb-10">
          
          {/* Animated Success Illustration (Inline SVG with animations) */}
          <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
            {/* Ambient Background Circles */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-2 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center shadow-xl"
            />

            {/* Custom Premium SVG Illustration */}
            <svg 
              className="w-24 h-24 text-emerald-400 relative z-10" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer pulse ring */}
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" className="opacity-40 animate-[spin_40s_linear_infinite]" />
              
              {/* Inner design lines */}
              <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1" className="opacity-20" />
              
              {/* Paper airplane path */}
              <path d="M25 65 C 35 55, 45 45, 60 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" className="opacity-50" />
              
              {/* Green Success Checkmark */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                d="M38 52 L47 61 L64 39" 
                stroke="#10b981" 
                strokeWidth="6" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>

          <span className="bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider flex items-center space-x-1.5 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Request Sent Successfully</span>
          </span>

          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-none">
            Request Sent Successfully
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Your recurring commute proposal has been sent to <strong className="text-indigo-300">{firstName}</strong>. We will coordinate the calendar matching as soon as they accept.
          </p>
        </div>

        {/* STATUS CARD (Pending Approval) */}
        <div className="bg-slate-900/40 border border-slate-850 backdrop-blur-md rounded-2xl p-6 mb-8 text-left grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-500" />

          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                Status: Pending Approval
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your personal contact details and pickup node remain <strong className="text-white">completely private</strong>. Neither party will see coordinates until both mutually accept the proposal.
            </p>
          </div>

          <div className="md:col-span-4 md:border-l md:border-slate-800/80 md:pl-6 space-y-1 text-left md:text-right flex md:flex-col justify-between items-start md:items-end w-full">
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Estimated response time</p>
              <p className="text-xs font-black text-slate-200 mt-0.5">Usually within 24 hours</p>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-amber-400 mt-2">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-semibold text-[11px]">Awaiting Reply</span>
            </div>
          </div>
        </div>

        {/* TIMELINE / WHAT HAPPENS NEXT */}
        <div className="space-y-5 text-left mb-8">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
            <Send className="w-4 h-4 text-indigo-400" />
            <span>What Happens Next</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
            
            {/* Timeline Card 1 */}
            <div className="bg-slate-900/40 border border-slate-850/60 p-4.5 rounded-2xl relative flex flex-col justify-between min-h-[140px] shadow-md group hover:border-slate-800 transition-colors">
              <div className="space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/20">
                  1
                </div>
                <h4 className="text-xs font-black text-slate-200">Request Delivered</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">Your routing proposal has been delivered to {firstName}'s pending requests deck.</p>
              </div>
            </div>

            {/* Timeline Card 2 */}
            <div className="bg-slate-900/40 border border-slate-850/60 p-4.5 rounded-2xl relative flex flex-col justify-between min-h-[140px] shadow-md group hover:border-slate-800 transition-colors">
              <div className="space-y-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/20">
                  2
                </div>
                <h4 className="text-xs font-black text-slate-200">Profile Vetting</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">They will inspect your schedule compatibility stats and comfort parameters.</p>
              </div>
            </div>

            {/* Timeline Card 3 */}
            <div className="bg-slate-900/40 border border-slate-850/60 p-4.5 rounded-2xl relative flex flex-col justify-between min-h-[140px] shadow-md group hover:border-slate-800 transition-colors">
              <div className="space-y-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/20">
                  3
                </div>
                <h4 className="text-xs font-black text-slate-200">Decision Lock</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">The other commuter will accept or decline depending on their schedule constraints.</p>
              </div>
            </div>

            {/* Timeline Card 4 */}
            <div className="bg-indigo-950/20 border border-indigo-500/20 p-4.5 rounded-2xl relative flex flex-col justify-between min-h-[140px] shadow-md group">
              <div className="space-y-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/20">
                  4
                </div>
                <h4 className="text-xs font-black text-slate-200">Unlock Details</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">If accepted, both users receive contact details and monthly pool parameters.</p>
              </div>
            </div>

          </div>
        </div>

        {/* SAFETY REMINDER ACCENTS */}
        <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-5 mb-10 text-left space-y-3">
          <div className="flex items-center space-x-2">
            <Lock className="w-4.5 h-4.5 text-indigo-400" />
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">Platform Safety Framework</h4>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[10px] font-bold text-slate-300 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Users</span>
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Secure Matching</span>
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Privacy Protected</span>
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Monthly Commute Only</span>
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-900 pt-8">
          <button
            onClick={onContinueBrowsing}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer text-xs sm:text-sm"
          >
            <span>Continue Browsing Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToDashboard}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs sm:text-sm text-center"
          >
            Go to Dashboard
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
