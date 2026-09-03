import mongoose, { Schema } from 'mongoose';
import { IOrganizationDocument } from '../types/models.types';

const organizationSchema = new Schema<IOrganizationDocument>(
  {
    name: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
      maxlength: [100, 'Organization name cannot exceed 100 characters'],
    },
    plan: {
      type: String,
      enum: ['free', 'essentials', 'team'],
      default: 'free',
      index: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    channelLimit: {
      type: Number,
      default: 3,
    },
    postLimitPerChannel: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

export const Organization = mongoose.model<IOrganizationDocument>('Organization', organizationSchema);
