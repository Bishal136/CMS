import { Comment } from '../models/Comment.model';
import { AppError } from '../utils/AppError';

export class CommentService {
  static async listComments(
    organizationId: string,
    filter: { channelId?: string; postId?: string; isRead?: boolean },
    pagination: { page: number; limit: number; skip: number }
  ) {
    const query: Record<string, unknown> = { organizationId };

    if (filter.channelId) query.channelId = filter.channelId;
    if (filter.postId) query.postId = filter.postId;
    if (filter.isRead !== undefined) query.isRead = filter.isRead;

    const [comments, total] = await Promise.all([
      Comment.find(query)
        .populate('channelId', 'platform profile')
        .populate('postId', 'content mediaUrls')
        .sort({ createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit),
      Comment.countDocuments(query),
    ]);

    return { comments, total };
  }

  static async replyToComment(
    commentId: string,
    organizationId: string,
    repliedContent: string
  ) {
    const comment = await Comment.findOne({ _id: commentId, organizationId });
    if (!comment) throw AppError.notFound('Comment not found');

    comment.repliedContent = repliedContent;
    comment.repliedAt = new Date();
    comment.isRead = true;

    await comment.save();
    return comment;
  }

  static async markAsRead(commentId: string, organizationId: string) {
    const comment = await Comment.findOne({ _id: commentId, organizationId });
    if (!comment) throw AppError.notFound('Comment not found');

    comment.isRead = true;
    await comment.save();
    return comment;
  }
}
