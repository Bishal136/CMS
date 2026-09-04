import { RouteObject, Navigate } from 'react-router-dom';
import { SettingsLayout } from '@/components/layout/SettingsLayout';
import { ProfilePage } from '@/features/settings/pages/ProfilePage';
import { PreferencesPage } from '@/features/settings/pages/PreferencesPage';
import { NotificationsPage } from '@/features/settings/pages/NotificationsPage';
import { GeneralPage } from '@/features/settings/pages/GeneralPage';
import { RolesPage } from '@/features/settings/pages/RolesPage';
import { ChannelsPage } from '@/features/settings/pages/ChannelsPage';
import { BillingPage } from '@/features/settings/pages/BillingPage';
import { TagsPage } from '@/features/settings/pages/TagsPage';
import { ChannelGroupsPage } from '@/features/settings/pages/ChannelGroupsPage';
import { SavedRepliesPage } from '@/features/settings/pages/SavedRepliesPage';
import { RoleGuard } from '@/components/common/RoleGuard';

export const settingsRoutes: RouteObject = {
  path: '/settings',
  element: <SettingsLayout />,
  children: [
    { index: true, element: <Navigate to="/settings/profile" replace /> },
    { path: 'profile', element: <ProfilePage /> },
        { path: 'preferences', element: <PreferencesPage /> },
        { path: 'notifications', element: <NotificationsPage /> },
        { path: 'general', element: <GeneralPage /> },
        {
          path: 'roles',
          element: (
            <RoleGuard allowedRoles={['admin']}>
              <RolesPage />
            </RoleGuard>
          ),
        },
        { path: 'channels', element: <ChannelsPage /> },
        {
          path: 'billing',
          element: (
            <RoleGuard allowedRoles={['admin']}>
              <BillingPage />
            </RoleGuard>
          ),
        },
        { path: 'tags', element: <TagsPage /> },
        {
          path: 'channel-groups',
          element: (
            <RoleGuard allowedRoles={['admin']}>
              <ChannelGroupsPage />
            </RoleGuard>
          ),
        },
        { path: 'saved-replies', element: <SavedRepliesPage /> },
  ],
};

