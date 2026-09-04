export interface IChannelProfile {
  id: string;
  name: string;
  handle?: string;
  avatar?: string;
}

export interface IChannel {
  id: string;
  _id?: string;
  name: string;
  platform: string;
  avatar?: string;
  isActive?: boolean;
  profile?: {
    name?: string;
    avatar?: string;
    handle?: string;
  };
  postingTimes?: string[];
  postingSchedule?: Array<{
    day: string;
    times: string[];
  }>;
}

export type IChannelType = 'youtube' | 'instagram' | 'facebook' | 'linkedin' | 'twitter-x' | 'tiktok';
