import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { requireRole } from '../middleware/role.middleware';
import {
  createPostSchema,
  updatePostSchema,
  approvalActionSchema,
} from '../validators/post.validator';

const router = Router();

router.use(authenticate);

router.get('/', PostController.listPosts);
router.get('/counts', PostController.getPostCounts);
router.get('/:id', PostController.getPost);
router.post('/', validate(createPostSchema), PostController.createPost);
router.put('/:id', validate(updatePostSchema), PostController.updatePost);
router.delete('/:id', PostController.deletePost);

// Actions
router.post('/:id/publish', PostController.publishNow);
router.post('/:id/submit-approval', PostController.submitApproval);
router.post(
  '/:id/review-approval',
  requireRole('admin'),
  validate(approvalActionSchema),
  PostController.reviewApproval
);

export const postRoutes = router;
