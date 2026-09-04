"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedController = void 0;
const feed_service_1 = require("../services/feed.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class FeedController {
    static listFeeds = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const feeds = await feed_service_1.FeedService.listFeeds(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, feeds);
    });
    static createFeed = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const feed = await feed_service_1.FeedService.createFeed(req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, feed, 'Feed created successfully');
    });
    static deleteFeed = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await feed_service_1.FeedService.deleteFeed(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
    static listFeedItems = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const items = await feed_service_1.FeedService.listFeedItems(req.organizationId, req.query.feedId);
        return ApiResponse_1.ApiResponse.success(res, items);
    });
    static refreshFeed = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const items = await feed_service_1.FeedService.refreshFeed(req.organizationId, (req.params.id || req.query.feedId));
        return ApiResponse_1.ApiResponse.success(res, items, 'Feed refreshed successfully');
    });
}
exports.FeedController = FeedController;
//# sourceMappingURL=feed.controller.js.map