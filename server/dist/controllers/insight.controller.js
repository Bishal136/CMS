"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightController = void 0;
const insight_service_1 = require("../services/insight.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class InsightController {
    static getSummary = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const summary = await insight_service_1.InsightService.getSummary(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, summary);
    });
    static getTopPosts = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 5;
        const topPosts = await insight_service_1.InsightService.getTopPosts(req.organizationId, limit);
        return ApiResponse_1.ApiResponse.success(res, topPosts);
    });
    static getPostInsights = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const filter = {
            channelId: req.query.channelId,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
        };
        const insights = await insight_service_1.InsightService.getPostInsights(req.organizationId, filter);
        return ApiResponse_1.ApiResponse.success(res, insights);
    });
}
exports.InsightController = InsightController;
//# sourceMappingURL=insight.controller.js.map