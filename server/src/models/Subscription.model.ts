import mongoose, { Schema } from 'mongoose';
import { ISubscriptionDocument } from '../types/models.types';

const subscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      unique: true,
      index: true,
    },
    stripeCustomerId: {
      type: String,
      index: true,
    },
    stripeSubscriptionId: {
      type: String,
      index: true,
    },
    plan: {
      type: String,
      enum: ['free', 'essentials', 'team'],
      default: 'free',
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'past_due', 'trialing'],
      default: 'active',
    },
    currentPeriodEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model<ISubscriptionDocument>('Subscription', subscriptionSchema);
