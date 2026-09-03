import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Post content is required'),
    mediaUrls: z.array(z.string().url()).optional(),
    scheduledAt: z.string().datetime().optional(),
    channelIds: z.array(z.string()).min(1, 'Select at least one channel'),
    tagIds: z.array(z.string()).optional(),
    status: z.enum(['draft', 'queued', 'pending-approval', 'approved']).optional(),
    firstComment: z.string().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    content: z.string().min(1).optional(),
    mediaUrls: z.array(z.string()).optional(),
    scheduledAt: z.string().datetime().optional().nullable(),
    channelIds: z.array(z.string()).optional(),
    tagIds: z.array(z.string()).optional(),
    status: z.enum(['draft', 'queued', 'pending-approval', 'approved', 'rejected', 'sent', 'failed']).optional(),
    firstComment: z.string().optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Post ID is required'),
  }),
});

export const approvalActionSchema = z.object({
  body: z.object({
    action: z.enum(['approve', 'reject']),
    note: z.string().optional(),
    rejectionReason: z.string().optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Post ID is required'),
  }),
});
