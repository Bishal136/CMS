import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { organizationRoutes } from './organization.routes';
import { channelRoutes } from './channel.routes';
import { channelGroupRoutes } from './channel-group.routes';
import { postRoutes } from './post.routes';
import { ideaRoutes } from './idea.routes';
import { templateRoutes } from './template.routes';
import { feedRoutes } from './feed.routes';
import { commentRoutes } from './comment.routes';
import { mentionRoutes } from './mention.routes';
import { insightRoutes } from './insight.routes';
import { tagRoutes } from './tag.routes';
import { savedReplyRoutes } from './saved-reply.routes';
import { notificationRoutes } from './notification.routes';
import { billingRoutes } from './billing.routes';
import { uploadRoutes } from './upload.routes';
import { homeRoutes } from './home.routes';
import { ApiResponse } from '../utils/ApiResponse';

const apiRouter = Router();

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  return ApiResponse.success(
    res,
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    'CMS Management API is operational'
  );
});

// Resource routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/organizations', organizationRoutes);
apiRouter.use('/channels', channelRoutes);
apiRouter.use('/channel-groups', channelGroupRoutes);
apiRouter.use('/posts', postRoutes);
apiRouter.use('/ideas', ideaRoutes);
apiRouter.use('/templates', templateRoutes);
apiRouter.use('/feeds', feedRoutes);
apiRouter.use('/comments', commentRoutes);
apiRouter.use('/mentions', mentionRoutes);
apiRouter.use('/insights', insightRoutes);
apiRouter.use('/tags', tagRoutes);
apiRouter.use('/saved-replies', savedReplyRoutes);
apiRouter.use('/notifications', notificationRoutes);
apiRouter.use('/billing', billingRoutes);
apiRouter.use('/upload', uploadRoutes);
apiRouter.use('/home', homeRoutes);

export default apiRouter;
