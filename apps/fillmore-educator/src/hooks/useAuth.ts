import { useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const isLoading = useAuthStore((s) => s.isLoading);
  const user = useAuthStore((s) => s.user);
  const loginAction = useAuthStore((s) => s.login);
  const logoutAction = useAuthStore((s) => s.logout);
  const loadCurrentUserAction = useAuthStore((s) => s.loadCurrentUser);

  const isAuthenticated = !!user;

  const login = useCallback(
    (email: string, password: string) => loginAction(email, password),
    [loginAction]
  );

  const logout = useCallback(() => logoutAction(), [logoutAction]);

  const loadCurrentUser = useCallback(
    () => loadCurrentUserAction(),
    [loadCurrentUserAction]
  );

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    loadCurrentUser,
  };
};
