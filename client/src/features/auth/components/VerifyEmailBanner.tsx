import React from 'react';

export const VerifyEmailBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-xs text-amber-800 flex items-center justify-center gap-2">
      <span>⚠️ Please verify your email address to unlock all posting features.</span>
      <button className="font-semibold underline hover:text-amber-900 cursor-pointer">
        Resend email
      </button>
    </div>
  );
};
