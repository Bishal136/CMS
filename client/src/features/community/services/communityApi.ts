import { baseApi } from '@/app/api';
import { IComment, IMention } from '../types/community.types';

export interface IGetCommentsParams {
  channelId?: string;
  postId?: string;
  isRead?: boolean;
}

export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<IComment[], IGetCommentsParams | void>({
      query: (params) => ({ url: '/comments', params: params || {} }),
      transformResponse: (res: { success?: boolean; data?: IComment[] } | IComment[]) => {
        if (Array.isArray(res)) return res;
        return (res as { data?: IComment[] })?.data || [];
      },
      providesTags: ['Comments'],
    }),
    replyComment: builder.mutation<IComment, { commentId: string; text?: string; content?: string }>({
      query: ({ commentId, text, content }) => ({
        url: `/comments/${commentId}/reply`,
        method: 'POST',
        body: { content: content || text, text: text || content },
      }),
      invalidatesTags: ['Comments'],
    }),
    markCommentAsRead: builder.mutation<IComment, string>({
      query: (commentId) => ({
        url: `/comments/${commentId}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Comments'],
    }),
    getMentions: builder.query<IMention[], { channelId?: string; isRead?: boolean } | void>({
      query: (params) => ({ url: '/mentions', params: params || {} }),
      transformResponse: (res: { success?: boolean; data?: IMention[] } | IMention[]) => {
        if (Array.isArray(res)) return res;
        return (res as { data?: IMention[] })?.data || [];
      },
      providesTags: ['Mentions'],
    }),
    markMentionAsRead: builder.mutation<IMention, string>({
      query: (id) => ({
        url: `/mentions/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Mentions'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useReplyCommentMutation,
  useMarkCommentAsReadMutation,
  useGetMentionsQuery,
  useMarkMentionAsReadMutation,
} = communityApi;
