import { baseApi } from '@/app/api';
import { IChannel } from '../types/channel.types';

export const channelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query<IChannel[], void>({
      query: () => '/channels',
      transformResponse: (res: { success?: boolean; data?: any[] } | any[]) => {
        const list = Array.isArray(res) ? res : res?.data || [];
        return list.map((c) => ({
          ...c,
          id: (c._id || c.id || '').toString(),
          name: c.profile?.name || c.name || c.platform,
        }));
      },
      providesTags: ['Channels'],
    }),
    disconnectChannel: builder.mutation<void, string>({
      query: (id) => ({ url: `/channels/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

export const { useGetChannelsQuery, useDisconnectChannelMutation } = channelsApi;
