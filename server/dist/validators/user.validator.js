"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100).optional(),
        avatar: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
        preferences: zod_1.z
            .object({
            theme: zod_1.z.enum(['light', 'dark', 'system']).optional(),
            timezone: zod_1.z.string().optional(),
            timeFormat: zod_1.z.enum(['12h', '24h']).optional(),
            startOfWeek: zod_1.z.enum(['monday', 'sunday']).optional(),
            landingPage: zod_1.z.string().optional(),
            defaultPostingAction: zod_1.z.enum(['addToQueue', 'shareNow', 'schedule']).optional(),
            notifications: zod_1.z
                .object({
                activityAndAlerts: zod_1.z.boolean().optional(),
                insights: zod_1.z.boolean().optional(),
                tipsAndEducation: zod_1.z.boolean().optional(),
                newsletters: zod_1.z.boolean().optional(),
            })
                .optional(),
        })
            .optional(),
    }),
});
//# sourceMappingURL=user.validator.js.map