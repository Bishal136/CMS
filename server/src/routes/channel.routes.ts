import { Router } from 'express';
import { ChannelController } from '../controllers/channel.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { connectChannelSchema, updateChannelSettingsSchema } from '../validators/channel.validator';

const router = Router();

router.use(authenticate);

router.get('/', ChannelController.listChannels);
router.get('/:id', ChannelController.getChannel);
router.post('/', requireRole('admin'), validate(connectChannelSchema), ChannelController.connectChannel);
router.delete('/:id', requireRole('admin'), ChannelController.disconnectChannel);
router.put('/:id/schedule', requireRole('admin'), validate(updateChannelSettingsSchema), ChannelController.updateSchedule);

export const channelRoutes = router;
