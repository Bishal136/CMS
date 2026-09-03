import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class NotificationController {
  static listNotifications = catchAsync(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 20;
    const notifications = await NotificationService.listNotifications(
      req.user!._id.toString(),
      limit
    );
    return ApiResponse.success(res, notifications);
  });

  static markAsRead = catchAsync(async (req: Request, res: Response) => {
    const notification = await NotificationService.markAsRead(
      req.params.id,
      req.user!._id.toString()
    );
    return ApiResponse.success(res, notification, 'Notification marked as read');
  });

  static markAllAsRead = catchAsync(async (req: Request, res: Response) => {
    const result = await NotificationService.markAllAsRead(req.user!._id.toString());
    return ApiResponse.success(res, result, result.message);
  });
}
