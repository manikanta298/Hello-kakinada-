import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';

const AuthContext = createContext<null>(null);

async function syncUserFromSession(userId: string, email: string | undefined) {
  const profile = await authService.fetchProfile(userId);
  useAuthStore.getState().login({
    id: userId,
    name: profile?.fullName ?? email?.split('@')[0] ?? 'User',
    email: profile?.email ?? email ?? '',
    phone: profile?.phone ?? null,
    avatarUrl: profile?.avatarUrl ?? null,
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setLoading = useAuthStore((s) => s.setLoading);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        if (!mounted) return;
        if (session?.user) {
          await syncUserFromSession(session.user.id, session.user.email);
        }
      })
      .catch((err) => {
        // Network/config issues shouldn't leave the app stuck on a spinner —
        // fall through to the logged-out state instead.
        // eslint-disable-next-line no-console
        console.warn('[Auth] Failed to restore session:', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await syncUserFromSession(session.user.id, session.user.email);
      } else {
        logout();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setLoading, logout]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  useContext(AuthContext);
  return useAuthStore();
}
