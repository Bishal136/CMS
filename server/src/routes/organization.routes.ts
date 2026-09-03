import { Router } from 'express';
import { OrganizationController } from '../controllers/organization.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

router.use(authenticate);

router.get('/', OrganizationController.getOrg);
router.put('/', requireRole('admin'), OrganizationController.updateOrg);
router.get('/members', OrganizationController.getMembers);
router.post('/members/invite', requireRole('admin'), OrganizationController.inviteMember);

export const organizationRoutes = router;
