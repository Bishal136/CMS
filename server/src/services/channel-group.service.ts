import { ChannelGroup } from '../models/ChannelGroup.model';
import { Organization } from '../models/Organization.model';
import { AppError } from '../utils/AppError';

export class ChannelGroupService {
  static async listGroups(organizationId: string) {
    return ChannelGroup.find({ organizationId }).populate('channelIds', 'platform profile');
  }

  static async createGroup(
    organizationId: string,
    data: { name: string; channelIds: string[] }
  ) {
    const org = await Organization.findById(organizationId);
    if (!org) {
      throw AppError.notFound('Organization not found');
    }

    if (org.plan !== 'team') {
      throw AppError.forbidden('Channel groups is a premium feature available on the Team plan.');
    }

    return ChannelGroup.create({
      name: data.name,
      channelIds: data.channelIds,
      organizationId,
    });
  }

  static async updateGroup(
    groupId: string,
    organizationId: string,
    data: { name?: string; channelIds?: string[] }
  ) {
    const group = await ChannelGroup.findOne({ _id: groupId, organizationId });
    if (!group) {
      throw AppError.notFound('Channel group not found');
    }

    if (data.name) group.name = data.name;
    if (data.channelIds) group.channelIds = data.channelIds as unknown as typeof group.channelIds;

    await group.save();
    return group;
  }

  static async deleteGroup(groupId: string, organizationId: string) {
    const group = await ChannelGroup.findOneAndDelete({ _id: groupId, organizationId });
    if (!group) {
      throw AppError.notFound('Channel group not found');
    }
    return { message: 'Channel group deleted successfully' };
  }
}
