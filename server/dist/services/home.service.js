"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
const Channel_model_1 = require("../models/Channel.model");
const Post_model_1 = require("../models/Post.model");
const Comment_model_1 = require("../models/Comment.model");
const Template_model_1 = require("../models/Template.model");
const Organization_model_1 = require("../models/Organization.model");
const User_model_1 = require("../models/User.model");
const DEFAULT_TEMPLATES = [
    {
        id: 'tpl-habit',
        title: 'Share a habit that helps you do better work',
        description: 'Describe a routine or system that helps you show up better.',
        content: 'One habit that completely transformed my workflow is:\n\n1. \n2. \n3. \n\nWhat is one routine that helps you do your best work?',
        category: 'Productivity',
        emoji: '✳️',
    },
    {
        id: 'tpl-journey',
        title: "I didn't think I could do it — and then I did",
        description: 'Tell the story of trying something you thought was out of reach. What made you take the leap, and what surprised yo...',
        content: "I didn't think I could do it — and then I did.\n\nHere is what I learned when taking a leap outside my comfort zone:\n\n- The biggest hurdle was...\n- What actually happened:\n- Key takeaway:",
        category: 'Storytelling',
        emoji: '🚀',
    },
    {
        id: 'tpl-shift',
        title: 'The quiet shift that changed everything',
        description: 'Share a subtle moment or realization that ended up changing your path in a big way.',
        content: 'The quiet shift that changed everything:\n\nIt wasn’t a massive turning point. It was a simple shift in mindset: ...\n\nHas a small shift ever changed your trajectory?',
        category: 'Insights',
        emoji: '🎯',
    },
    {
        id: 'tpl-question',
        title: 'The one question that changed my strategy',
        description: 'Sometimes all it takes is one question to shift everything. Share the moment, the question, and how it reshaped your...',
        content: 'The one question that changed my strategy:\n\n"What would this look like if it were easy?"\n\nHere is how answering that question reshaped our approach:',
        category: 'Strategy',
        emoji: '❓',
    },
];
class HomeService {
    static async getHomeDashboard(userId, organizationId) {
        const [userDoc, orgDoc, channelsCount, totalPostsCount, scheduledPosts, recentCommentsDoc, customTemplates] = await Promise.all([
            User_model_1.User.findById(userId).select('name email avatar role').lean(),
            Organization_model_1.Organization.findById(organizationId).select('name plan').lean(),
            Channel_model_1.Channel.countDocuments({ organizationId, isConnected: true }),
            Post_model_1.Post.countDocuments({ organizationId }),
            Post_model_1.Post.find({
                organizationId,
                status: { $in: ['queued', 'approved'] },
                scheduledAt: { $gte: new Date() },
            })
                .sort({ scheduledAt: 1 })
                .limit(5)
                .populate('channelIds', 'platform profile')
                .lean(),
            Comment_model_1.Comment.find({ organizationId })
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(),
            Template_model_1.Template.find({
                $or: [{ organizationId }, { isDiscoverable: true }],
            })
                .limit(4)
                .lean(),
        ]);
        const user = {
            id: userId,
            name: userDoc?.name || 'bishalbiswas2027',
            email: userDoc?.email || '',
            avatar: userDoc?.avatar,
            role: userDoc?.role || 'user',
        };
        const organization = {
            id: organizationId,
            name: orgDoc?.name || 'My organization',
            plan: (orgDoc?.plan ? orgDoc.plan.charAt(0).toUpperCase() + orgDoc.plan.slice(1) : 'Free') + ' Plan',
        };
        // Calculate streak & stats
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const postsLastWeek = await Post_model_1.Post.countDocuments({
            organizationId,
            status: 'sent',
            publishedAt: { $gte: oneWeekAgo },
        });
        const weekStreak = channelsCount > 0 && postsLastWeek > 0 ? Math.max(1, postsLastWeek) : 0;
        const scheduledCount = scheduledPosts.length;
        const postingGoals = scheduledCount;
        const totalComments = await Comment_model_1.Comment.countDocuments({ organizationId });
        const repliedComments = await Comment_model_1.Comment.countDocuments({ organizationId, repliedContent: { $exists: true, $ne: '' } });
        const commentScore = totalComments > 0 ? Math.round((repliedComments / totalComments) * 100) : 0;
        const firstSteps = {
            hasConnectedChannel: channelsCount > 0,
            hasCreatedPost: totalPostsCount > 0,
            hasExploredApi: false,
        };
        const upcomingPosts = scheduledPosts.map((p) => ({
            id: p._id.toString(),
            content: p.content,
            mediaUrls: p.mediaUrls,
            scheduledAt: p.scheduledAt,
            status: p.status,
            channels: (p.channelIds || []).map((ch) => ({
                id: ch._id ? ch._id.toString() : '',
                platform: ch.platform,
                name: ch.profile?.name || ch.platform,
            })),
        }));
        const recentComments = recentCommentsDoc.map((c) => ({
            id: c._id.toString(),
            authorName: c.authorName,
            authorAvatar: c.authorAvatar,
            content: c.content,
            platform: c.platform,
            createdAt: c.createdAt,
            isRead: !!c.isRead,
        }));
        const templates = customTemplates && customTemplates.length >= 4
            ? customTemplates.map((t) => ({
                id: t._id.toString(),
                title: t.title,
                description: t.content.slice(0, 100) + '...',
                content: t.content,
                category: t.category,
                emoji: t.emoji || '📝',
            }))
            : DEFAULT_TEMPLATES;
        return {
            user,
            organization,
            stats: {
                weekStreak,
                postingGoals,
                commentScore,
                connectedChannelsCount: channelsCount,
            },
            firstSteps,
            upcomingPosts,
            recentComments,
            templates,
        };
    }
}
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map