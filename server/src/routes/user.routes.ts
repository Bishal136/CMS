import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateProfileSchema } from '../validators/user.validator';
import { updatePasswordSchema } from '../validators/auth.validator';

const router = Router();

router.use(authenticate);

router.get('/profile', UserController.getProfile);
router.put('/profile', validate(updateProfileSchema), UserController.updateProfile);
router.put('/password', validate(updatePasswordSchema), UserController.updatePassword);
router.post('/resend-verification', UserController.resendVerification);

export const userRoutes = router;
