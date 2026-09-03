import mongoose, { Schema } from 'mongoose';
import { IMentionDocument } from '../types/models.types';

const mentionSchema = new Schema<IMentionDocument>(
  {
    socialMentionId: {
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
    mentionedAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

mentionSchema.index({ organizationId: 1, isRead: 1 });

export const Mention = mongoose.model<IMentionDocument>('Mention', mentionSchema);
