import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "./config";
import { UserProfileData } from "./auth";

// Collections Constants
const USERS_COLLECTION = "users";
const COMMUTES_COLLECTION = "commutes";
const RIDE_MATCHES_COLLECTION = "rideMatches";
const NOTIFICATIONS_COLLECTION = "notifications";
const SUBSCRIPTIONS_COLLECTION = "subscriptions";
const RIDE_HISTORY_COLLECTION = "rideHistory";

// --- Users ---
export const createUserDoc = async (uid: string, data: UserProfileData) => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await setDoc(userRef, data, { merge: true });
};

export const getUserDoc = async (uid: string): Promise<UserProfileData | null> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data() as UserProfileData;
  }
  return null;
};

export const updateUserDoc = async (uid: string, data: Partial<UserProfileData>) => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, data);
};

// --- Commutes ---
export interface CommuteData {
  id?: string;
  userId: string;
  pickupAddress: string;
  pickupLocation: { lat: number; lng: number };
  destinationAddress: string;
  destinationLocation: { lat: number; lng: number };
  departureTime: string;
  returnTime: string;
  days: string[];
  vehiclePreference: string;
  seatsRequired: number;
  recurring: boolean;
  active: boolean;
  createdAt: string;
}

export const createCommute = async (commute: CommuteData) => {
  const collRef = collection(db, COMMUTES_COLLECTION);
  const docRef = await addDoc(collRef, commute);
  return { id: docRef.id, ...commute };
};

export const getUserCommutes = async (userId: string): Promise<CommuteData[]> => {
  const collRef = collection(db, COMMUTES_COLLECTION);
  const q = query(collRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const list: CommuteData[] = [];
  querySnapshot.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() } as CommuteData);
  });
  return list;
};

export const updateCommute = async (commuteId: string, updates: Partial<CommuteData>) => {
  const commuteRef = doc(db, COMMUTES_COLLECTION, commuteId);
  await updateDoc(commuteRef, updates);
};

export const deleteCommute = async (commuteId: string) => {
  const commuteRef = doc(db, COMMUTES_COLLECTION, commuteId);
  await deleteDoc(commuteRef);
};

// --- Ride Matches ---
export interface RideMatchData {
  id?: string;
  commuteA: string; // commute ID
  commuteB: string; // commute ID
  compatibilityScore: number;
  routeOverlap: number;
  estimatedSavings: number;
  status: "pending" | "accepted" | "declined" | "active";
}

export const createRideMatch = async (match: RideMatchData) => {
  const collRef = collection(db, RIDE_MATCHES_COLLECTION);
  const docRef = await addDoc(collRef, match);
  return { id: docRef.id, ...match };
};

export const getCommuteMatches = async (commuteId: string): Promise<RideMatchData[]> => {
  const collRef = collection(db, RIDE_MATCHES_COLLECTION);
  const qA = query(collRef, where("commuteA", "==", commuteId));
  const qB = query(collRef, where("commuteB", "==", commuteId));
  
  const snapA = await getDocs(qA);
  const snapB = await getDocs(qB);
  
  const list: RideMatchData[] = [];
  snapA.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() } as RideMatchData);
  });
  snapB.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() } as RideMatchData);
  });
  
  return list;
};

// --- Notifications ---
export interface AppNotification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const createNotification = async (notification: AppNotification) => {
  const collRef = collection(db, NOTIFICATIONS_COLLECTION);
  await addDoc(collRef, notification);
};

export const getUserNotifications = async (userId: string): Promise<AppNotification[]> => {
  const collRef = collection(db, NOTIFICATIONS_COLLECTION);
  const q = query(collRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const list: AppNotification[] = [];
  querySnapshot.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() } as AppNotification);
  });
  return list;
};

export const markNotificationRead = async (id: string) => {
  const docRef = doc(db, NOTIFICATIONS_COLLECTION, id);
  await updateDoc(docRef, { read: true });
};

// --- Subscriptions ---
export interface SubscriptionData {
  id?: string;
  userId: string;
  plan: string;
  startDate: string;
  expiryDate: string;
  active: boolean;
}

export const createOrUpdateSubscription = async (userId: string, sub: Partial<SubscriptionData>) => {
  const subRef = doc(db, SUBSCRIPTIONS_COLLECTION, userId);
  await setDoc(subRef, { userId, ...sub }, { merge: true });
};

export const getSubscription = async (userId: string): Promise<SubscriptionData | null> => {
  const subRef = doc(db, SUBSCRIPTIONS_COLLECTION, userId);
  const snap = await getDoc(subRef);
  if (snap.exists()) {
    return snap.data() as SubscriptionData;
  }
  return null;
};

// --- Ride History ---
export interface RideHistoryItem {
  id?: string;
  participants: string[];
  route: { from: string; to: string; distance: number };
  fare: number;
  completedAt: string;
}

export const addRideHistory = async (item: RideHistoryItem) => {
  const collRef = collection(db, RIDE_HISTORY_COLLECTION);
  await addDoc(collRef, item);
};

export const getUserRideHistory = async (userId: string): Promise<RideHistoryItem[]> => {
  const collRef = collection(db, RIDE_HISTORY_COLLECTION);
  const q = query(collRef, where("participants", "array-contains", userId));
  const querySnapshot = await getDocs(q);
  const list: RideHistoryItem[] = [];
  querySnapshot.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() } as RideHistoryItem);
  });
  return list;
};
