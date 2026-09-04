import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { AppError } from '../utils/AppError';
import { IUserDocument, IUserPreferences } from '../types/models.types';

export class UserService {
  static async getProfile(userId: string): Promise<IUserDocument> {
    const user = await User.findById(userId).populate('organizationId', 'name plan channelLimit');
    if (!user) {
      throw AppError.notFound('User not found');
    }
    return user;
  }

  static async updateProfile(
    userId: string,
    data: {
      name?: string;
      email?: string;
      backupEmail?: string;
      avatar?: string;
      twoFactorEnabled?: boolean;
      preferences?: IUserPreferences;
    }
  ): Promise<IUserDocument> {
    const user = await User.findById(userId);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    if (data.name) {
      user.name = data.name.trim();
    }

    if (data.email && data.email.toLowerCase() !== user.email) {
      const existing = await User.findOne({
        email: data.email.toLowerCase(),
        _id: { $ne: userId },
      });
      if (existing) {
        throw AppError.badRequest('Email address is already in use by another account');
      }
      user.email = data.email.toLowerCase();
      user.isVerified = false;
    }

    if (data.backupEmail !== undefined) {
      user.backupEmail = data.backupEmail.trim().toLowerCase();
    }

    if (data.twoFactorEnabled !== undefined) {
      user.twoFactorEnabled = data.twoFactorEnabled;
    }

    if (data.avatar !== undefined) {
      user.avatar = data.avatar;
    }

    if (data.preferences) {
      user.preferences = {
        ...user.preferences,
        ...data.preferences,
      };
    }

    await user.save();
    return user;
  }

  static async resendVerification(userId: string): Promise<{ message: string }> {
    const user = await User.findById(userId);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    user.verificationToken = Math.random().toString(36).substring(2, 15);
    await user.save();

    return { message: `Verification email sent to ${user.email}` };
  }

  static async updatePassword(userId: string, currentPass?: string, newPass?: string): Promise<void> {
    if (!newPass || newPass.length < 8) {
      throw AppError.badRequest('New password must be at least 8 characters');
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw AppError.notFound('User not found');
    }

    if (user.password) {
      if (!currentPass) {
        throw AppError.badRequest('Current password is required');
      }
      const isMatch = await bcrypt.compare(currentPass, user.password);
      if (!isMatch) {
        throw AppError.badRequest('Current password does not match');
      }
    }

    user.password = newPass;
    await user.save();
  }
}
