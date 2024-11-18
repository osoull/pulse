import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { User } from '../types/user';
import { loginUser } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage
  const [authState, setAuthState] = useState<{ user: User | null; isAuthenticated: boolean }>(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        isAuthenticated: !!storedUser
      };
    } catch (error) {
      console.error('Error parsing stored auth user:', error);
      localStorage.removeItem('auth_user');
      return {
        user: null,
        isAuthenticated: false
      };
    }
  });

  // Memoized auth functions
  const login = useCallback(async (email: string, password: string): Promise<User> => {
    try {
      const user = await loginUser(email, password);
      const authData = {
        user,
        isAuthenticated: true
      };
      setAuthState(authData);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return user;
    } catch (error) {
      const errorData = {
        user: null,
        isAuthenticated: false
      };
      setAuthState(errorData);
      localStorage.removeItem('auth_user');
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    const logoutData = {
      user: null,
      isAuthenticated: false
    };
    setAuthState(logoutData);
    localStorage.removeItem('auth_user');
  }, []);

  const refreshUser = useCallback(async () => {
    if (!authState.user?.email) return;
    
    try {
      const user = await loginUser(authState.user.email, 'admin123');
      const refreshData = {
        user,
        isAuthenticated: true
      };
      setAuthState(refreshData);
      localStorage.setItem('auth_user', JSON.stringify(user));
    } catch (error) {
      console.error('Error refreshing user:', error);
      logout();
    }
  }, [authState.user?.email, logout]);

  // Memoize context value
  const value = useMemo(() => ({
    ...authState,
    login,
    logout,
    refreshUser
  }), [authState, login, logout, refreshUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}