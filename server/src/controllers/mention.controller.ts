import { Request, Response } from 'express';
import { MentionService } from '../services/mention.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';
import { getPaginationOptions } from '../utils/pagination';

export class MentionController {
  static listMentions = catchAsync(async (req: Request, res: Response) => {
    const pagination = getPaginationOptions(req.query.page, req.query.limit);
    const filter = {
      channelId: req.query.channelId as string | undefined,
      isRead: req.query.isRead ? req.query.isRead === 'true' : undefined,
    };

    const { mentions, total } = await MentionService.listMentions(
      req.organizationId!,
      filter,
      pagination
    );

    return ApiResponse.paginated(
      res,
      mentions,
      pagination.page,
      pagination.limit,
      total,
      'Mentions retrieved successfully'
    );
  });

  static markAsRead = catchAsync(async (req: Request, res: Response) => {
    const mention = await MentionService.markAsRead(req.params.id, req.organizationId!);
    return ApiResponse.success(res, mention, 'Mention marked as read');
  });
}
