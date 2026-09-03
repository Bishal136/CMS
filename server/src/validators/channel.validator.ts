import { z } from 'zod';
import { SOCIAL_PLATFORMS } from '../config/constants';

export const connectChannelSchema = z.object({
  body: z.object({
    platform: z.enum(SOCIAL_PLATFORMS),
    profileName: z.string().min(1, 'Profile name is required'),
    avatar: z.string().optional(),
    handle: z.string().optional(),
    accessToken: z.string().min(1, 'Access token is required'),
    refreshToken: z.string().optional(),
  }),
});

export const updateChannelSettingsSchema = z.object({
  body: z.object({
    postingSchedule: z
      .array(
        z.object({
          day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
          times: z.array(z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')),
        })
      )
      .optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Channel ID is required'),
  }),
});
