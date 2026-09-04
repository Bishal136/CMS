import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import authBg from '@/assets/images/auth-knight-bg.webp';

interface IAuthLayoutProps {
  children: React.ReactNode;
  activeTab?: 'login' | 'register' | 'otp';
}

export const AuthLayout: React.FC<IAuthLayoutProps> = ({ children, activeTab = 'login' }) => {
  const location = useLocation();
  const currentTab = activeTab || (location.pathname === '/register' ? 'register' : 'login');

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center lg:justify-end relative bg-[#0a0b0e] overflow-y-auto overflow-x-hidden selection:bg-[#D1B000] selection:text-black"
      style={{
        backgroundImage: `radial-gradient(circle at right center, rgba(12, 13, 18, 0.4) 0%, rgba(10, 11, 14, 0.95) 100%), url(${authBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Ambient subtle warm dark glow on desktop right */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none bg-gradient-to-l from-[#0a0b0e] via-[#0a0b0e]/80 to-transparent" />

      {/* Floating ember glow effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#D1B000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main card wrapper */}
      <div className="relative z-10 w-full max-w-[450px] my-8 mx-4 sm:mx-6 lg:mr-16 xl:mr-28">
        <div className="w-full bg-[#141517]/95 backdrop-blur-md border border-[#23262f] rounded-2xl shadow-2xl shadow-black/90 overflow-hidden">
          {/* Dual Navigation Tabs */}
          <div className="grid grid-cols-2 text-center text-xs font-black tracking-widest uppercase border-b border-[#23262f]">
            <Link
              to="/login"
              className={`py-4 transition-all duration-200 flex items-center justify-center gap-1.5 ${
                currentTab === 'login'
                  ? 'bg-[#D1B000] text-neutral-950 font-black shadow-md'
                  : 'bg-[#1C1C1E] text-neutral-400 hover:text-white hover:bg-[#252529]'
              }`}
            >
              LOGIN
            </Link>
            <Link
              to="/register"
              className={`py-4 transition-all duration-200 flex items-center justify-center gap-1.5 ${
                currentTab === 'register' || currentTab === 'otp'
                  ? 'bg-[#D1B000] text-neutral-950 font-black shadow-md'
                  : 'bg-[#1C1C1E] text-neutral-400 hover:text-white hover:bg-[#252529]'
              }`}
            >
              REGISTER
            </Link>
          </div>

          {/* Card Content */}
          <div className="p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};
