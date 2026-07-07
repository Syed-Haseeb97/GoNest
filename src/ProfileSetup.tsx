import React, { useState, useRef, useEffect } from "react";
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Globe, 
  Camera, 
  Check, 
  Loader2, 
  ChevronRight, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "./contexts/AuthContext";
import { uploadProfilePhoto } from "./services/firebase/storage";

interface ProfileSetupProps {
  userEmail?: string;
  onSave: (profileData: any) => void;
  onBackToOnboarding: () => void;
}

export default function ProfileSetup({ userEmail = "commuter@gonest.com", onSave, onBackToOnboarding }: ProfileSetupProps) {
  const { currentUser, userProfile, updateProfile } = useAuth();

  // Pre-filled defaults from authenticated profile if available
  const [fullName, setFullName] = useState(userProfile?.name || "James Miller");
  const [phone, setPhone] = useState(userProfile?.phone || "+1 (555) 019-2834");
  
  // Input states
  const [gender, setGender] = useState(userProfile?.gender || "");
  const [dob, setDob] = useState("");
  const [language, setLanguage] = useState(userProfile?.preferredLanguage || "English");
  const [homeCity, setHomeCity] = useState("");
  
  // Image states
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userProfile?.profilePhoto || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPhotoSkipped, setIsPhotoSkipped] = useState(false);
  
  // UI UX States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setFullName(userProfile.name);
      if (userProfile.phone) setPhone(userProfile.phone);
      if (userProfile.gender) setGender(userProfile.gender);
      if (userProfile.preferredLanguage) setLanguage(userProfile.preferredLanguage);
      if (userProfile.profilePhoto) setAvatarUrl(userProfile.profilePhoto);
    }
  }, [userProfile]);

  // Simulated profile photo selection/drag and drop
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const fakeUrl = URL.createObjectURL(file);
      setAvatarUrl(fakeUrl);
      setIsPhotoSkipped(false);
      setErrorMessage("");
    }
  };

  const handleSkipPhoto = () => {
    setAvatarUrl(null);
    setSelectedFile(null);
    setIsPhotoSkipped(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validations
    if (!gender) {
      setErrorMessage("Please select your gender.");
      return;
    }
    if (!dob) {
      setErrorMessage("Please provide your date of birth.");
      return;
    }
    if (!homeCity.trim()) {
      setErrorMessage("Please enter your home city.");
      return;
    }
    if (!avatarUrl && !isPhotoSkipped) {
      setErrorMessage("Please upload a profile photo or select 'Skip Photo' to continue.");
      return;
    }

    setIsLoading(true);

    const saveProfile = async () => {
      let finalPhotoUrl = avatarUrl || "";
      if (selectedFile && currentUser) {
        finalPhotoUrl = await uploadProfilePhoto(currentUser.uid, selectedFile);
      }

      await updateProfile({
        name: fullName,
        phone,
        gender,
        preferredLanguage: language,
        profilePhoto: finalPhotoUrl,
        onboardingCompleted: true
      });

      onSave({
        fullName,
        phone,
        gender,
        dob,
        language,
        homeCity,
        avatarUrl: finalPhotoUrl
      });
    };

    saveProfile().catch((err: any) => {
      console.error(err);
      setErrorMessage(err.message || "Failed to update profile details.");
      setIsLoading(false);
    });
  };

  return (
    <div id="profile-setup-container" className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-white font-sans antialiased relative overflow-hidden">
      
      {/* Background radial soft gradient glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Profile setup card */}
      <div className="w-full max-w-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl relative flex flex-col space-y-6 z-10">
        
        {/* Step Indicator Header Row */}
        <div className="flex items-center justify-between border-b border-slate-800/50 pb-5">
          <button 
            onClick={onBackToOnboarding}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-950/20 hover:bg-slate-950/50 border border-slate-800/60 py-1.5 px-3 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tour Onboarding</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Profile Setup</span>
            <span className="text-xs font-semibold text-slate-300 block mt-0.5">Step 1 of 2</span>
          </div>
        </div>

        {/* Title Block */}
        <div className="space-y-2 text-left">
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Identity Setup</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">{userEmail}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Complete your profile
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Before we search for your recurring community commuters, tell us a bit about yourself. Other riders will see this info to coordinate shared trips.
          </p>
        </div>

        {/* Validation/Status Alert Box */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm font-semibold flex items-center space-x-2.5"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Profile photo uploader placeholder */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-left relative">
          
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            className="hidden"
          />

          {/* Avatar frame */}
          <div className="relative shrink-0">
            <div 
              onClick={handlePhotoClick}
              className="w-20 h-20 rounded-full bg-slate-800 border-2 border-dashed border-slate-700 hover:border-indigo-500 hover:bg-slate-800/80 transition-all flex items-center justify-center cursor-pointer overflow-hidden group shadow-md"
            >
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="Avatar Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-400 group-hover:text-white">
                  <Camera className="w-6 h-6" />
                </div>
              )}
            </div>
            {avatarUrl && (
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-slate-900">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="space-y-1.5 flex-grow text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-200">Upload a clear face photo</h4>
            <p className="text-slate-400 text-xs leading-normal">
              Matched co-riders look at your picture to spot you quickly during morning pick-ups. Only JPEG/PNG files.
            </p>
            
            {/* Photo secondary actions */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <button
                type="button"
                onClick={handlePhotoClick}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Choose Photo
              </button>
              <span className="text-slate-600 text-[10px]">•</span>
              <button
                type="button"
                onClick={handleSkipPhoto}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-300 transition-colors bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 px-2.5 py-1 rounded-md cursor-pointer"
              >
                {isPhotoSkipped ? "✓ Photo Skipped" : "Skip Photo"}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Metadata Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name - Pre-filled Read-only style but customizable */}
            <div className="space-y-1">
              <label htmlFor="setupName" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative bg-slate-950/40 border border-slate-800/80 rounded-xl px-3 py-2.5 flex items-center space-x-2.5 opacity-90">
                <User className="w-4 h-4 text-slate-500 shrink-0" />
                <input 
                  id="setupName"
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-slate-200 focus:outline-none w-full border-none"
                />
              </div>
            </div>

            {/* Phone Number - Pre-filled Read-only style */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Phone Number (Read-only)
              </label>
              <div className="relative bg-slate-950/60 border border-slate-800/40 rounded-xl px-3 py-2.5 flex items-center space-x-2.5 opacity-70 select-none">
                <Phone className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-400 font-mono">{phone}</span>
                <span className="text-[9px] font-bold text-slate-600 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded ml-auto">VERIFIED</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Gender Selection */}
            <div className="space-y-1">
              <label htmlFor="setupGender" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Gender
              </label>
              <select
                id="setupGender"
                required
                disabled={isLoading}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-semibold"
              >
                <option value="" className="text-slate-500">Select Gender</option>
                <option value="Male" className="text-slate-900 bg-white font-medium">Male</option>
                <option value="Female" className="text-slate-900 bg-white font-medium">Female</option>
                <option value="Non-binary" className="text-slate-900 bg-white font-medium">Non-binary</option>
                <option value="Prefer not to say" className="text-slate-900 bg-white font-medium">Prefer not to say</option>
              </select>
            </div>

            {/* Date of Birth field */}
            <div className="space-y-1">
              <label htmlFor="setupDob" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Date of Birth
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
                <input
                  id="setupDob"
                  type="date"
                  required
                  disabled={isLoading}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 font-semibold"
                />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Preferred Language */}
            <div className="space-y-1">
              <label htmlFor="setupLang" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Preferred Language
              </label>
              <div className="relative group">
                <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
                <select
                  id="setupLang"
                  required
                  disabled={isLoading}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 font-semibold"
                >
                  <option value="English" className="text-slate-900 bg-white">English</option>
                  <option value="Hindi" className="text-slate-900 bg-white">Hindi (हिन्दी)</option>
                  <option value="Spanish" className="text-slate-900 bg-white">Spanish (Español)</option>
                  <option value="French" className="text-slate-900 bg-white">French (Français)</option>
                  <option value="German" className="text-slate-900 bg-white">German (Deutsch)</option>
                  <option value="Japanese" className="text-slate-900 bg-white">Japanese (日本語)</option>
                  <option value="Arabic" className="text-slate-900 bg-white">Arabic (العربية)</option>
                </select>
              </div>
            </div>

            {/* Home City field */}
            <div className="space-y-1">
              <label htmlFor="setupCity" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Home City
              </label>
              <div className="relative group">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
                <input
                  id="setupCity"
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="e.g. San Francisco"
                  value={homeCity}
                  onChange={(e) => setHomeCity(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 font-semibold placeholder-slate-600"
                />
              </div>
            </div>

          </div>

          {/* Secure Platform Guidelines checklist block */}
          <div className="pt-2">
            <div className="bg-slate-950/20 border border-slate-800/40 rounded-xl p-3 flex items-start space-x-2.5 text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-normal">
                Your privacy is our priority. We never sell your personal information. Only matched and verified commuter cohort peers will be able to see your name, photo, and language parameters.
              </p>
            </div>
          </div>

          {/* Submit action buttons row */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <span>Save & Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>

      {/* Global page footer guidelines disclaimer */}
      <div className="mt-8 text-center text-[10px] text-slate-600 relative z-10">
        <p>🛡️ Secure commuter identity setup. Verify with legal conditions on the parent menu.</p>
      </div>

    </div>
  );
}
