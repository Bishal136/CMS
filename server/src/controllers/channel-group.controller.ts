import { Request, Response } from 'express';
import { ChannelGroupService } from '../services/channel-group.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class ChannelGroupController {
  static listGroups = catchAsync(async (req: Request, res: Response) => {
    const groups = await ChannelGroupService.listGroups(req.organizationId!);
    return ApiResponse.success(res, groups);
  });

  static createGroup = catchAsync(async (req: Request, res: Response) => {
    const group = await ChannelGroupService.createGroup(req.organizationId!, req.body);
    return ApiResponse.created(res, group, 'Channel group created successfully');
  });

  static updateGroup = catchAsync(async (req: Request, res: Response) => {
    const group = await ChannelGroupService.updateGroup(
      req.params.id,
      req.organizationId!,
      req.body
    );
    return ApiResponse.success(res, group, 'Channel group updated successfully');
  });

  static deleteGroup = catchAsync(async (req: Request, res: Response) => {
    const result = await ChannelGroupService.deleteGroup(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });
}
