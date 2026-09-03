"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentionRoutes = void 0;
const express_1 = require("express");
const mention_controller_1 = require("../controllers/mention.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', mention_controller_1.MentionController.listMentions);
router.put('/:id/read', mention_controller_1.MentionController.markAsRead);
exports.mentionRoutes = router;
//# sourceMappingURL=mention.routes.js.map