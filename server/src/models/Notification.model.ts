import mongoose, { Schema } from 'mongoose';
import { INotificationDocument } from '../types/models.types';

const notificationSchema = new Schema<INotificationDocument>(
  {
    type: {
      type: String,
      enum: ['post-published', 'post-failed', 'approval-request', 'comment', 'mention', 'billing', 'system'],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

export const Notification = mongoose.model<INotificationDocument>('Notification', notificationSchema);
