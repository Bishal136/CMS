"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalActionSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().min(1, 'Post content is required'),
        mediaUrls: zod_1.z.array(zod_1.z.string().url()).optional(),
        scheduledAt: zod_1.z.string().datetime().optional(),
        channelIds: zod_1.z.array(zod_1.z.string()).min(1, 'Select at least one channel'),
        tagIds: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.enum(['draft', 'queued', 'pending-approval', 'approved']).optional(),
        firstComment: zod_1.z.string().optional(),
    }),
});
exports.updatePostSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().min(1).optional(),
        mediaUrls: zod_1.z.array(zod_1.z.string()).optional(),
        scheduledAt: zod_1.z.string().datetime().optional().nullable(),
        channelIds: zod_1.z.array(zod_1.z.string()).optional(),
        tagIds: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.enum(['draft', 'queued', 'pending-approval', 'approved', 'rejected', 'sent', 'failed']).optional(),
        firstComment: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Post ID is required'),
    }),
});
exports.approvalActionSchema = zod_1.z.object({
    body: zod_1.z.object({
        action: zod_1.z.enum(['approve', 'reject']),
        note: zod_1.z.string().optional(),
        rejectionReason: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Post ID is required'),
    }),
});
//# sourceMappingURL=post.validator.js.map