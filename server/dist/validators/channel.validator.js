"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChannelSettingsSchema = exports.connectChannelSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../config/constants");
exports.connectChannelSchema = zod_1.z.object({
    body: zod_1.z.object({
        platform: zod_1.z.enum(constants_1.SOCIAL_PLATFORMS),
        profileName: zod_1.z.string().min(1, 'Profile name is required'),
        avatar: zod_1.z.string().optional(),
        handle: zod_1.z.string().optional(),
        accessToken: zod_1.z.string().min(1, 'Access token is required'),
        refreshToken: zod_1.z.string().optional(),
    }),
});
exports.updateChannelSettingsSchema = zod_1.z.object({
    body: zod_1.z.object({
        postingSchedule: zod_1.z
            .array(zod_1.z.object({
            day: zod_1.z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
            times: zod_1.z.array(zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')),
        }))
            .optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Channel ID is required'),
    }),
});
//# sourceMappingURL=channel.validator.js.map