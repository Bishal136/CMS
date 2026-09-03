import mongoose, { Schema } from 'mongoose';
import { ISavedReplyDocument } from '../types/models.types';

const savedReplySchema = new Schema<ISavedReplyDocument>(
  {
    title: {
      type: String,
      required: [true, 'Saved reply title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Saved reply content is required'],
      trim: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SavedReply = mongoose.model<ISavedReplyDocument>('SavedReply', savedReplySchema);
