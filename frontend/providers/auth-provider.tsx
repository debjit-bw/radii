"use client";

import React, { createContext, useContext } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isWorldcoinVerified: boolean;
  setIsWorldcoinVerified: (verified: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isWorldcoinVerified: false,
      setIsWorldcoinVerified: (verified) =>
        set({ isWorldcoinVerified: verified }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface AuthContextValue {
  isAuthenticated: boolean;
  isDynamicLoggedIn: boolean;
  isWorldcoinVerified: boolean;
  setIsWorldcoinVerified: (verified: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isDynamicLoggedIn = useIsLoggedIn();
  const { isWorldcoinVerified, setIsWorldcoinVerified } = useAuthStore();

  const value = {
    isAuthenticated: isDynamicLoggedIn && isWorldcoinVerified,
    isDynamicLoggedIn,
    isWorldcoinVerified,
    setIsWorldcoinVerified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
