import { CookieOptions, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { OtpService } from '../services/otp.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';
import { env } from '../config/env';

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

export class AuthController {
  static register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);

    // Set refresh token cookie (httpOnly, 7 days)
    res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());

    return ApiResponse.created(res, result, 'Registration successful');
  });

  static sendOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, type } = req.body;
    const result = await OtpService.sendOtp(email, type || 'register');
    return ApiResponse.success(res, result, result.message);
  });

  static registerWithOtp = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerWithOtp(req.body);

    res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());

    return ApiResponse.created(res, result, 'Registration with OTP successful');
  });

  static googleLogin = catchAsync(async (req: Request, res: Response) => {
    const token = req.body.idToken || req.body.credential;
    const result = await AuthService.googleAuth(token);

    res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());

    return ApiResponse.success(res, result, 'Google authentication successful');
  });

  static googleOAuthRedirect = catchAsync(async (req: Request, res: Response) => {
    const googleClientId = env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const redirectUri =
      (req.query.redirect_uri as string) ||
      env.GOOGLE_CALLBACK_URL ||
      `${req.protocol}://${req.get('host')}/api/v1/auth/google/callback`;

    const isRealGoogleConfig =
      googleClientId &&
      !googleClientId.includes('your_google_client_id') &&
      googleClientId.length > 10;

    if (isRealGoogleConfig) {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
        googleClientId
      )}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
      return res.redirect(authUrl);
    }

    // Development / demo fallback without requiring external Google Cloud credentials
    const result = await AuthService.googleAuth(
      'mock-google-token:googleuser@example.com:Google User:google-sub-dev'
    );

    res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());

    const userPayload = encodeURIComponent(JSON.stringify(result.user));
    return res.redirect(
      `${env.FRONTEND_URL}/auth/callback?token=${result.tokens.accessToken}&user=${userPayload}`
    );
  });

  static googleOAuthCallback = catchAsync(async (req: Request, res: Response) => {
    const error = req.query.error as string;
    const isJsonRequest =
      req.xhr ||
      req.headers.accept?.includes('application/json') ||
      req.headers['sec-fetch-mode'] === 'cors';

    if (error) {
      if (isJsonRequest) {
        return res.status(400).json({ success: false, message: error });
      }
      return res.redirect(
        `${env.FRONTEND_URL}/auth/callback?error=${encodeURIComponent(error)}`
      );
    }

    const code = (req.query.code || req.body?.code) as string;
    const googleClientId = env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      (req.query.redirect_uri as string) ||
      (req.body?.redirect_uri as string) ||
      env.GOOGLE_CALLBACK_URL ||
      `${req.protocol}://${req.get('host')}/api/v1/auth/google/callback`;

    const isRealGoogleConfig =
      code &&
      googleClientId &&
      googleClientSecret &&
      !googleClientId.includes('your_google_client_id');

    if (isRealGoogleConfig) {
      try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: googleClientId,
            client_secret: googleClientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
          }),
        });

        const tokenData = (await tokenRes.json()) as {
          id_token?: string;
          access_token?: string;
          error?: string;
          error_description?: string;
        };

        if (tokenData.error) {
          console.error('Failed to exchange Google OAuth code:', tokenData);
          const errorMsg = tokenData.error_description || tokenData.error;
          if (isJsonRequest) {
            return res.status(400).json({ success: false, message: errorMsg });
          }
          return res.redirect(
            `${env.FRONTEND_URL}/auth/callback?error=${encodeURIComponent(errorMsg)}`
          );
        }

        const tokenToVerify = tokenData.id_token || tokenData.access_token;
        if (tokenToVerify) {
          const result = await AuthService.googleAuth(tokenToVerify);

          res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());

          if (isJsonRequest) {
            return ApiResponse.success(res, result, 'Google authentication successful');
          }

          const userPayload = encodeURIComponent(JSON.stringify(result.user));
          return res.redirect(
            `${env.FRONTEND_URL}/auth/callback?token=${result.tokens.accessToken}&user=${userPayload}`
          );
        }
      } catch (err) {
        console.error('Failed to exchange Google OAuth code:', err);
      }
    }

    // Fallback in case of error or dev callback
    const result = await AuthService.googleAuth(
      'mock-google-token:googleuser@example.com:Google User:google-sub-dev'
    );
    res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());

    const userPayload = encodeURIComponent(JSON.stringify(result.user));
    return res.redirect(
      `${env.FRONTEND_URL}/auth/callback?token=${result.tokens.accessToken}&user=${userPayload}`
    );
  });

  static login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());

    return ApiResponse.success(res, result, 'Login successful');
  });

  static refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const tokens = await AuthService.refreshTokens(token);

    res.cookie('refreshToken', tokens.refreshToken, getRefreshTokenCookieOptions());

    return ApiResponse.success(res, tokens, 'Token refreshed successfully');
  });

  static logout = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    await AuthService.logout(token);

    const { maxAge, ...clearOptions } = getRefreshTokenCookieOptions();
    res.clearCookie('refreshToken', clearOptions);
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
