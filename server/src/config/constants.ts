export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  ESSENTIALS: 'essentials',
  TEAM: 'team',
} as const;

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS];

export const PLAN_LIMITS = {
  free: {
    maxChannels: 3,
    maxScheduledPostsPerChannel: 10,
    ideasCount: 100,
    userAccounts: 1,
    analytics: 'basic',
    approvalWorkflow: false,
    channelGroups: false,
  },
  essentials: {
    maxChannels: 10,
    maxScheduledPostsPerChannel: Infinity,
    ideasCount: Infinity,
    userAccounts: 1,
    analytics: 'advanced',
    approvalWorkflow: false,
    channelGroups: false,
  },
  team: {
    maxChannels: 50,
    maxScheduledPostsPerChannel: Infinity,
    ideasCount: Infinity,
    userAccounts: Infinity,
    analytics: 'advanced',
    approvalWorkflow: true,
    channelGroups: true,
  },
} as const;

export const POST_STATUSES = {
  DRAFT: 'draft',
  QUEUED: 'queued',
  PENDING_APPROVAL: 'pending-approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SENT: 'sent',
  FAILED: 'failed',
} as const;

export type PostStatus = (typeof POST_STATUSES)[keyof typeof POST_STATUSES];

export const SOCIAL_PLATFORMS = [
  'youtube',
  'facebook',
  'twitter',
  'instagram',
  'linkedin',
  'tiktok',
  'threads',
  'pinterest',
  'mastodon',
  'google-business',
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
