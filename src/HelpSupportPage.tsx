import React, { useState } from "react";
import { 
  HelpCircle, 
  ArrowLeft, 
  BookOpen, 
  AlertTriangle, 
  MessageSquare, 
  HeartHandshake, 
  Send, 
  Info, 
  Clock, 
  ShieldAlert,
  CheckCircle2,
  PhoneCall
} from "lucide-react";

interface HelpSupportPageProps {
  onBack: () => void;
}

export default function HelpSupportPage({ onBack }: HelpSupportPageProps) {
  const [activeTab, setActiveTab] = useState<string>("FAQ");
  const [reportText, setReportText] = useState<string>("");
  const [issueType, setIssueType] = useState<string>("Billing");
  const [feedbackScore, setFeedbackScore] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);

  const faqs = [
    {
      q: "How does the split fuel fee division work?",
      a: "GoNest aggregates co-commuters heading in identical directions. Monthly costs are equally split among group members, automatically taking into account vacation pauses."
    },
    {
      q: "Are the vehicles and captains vetted?",
      a: "Absolutely. All pilots must clear extensive criminal background checks, DMV records analysis, and vehicle cleanliness vetting protocols before starting any route."
    },
    {
      q: "Can I edit my recurring timing parameters mid-month?",
      a: "Yes. You can edit your parameters anytime from your dashboard. Our algorithm will automatically regroup you with nearby co-commuters matching your tolerance."
    },
    {
      q: "What is Neighborhood Generalization?",
      a: "It is a privacy protocol that fuzes your precise residential address within a 300-meter radius, keeping your precise coordinate private until a co-ride match is established."
    }
  ];

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      alert("Ticket submitted securely. A GoNest dispatcher will contact you within the stated SLA.");
      setReportText("");
      setFeedbackText("");
    }, 1200);
  };

  return (
    <div id="help-support-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
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
            Support Desk
          </span>
        </div>

        {/* TITLE */}
        <div className="text-left space-y-1">
          <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white flex items-center space-x-2.5">
            <HelpCircle className="w-7 h-7 text-indigo-400" />
            <span>Help & Support Center</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Need alignment assistance? Browse immediate FAQs, submit secure tickets, or summon emergency dispatch.
          </p>
        </div>

        {/* RESPONSE SLA NOTICE */}
        <div className="bg-indigo-600/10 border border-indigo-500/30 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-500/15 border border-indigo-500/25 rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live System Response SLA</h4>
              <p className="text-[10px] text-slate-400 leading-normal">Our operations dispatcher desk is online 24/7/365.</p>
            </div>
          </div>
          <div className="shrink-0 bg-slate-950 border border-slate-850 px-3.5 py-1.5 rounded-xl text-center">
            <span className="text-xs font-black text-indigo-300 font-mono">~4.5 minutes</span>
            <span className="text-[9px] text-slate-500 block">Average Response Time</span>
          </div>
        </div>

        {/* NAVIGATION TAB CONTROLS */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 text-xs">
          {["FAQ", "Report Issue", "Feedback", "Emergency Help", "About GoNest"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsSent(false);
              }}
              className={`py-2 px-4 rounded-xl border font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === tab 
                  ? "bg-indigo-600 border-indigo-500 text-white" 
                  : "bg-slate-900/40 border-slate-850 text-slate-400 hover:border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTAINER PANELS */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-left shadow-sm min-h-[300px]">
          
          {/* FAQ PANEL */}
          {activeTab === "FAQ" && (
            <div className="space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-850/60">
                <BookOpen className="w-4.5 h-4.5 text-indigo-400" />
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="space-y-1.5 p-3.5 bg-slate-950/60 border border-slate-850/60 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-200">Q: {faq.q}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORT ISSUE PANEL */}
          {activeTab === "Report Issue" && (
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-850/60">
                <AlertTriangle className="w-4.5 h-4.5 text-rose-400" />
                <h3 className="text-xs font-black text-rose-400 uppercase tracking-wider">Report Commute Issue</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Category</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-indigo-300 focus:outline-none"
                >
                  <option value="Billing">Billing & Subscription Split</option>
                  <option value="Pilot">Pilot Captain & Cleanliness Vetting</option>
                  <option value="Co-rider">Co-rider Alignment Behavior</option>
                  <option value="App">Application / Route Calculation Bug</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Issue Description</label>
                <textarea
                  required
                  placeholder="Provide precise details including times and dates if relevant..."
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Secure Ticket</span>
              </button>
            </form>
          )}

          {/* FEEDBACK PANEL */}
          {activeTab === "Feedback" && (
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-850/60">
                <MessageSquare className="w-4.5 h-4.5 text-emerald-400" />
                <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider">Submit Feedback</h3>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rate your GoNest experience</label>
                <div className="flex space-x-1.5">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setFeedbackScore(score)}
                      className={`w-10 h-10 rounded-xl font-bold border transition-all cursor-pointer text-xs flex items-center justify-center ${
                        feedbackScore === score 
                          ? "bg-indigo-600 border-indigo-500 text-white shadow" 
                          : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-850"
                      }`}
                    >
                      {score}★
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">What can we improve?</label>
                <textarea
                  required
                  placeholder="Tell us about your route quality, ride parameters, or design interface..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}

          {/* EMERGENCY HELP PANEL */}
          {activeTab === "Emergency Help" && (
            <div className="space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-850/60">
                <ShieldAlert className="w-4.5 h-4.5 text-rose-500 animate-pulse" />
                <h3 className="text-xs font-black text-rose-500 uppercase tracking-wider">Emergency dispatch & escort</h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                If you feel unsafe or have encountered a vehicular emergency during your active commute, activate emergency controls.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/35 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-rose-400 flex items-center space-x-1.5">
                  <PhoneCall className="w-4 h-4 text-rose-500" />
                  <span>24/7 Safety Dispatch Desk</span>
                </h4>
                <p className="text-[10px] text-slate-300">
                  Click below to dial our real-time safety team. We hold active alignments with state highway security patrols and academic escort services.
                </p>
                <div className="pt-2">
                  <a 
                    href="tel:+15550192834"
                    className="inline-flex bg-rose-600 hover:bg-rose-700 text-white font-black text-xs py-3 px-5 rounded-xl transition-all cursor-pointer"
                  >
                    Call safety dispatch desk
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT GONEST PANEL */}
          {activeTab === "About GoNest" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-850/60">
                <Info className="w-4.5 h-4.5 text-indigo-400" />
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider">About GoNest</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                GoNest is an exclusive co-commuter matching network created to connect verified campus students and enterprise corporate peers along identical travel corridors.
              </p>

              <div className="space-y-2 text-xs text-slate-400 bg-slate-950/80 p-4 border border-slate-850 rounded-xl">
                <p className="flex justify-between">
                  <span>Developer Team:</span>
                  <strong className="text-slate-200">GoNest Labs Inc</strong>
                </p>
                <p className="flex justify-between">
                  <span>Target Region:</span>
                  <strong className="text-slate-200">Boston Tech Corridor</strong>
                </p>
                <p className="flex justify-between">
                  <span>System Architecture:</span>
                  <strong className="text-slate-200">Vetted End-to-End Cryptography</strong>
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Security note footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
