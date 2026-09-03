import { Router } from 'express';
import { TemplateController } from '../controllers/template.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTemplateSchema, updateTemplateSchema } from '../validators/template.validator';

const router = Router();

router.use(authenticate);

router.get('/', TemplateController.listTemplates);
router.get('/discover', TemplateController.listDiscover);
router.post('/', validate(createTemplateSchema), TemplateController.createTemplate);
router.put('/:id', validate(updateTemplateSchema), TemplateController.updateTemplate);
router.delete('/:id', TemplateController.deleteTemplate);

export const templateRoutes = router;
