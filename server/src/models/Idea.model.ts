import mongoose, { Schema } from 'mongoose';
import { IIdeaDocument } from '../types/models.types';

const ideaSchema = new Schema<IIdeaDocument>(
  {
    title: {
      type: String,
      required: [true, 'Idea title is required'],
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['unassigned', 'todo', 'in-progress', 'done'],
      default: 'unassigned',
      index: true,
    },
    groupName: {
      type: String,
      default: 'General',
    },
    order: {
      type: Number,
      default: 0,
    },
    previewIllustration: {
      type: String,
      default: '',
    },
    tagIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
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

ideaSchema.index({ organizationId: 1, status: 1, order: 1 });

export const Idea = mongoose.model<IIdeaDocument>('Idea', ideaSchema);
