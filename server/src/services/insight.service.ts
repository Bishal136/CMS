import { PostInsight } from '../models/PostInsight.model';
import { Post } from '../models/Post.model';
import { Types } from 'mongoose';

export class InsightService {
  static async getSummary(organizationId: string) {
    const orgObjectId = new Types.ObjectId(organizationId);

    const [aggregate] = await PostInsight.aggregate([
      { $match: { organizationId: orgObjectId } },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: '$likes' },
          totalComments: { $sum: '$comments' },
          totalImpressions: { $sum: '$impressions' },
          avgEngagement: { $avg: '$engagementRate' },
        },
      },
    ]);

    const totalSentPosts = await Post.countDocuments({
      organizationId,
      status: 'sent',
    });

    return {
      totalPosts: totalSentPosts,
      totalLikes: aggregate?.totalLikes || 0,
      totalComments: aggregate?.totalComments || 0,
      totalImpressions: aggregate?.totalImpressions || 0,
      avgEngagementRate: Number((aggregate?.avgEngagement || 0).toFixed(2)),
      weekStreak: 3, // Mock metric for dashboard
      postingGoals: '8/10',
      commentScore: '92%',
    };
  }

  static async getTopPosts(organizationId: string, limit = 5) {
    return PostInsight.find({ organizationId })
      .populate({
        path: 'postId',
        select: 'content mediaUrls channelIds publishedAt',
        populate: { path: 'channelIds', select: 'platform profile' },
      })
      .sort({ engagementRate: -1, likes: -1 })
      .limit(limit);
  }

  static async getPostInsights(
    organizationId: string,
    filter?: { channelId?: string; startDate?: string; endDate?: string }
  ) {
    const query: Record<string, unknown> = { organizationId };

    if (filter?.channelId) query.channelId = filter.channelId;
    if (filter?.startDate || filter?.endDate) {
      query.createdAt = {};
      if (filter.startDate) {
        (query.createdAt as Record<string, unknown>).$gte = new Date(filter.startDate);
      }
      if (filter.endDate) {
        (query.createdAt as Record<string, unknown>).$lte = new Date(filter.endDate);
      }
    }

    return PostInsight.find(query)
      .populate('postId', 'content mediaUrls publishedAt')
      .populate('channelId', 'platform profile')
      .sort({ createdAt: -1 });
  }
}
