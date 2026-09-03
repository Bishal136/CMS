import { Request, Response } from 'express';
import { TagService } from '../services/tag.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class TagController {
  static listTags = catchAsync(async (req: Request, res: Response) => {
    const tags = await TagService.listTags(req.organizationId!);
    return ApiResponse.success(res, tags);
  });

  static createTag = catchAsync(async (req: Request, res: Response) => {
    const tag = await TagService.createTag(req.organizationId!, req.body.name, req.body.color);
    return ApiResponse.created(res, tag, 'Tag created successfully');
  });

  static updateTag = catchAsync(async (req: Request, res: Response) => {
    const tag = await TagService.updateTag(req.params.id, req.organizationId!, req.body);
    return ApiResponse.success(res, tag, 'Tag updated successfully');
  });

  static deleteTag = catchAsync(async (req: Request, res: Response) => {
    const result = await TagService.deleteTag(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });
}
