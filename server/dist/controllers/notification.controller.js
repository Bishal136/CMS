"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class NotificationController {
    static listNotifications = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 20;
        const notifications = await notification_service_1.NotificationService.listNotifications(req.user._id.toString(), limit);
        return ApiResponse_1.ApiResponse.success(res, notifications);
    });
    static markAsRead = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const notification = await notification_service_1.NotificationService.markAsRead(req.params.id, req.user._id.toString());
        return ApiResponse_1.ApiResponse.success(res, notification, 'Notification marked as read');
    });
    static markAllAsRead = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await notification_service_1.NotificationService.markAllAsRead(req.user._id.toString());
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map