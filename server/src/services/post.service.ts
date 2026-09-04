import { Types } from 'mongoose';
import { Post } from '../models/Post.model';
import { Channel } from '../models/Channel.model';
import { Organization } from '../models/Organization.model';
import { Notification } from '../models/Notification.model';
import { AppError } from '../utils/AppError';
import { emitToOrganization } from '../config/socket';

export class PostService {
  static async createPost(
    userId: string,
    organizationId: string,
    data: {
      content: string;
      mediaUrls?: string[];
      scheduledAt?: string;
      channelIds: string[];
      tagIds?: string[];
      status?: 'draft' | 'queued' | 'pending-approval' | 'approved';
      firstComment?: string;
    }
  ) {
    const org = await Organization.findById(organizationId);
    if (!org) throw AppError.notFound('Organization not found');

    // Check post limit for free plan
    if (org.plan === 'free') {
      const scheduledCount = await Post.countDocuments({
        organizationId,
        status: 'queued',
      });
      if (scheduledCount >= 10) {
        throw AppError.badRequest(
          'Scheduled posts limit of 10 reached for Free plan. Please upgrade to Essentials or Team.'
        );
      }
    }

    // Verify channels belong to this organization
    const validChannels = await Channel.find({
      _id: { $in: data.channelIds },
      organizationId,
      isConnected: true,
    });
    if (validChannels.length === 0) {
      throw AppError.badRequest('At least one valid connected channel is required');
    }

    const post = await Post.create({
      content: data.content,
      mediaUrls: data.mediaUrls || [],
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
      channelIds: validChannels.map((c) => c._id),
      tagIds: data.tagIds || [],
      status: data.status || (data.scheduledAt ? 'queued' : 'draft'),
      firstComment: data.firstComment,
      createdBy: userId,
      organizationId,
    });

    emitToOrganization(organizationId, 'post:created', { postId: post._id, status: post.status });
    return post;
  }

  static async listPosts(
    organizationId: string,
    filter: {
      status?: string;
      channelId?: string;
      tagId?: string;
      startDate?: string;
      endDate?: string;
    },
    pagination: { page: number; limit: number; skip: number }
  ) {
    const query: Record<string, unknown> = { organizationId };

    if (filter.status) {
      query.status = filter.status;
    }

    if (filter.channelId) {
      query.channelIds = filter.channelId;
    }

    if (filter.tagId) {
      query.tagIds = filter.tagId;
    }

    if (filter.startDate || filter.endDate) {
      query.scheduledAt = {};
      if (filter.startDate) {
        (query.scheduledAt as Record<string, unknown>).$gte = new Date(filter.startDate);
      }
      if (filter.endDate) {
        (query.scheduledAt as Record<string, unknown>).$lte = new Date(filter.endDate);
      }
    }

    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate('channelIds', 'platform profile')
        .populate('tagIds', 'name color')
        .populate('createdBy', 'name avatar')
        .sort({ scheduledAt: 1, createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit),
      Post.countDocuments(query),
    ]);

    return { posts, total };
  }

  static async getPostCounts(organizationId: string) {
    const [queue, drafts, approvals, sent] = await Promise.all([
      Post.countDocuments({ organizationId, status: 'queued' }),
      Post.countDocuments({ organizationId, status: 'draft' }),
      Post.countDocuments({ organizationId, status: { $in: ['pending-approval', 'approved'] } }),
      Post.countDocuments({ organizationId, status: 'sent' }),
    ]);

    return {
      queue,
      drafts,
      approvals,
      sent,
    };
  }

  static async getPost(postId: string, organizationId: string) {
    const post = await Post.findOne({ _id: postId, organizationId })
      .populate('channelIds', 'platform profile')
      .populate('tagIds', 'name color')
      .populate('createdBy', 'name avatar');

    if (!post) throw AppError.notFound('Post not found');
    return post;
  }

  static async updatePost(
    postId: string,
    organizationId: string,
    data: {
      content?: string;
      mediaUrls?: string[];
      scheduledAt?: string | null;
      channelIds?: string[];
      tagIds?: string[];
      status?: 'draft' | 'queued' | 'pending-approval' | 'approved' | 'rejected' | 'sent' | 'failed';
      firstComment?: string;
    }
  ) {
    const post = await Post.findOne({ _id: postId, organizationId });
    if (!post) throw AppError.notFound('Post not found');

    if (data.content !== undefined) post.content = data.content;
    if (data.mediaUrls !== undefined) post.mediaUrls = data.mediaUrls;
    if (data.scheduledAt !== undefined) {
      post.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : undefined;
    }
    if (data.channelIds !== undefined) {
      post.channelIds = data.channelIds as unknown as typeof post.channelIds;
    }
    if (data.tagIds !== undefined) {
      post.tagIds = data.tagIds as unknown as typeof post.tagIds;
    }
    if (data.status !== undefined) post.status = data.status;
    if (data.firstComment !== undefined) post.firstComment = data.firstComment;

    await post.save();
    emitToOrganization(organizationId, 'post:updated', { postId: post._id, status: post.status });
    return post;
  }

  static async deletePost(postId: string, organizationId: string) {
    const post = await Post.findOneAndDelete({ _id: postId, organizationId });
    if (!post) throw AppError.notFound('Post not found');

    emitToOrganization(organizationId, 'post:deleted', { postId });
    return { message: 'Post deleted successfully' };
  }

  static async publishNow(postId: string, organizationId: string) {
    const post = await Post.findOne({ _id: postId, organizationId });
    if (!post) throw AppError.notFound('Post not found');

    // In a live setting, here we call platform adapters (YouTube, Twitter, FB, etc.)
    post.status = 'sent';
    post.publishedAt = new Date();
    await post.save();

    emitToOrganization(organizationId, 'post:published', { postId: post._id });
    return post;
  }

  static async submitForApproval(postId: string, organizationId: string, user: { id: string; name: string }) {
    const post = await Post.findOne({ _id: postId, organizationId });
    if (!post) throw AppError.notFound('Post not found');

    post.status = 'pending-approval';
    post.approvalNotes.push({
      authorId: new Types.ObjectId(user.id),
      authorName: user.name,
      text: 'Submitted post for approval',
      createdAt: new Date(),
    });

    await post.save();

    // Create notification for admins
    await Notification.create({
      type: 'approval-request',
      title: 'New Post Awaiting Approval',
      message: `${user.name} submitted a post for approval.`,
      userId: post.createdBy,
      metadata: { postId: post._id },
    });

    emitToOrganization(organizationId, 'post:approval-requested', { postId: post._id });
    return post;
  }

  static async reviewApproval(
    postId: string,
    organizationId: string,
    user: { id: string; name: string },
    action: 'approve' | 'reject',
    note?: string,
    rejectionReason?: string
  ) {
    const post = await Post.findOne({ _id: postId, organizationId });
    if (!post) throw AppError.notFound('Post not found');

    if (action === 'approve') {
      post.status = post.scheduledAt ? 'queued' : 'approved';
    } else {
      post.status = 'rejected';
      post.rejectionReason = rejectionReason || note || 'Rejected by reviewer';
    }

    if (note) {
      post.approvalNotes.push({
        authorId: new Types.ObjectId(user.id),
        authorName: user.name,
        text: note,
        createdAt: new Date(),
      });
    }

    await post.save();
    emitToOrganization(organizationId, 'post:approval-reviewed', { postId: post._id, action });
    return post;
  }
}
