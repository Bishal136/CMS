"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const Notification_model_1 = require("../models/Notification.model");
const AppError_1 = require("../utils/AppError");
class NotificationService {
    static async listNotifications(userId, limit = 20) {
        return Notification_model_1.Notification.find({ userId }).sort({ createdAt: -1 }).limit(limit);
    }
    static async markAsRead(notificationId, userId) {
        const notification = await Notification_model_1.Notification.findOne({ _id: notificationId, userId });
        if (!notification)
            throw AppError_1.AppError.notFound('Notification not found');
        notification.isRead = true;
        await notification.save();
        return notification;
    }
    static async markAllAsRead(userId) {
        await Notification_model_1.Notification.updateMany({ userId, isRead: false }, { isRead: true });
        return { message: 'All notifications marked as read' };
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map