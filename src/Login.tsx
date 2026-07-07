import React, { useState } from "react";
import { 
  Car, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  User, 
  GraduationCap, 
  Briefcase, 
  School, 
  Users,
  ChevronRight, 
  Loader2,
  Sparkles,
  ShieldCheck,
  TrendingDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "./contexts/AuthContext";

type CommuterRole = "student" | "teacher" | "worker" | "commuter";

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: (userEmail: string) => void;
  initialMode?: "login" | "signup";
}

export default function Login({ onBack, onLoginSuccess, initialMode = "login" }: LoginProps) {
  const { login, register, loginWithGoogle, resetPassword } = useAuth();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<CommuterRole>("worker");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Recovery States
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryStep, setRecoveryStep] = useState<"input" | "success">("input");

  // Validate Email or Phone
  const validateEmailOrPhone = (val: string) => {
    if (!val) return false;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isPhone = /^\+?[0-9]{10,14}$/.test(val.replace(/[-\s()]/g, ""));
    return isEmail || isPhone;
  };

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validateEmailOrPhone(emailOrPhone)) {
      setStatusMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    if (password.length < 6) {
      setStatusMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setIsLoading(true);

    try {
      await login(emailOrPhone, password);
      setStatusMessage({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => {
        onLoginSuccess(emailOrPhone);
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Failed to log in." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up submission
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!fullName.trim()) {
      setStatusMessage({ type: "error", text: "Please enter your full name." });
      return;
    }

    if (!validateEmailOrPhone(emailOrPhone)) {
      setStatusMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    if (password.length < 6) {
      setStatusMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    if (!agreeTerms) {
      setStatusMessage({ type: "error", text: "You must agree to the Terms of Service & Privacy Policy." });
      return;
    }

    setIsLoading(true);

    try {
      await register(emailOrPhone, password, fullName);
      setStatusMessage({ type: "success", text: "Account created successfully! Welcome aboard." });
      setTimeout(() => {
        onLoginSuccess(emailOrPhone);
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Failed to register account." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Password Recovery submission
  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail);
    if (!isEmail) {
      setStatusMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(recoveryEmail);
      setRecoveryStep("success");
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Failed to send reset email." });
    } finally {
      setIsLoading(false);
    }
  };

  // Google Auth
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const user = await loginWithGoogle();
      setStatusMessage({ type: "success", text: "Google Authentication successful!" });
      setTimeout(() => {
        onLoginSuccess(user.email || "google.user@gmail.com");
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Google Authentication failed." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-page-root" className="min-h-screen bg-slate-50 flex items-stretch overflow-x-hidden text-slate-900 font-sans antialiased">
      
      {/* LEFT SIDE: BRAND PANEL (Hidden on medium down screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden text-white border-r border-slate-800">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo and Back button */}
        <div className="relative z-10 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-800/40 hover:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold">Back to Home</span>
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Daily<span className="text-indigo-400">Go</span>
            </span>
          </div>
        </div>

        {/* Dynamic visual dashboard teaser */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smarter Monthly Carpooling</span>
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Smarter <br/>
              <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Daily Commutes.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Join thousands of students, teachers, and business professionals who have unlocked private vehicle comforts for a fraction of standard solo driving costs.
            </p>
          </div>

          {/* Premium mockup stats block */}
          <div className="bg-slate-850/60 backdrop-blur-md rounded-2xl p-5 border border-slate-800 space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Commuter Network</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800/50 space-y-1">
                <div className="flex items-center space-x-1.5 text-indigo-400">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs font-bold">Avg. Savings</span>
                </div>
                <p className="text-2xl font-extrabold text-white">$210<span className="text-xs font-normal text-slate-400">/mo</span></p>
              </div>

              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800/50 space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold">Vetted Safety</span>
                </div>
                <p className="text-2xl font-extrabold text-white">100%</p>
              </div>
            </div>

            {/* Testimonial slider teaser */}
            <div className="pt-2 border-t border-slate-800 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">
                SN
              </div>
              <div>
                <p className="text-xs font-bold text-slate-300">Siddharth Nair • Tech Lead</p>
                <p className="text-[11px] text-slate-400 italic mt-0.5">
                  "No more garage parking fees or toll stress. GoNest is direct, safe, and saves me over $260 each month!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand footer */}
        <div className="relative z-10 text-xs text-slate-500">
          <p>© 2026 GoNest Technologies Inc. Safe, reliable neighborhood shared runs.</p>
        </div>

      </div>

      {/* RIGHT SIDE: INTERACTIVE AUTH FORM PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 md:p-16 relative bg-white">
        
        {/* Floating gradient accent */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-50 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Mobile Header (Hidden on large screens) */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Car className="w-4.5 h-4.5" />
            </div>
            <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              GoNest
            </span>
          </div>
        </div>

        {/* Interactive View Area */}
        <div className="my-auto max-w-md w-full mx-auto space-y-6">
          
          <AnimatePresence mode="wait">
            
            {/* LOGIN MODE */}
            {mode === "login" && (
              <motion.div
                key="login-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Header text */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    Welcome back!
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Access your secure commuter seat or driver profile.
                  </p>
                </div>

                {/* Form status notification */}
                {statusMessage && (
                  <div className={`p-4 rounded-xl flex items-start space-x-3 text-sm font-medium ${
                    statusMessage.type === "success" 
                      ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
                      : "bg-rose-50 border border-rose-100 text-rose-800"
                  }`}>
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  
                  {/* Email / Phone Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Email address or Phone number
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                      <input
                        id="email"
                        type="text"
                        required
                        disabled={isLoading}
                        placeholder="you@school.edu, you@work.com, or +123456789"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        disabled={isLoading}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="login-btn-submit"
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Login to GoNest</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100" />
                  </div>
                  <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Or continue with
                  </span>
                </div>

                {/* Social Login Buttons */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center space-x-3 cursor-pointer disabled:opacity-75"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.14-.14 2.08-1.04 1.48-2.6 2.47-4.47 2.85v3.52h7.24c4.22-3.89 6.69-9.62 6.69-16.3z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-7.24-3.52c-2 .54-4.22.41-5.96-.83-1.74-1.24-2.8-3.16-2.94-5.26H3.455v3.63C5.515 19.16 8.525 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M3.82 11.48a8.03 8.03 0 0 1 0-4.96V2.89H1.105a11.96 11.96 0 0 0 0 14.22l2.715-3.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77-.03 3.47.64 4.74 1.88l3.49-3.49C18.02 1.15 15.11 0 12 0 8.525 0 5.515 4.84 3.455 8.89l3.71 2.89c.14-2.1 1.2-4.02 2.94-5.26 1.74-1.24 3.96-1.37 5.96-.83z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Toggle Footer link */}
                <p className="text-center text-sm font-semibold text-slate-500">
                  Don't have an account?{" "}
                  <button
                    onClick={() => { setMode("signup"); setStatusMessage(null); }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>

              </motion.div>
            )}

            {/* SIGN UP MODE */}
            {mode === "signup" && (
              <motion.div
                key="signup-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Header text */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    Create your account
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Lock in your custom commuting cohort today.
                  </p>
                </div>

                {/* Form status notification */}
                {statusMessage && (
                  <div className={`p-4 rounded-xl flex items-start space-x-3 text-sm font-medium ${
                    statusMessage.type === "success" 
                      ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
                      : "bg-rose-50 border border-rose-100 text-rose-800"
                  }`}>
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                {/* Sign Up Form */}
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  
                  {/* Full Name Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                      <input
                        id="name"
                        type="text"
                        required
                        disabled={isLoading}
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Email / Phone Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email-signup" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Email address or Phone number
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                      <input
                        id="email-signup"
                        type="text"
                        required
                        disabled={isLoading}
                        placeholder="you@school.edu or you@work.com"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Commuter Role Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      I am registering primarily as a:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "student", label: "Student", icon: GraduationCap },
                        { id: "teacher", label: "Teacher", icon: School },
                        { id: "worker", label: "Office Worker", icon: Briefcase },
                        { id: "commuter", label: "Commuter", icon: Users }
                      ].map((role) => {
                        const Icon = role.icon;
                        const selected = selectedRole === role.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setSelectedRole(role.id as CommuterRole)}
                            className={`flex items-center space-x-2 p-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                              selected 
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                                : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0 text-indigo-500" />
                            <span>{role.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="password-signup" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                      <input
                        id="password-signup"
                        type={showPassword ? "text" : "password"}
                        required
                        disabled={isLoading}
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-2.5 pt-1">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-slate-50 border-slate-300 rounded focus:ring-indigo-500 mt-0.5"
                    />
                    <label htmlFor="terms" className="text-xs text-slate-500 leading-normal select-none">
                      I agree to the <a href="#" className="text-indigo-600 font-semibold hover:underline">Terms of Service</a> & <a href="#" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</a>.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>

                {/* Divider */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100" />
                  </div>
                  <span className="relative bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Or register with
                  </span>
                </div>

                {/* Social Signup */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-3 cursor-pointer disabled:opacity-75"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.14-.14 2.08-1.04 1.48-2.6 2.47-4.47 2.85v3.52h7.24c4.22-3.89 6.69-9.62 6.69-16.3z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-7.24-3.52c-2 .54-4.22.41-5.96-.83-1.74-1.24-2.8-3.16-2.94-5.26H3.455v3.63C5.515 19.16 8.525 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M3.82 11.48a8.03 8.03 0 0 1 0-4.96V2.89H1.105a11.96 11.96 0 0 0 0 14.22l2.715-3.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77-.03 3.47.64 4.74 1.88l3.49-3.49C18.02 1.15 15.11 0 12 0 8.525 0 5.515 4.84 3.455 8.89l3.71 2.89c.14-2.1 1.2-4.02 2.94-5.26 1.74-1.24 3.96-1.37 5.96-.83z"
                    />
                  </svg>
                  <span>Sign Up with Google</span>
                </button>

                {/* Toggle Footer link */}
                <p className="text-center text-sm font-semibold text-slate-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => { setMode("login"); setStatusMessage(null); }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
                  >
                    Login
                  </button>
                </p>

              </motion.div>
            )}

            {/* FORGOT PASSWORD MODE */}
            {mode === "forgot" && (
              <motion.div
                key="forgot-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Back button */}
                <button
                  onClick={() => { setMode("login"); setRecoveryStep("input"); setStatusMessage(null); }}
                  className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>

                {recoveryStep === "input" ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                        Forgot your password?
                      </h1>
                      <p className="text-slate-500 text-sm">
                        No worries! Enter your email address and we'll send you a password reset code.
                      </p>
                    </div>

                    {statusMessage && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                        <span>{statusMessage.text}</span>
                      </div>
                    )}

                    <form onSubmit={handleRecoverySubmit} className="space-y-4">
                      
                      {/* Email address field */}
                      <div className="space-y-1.5">
                        <label htmlFor="recovery-email" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                          <input
                            id="recovery-email"
                            type="email"
                            required
                            disabled={isLoading}
                            placeholder="you@domain.com"
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900"
                          />
                        </div>
                      </div>

                      {/* Submit recovery button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span>Send Recovery Link</span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                    </form>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6 space-y-5"
                  >
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-900">Check your inbox</h2>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        We've dispatched a password reset secure link to <strong className="text-slate-800">{recoveryEmail}</strong>. Follow the directions to establish your new security key.
                      </p>
                    </div>

                    <button
                      onClick={() => { setMode("login"); setRecoveryStep("input"); setRecoveryEmail(""); setStatusMessage(null); }}
                      className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-6 rounded-xl transition-colors cursor-pointer"
                    >
                      Return to Login Panel
                    </button>
                  </motion.div>
                )}

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Global form footer */}
        <div className="text-center text-xs text-slate-400 mt-8">
          <p>By using our secure commuter platform, you agree to our standard operating guidelines.</p>
        </div>

      </div>

    </div>
  );
}
