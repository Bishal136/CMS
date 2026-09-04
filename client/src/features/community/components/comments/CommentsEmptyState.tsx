import React from 'react';
import { Heart, Store } from 'lucide-react';

export interface ICommentsEmptyStateProps {
  onConnectChannel?: (platform?: string) => void;
}

export const CommentsEmptyState: React.FC<ICommentsEmptyStateProps> = ({
  onConnectChannel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-8 select-none">
      {/* 1. Wireframe Floating Conversation Cards Illustration */}
      <div className="relative w-80 sm:w-96 h-56 mx-auto mb-4 flex items-center justify-center">
        {/* Curved Flow Arrow: looping around the conversation threads */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 380 220"
          fill="none"
        >
          <path
            d="M 220 185 C 310 185, 300 40, 260 40"
            stroke="#E4E4E7"
            strokeWidth="1.5"
            fill="none"
          />
          <polyline
            points="255 46, 262 38, 267 46"
            stroke="#D4D4D8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Top Message Card */}
        <div className="absolute top-1 right-10 bg-white border border-neutral-200/90 rounded-lg px-3 py-2 shadow-2xs flex items-center gap-2.5 z-10 w-44">
          <div className="w-4 h-4 rounded-full bg-neutral-200 shrink-0" />
          <div className="w-24 h-1.5 rounded-full bg-neutral-200" />
          <Heart size={11} className="text-[#34D399] fill-[#34D399] ml-auto shrink-0" />
        </div>

        {/* Middle Main Reply Box Card */}
        <div className="absolute top-11 left-8 sm:left-12 bg-white border border-neutral-200 rounded-xl p-3.5 shadow-sm w-64 sm:w-72 z-20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-4 h-4 rounded-full bg-neutral-200 shrink-0" />
            <div className="w-24 h-1.5 rounded-full bg-neutral-200" />
            <Heart size={11} className="text-[#34D399] fill-[#34D399] ml-auto shrink-0" />
          </div>

          {/* Reply input field wireframe */}
          <div className="w-full h-11 rounded-lg border border-neutral-200/90 bg-neutral-50/60" />

          {/* Avatar indicator */}
          <div className="w-4 h-4 rounded-full border border-neutral-200 mt-2 bg-white" />
        </div>

        {/* Bottom Message Card */}
        <div className="absolute bottom-2 right-12 bg-white border border-neutral-200/90 rounded-lg px-3 py-2 shadow-2xs flex items-center gap-2.5 z-10 w-48">
          <div className="w-4 h-4 rounded-full bg-neutral-200 shrink-0" />
          <div className="w-32 h-1.5 rounded-full bg-neutral-200" />
        </div>
      </div>

      {/* 2. Welcome Title & Description */}
      <h2 className="text-sm sm:text-base font-bold text-neutral-900 mb-1.5 text-center flex items-center justify-center gap-1.5">
        <span>Reply to all your social media comments in one place</span>
        <span>✨</span>
      </h2>
      <p className="text-xs text-neutral-500 max-w-sm text-center leading-relaxed mb-6">
        Stop juggling tabs and apps. Manage every conversation from a single, distraction-free inbox.
      </p>

      {/* 3. Supported Channels Card Container */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-7 shadow-2xs max-w-lg w-full">
        <p className="text-xs text-neutral-500 text-center mb-6">
          Connect one of the supported channels to start interacting with your audience.
        </p>

        <div className="grid grid-cols-4 gap-y-6 gap-x-4">
          {/* 1. Threads */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('threads')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-sm font-bold text-neutral-800 group-hover:bg-neutral-50 group-hover:border-neutral-300 transition-all shadow-2xs">
              @
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              Threads
            </span>
          </button>

          {/* 2. Facebook */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('facebook')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-sm group-hover:opacity-90 transition-opacity shadow-2xs">
              f
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              Facebook
            </span>
          </button>

          {/* 3. Instagram */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('instagram')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-white group-hover:border-neutral-300 transition-all shadow-2xs bg-white">
              <svg
                className="w-5 h-5 text-[#D92D7B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              Instagram
            </span>
          </button>

          {/* 4. LinkedIn */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('linkedin')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-md bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs group-hover:opacity-90 transition-opacity shadow-2xs">
              in
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              LinkedIn
            </span>
          </button>

          {/* 5. Google Business */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('google_business')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-700 group-hover:bg-neutral-50 group-hover:border-neutral-300 transition-all shadow-2xs">
              <Store size={18} className="text-[#1A73E8]" />
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              Google Business
            </span>
          </button>

          {/* 6. Mastodon */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('mastodon')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#6364FF] text-white flex items-center justify-center font-bold text-xs group-hover:opacity-90 transition-opacity shadow-2xs">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.248 15.176 0 12.001 0c-3.176 0-5.509.248-5.963.309C3.35.703 1.084 2.735.733 5.313.376 7.94.341 12.56.341 12.56c0 4.156.402 8.307 2.012 10.366 1.636 2.094 4.07 2.213 5.253 2.274 2.19.112 4.368-.135 6.467-.733l-.15-2.12c-1.748.497-3.559.697-5.367.595-1.996-.112-3.197-.847-3.328-2.192a5.45 5.45 0 0 1-.02-.637c2.316.56 4.693.847 7.078.855 2.508 0 4.962-.338 7.378-1.008 2.05-.57 3.535-2.28 3.655-4.407.319-5.65.044-12.222.044-12.222zm-4.717 10.222h-2.585V8.583c0-1.463-.615-2.212-1.832-2.212-1.348 0-2.025.874-2.025 2.607v3.774h-2.216V8.978c0-1.733-.677-2.607-2.025-2.607-1.217 0-1.832.749-1.832 2.212v6.952H3.45V8.406c0-1.463.373-2.628 1.12-3.495.765-.884 1.77-1.334 3.013-1.334 1.444 0 2.531.554 3.239 1.663l.635 1.066.635-1.066c.708-1.109 1.795-1.663 3.239-1.663 1.243 0 2.248.45 3.013 1.334.747.867 1.12 2.032 1.12 3.495v7.129z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              Mastodon
            </span>
          </button>

          {/* 7. TikTok */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('tiktok')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xs group-hover:opacity-90 transition-opacity shadow-2xs">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.125-4.484v-3.57a6.34 6.34 0 0 0-4.66 1.474 6.342 6.342 0 0 0-1.705 4.544 6.341 6.341 0 0 0 6.34 6.341 6.339 6.339 0 0 0 6.34-6.341V8.625a8.17 8.17 0 0 0 4.776 1.527V6.707a4.846 4.846 0 0 1-1.8-.021z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              TikTok
            </span>
          </button>

          {/* 8. YouTube */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('youtube')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF0000] text-white flex items-center justify-center group-hover:opacity-90 transition-opacity shadow-2xs">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-neutral-700 mt-2 group-hover:text-neutral-900">
              YouTube
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
