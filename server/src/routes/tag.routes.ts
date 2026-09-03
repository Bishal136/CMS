import { Router } from 'express';
import { TagController } from '../controllers/tag.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', TagController.listTags);
router.post('/', TagController.createTag);
router.put('/:id', TagController.updateTag);
router.delete('/:id', TagController.deleteTag);

export const tagRoutes = router;
