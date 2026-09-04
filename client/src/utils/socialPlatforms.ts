export interface ISocialPlatformConfig {
  id: string;
  name: string;
  color: string;
  iconPath: string;
  charLimit: number;
  mediaAllowed: boolean;
}

export const SOCIAL_PLATFORMS: Record<string, ISocialPlatformConfig> = {
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    iconPath: '/src/assets/icons/social/youtube.svg',
    charLimit: 5000,
    mediaAllowed: true,
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    iconPath: '/src/assets/icons/social/instagram.svg',
    charLimit: 2200,
    mediaAllowed: true,
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    iconPath: '/src/assets/icons/social/facebook.svg',
    charLimit: 63206,
    mediaAllowed: true,
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    iconPath: '/src/assets/icons/social/linkedin.svg',
    charLimit: 3000,
    mediaAllowed: true,
  },
  'twitter-x': {
    id: 'twitter-x',
    name: 'X (Twitter)',
    color: '#000000',
    iconPath: '/src/assets/icons/social/twitter-x.svg',
    charLimit: 280,
    mediaAllowed: true,
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    color: '#000000',
    iconPath: '/src/assets/icons/social/tiktok.svg',
    charLimit: 2200,
    mediaAllowed: true,
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    color: '#000000',
    iconPath: '/src/assets/icons/social/threads.svg',
    charLimit: 500,
    mediaAllowed: true,
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    color: '#BD081C',
    iconPath: '/src/assets/icons/social/pinterest.svg',
    charLimit: 500,
    mediaAllowed: true,
  },
  mastodon: {
    id: 'mastodon',
    name: 'Mastodon',
    color: '#6364FF',
    iconPath: '/src/assets/icons/social/mastodon.svg',
    charLimit: 500,
    mediaAllowed: true,
  },
  'google-business': {
    id: 'google-business',
    name: 'Google Business',
    color: '#4285F4',
    iconPath: '/src/assets/icons/social/google-business.svg',
    charLimit: 1500,
    mediaAllowed: true,
  },
};
