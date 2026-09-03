import mongoose, { Schema } from 'mongoose';
import { IFeedDocument } from '../types/models.types';

const feedSchema = new Schema<IFeedDocument>(
  {
    name: {
      type: String,
      required: [true, 'Feed name is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Feed URL is required'],
      trim: true,
    },
    lastFetchedAt: {
      type: Date,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Feed = mongoose.model<IFeedDocument>('Feed', feedSchema);
