import { Request, Response } from 'express';
import { TemplateService } from '../services/template.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class TemplateController {
  static listTemplates = catchAsync(async (req: Request, res: Response) => {
    const filter = {
      category: req.query.category as string | undefined,
      isPersonal: req.query.isPersonal ? req.query.isPersonal === 'true' : undefined,
    };
    const templates = await TemplateService.listTemplates(req.organizationId!, filter);
    return ApiResponse.success(res, templates);
  });

  static listDiscover = catchAsync(async (_req: Request, res: Response) => {
    const templates = await TemplateService.listDiscoverTemplates();
    return ApiResponse.success(res, templates);
  });

  static createTemplate = catchAsync(async (req: Request, res: Response) => {
    const template = await TemplateService.createTemplate(
      req.user!._id.toString(),
      req.organizationId!,
      req.body
    );
    return ApiResponse.created(res, template, 'Template created successfully');
  });

  static updateTemplate = catchAsync(async (req: Request, res: Response) => {
    const template = await TemplateService.updateTemplate(
      req.params.id,
      req.organizationId!,
      req.body
    );
    return ApiResponse.success(res, template, 'Template updated successfully');
  });

  static deleteTemplate = catchAsync(async (req: Request, res: Response) => {
    const result = await TemplateService.deleteTemplate(req.params.id, req.organizationId!);
    return ApiResponse.success(res, result, result.message);
  });
}
