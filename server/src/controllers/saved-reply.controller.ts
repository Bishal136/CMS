import { Request, Response } from 'express';
import { SavedReplyService } from '../services/saved-reply.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class SavedReplyController {
  static listReplies = catchAsync(async (req: Request, res: Response) => {
    const replies = await SavedReplyService.listReplies(req.organizationId!);
    return ApiResponse.success(res, replies);
  });

  static createReply = catchAsync(async (req: Request, res: Response) => {
    const reply = await SavedReplyService.createReply(
      req.user!._id.toString(),
      req.organizationId!,
      req.body
    );
    return ApiResponse.created(res, reply, 'Saved reply created successfully');
  });

  static updateReply = catchAsync(async (req: Request, res: Response) => {
    const reply = await SavedReplyService.updateReply(
      req.params.id,
      req.organizationId!,
      req.body
    );
    return ApiResponse.success(res, reply, 'Saved reply updated successfully');
  });

  static deleteReply = catchAsync(async (req: Request, res: Response) => {
    const result = await SavedReplyService.deleteReply(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });
}
