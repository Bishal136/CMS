import mongoose, { Schema } from 'mongoose';
import { IPostDocument } from '../types/models.types';

const postSchema = new Schema<IPostDocument>(
  {
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
    },
    mediaUrls: [
      {
        type: String,
      },
    ],
    scheduledAt: {
      type: Date,
      index: true,
    },
    publishedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['draft', 'queued', 'pending-approval', 'approved', 'rejected', 'sent', 'failed'],
      default: 'draft',
      index: true,
    },
    channelIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
      },
    ],
    tagIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    approvalNotes: [
      {
        authorId: { type: Schema.Types.ObjectId, ref: 'User' },
        authorName: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    rejectionReason: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    firstComment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ organizationId: 1, status: 1 });
postSchema.index({ organizationId: 1, scheduledAt: 1 });

export const Post = mongoose.model<IPostDocument>('Post', postSchema);
