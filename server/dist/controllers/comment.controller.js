"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_service_1 = require("../services/comment.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
const pagination_1 = require("../utils/pagination");
class CommentController {
    static listComments = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const pagination = (0, pagination_1.getPaginationOptions)(req.query.page, req.query.limit);
        const filter = {
            channelId: req.query.channelId,
            postId: req.query.postId,
            isRead: req.query.isRead ? req.query.isRead === 'true' : undefined,
        };
        const { comments, total } = await comment_service_1.CommentService.listComments(req.organizationId, filter, pagination);
        return ApiResponse_1.ApiResponse.paginated(res, comments, pagination.page, pagination.limit, total, 'Comments retrieved successfully');
    });
    static replyToComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const comment = await comment_service_1.CommentService.replyToComment(req.params.id, req.organizationId, req.body.content);
        return ApiResponse_1.ApiResponse.success(res, comment, 'Replied to comment successfully');
    });
    static markAsRead = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const comment = await comment_service_1.CommentService.markAsRead(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, comment, 'Comment marked as read');
    });
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map