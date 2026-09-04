import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './api';

// Feature reducers will be imported here
import authReducer from '@/features/auth/slices/authSlice';
import homeReducer from '@/features/home/slices/homeSlice';
import ideasReducer from '@/features/create/slices/ideasSlice';
import templatesReducer from '@/features/create/slices/templatesSlice';
import feedsReducer from '@/features/create/slices/feedsSlice';
import postsReducer from '@/features/publish/slices/postsSlice';
import composerReducer from '@/features/publish/slices/composerSlice';
import communityReducer from '@/features/community/slices/communitySlice';
import insightsReducer from '@/features/insights/slices/insightsSlice';
import channelsReducer from '@/features/channels/slices/channelsSlice';
import settingsReducer from '@/features/settings/slices/settingsSlice';
import organizationReducer from '@/features/settings/slices/organizationSlice';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  home: homeReducer,
  ideas: ideasReducer,
  templates: templatesReducer,
  feeds: feedsReducer,
  posts: postsReducer,
  composer: composerReducer,
  community: communityReducer,
  insights: insightsReducer,
  channels: channelsReducer,
  settings: settingsReducer,
  organization: organizationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
