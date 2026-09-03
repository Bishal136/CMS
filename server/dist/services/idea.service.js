"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaService = void 0;
const Idea_model_1 = require("../models/Idea.model");
const IdeaGroup_model_1 = require("../models/IdeaGroup.model");
const AppError_1 = require("../utils/AppError");
class IdeaService {
    static async listIdeas(organizationId) {
        const [ideas, groups] = await Promise.all([
            Idea_model_1.Idea.find({ organizationId }).populate('tagIds', 'name color').sort({ order: 1 }),
            IdeaGroup_model_1.IdeaGroup.find({ organizationId }).sort({ order: 1 }),
        ]);
        return { ideas, groups };
    }
    static async createIdea(userId, organizationId, data) {
        const highestOrder = await Idea_model_1.Idea.findOne({ organizationId, status: data.status || 'unassigned' })
            .sort({ order: -1 })
            .select('order');
        const nextOrder = data.order !== undefined ? data.order : (highestOrder?.order ?? -1) + 1;
        return Idea_model_1.Idea.create({
            title: data.title,
            content: data.content || '',
            status: data.status || 'unassigned',
            groupName: data.groupName || 'General',
            order: nextOrder,
            tagIds: data.tagIds || [],
            organizationId,
            createdBy: userId,
        });
    }
    static async updateIdea(ideaId, organizationId, data) {
        const idea = await Idea_model_1.Idea.findOne({ _id: ideaId, organizationId });
        if (!idea)
            throw AppError_1.AppError.notFound('Idea not found');
        if (data.title !== undefined)
            idea.title = data.title;
        if (data.content !== undefined)
            idea.content = data.content;
        if (data.status !== undefined)
            idea.status = data.status;
        if (data.groupName !== undefined)
            idea.groupName = data.groupName;
        if (data.order !== undefined)
            idea.order = data.order;
        if (data.tagIds !== undefined)
            idea.tagIds = data.tagIds;
        await idea.save();
        return idea;
    }
    static async deleteIdea(ideaId, organizationId) {
        const idea = await Idea_model_1.Idea.findOneAndDelete({ _id: ideaId, organizationId });
        if (!idea)
            throw AppError_1.AppError.notFound('Idea not found');
        return { message: 'Idea deleted successfully' };
    }
    static async createGroup(organizationId, name) {
        const highestOrder = await IdeaGroup_model_1.IdeaGroup.findOne({ organizationId }).sort({ order: -1 });
        const order = (highestOrder?.order ?? -1) + 1;
        return IdeaGroup_model_1.IdeaGroup.create({
            name,
            order,
            organizationId,
        });
    }
}
exports.IdeaService = IdeaService;
//# sourceMappingURL=idea.service.js.map