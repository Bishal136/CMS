import mongoose, { Schema } from 'mongoose';
import { ICommentDocument } from '../types/models.types';

const commentSchema = new Schema<ICommentDocument>(
  {
    socialCommentId: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      default: '',
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      index: true,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
      index: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    platform: {
      type: String,
      required: true,
      index: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    repliedContent: {
      type: String,
    },
    repliedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ organizationId: 1, isRead: 1 });

export const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema);
