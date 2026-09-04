import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../slices/authSlice';
import { Loader2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

export const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(`Google Authentication error: ${decodeURIComponent(errorParam)}`);
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    const token = searchParams.get('token');
    const code = searchParams.get('code');
    const userParam = searchParams.get('user');

    // Case 1: Backend redirected here with token
    if (token) {
      try {
        let user = null;
        if (userParam) {
          user = JSON.parse(userParam);
        } else {
          const name = searchParams.get('name') || 'Google User';
          const email = searchParams.get('email') || 'google.user@example.com';
          const role = searchParams.get('role') || 'user';
          user = { name, email, role };
        }

        dispatch(setCredentials({ user, accessToken: token }));
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Failed to parse OAuth user payload:', err);
        setError('Failed to process Google authentication. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
      return;
    }

    // Case 2: Google redirected here directly with authorization code
    if (code) {
      const exchangeCode = async () => {
        try {
          const backendUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';
          const redirectUri = window.location.origin + window.location.pathname;
          const res = await fetch(
            `${backendUrl}/auth/google/callback?code=${encodeURIComponent(
              code
            )}&redirect_uri=${encodeURIComponent(redirectUri)}`,
            {
              headers: { Accept: 'application/json' },
            }
          );
          const data = await res.json();
          if (data.success && data.data) {
            dispatch(setCredentials(data.data));
            navigate('/dashboard', { replace: true });
          } else {
            setError(data.message || 'Failed to exchange authorization code.');
            setTimeout(() => navigate('/login'), 3000);
          }
        } catch (err) {
          console.error('Failed to exchange Google OAuth code:', err);
          setError('Failed to connect to authentication server. Redirecting to login...');
          setTimeout(() => navigate('/login'), 3000);
        }
      };

      exchangeCode();
      return;
    }

    setError('No authentication credentials received from Google OAuth.');
    setTimeout(() => navigate('/login'), 2500);
  }, [searchParams, dispatch, navigate]);

  return (
    <AuthLayout activeTab="login">
      <div className="text-center py-8 space-y-4">
        {error ? (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-500/50 flex items-center justify-center mx-auto text-red-400">
              <AlertCircle size={24} />
            </div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              Authentication Failed
            </h2>
            <p className="text-xs text-neutral-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#D1B000]/10 border border-[#D1B000]/30 flex items-center justify-center mx-auto text-[#D1B000]">
              <Loader2 size={28} className="animate-spin" />
            </div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              Connecting Google Account
            </h2>
            <p className="text-xs text-neutral-400">
              Signing you in securely, please wait a moment...
            </p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};
