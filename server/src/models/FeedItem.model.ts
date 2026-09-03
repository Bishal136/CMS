import mongoose, { Schema } from 'mongoose';
import { IFeedItemDocument } from '../types/models.types';

const feedItemSchema = new Schema<IFeedItemDocument>(
  {
    feedId: {
      type: Schema.Types.ObjectId,
      ref: 'Feed',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    sourceUrl: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FeedItem = mongoose.model<IFeedItemDocument>('FeedItem', feedItemSchema);
