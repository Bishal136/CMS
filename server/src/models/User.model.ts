import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDocument } from '../types/models.types';

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      select: false, // Don't return password in queries by default
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['admin', 'member', 'publisher'],
      default: 'member',
      index: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Organization is required'],
      index: true,
    },
    preferences: {
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
      timezone: { type: String, default: 'UTC' },
      timeFormat: { type: String, enum: ['12h', '24h'], default: '12h' },
      startOfWeek: { type: String, enum: ['monday', 'sunday'], default: 'monday' },
      landingPage: { type: String, default: '/dashboard' },
      defaultPostingAction: {
        type: String,
        enum: ['addToQueue', 'shareNow', 'schedule'],
        default: 'addToQueue',
      },
      notifications: {
        activityAndAlerts: { type: Boolean, default: true },
        insights: { type: Boolean, default: true },
        tipsAndEducation: { type: Boolean, default: false },
        newsletters: { type: Boolean, default: false },
      },
    },
    twoFactorSecret: {
      type: String,
      select: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      sparse: true,
      index: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
      index: true,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before save if modified (12 rounds)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model<IUserDocument>('User', userSchema);
