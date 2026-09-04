import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useLoginMutation, useGoogleLoginMutation } from '../services/authApi';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../slices/authSlice';

interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
}

interface GoogleOAuth2 {
  initTokenClient: (config: {
    client_id: string;
    scope: string;
    callback: (response: GoogleTokenResponse) => void;
    error_callback?: (error: unknown) => void;
  }) => {
    requestAccessToken: (options?: { prompt?: string }) => void;
  };
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: GoogleOAuth2;
      };
    };
  }
}

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      if (res.data) {
        dispatch(setCredentials(res.data));
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const apiErr = err as {
        data?: {
          message?: string;
          errors?: Array<{ field?: string; message?: string }>;
        };
      };
      const validationMsg = apiErr?.data?.errors?.[0]?.message;
      setErrorMessage(
        validationMsg ||
        apiErr?.data?.message ||
        'Invalid email or password. Please try again.'
      );
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);

    // 1. Try Google Identity Services (GIS Popup - no redirect URI mismatch)
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (window.google?.accounts?.oauth2 && googleClientId) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: GoogleTokenResponse) => {
            if (tokenResponse.error) {
              setIsGoogleLoading(false);
              if (tokenResponse.error !== 'popup_closed_by_user') {
                setErrorMessage(`Google sign-in error: ${tokenResponse.error}`);
              }
              return;
            }

            if (tokenResponse.access_token) {
              try {
                const res = await googleLogin({
                  credential: tokenResponse.access_token,
                }).unwrap();
                if (res.data) {
                  dispatch(setCredentials(res.data));
                  navigate('/dashboard');
                }
              } catch (err: unknown) {
                const apiErr = err as { data?: { message?: string } };
                setErrorMessage(
                  apiErr?.data?.message || 'Failed to authenticate with Google.'
                );
              } finally {
                setIsGoogleLoading(false);
              }
            }
          },
          error_callback: () => {
            setIsGoogleLoading(false);
          },
        });

        tokenClient.requestAccessToken({ prompt: 'consent' });
        return;
      } catch (err) {
        console.warn('Google Popup init failed, falling back to redirect:', err);
      }
    }

    // 2. Fallback: Full page OAuth redirect flow
    const backendUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className="w-full">
      {/* Header Titles */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
          WELCOME BACK!!
        </h1>
        <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-widest uppercase mt-1">
          WE ARE HAPPY TO SEE YOU AGAIN!
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-5 p-3 text-xs font-semibold text-red-200 bg-red-950/80 border border-red-700/60 rounded-xl flex items-center gap-2 animate-fadeIn">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5"
          >
            YOUR EMAIL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full h-11 px-4 text-sm font-semibold text-neutral-950 bg-[#D1B000] placeholder:text-neutral-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="login-password"
            className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5"
          >
            YOUR PASSWORD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full h-11 px-4 pr-11 text-sm font-semibold text-neutral-950 bg-[#D1B000] placeholder:text-neutral-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-950 focus:outline-none transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-1 pb-2 text-[11px] font-bold uppercase tracking-wider">
          <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-300 hover:text-white">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#23262f] bg-neutral-900 text-[#D1B000] accent-[#D1B000] focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span>REMEMBER ME</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-neutral-400 hover:text-neutral-300 transition-colors"
          >
            FORGOT YOUR PASSWORD?{' '}
            <span className="text-[#D1B000] font-black hover:underline">CLICK HERE</span>
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#C9A200] via-[#DDB500] to-[#C9A200] hover:brightness-110 active:scale-[0.99] text-neutral-950 font-black tracking-wider uppercase text-sm italic shadow-lg shadow-yellow-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>LOGGING IN...</span>
            </>
          ) : (
            <span>LOGIN TO YOUR ACCOUNT</span>
          )}
        </button>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full h-12 rounded-xl bg-[#D1B000] hover:bg-[#DEBD0E] active:scale-[0.99] text-neutral-950 font-black tracking-wider uppercase text-sm transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer mt-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#0D0D0D"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#0D0D0D"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#0D0D0D"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#0D0D0D"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{isGoogleLoading ? 'CONNECTING GOOGLE...' : 'GOOGLE LOGIN'}</span>
        </button>
      </form>

    </div>
  );
};
