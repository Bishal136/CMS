import { Notification } from '../models/Notification.model';
import { AppError } from '../utils/AppError';

export class NotificationService {
  static async listNotifications(userId: string, limit = 20) {
    return Notification.find({ userId }).sort({ createdAt: -1 }).limit(limit);
  }

  static async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findOne({ _id: notificationId, userId });
    if (!notification) throw AppError.notFound('Notification not found');

    notification.isRead = true;
    await notification.save();
    return notification;
  }

  static async markAllAsRead(userId: string) {
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    return { message: 'All notifications marked as read' };
  }
}
