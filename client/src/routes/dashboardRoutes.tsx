import { RouteObject, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/features/home/pages/HomePage';
import { IdeasPage } from '@/features/create/pages/IdeasPage';
import { TemplatesPage } from '@/features/create/pages/TemplatesPage';
import { FeedsPage } from '@/features/create/pages/FeedsPage';
import { QueuePage } from '@/features/publish/pages/QueuePage';
import { DraftsPage } from '@/features/publish/pages/DraftsPage';
import { ApprovalsPage } from '@/features/publish/pages/ApprovalsPage';
import { SentPage } from '@/features/publish/pages/SentPage';
import { CommentsPage } from '@/features/community/pages/CommentsPage';
import { MentionsPage } from '@/features/community/pages/MentionsPage';
import { PostInsightsPage } from '@/features/insights/pages/PostInsightsPage';
import { ChannelLayout } from '@/components/layout/ChannelLayout';
import { ChannelViewPage } from '@/features/channels/pages/ChannelViewPage';

export const dashboardRoutes: RouteObject = {
  path: '/dashboard',
  element: <AppLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'create/ideas', element: <IdeasPage /> },
    { path: 'create/templates', element: <TemplatesPage /> },
    { path: 'create/feeds', element: <FeedsPage /> },
    { path: 'publish/queue', element: <QueuePage /> },
    { path: 'publish/drafts', element: <DraftsPage /> },
    { path: 'publish/approvals', element: <ApprovalsPage /> },
    { path: 'publish/sent', element: <SentPage /> },
    { path: 'community/comments', element: <CommentsPage /> },
    { path: 'community/mentions', element: <MentionsPage /> },
    { path: 'insights', element: <PostInsightsPage /> },
    {
      path: 'channel/:channelId',
      element: <ChannelLayout />,
      children: [{ index: true, element: <ChannelViewPage /> }],
    },
    { path: '*', element: <Navigate to="/dashboard" replace /> },
  ],
};
