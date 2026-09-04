import React from 'react';
import { CheckCircle2, Plus, Pen, Code } from 'lucide-react';

export interface IFirstStepsProps {
  hasConnectedChannel?: boolean;
  hasCreatedPost?: boolean;
  hasExploredApi?: boolean;
  onConnectChannel: () => void;
  onCreatePost: () => void;
  onExploreApi: () => void;
}

export const FirstSteps: React.FC<IFirstStepsProps> = ({
  hasConnectedChannel = false,
  hasCreatedPost = false,
  hasExploredApi = false,
  onConnectChannel,
  onCreatePost,
  onExploreApi,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold text-neutral-900 mb-3 tracking-tight">First Steps</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between hover:border-neutral-300 transition-colors shadow-2xs">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-neutral-900">1. Connect a channel</h3>
              <CheckCircle2
                size={16}
                className={hasConnectedChannel ? 'text-emerald-600 shrink-0' : 'text-neutral-300 shrink-0'}
              />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              Personalize your profile to make the most out of Buffer.
            </p>
          </div>
          <div>
            <button
              onClick={onConnectChannel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              <Plus size={13} className="text-neutral-600" />
              Connect Channel
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between hover:border-neutral-300 transition-colors shadow-2xs">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-neutral-900">2. Create a post</h3>
              <CheckCircle2
                size={16}
                className={hasCreatedPost ? 'text-emerald-600 shrink-0' : 'text-neutral-300 shrink-0'}
              />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              Schedule your first post in just a few clicks.
            </p>
          </div>
          <div>
            <button
              onClick={onCreatePost}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              <Pen size={12} className="text-neutral-600" />
              Create Post
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between hover:border-neutral-300 transition-colors shadow-2xs">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-neutral-900">3. Explore Buffer API</h3>
              <CheckCircle2
                size={16}
                className={hasExploredApi ? 'text-emerald-600 shrink-0' : 'text-neutral-300 shrink-0'}
              />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              Connect to your agents, automation tools, and more.
            </p>
          </div>
          <div>
            <button
              onClick={onExploreApi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 rounded-lg text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
            >
              <Code size={13} className="text-neutral-600" />
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
