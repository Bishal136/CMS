"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const User_model_1 = require("../models/User.model");
const AppError_1 = require("../utils/AppError");
async function authenticate(req, _res, next) {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        else if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }
        if (!token) {
            return next(AppError_1.AppError.unauthorized('Authentication required. Please log in.'));
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        }
        catch {
            return next(AppError_1.AppError.unauthorized('Invalid or expired token. Please log in again.'));
        }
        const user = await User_model_1.User.findById(decoded.userId);
        if (!user) {
            return next(AppError_1.AppError.unauthorized('User associated with this token no longer exists.'));
        }
        req.user = user;
        req.organizationId = user.organizationId.toString();
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=auth.middleware.js.map