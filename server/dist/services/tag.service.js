"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const Tag_model_1 = require("../models/Tag.model");
const AppError_1 = require("../utils/AppError");
class TagService {
    static async listTags(organizationId) {
        return Tag_model_1.Tag.find({ organizationId }).sort({ name: 1 });
    }
    static async createTag(organizationId, name, color) {
        const existing = await Tag_model_1.Tag.findOne({ organizationId, name: name.trim() });
        if (existing)
            throw AppError_1.AppError.conflict('Tag with this name already exists');
        return Tag_model_1.Tag.create({
            name: name.trim(),
            color: color || '#FF1493',
            organizationId,
        });
    }
    static async updateTag(tagId, organizationId, data) {
        const tag = await Tag_model_1.Tag.findOne({ _id: tagId, organizationId });
        if (!tag)
            throw AppError_1.AppError.notFound('Tag not found');
        if (data.name)
            tag.name = data.name.trim();
        if (data.color)
            tag.color = data.color;
        await tag.save();
        return tag;
    }
    static async deleteTag(tagId, organizationId) {
        const tag = await Tag_model_1.Tag.findOneAndDelete({ _id: tagId, organizationId });
        if (!tag)
            throw AppError_1.AppError.notFound('Tag not found');
        return { message: 'Tag deleted successfully' };
    }
}
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map