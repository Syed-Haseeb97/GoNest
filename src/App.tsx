import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CommuteProvider, useCommute } from "./contexts/CommuteContext";
import { 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ArrowRight, 
  Star, 
  Menu, 
  X, 
  ChevronDown, 
  DollarSign, 
  Clock, 
  Compass, 
  Mail, 
  Phone, 
  Map, 
  GraduationCap, 
  Briefcase, 
  School, 
  Building2, 
  Award, 
  CheckCircle2, 
  ThumbsUp, 
  Info,
  Navigation,
  Loader2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import heroCommuteImage from "./assets/images/hero_commute_1783334017673.jpg";
import Login from "./Login.tsx";
import SignUp from "./SignUp.tsx";
import Onboarding from "./Onboarding.tsx";
import ProfileSetup from "./ProfileSetup.tsx";
import CreateCommute from "./CreateCommute.tsx";
import ReviewConfirm from "./ReviewConfirm.tsx";
import MatchingResults from "./MatchingResults.tsx";
import MatchDetails from "./MatchDetails.tsx";
import JoinRequestSent from "./JoinRequestSent.tsx";

// New Dashboard & Sub-pages
import PassengerDashboard from "./PassengerDashboard.tsx";
import NotificationsPage from "./NotificationsPage.tsx";
import ProfilePage from "./ProfilePage.tsx";
import SettingsPage from "./SettingsPage.tsx";
import MyCommutePage from "./MyCommutePage.tsx";
import RideHistoryPage from "./RideHistoryPage.tsx";
import PauseCommutePage from "./PauseCommutePage.tsx";
import HelpSupportPage from "./HelpSupportPage.tsx";
import ReferInvitePage from "./ReferInvitePage.tsx";

// Types
type CommuterRole = "student" | "teacher" | "worker" | "commuter";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// Country & Currency Configurations
export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  rate: number;
  locale: string;
}

export const countries: CountryConfig[] = [
  { code: "Rps", name: "Rupees (rps)", currency: "INR", symbol: "rps", rate: 1.0, locale: "en-IN" },
  { code: "US", name: "United States (USD)", currency: "USD", symbol: "$", rate: 0.012, locale: "en-US" },
  { code: "IN", name: "India (INR)", currency: "INR", symbol: "₹", rate: 1.0, locale: "en-IN" },
  { code: "GB", name: "United Kingdom (GBP)", currency: "GBP", symbol: "£", rate: 0.0095, locale: "en-GB" },
  { code: "AE", name: "United Arab Emirates (AED)", currency: "AED", symbol: "AED", rate: 0.044, locale: "en-AE" },
  { code: "EU", name: "Europe (EUR)", currency: "EUR", symbol: "€", rate: 0.011, locale: "de-DE" },
  { code: "CA", name: "Canada (CAD)", currency: "CAD", symbol: "C$", rate: 0.016, locale: "en-CA" },
  { code: "AU", name: "Australia (AUD)", currency: "AUD", symbol: "A$", rate: 0.018, locale: "en-AU" },
  { code: "JP", name: "Japan (JPY)", currency: "JPY", symbol: "¥", rate: 1.85, locale: "ja-JP" }
];

const detectDefaultCountry = (): string => {
  return "Rps";
};

