"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplateSchema = exports.createTemplateSchema = void 0;
const zod_1 = require("zod");
exports.createTemplateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        content: zod_1.z.string().min(1, 'Content is required'),
        category: zod_1.z.string().optional(),
        emoji: zod_1.z.string().optional(),
        isPersonal: zod_1.z.boolean().optional(),
    }),
});
exports.updateTemplateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        content: zod_1.z.string().min(1).optional(),
        category: zod_1.z.string().optional(),
        emoji: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Template ID is required'),
    }),
});
//# sourceMappingURL=template.validator.js.map