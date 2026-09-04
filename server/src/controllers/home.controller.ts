import { Request, Response } from 'express';
import { HomeService } from '../services/home.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class HomeController {
  static getHomeDashboard = catchAsync(async (req: Request, res: Response) => {
    const data = await HomeService.getHomeDashboard(
      req.user!._id.toString(),
      req.organizationId!
    );
    return ApiResponse.success(res, data, 'Home dashboard data retrieved successfully');
  });

  static getHomeStats = catchAsync(async (req: Request, res: Response) => {
    const data = await HomeService.getHomeDashboard(
      req.user!._id.toString(),
      req.organizationId!
    );
    return ApiResponse.success(res, data.stats, 'Home stats retrieved successfully');
  });
}
