import { z } from 'zod';

export const createTemplateSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    category: z.string().optional(),
    emoji: z.string().optional(),
    isPersonal: z.boolean().optional(),
  }),
});

export const updateTemplateSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    category: z.string().optional(),
    emoji: z.string().optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Template ID is required'),
  }),
});
