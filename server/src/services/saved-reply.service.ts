import { SavedReply } from '../models/SavedReply.model';
import { AppError } from '../utils/AppError';

export class SavedReplyService {
  static async listReplies(organizationId: string) {
    return SavedReply.find({ organizationId }).sort({ createdAt: -1 });
  }

  static async createReply(
    userId: string,
    organizationId: string,
    data: { title: string; content: string }
  ) {
    return SavedReply.create({
      title: data.title,
      content: data.content,
      organizationId,
      createdBy: userId,
    });
  }

  static async updateReply(
    replyId: string,
    organizationId: string,
    data: { title?: string; content?: string }
  ) {
    const reply = await SavedReply.findOne({ _id: replyId, organizationId });
    if (!reply) throw AppError.notFound('Saved reply not found');

    if (data.title) reply.title = data.title;
    if (data.content) reply.content = data.content;

    await reply.save();
    return reply;
  }

  static async deleteReply(replyId: string, organizationId: string) {
    const reply = await SavedReply.findOneAndDelete({ _id: replyId, organizationId });
    if (!reply) throw AppError.notFound('Saved reply not found');
    return { message: 'Saved reply deleted successfully' };
  }
}
