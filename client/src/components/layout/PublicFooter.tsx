import React from 'react';
import { Link } from 'react-router-dom';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#E8E8E8] bg-white pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-[#E8E8E8]">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FF1493] flex items-center justify-center shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
                  <path d="M7 10h18M7 16h18M7 22h12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#0D0D0D]">
                CMS<span className="text-[#FF1493]">Flow</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-sm leading-relaxed">
              The modern social media workspace built for ambitious creators and teams. Plan, publish, and grow seamlessly across every network.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-600 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.98% Uptime)</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#0D0D0D] uppercase tracking-wider">Product</p>
            <ul className="space-y-2 text-xs text-[#6B6B6B]">
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Publishing Queue</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Kanban Ideas Board</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">AI Content Co-Pilot</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Community Inbox</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Analytics & Reports</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Team Approvals</Link></li>
              <li><Link to="/pricing" className="hover:text-[#FF1493] transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Col 3: Integrations */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#0D0D0D] uppercase tracking-wider">Integrations</p>
            <ul className="space-y-2 text-xs text-[#6B6B6B]">
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">YouTube Shorts & Video</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Instagram Reels & Grid</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">LinkedIn & PDF Carousels</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">X (Twitter) Threads</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">TikTok Video Share</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Canva & Cloud Storage</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Zapier & Webhooks</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#0D0D0D] uppercase tracking-wider">Company</p>
            <ul className="space-y-2 text-xs text-[#6B6B6B]">
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">About CMSFlow</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Creator Guides</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Post Templates</Link></li>
              <li><Link to="/" className="hover:text-[#FF1493] transition-colors">Developer Docs</Link></li>
              <li><Link to="/privacy" className="hover:text-[#FF1493] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#FF1493] transition-colors">Terms of Service</Link></li>
              <li><Link to="/login" className="hover:text-[#FF1493] transition-colors">Customer Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">
          <p>&copy; {new Date().getFullYear()} CMSFlow, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#0D0D0D]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#0D0D0D]">Terms</Link>
            <Link to="/security" className="hover:text-[#0D0D0D]">Security</Link>
            <Link to="/cookies" className="hover:text-[#0D0D0D]">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
