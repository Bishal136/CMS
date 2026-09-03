"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insightRoutes = void 0;
const express_1 = require("express");
const insight_controller_1 = require("../controllers/insight.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/summary', insight_controller_1.InsightController.getSummary);
router.get('/top-posts', insight_controller_1.InsightController.getTopPosts);
router.get('/posts', insight_controller_1.InsightController.getPostInsights);
exports.insightRoutes = router;
//# sourceMappingURL=insight.routes.js.map