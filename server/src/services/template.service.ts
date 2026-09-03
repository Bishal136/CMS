import { Template } from '../models/Template.model';
import { AppError } from '../utils/AppError';

export class TemplateService {
  static async listTemplates(organizationId: string, filter?: { category?: string; isPersonal?: boolean }) {
    const query: Record<string, unknown> = {
      $or: [{ isDiscoverable: true }, { organizationId }],
    };

    if (filter?.category) {
      query.category = filter.category;
    }

    if (filter?.isPersonal !== undefined) {
      query.isPersonal = filter.isPersonal;
    }

    return Template.find(query).sort({ createdAt: -1 });
  }

  static async listDiscoverTemplates() {
    return Template.find({ isDiscoverable: true }).sort({ category: 1, createdAt: -1 });
  }

  static async createTemplate(
    userId: string,
    organizationId: string,
    data: {
      title: string;
      content: string;
      category?: string;
      emoji?: string;
      isPersonal?: boolean;
    }
  ) {
    return Template.create({
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

  static async updateTemplate(
    templateId: string,
    organizationId: string,
    data: { title?: string; content?: string; category?: string; emoji?: string }
  ) {
    const template = await Template.findOne({ _id: templateId, organizationId });
    if (!template) throw AppError.notFound('Template not found');

    if (data.title !== undefined) template.title = data.title;
    if (data.content !== undefined) template.content = data.content;
    if (data.category !== undefined) template.category = data.category;
    if (data.emoji !== undefined) template.emoji = data.emoji;

    await template.save();
    return template;
  }

  static async deleteTemplate(templateId: string, organizationId: string) {
    const template = await Template.findOneAndDelete({ _id: templateId, organizationId });
    if (!template) throw AppError.notFound('Template not found');
    return { message: 'Template deleted successfully' };
  }
}
