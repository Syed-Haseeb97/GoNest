import React, { useState } from "react";
import { 
  Pause, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  UserCheck
} from "lucide-react";

interface PauseCommutePageProps {
  onBack: () => void;
  onPauseSuccess: (details: any) => void;
}

export default function PauseCommutePage({ onBack, onPauseSuccess }: PauseCommutePageProps) {
  // Option choices
  const durationOptions = [
    { id: "this-week", label: "Pause This Week", desc: "Until Sunday midnight" },
    { id: "next-week", label: "Pause Next Week", desc: "Starting Monday morning" },
    { id: "custom", label: "Custom Dates", desc: "Specify custom start/end" }
  ];

  const reasonOptions = [
    { id: "vacation", label: "Vacation", desc: "Travel/Holiday outside station" },
    { id: "wfh", label: "Work From Home", desc: "Remote office rotation" },
    { id: "exams", label: "Exam Holidays", desc: "Academic study preparation" },
    { id: "other", label: "Other", desc: "Any generic personal reason" }
  ];

  // Selection state
  const [selectedDuration, setSelectedDuration] = useState<string>("this-week");
  const [selectedReason, setSelectedReason] = useState<string>("vacation");
  const [customStartDate, setCustomStartDate] = useState<string>("2026-07-10");
  const [customEndDate, setCustomEndDate] = useState<string>("2026-07-15");
  const [comments, setComments] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePauseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Commute schedule paused successfully. No co-shuttle fees will accumulate for the matching duration.");
      onPauseSuccess({
        duration: selectedDuration,
        reason: selectedReason,
        customStartDate,
        customEndDate,
        comments
      });
    }, 1200);
  };

  return (
    <div id="pause-commute-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-xl mx-auto z-10 relative space-y-8">
        
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
            Schedule Intermission
          </span>
        </div>

        {/* TITLE */}
        <div className="text-left space-y-1">
          <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white flex items-center space-x-2.5">
            <Pause className="w-7 h-7 text-indigo-400" />
            <span>Pause Commute</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Temporarily pause your matching pool without losing your co-rider association or priority slot.
          </p>
        </div>

        {/* COMPREHENSIVE FORM */}
        <form onSubmit={handlePauseSubmit} className="space-y-6 text-left">
          
          {/* STEP 1: CHOOSE DURATION */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 space-y-4">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Step 1: Choose Duration</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {durationOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedDuration(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedDuration === opt.id 
                      ? "bg-indigo-600/15 border-indigo-500" 
                      : "bg-slate-950 border-slate-850/60 hover:border-slate-800"
                  }`}
                >
                  <h4 className="text-xs font-bold text-white mb-1">{opt.label}</h4>
                  <p className="text-[10px] text-slate-400 leading-tight">{opt.desc}</p>
                </button>
              ))}
            </div>

            {/* Custom dates input box if custom duration chosen */}
            {selectedDuration === "custom" && (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-850/40 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-indigo-300 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-indigo-300 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: REASON SELECTION */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 sm:p-6 space-y-4">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Step 2: Reason for pause</span>
            
            <div className="grid grid-cols-2 gap-3">
              {reasonOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedReason(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedReason === opt.id 
                      ? "bg-indigo-600/15 border-indigo-500" 
                      : "bg-slate-950 border-slate-850/60 hover:border-slate-800"
                  }`}
                >
                  <h4 className="text-xs font-bold text-white mb-0.5">{opt.label}</h4>
                  <p className="text-[10px] text-slate-400 leading-tight">{opt.desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Additional details (Optional)</label>
              <textarea
                placeholder="Any specific note you'd like to share with your commute co-riders..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* CONFIRMATION CARD */}
          <div className="bg-amber-500/5 border border-amber-500/25 p-5 rounded-2xl space-y-3.5">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">Pause Policy Agreement</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Pausing temporarily releases your seat reservation to prevent co-rider matching failures. Once the pause duration ends, your seat automatically re-locks.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-500/15 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500">Scheduled Resume</span>
                <p className="text-slate-200 font-bold mt-0.5">
                  {selectedDuration === "this-week" && "Next Monday Morning"}
                  {selectedDuration === "next-week" && "Following Monday Morning"}
                  {selectedDuration === "custom" && customEndDate}
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500">Subscription Hold</span>
                <p className="text-slate-200 font-bold mt-0.5">Yes - prorated credits applied</p>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="pt-4 grid grid-cols-2 gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
            >
              {isSubmitting ? "Suspending schedule..." : "Confirm Pause Commute"}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-850 font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>

      {/* Security note footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
