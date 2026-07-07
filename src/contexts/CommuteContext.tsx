import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { 
  createCommute, 
  getUserCommutes, 
  updateCommute, 
  deleteCommute, 
  CommuteData,
  RideMatchData,
  getCommuteMatches,
  createRideMatch
} from "../services/firebase/firestore";

interface CommuteContextType {
  commutes: CommuteData[];
  matches: Record<string, RideMatchData[]>;
  loading: boolean;
  refreshCommutes: () => Promise<void>;
  addCommute: (commute: Omit<CommuteData, "userId" | "createdAt">) => Promise<CommuteData>;
  modifyCommute: (commuteId: string, updates: Partial<CommuteData>) => Promise<void>;
  removeCommute: (commuteId: string) => Promise<void>;
}

const CommuteContext = createContext<CommuteContextType | undefined>(undefined);

export const CommuteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [commutes, setCommutes] = useState<CommuteData[]>([]);
  const [matches, setMatches] = useState<Record<string, RideMatchData[]>>({});
  const [loading, setLoading] = useState(false);

  const refreshCommutes = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const list = await getUserCommutes(currentUser.uid);
      setCommutes(list);
      
      // Fetch matches for each commute
      const matchesMap: Record<string, RideMatchData[]> = {};
      for (const commute of list) {
        if (commute.id) {
          const commuteMatches = await getCommuteMatches(commute.id);
          matchesMap[commute.id] = commuteMatches;
        }
      }
      setMatches(matchesMap);
    } catch (err) {
      console.error("Error refreshing commutes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      refreshCommutes();
    } else {
      setCommutes([]);
      setMatches({});
    }
  }, [currentUser]);

  const addCommute = async (commuteInput: Omit<CommuteData, "userId" | "createdAt">) => {
    if (!currentUser) throw new Error("No authenticated user");
    
    const commute: CommuteData = {
      ...commuteInput,
      userId: currentUser.uid,
      createdAt: new Date().toISOString()
    };
    
    const savedCommute = await createCommute(commute);
    
    // Simulate generation of optimal matches in the database!
    if (savedCommute.id) {
      const simulatedMatches: RideMatchData[] = [
        {
          commuteA: savedCommute.id,
          commuteB: "simulated-match-1",
          compatibilityScore: 94,
          routeOverlap: 98,
          estimatedSavings: 15400,
          status: "pending"
        },
        {
          commuteA: savedCommute.id,
          commuteB: "simulated-match-2",
          compatibilityScore: 88,
          routeOverlap: 92,
          estimatedSavings: 11200,
          status: "pending"
        }
      ];
      
      for (const match of simulatedMatches) {
        await createRideMatch(match);
      }
    }
    
    await refreshCommutes();
    return savedCommute;
  };

  const modifyCommute = async (commuteId: string, updates: Partial<CommuteData>) => {
    await updateCommute(commuteId, updates);
    await refreshCommutes();
  };

  const removeCommute = async (commuteId: string) => {
    await deleteCommute(commuteId);
    await refreshCommutes();
  };

  return (
    <CommuteContext.Provider value={{
      commutes,
      matches,
      loading,
      refreshCommutes,
      addCommute,
      modifyCommute,
      removeCommute
    }}>
      {children}
    </CommuteContext.Provider>
  );
};

export const useCommute = () => {
  const context = useContext(CommuteContext);
  if (context === undefined) {
    throw new Error("useCommute must be used within a CommuteProvider");
  }
  return context;
};
