export interface ISelectOption<T = string> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type TSortOrder = 'asc' | 'desc';

export type TThemeMode = 'light' | 'dark' | 'system';

export interface IUserSummary {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface IDateRangeFilter {
  startDate: string;
  endDate: string;
  preset?: '7d' | '30d' | 'mtd' | 'custom';
}
