import { Channel } from '../models/Channel.model';
import { Organization } from '../models/Organization.model';
import { AppError } from '../utils/AppError';
import { IPostingScheduleSlot } from '../types/models.types';

const DEFAULT_SCHEDULE: IPostingScheduleSlot[] = [
  { day: 'monday', times: ['09:00', '13:00', '17:00'] },
  { day: 'tuesday', times: ['09:00', '13:00', '17:00'] },
  { day: 'wednesday', times: ['09:00', '13:00', '17:00'] },
  { day: 'thursday', times: ['09:00', '13:00', '17:00'] },
  { day: 'friday', times: ['09:00', '13:00', '17:00'] },
  { day: 'saturday', times: ['10:00'] },
  { day: 'sunday', times: ['10:00'] },
];

export class ChannelService {
  static async listChannels(organizationId: string) {
    return Channel.find({ organizationId, isConnected: true }).select(
      'platform profile postingSchedule createdAt updatedAt'
    );
  }

  static async getChannel(channelId: string, organizationId: string) {
    const channel = await Channel.findOne({ _id: channelId, organizationId, isConnected: true });
    if (!channel) {
      throw AppError.notFound('Channel not found');
    }
    return channel;
  }

  static async connectChannel(
    organizationId: string,
    data: {
      platform: 'youtube' | 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok' | 'threads' | 'pinterest' | 'mastodon' | 'google-business';
      profileName: string;
      avatar?: string;
      handle?: string;
      accessToken: string;
      refreshToken?: string;
    }
  ) {
    // Check channel quota against organization plan
    const org = await Organization.findById(organizationId);
    if (!org) {
      throw AppError.notFound('Organization not found');
    }

    const currentChannelCount = await Channel.countDocuments({ organizationId, isConnected: true });
    if (currentChannelCount >= org.channelLimit) {
      throw AppError.badRequest(
        `Channel limit of ${org.channelLimit} reached for your plan (${org.plan}). Please upgrade.`
      );
    }

    const channel = await Channel.create({
      platform: data.platform,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      profile: {
        name: data.profileName,
        avatar: data.avatar || '',
        handle: data.handle || '',
      },
      postingSchedule: DEFAULT_SCHEDULE,
      organizationId,
      isConnected: true,
    });

    return channel;
  }

  static async disconnectChannel(channelId: string, organizationId: string) {
    const channel = await Channel.findOne({ _id: channelId, organizationId });
    if (!channel) {
      throw AppError.notFound('Channel not found');
    }

    channel.isConnected = false;
    await channel.save();
    return { message: 'Channel disconnected successfully' };
  }

  static async updatePostingSchedule(
    channelId: string,
    organizationId: string,
    postingSchedule: IPostingScheduleSlot[]
  ) {
    const channel = await Channel.findOne({ _id: channelId, organizationId, isConnected: true });
    if (!channel) {
      throw AppError.notFound('Channel not found');
    }

    channel.postingSchedule = postingSchedule;
    await channel.save();
    return channel;
  }
}
