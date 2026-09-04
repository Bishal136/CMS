import React, { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { User, LogOut, Settings, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ISidebarOrgInfoProps {
  orgName?: string;
  plan?: string;
}

export const SidebarOrgInfo: React.FC<ISidebarOrgInfoProps> = ({
  orgName = 'My organization',
  plan = 'Free Plan',
}) => {
  const { user } = useAuth();
  const { logout } = useLogout();
  const [showMenu, setShowMenu] = useState(false);

  const displayName = orgName || user?.name || 'My organization';
  const displayPlan = plan || 'Free Plan';

  return (
    <div className="relative p-3 border-t border-[#E8E8E8]">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="w-full flex items-center justify-between gap-2.5 p-1.5 rounded-xl hover:bg-neutral-100 transition-colors text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#3F51B5] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <User size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-neutral-900 truncate leading-tight">
              {displayName}
            </p>
            <p className="text-[11px] text-neutral-500 font-medium leading-tight mt-0.5">
              {displayPlan}
            </p>
          </div>
        </div>

        <div className="text-neutral-400 group-hover:text-neutral-700 shrink-0">
          <ExternalLink size={13} />
        </div>
      </button>

      {/* Popover Menu for Profile / Settings / Logout */}
      {showMenu && (
        <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-neutral-100 text-xs text-neutral-500">
            Signed in as <span className="font-semibold text-neutral-800">{user?.name || 'User'}</span>
          </div>
          <Link
            to="/settings/profile"
            onClick={() => setShowMenu(false)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
          >
            <Settings size={14} className="text-neutral-400" />
            Profile & Settings
          </Link>
          <button
            onClick={() => {
              setShowMenu(false);
              logout();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
