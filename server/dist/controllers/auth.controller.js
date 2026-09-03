"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const otp_service_1 = require("../services/otp.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
const env_1 = require("../config/env");
class AuthController {
    static register = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await auth_service_1.AuthService.register(req.body);
        // Set refresh token cookie (httpOnly, 7 days)
        res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return ApiResponse_1.ApiResponse.created(res, result, 'Registration successful');
    });
    static sendOtp = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { email, type } = req.body;
        const result = await otp_service_1.OtpService.sendOtp(email, type || 'register');
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
    static registerWithOtp = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await auth_service_1.AuthService.registerWithOtp(req.body);
        res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return ApiResponse_1.ApiResponse.created(res, result, 'Registration with OTP successful');
    });
    static googleLogin = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const token = req.body.idToken || req.body.credential;
        const result = await auth_service_1.AuthService.googleAuth(token);
        res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return ApiResponse_1.ApiResponse.success(res, result, 'Google authentication successful');
    });
    static login = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await auth_service_1.AuthService.login(req.body);
        res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return ApiResponse_1.ApiResponse.success(res, result, 'Login successful');
    });
    static refreshToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        const tokens = await auth_service_1.AuthService.refreshTokens(token);
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return ApiResponse_1.ApiResponse.success(res, tokens, 'Token refreshed successfully');
    });
    static logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        await auth_service_1.AuthService.logout(token);
        res.clearCookie('refreshToken');
        return ApiResponse_1.ApiResponse.success(res, null, 'Logged out successfully');
    });
    static forgotPassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await auth_service_1.AuthService.forgotPassword(req.body.email);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
    static resetPassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
        await auth_service_1.AuthService.resetPassword(req.params.token, req.body.password);
        return ApiResponse_1.ApiResponse.success(res, null, 'Password reset successful. You can now log in.');
    });
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map