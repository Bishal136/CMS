import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email('Invalid email address').optional(),
    backupEmail: z.string().email('Invalid backup email').optional().or(z.literal('')),
    avatar: z.string().optional(),
    twoFactorEnabled: z.boolean().optional(),
    preferences: z
      .object({
        theme: z.enum(['light', 'dark', 'system']).optional(),
        timezone: z.string().optional(),
        timeFormat: z.enum(['12h', '24h']).optional(),
        startOfWeek: z.enum(['monday', 'sunday']).optional(),
        landingPage: z.string().optional(),
        defaultPostingAction: z.enum(['addToQueue', 'shareNow', 'schedule']).optional(),
        notifications: z
          .object({
            activityAndAlerts: z.boolean().optional(),
            insights: z.boolean().optional(),
            tipsAndEducation: z.boolean().optional(),
            newsletters: z.boolean().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});
