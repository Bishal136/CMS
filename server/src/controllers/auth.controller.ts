import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { OtpService } from '../services/otp.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';
import { env } from '../config/env';

export class AuthController {
  static register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);

    // Set refresh token cookie (httpOnly, 7 days)
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ApiResponse.created(res, result, 'Registration successful');
  });

  static sendOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, type } = req.body;
    const result = await OtpService.sendOtp(email, type || 'register');
    return ApiResponse.success(res, result, result.message);
  });

  static registerWithOtp = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerWithOtp(req.body);

    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ApiResponse.created(res, result, 'Registration with OTP successful');
  });

  static googleLogin = catchAsync(async (req: Request, res: Response) => {
    const token = req.body.idToken || req.body.credential;
    const result = await AuthService.googleAuth(token);

    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ApiResponse.success(res, result, 'Google authentication successful');
  });

  static login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ApiResponse.success(res, result, 'Login successful');
  });

  static refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const tokens = await AuthService.refreshTokens(token);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ApiResponse.success(res, tokens, 'Token refreshed successfully');
  });

  static logout = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    await AuthService.logout(token);

    res.clearCookie('refreshToken');
    return ApiResponse.success(res, null, 'Logged out successfully');
  });

  static forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.forgotPassword(req.body.email);
    return ApiResponse.success(res, result, result.message);
  });

  static resetPassword = catchAsync(async (req: Request, res: Response) => {
    await AuthService.resetPassword(req.params.token, req.body.password);
    return ApiResponse.success(res, null, 'Password reset successful. You can now log in.');
  });
}
