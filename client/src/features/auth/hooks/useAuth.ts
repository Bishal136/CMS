import { useAppSelector } from '@/app/hooks';

export function useAuth() {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  return { user, isAuthenticated, isLoading, role: user?.role };
}
