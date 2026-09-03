"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedReplyRoutes = void 0;
const express_1 = require("express");
const saved_reply_controller_1 = require("../controllers/saved-reply.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', saved_reply_controller_1.SavedReplyController.listReplies);
router.post('/', saved_reply_controller_1.SavedReplyController.createReply);
router.put('/:id', saved_reply_controller_1.SavedReplyController.updateReply);
router.delete('/:id', saved_reply_controller_1.SavedReplyController.deleteReply);
exports.savedReplyRoutes = router;
//# sourceMappingURL=saved-reply.routes.js.map