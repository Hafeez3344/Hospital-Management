'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, User } from './types';
import { DEMO_USERS } from './mock-data';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedUserId = localStorage.getItem('hms_user_id');
    if (savedUserId) {
      const match = DEMO_USERS.find(u => u.id === savedUserId);
      if (match) setCurrentUser(match);
    }
    setInitialized(true);
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const user = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }
    setCurrentUser(user);
    localStorage.setItem('hms_user_id', user.id);
    return { success: true };
  };

  const switchRole = (newRole: UserRole) => {
    const targetUser = DEMO_USERS.find(u => u.role === newRole) || currentUser;
    if (targetUser) {
      setCurrentUser(targetUser);
      localStorage.setItem('hms_user_id', targetUser.id);
    }
  };

  const logout = () => {
    localStorage.removeItem('hms_user_id');
    setCurrentUser(null);
  };

  if (!initialized) return null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role ?? 'ADMIN',
        isAuthenticated: !!currentUser,
        login,
        switchRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
