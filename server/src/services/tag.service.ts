import { Tag } from '../models/Tag.model';
import { AppError } from '../utils/AppError';

export class TagService {
  static async listTags(organizationId: string) {
    return Tag.find({ organizationId }).sort({ name: 1 });
  }

  static async createTag(organizationId: string, name: string, color?: string) {
    const existing = await Tag.findOne({ organizationId, name: name.trim() });
    if (existing) throw AppError.conflict('Tag with this name already exists');

    return Tag.create({
      name: name.trim(),
      color: color || '#FF1493',
      organizationId,
    });
  }

  static async updateTag(tagId: string, organizationId: string, data: { name?: string; color?: string }) {
    const tag = await Tag.findOne({ _id: tagId, organizationId });
    if (!tag) throw AppError.notFound('Tag not found');

    if (data.name) tag.name = data.name.trim();
    if (data.color) tag.color = data.color;

    await tag.save();
    return tag;
  }

  static async deleteTag(tagId: string, organizationId: string) {
    const tag = await Tag.findOneAndDelete({ _id: tagId, organizationId });
    if (!tag) throw AppError.notFound('Tag not found');
    return { message: 'Tag deleted successfully' };
  }
}
