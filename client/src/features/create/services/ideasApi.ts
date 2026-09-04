import { baseApi } from '@/app/api';
import { IIdeasApiResponse, IIdea, IIdeaGroup } from '../types/idea.types';

export const ideasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIdeas: builder.query<IIdeasApiResponse, void>({
      query: () => '/ideas',
      providesTags: ['Ideas'],
    }),
    createIdea: builder.mutation<{ success: boolean; data: IIdea }, Partial<IIdea>>({
      query: (body) => ({ url: '/ideas', method: 'POST', body }),
      invalidatesTags: ['Ideas'],
    }),
    updateIdea: builder.mutation<{ success: boolean; data: IIdea }, { id: string; data: Partial<IIdea> }>({
      query: ({ id, data }) => ({ url: `/ideas/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Ideas'],
    }),
    deleteIdea: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/ideas/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Ideas'],
    }),
    createGroup: builder.mutation<{ success: boolean; data: IIdeaGroup }, { name: string }>({
      query: (body) => ({ url: '/ideas/groups', method: 'POST', body }),
      invalidatesTags: ['Ideas'],
    }),
    generateIdeas: builder.mutation<{ success: boolean; data: IIdea[] }, { topic: string; count?: number }>({
      query: (body) => ({ url: '/ideas/generate', method: 'POST', body }),
      invalidatesTags: ['Ideas'],
    }),
  }),
});

export const {
  useGetIdeasQuery,
  useCreateIdeaMutation,
  useUpdateIdeaMutation,
  useDeleteIdeaMutation,
  useCreateGroupMutation,
  useGenerateIdeasMutation,
} = ideasApi;
