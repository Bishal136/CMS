import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsSidebarItem } from './SettingsSidebarItem';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useGetChannelsQuery } from '@/features/channels/services/channelsApi';
import {
  ArrowLeft,
  User,
  SlidersHorizontal,
  Bell,
  Building2,
  ShieldCheck,
  LayoutGrid,
  CreditCard,
  Tag,
  Folder,
  Zap,
  MessageSquare,
  Lock,
} from 'lucide-react';

export const SettingsSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const isAdmin = role === 'admin';
  const { data: channels } = useGetChannelsQuery();
  const channelCount = Array.isArray(channels) ? channels.length : 1;

  return (
    <aside className="w-56 shrink-0 space-y-6 select-none">
      {/* Back button + Settings title */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-neutral-800 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Settings</span>
        </button>
      </div>

      {/* Account Section */}
      <div>
        <h4 className="px-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">
          Account
        </h4>
        <nav className="space-y-1">
          <SettingsSidebarItem
            to="/settings/profile"
            label="Profile"
            icon={<User size={16} />}
          />
          <SettingsSidebarItem
            to="/settings/preferences"
            label="Preferences"
            icon={<SlidersHorizontal size={16} />}
          />
          <SettingsSidebarItem
            to="/settings/notifications"
            label="Notifications"
            icon={<Bell size={16} />}
          />
        </nav>
      </div>

      {/* Organization Section */}
      <div>
        <div className="flex items-center justify-between px-3 mb-2">
          <h4 className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            Organization
          </h4>
          {isAdmin && (
            <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#D1B000]/20 text-[#D1B000] border border-[#D1B000]/40">
              <ShieldCheck size={10} /> Admin
            </span>
          )}
        </div>
        <nav className="space-y-1">
          <SettingsSidebarItem
            to="/settings/general"
            label="General"
            icon={<Building2 size={16} />}
          />
          {isAdmin && (
            <SettingsSidebarItem
              to="/settings/roles"
              label="Role & Permissions"
              icon={<ShieldCheck size={16} />}
            />
          )}
          <SettingsSidebarItem
            to="/settings/channels"
            label="Channels"
            icon={<LayoutGrid size={16} />}
            badge={
              <span className="text-xs text-neutral-400 font-medium">
                {channelCount}
              </span>
            }
          />
          {isAdmin ? (
            <SettingsSidebarItem
              to="/settings/billing"
              label="Billing"
              icon={<CreditCard size={16} />}
            />
          ) : (
            <div className="pt-2 px-3">
              <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                <Lock size={10} className="text-neutral-400" />
                <span>Subscription & Roles managed by Admin</span>
              </p>
            </div>
          )}
        </nav>
      </div>

      {/* Features Section */}
      <div>
        <h4 className="px-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">
          Features
        </h4>
        <nav className="space-y-1">
          <SettingsSidebarItem
            to="/settings/tags"
            label="Tags"
            icon={<Tag size={16} />}
          />
          {isAdmin && (
            <SettingsSidebarItem
              to="/settings/channel-groups"
              label="Channel Groups"
              icon={<Folder size={16} />}
              badge={
                <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Zap size={10} className="fill-purple-600" />
                </span>
              }
            />
          )}
          <SettingsSidebarItem
            to="/settings/saved-replies"
            label="Saved Replies"
            icon={<MessageSquare size={16} />}
          />
        </nav>
      </div>
    </aside>
  );
};
