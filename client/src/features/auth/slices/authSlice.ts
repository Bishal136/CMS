import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/auth.types';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const loadInitialUser = (): IUser | null => {
  try {
    const raw = localStorage.getItem('cms_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: loadInitialUser(),
  token: localStorage.getItem('access_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: IUser;
        accessToken?: string;
        token?: string;
        tokens?: { accessToken: string; refreshToken?: string };
      }>
    ) => {
      const token =
        action.payload.accessToken ||
        action.payload.token ||
        action.payload.tokens?.accessToken ||
        '';
      state.user = action.payload.user;
      state.token = token;
      state.isAuthenticated = !!token;
      if (token) {
        localStorage.setItem('access_token', token);
      }
      if (action.payload.user) {
        localStorage.setItem('cms_user', JSON.stringify(action.payload.user));
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('cms_user');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logoutUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
