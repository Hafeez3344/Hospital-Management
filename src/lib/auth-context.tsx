'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, User } from './types';
import { DEMO_USERS } from './mock-data';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  loginAsUser: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[0]);

  useEffect(() => {
    const savedRole = localStorage.getItem('hms_demo_role') as UserRole;
    if (savedRole) {
      const match = DEMO_USERS.find(u => u.role === savedRole);
      if (match) setCurrentUser(match);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    const targetUser = DEMO_USERS.find(u => u.role === newRole) || DEMO_USERS[0];
    setCurrentUser(targetUser);
    localStorage.setItem('hms_demo_role', newRole);
  };

  const loginAsUser = (userId: string) => {
    const targetUser = DEMO_USERS.find(u => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
      localStorage.setItem('hms_demo_role', targetUser.role);
    }
  };

  const logout = () => {
    localStorage.removeItem('hms_demo_role');
    setCurrentUser(DEMO_USERS[0]);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        switchRole,
        loginAsUser,
        logout
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
