import mongoose, { Schema } from 'mongoose';
import { IIdeaGroupDocument } from '../types/models.types';

const ideaGroupSchema = new Schema<IIdeaGroupDocument>(
  {
    name: {
      type: String,
      required: [true, 'Group name is required'],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
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

export const IdeaGroup = mongoose.model<IIdeaGroupDocument>('IdeaGroup', ideaGroupSchema);
