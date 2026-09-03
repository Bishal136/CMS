"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedRoutes = void 0;
const express_1 = require("express");
const feed_controller_1 = require("../controllers/feed.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', feed_controller_1.FeedController.listFeeds);
router.post('/', feed_controller_1.FeedController.createFeed);
router.delete('/:id', feed_controller_1.FeedController.deleteFeed);
router.get('/items', feed_controller_1.FeedController.listFeedItems);
exports.feedRoutes = router;
//# sourceMappingURL=feed.routes.js.map