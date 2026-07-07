import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User as FirebaseUser, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../services/firebase/config";
import { 
  getUserDoc, 
  createUserDoc, 
  updateUserDoc, 
  SubscriptionData, 
  getSubscription 
} from "../services/firebase/firestore";
import { 
  registerWithEmail as serviceRegister, 
  loginWithEmail as serviceLogin, 
  loginWithGoogle as serviceGoogleLogin, 
  logout as serviceLogout, 
  resetPassword as serviceResetPassword, 
  updateUserProfile as serviceUpdateProfile,
  UserProfileData 
} from "../services/firebase/auth";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfileData | null;
  userSubscription: SubscriptionData | null;
  loading: boolean;
  register: (email: string, password: string, name: string) => Promise<FirebaseUser>;
  login: (email: string, password: string) => Promise<FirebaseUser>;
  loginWithGoogle: () => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfileData>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [userSubscription, setUserSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileAndSubscription = async (user: FirebaseUser) => {
    try {
      const profile = await getUserDoc(user.uid);
      if (profile) {
        setUserProfile(profile);
      } else {
        // Fallback or lazy create if not found
        const fallbackProfile: UserProfileData = {
          uid: user.uid,
          name: user.displayName || "GoNest Commuter",
          email: user.email || "",
          profilePhoto: user.photoURL || "",
          onboardingCompleted: false,
          notificationSettings: { email: true, push: true },
          preferredLanguage: "English",
          preferredDistanceUnit: "km",
          createdAt: new Date().toISOString()
        };
        await createUserDoc(user.uid, fallbackProfile);
        setUserProfile(fallbackProfile);
      }

      // Fetch active subscription if exists
      const sub = await getSubscription(user.uid);
      setUserSubscription(sub);
    } catch (err) {
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        await fetchProfileAndSubscription(user);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setUserSubscription(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const user = await serviceRegister(email, password, name);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await serviceLogin(email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const user = await serviceGoogleLogin();
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await serviceLogout();
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await serviceResetPassword(email);
  };

  const updateProfile = async (updates: Partial<UserProfileData>) => {
    if (!currentUser) throw new Error("No authenticated user");
    
    setLoading(true);
    try {
      // 1. Update Auth Profile if needed (name, profilePhoto)
      await serviceUpdateProfile(currentUser, updates);
      
      // 2. Update Firestore Document
      await updateUserDoc(currentUser.uid, updates);
      
      // 3. Refresh local profile state
      if (userProfile) {
        setUserProfile({ ...userProfile, ...updates });
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await fetchProfileAndSubscription(currentUser);
    }
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    userSubscription,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateProfile,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-400 font-mono text-xs">Authenticating GoNest Session...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
