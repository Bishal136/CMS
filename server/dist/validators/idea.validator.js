"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdeaSchema = exports.createIdeaSchema = void 0;
const zod_1 = require("zod");
exports.createIdeaSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        content: zod_1.z.string().optional(),
        status: zod_1.z.enum(['unassigned', 'todo', 'in-progress', 'done']).optional(),
        groupName: zod_1.z.string().optional(),
        order: zod_1.z.number().optional(),
        tagIds: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.updateIdeaSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        content: zod_1.z.string().optional(),
        status: zod_1.z.enum(['unassigned', 'todo', 'in-progress', 'done']).optional(),
        groupName: zod_1.z.string().optional(),
        order: zod_1.z.number().optional(),
        tagIds: zod_1.z.array(zod_1.z.string()).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Idea ID is required'),
    }),
});
//# sourceMappingURL=idea.validator.js.map