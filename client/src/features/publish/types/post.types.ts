export type TPostStatus =
  | 'draft'
  | 'queued'
  | 'pending-approval'
  | 'approved'
  | 'rejected'
  | 'sent'
  | 'failed'
  | 'scheduled'
  | 'published'
  | 'pending_approval';

export interface IPostChannel {
  _id: string;
  platform: string;
  profile?: {
    name?: string;
    avatar?: string;
    handle?: string;
  };
}

export interface IPostTag {
  _id: string;
  name: string;
  color?: string;
}

export interface IPost {
  _id?: string;
  id?: string;
  content: string;
  mediaUrls?: string[];
  channelIds: (string | IPostChannel)[];
  tagIds?: (string | IPostTag)[];
  tags?: string[];
  status: TPostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  sentAt?: string;
  firstComment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPostCounts {
  queue: number;
  drafts: number;
  approvals: number;
  sent: number;
}

export interface IQueueSlot {
  id: string;
  time: string; // e.g. "09:00 AM" or "9:00 AM"
  time24?: string; // e.g. "09:00"
  date: string; // e.g. "Tomorrow, September 4"
  dateKey?: string; // YYYY-MM-DD
  platform?: string; // 'instagram' | 'facebook' | 'linkedin'
  channelId?: string;
  post?: IPost;
}

export interface IApproval {
  id: string;
  postId: string;
  post: IPost;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: { author: string; text: string; createdAt: string }[];
}
