import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';

interface User {
  id: string;
  email: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // เพิ่มสถานะโหลด

  useEffect(() => {
    // ใช้ async function ภายใน useEffect เพื่อให้ await ได้
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const sessionUser = data.session.user;
        setUser({
          id: sessionUser.id,
          email: sessionUser.email ?? '',
          avatar_url: sessionUser.user_metadata?.avatar_url ?? '',
        });
      }
      setIsLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          avatar_url: session.user.user_metadata?.avatar_url ?? '',
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      console.error('Login failed:', error?.message);
      return false;
    }

    setUser({
      id: data.user.id,
      email: data.user.email ?? '',
      avatar_url: data.user.user_metadata?.avatar_url ?? '',
    });

    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  // ระหว่าง loading ให้แสดง loading indicator หรือ null
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
