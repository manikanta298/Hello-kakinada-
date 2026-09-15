import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingEmail: string | null; // email awaiting signup verification
  login: (user: User) => void;
  logout: () => void;
  updateUser: (fields: Partial<Pick<User, 'name' | 'phone' | 'email' | 'avatarUrl'>>) => void;
  setPendingEmail: (email: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // true until the initial Supabase session check resolves
  pendingEmail: null,

  login: (user) => set({ user, isAuthenticated: true, pendingEmail: null }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (fields) =>
    set((state) => ({ user: state.user ? { ...state.user, ...fields } : state.user })),
  setPendingEmail: (email) => set({ pendingEmail: email }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
