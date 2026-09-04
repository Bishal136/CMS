import { baseApi } from '@/app/api';
import { IUser } from '@/features/auth/types/auth.types';
import { IApiResponse } from '@/types/api.types';

export interface IUpdatePasswordRequest {
  currentPassword?: string;
  newPassword: string;
}

export interface IUploadAvatarResponse {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
}

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IApiResponse<IUser>, void>({
      query: () => '/users/profile',
      providesTags: ['Settings', 'Auth'],
    }),
    updateProfile: builder.mutation<IApiResponse<IUser>, Partial<IUser>>({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Settings', 'Auth'],
    }),
    updatePassword: builder.mutation<IApiResponse<null>, IUpdatePasswordRequest>({
      query: (data) => ({
        url: '/users/password',
        method: 'PUT',
        body: data,
      }),
    }),
    resendVerificationEmail: builder.mutation<IApiResponse<{ message: string }>, void>({
      query: () => ({
        url: '/users/resend-verification',
        method: 'POST',
      }),
    }),
    uploadAvatar: builder.mutation<IApiResponse<IUploadAvatarResponse>, FormData>({
      query: (formData) => ({
        url: '/upload/avatar',
        method: 'POST',
        body: formData,
      }),
    }),
    getSettings: builder.query<unknown, void>({
      query: () => '/users/profile',
      providesTags: ['Settings'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useResendVerificationEmailMutation,
  useUploadAvatarMutation,
  useGetSettingsQuery,
} = settingsApi;
