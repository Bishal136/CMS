import { baseApi } from '@/app/api';
import {
  IFeed,
  IFeedsApiResponse,
  IFeedItem,
  IFeedItemsApiResponse,
} from '../types/feed.types';

export const feedsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeeds: builder.query<IFeedsApiResponse, void>({
      query: () => '/feeds',
      providesTags: ['Feeds'],
    }),
    getFeedItems: builder.query<IFeedItemsApiResponse, { feedId?: string } | void>({
      query: (params) => ({
        url: '/feeds/items',
        params: params || undefined,
      }),
      providesTags: ['Feeds'],
    }),
    createFeed: builder.mutation<{ success: boolean; data: IFeed }, { name: string; url: string }>({
      query: (body) => ({ url: '/feeds', method: 'POST', body }),
      invalidatesTags: ['Feeds'],
    }),
    deleteFeed: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/feeds/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Feeds'],
    }),
    refreshFeed: builder.mutation<{ success: boolean; data: IFeedItem[] }, { feedId?: string } | void>({
      query: (params) => ({
        url: '/feeds/refresh',
        method: 'POST',
        params: params || undefined,
      }),
      invalidatesTags: ['Feeds'],
    }),
  }),
});

export const {
  useGetFeedsQuery,
  useGetFeedItemsQuery,
  useCreateFeedMutation,
  useDeleteFeedMutation,
  useRefreshFeedMutation,
} = feedsApi;
