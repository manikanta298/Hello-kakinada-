import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { user, isAuthenticated, isLoading, pendingPhone, login, logout, updateUser, setPendingPhone, setLoading } =
    useAuthStore();

  return {
    user,
    isAuthenticated,
    isGuest: !isAuthenticated,
    isLoading,
    pendingPhone,
    login,
    logout,
    updateUser,
    setPendingPhone,
    setLoading,
  };
}
