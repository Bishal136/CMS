import { Router } from 'express';
import { ChannelGroupController } from '../controllers/channel-group.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

router.use(authenticate);

router.get('/', ChannelGroupController.listGroups);
router.post('/', requireRole('admin'), ChannelGroupController.createGroup);
router.put('/:id', requireRole('admin'), ChannelGroupController.updateGroup);
router.delete('/:id', requireRole('admin'), ChannelGroupController.deleteGroup);

export const channelGroupRoutes = router;
