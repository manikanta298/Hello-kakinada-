import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingPhone: string | null; // phone awaiting OTP verification
  login: (user: User) => void;
  logout: () => void;
  updateUser: (fields: Partial<Pick<User, 'name' | 'phone' | 'email'>>) => void;
  setPendingPhone: (phone: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // true until the initial session check resolves
  pendingPhone: null,

  login: (user) => set({ user, isAuthenticated: true, pendingPhone: null }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (fields) =>
    set((state) => ({ user: state.user ? { ...state.user, ...fields } : state.user })),
  setPendingPhone: (phone) => set({ pendingPhone: phone }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
