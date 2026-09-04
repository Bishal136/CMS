import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class UserController {
  static getProfile = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.getProfile(req.user!._id.toString());
    return ApiResponse.success(res, user);
  });

  static updateProfile = catchAsync(async (req: Request, res: Response) => {
    const updated = await UserService.updateProfile(req.user!._id.toString(), req.body);
    return ApiResponse.success(res, updated, 'Profile updated successfully');
  });

  static updatePassword = catchAsync(async (req: Request, res: Response) => {
    await UserService.updatePassword(
      req.user!._id.toString(),
      req.body.currentPassword,
      req.body.newPassword
    );
    return ApiResponse.success(res, null, 'Password changed successfully');
  });

  static resendVerification = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.resendVerification(req.user!._id.toString());
    return ApiResponse.success(res, result, 'Verification email sent successfully');
  });
}
