import { Request, Response } from 'express';
import { ChannelService } from '../services/channel.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class ChannelController {
  static listChannels = catchAsync(async (req: Request, res: Response) => {
    const channels = await ChannelService.listChannels(req.organizationId!);
    return ApiResponse.success(res, channels);
  });

  static getChannel = catchAsync(async (req: Request, res: Response) => {
    const channel = await ChannelService.getChannel(req.params.id, req.organizationId!);
    return ApiResponse.success(res, channel);
  });

  static connectChannel = catchAsync(async (req: Request, res: Response) => {
    const channel = await ChannelService.connectChannel(req.organizationId!, req.body);
    return ApiResponse.created(res, channel, 'Channel connected successfully');
  });

  static disconnectChannel = catchAsync(async (req: Request, res: Response) => {
    const result = await ChannelService.disconnectChannel(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });

  static updateSchedule = catchAsync(async (req: Request, res: Response) => {
    const channel = await ChannelService.updatePostingSchedule(
      req.params.id,
      req.organizationId!,
      req.body.postingSchedule
    );
    return ApiResponse.success(res, channel, 'Schedule updated successfully');
  });
}
