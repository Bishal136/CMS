import crypto from 'crypto';
import { Otp } from '../models/Otp.model';
import { User } from '../models/User.model';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export class OtpService {
  /**
   * Generates a 6-digit numeric OTP and stores it with a 10-minute expiration.
   */
  static async sendOtp(
    email: string,
    type: 'register' | 'reset-password' | 'login' = 'register'
  ): Promise<{ message: string; otp?: string }> {
    const cleanEmail = email.toLowerCase().trim();

    if (type === 'register') {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        throw AppError.conflict('An account with this email already exists. Please log in.');
      }
    }

    // Generate 6-digit numeric OTP
    const otpCode = crypto.randomInt(100000, 1000000).toString();

    // Expiration: 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save or replace existing OTP for this email and type
    await Otp.findOneAndUpdate(
      { email: cleanEmail, type },
      {
        email: cleanEmail,
        otp: otpCode,
        type,
        expiresAt,
      },
      { upsert: true, new: true }
    );

    console.log(`\n📬 [OTP SERVICE] Code for ${cleanEmail} (${type}): ${otpCode} (Expires in 10m)\n`);

    // In a production environment with email configured, email would be dispatched here.
    return {
      message: `OTP sent successfully to ${cleanEmail}`,
      ...(env.NODE_ENV !== 'production' && { otp: otpCode }),
    };
  }

  /**
   * Verifies the OTP. If valid, deletes the OTP record to prevent reuse.
   */
  static async verifyOtp(
    email: string,
    otp: string,
    type: 'register' | 'reset-password' | 'login' = 'register'
  ): Promise<boolean> {
    const cleanEmail = email.toLowerCase().trim();

    const record = await Otp.findOne({
      email: cleanEmail,
      type,
    });

    if (!record) {
      throw AppError.badRequest('No OTP found or OTP has expired. Please request a new OTP.');
    }

    if (new Date() > record.expiresAt) {
      await Otp.deleteOne({ _id: record._id });
      throw AppError.badRequest('OTP has expired. Please request a new OTP.');
    }

    if (record.otp !== otp.trim()) {
      throw AppError.badRequest('Invalid OTP code. Please check and try again.');
    }

    // OTP is valid -> delete it so it cannot be used again
    await Otp.deleteOne({ _id: record._id });
    return true;
  }
}
