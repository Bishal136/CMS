import { baseApi } from '@/app/api';

export const billingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<unknown, void>({
      query: () => '/billing/plans',
    }),
  }),
});

export const { useGetPlansQuery } = billingApi;
