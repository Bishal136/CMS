"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const User_model_1 = require("../models/User.model");
const Organization_model_1 = require("../models/Organization.model");
const RefreshToken_model_1 = require("../models/RefreshToken.model");
const Subscription_model_1 = require("../models/Subscription.model");
const otp_service_1 = require("./otp.service");
const AppError_1 = require("../utils/AppError");
class AuthService {
    static generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, {
            expiresIn: '15m',
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: payload.userId }, env_1.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    static async register(data) {
        const existingUser = await User_model_1.User.findOne({ email: data.email.toLowerCase() });
        if (existingUser) {
            throw AppError_1.AppError.conflict('User with this email already exists');
        }
        // 1. Create default Organization
        const orgName = data.organizationName || `${data.name}'s Organization`;
        const org = new Organization_model_1.Organization({
            name: orgName,
            plan: 'free',
            channelLimit: 3,
            postLimitPerChannel: 10,
        });
        // 2. Create User (defaults to role: 'user')
        const userRole = data.role || 'user';
        const user = new User_model_1.User({
            name: data.name,
            email: data.email.toLowerCase(),
            password: data.password,
            role: userRole,
            organizationId: org._id,
            isVerified: true,
            authProvider: 'local',
        });
        org.ownerId = user._id;
        await org.save();
        await user.save();
        // 3. Create Subscription record
        await Subscription_model_1.Subscription.create({
            organizationId: org._id,
            plan: 'free',
            status: 'active',
        });
        // 4. Issue tokens
        const tokens = this.generateTokens({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            organizationId: org._id.toString(),
        });
        // Store RefreshToken with 7 day expiry
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await RefreshToken_model_1.RefreshToken.create({
            token: tokens.refreshToken,
            userId: user._id,
            expiresAt,
        });
        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                organizationId: org._id.toString(),
            },
            tokens,
            accessToken: tokens.accessToken,
        };
    }
    /**
     * Complete registration verified by a 6-digit OTP code.
     */
    static async registerWithOtp(data) {
        // 1. Verify OTP first (throws AppError if invalid/expired)
        await otp_service_1.OtpService.verifyOtp(data.email, data.otp, 'register');
        // 2. Register user
        return this.register({
            name: data.name,
            email: data.email,
            password: data.password,
            organizationName: data.organizationName,
        });
    }
    /**
     * Google OAuth Login / Signup.
     * Verifies Google token with Google's tokeninfo API, then provisions or logs in the user.
     */
    static async googleAuth(token) {
        let googleUser = null;
        // Handle mock tokens for dev and testing
        if (token.startsWith('mock-google-') || token.startsWith('mock-token-')) {
            const parts = token.split(':');
            const email = parts[1] || 'googleuser@example.com';
            const name = parts[2] || 'Google User';
            const sub = parts[3] || `google-sub-${Date.now()}`;
            googleUser = {
                sub,
                email,
                name,
                picture: 'https://lh3.googleusercontent.com/a/default-user',
                email_verified: true,
            };
        }
        else {
            let verified = false;
            // 1. Try Google tokeninfo endpoint (for ID token / JWT)
            try {
                const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
                const data = (await response.json());
                if (response.ok && data.email) {
                    googleUser = data;
                    verified = true;
                }
            }
            catch {
                // continue to try userinfo endpoint
            }
            // 2. Try Google userinfo endpoint (for OAuth access token, e.g., ya29...)
            if (!verified) {
                try {
                    const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const data = (await userinfoRes.json());
                    if (userinfoRes.ok && data.email) {
                        googleUser = {
                            sub: data.sub,
                            email: data.email,
                            name: data.name || data.email.split('@')[0],
                            picture: data.picture,
                            email_verified: data.email_verified,
                        };
                        verified = true;
                    }
                }
                catch {
                    // handled below
                }
            }
            if (!verified || !googleUser) {
                throw AppError_1.AppError.unauthorized('Invalid or expired Google authentication token');
            }
        }
        if (!googleUser) {
            throw AppError_1.AppError.unauthorized('Failed to obtain Google profile information');
        }
        const email = googleUser.email.toLowerCase().trim();
        // Find existing user by googleId or email
        let user = await User_model_1.User.findOne({
            $or: [{ googleId: googleUser.sub }, { email }],
        });
        let organizationId;
        if (!user) {
            // 1. New Google user -> provision organization
            const orgName = `${googleUser.name}'s Organization`;
            const org = new Organization_model_1.Organization({
                name: orgName,
                plan: 'free',
                channelLimit: 3,
                postLimitPerChannel: 10,
            });
            // 2. Create user with Google profile info
            user = new User_model_1.User({
                name: googleUser.name || 'Google User',
                email,
                googleId: googleUser.sub,
                authProvider: 'google',
                avatar: googleUser.picture || '',
                role: 'user',
                organizationId: org._id,
                isVerified: true,
            });
            org.ownerId = user._id;
            await org.save();
            await user.save();
            await Subscription_model_1.Subscription.create({
                organizationId: org._id,
                plan: 'free',
                status: 'active',
            });
            organizationId = org._id.toString();
        }
        else {
            // User exists -> update Google details if needed
            let changed = false;
            if (!user.googleId) {
                user.googleId = googleUser.sub;
                changed = true;
            }
            if (!user.avatar && googleUser.picture) {
                user.avatar = googleUser.picture;
                changed = true;
            }
            if (!user.isVerified) {
                user.isVerified = true;
                changed = true;
            }
            if (changed) {
                await user.save();
            }
            organizationId = user.organizationId.toString();
        }
        // Generate JWT tokens
        const tokens = this.generateTokens({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            organizationId,
        });
        // Store RefreshToken with 7 day expiry
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await RefreshToken_model_1.RefreshToken.create({
            token: tokens.refreshToken,
            userId: user._id,
            expiresAt,
        });
        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                organizationId,
            },
            tokens,
            accessToken: tokens.accessToken,
        };
    }
    static async login(data) {
        const user = await User_model_1.User.findOne({ email: data.email.toLowerCase() }).select('+password');
        if (!user || !user.password) {
            throw AppError_1.AppError.unauthorized('Invalid email or password');
        }
        const isMatch = await bcryptjs_1.default.compare(data.password || '', user.password);
        if (!isMatch) {
            throw AppError_1.AppError.unauthorized('Invalid email or password');
        }
        const tokens = this.generateTokens({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            organizationId: user.organizationId.toString(),
        });
        // Store RefreshToken with 7 day expiry
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await RefreshToken_model_1.RefreshToken.create({
            token: tokens.refreshToken,
            userId: user._id,
            expiresAt,
        });
        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                organizationId: user.organizationId.toString(),
            },
            tokens,
            accessToken: tokens.accessToken,
        };
    }
    static async refreshTokens(currentRefreshToken) {
        if (!currentRefreshToken) {
            throw AppError_1.AppError.unauthorized('Refresh token is required');
        }
        const storedToken = await RefreshToken_model_1.RefreshToken.findOne({
            token: currentRefreshToken,
            isRevoked: false,
        });
        if (!storedToken) {
            throw AppError_1.AppError.unauthorized('Invalid or revoked refresh token');
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(currentRefreshToken, env_1.env.JWT_REFRESH_SECRET);
        }
        catch {
            await RefreshToken_model_1.RefreshToken.deleteOne({ _id: storedToken._id });
            throw AppError_1.AppError.unauthorized('Expired refresh token');
        }
        const user = await User_model_1.User.findById(decoded.userId);
        if (!user) {
            throw AppError_1.AppError.unauthorized('User not found');
        }
        // Revoke old refresh token (Token rotation)
        storedToken.isRevoked = true;
        await storedToken.save();
        // Generate new pair
        const tokens = this.generateTokens({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            organizationId: user.organizationId.toString(),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await RefreshToken_model_1.RefreshToken.create({
            token: tokens.refreshToken,
            userId: user._id,
            expiresAt,
        });
        return tokens;
    }
    static async logout(refreshToken) {
        if (refreshToken) {
            await RefreshToken_model_1.RefreshToken.deleteOne({ token: refreshToken });
        }
    }
    static async forgotPassword(email) {
        const user = await User_model_1.User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return { message: 'If this email is registered, a password reset link has been sent.' };
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();
        return { message: 'If this email is registered, a password reset link has been sent.' };
    }
    static async resetPassword(token, newPass) {
        const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
        const user = await User_model_1.User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() },
        }).select('+password +resetPasswordToken +resetPasswordExpires');
        if (!user) {
            throw AppError_1.AppError.badRequest('Password reset token is invalid or has expired');
        }
        user.password = newPass;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map