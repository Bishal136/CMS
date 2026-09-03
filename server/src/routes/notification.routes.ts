import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', NotificationController.listNotifications);
router.put('/read-all', NotificationController.markAllAsRead);
router.put('/:id/read', NotificationController.markAsRead);

export const notificationRoutes = router;
