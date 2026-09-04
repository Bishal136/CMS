import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useSendOtpMutation, useGoogleLoginMutation } from '../services/authApi';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../slices/authSlice';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match. Please verify your repeat password.');
      return;
    }

    try {
      // Send OTP to email
      await sendOtp({ email: email.trim().toLowerCase(), type: 'register' }).unwrap();

      // Navigate to OTP verification page with registration data in state
      navigate('/verify-otp', {
        state: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        },
      });
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
        'Failed to dispatch verification code. Please try again.'
      );
    }
  };

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);

    // 1. Try Google Identity Services (GIS Popup - no redirect URI mismatch)
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (window.google?.accounts?.oauth2 && googleClientId) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
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
      {/* Header Titles - Not a copy of login! Distinct registration headings */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
          CREATE AN ACCOUNT
        </h1>
        <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-widest uppercase mt-1">
          START YOUR JOURNEY WITH CMSFLOW TODAY
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 text-xs font-semibold text-red-200 bg-red-950/80 border border-red-700/60 rounded-xl flex items-center gap-2 animate-fadeIn">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="register-name"
            className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1"
          >
            YOUR FULL NAME <span className="text-red-500">*</span>
          </label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full h-11 px-4 text-sm font-semibold text-neutral-950 bg-[#D1B000] placeholder:text-neutral-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner transition-all"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="register-email"
            className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1"
          >
            YOUR EMAIL <span className="text-red-500">*</span>
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full h-11 px-4 text-sm font-semibold text-neutral-950 bg-[#D1B000] placeholder:text-neutral-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner transition-all"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="register-password"
            className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1"
          >
            YOUR PASSWORD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
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

        {/* Repeat Password Field */}
        <div>
          <label
            htmlFor="register-repeat-password"
            className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1"
          >
            REPEAT PASSWORD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="register-repeat-password"
              type={showRepeatPassword ? 'text' : 'password'}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full h-11 px-4 pr-11 text-sm font-semibold text-neutral-950 bg-[#D1B000] placeholder:text-neutral-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner transition-all"
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-950 focus:outline-none transition-colors"
              aria-label={showRepeatPassword ? 'Hide repeat password' : 'Show repeat password'}
            >
              {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#C9A200] via-[#DDB500] to-[#C9A200] hover:brightness-110 active:scale-[0.99] text-neutral-950 font-black tracking-wider uppercase text-sm italic shadow-lg shadow-yellow-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SENDING VERIFICATION CODE...</span>
              </>
            ) : (
              <span>CREATE YOUR ACCOUNT</span>
            )}
          </button>
        </div>

        {/* Google Signup Option */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isGoogleLoading}
          className="w-full h-11 rounded-xl bg-[#1c1c20] hover:bg-[#25252b] border border-[#2b2e38] text-neutral-200 hover:text-white font-bold tracking-wider uppercase text-xs transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#FFFFFF"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#FFFFFF"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FFFFFF"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#FFFFFF"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{isGoogleLoading ? 'CONNECTING GOOGLE...' : 'SIGN UP WITH GOOGLE'}</span>
        </button>

        {/* Verification Note (from Design) */}
        <p className="text-[10px] sm:text-[11px] leading-relaxed text-center text-neutral-400 pt-2">
          You'll receive a 6-digit confirmation code in your inbox so you can activate your
          account. If you have any problems,{' '}
          <a href="mailto:support@cmsflow.com" className="text-[#D1B000] font-bold hover:underline">
            contact us!
          </a>
        </p>
      </form>
    </div>
  );
};
