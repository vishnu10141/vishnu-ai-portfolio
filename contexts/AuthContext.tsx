'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = "nvishnu1014@gmail.com";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('[Auth] Initializing onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('[Auth] State changed. Current user:', currentUser?.email);
      
      if (currentUser) {
        const userEmail = currentUser.email?.trim().toLowerCase();
        const expectedEmail = ADMIN_EMAIL.trim().toLowerCase();
        
        console.log('[Auth] Verifying email:', { userEmail, expectedEmail });
        
        if (userEmail !== expectedEmail) {
          console.warn('[Auth] Unauthorized login attempt. Signing out.');
          await signOut(auth);
          document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          setUser(null);
        } else {
          console.log('[Auth] Admin verified. Setting session cookie.');
          setUser(currentUser);
          document.cookie = `admin_session=true; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
        }
      } else {
        console.log('[Auth] No user found. Clearing session.');
        document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    console.log('[Auth] Initiating Google Sign-In...');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const result = await signInWithPopup(auth, provider);
      console.log('[Auth] Popup success. User:', result.user.email);
      
      const userEmail = result.user.email?.trim().toLowerCase();
      const expectedEmail = ADMIN_EMAIL.trim().toLowerCase();
      
      if (userEmail === expectedEmail) {
        console.log('[Auth] Login authorized. Setting cookie and redirecting to /admin');
        document.cookie = `admin_session=true; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
        router.push('/admin');
      } else {
        console.error('[Auth] Unauthorized account:', userEmail);
        await signOut(auth);
        document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        throw new Error(`Access denied. Expected admin email.`);
      }
    } catch (error: any) {
      console.error('[Auth] Google Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('[Auth] Logging out...');
    await signOut(auth);
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
