import { baseApi } from '@/app/api';

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrg: builder.query<unknown, void>({
      query: () => '/organizations',
      providesTags: ['Organization'],
    }),
  }),
});

export const { useGetOrgQuery } = organizationApi;
