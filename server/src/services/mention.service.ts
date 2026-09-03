import { Mention } from '../models/Mention.model';
import { AppError } from '../utils/AppError';

export class MentionService {
  static async listMentions(
    organizationId: string,
    filter: { channelId?: string; isRead?: boolean },
    pagination: { page: number; limit: number; skip: number }
  ) {
    const query: Record<string, unknown> = { organizationId };

    if (filter.channelId) query.channelId = filter.channelId;
    if (filter.isRead !== undefined) query.isRead = filter.isRead;

    const [mentions, total] = await Promise.all([
      Mention.find(query)
        .populate('channelId', 'platform profile')
        .sort({ mentionedAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit),
      Mention.countDocuments(query),
    ]);

    return { mentions, total };
  }

  static async markAsRead(mentionId: string, organizationId: string) {
    const mention = await Mention.findOne({ _id: mentionId, organizationId });
    if (!mention) throw AppError.notFound('Mention not found');

    mention.isRead = true;
    await mention.save();
    return mention;
  }
}
