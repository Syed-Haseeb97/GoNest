import React, { useState } from "react";
import { 
  User, 
  Phone, 
  MapPin, 
  Languages, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  Briefcase, 
  GraduationCap, 
  Camera,
  HeartHandshake,
  Building
} from "lucide-react";

interface CompleteProfileProps {
  onSave: (profileData: any) => void;
  onBack: () => void;
}

export default function CompleteProfile({ onSave, onBack }: CompleteProfileProps) {
  // Field Form states
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [fullName, setFullName] = useState<string>("James Miller");
  const [gender, setGender] = useState<string>("Male");
  const [dob, setDob] = useState<string>("1996-05-15");
  const [phone, setPhone] = useState<string>("+1 (555) 019-2834");
  const [emergencyContact, setEmergencyContact] = useState<string>("+1 (555) 014-4322");
  const [preferredLanguage, setPreferredLanguage] = useState<string>("English");
  
  // Locations
  const [city, setCity] = useState<string>("Boston");
  const [stateProvince, setStateProvince] = useState<string>("Massachusetts");
  const [country, setCountry] = useState<string>("United States");
  const [homeAddress, setHomeAddress] = useState<string>("482 Windmill Hill Lane, Apt 4B");

  // Optionals
  const [college, setCollege] = useState<string>("Northeastern University");
  const [school, setSchool] = useState<string>("");
  const [office, setOffice] = useState<string>("Innovation Lab Plaza");
  const [company, setCompany] = useState<string>("Vertex Pharmaceuticals");

  // Error alert tracker
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!phone.trim()) {
      setFormError("Phone Number is required.");
      return;
    }
    if (!homeAddress.trim()) {
      setFormError("Home Address is required to verify neighborhood routes.");
      return;
    }

    onSave({
      profilePhoto,
      fullName,
      gender,
      dob,
      phone,
      emergencyContact,
      preferredLanguage,
      city,
      stateProvince,
      country,
      homeAddress,
      college,
      school,
      office,
      company
    });
  };

  const handlePhotoUpload = () => {
    // Simulated photo upload
    setProfilePhoto("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80");
  };

  return (
    <div id="complete-profile-page" className="min-h-screen bg-slate-950 text-white font-sans antialiased relative pb-20 pt-10 px-4 sm:px-6 overflow-x-hidden">
      
      {/* Decorative background nodes */}
      <div className="absolute top-[-5%] right-[-10%] w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-emerald-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-2xl mx-auto z-10 relative">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-900">
          <div className="flex items-center space-x-2">
            <button 
              onClick={onBack}
              className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-bold">Step 2 of 3</span>
            <div className="flex space-x-1.5">
              <span className="w-2 h-1.5 rounded-full bg-indigo-500/40" />
              <span className="w-5 h-1.5 rounded-full bg-indigo-500" />
              <span className="w-2 h-1.5 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>

        {/* Title Area */}
        <div className="text-left space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white">
            Complete Your Profile
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Your profile details help the matching algorithm group you with commuters carrying identical academic, corporate, or safe neighborhood associations.
          </p>
        </div>

        {formError && (
          <div className="mb-6 p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-xs font-semibold leading-relaxed">
            ⚠️ {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* PROFILE PHOTO CONTAINER */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 shadow-sm">
            <div className="relative">
              {profilePhoto ? (
                <img 
                  src={profilePhoto} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-2xl object-cover border border-indigo-500/40"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-slate-850 border border-dashed border-slate-700 flex items-center justify-center text-slate-400">
                  <User className="w-8 h-8 opacity-40" />
                </div>
              )}
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="absolute bottom-[-6px] right-[-6px] bg-indigo-600 hover:bg-indigo-500 text-white p-1.5 rounded-lg transition-colors border border-slate-900 cursor-pointer shadow-md"
                aria-label="Upload profile photograph"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Profile Photo</h4>
              <p className="text-[11px] text-slate-500 max-w-sm">
                A clear, recognizable profile image helps co-riders identify you during designated pickup maneuvers. Max file size: 4MB.
              </p>
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="text-xs text-indigo-400 font-bold hover:text-indigo-300 mt-1 cursor-pointer underline decoration-dotted"
              >
                Simulate Photo Select
              </button>
            </div>
          </div>

          {/* PERSONAL BIO CARD */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-5 shadow-sm">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Identity & Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="fullname-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullname-field"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  placeholder="e.g. Siddharth Nair"
                />
              </div>

              {/* Gender Select */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="gender-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Gender
                </label>
                <select
                  id="gender-field"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
              </div>

              {/* DOB */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="dob-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    id="dob-field"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-semibold"
                  />
                </div>
              </div>

              {/* Preferred Language */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="language-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Preferred Language
                </label>
                <div className="relative">
                  <input
                    id="language-field"
                    type="text"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                    placeholder="e.g. English, Spanish"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="phone-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="phone-field"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-semibold"
                    placeholder="e.g. +1 (555) 019-2834"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="emergency-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Emergency Contact
                </label>
                <div className="relative">
                  <input
                    id="emergency-field"
                    type="tel"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-semibold"
                    placeholder="e.g. +1 (555) 014-4322"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* GEOGRAPHIC ADDRESS CARD */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-5 shadow-sm">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Location Vetting Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* City */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="city-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  City
                </label>
                <input
                  id="city-field"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                />
              </div>

              {/* State/Province */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="state-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  State / Province
                </label>
                <input
                  id="state-field"
                  type="text"
                  value={stateProvince}
                  onChange={(e) => setStateProvince(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                />
              </div>

              {/* Country */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="country-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Country
                </label>
                <input
                  id="country-field"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                />
              </div>

            </div>

            {/* Home Address */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="address-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Home Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="address-field"
                required
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                rows={2}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold resize-none"
                placeholder="Required to calculate the local neighborhood hub matching algorithms."
              />
            </div>
          </div>

          {/* ACADEMIC / PROFESSIONAL CARD (OPTIONAL) */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Professional Associations</span>
              </h3>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Optional</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Entering these fields unlocks exclusive peer-matching filters (e.g., traveling only with verified employees of your corporate technology campus).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* College */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="college-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>College</span>
                </label>
                <input
                  id="college-field"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  placeholder="e.g. Boston University"
                />
              </div>

              {/* School */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="school-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>School / Institution</span>
                </label>
                <input
                  id="school-field"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  placeholder="e.g. West Campus High School"
                />
              </div>

              {/* Office */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="office-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>Office Hub</span>
                </label>
                <input
                  id="office-field"
                  type="text"
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  placeholder="e.g. Science Park Plaza C"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="company-field" className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>Company Name</span>
                </label>
                <input
                  id="company-field"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  placeholder="e.g. Google, Amazon"
                />
              </div>

            </div>
          </div>

          {/* Emergency details and confirmation notes */}
          <div className="p-4.5 bg-indigo-950/10 border border-indigo-500/10 rounded-2xl flex items-start space-x-3 text-left">
            <HeartHandshake className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Privacy Assurance</h5>
              <p className="text-xs text-slate-400 leading-normal">
                All coordinates are encrypted and only matching nodes are compared to establish route similarities. We never distribute contact details to third-party ad brokers.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto text-slate-400 hover:text-white font-bold py-3 px-6 rounded-xl border border-slate-850/80 transition-all cursor-pointer text-xs"
            >
              Back to Onboarding
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer text-xs sm:text-sm"
            >
              <span>Continue to Commute Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>

      {/* Security footer */}
      <div className="mt-12 text-center text-[10px] text-slate-600 max-w-md mx-auto">
        <p>🛡️ Secure pairing keys prevent telemetry leaks. All riders undergo mandatory background vetting procedures.</p>
      </div>

    </div>
  );
}
