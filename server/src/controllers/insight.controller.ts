import { Request, Response } from 'express';
import { InsightService } from '../services/insight.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class InsightController {
  static getSummary = catchAsync(async (req: Request, res: Response) => {
    const summary = await InsightService.getSummary(req.organizationId!);
    return ApiResponse.success(res, summary);
  });

  static getTopPosts = catchAsync(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 5;
    const topPosts = await InsightService.getTopPosts(req.organizationId!, limit);
    return ApiResponse.success(res, topPosts);
  });

  static getPostInsights = catchAsync(async (req: Request, res: Response) => {
    const filter = {
      channelId: req.query.channelId as string | undefined,
      startDate: req.query.startDate as string | undefined,
      endDate: req.query.endDate as string | undefined,
    };
    const insights = await InsightService.getPostInsights(req.organizationId!, filter);
    return ApiResponse.success(res, insights);
  });
}
