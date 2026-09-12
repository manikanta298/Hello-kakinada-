import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const AuthContext = createContext<null>(null);

/**
 * In the prototype this just simulates a session check.
 * Swap the timeout for a real secureStorage/token lookup when
 * services/api/auth.ts is wired up.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  useContext(AuthContext);
  return useAuthStore();
}
