export interface ICommentReply {
  id?: string;
  _id?: string;
  author?: string;
  authorName?: string;
  avatar?: string;
  authorAvatar?: string;
  text?: string;
  content?: string;
  createdAt: string;
}

export interface IComment {
  id?: string;
  _id?: string;
  postId?: string | { _id?: string; content?: string; mediaUrls?: string[] };
  channelId?: string | { _id?: string; platform?: string; profile?: { name?: string; avatar?: string } };
  platform: string;
  author?: string;
  authorName?: string;
  avatar?: string;
  authorAvatar?: string;
  text?: string;
  content?: string;
  createdAt: string;
  isRead: boolean;
  repliedContent?: string;
  repliedAt?: string;
  replies?: ICommentReply[];
}

export interface IMention {
  id?: string;
  _id?: string;
  platform: string;
  author?: string;
  authorName?: string;
  avatar?: string;
  authorAvatar?: string;
  text?: string;
  content?: string;
  createdAt?: string;
  mentionedAt?: string;
  isRead?: boolean;
  channelId?: string | { _id?: string; platform?: string; profile?: { name?: string; avatar?: string } };
  url?: string;
}
