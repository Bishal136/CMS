import { Request, Response } from 'express';
import { IdeaService } from '../services/idea.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class IdeaController {
  static listIdeas = catchAsync(async (req: Request, res: Response) => {
    const data = await IdeaService.listIdeas(req.organizationId!);
    return ApiResponse.success(res, data);
  });

  static createIdea = catchAsync(async (req: Request, res: Response) => {
    const idea = await IdeaService.createIdea(
      req.user!._id.toString(),
      req.organizationId!,
      req.body
    );
    return ApiResponse.created(res, idea, 'Idea created successfully');
  });

  static updateIdea = catchAsync(async (req: Request, res: Response) => {
    const idea = await IdeaService.updateIdea(
      req.params.id,
      req.organizationId!,
      req.body
    );
    return ApiResponse.success(res, idea, 'Idea updated successfully');
  });

  static deleteIdea = catchAsync(async (req: Request, res: Response) => {
    const result = await IdeaService.deleteIdea(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });

  static createGroup = catchAsync(async (req: Request, res: Response) => {
    const group = await IdeaService.createGroup(req.organizationId!, req.body.name);
    return ApiResponse.created(res, group, 'Group created successfully');
  });
}
