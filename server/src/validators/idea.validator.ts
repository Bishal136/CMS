import { z } from 'zod';

export const createIdeaSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().optional(),
    status: z.enum(['unassigned', 'todo', 'in-progress', 'done']).optional(),
    groupName: z.string().optional(),
    order: z.number().optional(),
    tagIds: z.array(z.string()).optional(),
  }),
});

export const updateIdeaSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().optional(),
    status: z.enum(['unassigned', 'todo', 'in-progress', 'done']).optional(),
    groupName: z.string().optional(),
    order: z.number().optional(),
    tagIds: z.array(z.string()).optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Idea ID is required'),
  }),
});
