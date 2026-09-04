import { baseApi } from '@/app/api';
import { IPost, IPostCounts } from '../types/post.types';

export interface IGetPostsParams {
  status?: string;
  channelId?: string;
  tagId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], IGetPostsParams | void>({
      query: (params) => ({ url: '/posts', params: params || {} }),
      transformResponse: (res: { success?: boolean; data?: IPost[] } | IPost[]) => {
        if (Array.isArray(res)) return res;
        return (res as { data?: IPost[] })?.data || [];
      },
      providesTags: ['Posts'],
    }),

    getPostCounts: builder.query<IPostCounts, void>({
      query: () => '/posts/counts',
      transformResponse: (res: { success?: boolean; data?: IPostCounts }) =>
        res?.data || { queue: 0, drafts: 0, approvals: 0, sent: 0 },
      providesTags: ['Posts'],
    }),

    createPost: builder.mutation<IPost, Partial<IPost>>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation<IPost, { id: string; data: Partial<IPost> }>({
      query: ({ id, data }) => ({ url: `/posts/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Posts'],
    }),

    deletePost: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Posts'],
    }),

    publishNow: builder.mutation<IPost, string>({
      query: (id) => ({ url: `/posts/${id}/publish`, method: 'POST' }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostCountsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  usePublishNowMutation,
} = postsApi;

