"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const home_service_1 = require("../services/home.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class HomeController {
    static getHomeDashboard = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const data = await home_service_1.HomeService.getHomeDashboard(req.user._id.toString(), req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, data, 'Home dashboard data retrieved successfully');
    });
    static getHomeStats = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const data = await home_service_1.HomeService.getHomeDashboard(req.user._id.toString(), req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, data.stats, 'Home stats retrieved successfully');
    });
}
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map