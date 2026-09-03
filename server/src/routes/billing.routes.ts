import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

router.get('/plans', BillingController.getPlans);

router.use(authenticate);

router.get('/current', BillingController.getCurrentSubscription);
router.post('/change-plan', requireRole('admin'), BillingController.changePlan);

export const billingRoutes = router;
