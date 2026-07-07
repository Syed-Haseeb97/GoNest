import React, { useState } from "react";
import { 
  Gift, 
  ArrowLeft, 
  Copy, 
  Check, 
  MessageSquare, 
  Mail, 
  Phone, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Award,
  ChevronRight
} from "lucide-react";

interface ReferInvitePageProps {
  onBack: () => void;
}

export default function ReferInvitePage({ onBack }: ReferInvitePageProps) {
  const referralCode = "NEST-MILLER-94X2";
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inviteText = `Join my exclusive co-commute circle on GoNest! Use my invite code ${referralCode} to unlock split-pass reward points.`;

  const inviteWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteText)}`;
  const inviteEmail = `mailto:?subject=Exclusive co-commute invitation&body=${encodeURIComponent(inviteText)}`;
  const inviteSMS = `sms:?&body=${encodeURIComponent(inviteText)}`;

  return (
    <div id="refer-invite-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-[-5%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

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
            Referral Deck
          </span>
        </div>

        {/* TITLE */}
        <div className="text-left space-y-1">
          <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white flex items-center space-x-2.5">
            <Gift className="w-7 h-7 text-indigo-400" />
            <span>Refer & Invite Peers</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Expand the vetting safety net. Refer verified campus classmates or corporate coworkers to unlock collective pass points.
          </p>
        </div>

        {/* REWARDS SUMMARY CARD */}
        <div className="bg-gradient-to-tr from-indigo-600/20 to-emerald-500/10 border border-indigo-500/35 p-6 rounded-2xl text-left space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-1">
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md inline-block">
              Referral Program Benefits
            </span>
            <h3 className="text-lg font-black text-slate-100 pt-1">Double-Sided Milestone Rewards</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Each successfully verified peer who joins unlocks free commute credits for both of you. No maximum caps.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">You Unlock</span>
              <p className="text-white font-extrabold text-sm mt-0.5">Two Weeks Free Route Credits</p>
            </div>
            <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">They Unlock</span>
              <p className="text-white font-extrabold text-sm mt-0.5">Premium Split-Pass Starter points</p>
            </div>
          </div>
        </div>

        {/* REFERRAL CODE DISPLAY WITH COPY BUTTON */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-center space-y-4">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Your Unique Referral Code</span>
          
          <div className="flex items-center justify-between bg-slate-950 border border-slate-850 rounded-xl p-3.5 max-w-md mx-auto">
            <span className="font-mono font-extrabold text-base sm:text-lg text-indigo-300 tracking-wider select-all">
              {referralCode}
            </span>
            <button
              onClick={handleCopy}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-bold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* SHARE DIRECT PLATFORMS */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-left space-y-4">
          <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Send Direct Invites</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* WhatsApp */}
            <a 
              href={inviteWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3 text-xs font-bold">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>

            {/* Email */}
            <a 
              href={inviteEmail}
              className="flex items-center justify-between p-4 bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3 text-xs font-bold">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>Email Invitation</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>

            {/* SMS */}
            <a 
              href={inviteSMS}
              className="flex items-center justify-between p-4 bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3 text-xs font-bold">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>SMS Invitation</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>

          </div>
        </div>

        {/* PROGRESS MILESTONE CARD */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-left space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-850/60">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Milestone Progress</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">3 Peer Invites Pending</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-300 text-[10px]">
                <span>Vetted classmates invited</span>
                <span>2 / 5 verified</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style={{ width: "40%" }} />
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-normal">
              Get 3 more classmates verified to unlock the **Diamond Commuter** tier, including custom vehicle upgrade options automatically.
            </p>
          </div>
        </div>

      </div>

      {/* Security note footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
