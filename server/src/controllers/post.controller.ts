import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';
import { getPaginationOptions } from '../utils/pagination';

export class PostController {
  static createPost = catchAsync(async (req: Request, res: Response) => {
    const post = await PostService.createPost(
      req.user!._id.toString(),
      req.organizationId!,
      req.body
    );
    return ApiResponse.created(res, post, 'Post created successfully');
  });

  static listPosts = catchAsync(async (req: Request, res: Response) => {
    const pagination = getPaginationOptions(req.query.page, req.query.limit);
    const filter = {
      status: req.query.status as string | undefined,
      channelId: req.query.channelId as string | undefined,
      tagId: req.query.tagId as string | undefined,
      startDate: req.query.startDate as string | undefined,
      endDate: req.query.endDate as string | undefined,
    };

    const { posts, total } = await PostService.listPosts(
      req.organizationId!,
      filter,
      pagination
    );

    return ApiResponse.paginated(
      res,
      posts,
      pagination.page,
      pagination.limit,
      total,
      'Posts retrieved successfully'
    );
  });

  static getPostCounts = catchAsync(async (req: Request, res: Response) => {
    const counts = await PostService.getPostCounts(req.organizationId!);
    return ApiResponse.success(res, counts, 'Post counts retrieved successfully');
  });

  static getPost = catchAsync(async (req: Request, res: Response) => {
    const post = await PostService.getPost(req.params.id, req.organizationId!);
    return ApiResponse.success(res, post);
  });

  static updatePost = catchAsync(async (req: Request, res: Response) => {
    const post = await PostService.updatePost(
      req.params.id,
      req.organizationId!,
      req.body
    );
    return ApiResponse.success(res, post, 'Post updated successfully');
  });

  static deletePost = catchAsync(async (req: Request, res: Response) => {
    const result = await PostService.deletePost(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });

  static publishNow = catchAsync(async (req: Request, res: Response) => {
    const post = await PostService.publishNow(req.params.id, req.organizationId!);
    return ApiResponse.success(res, post, 'Post published successfully');
  });

  static submitApproval = catchAsync(async (req: Request, res: Response) => {
    const post = await PostService.submitForApproval(
      req.params.id,
      req.organizationId!,
      { id: req.user!._id.toString(), name: req.user!.name }
    );
    return ApiResponse.success(res, post, 'Post submitted for approval');
  });

  static reviewApproval = catchAsync(async (req: Request, res: Response) => {
    const { action, note, rejectionReason } = req.body;
    const post = await PostService.reviewApproval(
      req.params.id,
      req.organizationId!,
      { id: req.user!._id.toString(), name: req.user!.name },
      action,
      note,
      rejectionReason
    );
    return ApiResponse.success(res, post, `Post ${action}d successfully`);
  });
}
