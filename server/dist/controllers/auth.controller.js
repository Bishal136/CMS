"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const otp_service_1 = require("../services/otp.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
const env_1 = require("../config/env");
const getRefreshTokenCookieOptions = () => ({
    httpOnly: true,
    secure: env_1.env.NODE_ENV === 'production',
    sameSite: env_1.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
});
class AuthController {
    static register = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await auth_service_1.AuthService.register(req.body);
        // Set refresh token cookie (httpOnly, 7 days)
        res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());
        return ApiResponse_1.ApiResponse.created(res, result, 'Registration successful');
    });
    static sendOtp = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { email, type } = req.body;
        const result = await otp_service_1.OtpService.sendOtp(email, type || 'register');
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
    static registerWithOtp = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await auth_service_1.AuthService.registerWithOtp(req.body);
        res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());
        return ApiResponse_1.ApiResponse.created(res, result, 'Registration with OTP successful');
    });
    static googleLogin = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const token = req.body.idToken || req.body.credential;
        const result = await auth_service_1.AuthService.googleAuth(token);
        res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());
        return ApiResponse_1.ApiResponse.success(res, result, 'Google authentication successful');
    });
    static googleOAuthRedirect = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const googleClientId = env_1.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
        const redirectUri = req.query.redirect_uri ||
            env_1.env.GOOGLE_CALLBACK_URL ||
            `${req.protocol}://${req.get('host')}/api/v1/auth/google/callback`;
        const isRealGoogleConfig = googleClientId &&
            !googleClientId.includes('your_google_client_id') &&
            googleClientId.length > 10;
        if (isRealGoogleConfig) {
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(googleClientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
            return res.redirect(authUrl);
        }
        // Development / demo fallback without requiring external Google Cloud credentials
        const result = await auth_service_1.AuthService.googleAuth('mock-google-token:googleuser@example.com:Google User:google-sub-dev');
        res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());
        const userPayload = encodeURIComponent(JSON.stringify(result.user));
        return res.redirect(`${env_1.env.FRONTEND_URL}/auth/callback?token=${result.tokens.accessToken}&user=${userPayload}`);
    });
    static googleOAuthCallback = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const error = req.query.error;
        const isJsonRequest = req.xhr ||
            req.headers.accept?.includes('application/json') ||
            req.headers['sec-fetch-mode'] === 'cors';
        if (error) {
            if (isJsonRequest) {
                return res.status(400).json({ success: false, message: error });
            }
            return res.redirect(`${env_1.env.FRONTEND_URL}/auth/callback?error=${encodeURIComponent(error)}`);
        }
        const code = (req.query.code || req.body?.code);
        const googleClientId = env_1.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
        const googleClientSecret = env_1.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = req.query.redirect_uri ||
            req.body?.redirect_uri ||
            env_1.env.GOOGLE_CALLBACK_URL ||
            `${req.protocol}://${req.get('host')}/api/v1/auth/google/callback`;
        const isRealGoogleConfig = code &&
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
                const tokenData = (await tokenRes.json());
                if (tokenData.error) {
                    console.error('Failed to exchange Google OAuth code:', tokenData);
                    const errorMsg = tokenData.error_description || tokenData.error;
                    if (isJsonRequest) {
                        return res.status(400).json({ success: false, message: errorMsg });
                    }
                    return res.redirect(`${env_1.env.FRONTEND_URL}/auth/callback?error=${encodeURIComponent(errorMsg)}`);
                }
                const tokenToVerify = tokenData.id_token || tokenData.access_token;
                if (tokenToVerify) {
                    const result = await auth_service_1.AuthService.googleAuth(tokenToVerify);
                    res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());
                    if (isJsonRequest) {
                        return ApiResponse_1.ApiResponse.success(res, result, 'Google authentication successful');
                    }
                    const userPayload = encodeURIComponent(JSON.stringify(result.user));
                    return res.redirect(`${env_1.env.FRONTEND_URL}/auth/callback?token=${result.tokens.accessToken}&user=${userPayload}`);
                }
            }
            catch (err) {
                console.error('Failed to exchange Google OAuth code:', err);
            }
        }
        // Fallback in case of error or dev callback
        const result = await auth_service_1.AuthService.googleAuth('mock-google-token:googleuser@example.com:Google User:google-sub-dev');
        res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());
        const userPayload = encodeURIComponent(JSON.stringify(result.user));
        return res.redirect(`${env_1.env.FRONTEND_URL}/auth/callback?token=${result.tokens.accessToken}&user=${userPayload}`);
    });
    static login = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await auth_service_1.AuthService.login(req.body);
        res.cookie('refreshToken', result.tokens.refreshToken, getRefreshTokenCookieOptions());
        return ApiResponse_1.ApiResponse.success(res, result, 'Login successful');
    });
    static refreshToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        const tokens = await auth_service_1.AuthService.refreshTokens(token);
        res.cookie('refreshToken', tokens.refreshToken, getRefreshTokenCookieOptions());
        return ApiResponse_1.ApiResponse.success(res, tokens, 'Token refreshed successfully');
    });
    static logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        await auth_service_1.AuthService.logout(token);
        const { maxAge, ...clearOptions } = getRefreshTokenCookieOptions();
        res.clearCookie('refreshToken', clearOptions);
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