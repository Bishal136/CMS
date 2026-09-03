import mongoose, { Schema } from 'mongoose';
import { ITemplateDocument } from '../types/models.types';

const templateSchema = new Schema<ITemplateDocument>(
  {
    title: {
      type: String,
      required: [true, 'Template title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Template content is required'],
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
      index: true,
    },
    emoji: {
      type: String,
      default: '📝',
    },
    isPersonal: {
      type: Boolean,
      default: false,
      index: true,
    },
    isDiscoverable: {
      type: Boolean,
      default: false,
      index: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Template = mongoose.model<ITemplateDocument>('Template', templateSchema);
