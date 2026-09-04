import React from 'react';

export interface IMentionsEmptyStateProps {
  onConnectChannel?: (platform?: string) => void;
}

export const MentionsEmptyState: React.FC<IMentionsEmptyStateProps> = ({
  onConnectChannel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8 text-center select-none">
      {/* 1. Top Circular @ Symbol */}
      <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-2xl font-light mb-4 shadow-2xs">
        @
      </div>

      {/* 2. Heading & Subheading */}
      <h2 className="text-sm sm:text-base font-bold text-neutral-900 mb-1.5">
        Mentions are available only for selected channels
      </h2>
      <p className="text-xs text-neutral-500 mb-8">
        We're actively working on expanding this list.
      </p>

      {/* 3. Supported Channels Container */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-8 sm:p-10 shadow-2xs max-w-xl w-full">
        <p className="text-xs text-neutral-500 text-center mb-8">
          Connect one of the supported channels to see mentions.
        </p>

        <div className="grid grid-cols-3 gap-6 sm:gap-8 items-start text-center">
          {/* 1. X (Twitter) */}
          <button
            type="button"
            onClick={() => onConnectChannel?.('twitter')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-dashed border-neutral-300 group-hover:border-neutral-500 group-hover:bg-neutral-50 flex items-center justify-center mx-auto mb-2.5 text-neutral-900 transition-all shadow-2xs">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-neutral-800 group-hover:text-neutral-900">
              X (Twitter)
            </span>
          </button>

          {/* 2. Instagram */}
          <div className="flex flex-col items-center select-none">
            <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center mx-auto mb-2.5 text-neutral-400 bg-white shadow-2xs">
              <svg
                className="w-5 h-5 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <span className="text-xs font-medium text-neutral-600">
              Instagram
            </span>
            <span className="inline-block bg-neutral-100 text-neutral-500 text-[10px] font-medium px-2 py-0.5 rounded-full mt-1.5">
              Coming soon
            </span>
          </div>

          {/* 3. LinkedIn Profiles */}
          <div className="flex flex-col items-center select-none">
            <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center mx-auto mb-2.5 text-neutral-400 bg-white shadow-2xs">
              <span className="font-bold text-xs">in</span>
            </div>
            <span className="text-xs font-medium text-neutral-600">
              LinkedIn Profiles
            </span>
            <span className="inline-block bg-neutral-100 text-neutral-500 text-[10px] font-medium px-2 py-0.5 rounded-full mt-1.5">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
