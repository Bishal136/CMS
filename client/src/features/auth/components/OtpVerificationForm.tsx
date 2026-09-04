import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, RotateCw } from 'lucide-react';
import { useRegisterWithOtpMutation, useSendOtpMutation } from '../services/authApi';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../slices/authSlice';

interface ILocationState {
  name?: string;
  email?: string;
  password?: string;
}

export const OtpVerificationForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const state = (location.state as ILocationState) || {};
  const [email, setEmail] = useState(state.email || '');
  const name = state.name || 'User';
  const password = state.password || '';

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [registerWithOtp, { isLoading: isVerifying }] = useRegisterWithOtpMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();

  // Focus the first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric digits
    const cleaned = value.replace(/[^0-9]/g, '');
    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    const char = cleaned[cleaned.length - 1];
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-advance to next input
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setOtp(newOtp);

    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit code.');
      return;
    }

    if (!email) {
      setErrorMessage('Email address is required.');
      return;
    }

    try {
      const res = await registerWithOtp({
        name,
        email,
        password,
        otp: otpCode,
      }).unwrap();

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
        'Invalid or expired OTP code. Please try again.'
      );
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || isResending || !email) return;
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await sendOtp({ email, type: 'register' }).unwrap();
      setTimeLeft(60);
      setSuccessMessage(res.message || 'A new verification code has been dispatched to your email.');
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
        'Failed to resend code. Please try again later.'
      );
    }
  };

  return (
    <div className="w-full">
      {/* Header Titles */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
          VERIFY ACCOUNT
        </h1>
        <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-widest uppercase mt-1">
          ENTER THE 6-DIGIT VERIFICATION CODE
        </p>
        {email && (
          <p className="text-xs font-bold text-[#D1B000] mt-2 px-3 py-1 bg-[#1C1C1E] rounded-full inline-block border border-[#2b2e38]">
            {email}
          </p>
        )}
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="mb-4 p-3 text-xs font-semibold text-red-200 bg-red-950/80 border border-red-700/60 rounded-xl flex items-center gap-2 animate-fadeIn">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 text-xs font-semibold text-emerald-200 bg-emerald-950/80 border border-emerald-700/60 rounded-xl flex items-center gap-2 animate-fadeIn">
          <span>✅</span>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Email input if accessed directly without email */}
      {!state.email && (
        <div className="mb-4">
          <label
            htmlFor="otp-email-input"
            className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1"
          >
            YOUR EMAIL <span className="text-red-500">*</span>
          </label>
          <input
            id="otp-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full h-11 px-4 text-sm font-semibold text-neutral-950 bg-[#D1B000] placeholder:text-neutral-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner"
          />
        </div>
      )}

      {/* OTP Code Inputs */}
      <form onSubmit={handleVerify} className="space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-2.5 text-center">
            6-DIGIT OTP CODE <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-between gap-2 sm:gap-2.5" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 sm:w-13 h-13 sm:h-14 text-center text-xl sm:text-2xl font-black text-neutral-950 bg-[#D1B000] rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner transition-all selection:bg-neutral-950 selection:text-white"
              />
            ))}
          </div>
        </div>

        {/* Resend Cooldown Section */}
        <div className="flex items-center justify-between text-[11px] font-bold tracking-wider px-1">
          <span className="text-neutral-400">DIDN'T RECEIVE CODE?</span>
          {timeLeft > 0 ? (
            <span className="text-neutral-400 font-mono">
              RESEND IN <span className="text-[#D1B000]">0:{timeLeft.toString().padStart(2, '0')}</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-[#D1B000] hover:text-yellow-300 hover:underline uppercase flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RotateCw size={12} className={isResending ? 'animate-spin' : ''} />
              <span>RESEND OTP</span>
            </button>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isVerifying || otp.join('').length !== 6}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#C9A200] via-[#DDB500] to-[#C9A200] hover:brightness-110 active:scale-[0.99] text-neutral-950 font-black tracking-wider uppercase text-sm italic shadow-lg shadow-yellow-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>VERIFYING CODE...</span>
            </>
          ) : (
            <span>VERIFY & ACTIVATE ACCOUNT</span>
          )}
        </button>

        {/* Back Link */}
        <div className="pt-2 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>BACK TO REGISTRATION</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
