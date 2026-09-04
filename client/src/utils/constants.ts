export const APP_NAME = 'CMS Management';

export const PLAN_LIMITS = {
  FREE: { channels: 3, scheduledPosts: 10, users: 1 },
  ESSENTIALS: { channels: 10, scheduledPosts: 100, users: 3 },
  TEAM: { channels: 25, scheduledPosts: 500, users: 10 },
  AGENCY: { channels: 100, scheduledPosts: 2000, users: 25 },
};

export const POST_STATUSES = {
  DRAFT: 'draft',
  PENDING_APPROVAL: 'pending_approval',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  FAILED: 'failed',
} as const;

export const SOCIAL_PLATFORMS_LIST = [
  'youtube',
  'instagram',
  'facebook',
  'linkedin',
  'twitter-x',
  'tiktok',
  'threads',
  'pinterest',
  'mastodon',
  'google-business',
] as const;
