import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { ShieldCheck, User as UserIcon, LogOut, Settings } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { user, role } = useAuth();
  const { logout } = useLogout();
  const isAdmin = role === 'admin';

  return (
    <header className="h-16 border-b border-[#E8E8E8] bg-white px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-neutral-800">
          Welcome, <span className="font-bold">{user?.name || 'User'}</span>
        </span>

        {/* Role Badge */}
        {isAdmin ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D1B000]/15 text-[#9E8300] border border-[#D1B000]/50 shadow-xs">
            <ShieldCheck size={12} className="text-[#D1B000]" />
            ADMIN ROLE
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
            <UserIcon size={12} className="text-neutral-500" />
            USER ROLE
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link to="/dashboard/publish/queue">
          <Button size="sm">+ New Post</Button>
        </Link>

        <Link
          to="/settings/profile"
          className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          title="Account Settings"
        >
          <Settings size={18} />
        </Link>

        <div className="flex items-center gap-2 pl-1 border-l border-[#E8E8E8]">
          <Avatar name={user?.name || 'User'} size="sm" />
          <button
            onClick={() => logout()}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
