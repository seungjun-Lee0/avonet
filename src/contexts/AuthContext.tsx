import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, googleLogin } from '../services/auth'; // Updated import
import { loginUser, logoutUser, registerUser } from '../services/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>; // Added Google Sign-in method
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
  };

  const register = async (email: string, password: string) => {
    await registerUser(email, password);
  };

  const googleSignIn = async () => {
    await googleLogin();
  };

  const logout = async () => {
    await logoutUser();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
