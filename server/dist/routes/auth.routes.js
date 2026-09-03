"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const rate_limit_middleware_1 = require("../middleware/rate-limit.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
// Standard Registration & Login
router.post('/register', rate_limit_middleware_1.authRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.registerSchema), auth_controller_1.AuthController.register);
router.post('/login', rate_limit_middleware_1.authRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.AuthController.login);
// OTP-Based Registration
router.post('/send-otp', rate_limit_middleware_1.authRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.sendOtpSchema), auth_controller_1.AuthController.sendOtp);
router.post('/register-otp', rate_limit_middleware_1.authRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.registerWithOtpSchema), auth_controller_1.AuthController.registerWithOtp);
// Google OAuth Login / Registration
router.post('/google', rate_limit_middleware_1.authRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.googleLoginSchema), auth_controller_1.AuthController.googleLogin);
// Token Management & Passwords
router.post('/refresh', auth_controller_1.AuthController.refreshToken);
router.post('/logout', auth_controller_1.AuthController.logout);
router.post('/forgot-password', rate_limit_middleware_1.authRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.forgotPasswordSchema), auth_controller_1.AuthController.forgotPassword);
router.post('/reset-password/:token', rate_limit_middleware_1.authRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.resetPasswordSchema), auth_controller_1.AuthController.resetPassword);
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map