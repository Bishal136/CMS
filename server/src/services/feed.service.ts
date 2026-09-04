import { Feed } from '../models/Feed.model';
import { FeedItem } from '../models/FeedItem.model';
import { AppError } from '../utils/AppError';

const SEEDED_BBC_ARTICLES = [
  {
    title: 'Watch: Drop in small boats crossings forces smugglers to adapt',
    description:
      'A BBC investigation has found smuggling gangs are running low on small boats, forcing rival gangs to work together and load more migrants on larger boats.',
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    sourceUrl: 'https://www.bbc.com/news',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    title: 'Ranking the most game-changing transfers in Premier League history',
    description:
      'Some transfers take time to bed in, others prove instant game-changers - here are the top 10 signings of the Premier League era that moved the needle.',
    imageUrl:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    sourceUrl: 'https://www.bbc.com/sport/football',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    title: "UN warns of 'supersized' El Niño as countries prepare for impact",
    description:
      'The WMO has warned that the natural weather phenomenon could bring disruption to global economies.',
    imageUrl:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
    sourceUrl: 'https://www.bbc.com/news',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

export class FeedService {
  private static async ensureSeeded(organizationId: string) {
    const count = await Feed.countDocuments({ organizationId });
    if (count === 0) {
      try {
        const feed = await Feed.create({
          name: 'BBC News',
          url: 'https://feeds.bbci.co.uk/news/rss.xml',
          organizationId,
          lastFetchedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        });

        await FeedItem.insertMany(
          SEEDED_BBC_ARTICLES.map((art) => ({
            ...art,
            feedId: feed._id,
          }))
        );
      } catch {
        // Ignore duplicate seeding error
      }
    }
  }

  static async listFeeds(organizationId: string) {
    await this.ensureSeeded(organizationId);
    return Feed.find({ organizationId }).sort({ createdAt: 1 });
  }

  static async createFeed(
    organizationId: string,
    data: { name: string; url: string }
  ) {
    const feed = await Feed.create({
      name: data.name,
      url: data.url,
      organizationId,
      lastFetchedAt: new Date(),
    });

    // Seed a couple mock/incoming items for the new feed so it's not empty
    try {
      await FeedItem.create({
        feedId: feed._id,
        title: `Latest update from ${data.name}`,
        description: `Freshly curated article from ${data.url} ready for scheduling.`,
        imageUrl:
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
        sourceUrl: data.url,
        publishedAt: new Date(),
      });
    } catch {
      // Ignore
    }

    return feed;
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
    await this.ensureSeeded(organizationId);

    let feedIds: unknown[] = [];
    if (feedId) {
      feedIds = [feedId];
    } else {
      const orgFeeds = await Feed.find({ organizationId }).select('_id');
      feedIds = orgFeeds.map((f) => f._id);
    }

    return FeedItem.find({ feedId: { $in: feedIds } })
      .populate('feedId', 'name url')
      .sort({ publishedAt: -1 })
      .limit(limit);
  }

  static async refreshFeed(organizationId: string, feedId?: string) {
    await this.ensureSeeded(organizationId);

    const filter: Record<string, unknown> = { organizationId };
    if (feedId) {
      filter._id = feedId;
    }

    await Feed.updateMany(filter, { $set: { lastFetchedAt: new Date() } });

    return this.listFeedItems(organizationId, feedId);
  }
}
