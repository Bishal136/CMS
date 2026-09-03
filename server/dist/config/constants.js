"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCIAL_PLATFORMS = exports.POST_STATUSES = exports.PLAN_LIMITS = exports.SUBSCRIPTION_PLANS = exports.USER_ROLES = void 0;
exports.USER_ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member',
    PUBLISHER: 'publisher',
};
exports.SUBSCRIPTION_PLANS = {
    FREE: 'free',
    ESSENTIALS: 'essentials',
    TEAM: 'team',
};
exports.PLAN_LIMITS = {
    free: {
        maxChannels: 3,
        maxScheduledPostsPerChannel: 10,
        ideasCount: 100,
        userAccounts: 1,
        analytics: 'basic',
        approvalWorkflow: false,
        channelGroups: false,
    },
    essentials: {
        maxChannels: 10,
        maxScheduledPostsPerChannel: Infinity,
        ideasCount: Infinity,
        userAccounts: 1,
        analytics: 'advanced',
        approvalWorkflow: false,
        channelGroups: false,
    },
    team: {
        maxChannels: 50,
        maxScheduledPostsPerChannel: Infinity,
        ideasCount: Infinity,
        userAccounts: Infinity,
        analytics: 'advanced',
        approvalWorkflow: true,
        channelGroups: true,
    },
};
exports.POST_STATUSES = {
    DRAFT: 'draft',
    QUEUED: 'queued',
    PENDING_APPROVAL: 'pending-approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SENT: 'sent',
    FAILED: 'failed',
};
exports.SOCIAL_PLATFORMS = [
    'youtube',
    'facebook',
    'twitter',
    'instagram',
    'linkedin',
    'tiktok',
    'threads',
    'pinterest',
    'mastodon',
    'google-business',
];
//# sourceMappingURL=constants.js.map