import mongoose, { Schema } from 'mongoose';
import { IRefreshTokenDocument } from '../types/models.types';

const refreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index auto-deletes expired documents
    },
    isRevoked: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RefreshToken = mongoose.model<IRefreshTokenDocument>('RefreshToken', refreshTokenSchema);
