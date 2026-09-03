import { Router } from 'express';
import { InsightController } from '../controllers/insight.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/summary', InsightController.getSummary);
router.get('/top-posts', InsightController.getTopPosts);
router.get('/posts', InsightController.getPostInsights);

export const insightRoutes = router;
