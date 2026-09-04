import React from 'react';
import { SettingsSidebarItem } from './SettingsSidebarItem';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ShieldCheck, Lock } from 'lucide-react';

export const SettingsSidebar: React.FC = () => {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  return (
    <aside className="w-56 shrink-0 space-y-6">
      <div>
        <h4 className="px-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">
          Account
        </h4>
        <nav className="space-y-1">
          <SettingsSidebarItem to="/settings/profile" label="Profile" />
          <SettingsSidebarItem to="/settings/preferences" label="Preferences" />
          <SettingsSidebarItem to="/settings/notifications" label="Notifications" />
        </nav>
      </div>

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
          <SettingsSidebarItem to="/settings/general" label="General" />
          <SettingsSidebarItem to="/settings/channels" label="Channels (Website)" />

          {/* Admin Managed: Roles & Subscriptions */}
          {isAdmin ? (
            <>
              <SettingsSidebarItem to="/settings/roles" label="Roles & Permissions" />
              <SettingsSidebarItem to="/settings/billing" label="Billing & Subscription" />
            </>
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

      <div>
        <h4 className="px-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">
          Features
        </h4>
        <nav className="space-y-1">
          <SettingsSidebarItem to="/settings/tags" label="Tags" />
          {isAdmin && (
            <SettingsSidebarItem to="/settings/channel-groups" label="Channel Groups" />
          )}
          <SettingsSidebarItem to="/settings/saved-replies" label="Saved Replies" />
        </nav>
      </div>
    </aside>
  );
};
