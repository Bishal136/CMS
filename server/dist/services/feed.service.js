"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const Feed_model_1 = require("../models/Feed.model");
const FeedItem_model_1 = require("../models/FeedItem.model");
const AppError_1 = require("../utils/AppError");
class FeedService {
    static async listFeeds(organizationId) {
        return Feed_model_1.Feed.find({ organizationId }).sort({ createdAt: -1 });
    }
    static async createFeed(organizationId, data) {
        return Feed_model_1.Feed.create({
            name: data.name,
            url: data.url,
            organizationId,
            lastFetchedAt: new Date(),
        });
    }
    static async deleteFeed(feedId, organizationId) {
        const feed = await Feed_model_1.Feed.findOneAndDelete({ _id: feedId, organizationId });
        if (!feed)
            throw AppError_1.AppError.notFound('Feed not found');
        await FeedItem_model_1.FeedItem.deleteMany({ feedId });
        return { message: 'Feed deleted successfully' };
    }
    static async listFeedItems(organizationId, feedId, limit = 20) {
        let feedIds = [];
        if (feedId) {
            feedIds = [feedId];
        }
        else {
            const orgFeeds = await Feed_model_1.Feed.find({ organizationId }).select('_id');
            feedIds = orgFeeds.map((f) => f._id);
        }
        return FeedItem_model_1.FeedItem.find({ feedId: { $in: feedIds } })
            .sort({ publishedAt: -1 })
            .limit(limit);
    }
}
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map