"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', comment_controller_1.CommentController.listComments);
router.post('/:id/reply', comment_controller_1.CommentController.replyToComment);
router.put('/:id/read', comment_controller_1.CommentController.markAsRead);
exports.commentRoutes = router;
//# sourceMappingURL=comment.routes.js.map