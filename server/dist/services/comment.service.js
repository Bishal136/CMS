"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const Comment_model_1 = require("../models/Comment.model");
const AppError_1 = require("../utils/AppError");
class CommentService {
    static async listComments(organizationId, filter, pagination) {
        const query = { organizationId };
        if (filter.channelId)
            query.channelId = filter.channelId;
        if (filter.postId)
            query.postId = filter.postId;
        if (filter.isRead !== undefined)
            query.isRead = filter.isRead;
        const [comments, total] = await Promise.all([
            Comment_model_1.Comment.find(query)
                .populate('channelId', 'platform profile')
                .populate('postId', 'content mediaUrls')
                .sort({ createdAt: -1 })
                .skip(pagination.skip)
                .limit(pagination.limit),
            Comment_model_1.Comment.countDocuments(query),
        ]);
        return { comments, total };
    }
    static async replyToComment(commentId, organizationId, repliedContent) {
        const comment = await Comment_model_1.Comment.findOne({ _id: commentId, organizationId });
        if (!comment)
            throw AppError_1.AppError.notFound('Comment not found');
        comment.repliedContent = repliedContent;
        comment.repliedAt = new Date();
        comment.isRead = true;
        await comment.save();
        return comment;
    }
    static async markAsRead(commentId, organizationId) {
        const comment = await Comment_model_1.Comment.findOne({ _id: commentId, organizationId });
        if (!comment)
            throw AppError_1.AppError.notFound('Comment not found');
        comment.isRead = true;
        await comment.save();
        return comment;
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map