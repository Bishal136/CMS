export interface IFeed {
  id: string;
  _id?: string;
  name: string;
  url: string;
  lastFetchedAt?: string;
  createdAt?: string;
  unreadCount?: number;
}

export interface IFeedItem {
  id: string;
  _id?: string;
  feedId: string | { _id: string; name: string; url: string };
  title: string;
  description?: string;
  imageUrl?: string;
  sourceUrl?: string;
  url?: string;
  source?: string;
  publishedAt: string;
}

export interface IFeedsApiResponse {
  success: boolean;
  data: IFeed[];
  message?: string;
}

export interface IFeedItemsApiResponse {
  success: boolean;
  data: IFeedItem[];
  message?: string;
}
