import React, { useState } from 'react';
import { useGetHomeDashboardQuery } from '../services/homeApi';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { GreetingHeader } from '../components/GreetingHeader';
import { StatsRow } from '../components/StatsRow';
import { FirstSteps } from '../components/FirstSteps';
import { UpNextSection } from '../components/UpNextSection';
import { CommentsSection } from '../components/CommentsSection';
import { TemplatesSection, ITemplateItem } from '../components/TemplatesSection';
import { ConnectChannelModal } from '@/features/channels/components/ConnectChannelModal';
import { PostComposer } from '@/features/publish/components/composer/PostComposer';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Code2, Key, Terminal } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { data: dashboardResponse } = useGetHomeDashboardQuery();

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedTemplateContent, setSelectedTemplateContent] = useState('');
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  const dashboardData = dashboardResponse?.data;
  const userName = dashboardData?.user?.name || user?.name || 'bishalbiswas2027';
  const stats = dashboardData?.stats || {
    weekStreak: 0,
    postingGoals: 0,
    commentScore: 0,
    connectedChannelsCount: 0,
  };
  const firstSteps = dashboardData?.firstSteps || {
    hasConnectedChannel: stats.connectedChannelsCount > 0,
    hasCreatedPost: false,
    hasExploredApi: false,
  };
  const upcomingPosts = dashboardData?.upcomingPosts || [];
  const recentComments = dashboardData?.recentComments || [];
  const templates = dashboardData?.templates;

  const handleTemplateSelect = (template: ITemplateItem) => {
    setSelectedTemplateContent(template.content || template.title);
    setIsComposerOpen(true);
  };

  return (
    <div className="relative pb-12">
      {/* 1. Greeting Header */}
      <GreetingHeader userName={userName} />

      {/* 2. Stats Capsule Bar + Connect Alert Banner */}
      <StatsRow
        weekStreak={stats.weekStreak}
        postingGoals={stats.postingGoals}
        commentScore={stats.commentScore}
        hasConnectedChannel={firstSteps.hasConnectedChannel}
        onConnectChannel={() => setIsConnectModalOpen(true)}
      />

      {/* 3. First Steps Section */}
      <FirstSteps
        hasConnectedChannel={firstSteps.hasConnectedChannel}
        hasCreatedPost={firstSteps.hasCreatedPost}
        hasExploredApi={firstSteps.hasExploredApi}
        onConnectChannel={() => setIsConnectModalOpen(true)}
        onCreatePost={() => {
          setSelectedTemplateContent('');
          setIsComposerOpen(true);
        }}
        onExploreApi={() => setIsApiModalOpen(true)}
      />

      {/* 4. Up Next & Comments Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UpNextSection posts={upcomingPosts} />
        <CommentsSection comments={recentComments} />
      </div>

      {/* 5. Recommended Templates */}
      <TemplatesSection
        templates={templates}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* 6. Modals */}
      <ConnectChannelModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setSelectedTemplateContent('');
        }}
        initialContent={selectedTemplateContent}
      />

      {/* Explore API Modal */}
      <Modal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        title="Explore Developer API & Automation"
        className="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-neutral-600 leading-relaxed">
            Build custom workflows, automate post scheduling, or hook up your AI agents using our REST API.
          </p>

          <div className="p-3 bg-neutral-900 text-neutral-100 rounded-lg text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-emerald-400" />
              <span>curl https://api.cmsflow.io/v1/posts</span>
            </div>
            <span className="text-[10px] text-neutral-400">REST</span>
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <div className="flex items-center gap-2.5 text-xs text-neutral-700">
              <Key size={14} className="text-[#FF1493]" />
              <span>API Key Authentication with granular scopes</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-700">
              <Code2 size={14} className="text-[#FF1493]" />
              <span>Webhooks for instant publication and comment updates</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button size="sm" onClick={() => setIsApiModalOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>

      {/* 7. Floating Help Button */}
      <button
        type="button"
        title="Help & Support"
        onClick={() => alert('CMSFlow Support & Documentation is here to help!')}
        className="fixed bottom-6 right-6 w-9 h-9 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform active:scale-95 cursor-pointer z-40"
      >
        <span className="text-sm font-bold leading-none select-none">?</span>
      </button>
    </div>
  );
};
