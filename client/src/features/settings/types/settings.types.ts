export interface IPreferences {
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  timeFormat: '12h' | '24h';
  startOfWeek: 'sunday' | 'monday';
}

export interface INotificationSettings {
  emailDigest: boolean;
  failedPostAlert: boolean;
  approvalRequestAlert: boolean;
  weeklyInsights: boolean;
}
