import { baseApi } from '@/app/api';

export interface IHomeDashboardResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  organization: {
    id: string;
    name: string;
    plan: string;
  };
  stats: {
    weekStreak: number;
    postingGoals: number;
    commentScore: number;
    connectedChannelsCount: number;
  };
  firstSteps: {
    hasConnectedChannel: boolean;
    hasCreatedPost: boolean;
    hasExploredApi: boolean;
  };
  upcomingPosts: Array<{
    id: string;
    content: string;
    mediaUrls?: string[];
    scheduledAt?: string;
    status: string;
    channels: Array<{
      id: string;
      platform: string;
      name: string;
    }>;
  }>;
  recentComments: Array<{
    id: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    platform: string;
    createdAt: string;
    isRead: boolean;
  }>;
  templates: Array<{
    id: string;
    title: string;
    description: string;
    content?: string;
    category?: string;
    emoji: string;
  }>;
}

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeDashboard: builder.query<{ success: boolean; data: IHomeDashboardResponse; message?: string }, void>({
      query: () => '/home',
      providesTags: ['Posts', 'Channels', 'Comments', 'Templates'],
    }),
    getHomeStats: builder.query<{ success: boolean; data: IHomeDashboardResponse['stats'] }, void>({
      query: () => '/home/stats',
      providesTags: ['Posts', 'Channels', 'Comments'],
    }),
  }),
});

export const { useGetHomeDashboardQuery, useGetHomeStatsQuery } = homeApi;
