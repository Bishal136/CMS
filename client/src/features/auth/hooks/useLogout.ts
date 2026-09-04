import { useAppDispatch } from '@/app/hooks';
import { logoutUser } from '../slices/authSlice';
import { useLogoutMutation } from '../services/authApi';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch {
      // ignore
    } finally {
      dispatch(logoutUser());
      navigate('/login');
    }
  };

  return { logout: handleLogout };
}
