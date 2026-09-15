import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { user, isAuthenticated, isLoading, pendingEmail, login, logout, updateUser, setPendingEmail, setLoading } =
    useAuthStore();

  return {
    user,
    isAuthenticated,
    isGuest: !isAuthenticated,
    isLoading,
    pendingEmail,
    login,
    logout,
    updateUser,
    setPendingEmail,
    setLoading,
  };
}
