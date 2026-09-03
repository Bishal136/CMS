import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';
import { getPaginationOptions } from '../utils/pagination';

export class CommentController {
  static listComments = catchAsync(async (req: Request, res: Response) => {
    const pagination = getPaginationOptions(req.query.page, req.query.limit);
    const filter = {
      channelId: req.query.channelId as string | undefined,
      postId: req.query.postId as string | undefined,
      isRead: req.query.isRead ? req.query.isRead === 'true' : undefined,
    };

    const { comments, total } = await CommentService.listComments(
      req.organizationId!,
      filter,
      pagination
    );

    return ApiResponse.paginated(
      res,
      comments,
      pagination.page,
      pagination.limit,
      total,
      'Comments retrieved successfully'
    );
  });

  static replyToComment = catchAsync(async (req: Request, res: Response) => {
    const comment = await CommentService.replyToComment(
      req.params.id,
      req.organizationId!,
      req.body.content
    );
    return ApiResponse.success(res, comment, 'Replied to comment successfully');
  });

  static markAsRead = catchAsync(async (req: Request, res: Response) => {
    const comment = await CommentService.markAsRead(req.params.id, req.organizationId!);
    return ApiResponse.success(res, comment, 'Comment marked as read');
  });
}
