import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authRateLimiter } from '../middleware/rate-limit.middleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  sendOtpSchema,
  registerWithOtpSchema,
  googleLoginSchema,
} from '../validators/auth.validator';

const router = Router();

// Standard Registration & Login
router.post('/register', authRateLimiter, validate(registerSchema), AuthController.register);
router.post('/login', authRateLimiter, validate(loginSchema), AuthController.login);

// OTP-Based Registration
router.post('/send-otp', authRateLimiter, validate(sendOtpSchema), AuthController.sendOtp);
router.post('/register-otp', authRateLimiter, validate(registerWithOtpSchema), AuthController.registerWithOtp);

// Google OAuth Login / Registration
router.post('/google', authRateLimiter, validate(googleLoginSchema), AuthController.googleLogin);

// Token Management & Passwords
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', authRateLimiter, validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password/:token', authRateLimiter, validate(resetPasswordSchema), AuthController.resetPassword);

export const authRoutes = router;
