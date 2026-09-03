import { Feed } from '../models/Feed.model';
import { FeedItem } from '../models/FeedItem.model';
import { AppError } from '../utils/AppError';

export class FeedService {
  static async listFeeds(organizationId: string) {
    return Feed.find({ organizationId }).sort({ createdAt: -1 });
  }

  static async createFeed(
    organizationId: string,
    data: { name: string; url: string }
  ) {
    return Feed.create({
      name: data.name,
      url: data.url,
      organizationId,
      lastFetchedAt: new Date(),
    });
  }

  static async deleteFeed(feedId: string, organizationId: string) {
    const feed = await Feed.findOneAndDelete({ _id: feedId, organizationId });
    if (!feed) throw AppError.notFound('Feed not found');
    await FeedItem.deleteMany({ feedId });
    return { message: 'Feed deleted successfully' };
  }

  static async listFeedItems(
    organizationId: string,
    feedId?: string,
    limit = 20
  ) {
    let feedIds: unknown[] = [];
    if (feedId) {
      feedIds = [feedId];
    } else {
      const orgFeeds = await Feed.find({ organizationId }).select('_id');
      feedIds = orgFeeds.map((f) => f._id);
    }

    return FeedItem.find({ feedId: { $in: feedIds } })
      .sort({ publishedAt: -1 })
      .limit(limit);
  }
}
