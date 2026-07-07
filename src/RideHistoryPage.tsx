import React, { useState } from "react";
import { 
  History, 
  Search, 
  Filter, 
  ArrowLeft, 
  MapPin, 
  Car, 
  Calendar, 
  TrendingDown, 
  DollarSign, 
  CheckCircle, 
  XCircle,
  AlertCircle
} from "lucide-react";

interface RideHistoryItem {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  vehicle: string;
  amountPaid: number;
  moneySaved: number;
  status: "Completed" | "Cancelled" | "Refunded";
}

interface RideHistoryPageProps {
  onBack: () => void;
}

export default function RideHistoryPage({ onBack }: RideHistoryPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const rides: RideHistoryItem[] = [
    {
      id: "rd-1",
      date: "Jul 02, 2026",
      pickup: "Oakwood Hills Residency",
      destination: "Campus Central, Tech Park",
      vehicle: "Tesla Model Y (Eco Split)",
      amountPaid: 12.50,
      moneySaved: 22.40,
      status: "Completed"
    },
    {
      id: "rd-2",
      date: "Jun 29, 2026",
      pickup: "Oakwood Hills Residency",
      destination: "Campus Central, Tech Park",
      vehicle: "Toyota Prius (Lounge Pool)",
      amountPaid: 12.50,
      moneySaved: 22.40,
      status: "Completed"
    },
    {
      id: "rd-3",
      date: "Jun 25, 2026",
      pickup: "Oakwood Hills Residency",
      destination: "Campus Central, Tech Park",
      vehicle: "Honda Accord (Standard Share)",
      amountPaid: 12.50,
      moneySaved: 22.40,
      status: "Completed"
    },
    {
      id: "rd-4",
      date: "Jun 22, 2026",
      pickup: "Oakwood Hills Residency",
      destination: "Campus Central, Tech Park",
      vehicle: "Tesla Model Y (Eco Split)",
      amountPaid: 0.00,
      moneySaved: 0.00,
      status: "Cancelled"
    },
    {
      id: "rd-5",
      date: "Jun 18, 2026",
      pickup: "Oakwood Hills Residency",
      destination: "Campus Central, Tech Park",
      vehicle: "Toyota Prius (Lounge Pool)",
      amountPaid: 12.50,
      moneySaved: 22.40,
      status: "Completed"
    },
    {
      id: "rd-6",
      date: "Jun 15, 2026",
      pickup: "Oakwood Hills Residency",
      destination: "Campus Central, Tech Park",
      vehicle: "Tesla Model Y (Eco Split)",
      amountPaid: 12.50,
      moneySaved: 22.40,
      status: "Refunded"
    }
  ];

  // Filters logic
  const filteredRides = rides.filter(ride => {
    const matchesSearch = 
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "All" || 
      ride.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate monthly stats
  const completedRidesCount = filteredRides.filter(r => r.status === "Completed").length;
  const totalSpent = filteredRides
    .filter(r => r.status === "Completed")
    .reduce((acc, r) => acc + r.amountPaid, 0);
  const totalSaved = filteredRides
    .filter(r => r.status === "Completed")
    .reduce((acc, r) => acc + r.moneySaved, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-bold px-2.5 py-1 rounded-md">
            <CheckCircle className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center space-x-1 text-rose-400 bg-rose-500/10 border border-rose-500/30 text-[9px] font-bold px-2.5 py-1 rounded-md">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 text-amber-400 bg-amber-500/10 border border-amber-500/30 text-[9px] font-bold px-2.5 py-1 rounded-md">
            <AlertCircle className="w-3 h-3" />
            <span>Refunded</span>
          </span>
        );
    }
  };

  return (
    <div id="ride-history-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
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
            Archive Passbook
          </span>
        </div>

        {/* TITLE */}
        <div className="text-left space-y-1">
          <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight text-white flex items-center space-x-2.5">
            <History className="w-7 h-7 text-indigo-400" />
            <span>Ride History Logs</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Access secure transaction details, shared fuel divisions, and vehicle telemetry records for completed commutes.
          </p>
        </div>

        {/* MONTHLY SUMMARY METRICS */}
        <div className="grid grid-cols-3 gap-4 text-left">
          
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Completed Commutes</span>
            <p className="text-xl font-extrabold text-white mt-1 font-mono">{completedRidesCount}</p>
            <span className="text-[9px] text-indigo-400 font-semibold block mt-0.5">100% attendance</span>
          </div>

          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Total Amount Paid</span>
            <p className="text-xl font-extrabold text-white mt-1 font-mono">${totalSpent.toFixed(2)}</p>
            <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Through secure wallet</span>
          </div>

          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Est. Money Saved</span>
            <p className="text-xl font-extrabold text-emerald-400 mt-1 font-mono">${totalSaved.toFixed(2)}</p>
            <span className="text-[9px] text-emerald-400 font-semibold block mt-0.5">Calculated fuel division</span>
          </div>

        </div>

        {/* CONTROLS (SEARCH & FILTER) */}
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search pickup, destination, or vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-850 focus:border-indigo-500 text-xs text-white rounded-xl pl-9 pr-4 py-3 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter pills */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 shrink-0 text-xs">
            {["All", "Completed", "Cancelled", "Refunded"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`py-2 px-4 rounded-xl border font-bold transition-all cursor-pointer shrink-0 ${
                  statusFilter === status 
                    ? "bg-indigo-600 border-indigo-500 text-white" 
                    : "bg-slate-900/40 border-slate-850 text-slate-400 hover:border-slate-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* FEED / LIST OF CARDS */}
        {filteredRides.length === 0 ? (
          <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-center text-slate-500 mx-auto">
              <History className="w-6 h-6 opacity-30" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-300">No ride records found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No matching historic transactions found inside your system cache. Create rides to view archives here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-left">
            {filteredRides.map((ride) => (
              <div 
                key={ride.id}
                className="bg-slate-900/30 hover:bg-slate-900/50 border border-slate-850/80 p-5 rounded-2xl transition-all relative space-y-3.5"
              >
                
                {/* Header (Date & Status Badge) */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold">{ride.date}</span>
                  </div>
                  {getStatusBadge(ride.status)}
                </div>

                {/* Journey Detail (Pickup & Drop) */}
                <div className="space-y-2 relative pl-4 border-l-2 border-slate-800">
                  <div className="space-y-0.5 text-xs">
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">Pickup</span>
                    <p className="text-slate-200 font-semibold flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{ride.pickup}</span>
                    </p>
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">Destination</span>
                    <p className="text-slate-200 font-semibold flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{ride.destination}</span>
                    </p>
                  </div>
                </div>

                {/* Footer specs (Vehicle, Paid, Saved) */}
                <div className="pt-3 border-t border-slate-850/40 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  
                  {/* Vehicle */}
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-300 font-medium">{ride.vehicle}</span>
                  </div>

                  {/* Paid */}
                  <div className="flex items-center space-x-1.5 sm:justify-center">
                    <span className="text-slate-500 uppercase text-[9px] font-bold">Paid:</span>
                    <span className="font-mono font-bold text-slate-200">${ride.amountPaid.toFixed(2)}</span>
                  </div>

                  {/* Saved */}
                  <div className="flex items-center space-x-1.5 sm:justify-end">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-mono font-bold">Saved ${ride.moneySaved.toFixed(2)}</span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Security note footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
