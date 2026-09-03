"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class UserController {
    static getProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const user = await user_service_1.UserService.getProfile(req.user._id.toString());
        return ApiResponse_1.ApiResponse.success(res, user);
    });
    static updateProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const updated = await user_service_1.UserService.updateProfile(req.user._id.toString(), req.body);
        return ApiResponse_1.ApiResponse.success(res, updated, 'Profile updated successfully');
    });
    static updatePassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
        await user_service_1.UserService.updatePassword(req.user._id.toString(), req.body.currentPassword, req.body.newPassword);
        return ApiResponse_1.ApiResponse.success(res, null, 'Password changed successfully');
    });
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map