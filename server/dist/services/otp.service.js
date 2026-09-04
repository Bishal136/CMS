"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Otp_model_1 = require("../models/Otp.model");
const User_model_1 = require("../models/User.model");
const AppError_1 = require("../utils/AppError");
const env_1 = require("../config/env");
class OtpService {
    /**
     * Generates a 6-digit numeric OTP and stores it with a 10-minute expiration.
     */
    static async sendOtp(email, type = 'register') {
        const cleanEmail = email.toLowerCase().trim();
        if (type === 'register') {
            const existingUser = await User_model_1.User.findOne({ email: cleanEmail });
            if (existingUser) {
                throw AppError_1.AppError.conflict('An account with this email already exists. Please log in.');
            }
        }
        // Generate 6-digit numeric OTP
        const otpCode = crypto_1.default.randomInt(100000, 1000000).toString();
        // Expiration: 10 minutes from now
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        // Save or replace existing OTP for this email and type
        await Otp_model_1.Otp.findOneAndUpdate({ email: cleanEmail, type }, {
            email: cleanEmail,
            otp: otpCode,
            type,
            expiresAt,
        }, { upsert: true, new: true });
        console.log(`\n📬 [OTP SERVICE] Code for ${cleanEmail} (${type}): ${otpCode} (Expires in 10m)\n`);
        // In a production environment with email configured, email would be dispatched here.
        return {
            message: `OTP sent successfully to ${cleanEmail}`,
            ...(env_1.env.NODE_ENV !== 'production' && { otp: otpCode }),
        };
    }
    /**
     * Verifies the OTP. If valid, deletes the OTP record to prevent reuse.
     */
    static async verifyOtp(email, otp, type = 'register') {
        const cleanEmail = email.toLowerCase().trim();
        const record = await Otp_model_1.Otp.findOne({
            email: cleanEmail,
            type,
        });
        if (!record) {
            throw AppError_1.AppError.badRequest('No OTP found or OTP has expired. Please request a new OTP.');
        }
        if (new Date() > record.expiresAt) {
            await Otp_model_1.Otp.deleteOne({ _id: record._id });
            throw AppError_1.AppError.badRequest('OTP has expired. Please request a new OTP.');
        }
        if (record.otp !== otp.trim()) {
            throw AppError_1.AppError.badRequest('Invalid OTP code. Please check and try again.');
        }
        // OTP is valid -> delete it so it cannot be used again
        await Otp_model_1.Otp.deleteOne({ _id: record._id });
        return true;
    }
}
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map