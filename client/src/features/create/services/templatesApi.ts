import { baseApi } from '@/app/api';
import { ITemplate, ITemplatesApiResponse } from '../types/template.types';

export const templatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<
      ITemplatesApiResponse,
      { category?: string; isPersonal?: boolean; search?: string } | void
    >({
      query: (params) => ({
        url: '/templates',
        params: params || undefined,
      }),
      providesTags: ['Templates'],
    }),
    getDiscoverTemplates: builder.query<ITemplatesApiResponse, void>({
      query: () => '/templates/discover',
      providesTags: ['Templates'],
    }),
    createTemplate: builder.mutation<{ success: boolean; data: ITemplate }, Partial<ITemplate>>({
      query: (body) => ({ url: '/templates', method: 'POST', body }),
      invalidatesTags: ['Templates'],
    }),
    updateTemplate: builder.mutation<{ success: boolean; data: ITemplate }, { id: string; data: Partial<ITemplate> }>({
      query: ({ id, data }) => ({ url: `/templates/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Templates'],
    }),
    deleteTemplate: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/templates/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Templates'],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetDiscoverTemplatesQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templatesApi;
