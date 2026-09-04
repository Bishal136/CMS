export interface IDateRange {
  startDate: string;
  endDate: string;
}

export interface ISummaryMetric {
  title: string;
  value: string;
  changePercentage: number;
}

export interface IPostInsight {
  postId: string;
  content: string;
  platform: string;
  impressions: number;
  likes: number;
  comments: number;
  engagementRate: number;
}
