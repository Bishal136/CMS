"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightService = void 0;
const PostInsight_model_1 = require("../models/PostInsight.model");
const Post_model_1 = require("../models/Post.model");
const mongoose_1 = require("mongoose");
class InsightService {
    static async getSummary(organizationId) {
        const orgObjectId = new mongoose_1.Types.ObjectId(organizationId);
        const [aggregate] = await PostInsight_model_1.PostInsight.aggregate([
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
        const totalSentPosts = await Post_model_1.Post.countDocuments({
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
    static async getTopPosts(organizationId, limit = 5) {
        return PostInsight_model_1.PostInsight.find({ organizationId })
            .populate({
            path: 'postId',
            select: 'content mediaUrls channelIds publishedAt',
            populate: { path: 'channelIds', select: 'platform profile' },
        })
            .sort({ engagementRate: -1, likes: -1 })
            .limit(limit);
    }
    static async getPostInsights(organizationId, filter) {
        const query = { organizationId };
        if (filter?.channelId)
            query.channelId = filter.channelId;
        if (filter?.startDate || filter?.endDate) {
            query.createdAt = {};
            if (filter.startDate) {
                query.createdAt.$gte = new Date(filter.startDate);
            }
            if (filter.endDate) {
                query.createdAt.$lte = new Date(filter.endDate);
            }
        }
        return PostInsight_model_1.PostInsight.find(query)
            .populate('postId', 'content mediaUrls publishedAt')
            .populate('channelId', 'platform profile')
            .sort({ createdAt: -1 });
    }
}
exports.InsightService = InsightService;
//# sourceMappingURL=insight.service.js.map