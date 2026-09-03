import { Idea } from '../models/Idea.model';
import { IdeaGroup } from '../models/IdeaGroup.model';
import { AppError } from '../utils/AppError';

export class IdeaService {
  static async listIdeas(organizationId: string) {
    const [ideas, groups] = await Promise.all([
      Idea.find({ organizationId }).populate('tagIds', 'name color').sort({ order: 1 }),
      IdeaGroup.find({ organizationId }).sort({ order: 1 }),
    ]);
    return { ideas, groups };
  }

  static async createIdea(
    userId: string,
    organizationId: string,
    data: {
      title: string;
      content?: string;
      status?: 'unassigned' | 'todo' | 'in-progress' | 'done';
      groupName?: string;
      order?: number;
      tagIds?: string[];
    }
  ) {
    const highestOrder = await Idea.findOne({ organizationId, status: data.status || 'unassigned' })
      .sort({ order: -1 })
      .select('order');

    const nextOrder = data.order !== undefined ? data.order : (highestOrder?.order ?? -1) + 1;

    return Idea.create({
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

  static async updateIdea(
    ideaId: string,
    organizationId: string,
    data: {
      title?: string;
      content?: string;
      status?: 'unassigned' | 'todo' | 'in-progress' | 'done';
      groupName?: string;
      order?: number;
      tagIds?: string[];
    }
  ) {
    const idea = await Idea.findOne({ _id: ideaId, organizationId });
    if (!idea) throw AppError.notFound('Idea not found');

    if (data.title !== undefined) idea.title = data.title;
    if (data.content !== undefined) idea.content = data.content;
    if (data.status !== undefined) idea.status = data.status;
    if (data.groupName !== undefined) idea.groupName = data.groupName;
    if (data.order !== undefined) idea.order = data.order;
    if (data.tagIds !== undefined) idea.tagIds = data.tagIds as unknown as typeof idea.tagIds;

    await idea.save();
    return idea;
  }

  static async deleteIdea(ideaId: string, organizationId: string) {
    const idea = await Idea.findOneAndDelete({ _id: ideaId, organizationId });
    if (!idea) throw AppError.notFound('Idea not found');
    return { message: 'Idea deleted successfully' };
  }

  static async createGroup(organizationId: string, name: string) {
    const highestOrder = await IdeaGroup.findOne({ organizationId }).sort({ order: -1 });
    const order = (highestOrder?.order ?? -1) + 1;

    return IdeaGroup.create({
      name,
      order,
      organizationId,
    });
  }
}
