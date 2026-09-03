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
    data: { name?: string; avatar?: string; preferences?: IUserPreferences }
  ): Promise<IUserDocument> {
    const user = await User.findById(userId);
    if (!user) {
      throw AppError.notFound('User not found');
    }

    if (data.name) user.name = data.name;
    if (data.avatar !== undefined) user.avatar = data.avatar;
    if (data.preferences) {
      user.preferences = {
        ...user.preferences,
        ...data.preferences,
      };
    }

    await user.save();
    return user;
  }

  static async updatePassword(userId: string, currentPass: string, newPass: string): Promise<void> {
    const user = await User.findById(userId).select('+password');
    if (!user || !user.password) {
      throw AppError.notFound('User not found');
    }

    const isMatch = await bcrypt.compare(currentPass, user.password);
    if (!isMatch) {
      throw AppError.badRequest('Current password does not match');
    }

    user.password = newPass;
    await user.save();
  }
}
