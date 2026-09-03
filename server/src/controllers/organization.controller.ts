import { Request, Response } from 'express';
import { OrganizationService } from '../services/organization.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class OrganizationController {
  static getOrg = catchAsync(async (req: Request, res: Response) => {
    const org = await OrganizationService.getOrganization(req.organizationId!);
    return ApiResponse.success(res, org);
  });

  static updateOrg = catchAsync(async (req: Request, res: Response) => {
    const org = await OrganizationService.updateOrganization(req.organizationId!, req.body);
    return ApiResponse.success(res, org, 'Organization updated successfully');
  });

  static getMembers = catchAsync(async (req: Request, res: Response) => {
    const members = await OrganizationService.getMembers(req.organizationId!);
    return ApiResponse.success(res, members);
  });

  static inviteMember = catchAsync(async (req: Request, res: Response) => {
    const member = await OrganizationService.inviteMember(req.organizationId!, req.body);
    return ApiResponse.created(res, member, 'Member invited successfully');
  });
}
