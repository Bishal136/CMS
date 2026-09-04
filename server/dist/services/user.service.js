"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_model_1 = require("../models/User.model");
const AppError_1 = require("../utils/AppError");
class UserService {
    static async getProfile(userId) {
        const user = await User_model_1.User.findById(userId).populate('organizationId', 'name plan channelLimit');
        if (!user) {
            throw AppError_1.AppError.notFound('User not found');
        }
        return user;
    }
    static async updateProfile(userId, data) {
        const user = await User_model_1.User.findById(userId);
        if (!user) {
            throw AppError_1.AppError.notFound('User not found');
        }
        if (data.name) {
            user.name = data.name.trim();
        }
        if (data.email && data.email.toLowerCase() !== user.email) {
            const existing = await User_model_1.User.findOne({
                email: data.email.toLowerCase(),
                _id: { $ne: userId },
            });
            if (existing) {
                throw AppError_1.AppError.badRequest('Email address is already in use by another account');
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
    static async resendVerification(userId) {
        const user = await User_model_1.User.findById(userId);
        if (!user) {
            throw AppError_1.AppError.notFound('User not found');
        }
        user.verificationToken = Math.random().toString(36).substring(2, 15);
        await user.save();
        return { message: `Verification email sent to ${user.email}` };
    }
    static async updatePassword(userId, currentPass, newPass) {
        if (!newPass || newPass.length < 8) {
            throw AppError_1.AppError.badRequest('New password must be at least 8 characters');
        }
        const user = await User_model_1.User.findById(userId).select('+password');
        if (!user) {
            throw AppError_1.AppError.notFound('User not found');
        }
        if (user.password) {
            if (!currentPass) {
                throw AppError_1.AppError.badRequest('Current password is required');
            }
            const isMatch = await bcryptjs_1.default.compare(currentPass, user.password);
            if (!isMatch) {
                throw AppError_1.AppError.badRequest('Current password does not match');
            }
        }
        user.password = newPass;
        await user.save();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map