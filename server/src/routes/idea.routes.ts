import { Router } from 'express';
import { IdeaController } from '../controllers/idea.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createIdeaSchema, updateIdeaSchema } from '../validators/idea.validator';

const router = Router();

router.use(authenticate);

router.get('/', IdeaController.listIdeas);
router.post('/', validate(createIdeaSchema), IdeaController.createIdea);
router.post('/groups', IdeaController.createGroup);
router.put('/:id', validate(updateIdeaSchema), IdeaController.updateIdea);
router.delete('/:id', IdeaController.deleteIdea);

export const ideaRoutes = router;
