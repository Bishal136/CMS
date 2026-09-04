import React from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsSidebar } from './SettingsSidebar';
import { HelpCircle } from 'lucide-react';

export const SettingsLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      {/* Settings Navigation Sidebar */}
      <div className="w-56 sm:w-60 shrink-0 py-6 px-4 sm:px-6">
        <SettingsSidebar />
      </div>

      {/* Main Settings Content Area */}
      <main className="flex-1 py-6 pr-6 pl-0 min-w-0">
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 sm:p-10 shadow-xs min-h-[calc(100vh-3rem)]">
          <Outlet />
        </div>
      </main>

      {/* Floating Help Button */}
      <button
        type="button"
        title="Help & Support"
        className="fixed bottom-6 right-6 w-9 h-9 rounded-full bg-white border border-sky-300 text-sky-500 hover:text-sky-600 hover:border-sky-400 shadow-md flex items-center justify-center transition-all cursor-pointer z-40"
      >
        <HelpCircle size={20} />
      </button>
    </div>
  );
};
