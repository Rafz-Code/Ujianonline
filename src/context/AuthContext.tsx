import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  FirebaseUser, 
  doc, 
  getDoc, 
  setDoc,
  serverTimestamp 
} from "../lib/firebase";

interface UserProfile {
  uid: string;
  email: string;
  username?: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'guru' | 'siswa';
  department?: string; // This will store the major
  nisn?: string;
  passingStatus?: 'Lulus' | 'Tidak Lulus' | 'Proses';
  createdAt: any;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isGuru: boolean;
  isSiswa: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isGuru: false,
  isSiswa: false,
  isStaff: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch or create profile
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          // Create default profile
          const isInitialAdmin = user.email === "venzyajsb@gmail.com" || user.email === "smkprimaunggul@smkpu.id";
          const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email || "",
            username: user.email?.split("@")[0] || "user",
            displayName: user.displayName || user.email?.split("@")[0] || "User",
            photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
            role: isInitialAdmin ? 'admin' : 'siswa',
            department: 'General',
            passingStatus: 'Proses',
            createdAt: serverTimestamp()
          };
          await setDoc(userDocRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    isGuru: profile?.role === 'guru',
    isSiswa: profile?.role === 'siswa',
    isStaff: profile?.role === 'guru' || profile?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
