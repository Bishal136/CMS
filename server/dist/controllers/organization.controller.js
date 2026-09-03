"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const organization_service_1 = require("../services/organization.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class OrganizationController {
    static getOrg = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const org = await organization_service_1.OrganizationService.getOrganization(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, org);
    });
    static updateOrg = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const org = await organization_service_1.OrganizationService.updateOrganization(req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.success(res, org, 'Organization updated successfully');
    });
    static getMembers = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const members = await organization_service_1.OrganizationService.getMembers(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, members);
    });
    static inviteMember = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const member = await organization_service_1.OrganizationService.inviteMember(req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, member, 'Member invited successfully');
    });
}
exports.OrganizationController = OrganizationController;
//# sourceMappingURL=organization.controller.js.map