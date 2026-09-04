import { baseApi } from '@/app/api';
import {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
  ISendOtpRequest,
  IRegisterWithOtpRequest,
  IGoogleLoginRequest,
} from '../types/auth.types';
import { IApiResponse } from '@/types/api.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IApiResponse<IAuthResponse>, ILoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<IApiResponse<IAuthResponse>, IRegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    sendOtp: builder.mutation<IApiResponse<{ message: string; otp?: string }>, ISendOtpRequest>({
      query: (data) => ({
        url: '/auth/send-otp',
        method: 'POST',
        body: data,
      }),
    }),
    registerWithOtp: builder.mutation<IApiResponse<IAuthResponse>, IRegisterWithOtpRequest>({
      query: (data) => ({
        url: '/auth/register-otp',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    googleLogin: builder.mutation<IApiResponse<IAuthResponse>, IGoogleLoginRequest>({
      query: (data) => ({
        url: '/auth/google',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<IApiResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useRegisterWithOtpMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
} = authApi;

