"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagRoutes = void 0;
const express_1 = require("express");
const tag_controller_1 = require("../controllers/tag.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', tag_controller_1.TagController.listTags);
router.post('/', tag_controller_1.TagController.createTag);
router.put('/:id', tag_controller_1.TagController.updateTag);
router.delete('/:id', tag_controller_1.TagController.deleteTag);
exports.tagRoutes = router;
//# sourceMappingURL=tag.routes.js.map