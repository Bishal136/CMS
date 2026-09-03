"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const organization_routes_1 = require("./organization.routes");
const channel_routes_1 = require("./channel.routes");
const channel_group_routes_1 = require("./channel-group.routes");
const post_routes_1 = require("./post.routes");
const idea_routes_1 = require("./idea.routes");
const template_routes_1 = require("./template.routes");
const feed_routes_1 = require("./feed.routes");
const comment_routes_1 = require("./comment.routes");
const mention_routes_1 = require("./mention.routes");
const insight_routes_1 = require("./insight.routes");
const tag_routes_1 = require("./tag.routes");
const saved_reply_routes_1 = require("./saved-reply.routes");
const notification_routes_1 = require("./notification.routes");
const billing_routes_1 = require("./billing.routes");
const upload_routes_1 = require("./upload.routes");
const ApiResponse_1 = require("../utils/ApiResponse");
const apiRouter = (0, express_1.Router)();
// Health check endpoint
apiRouter.get('/health', (_req, res) => {
    return ApiResponse_1.ApiResponse.success(res, {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    }, 'CMS Management API is operational');
});
// Resource routes
apiRouter.use('/auth', auth_routes_1.authRoutes);
apiRouter.use('/users', user_routes_1.userRoutes);
apiRouter.use('/organizations', organization_routes_1.organizationRoutes);
apiRouter.use('/channels', channel_routes_1.channelRoutes);
apiRouter.use('/channel-groups', channel_group_routes_1.channelGroupRoutes);
apiRouter.use('/posts', post_routes_1.postRoutes);
apiRouter.use('/ideas', idea_routes_1.ideaRoutes);
apiRouter.use('/templates', template_routes_1.templateRoutes);
apiRouter.use('/feeds', feed_routes_1.feedRoutes);
apiRouter.use('/comments', comment_routes_1.commentRoutes);
apiRouter.use('/mentions', mention_routes_1.mentionRoutes);
apiRouter.use('/insights', insight_routes_1.insightRoutes);
apiRouter.use('/tags', tag_routes_1.tagRoutes);
apiRouter.use('/saved-replies', saved_reply_routes_1.savedReplyRoutes);
apiRouter.use('/notifications', notification_routes_1.notificationRoutes);
apiRouter.use('/billing', billing_routes_1.billingRoutes);
apiRouter.use('/upload', upload_routes_1.uploadRoutes);
exports.default = apiRouter;
//# sourceMappingURL=index.js.map