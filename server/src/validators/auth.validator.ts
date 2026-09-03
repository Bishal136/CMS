import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    organizationName: z.string().min(2, 'Organization name must be at least 2 characters').optional(),
  }),
});

export const sendOtpSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    type: z.enum(['register', 'reset-password', 'login']).optional(),
  }),
});

export const registerWithOtpSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    otp: z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit number'),
    organizationName: z.string().min(2, 'Organization name must be at least 2 characters').optional(),
  }),
});

export const googleLoginSchema = z.object({
  body: z.object({
    idToken: z.string().min(1, 'Google ID token or credential is required').optional(),
    credential: z.string().min(1, 'Google credential is required').optional(),
  }).refine((data) => data.idToken || data.credential, {
    message: 'Either idToken or credential must be provided',
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
  params: z.object({
    token: z.string().min(1, 'Reset token is required'),
  }),
});

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  }),
});
