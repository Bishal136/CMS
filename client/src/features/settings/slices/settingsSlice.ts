import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPreferences, INotificationSettings } from '../types/settings.types';

interface SettingsState {
  preferences: IPreferences;
  notifications: INotificationSettings;
}

const initialState: SettingsState = {
  preferences: {
    theme: 'light',
    timezone: 'UTC',
    timeFormat: '12h',
    startOfWeek: 'monday',
  },
  notifications: {
    emailDigest: true,
    failedPostAlert: true,
    approvalRequestAlert: true,
    weeklyInsights: false,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<IPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateNotifications: (state, action: PayloadAction<Partial<INotificationSettings>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
  },
});

export const { updatePreferences, updateNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;
