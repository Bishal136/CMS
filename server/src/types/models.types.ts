import { Document, Types } from 'mongoose';

export interface IUserPreferences {
  theme?: 'light' | 'dark' | 'system';
  timezone?: string;
  timeFormat?: '12h' | '24h';
  startOfWeek?: 'monday' | 'sunday';
  landingPage?: string;
  defaultPostingAction?: 'addToQueue' | 'shareNow' | 'schedule';
  notifications?: {
    activityAndAlerts: boolean;
    insights: boolean;
    tipsAndEducation: boolean;
    newsletters: boolean;
  };
}

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: 'admin' | 'member' | 'publisher';
  organizationId: Types.ObjectId;
  preferences: IUserPreferences;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  isVerified: boolean;
  googleId?: string;
  authProvider: 'local' | 'google';
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrganizationDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  plan: 'free' | 'essentials' | 'team';
  ownerId: Types.ObjectId;
  channelLimit: number;
  postLimitPerChannel: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostingScheduleSlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  times: string[]; // "09:00", "13:00", "17:00"
}

export interface IChannelProfile {
  name: string;
  avatar?: string;
  handle?: string;
  url?: string;
}

export interface IChannelDocument extends Document {
  _id: Types.ObjectId;
  platform: 'youtube' | 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'threads' | 'pinterest' | 'mastodon' | 'google-business';
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  profile: IChannelProfile;
  postingSchedule: IPostingScheduleSlot[];
  organizationId: Types.ObjectId;
  isConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChannelGroupDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  channelIds: Types.ObjectId[];
  organizationId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApprovalNote {
  authorId: Types.ObjectId;
  authorName: string;
  text: string;
  createdAt: Date;
}

export interface IPostDocument extends Document {
  _id: Types.ObjectId;
  content: string;
  mediaUrls: string[];
  scheduledAt?: Date;
  publishedAt?: Date;
  status: 'draft' | 'queued' | 'pending-approval' | 'approved' | 'rejected' | 'sent' | 'failed';
  channelIds: Types.ObjectId[];
  tagIds: Types.ObjectId[];
  createdBy: Types.ObjectId;
  organizationId: Types.ObjectId;
  approvalNotes: IApprovalNote[];
  rejectionReason?: string;
  errorMessage?: string;
  firstComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIdeaDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  status: 'unassigned' | 'todo' | 'in-progress' | 'done';
  groupName?: string;
  order: number;
  tagIds: Types.ObjectId[];
  organizationId: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIdeaGroupDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  order: number;
  organizationId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITemplateDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  category: string;
  emoji?: string;
  isPersonal: boolean;
  isDiscoverable: boolean;
  organizationId?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeedDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  url: string;
  lastFetchedAt?: Date;
  organizationId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeedItemDocument extends Document {
  _id: Types.ObjectId;
  feedId: Types.ObjectId;
  title: string;
  description?: string;
  imageUrl?: string;
  sourceUrl: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDocument extends Document {
  _id: Types.ObjectId;
  socialCommentId: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  postId?: Types.ObjectId;
  channelId: Types.ObjectId;
  organizationId: Types.ObjectId;
  platform: string;
  isRead: boolean;
  repliedContent?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMentionDocument extends Document {
  _id: Types.ObjectId;
  socialMentionId: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  channelId: Types.ObjectId;
  organizationId: Types.ObjectId;
  platform: string;
  isRead: boolean;
  mentionedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedReplyDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  organizationId: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITagDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  color: string;
  organizationId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationDocument extends Document {
  _id: Types.ObjectId;
  type: 'post-published' | 'post-failed' | 'approval-request' | 'comment' | 'mention' | 'billing' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  userId: Types.ObjectId;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostInsightDocument extends Document {
  _id: Types.ObjectId;
  postId: Types.ObjectId;
  channelId: Types.ObjectId;
  organizationId: Types.ObjectId;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  reach: number;
  engagementRate: number;
  fetchedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRefreshTokenDocument extends Document {
  _id: Types.ObjectId;
  token: string;
  userId: Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscriptionDocument extends Document {
  _id: Types.ObjectId;
  organizationId: Types.ObjectId;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: 'free' | 'essentials' | 'team';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoiceDocument extends Document {
  _id: Types.ObjectId;
  organizationId: Types.ObjectId;
  stripeInvoiceId?: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  paidAt?: Date;
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOtpDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  otp: string;
  type: 'register' | 'reset-password' | 'login';
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
