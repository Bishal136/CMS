import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/services/apiEndpoints';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

let refreshPromise: Promise<string | null> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // If a token refresh is currently in flight, wait for it before dispatching
  if (refreshPromise) {
    await refreshPromise;
  }

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const url = typeof args === 'string' ? args : args.url;
    const isAuthEndpoint =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh') ||
      url.includes('/auth/logout');

    if (isAuthEndpoint) {
      return result;
    }

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const refreshRes = await rawBaseQuery(
            {
              url: '/auth/refresh',
              method: 'POST',
            },
            api,
            extraOptions
          );

          if (refreshRes.data) {
            const data = refreshRes.data as {
              success?: boolean;
              data?: {
                accessToken?: string;
                tokens?: { accessToken?: string };
              };
            };
            const newToken =
              data?.data?.accessToken || data?.data?.tokens?.accessToken;
            if (newToken) {
              localStorage.setItem('access_token', newToken);
              return newToken;
            }
          }
          return null;
        } catch {
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const newAccessToken = await refreshPromise;

    if (newAccessToken) {
      // Retry original request with the fresh token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh failed or session expired
      localStorage.removeItem('access_token');
      localStorage.removeItem('cms_user');
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'Posts',
    'Channels',
    'Ideas',
    'Templates',
    'Feeds',
    'Comments',
    'Mentions',
    'Settings',
    'Organization',
  ],
  endpoints: () => ({}),
});
