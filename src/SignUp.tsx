import React, { useState, useEffect } from "react";
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
  ChevronRight, 
  Loader2,
  Sparkles,
  ShieldCheck,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "./contexts/AuthContext";

interface SignUpProps {
  onBack: () => void;
  onLoginRedirect: () => void;
  onSignUpSuccess: (userEmail: string) => void;
}

export default function SignUp({ onBack, onLoginRedirect, onSignUpSuccess }: SignUpProps) {
  const { register, loginWithGoogle } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UX states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password strength states
  const [strength, setStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasLowerUpper: false,
    hasNumber: false,
    hasSpecial: false
  });

  useEffect(() => {
    const hasMinLength = password.length >= 8;
    const hasLowerUpper = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const bgNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    let score = 0;
    if (hasMinLength) score += 1;
    if (hasLowerUpper) score += 1;
    if (bgNumber) score += 1;
    if (hasSpecial) score += 1;

    setStrength({
      score,
      hasMinLength,
      hasLowerUpper,
      hasNumber: bgNumber,
      hasSpecial
    });
  }, [password]);

  // Form Submission Validation
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // 1. Name Check
    if (fullName.trim().length < 3) {
      setStatusMessage({ type: "error", text: "Please enter your full name (at least 3 characters)." });
      return;
    }

    // 2. Phone Check
    const cleanPhone = phone.replace(/[-\s()]/g, "");
    if (cleanPhone.length < 8 || !/^[+]?[0-9]+$/.test(cleanPhone)) {
      setStatusMessage({ type: "error", text: "Please enter a valid phone number with country code." });
      return;
    }

    // 3. Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    // 4. Password Strength Check
    if (strength.score < 3) {
      setStatusMessage({ type: "error", text: "Password is too weak. Please meet at least 3 strength criteria." });
      return;
    }

    // 5. Confirm Password Check
    if (password !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Passwords do not match. Please verify." });
      return;
    }

    // 6. Terms Check
    if (!agreeTerms) {
      setStatusMessage({ type: "error", text: "You must accept the Terms and Conditions to proceed." });
      return;
    }

    setIsLoading(true);

    register(email, password, fullName)
      .then(() => {
        setStatusMessage({ type: "success", text: "Account created successfully! Welcome to GoNest." });
        setTimeout(() => {
          onSignUpSuccess(email);
        }, 1000);
      })
      .catch((err: any) => {
        setStatusMessage({ type: "error", text: err.message || "Failed to create account." });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Google Authentication
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const user = await loginWithGoogle();
      setStatusMessage({ type: "success", text: "Google Account linked successfully!" });
      setTimeout(() => {
        onSignUpSuccess(user.email || "google.commuter@gmail.com");
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Google Authentication failed." });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper colors for strength bar
  const getStrengthBarColor = () => {
    switch (strength.score) {
      case 1: return "bg-rose-500";
      case 2: return "bg-amber-500";
      case 3: return "bg-indigo-500";
      case 4: return "bg-emerald-500";
      default: return "bg-slate-200";
    }
  };

  const getStrengthLabel = () => {
    switch (strength.score) {
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Strong";
      case 4: return "Excellent";
      default: return "None";
    }
  };

  return (
    <div id="signup-page-root" className="min-h-screen bg-slate-50 flex items-stretch overflow-x-hidden text-slate-900 font-sans antialiased">
      
      {/* LEFT BRAND SIDEBAR PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden text-white border-r border-slate-850">
        
        {/* Glow ambient background assets */}
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

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

        {/* Informative branding section */}
        <div className="relative z-10 my-auto max-w-lg space-y-8 text-left">
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vetted Commuter Networks</span>
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Your Seat, <br/>
              <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Every Single Day.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Skip volatile surge prices and random drivers. GoNest connects you with neighbors traveling to the exact same campus or business center on a dependable monthly pass.
            </p>
          </div>

          {/* Vetted features list */}
          <div className="space-y-4 bg-slate-950/40 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">The GoNest Difference</p>
            
            <div className="space-y-3.5">
              <div className="flex items-start space-x-3 text-sm">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div>
                  <p className="font-bold text-white">Consistent Peers Only</p>
                  <p className="text-xs text-slate-400 mt-0.5">Commute with verified students, teachers, or coworkers from your own community.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-white">100% Vetted Standards</p>
                  <p className="text-xs text-slate-400 mt-0.5">Drivers undergo mandatory state-level license audits, identity checks, and vehicle safety verifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500 text-left">
          <p>© 2026 GoNest Technologies Inc. Safe, reliable neighborhood shared runs.</p>
        </div>

      </div>

      {/* RIGHT SIDEBAR PANEL: FORM CONTAINER */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 md:p-16 relative bg-white overflow-y-auto">
        
        {/* Decorative glassmorphic top corner background element */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Mobile Header elements */}
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

        {/* Form area */}
        <div className="my-auto max-w-md w-full mx-auto space-y-6 text-left">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm">
              Lock in your custom commuting cohort today and travel stress-free.
            </p>
          </div>

          {/* Validation/status alert box */}
          {statusMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-start space-x-3 text-sm font-medium ${
                statusMessage.type === "success" 
                  ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
                  : "bg-rose-50 border border-rose-100 text-rose-800"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </motion.div>
          )}

          {/* Core Sign Up Form */}
          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            
            {/* Full Name field */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="fullName"
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="e.g. James Miller"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Phone Number field */}
            <div className="space-y-1">
              <label htmlFor="phone" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="phone"
                  type="tel"
                  required
                  disabled={isLoading}
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Email Address field */}
            <div className="space-y-1">
              <label htmlFor="signUpEmail" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="signUpEmail"
                  type="email"
                  required
                  disabled={isLoading}
                  placeholder="e.g. james@school.edu or work@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <label htmlFor="signUpPassword" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="signUpPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="pt-2 pb-1 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-400">Strength Indicator:</span>
                    <span className={`font-bold ${
                      strength.score <= 1 ? "text-rose-500" :
                      strength.score === 2 ? "text-amber-500" :
                      strength.score === 3 ? "text-indigo-500" : "text-emerald-500"
                    }`}>
                      {getStrengthLabel()}
                    </span>
                  </div>

                  {/* Indicator Grid Bars */}
                  <div className="grid grid-cols-4 gap-1 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step}
                        className={`h-full transition-all duration-300 ${
                          strength.score >= step ? getStrengthBarColor() : "bg-slate-200/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Checklist Criteria bubbles */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                    <span className={`text-[10px] flex items-center space-x-1 font-medium ${strength.hasMinLength ? "text-emerald-600" : "text-slate-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${strength.hasMinLength ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <span>8+ chars</span>
                    </span>
                    <span className={`text-[10px] flex items-center space-x-1 font-medium ${strength.hasLowerUpper ? "text-emerald-600" : "text-slate-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${strength.hasLowerUpper ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <span>Caps & Lower</span>
                    </span>
                    <span className={`text-[10px] flex items-center space-x-1 font-medium ${strength.hasNumber ? "text-emerald-600" : "text-slate-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${strength.hasNumber ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <span>Number</span>
                    </span>
                    <span className={`text-[10px] flex items-center space-x-1 font-medium ${strength.hasSpecial ? "text-emerald-600" : "text-slate-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${strength.hasSpecial ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <span>Special char</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password field */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions Acceptance */}
            <div className="flex items-start space-x-2.5 pt-1">
              <input
                id="agreeTermsCheckbox"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-slate-50 border-slate-300 rounded focus:ring-indigo-500 focus:ring-offset-0 mt-0.5"
              />
              <label htmlFor="agreeTermsCheckbox" className="text-xs text-slate-500 leading-normal select-none">
                I agree to the{" "}
                <a href="#terms" className="text-indigo-600 font-semibold hover:underline">Terms & Conditions</a>
                {" "}and{" "}
                <a href="#privacy" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Create Account button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
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

          {/* Social Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <span className="relative bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Or Register With
            </span>
          </div>

          {/* Google signup button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-3 cursor-pointer disabled:opacity-75"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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

          {/* Toggle link to Login */}
          <p className="text-center text-sm font-semibold text-slate-500">
            Already have an account?{" "}
            <button
              onClick={onLoginRedirect}
              className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
            >
              Log In
            </button>
          </p>

        </div>

        {/* Global legal disclaimer footer */}
        <div className="text-center text-xs text-slate-400 mt-8">
          <p>By creating an account, you agree to our standard operating guidelines.</p>
        </div>

      </div>

    </div>
  );
}
