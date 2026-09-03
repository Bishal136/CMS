import { Request, Response } from 'express';
import { FeedService } from '../services/feed.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class FeedController {
  static listFeeds = catchAsync(async (req: Request, res: Response) => {
    const feeds = await FeedService.listFeeds(req.organizationId!);
    return ApiResponse.success(res, feeds);
  });

  static createFeed = catchAsync(async (req: Request, res: Response) => {
    const feed = await FeedService.createFeed(req.organizationId!, req.body);
    return ApiResponse.created(res, feed, 'Feed created successfully');
  });

  static deleteFeed = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedService.deleteFeed(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });

  static listFeedItems = catchAsync(async (req: Request, res: Response) => {
    const items = await FeedService.listFeedItems(
      req.organizationId!,
      req.query.feedId as string | undefined
    );
    return ApiResponse.success(res, items);
  });
}
