import mongoose, { Schema } from 'mongoose';
import { ITagDocument } from '../types/models.types';

const tagSchema = new Schema<ITagDocument>(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
      trim: true,
    },
    color: {
      type: String,
      default: '#FF1493', // Hot Pink brand color by default
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

tagSchema.index({ organizationId: 1, name: 1 }, { unique: true });

export const Tag = mongoose.model<ITagDocument>('Tag', tagSchema);
