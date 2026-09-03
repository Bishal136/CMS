import { Router } from 'express';
import { SavedReplyController } from '../controllers/saved-reply.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', SavedReplyController.listReplies);
router.post('/', SavedReplyController.createReply);
router.put('/:id', SavedReplyController.updateReply);
router.delete('/:id', SavedReplyController.deleteReply);

export const savedReplyRoutes = router;
