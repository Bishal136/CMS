import React from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsSidebar } from './SettingsSidebar';

export const SettingsLayout: React.FC = () => {
  return (
    <div className="flex gap-8 py-4">
      <SettingsSidebar />
      <div className="flex-1 bg-white border border-[#E8E8E8] rounded-xl p-6 shadow-xs min-w-0">
        <Outlet />
      </div>
    </div>
  );
};
