import { Router } from 'express';
import { FeedController } from '../controllers/feed.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', FeedController.listFeeds);
router.post('/', FeedController.createFeed);
router.delete('/:id', FeedController.deleteFeed);
router.get('/items', FeedController.listFeedItems);
router.post('/refresh', FeedController.refreshFeed);
router.post('/:id/refresh', FeedController.refreshFeed);

export const feedRoutes = router;
