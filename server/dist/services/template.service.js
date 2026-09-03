"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const Template_model_1 = require("../models/Template.model");
const AppError_1 = require("../utils/AppError");
class TemplateService {
    static async listTemplates(organizationId, filter) {
        const query = {
            $or: [{ isDiscoverable: true }, { organizationId }],
        };
        if (filter?.category) {
            query.category = filter.category;
        }
        if (filter?.isPersonal !== undefined) {
            query.isPersonal = filter.isPersonal;
        }
        return Template_model_1.Template.find(query).sort({ createdAt: -1 });
    }
    static async listDiscoverTemplates() {
        return Template_model_1.Template.find({ isDiscoverable: true }).sort({ category: 1, createdAt: -1 });
    }
    static async createTemplate(userId, organizationId, data) {
        return Template_model_1.Template.create({
            title: data.title,
            content: data.content,
            category: data.category || 'General',
            emoji: data.emoji || '📝',
            isPersonal: data.isPersonal ?? true,
            isDiscoverable: false,
            organizationId,
            createdBy: userId,
        });
    }
    static async updateTemplate(templateId, organizationId, data) {
        const template = await Template_model_1.Template.findOne({ _id: templateId, organizationId });
        if (!template)
            throw AppError_1.AppError.notFound('Template not found');
        if (data.title !== undefined)
            template.title = data.title;
        if (data.content !== undefined)
            template.content = data.content;
        if (data.category !== undefined)
            template.category = data.category;
        if (data.emoji !== undefined)
            template.emoji = data.emoji;
        await template.save();
        return template;
    }
    static async deleteTemplate(templateId, organizationId) {
        const template = await Template_model_1.Template.findOneAndDelete({ _id: templateId, organizationId });
        if (!template)
            throw AppError_1.AppError.notFound('Template not found');
        return { message: 'Template deleted successfully' };
    }
}
exports.TemplateService = TemplateService;
//# sourceMappingURL=template.service.js.map