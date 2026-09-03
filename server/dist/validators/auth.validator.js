"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.googleLoginSchema = exports.registerWithOtpSchema = exports.sendOtpSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
        organizationName: zod_1.z.string().min(2, 'Organization name must be at least 2 characters').optional(),
    }),
});
exports.sendOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        type: zod_1.z.enum(['register', 'reset-password', 'login']).optional(),
    }),
});
exports.registerWithOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
        otp: zod_1.z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit number'),
        organizationName: zod_1.z.string().min(2, 'Organization name must be at least 2 characters').optional(),
    }),
});
exports.googleLoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        idToken: zod_1.z.string().min(1, 'Google ID token or credential is required').optional(),
        credential: zod_1.z.string().min(1, 'Google credential is required').optional(),
    }).refine((data) => data.idToken || data.credential, {
        message: 'Either idToken or credential must be provided',
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(1, 'Password is required'),
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    }),
    params: zod_1.z.object({
        token: zod_1.z.string().min(1, 'Reset token is required'),
    }),
});
exports.updatePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string().min(1, 'Current password is required'),
        newPassword: zod_1.z.string().min(8, 'New password must be at least 8 characters'),
    }),
});
//# sourceMappingURL=auth.validator.js.map