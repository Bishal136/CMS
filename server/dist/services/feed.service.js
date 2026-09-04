"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const Feed_model_1 = require("../models/Feed.model");
const FeedItem_model_1 = require("../models/FeedItem.model");
const AppError_1 = require("../utils/AppError");
const SEEDED_BBC_ARTICLES = [
    {
        title: 'Watch: Drop in small boats crossings forces smugglers to adapt',
        description: 'A BBC investigation has found smuggling gangs are running low on small boats, forcing rival gangs to work together and load more migrants on larger boats.',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        sourceUrl: 'https://www.bbc.com/news',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    },
    {
        title: 'Ranking the most game-changing transfers in Premier League history',
        description: 'Some transfers take time to bed in, others prove instant game-changers - here are the top 10 signings of the Premier League era that moved the needle.',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
        sourceUrl: 'https://www.bbc.com/sport/football',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
        title: "UN warns of 'supersized' El Niño as countries prepare for impact",
        description: 'The WMO has warned that the natural weather phenomenon could bring disruption to global economies.',
        imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
        sourceUrl: 'https://www.bbc.com/news',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
];
class FeedService {
    static async ensureSeeded(organizationId) {
        const count = await Feed_model_1.Feed.countDocuments({ organizationId });
        if (count === 0) {
            try {
                const feed = await Feed_model_1.Feed.create({
                    name: 'BBC News',
                    url: 'https://feeds.bbci.co.uk/news/rss.xml',
                    organizationId,
                    lastFetchedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                });
                await FeedItem_model_1.FeedItem.insertMany(SEEDED_BBC_ARTICLES.map((art) => ({
                    ...art,
                    feedId: feed._id,
                })));
            }
            catch {
                // Ignore duplicate seeding error
            }
        }
    }
    static async listFeeds(organizationId) {
        await this.ensureSeeded(organizationId);
        return Feed_model_1.Feed.find({ organizationId }).sort({ createdAt: 1 });
    }
    static async createFeed(organizationId, data) {
        const feed = await Feed_model_1.Feed.create({
            name: data.name,
            url: data.url,
            organizationId,
            lastFetchedAt: new Date(),
        });
        // Seed a couple mock/incoming items for the new feed so it's not empty
        try {
            await FeedItem_model_1.FeedItem.create({
                feedId: feed._id,
                title: `Latest update from ${data.name}`,
                description: `Freshly curated article from ${data.url} ready for scheduling.`,
                imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
                sourceUrl: data.url,
                publishedAt: new Date(),
            });
        }
        catch {
            // Ignore
        }
        return feed;
    }
    static async deleteFeed(feedId, organizationId) {
        const feed = await Feed_model_1.Feed.findOneAndDelete({ _id: feedId, organizationId });
        if (!feed)
            throw AppError_1.AppError.notFound('Feed not found');
        await FeedItem_model_1.FeedItem.deleteMany({ feedId });
        return { message: 'Feed deleted successfully' };
    }
    static async listFeedItems(organizationId, feedId, limit = 20) {
        await this.ensureSeeded(organizationId);
        let feedIds = [];
        if (feedId) {
            feedIds = [feedId];
        }
        else {
            const orgFeeds = await Feed_model_1.Feed.find({ organizationId }).select('_id');
            feedIds = orgFeeds.map((f) => f._id);
        }
        return FeedItem_model_1.FeedItem.find({ feedId: { $in: feedIds } })
            .populate('feedId', 'name url')
            .sort({ publishedAt: -1 })
            .limit(limit);
    }
    static async refreshFeed(organizationId, feedId) {
        await this.ensureSeeded(organizationId);
        const filter = { organizationId };
        if (feedId) {
            filter._id = feedId;
        }
        await Feed_model_1.Feed.updateMany(filter, { $set: { lastFetchedAt: new Date() } });
        return this.listFeedItems(organizationId, feedId);
    }
}
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map