import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4 space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 size={28} />
        </div>
        <div>
          <h4 className="text-lg font-black text-white uppercase tracking-wider">Check Your Inbox</h4>
          <p className="text-xs text-neutral-400 mt-1">
            We've sent a password reset link to <span className="text-[#D1B000] font-bold">{email}</span>.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D1B000] hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="forgot-email"
          className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5"
        >
          YOUR EMAIL <span className="text-red-500">*</span>
        </label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
          className="w-full h-11 px-4 text-sm font-semibold text-neutral-950 bg-[#D1B000] placeholder:text-neutral-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 shadow-inner transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-full bg-gradient-to-r from-[#C9A200] via-[#DDB500] to-[#C9A200] hover:brightness-110 active:scale-[0.99] text-neutral-950 font-black tracking-wider uppercase text-sm italic shadow-lg shadow-yellow-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
      >
        SEND RESET LINK
      </button>

      <div className="text-center pt-2">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>BACK TO LOGIN</span>
        </Link>
      </div>
    </form>
  );
};
