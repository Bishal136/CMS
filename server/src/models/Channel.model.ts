import mongoose, { Schema } from 'mongoose';
import { IChannelDocument } from '../types/models.types';
import { encryptToken, decryptToken } from '../utils/encryption';

const channelSchema = new Schema<IChannelDocument>(
  {
    platform: {
      type: String,
      enum: [
        'youtube',
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'tiktok',
        'threads',
        'pinterest',
        'mastodon',
        'google-business',
      ],
      required: true,
      index: true,
    },
    accessToken: {
      type: String,
      required: true,
      set: (val: string) => encryptToken(val),
      get: (val: string) => decryptToken(val),
    },
    refreshToken: {
      type: String,
      set: (val: string) => (val ? encryptToken(val) : val),
      get: (val: string) => (val ? decryptToken(val) : val),
    },
    tokenExpiresAt: {
      type: Date,
    },
    profile: {
      name: { type: String, required: true },
      avatar: { type: String, default: '' },
      handle: { type: String },
      url: { type: String },
    },
    postingSchedule: [
      {
        day: {
          type: String,
          enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          required: true,
        },
        times: [{ type: String }],
      },
    ],
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    isConnected: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

channelSchema.index({ organizationId: 1, platform: 1 });

export const Channel = mongoose.model<IChannelDocument>('Channel', channelSchema);
