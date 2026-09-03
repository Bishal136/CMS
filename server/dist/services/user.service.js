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
        if (data.name)
            user.name = data.name;
        if (data.avatar !== undefined)
            user.avatar = data.avatar;
        if (data.preferences) {
            user.preferences = {
                ...user.preferences,
                ...data.preferences,
            };
        }
        await user.save();
        return user;
    }
    static async updatePassword(userId, currentPass, newPass) {
        const user = await User_model_1.User.findById(userId).select('+password');
        if (!user || !user.password) {
            throw AppError_1.AppError.notFound('User not found');
        }
        const isMatch = await bcryptjs_1.default.compare(currentPass, user.password);
        if (!isMatch) {
            throw AppError_1.AppError.badRequest('Current password does not match');
        }
        user.password = newPass;
        await user.save();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map