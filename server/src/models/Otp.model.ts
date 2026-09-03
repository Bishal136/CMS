import mongoose, { Schema } from 'mongoose';
import { IOtpDocument } from '../types/models.types';

const otpSchema = new Schema<IOtpDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required for OTP'],
      lowercase: true,
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: [true, 'OTP code is required'],
    },
    type: {
      type: String,
      enum: ['register', 'reset-password', 'login'],
      default: 'register',
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index automatically removes expired records
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ email: 1, type: 1 });

export const Otp = mongoose.model<IOtpDocument>('Otp', otpSchema);
