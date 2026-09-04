export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
    VERIFY_EMAIL: '/auth/verify-email',
  },
  // Users
  USERS: {
    PROFILE: '/users/profile',
    PASSWORD: '/users/password',
    AVATAR: '/users/avatar',
    TWO_FACTOR: '/users/2fa',
  },
  // Organizations
  ORGANIZATIONS: {
    BASE: '/organizations',
    MEMBERS: '/organizations/members',
    INVITE: '/organizations/members/invite',
  },
  // Channels
  CHANNELS: {
    BASE: '/channels',
    BY_ID: (id: string) => `/channels/${id}`,
    CONNECT: (platform: string) => `/channels/connect/${platform}`,
    SCHEDULE: (id: string) => `/channels/${id}/schedule`,
    SETTINGS: (id: string) => `/channels/${id}/settings`,
  },
  // Channel Groups
  CHANNEL_GROUPS: {
    BASE: '/channel-groups',
    BY_ID: (id: string) => `/channel-groups/${id}`,
  },
  // Posts
  POSTS: {
    BASE: '/posts',
    BY_ID: (id: string) => `/posts/${id}`,
    SCHEDULE: (id: string) => `/posts/${id}/schedule`,
    PUBLISH_NOW: (id: string) => `/posts/${id}/publish`,
    QUEUE: '/queue',
    QUEUE_SLOTS: '/queue/slots',
    DRAFTS: '/drafts',
    APPROVALS: '/approvals',
    SENT: '/posts/sent',
  },
  // Ideas & Templates & Feeds
  CREATE: {
    IDEAS: '/ideas',
    IDEAS_GROUPS: '/ideas/groups',
    TEMPLATES: '/templates',
    TEMPLATES_DISCOVER: '/templates/discover',
    FEEDS: '/feeds',
    FEED_ITEMS: (id: string) => `/feeds/${id}/items`,
  },
  // Community
  COMMUNITY: {
    COMMENTS: '/comments',
    MENTIONS: '/mentions',
    REPLY: (commentId: string) => `/comments/${commentId}/reply`,
  },
  // Insights
  INSIGHTS: {
    POSTS: '/insights/posts',
    SUMMARY: '/insights/summary',
    TOP_POSTS: '/insights/top-posts',
    EXPORT: '/insights/export',
  },
  // Settings & Billing
  SETTINGS: {
    PREFERENCES: '/preferences',
    NOTIFICATIONS: '/notifications/preferences',
    TAGS: '/tags',
    SAVED_REPLIES: '/saved-replies',
    BILLING_PLANS: '/billing/plans',
    BILLING_CHECKOUT: '/billing/checkout',
  },
};