function AppContent() {
  const { currentUser, userProfile, logout } = useAuth();
  const { addCommute } = useCommute();

  // Navigation View State
  const [currentView, setCurrentView] = useState<
    "landing" | "login" | "signup" | "onboarding" | "profile-setup" | "create-commute" | "review-confirm" | "matching-results" | "match-details" | "join-request-sent" |
    "dashboard" | "notifications" | "settings" | "profile" | "today-commute" | "history" | "pause-commute" | "support" | "refer"
  >("landing");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [commuteData, setCommuteData] = useState<any>({});
  const [selectedCohort, setSelectedCohort] = useState<any>(null);

  // Auto detect userEmail from authenticated currentUser on mount
  useEffect(() => {
    if (currentUser) {
      setUserEmail(currentUser.email);
    } else {
      setUserEmail(null);
    }
  }, [currentUser]);

  // Protected route redirects
  useEffect(() => {
    if (currentUser) {
      if (currentView === "landing" || currentView === "login" || currentView === "signup") {
        if (userProfile?.onboardingCompleted) {
          setCurrentView("dashboard");
        } else {
          setCurrentView("onboarding");
        }
      }
    } else {
      if (currentView !== "landing" && currentView !== "login" && currentView !== "signup") {
        setCurrentView("landing");
      }
    }
  }, [currentUser, userProfile, currentView]);

  // Mobile Nav Toggle State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll position indicator
  const [scrolled, setScrolled] = useState(false);

  // Currency & Region States
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  // Auto detect country on mount
  useEffect(() => {
    setSelectedCountry(detectDefaultCountry());
  }, []);

  // Helper to format prices based on active currency/country rate
  const formatPrice = (amount: number): string => {
    const country = countries.find(c => c.code === selectedCountry) || countries[0];
    const localAmount = amount * country.rate;
    if (country.code === "Rps") {
      return `rps ${Math.round(localAmount).toLocaleString()}`;
    }
    return new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: country.currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(localAmount);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistError("");
    if (!waitlistEmail || !waitlistEmail.includes("@")) {
      setWaitlistError("Please enter a valid email address.");
      return;
    }
    setWaitlistLoading(true);
    setTimeout(() => {
      setWaitlistLoading(false);
      setWaitlistSubmitted(true);
    }, 1200);
  };

  // Waitlist States for Launching Soon Section
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  // Interactive Savings Calculator States
  const [calculatorRole, setCalculatorRole] = useState<CommuterRole>("worker");
  const [commuteDistance, setCommuteDistance] = useState<number>(32); // kms (one-way)
  const [daysPerMonth, setDaysPerMonth] = useState<number>(20); // standard work/school days

  // Interactive Match Previewer States
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [matchingStep, setMatchingStep] = useState<"idle" | "searching" | "matched">("idle");
  const [simulatedMatchProgress, setSimulatedMatchProgress] = useState<number>(0);

  // Role Showcase active tab
  const [activeRoleTab, setActiveRoleTab] = useState<CommuterRole>("student");

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Onboarding Modal State
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingRole, setOnboardingRole] = useState<CommuterRole>("worker");
  const [onboardingZip, setOnboardingZip] = useState("");
  const [onboardingDestination, setOnboardingDestination] = useState("");
  const [onboardingStatus, setOnboardingStatus] = useState<"filling" | "simulating" | "success">("filling");

  // Track window scroll for shadow in header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Match Simulation inside Demo Widget
  const triggerDemoMatch = () => {
    setMatchingStep("searching");
    setSimulatedMatchProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (matchingStep === "searching") {
      interval = setInterval(() => {
        setSimulatedMatchProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setMatchingStep("matched");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [matchingStep]);

  // Handle Onboarding modal match simulation
  const triggerOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardingStatus("simulating");
    setTimeout(() => {
      setOnboardingStatus("success");
    }, 2400);
  };

  // Mock Routes for Demo Matcher
  const sampleRoutes = [
    {
      from: "Greenwood Suburbs",
      to: "Downtown Financial District",
      distance: 35,
      commuters: ["Alex M. (Financial Analyst)", "Sarah T. (Consultant)", "Elena R. (Tech Recruiter)"],
      driver: "James D. (Verified Professional, Tesla Model Y)",
      departTime: "7:45 AM",
      returnTime: "5:30 PM",
      price: 18200
    },
    {
      from: "Westside Family Village",
      to: "State University South Campus",
      distance: 20,
      commuters: ["Jordan P. (Junior, Engineering)", "Kaitlyn S. (Senior, Arts)", "Marcus B. (Grad Student)"],
      driver: "Prof. Chloe G. (Verified Faculty, Prius)",
      departTime: "8:15 AM",
      returnTime: "4:00 PM",
      price: 10400
    },
    {
      from: "Eastgate Residential Park",
      to: "Oakridge Science & Prep High School",
      distance: 24,
      commuters: ["Mr. Harrison (Math Teacher)", "Mrs. Alvarez (History Dept)", "Ethan W. (AP Physics Teacher)"],
      driver: "Robert L. (Verified Senior Teacher, Subaru Outback)",
      departTime: "7:15 AM",
      returnTime: "3:45 PM",
      price: 12480
    }
  ];

  // Live Savings Calculation Engine
  const calculateSavings = () => {
    // Fare is exactly 13 rps per km for GoNest shared rides
    const goNestFarePerKm = 13;
    const gasAndMaintenancePerKm = 25; // in Rupees/rps
    let monthlyParking = 12000; // in Rupees/rps
    let monthlyTolls = 4000; // in Rupees/rps

    if (calculatorRole === "student") {
      monthlyParking = 3000;
      monthlyTolls = 1000;
    } else if (calculatorRole === "teacher") {
      monthlyParking = 4000;
      monthlyTolls = 2000;
    } else if (calculatorRole === "worker") {
      monthlyParking = 12000;
      monthlyTolls = 4000;
    }

    const totalKmsPerMonth = commuteDistance * 2 * daysPerMonth;
    const soloDrivingCost = Math.round((totalKmsPerMonth * gasAndMaintenancePerKm) + monthlyParking + monthlyTolls);
    const goNestCost = Math.round(totalKmsPerMonth * goNestFarePerKm);

    const monthlySavings = Math.max(500, soloDrivingCost - goNestCost);
    const yearlySavings = monthlySavings * 11; // assuming 11 active months

    return {
      solo: soloDrivingCost,
      goNest: goNestCost,
      savings: monthlySavings,
      yearlySavings: yearlySavings
    };
  };

  const currentSavings = calculateSavings();

  // FAQ Array
  const faqs: FaqItem[] = [
    {
      id: 1,
      question: "How does the monthly booking model work?",
      answer: "Unlike on-demand rideshare apps where you book trip-by-trip with unpredictable surge prices, GoNest locks in your commute for the entire month. You get a set schedule, a designated pickup point, and a consistent ride group of peers. You pay a single flat monthly rate with zero hidden costs."
    },
    {
      id: 2,
      question: "How are drivers vetted and verified?",
      answer: "Safety is our top priority. All drivers undergo a rigorous multi-step screening process, including comprehensive criminal background checks, DMV driving record reviews, vehicle safety inspections, and identity/employment verification. In addition, we match riders specifically based on shared workspaces, campuses, or educational institutions for an added layer of safety."
    },
    {
      id: 3,
      question: "What if my schedule changes or I miss a ride?",
      answer: "We understand life happens! Our mobile app allows you to easily coordinate with your ride group. If you have an occasional late day, you can message your group to notify them, or quickly claim a seat on an alternative 'backup run' on our network. For permanent schedule shifts, our matching system can re-group you with another compatible vehicle."
    },
    {
      id: 4,
      question: "Can I choose to be a rider, a driver, or both?",
      answer: "Yes! When setting up your profile, you can register as a Passenger, or apply to be a Commuter Driver. Drivers use their own personal vehicles, enjoy heavily subsidized commute costs, receive monthly split compensation, and are allowed to use the high-occupancy vehicle (HOV) lanes to speed up their travel."
    },
    {
      id: 5,
      question: "How does GoNest compare to public transit or traditional carpooling?",
      answer: "GoNest combines the comfort and door-to-hub convenience of a personal vehicle with the low cost of public transit. Unlike traditional carpooling which requires awkward peer negotiations and manual schedule coordination, our app completely automates the matching, calendar syncing, routing, and payment splitting."
    }
  ];

  if (currentView === "onboarding") {
    return (
      <Onboarding 
        onComplete={() => setCurrentView("profile-setup")}
        onSkip={() => setCurrentView("profile-setup")}
      />
    );
  }

  if (currentView === "profile-setup") {
    return (
      <ProfileSetup 
        userEmail={userEmail || "commuter@gonest.com"}
        onSave={(profileData) => {
          console.log("Profile Data Saved:", profileData);
          setCurrentView("create-commute");
        }}
        onBackToOnboarding={() => setCurrentView("onboarding")}
      />
    );
  }

  if (currentView === "create-commute") {
    return (
      <CreateCommute 
        onBack={() => setCurrentView("profile-setup")}
        onSuccess={(commuteDetails) => {
          console.log("Commute Setup Complete:", commuteDetails);
          setCommuteData(commuteDetails);
          setCurrentView("review-confirm");
        }}
      />
    );
  }

  if (currentView === "review-confirm") {
    return (
      <ReviewConfirm 
        commuteData={commuteData}
        onBack={() => setCurrentView("create-commute")}
        onConfirm={() => {
          setCurrentView("matching-results");
        }}
      />
    );
  }

  if (currentView === "matching-results") {
    return (
      <MatchingResults 
        commuteData={commuteData}
        onBack={() => setCurrentView("review-confirm")}
        onSkip={() => {
          setCurrentView("landing");
        }}
        onSelectCohort={(cohortDetails) => {
          console.log("Selected Cohort:", cohortDetails);
          setSelectedCohort(cohortDetails);
          setCurrentView("match-details");
        }}
      />
    );
  }

  if (currentView === "match-details") {
    return (
      <MatchDetails 
        cohortData={selectedCohort}
        onBack={() => setCurrentView("matching-results")}
        onRequestJoin={() => {
          setCurrentView("join-request-sent");
        }}
      />
    );
  }

  if (currentView === "join-request-sent") {
    return (
      <JoinRequestSent 
        cohortData={selectedCohort}
        onContinueBrowsing={() => {
          setCurrentView("matching-results");
        }}
        onGoToDashboard={() => {
          setCurrentView("dashboard");
        }}
      />
    );
  }

  // PASSENGER DASHBOARD & SUB-PAGES ROUTING
  if (currentView === "dashboard") {
    return (
      <PassengerDashboard 
        firstName={userEmail ? userEmail.split("@")[0] : "James"}
        onNavigate={(view: any) => {
          if (view === "dashboard") setCurrentView("dashboard");
          else if (view === "notifications") setCurrentView("notifications");
          else if (view === "settings") setCurrentView("settings");
          else if (view === "profile") setCurrentView("profile");
          else if (view === "today-commute") setCurrentView("today-commute");
          else if (view === "matches") setCurrentView("matching-results");
          else if (view === "history") setCurrentView("history");
          else if (view === "pause-commute") setCurrentView("pause-commute");
          else if (view === "support") setCurrentView("support");
          else if (view === "refer") setCurrentView("refer");
        }}
      />
    );
  }

  if (currentView === "notifications") {
    return (
      <NotificationsPage 
        onBack={() => setCurrentView("dashboard")}
        onNavigate={(view: any) => {
          if (view === "dashboard") setCurrentView("dashboard");
          else if (view === "notifications") setCurrentView("notifications");
          else if (view === "settings") setCurrentView("settings");
          else if (view === "profile") setCurrentView("profile");
          else if (view === "today-commute") setCurrentView("today-commute");
          else if (view === "matches") setCurrentView("matching-results");
          else if (view === "history") setCurrentView("history");
          else if (view === "pause-commute") setCurrentView("pause-commute");
          else if (view === "support") setCurrentView("support");
          else if (view === "refer") setCurrentView("refer");
        }}
      />
    );
  }

  if (currentView === "settings") {
    return (
      <SettingsPage 
        onBack={() => setCurrentView("dashboard")}
        onLogout={() => {
          setUserEmail(null);
          setCurrentView("landing");
        }}
      />
    );
  }

  if (currentView === "profile") {
    return (
      <ProfilePage 
        onBack={() => setCurrentView("dashboard")}
        onEditProfile={() => setCurrentView("profile-setup")}
        onViewCommute={() => setCurrentView("today-commute")}
        profileData={{
          email: userEmail || "james.miller@bostoncampus.edu",
          fullName: userEmail ? userEmail.split("@")[0] + " Miller" : "James Miller"
        }}
      />
    );
  }

  if (currentView === "today-commute") {
    return (
      <MyCommutePage 
        onBack={() => setCurrentView("dashboard")}
        onEdit={() => setCurrentView("create-commute")}
        onPause={() => setCurrentView("pause-commute")}
        onCancel={() => setCurrentView("dashboard")}
        commuteData={commuteData}
      />
    );
  }

  if (currentView === "history") {
    return (
      <RideHistoryPage 
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "pause-commute") {
    return (
      <PauseCommutePage 
        onBack={() => setCurrentView("dashboard")}
        onPauseSuccess={(details) => {
          console.log("Commute paused details:", details);
          setCurrentView("dashboard");
        }}
      />
    );
  }

  if (currentView === "support") {
    return (
      <HelpSupportPage 
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "refer") {
    return (
      <ReferInvitePage 
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "signup") {
    return (
      <SignUp 
        onBack={() => setCurrentView("landing")}
        onLoginRedirect={() => setCurrentView("login")}
        onSignUpSuccess={(email) => {
          setUserEmail(email);
          setCurrentView("onboarding");
        }}
      />
    );
  }

  if (currentView === "login") {
    return (
      <Login 
        onBack={() => setCurrentView("landing")} 
        onLoginSuccess={(email) => {
          setUserEmail(email);
          setCurrentView("onboarding");
        }}
        initialMode="login"
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative">
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-indigo-100/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[800px] left-0 w-[400px] h-[400px] bg-gradient-to-r from-emerald-50/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* HEADER / NAVIGATION BAR */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
              <Car className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Daily<span className="text-indigo-900">Go</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#calculator" className="hover:text-indigo-600 transition-colors">Savings Calculator</a>
            <a href="#matcher" className="hover:text-indigo-600 transition-colors">Interactive Matcher</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#waitlist" className="hover:text-indigo-600 font-semibold text-indigo-600 transition-colors bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100/60">Join Waitlist</a>
            <a href="#faqs" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </nav>

          {/* Region Selector + Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Country Selector Dropdown */}
            <div className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 py-1.5 px-2.5 rounded-xl transition-all">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Region:</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer pr-1 border-none"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code} className="text-slate-900 bg-white">
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {userEmail ? (
              <>
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors py-2 px-2.5 cursor-pointer bg-emerald-50 border border-emerald-100/50 rounded-xl"
                >
                  My Dashboard
                </button>
                <button
                  onClick={() => setCurrentView("onboarding")}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors py-2 px-2 cursor-pointer"
                >
                  Onboarding Tour
                </button>
                <span className="text-xs font-semibold text-slate-600 bg-indigo-50 border border-indigo-100/60 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="truncate max-w-[120px]">{userEmail}</span>
                </span>
                <button
                  onClick={() => setUserEmail(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors py-2 px-2 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView("login")}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors py-2 px-2.5 cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentView("signup")}
                  className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-sm font-semibold py-2 px-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-150 cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-100 bg-white"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 font-medium text-slate-700">
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-indigo-600"
                >
                  Features
                </a>
                <a 
                  href="#calculator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-indigo-600"
                >
                  Savings Calculator
                </a>
                <a 
                  href="#matcher" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-indigo-600"
                >
                  Interactive Matcher
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-indigo-600"
                >
                  How It Works
                </a>
                <a 
                  href="#waitlist" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl bg-indigo-50 font-semibold text-indigo-700 hover:bg-indigo-100/60"
                >
                  Join Waitlist
                </a>
                <a 
                  href="#faqs" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-indigo-600"
                >
                  FAQ
                </a>

                {/* Mobile Region Selector */}
                <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select Region:</span>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer py-1.5 px-3 rounded-xl"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex flex-col space-y-3 px-3">
                  {userEmail ? (
                    <>
                      <span className="text-xs font-semibold text-slate-600 bg-indigo-50 border border-indigo-100/60 px-3 py-2.5 rounded-xl flex items-center justify-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="truncate max-w-[200px]">{userEmail}</span>
                      </span>
                      <button
                        onClick={() => { setMobileMenuOpen(false); setUserEmail(null); }}
                        className="w-full text-center py-2.5 border border-slate-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-50 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => { setMobileMenuOpen(false); setCurrentView("login"); }}
                        className="w-full text-center py-2.5 border border-slate-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-50 cursor-pointer"
                      >
                        Login
                      </button>
                      <button 
                        onClick={() => { setMobileMenuOpen(false); setCurrentView("signup"); }}
                        className="w-full text-center py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-100 cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              {/* Trust Tag */}
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-indigo-700 animate-fade-in mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-indigo-500 fill-indigo-100" />
                <span>Smart Shared Transport for Your Community</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Smarter Daily Commutes<span className="text-indigo-600">.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                GoNest helps students, teachers, office employees, and everyday commuters find reliable monthly shared rides, reduce travel costs, and commute together safely.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => { setOnboardingRole("worker"); setOnboardingStep(1); setOnboardingStatus("filling"); setIsOnboardingOpen(true); }}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#calculator"
                  className="w-full sm:w-auto border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold py-3.5 px-8 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <span>Learn More</span>
                </a>
              </div>

              {/* Quick Trust Statistics */}
              <div className="pt-6 sm:pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">4.9★</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">App Store Rating</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">10k+</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Monthly Riders</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">60%</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Avg. Cost Saved</p>
                </div>
              </div>

              {/* GoNest vs traditional ride-hailing (Uber, Ola, Rapido) */}
              <div className="pt-6 border-t border-slate-200/50 space-y-3.5">
                <h4 className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span>How GoNest is different from Uber, Ola, and Rapido:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm">
                    <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">GoNest Subscription Model</p>
                    <ul className="text-xs text-slate-600 mt-2 space-y-1.5 list-disc list-inside">
                      <li>One flat monthly pass, split-cost.</li>
                      <li>Vetted, locked-in stable co-rider peers.</li>
                      <li>Scheduled recurring rides, zero wait time.</li>
                      <li>No surge pricing — fixed and predictable.</li>
                    </ul>
                  </div>
                  <div className="bg-slate-100/50 p-3.5 rounded-xl border border-slate-200/40">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Standard Ride-Hailing Apps</p>
                    <ul className="text-xs text-slate-500 mt-2 space-y-1.5 list-disc list-inside">
                      <li>Per-trip high variable fares daily.</li>
                      <li>Random, un-vetted drivers every trip.</li>
                      <li>Unpredictable wait and cancellation stress.</li>
                      <li>Surge pricing spikes up to 3x in peak.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right: Premium Image + Floating Interface Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              <div className="relative max-w-md sm:max-w-lg lg:max-w-none w-full">
                
                {/* Visual Glow background */}
                <div className="absolute inset-0 bg-indigo-500 rounded-3xl opacity-10 blur-xl scale-95" />

                {/* Main Hero Image Container */}
                <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-slate-100 overflow-hidden group">
                  <img
                    src={heroCommuteImage}
                    alt="GoNest Shared Commute Illustration"
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle glass overlay inside image for style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
                </div>

                {/* Floating Commuter Card - Smart matching in progress visual */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 max-w-[280px] sm:max-w-xs flex items-start space-x-3.5"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                      Matched Successfully
                    </span>
                    <h4 className="text-sm font-bold text-slate-950">University Commute Group</h4>
                    <p className="text-xs text-slate-500 mt-1">3 co-riders matched on Westside Loop. Leaving daily at 8:00 AM.</p>
                    <div className="flex -space-x-2 mt-2">
                      <img className="w-6 h-6 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60" alt="" referrerPolicy="no-referrer" />
                      <img className="w-6 h-6 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60" alt="" referrerPolicy="no-referrer" />
                      <img className="w-6 h-6 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60" alt="" referrerPolicy="no-referrer" />
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 text-slate-600 text-[9px] font-bold flex items-center justify-center font-mono">+1</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Price Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-indigo-600 text-white rounded-2xl shadow-lg p-3 flex flex-col items-center justify-center font-bold text-center"
                >
                  <p className="text-[10px] uppercase tracking-wider text-indigo-100 font-semibold">Starts At</p>
                  <p className="text-xl font-extrabold">{formatPrice(79)}<span className="text-xs text-indigo-200">/mo</span></p>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Designed for Commuters</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Premium Shared Travel, Simplified.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              GoNest transforms your everyday drive into a highly reliable, cost-effective, and community-driven monthly experience. Here is how we differ from conventional transport:
            </p>
          </div>

          {/* Grid of 4 Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1: Monthly Commute Booking */}
            <div className="bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                  Monthly Commute Booking
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lock in your rides for the entire month. Enjoy a static, guaranteed schedule customized to your classes or office shifts with zero daily hassle or dynamic pricing.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100/80 mt-6 flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                <span>Monthly passes secured</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 2: Shared Ride Savings */}
            <div className="bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 flex items-center justify-center text-emerald-600 group-hover:text-white transition-colors">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                  Shared Ride Savings
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Split the costs of fuel, toll roads, and parking garages among 4 matched co-riders. Keep up to 60% of your current commuting budget in your pocket every single month.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100/80 mt-6 flex items-center text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                <span>Save up to $300/mo</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 3: Smart Passenger Matching */}
            <div className="bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-500 flex items-center justify-center text-amber-500 group-hover:text-white transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-950 transition-colors">
                  Smart Passenger Matching
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our advanced smart routing algorithms group you exclusively with co-riders from your same academic campus, workplace facility, or office complex.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100/80 mt-6 flex items-center text-xs font-bold text-amber-600 group-hover:text-amber-700">
                <span>Matched by community</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 4: Safe & Reliable Travel */}
            <div className="bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">
                  Safe & Reliable Travel
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every driver is background vetted and fully verified. Ride in peace with consistent cohorts, real-time trip check-ins, and high quality passenger profiles.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100/80 mt-6 flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                <span>100% Vetted Drivers</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE COMMUTE SAVINGS CALCULATOR */}
      <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        
        {/* Decorative Grid backdrop */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Calculator Info Panel */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <span className="inline-block bg-indigo-500/10 text-indigo-400 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                Interactive Savings Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Calculate Your Commute Savings
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Driving alone is highly inefficient. Split parking, gas, and tolls, and watch your monthly expenses plunge. Tell us about your commute profile to preview your monthly budget breakdown.
              </p>
              
              <div className="space-y-4 pt-4 text-left hidden sm:block">
                <div className="flex items-center space-x-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-200">
                    Students save an average of <span className="font-bold text-emerald-400">{formatPrice(1980)} per academic year</span>.
                  </p>
                </div>
                <div className="flex items-center space-x-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-200">
                    Office Workers cut gas and downtown parking costs by <span className="font-bold text-emerald-400">up to 72%</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator Widget Card */}
            <div className="lg:col-span-7 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
              
              {/* Highlight sticker */}
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-[11px] px-3.5 py-1 rounded-full shadow-lg">
                Estimated 68% Savings
              </div>

              <div className="space-y-6 sm:space-y-8">
                
                {/* Region Selector inside Calculator */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-5">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-slate-200">Local Currency Setup</h3>
                    <p className="text-xs text-slate-400">All pricing estimates dynamically translate to your region</p>
                  </div>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 focus:outline-none cursor-pointer py-1.5 px-3 rounded-xl focus:border-indigo-500 transition-colors"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code} className="text-slate-900 bg-white">
                        {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 1. Select Commuter Profile */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                    1. Who is commuting?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "student", label: "Student", icon: GraduationCap },
                      { id: "teacher", label: "Teacher", icon: School },
                      { id: "worker", label: "Office Worker", icon: Briefcase },
                      { id: "commuter", label: "Commuter", icon: Users }
                    ].map((role) => {
                      const Icon = role.icon;
                      const active = calculatorRole === role.id;
                      return (
                        <button
                          key={role.id}
                          onClick={() => setCalculatorRole(role.id as CommuterRole)}
                          className={`flex items-center justify-center space-x-1.5 py-3 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            active 
                              ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10" 
                              : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Slider - One-way commute distance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      2. Commute Distance (One-Way)
                    </label>
                    <span className="text-lg font-bold text-white font-mono bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-700">
                      {commuteDistance} kms
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={commuteDistance}
                    onChange={(e) => setCommuteDistance(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 px-1 font-mono">
                    <span>5 km</span>
                    <span>20 km</span>
                    <span>40 km</span>
                    <span>60 km</span>
                  </div>
                </div>

                {/* 3. Dropdown / selector - Days per week */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      3. Commute Days per Month
                    </label>
                    <span className="text-sm font-bold text-white font-mono">
                      {daysPerMonth} days
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[12, 16, 20, 24].map((days) => (
                      <button
                        key={days}
                        onClick={() => setDaysPerMonth(days)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          daysPerMonth === days
                            ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                            : "bg-slate-900/40 border-slate-700 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {days} days
                      </button>
                    ))}
                  </div>
                </div>

                {/* Savings Presentation Row */}
                <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-6 border border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                  
                  {/* Driving Solo Cost */}
                  <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-slate-700 pb-4 sm:pb-0 sm:pr-4">
                    <p className="text-xs text-slate-400 font-semibold uppercase">Driving Solo</p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-300 mt-1 font-mono">
                      {formatPrice(currentSavings.solo)}
                      <span className="text-xs text-slate-500 font-normal">/mo</span>
                    </p>
                  </div>

                  {/* GoNest Shared Cost */}
                  <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-slate-700 pb-4 sm:pb-0 sm:px-4">
                    <p className="text-xs text-indigo-400 font-bold uppercase flex items-center justify-center sm:justify-start space-x-1">
                      <Car className="w-3.5 h-3.5 text-indigo-400" />
                      <span>GoNest Cost</span>
                    </p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                      {formatPrice(currentSavings.goNest)}
                      <span className="text-xs text-slate-400 font-normal">/mo</span>
                    </p>
                  </div>

                  {/* Your Monthly Savings */}
                  <div className="text-center sm:text-left sm:pl-4">
                    <p className="text-xs text-emerald-400 font-extrabold uppercase">Monthly Savings</p>
                    <motion.p 
                      key={currentSavings.savings}
                      initial={{ scale: 0.9, opacity: 0.7 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1 font-mono"
                    >
                      {formatPrice(currentSavings.savings)}
                    </motion.p>
                  </div>

                </div>

                {/* Action in calculator */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center space-x-2.5 text-xs text-slate-400">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Estimated yearly cash savings: <strong className="text-white font-mono font-bold">{formatPrice(currentSavings.yearlySavings)}</strong></span>
                  </div>
                  <button
                    onClick={() => { setOnboardingRole(calculatorRole); setOnboardingStep(1); setOnboardingStatus("filling"); setIsOnboardingOpen(true); }}
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-1.5 cursor-pointer text-sm"
                  >
                    <span>Lock In Your Savings</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE ROUTE MATCH PREVIEWER DEMO */}
      <section id="matcher" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Instant Queue Simulation</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              See Live Matches In Action
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Wondering who drives on your route? Click on one of our premium preset routes below, and trigger our smart simulation engine to see an actual group formation mockup instantly!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left side: Route Selector list */}
            <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Select A Preset Commuter Line</p>
              
              {sampleRoutes.map((route, idx) => {
                const isSelected = selectedRouteIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedRouteIndex(idx);
                      setMatchingStep("idle");
                    }}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-200 flex items-start justify-between cursor-pointer ${
                      isSelected 
                        ? "bg-indigo-50/50 border-indigo-200 shadow-sm" 
                        : "bg-slate-50 border-slate-100 hover:bg-slate-100/50 hover:border-slate-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-400 uppercase">Commute line {idx+1}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-1">{route.from}</p>
                      <p className="text-xs text-slate-500 font-medium">To {route.to}</p>
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded-lg">
                      {route.distance} kms
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right side: Live Simulated Screen */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
              
              {/* Dynamic matching state visuals */}
              {matchingStep === "idle" && (
                <div className="my-auto py-12 text-center space-y-5">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Navigation className="w-8 h-8 animate-pulse text-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900">Ready to Match Route</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Review schedule configuration and click below to simulate matches for <strong className="text-slate-800">{sampleRoutes[selectedRouteIndex].from}</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 inline-grid grid-cols-2 gap-4 text-left max-w-xs mx-auto">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Morning Slot</p>
                      <p className="text-xs font-bold text-slate-800">{sampleRoutes[selectedRouteIndex].departTime}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Evening Return</p>
                      <p className="text-xs font-bold text-slate-800">{sampleRoutes[selectedRouteIndex].returnTime}</p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={triggerDemoMatch}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Search Smart Cohorts
                    </button>
                  </div>
                </div>
              )}

              {matchingStep === "searching" && (
                <div className="my-auto py-16 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    {/* Ring loader */}
                    <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                      <Car className="w-8 h-8 text-indigo-500 animate-bounce" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900">Querying Neighbor Cohorts...</h4>
                    <div className="w-48 bg-slate-200 h-1.5 rounded-full mx-auto overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full transition-all duration-200"
                        style={{ width: `${simulatedMatchProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 font-mono">Matched score: {simulatedMatchProgress}%</p>
                  </div>
                </div>
              )}

              {matchingStep === "matched" && (
                <div className="space-y-6">
                  
                  {/* Header in success */}
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                    <div>
                      <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                        Match Confirmed!
                      </span>
                      <h4 className="text-base font-bold text-slate-900">Optimal Group Formed</h4>
                    </div>
                    <p className="text-lg font-extrabold text-emerald-600">{formatPrice(sampleRoutes[selectedRouteIndex].price)}/mo</p>
                  </div>

                  {/* Route Visualizer Graph */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Pickup: {sampleRoutes[selectedRouteIndex].from}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Dest: {sampleRoutes[selectedRouteIndex].to}</span>
                      </span>
                    </div>

                    {/* Progress representation bar */}
                    <div className="relative h-2 bg-slate-100 rounded-full flex items-center justify-between px-1">
                      <div className="absolute top-0 left-0 bg-indigo-500 h-full rounded-full w-full" />
                      <div className="w-4.5 h-4.5 rounded-full bg-indigo-600 border-2 border-white relative z-10 shadow-sm" />
                      <div className="w-3.5 h-3.5 rounded-full bg-indigo-400 border-2 border-white relative z-10 shadow-sm" />
                      <div className="w-3.5 h-3.5 rounded-full bg-indigo-400 border-2 border-white relative z-10 shadow-sm" />
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white relative z-10 shadow-sm" />
                    </div>
                  </div>

                  {/* Vetted Driver details */}
                  <div className="bg-indigo-50/50 rounded-2xl p-4.5 border border-indigo-100/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                        JD
                      </div>
                      <div>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Assigned Vetted Driver</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">{sampleRoutes[selectedRouteIndex].driver}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold bg-white px-2 py-1 rounded-lg border border-slate-100">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.95</span>
                    </div>
                  </div>

                  {/* Riders matching in the car */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Matched Cohort Members</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {sampleRoutes[selectedRouteIndex].commuters.map((commuter, cIdx) => (
                        <div key={cIdx} className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span className="text-[11px] font-semibold text-slate-700 truncate">{commuter}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA inside matched */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setMatchingStep("idle")}
                      className="w-full sm:w-auto text-slate-500 hover:text-slate-800 text-xs font-bold py-2 px-4"
                    >
                      Reset Route Matcher
                    </button>
                    <button
                      onClick={() => { setOnboardingRole("commuter"); setOnboardingStep(1); setOnboardingStatus("filling"); setIsOnboardingOpen(true); }}
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md cursor-pointer transition-colors"
                    >
                      Claim This Cohort Seat
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* FOUR STEP HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Seamless Integration</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              4 Simple Steps to Lock In Your Ride
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We remove the awkward negotiations and payment splitting of standard carpooling. GoNest takes care of matching, scheduling, and billing automatically.
            </p>
          </div>

          {/* Workflow Steps layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
            
            {/* Step 1 */}
            <div className="text-center space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 font-extrabold text-base rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="text-base font-bold text-slate-950">Set Your Route</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Specify your weekly classes, tutoring schedule, school shift, or office roster. Input your pick-up neighborhood and campus or corporate hub address.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 font-extrabold text-base rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="text-base font-bold text-slate-950">Get Matched</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our matching system groups you exclusively with peer co-riders heading to the exact same complex. You are matching on timing and route overlap with vetted drivers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 font-extrabold text-base rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="text-base font-bold text-slate-950">Ride in Comfort</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Confirm your monthly pass to lock in your seat. Track your matched vehicle in real-time each morning, step in, and enjoy clean, comfortable shared transit.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 font-extrabold text-base rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="text-base font-bold text-slate-950">Save money every month by sharing rides</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your flat monthly pass automatically divides fuel, maintenance, and toll rates into a single predictable billing cycle. Never worry about surge pricing again!
              </p>
            </div>

          </div>

          {/* Quick CTA banner inside section */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold">Ready to see how much you save?</h4>
              <p className="text-slate-400 text-sm max-w-xl">
                Get started today and secure your locked-in commuter schedule before the academic semester or work quarter begins.
              </p>
            </div>
            <button
              onClick={() => { setOnboardingRole("worker"); setOnboardingStep(1); setOnboardingStatus("filling"); setIsOnboardingOpen(true); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl shrink-0 shadow-lg shadow-indigo-900/30 transition-all cursor-pointer"
            >
              Reserve Your Pass
            </button>
          </div>

        </div>
      </section>

      {/* TARGET ROLE SHOWCASE PANEL */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Tailored Solutions</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Perfect for Every Commuter Category
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We cater specifically to the strict timing, financial constraints, and routing needs of four distinct commuter populations:
            </p>
          </div>

          {/* Interactive Role Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "student", label: "For Students", icon: GraduationCap },
              { id: "teacher", label: "For Teachers", icon: School },
              { id: "worker", label: "For Office Workers", icon: Briefcase },
              { id: "commuter", label: "For General Commuters", icon: Users }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeRoleTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoleTab(tab.id as CommuterRole)}
                  className={`flex items-center space-x-2 py-3 px-5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                    isActive 
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-100" 
                      : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-100 min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeRoleTab === "student" && (
                <motion.div
                  key="student"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div className="space-y-6">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                      University & College Campuses
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      College Commutes, Made Affordable.
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Gas expenses and campus parking tags are heavily inflated. GoNest matches you with peer undergraduate and graduate students heading to the same science park or main campus. 
                    </p>
                    <ul className="space-y-3 font-medium text-sm text-slate-700">
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>レビュー reviews with verified student-only cohorts</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Flexible return times mapping morning/afternoon classes</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Option to use drive-time to study with matched classmates</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center space-x-3 text-indigo-600 bg-indigo-50/50 p-4 rounded-xl">
                      <GraduationCap className="w-8 h-8 text-indigo-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-indigo-400 uppercase">Avg. Student Savings</p>
                        <p className="text-lg font-extrabold text-slate-900">$190 per month saved</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                      <p className="text-xs text-slate-400 font-semibold uppercase">Popular Campus Destinations</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-[11px] bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-100 font-semibold">State University Main Hub</span>
                        <span className="text-[11px] bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-100 font-semibold">Downtown Tech Institute</span>
                        <span className="text-[11px] bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-100 font-semibold">Northside College Grounds</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeRoleTab === "teacher" && (
                <motion.div
                  key="teacher"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div className="space-y-6">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                      K-12 & Academy Educators
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Safe & Consistent Faculty Commutes
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Educators have rigorous, strict early morning schedules. Public transit is rarely on time, and driving alone in school-zone traffic is draining. GoNest groups teachers from adjacent institutions for smooth transit.
                    </p>
                    <ul className="space-y-3 font-medium text-sm text-slate-700">
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Consistent early departure (typically 7:00 AM - 7:30 AM)</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Verified professional faculty peers for a quiet, reliable ride</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Subsidized driver program for teachers willing to use their SUV</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center space-x-3 text-emerald-600 bg-emerald-50/50 p-4 rounded-xl">
                      <School className="w-8 h-8 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-emerald-500 uppercase">Avg. Teacher Savings</p>
                        <p className="text-lg font-extrabold text-slate-900">$140 per month saved</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                      <p className="text-xs text-slate-400 font-semibold uppercase">Educator Benefit Features</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
                        <div className="flex items-center space-x-1.5"><Award className="w-3.5 h-3.5 text-amber-500" /> <span>Guaranteed arrival times</span></div>
                        <div className="flex items-center space-x-1.5"><ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> <span>Vetted staff cohorts</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeRoleTab === "worker" && (
                <motion.div
                  key="worker"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div className="space-y-6">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                      Office Parks & Corporate Towers
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Bypass Highway Stress and High Garage Rates
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Downtown garage parking represents a massive financial leakage. GoNest pairs professionals driving in from common residential suburbs to financial centers and industrial parks. Enjoy private vehicle comfort at split prices.
                    </p>
                    <ul className="space-y-3 font-medium text-sm text-slate-700">
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Use HOV/Express lanes for a faster door-to-hub trip</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Corporate match filters (ride with people in your company or sector)</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Excellent professional networking during the daily commute</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center space-x-3 text-indigo-600 bg-indigo-50/50 p-4 rounded-xl">
                      <Briefcase className="w-8 h-8 text-indigo-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-indigo-400 uppercase">Avg. Corporate Savings</p>
                        <p className="text-lg font-extrabold text-slate-900">$260 per month saved</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                      <p className="text-xs text-slate-400 font-semibold uppercase">Popular Business Districts</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-[11px] bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-100 font-semibold">Silicon Tech Park</span>
                        <span className="text-[11px] bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-100 font-semibold">Financial Center Plaza</span>
                        <span className="text-[11px] bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-100 font-semibold">Metro Health Center</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeRoleTab === "commuter" && (
                <motion.div
                  key="commuter"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div className="space-y-6">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                      Regular/Suburban Commuting
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Standardize Your Monthly Schedule
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      If you're making the same route daily, why drive in isolation? GoNest guarantees lock-in safety, shared costs, and verified neighbor connections. Stop renting your seat to surge-charging transportation giants.
                    </p>
                    <ul className="space-y-3 font-medium text-sm text-slate-700">
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Consistent pricing regardless of extreme weather or high traffic</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Vetted local community group to coordinate custom stops</span>
                      </li>
                      <li className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                        <span>Flexible rider roles with month-by-month commitment</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center space-x-3 text-indigo-600 bg-indigo-50/50 p-4 rounded-xl">
                      <Car className="w-8 h-8 text-indigo-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-indigo-400 uppercase">Avg. Commuter Savings</p>
                        <p className="text-lg font-extrabold text-slate-900">$210 per month saved</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                      <p className="text-xs text-slate-400 font-semibold uppercase">GoNest Platform Quality</p>
                      <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Fully comprehensive $1M platform coverage policy</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* LAUNCHING SOON / PREMIUM WAITLIST SECTION */}
      <section id="waitlist" className="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-b border-slate-950">
        {/* Background glow effects to look ultra premium */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center space-x-2 bg-indigo-500/15 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300 uppercase tracking-widest">
              🚀 Launching Soon
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Be one of the first to experience GoNest.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              We are currently establishing pilot routes in major university centers and employment clusters. Sign up for our exclusive early access list to secure your spot today.
            </p>
          </div>

          {/* Waitlist Form Card */}
          <div className="max-w-md mx-auto mt-10 bg-slate-950/40 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-xl">
            {waitlistSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">You're on the list!</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    We've registered <strong className="text-slate-200">{waitlistEmail}</strong>. You'll receive priority matching access, early pilot runs, and exclusive updates.
                  </p>
                </div>
                <button
                  onClick={() => { setWaitlistSubmitted(false); setWaitlistEmail(""); }}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                >
                  Sign up another email
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={waitlistLoading}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                  >
                    {waitlistLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Join Waitlist</span>
                    )}
                  </button>
                </div>
                {waitlistError && (
                  <p className="text-xs text-rose-400 font-medium text-left">{waitlistError}</p>
                )}
                <p className="text-[11px] text-slate-500 leading-normal text-left">
                  🛡️ Early users will receive exclusive access, zero admin fees for life, and priority scheduling matching as soon as GoNest lands in your city. We never sell your data or spam you.
                </p>
              </form>
            )}
          </div>

          {/* Value Prop Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-left">
            <div className="bg-slate-950/20 p-5 rounded-2xl border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Lifetime Discount</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Waitlist members secure a permanent 20% discount on flat-rate monthly runs.
              </p>
            </div>
            <div className="bg-slate-950/20 p-5 rounded-2xl border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Priority Route Setup</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Get first-priority matching whenever commuters formulate in your zip code.
              </p>
            </div>
            <div className="bg-slate-950/20 p-5 rounded-2xl border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Car className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Zero Admin Fees</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Enjoy platform cost splitting with absolutely zero booking or admin fees forever.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section id="faqs" className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">FAQ Hub</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </p>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Have doubts? Find instant, comprehensive answers regarding our security policies, scheduling shifts, and payment methods below.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ml-3 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-5 text-sm text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Contact help line banner */}
          <div className="text-center mt-12 space-y-3.5 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/40">
            <p className="text-sm text-slate-700">
              Still have unanswered queries? Our helpful commuter support desk is happy to assist.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-indigo-700 pt-1">
              <span className="flex items-center space-x-1"><Mail className="w-4 h-4" /> <span>support@gonest.com</span></span>
              <span className="flex items-center space-x-1"><Phone className="w-4 h-4" /> <span>+1 (800) 555-0199</span></span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            
            {/* Column 1: Brand details */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Car className="w-4.5 h-4.5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Daily<span className="text-indigo-400">Go</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Reimagining daily commutes for students, teachers, and office workers. Connecting neighborhood riders to lock in safe, affordable monthly shared rides.
              </p>
              <div className="flex items-center space-x-3 pt-2 text-slate-500">
                <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.5-1 1-1H17V1h-3.5C9.5 1 7 3.5 7 7.5V8z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Solutions */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Target Audiances</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">For Students</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">For Teachers</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">For Office Workers</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">For Suburban Commuters</a></li>
              </ul>
            </div>

            {/* Column 3: Platform */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Interactive Hubs</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#calculator" className="hover:text-white transition-colors">Savings Calculator</a></li>
                <li><a href="#matcher" className="hover:text-white transition-colors">Live Match Previewer</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Step-by-Step Guide</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Vetted Reviews</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Support */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Safety Center</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">Help & FAQ</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom row: Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 GoNest Technologies Inc. All rights reserved.</p>
            <div className="flex space-x-6 text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Safety Guidelines</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ONBOARDING MODAL (GET STARTED SIMULATION) */}
      <AnimatePresence>
        {isOnboardingOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Black overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOnboardingOpen(false)}
              className="fixed inset-0 bg-slate-950"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative z-10"
            >
              
              {/* Top gradient banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white relative">
                <button
                  onClick={() => setIsOnboardingOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="space-y-1.5">
                  <span className="inline-block bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    Setup Demo Queue
                  </span>
                  <h3 className="text-lg font-bold">Start Your GoNest Commute</h3>
                  <p className="text-indigo-100 text-xs">
                    Create your profile in 30 seconds to query matching neighborhood cohorts.
                  </p>
                </div>
              </div>

              {/* Steps content */}
              <div className="p-6 sm:p-8">
                
                {onboardingStatus === "filling" && (
                  <form onSubmit={triggerOnboardingSubmit} className="space-y-5">
                    
                    {/* Role selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Select Your Commuter Role
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: "student", label: "Student", icon: GraduationCap },
                          { id: "teacher", label: "Teacher", icon: School },
                          { id: "worker", label: "Office Worker", icon: Briefcase },
                          { id: "commuter", label: "Commuter", icon: Users }
                        ].map((role) => {
                          const Icon = role.icon;
                          const selected = onboardingRole === role.id;
                          return (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => setOnboardingRole(role.id as CommuterRole)}
                              className={`flex items-center space-x-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                selected 
                                  ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                                  : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                              }`}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              <span>{role.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Neighborhood ZIP */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Pick-up Zip Code or Neighborhood
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. 94107 or Westside Heights"
                          value={onboardingZip}
                          onChange={(e) => setOnboardingZip(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Destination Hub */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Destination Complex or Campus
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. State University or Innovation Park"
                          value={onboardingDestination}
                          onChange={(e) => setOnboardingDestination(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Security Disclaimer */}
                    <div className="p-3.5 bg-slate-50 rounded-xl flex items-start space-x-2.5 border border-slate-100">
                      <Lock className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Your private residential details are never exposed. GoNest operates on a secure neighborhood pick-up model for community trust.
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>Query Neighborhood Matches</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </form>
                )}

                {onboardingStatus === "simulating" && (
                  <div className="py-12 text-center space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-slate-900">Configuring Smart Routing Nodes</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Scanning commuter registry for timing matches in <strong className="text-indigo-600">{onboardingZip || "your neighborhood"}</strong> heading to <strong className="text-indigo-600">{onboardingDestination || "destination"}</strong>...
                      </p>
                    </div>
                  </div>
                )}

                {onboardingStatus === "success" && (
                  <div className="space-y-6">
                    
                    {/* Visual check badge */}
                    <div className="text-center space-y-3">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Matches Formed!</h4>
                      <p className="text-xs text-slate-500">
                        We found <strong className="text-slate-800">4 nearby co-riders</strong> sharing your route and timing!
                      </p>
                    </div>

                    {/* Generated matching card */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                      
                      {/* Match row info */}
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pb-2.5 border-b border-slate-200/60">
                        <span>Route Match #482</span>
                        <span className="text-indigo-600">92% Timing Overlap</span>
                      </div>

                      {/* Path */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs">
                          <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span className="font-semibold text-slate-700 truncate">From: {onboardingZip || "Greenwood Suburbs"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span className="font-semibold text-slate-700 truncate">To: {onboardingDestination || "Campus Central"}</span>
                        </div>
                      </div>

                      {/* Cohort avatars representation */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex -space-x-1.5">
                          <img className="w-7 h-7 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=40" alt="" />
                          <img className="w-7 h-7 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=40" alt="" />
                          <img className="w-7 h-7 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=40" alt="" />
                          <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center font-mono">
                            +1
                          </div>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">Daily passing leaves: 7:50 AM</span>
                      </div>

                    </div>

                    {/* Notice */}
                    <div className="p-4 bg-indigo-50/50 rounded-xl text-center border border-indigo-100/40">
                      <p className="text-xs text-indigo-700 font-semibold">
                        Lock in your seat pass for only $89/month!
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => setIsOnboardingOpen(false)}
                        className="w-full py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 cursor-pointer"
                      >
                        Keep Browsing
                      </button>
                      <button
                        onClick={() => setIsOnboardingOpen(false)}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md cursor-pointer"
                      >
                        Secure Ride Pass
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CommuteProvider>
        <AppContent />
      </CommuteProvider>
    </AuthProvider>
  );
}
