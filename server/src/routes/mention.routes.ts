import { Router } from 'express';
import { MentionController } from '../controllers/mention.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', MentionController.listMentions);
router.put('/:id/read', MentionController.markAsRead);

export const mentionRoutes = router;
