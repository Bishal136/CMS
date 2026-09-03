"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGroupController = void 0;
const channel_group_service_1 = require("../services/channel-group.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class ChannelGroupController {
    static listGroups = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const groups = await channel_group_service_1.ChannelGroupService.listGroups(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, groups);
    });
    static createGroup = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const group = await channel_group_service_1.ChannelGroupService.createGroup(req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, group, 'Channel group created successfully');
    });
    static updateGroup = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const group = await channel_group_service_1.ChannelGroupService.updateGroup(req.params.id, req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.success(res, group, 'Channel group updated successfully');
    });
    static deleteGroup = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await channel_group_service_1.ChannelGroupService.deleteGroup(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
}
exports.ChannelGroupController = ChannelGroupController;
//# sourceMappingURL=channel-group.controller.js.map