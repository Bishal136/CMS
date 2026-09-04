import { baseApi } from '@/app/api';
import { IPostInsight, ISummaryMetric } from '../types/insights.types';

export const insightsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSummaryMetrics: builder.query<ISummaryMetric[], void>({
      query: () => '/insights/summary',
    }),
    getTopPosts: builder.query<IPostInsight[], void>({
      query: () => '/insights/top-posts',
    }),
  }),
});

export const { useGetSummaryMetricsQuery, useGetTopPostsQuery } = insightsApi;
