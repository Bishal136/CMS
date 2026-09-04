import { baseApi } from '@/app/api';

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<unknown, void>({
      query: () => '/preferences',
      providesTags: ['Settings'],
    }),
  }),
});

export const { useGetSettingsQuery } = settingsApi;
