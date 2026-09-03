import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../config/upload';

const router = Router();

router.use(authenticate);

router.post('/avatar', upload.single('avatar'), UploadController.uploadFile);
router.post('/media', upload.single('media'), UploadController.uploadFile);
router.post('/template-cover', upload.single('templateCover'), UploadController.uploadFile);

export const uploadRoutes = router;
