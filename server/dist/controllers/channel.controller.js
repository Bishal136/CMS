"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelController = void 0;
const channel_service_1 = require("../services/channel.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class ChannelController {
    static listChannels = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const channels = await channel_service_1.ChannelService.listChannels(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, channels);
    });
    static getChannel = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const channel = await channel_service_1.ChannelService.getChannel(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, channel);
    });
    static connectChannel = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const channel = await channel_service_1.ChannelService.connectChannel(req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, channel, 'Channel connected successfully');
    });
    static disconnectChannel = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await channel_service_1.ChannelService.disconnectChannel(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
    static updateSchedule = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const channel = await channel_service_1.ChannelService.updatePostingSchedule(req.params.id, req.organizationId, req.body.postingSchedule);
        return ApiResponse_1.ApiResponse.success(res, channel, 'Schedule updated successfully');
    });
}
exports.ChannelController = ChannelController;
//# sourceMappingURL=channel.controller.js.map