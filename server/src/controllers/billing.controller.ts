import { Request, Response } from 'express';
import { BillingService } from '../services/billing.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class BillingController {
  static getPlans = catchAsync(async (_req: Request, res: Response) => {
    const plans = BillingService.getPlans();
    return ApiResponse.success(res, plans);
  });

  static getCurrentSubscription = catchAsync(async (req: Request, res: Response) => {
    const data = await BillingService.getCurrentSubscription(req.organizationId!);
    return ApiResponse.success(res, data);
  });

  static changePlan = catchAsync(async (req: Request, res: Response) => {
    const result = await BillingService.changePlan(req.organizationId!, req.body.plan);
    return ApiResponse.success(res, result, result.message);
  });
}
