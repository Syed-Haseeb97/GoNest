import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  updateProfile,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "./config";
import { createUserDoc, getUserDoc } from "./firestore";

export interface UserProfileData {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  profilePhoto?: string;
  onboardingCompleted?: boolean;
  notificationSettings?: {
    email: boolean;
    push: boolean;
  };
  preferredLanguage?: string;
  preferredDistanceUnit?: "km" | "miles";
  createdAt?: string;
}

// Register a new user
export const registerWithEmail = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Create user document in firestore
  const userData: UserProfileData = {
    uid: user.uid,
    name,
    email,
    profilePhoto: "",
    onboardingCompleted: false,
    notificationSettings: {
      email: true,
      push: true
    },
    preferredLanguage: "English",
    preferredDistanceUnit: "km",
    createdAt: new Date().toISOString()
  };
  
  await createUserDoc(user.uid, userData);
  return user;
};

// Login user
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Sign in with Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  
  // Check if user already exists in firestore
  try {
    const existingDoc = await getUserDoc(user.uid);
    if (!existingDoc) {
      const userData: UserProfileData = {
        uid: user.uid,
        name: user.displayName || "GoNest Commuter",
        email: user.email || "",
        profilePhoto: user.photoURL || "",
        onboardingCompleted: false,
        notificationSettings: {
          email: true,
          push: true
        },
        preferredLanguage: "English",
        preferredDistanceUnit: "km",
        createdAt: new Date().toISOString()
      };
      await createUserDoc(user.uid, userData);
    }
  } catch (err) {
    console.error("Error creating google user doc", err);
  }
  return user;
};

// Logout user
export const logout = async () => {
  await signOut(auth);
};

// Reset password
export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// Update profile details
export const updateUserProfile = async (firebaseUser: FirebaseUser, updates: Partial<UserProfileData>) => {
  const profileUpdates: { displayName?: string; photoURL?: string } = {};
  if (updates.name) profileUpdates.displayName = updates.name;
  if (updates.profilePhoto) profileUpdates.photoURL = updates.profilePhoto;
  
  if (Object.keys(profileUpdates).length > 0) {
    await updateProfile(firebaseUser, profileUpdates);
  }
};
