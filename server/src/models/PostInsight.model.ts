import mongoose, { Schema } from 'mongoose';
import { IPostInsightDocument } from '../types/models.types';

const postInsightSchema = new Schema<IPostInsightDocument>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
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
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    impressions: {
      type: Number,
      default: 0,
    },
    reach: {
      type: Number,
      default: 0,
    },
    engagementRate: {
      type: Number,
      default: 0,
    },
    fetchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

postInsightSchema.index({ organizationId: 1, createdAt: -1 });

export const PostInsight = mongoose.model<IPostInsightDocument>('PostInsight', postInsightSchema);
