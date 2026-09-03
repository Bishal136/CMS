"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = require("../services/post.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
const pagination_1 = require("../utils/pagination");
class PostController {
    static createPost = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const post = await post_service_1.PostService.createPost(req.user._id.toString(), req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, post, 'Post created successfully');
    });
    static listPosts = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const pagination = (0, pagination_1.getPaginationOptions)(req.query.page, req.query.limit);
        const filter = {
            status: req.query.status,
            channelId: req.query.channelId,
            tagId: req.query.tagId,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
        };
        const { posts, total } = await post_service_1.PostService.listPosts(req.organizationId, filter, pagination);
        return ApiResponse_1.ApiResponse.paginated(res, posts, pagination.page, pagination.limit, total, 'Posts retrieved successfully');
    });
    static getPost = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const post = await post_service_1.PostService.getPost(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, post);
    });
    static updatePost = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const post = await post_service_1.PostService.updatePost(req.params.id, req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.success(res, post, 'Post updated successfully');
    });
    static deletePost = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await post_service_1.PostService.deletePost(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
    static publishNow = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const post = await post_service_1.PostService.publishNow(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, post, 'Post published successfully');
    });
    static submitApproval = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const post = await post_service_1.PostService.submitForApproval(req.params.id, req.organizationId, { id: req.user._id.toString(), name: req.user.name });
        return ApiResponse_1.ApiResponse.success(res, post, 'Post submitted for approval');
    });
    static reviewApproval = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { action, note, rejectionReason } = req.body;
        const post = await post_service_1.PostService.reviewApproval(req.params.id, req.organizationId, { id: req.user._id.toString(), name: req.user.name }, action, note, rejectionReason);
        return ApiResponse_1.ApiResponse.success(res, post, `Post ${action}d successfully`);
    });
}
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map