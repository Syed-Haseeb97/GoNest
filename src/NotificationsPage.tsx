import React, { useState } from "react";
import { 
  Bell, 
  Check, 
  ArrowLeft, 
  Compass, 
  Car, 
  Sparkles, 
  UserCheck, 
  CreditCard, 
  AlertCircle,
  Clock,
  Settings
} from "lucide-react";

interface NotificationItem {
  id: string;
  type: "match" | "driver" | "update" | "billing" | "system";
  title: string;
  description: string;
  timestamp: string;
  timeLabel: "Today" | "This Week" | "Earlier";
  isUnread: boolean;
}

interface NotificationsPageProps {
  onBack: () => void;
  onNavigate: (view: any) => void;
}

export default function NotificationsPage({ onBack, onNavigate }: NotificationsPageProps) {
  const [filter, setFilter] = useState<string>("All");
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "nt-1",
      type: "match",
      title: "Join Request Accepted! 🎉",
      description: "Siddharth Nair accepted your commute matching request. Check the details to unlock pairing parameters.",
      timestamp: "10 mins ago",
      timeLabel: "Today",
      isUnread: true
    },
    {
      id: "nt-2",
      type: "match",
      title: "New compatible commuter nearby",
      description: "Elena Rostova (Northeastern Univ) is traveling along your exact trajectory. Matches 94% schedule tolerance.",
      timestamp: "2 hours ago",
      timeLabel: "Today",
      isUnread: true
    },
    {
      id: "nt-3",
      type: "driver",
      title: "Driver Assigned & Route Vetted",
      description: "Pilot captain Charles B. has been assigned to your recurring Monday pool. Vehicles passes GoNest vetting checklist.",
      timestamp: "Yesterday",
      timeLabel: "This Week",
      isUnread: false
    },
    {
      id: "nt-4",
      type: "update",
      title: "Holiday Schedule Alignment Reminder",
      description: "A holiday schedule has been calculated for next Monday. Click to verify your vacation commute holds.",
      timestamp: "3 days ago",
      timeLabel: "This Week",
      isUnread: false
    },
    {
      id: "nt-5",
      type: "billing",
      title: "Monthly Subscription Auto-Renew Safe",
      description: "Your monthly split-pass has successfully auto-renewed. Receipts delivered securely to your vetted email.",
      timestamp: "5 days ago",
      timeLabel: "This Week",
      isUnread: false
    },
    {
      id: "nt-6",
      type: "system",
      title: "Vetting Credentials Approved successfully",
      description: "GoNest safety system has approved your verified college registry credentials. Exclusive matches are unlocked.",
      timestamp: "1 week ago",
      timeLabel: "Earlier",
      isUnread: false
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isUnread: false })));
  };

  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to clear your notification alerts?")) {
      setNotifications([]);
    }
  };

  const getFilteredNotifications = () => {
    if (filter === "Unread") {
      return notifications.filter(n => n.isUnread);
    }
    if (filter === "Matches") {
      return notifications.filter(n => n.type === "match");
    }
    if (filter === "Updates") {
      return notifications.filter(n => n.type === "update" || n.type === "driver");
    }
    return notifications;
  };

  const filteredItems = getFilteredNotifications();

  // Categorize
  const todayItems = filteredItems.filter(n => n.timeLabel === "Today");
  const thisWeekItems = filteredItems.filter(n => n.timeLabel === "This Week");
  const earlierItems = filteredItems.filter(n => n.timeLabel === "Earlier");

  const getIconForType = (type: string) => {
    switch (type) {
      case "match":
        return <UserCheck className="w-4.5 h-4.5 text-emerald-400" />;
      case "driver":
        return <Car className="w-4.5 h-4.5 text-indigo-400" />;
      case "billing":
        return <CreditCard className="w-4.5 h-4.5 text-indigo-400" />;
      case "update":
        return <Clock className="w-4.5 h-4.5 text-amber-400" />;
      default:
        return <AlertCircle className="w-4.5 h-4.5 text-slate-400" />;
    }
  };

  return (
    <div id="notifications-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-2xl mx-auto z-10 relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-900">
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1.5 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
            Notification Deck
          </span>
        </div>

        {/* PAGE TITLE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-left">
          <div className="space-y-1">
            <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white flex items-center space-x-2">
              <Bell className="w-7 h-7 text-indigo-400" />
              <span>Activity Alerts</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Receive live updates concerning matching commuter pools, route changes, and scheduling notifications.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-all cursor-pointer border border-slate-850 bg-slate-900/40 hover:bg-slate-900 py-1.5 px-3 rounded-lg"
            >
              Mark all as read
            </button>
            <button
              onClick={handleDeleteAll}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-all cursor-pointer border border-slate-850 bg-slate-900/40 hover:bg-slate-900 py-1.5 px-3 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex space-x-1.5 mb-6 overflow-x-auto pb-1 text-xs">
          {["All", "Unread", "Matches", "Updates"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`py-2 px-4 rounded-xl border font-bold transition-all cursor-pointer shrink-0 ${
                filter === option 
                  ? "bg-indigo-600 border-indigo-500 text-white" 
                  : "bg-slate-900/40 border-slate-850 text-slate-400 hover:border-slate-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* NOTIFICATION FEED */}
        {filteredItems.length === 0 ? (
          <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-center text-slate-500 mx-auto">
              <Bell className="w-6 h-6 opacity-30" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-300">No alerts found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Any alerts matching your routing preferences, commute pools, or corporate system validations will appear right here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            
            {/* TODAY SECTION */}
            {todayItems.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Today</span>
                <div className="space-y-2.5">
                  {todayItems.map(item => (
                    <div 
                      key={item.id} 
                      className={`p-4.5 rounded-2xl border transition-all relative flex items-start space-x-3.5 ${
                        item.isUnread 
                          ? "bg-slate-900/80 border-indigo-500/35 shadow-md" 
                          : "bg-slate-900/30 border-slate-850/60 opacity-90"
                      }`}
                    >
                      {item.isUnread && (
                        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500" />
                      )}
                      
                      <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0">
                        {getIconForType(item.type)}
                      </div>

                      <div className="space-y-1.5 pr-4">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                          <span className="text-[9px] text-slate-500 font-medium">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* THIS WEEK SECTION */}
            {thisWeekItems.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">This Week</span>
                <div className="space-y-2.5">
                  {thisWeekItems.map(item => (
                    <div 
                      key={item.id} 
                      className="p-4.5 rounded-2xl border bg-slate-900/30 border-slate-850/60 opacity-90 transition-all flex items-start space-x-3.5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0">
                        {getIconForType(item.type)}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                          <span className="text-[9px] text-slate-500 font-medium">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EARLIER SECTION */}
            {earlierItems.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Earlier</span>
                <div className="space-y-2.5">
                  {earlierItems.map(item => (
                    <div 
                      key={item.id} 
                      className="p-4.5 rounded-2xl border bg-slate-900/20 border-slate-900 opacity-70 transition-all flex items-start space-x-3.5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0">
                        {getIconForType(item.type)}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                          <span className="text-[9px] text-slate-500 font-medium">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Security footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
