import mongoose, { Schema } from 'mongoose';
import { IChannelGroupDocument } from '../types/models.types';

const channelGroupSchema = new Schema<IChannelGroupDocument>(
  {
    name: {
      type: String,
      required: [true, 'Channel group name is required'],
      trim: true,
    },
    channelIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
      },
    ],
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

export const ChannelGroup = mongoose.model<IChannelGroupDocument>('ChannelGroup', channelGroupSchema);
