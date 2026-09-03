"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const mongoose_1 = require("mongoose");
const Post_model_1 = require("../models/Post.model");
const Channel_model_1 = require("../models/Channel.model");
const Organization_model_1 = require("../models/Organization.model");
const Notification_model_1 = require("../models/Notification.model");
const AppError_1 = require("../utils/AppError");
const socket_1 = require("../config/socket");
class PostService {
    static async createPost(userId, organizationId, data) {
        const org = await Organization_model_1.Organization.findById(organizationId);
        if (!org)
            throw AppError_1.AppError.notFound('Organization not found');
        // Check post limit for free plan
        if (org.plan === 'free') {
            const scheduledCount = await Post_model_1.Post.countDocuments({
                organizationId,
                status: 'queued',
            });
            if (scheduledCount >= 10) {
                throw AppError_1.AppError.badRequest('Scheduled posts limit of 10 reached for Free plan. Please upgrade to Essentials or Team.');
            }
        }
        // Verify channels belong to this organization
        const validChannels = await Channel_model_1.Channel.find({
            _id: { $in: data.channelIds },
            organizationId,
            isConnected: true,
        });
        if (validChannels.length === 0) {
            throw AppError_1.AppError.badRequest('At least one valid connected channel is required');
        }
        const post = await Post_model_1.Post.create({
            content: data.content,
            mediaUrls: data.mediaUrls || [],
            scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
            channelIds: validChannels.map((c) => c._id),
            tagIds: data.tagIds || [],
            status: data.status || (data.scheduledAt ? 'queued' : 'draft'),
            firstComment: data.firstComment,
            createdBy: userId,
            organizationId,
        });
        (0, socket_1.emitToOrganization)(organizationId, 'post:created', { postId: post._id, status: post.status });
        return post;
    }
    static async listPosts(organizationId, filter, pagination) {
        const query = { organizationId };
        if (filter.status) {
            query.status = filter.status;
        }
        if (filter.channelId) {
            query.channelIds = filter.channelId;
        }
        if (filter.tagId) {
            query.tagIds = filter.tagId;
        }
        if (filter.startDate || filter.endDate) {
            query.scheduledAt = {};
            if (filter.startDate) {
                query.scheduledAt.$gte = new Date(filter.startDate);
            }
            if (filter.endDate) {
                query.scheduledAt.$lte = new Date(filter.endDate);
            }
        }
        const [posts, total] = await Promise.all([
            Post_model_1.Post.find(query)
                .populate('channelIds', 'platform profile')
                .populate('tagIds', 'name color')
                .populate('createdBy', 'name avatar')
                .sort({ scheduledAt: 1, createdAt: -1 })
                .skip(pagination.skip)
                .limit(pagination.limit),
            Post_model_1.Post.countDocuments(query),
        ]);
        return { posts, total };
    }
    static async getPost(postId, organizationId) {
        const post = await Post_model_1.Post.findOne({ _id: postId, organizationId })
            .populate('channelIds', 'platform profile')
            .populate('tagIds', 'name color')
            .populate('createdBy', 'name avatar');
        if (!post)
            throw AppError_1.AppError.notFound('Post not found');
        return post;
    }
    static async updatePost(postId, organizationId, data) {
        const post = await Post_model_1.Post.findOne({ _id: postId, organizationId });
        if (!post)
            throw AppError_1.AppError.notFound('Post not found');
        if (data.content !== undefined)
            post.content = data.content;
        if (data.mediaUrls !== undefined)
            post.mediaUrls = data.mediaUrls;
        if (data.scheduledAt !== undefined) {
            post.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : undefined;
        }
        if (data.channelIds !== undefined) {
            post.channelIds = data.channelIds;
        }
        if (data.tagIds !== undefined) {
            post.tagIds = data.tagIds;
        }
        if (data.status !== undefined)
            post.status = data.status;
        if (data.firstComment !== undefined)
            post.firstComment = data.firstComment;
        await post.save();
        (0, socket_1.emitToOrganization)(organizationId, 'post:updated', { postId: post._id, status: post.status });
        return post;
    }
    static async deletePost(postId, organizationId) {
        const post = await Post_model_1.Post.findOneAndDelete({ _id: postId, organizationId });
        if (!post)
            throw AppError_1.AppError.notFound('Post not found');
        (0, socket_1.emitToOrganization)(organizationId, 'post:deleted', { postId });
        return { message: 'Post deleted successfully' };
    }
    static async publishNow(postId, organizationId) {
        const post = await Post_model_1.Post.findOne({ _id: postId, organizationId });
        if (!post)
            throw AppError_1.AppError.notFound('Post not found');
        // In a live setting, here we call platform adapters (YouTube, Twitter, FB, etc.)
        post.status = 'sent';
        post.publishedAt = new Date();
        await post.save();
        (0, socket_1.emitToOrganization)(organizationId, 'post:published', { postId: post._id });
        return post;
    }
    static async submitForApproval(postId, organizationId, user) {
        const post = await Post_model_1.Post.findOne({ _id: postId, organizationId });
        if (!post)
            throw AppError_1.AppError.notFound('Post not found');
        post.status = 'pending-approval';
        post.approvalNotes.push({
            authorId: new mongoose_1.Types.ObjectId(user.id),
            authorName: user.name,
            text: 'Submitted post for approval',
            createdAt: new Date(),
        });
        await post.save();
        // Create notification for admins
        await Notification_model_1.Notification.create({
            type: 'approval-request',
            title: 'New Post Awaiting Approval',
            message: `${user.name} submitted a post for approval.`,
            userId: post.createdBy,
            metadata: { postId: post._id },
        });
        (0, socket_1.emitToOrganization)(organizationId, 'post:approval-requested', { postId: post._id });
        return post;
    }
    static async reviewApproval(postId, organizationId, user, action, note, rejectionReason) {
        const post = await Post_model_1.Post.findOne({ _id: postId, organizationId });
        if (!post)
            throw AppError_1.AppError.notFound('Post not found');
        if (action === 'approve') {
            post.status = post.scheduledAt ? 'queued' : 'approved';
        }
        else {
            post.status = 'rejected';
            post.rejectionReason = rejectionReason || note || 'Rejected by reviewer';
        }
        if (note) {
            post.approvalNotes.push({
                authorId: new mongoose_1.Types.ObjectId(user.id),
                authorName: user.name,
                text: note,
                createdAt: new Date(),
            });
        }
        await post.save();
        (0, socket_1.emitToOrganization)(organizationId, 'post:approval-reviewed', { postId: post._id, action });
        return post;
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map