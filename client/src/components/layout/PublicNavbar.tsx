import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Calendar, 
  Sparkles, 
  MessageSquare, 
  BarChart3, 
  Users, 
  ArrowRight,
  BookOpen,
  LayoutTemplate,
  HelpCircle,
  Code
} from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" ref={dropdownRef}>
        {/* Left: Brand Logo */}
        <Link to="/" onClick={closeAll} className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-[#FF1493] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22">
              <path d="M7 10h18M7 16h18M7 22h12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#0D0D0D]">
            CMS<span className="text-[#FF1493]">Flow</span>
          </span>
        </Link>

        {/* Center: Navigation Links with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Features Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('features')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeDropdown === 'features' ? 'text-[#FF1493] bg-[#FFF1F7]' : 'text-neutral-700 hover:text-[#0D0D0D] hover:bg-neutral-50'
              }`}
            >
              <span>Features</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'features' && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl border border-[#E8E8E8] shadow-xl p-3 z-50 animate-fade-in space-y-1">
                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-pink-50 text-[#FF1493] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0D0D0D]">Publishing & Queue</p>
                    <p className="text-[11px] text-[#6B6B6B]">Visual time-slot schedules and multi-channel composer</p>
                  </div>
                </Link>

                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0D0D0D]">Ideas & AI Studio</p>
                    <p className="text-[11px] text-[#6B6B6B]">Kanban inspiration boards and 1-click caption writer</p>
                  </div>
                </Link>

                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0D0D0D]">Community Inbox</p>
                    <p className="text-[11px] text-[#6B6B6B]">Unified comments stream and instant canned replies</p>
                  </div>
                </Link>

                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0D0D0D]">Analytics & Insights</p>
                    <p className="text-[11px] text-[#6B6B6B]">Engagement tracking and exportable PDF reports</p>
                  </div>
                </Link>

                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0D0D0D]">Team Approvals</p>
                    <p className="text-[11px] text-[#6B6B6B]">Multi-user roles and draft revision sign-offs</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Integrations Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('integrations')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeDropdown === 'integrations' ? 'text-[#FF1493] bg-[#FFF1F7]' : 'text-neutral-700 hover:text-[#0D0D0D] hover:bg-neutral-50'
              }`}
            >
              <span>Integrations</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'integrations' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'integrations' && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-[#E8E8E8] shadow-xl p-3 z-50 animate-fade-in grid grid-cols-2 gap-1.5">
                {[
                  { name: 'YouTube', col: 'text-red-600' },
                  { name: 'Instagram', col: 'text-pink-600' },
                  { name: 'X (Twitter)', col: 'text-neutral-900' },
                  { name: 'LinkedIn', col: 'text-blue-600' },
                  { name: 'TikTok', col: 'text-neutral-900' },
                  { name: 'Facebook', col: 'text-blue-500' },
                  { name: 'Threads', col: 'text-neutral-900' },
                  { name: 'Pinterest', col: 'text-red-500' },
                  { name: 'Google Business', col: 'text-blue-400' },
                  { name: 'Zapier & Apps', col: 'text-orange-500' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to="/"
                    onClick={closeAll}
                    className="p-2 rounded-lg hover:bg-neutral-50 text-xs font-medium text-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <span className={`w-2 h-2 rounded-full ${item.col} bg-current`} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Made for Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('madefor')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeDropdown === 'madefor' ? 'text-[#FF1493] bg-[#FFF1F7]' : 'text-neutral-700 hover:text-[#0D0D0D] hover:bg-neutral-50'
              }`}
            >
              <span>Made for</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'madefor' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'madefor' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-[#E8E8E8] shadow-xl p-3 z-50 animate-fade-in space-y-1">
                {[
                  { title: 'Content Creators', desc: 'YouTube & social creators' },
                  { title: 'Growing Businesses', desc: 'E-commerce & retail brands' },
                  { title: 'Marketing Agencies', desc: 'Multi-client management' },
                  { title: 'Solopreneurs & Founders', desc: 'Build in public effortlessly' },
                ].map((item) => (
                  <Link
                    key={item.title}
                    to="/"
                    onClick={closeAll}
                    className="block p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <p className="text-xs font-bold text-[#0D0D0D]">{item.title}</p>
                    <p className="text-[11px] text-[#6B6B6B]">{item.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('resources')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeDropdown === 'resources' ? 'text-[#FF1493] bg-[#FFF1F7]' : 'text-neutral-700 hover:text-[#0D0D0D] hover:bg-neutral-50'
              }`}
            >
              <span>Resources</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'resources' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-[#E8E8E8] shadow-xl p-3 z-50 animate-fade-in space-y-1">
                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-xs font-medium text-neutral-800"
                >
                  <BookOpen className="w-4 h-4 text-[#FF1493]" />
                  <span>Guides & Playbooks</span>
                </Link>
                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-xs font-medium text-neutral-800"
                >
                  <LayoutTemplate className="w-4 h-4 text-purple-600" />
                  <span>Post Templates Library</span>
                </Link>
                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-xs font-medium text-neutral-800"
                >
                  <Code className="w-4 h-4 text-emerald-600" />
                  <span>Developer API & Webhooks</span>
                </Link>
                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-xs font-medium text-neutral-800"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Help Center & FAQ</span>
                </Link>
              </div>
            )}
          </div>

          {/* Direct Pricing Link */}
          <Link
            to="/pricing"
            onClick={closeAll}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:text-[#0D0D0D] hover:bg-neutral-50 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Right: Auth Actions matching design/Landing page.png */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-full border border-[#E8E8E8] hover:border-neutral-400 text-sm font-semibold text-[#0D0D0D] hover:bg-neutral-50 transition-all cursor-pointer"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-full bg-[#FF1493] hover:bg-[#D90072] text-white text-sm font-semibold shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get started for free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/login"
            className="px-3 py-1.5 rounded-full border border-[#E8E8E8] text-xs font-semibold text-[#0D0D0D]"
          >
            Log in
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E8E8] bg-white px-6 py-6 space-y-4 animate-fade-in shadow-xl">
          <div className="space-y-2">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Navigation</p>
            <Link
              to="/"
              onClick={closeAll}
              className="block py-2 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
            >
              Features & Tools
            </Link>
            <Link
              to="/pricing"
              onClick={closeAll}
              className="block py-2 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
            >
              Pricing Plans
            </Link>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              to="/register"
              onClick={closeAll}
              className="w-full py-3 rounded-xl bg-[#FF1493] text-white text-center font-bold text-sm block shadow-md"
            >
              Get started for free
            </Link>
            <Link
              to="/login"
              onClick={closeAll}
              className="w-full py-3 rounded-xl border border-[#E8E8E8] text-center font-bold text-sm text-[#0D0D0D] block"
            >
              Log in to your account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
