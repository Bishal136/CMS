"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGroupService = void 0;
const ChannelGroup_model_1 = require("../models/ChannelGroup.model");
const Organization_model_1 = require("../models/Organization.model");
const AppError_1 = require("../utils/AppError");
class ChannelGroupService {
    static async listGroups(organizationId) {
        return ChannelGroup_model_1.ChannelGroup.find({ organizationId }).populate('channelIds', 'platform profile');
    }
    static async createGroup(organizationId, data) {
        const org = await Organization_model_1.Organization.findById(organizationId);
        if (!org) {
            throw AppError_1.AppError.notFound('Organization not found');
        }
        if (org.plan !== 'team') {
            throw AppError_1.AppError.forbidden('Channel groups is a premium feature available on the Team plan.');
        }
        return ChannelGroup_model_1.ChannelGroup.create({
            name: data.name,
            channelIds: data.channelIds,
            organizationId,
        });
    }
    static async updateGroup(groupId, organizationId, data) {
        const group = await ChannelGroup_model_1.ChannelGroup.findOne({ _id: groupId, organizationId });
        if (!group) {
            throw AppError_1.AppError.notFound('Channel group not found');
        }
        if (data.name)
            group.name = data.name;
        if (data.channelIds)
            group.channelIds = data.channelIds;
        await group.save();
        return group;
    }
    static async deleteGroup(groupId, organizationId) {
        const group = await ChannelGroup_model_1.ChannelGroup.findOneAndDelete({ _id: groupId, organizationId });
        if (!group) {
            throw AppError_1.AppError.notFound('Channel group not found');
        }
        return { message: 'Channel group deleted successfully' };
    }
}
exports.ChannelGroupService = ChannelGroupService;
//# sourceMappingURL=channel-group.service.js.map