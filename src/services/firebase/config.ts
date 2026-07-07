import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import configData from "../../../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || configData.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || configData.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || configData.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || configData.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || configData.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || configData.appId,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth service instance
export const auth = getAuth(app);

// Firestore instance (using custom databaseId if specified)
const dbId = configData.firestoreDatabaseId || "(default)";
export const db = initializeFirestore(app, {}, dbId);

// Storage instance
export const storage = getStorage(app);

export default app;
