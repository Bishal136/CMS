"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const post_validator_1 = require("../validators/post.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', post_controller_1.PostController.listPosts);
router.get('/:id', post_controller_1.PostController.getPost);
router.post('/', (0, validate_middleware_1.validate)(post_validator_1.createPostSchema), post_controller_1.PostController.createPost);
router.put('/:id', (0, validate_middleware_1.validate)(post_validator_1.updatePostSchema), post_controller_1.PostController.updatePost);
router.delete('/:id', post_controller_1.PostController.deletePost);
// Actions
router.post('/:id/publish', post_controller_1.PostController.publishNow);
router.post('/:id/submit-approval', post_controller_1.PostController.submitApproval);
router.post('/:id/review-approval', (0, role_middleware_1.requireRole)('admin', 'publisher'), (0, validate_middleware_1.validate)(post_validator_1.approvalActionSchema), post_controller_1.PostController.reviewApproval);
exports.postRoutes = router;
//# sourceMappingURL=post.routes.js.map