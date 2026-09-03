"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', notification_controller_1.NotificationController.listNotifications);
router.put('/read-all', notification_controller_1.NotificationController.markAllAsRead);
router.put('/:id/read', notification_controller_1.NotificationController.markAsRead);
exports.notificationRoutes = router;
//# sourceMappingURL=notification.routes.js.map