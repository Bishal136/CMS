"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const Channel_model_1 = require("../models/Channel.model");
const Organization_model_1 = require("../models/Organization.model");
const AppError_1 = require("../utils/AppError");
const DEFAULT_SCHEDULE = [
    { day: 'monday', times: ['09:00', '13:00', '17:00'] },
    { day: 'tuesday', times: ['09:00', '13:00', '17:00'] },
    { day: 'wednesday', times: ['09:00', '13:00', '17:00'] },
    { day: 'thursday', times: ['09:00', '13:00', '17:00'] },
    { day: 'friday', times: ['09:00', '13:00', '17:00'] },
    { day: 'saturday', times: ['10:00'] },
    { day: 'sunday', times: ['10:00'] },
];
class ChannelService {
    static async listChannels(organizationId) {
        let channels = await Channel_model_1.Channel.find({ organizationId, isConnected: true }).select('platform profile postingSchedule createdAt updatedAt');
        if (channels.length === 0) {
            try {
                await Channel_model_1.Channel.create([
                    {
                        platform: 'instagram',
                        accessToken: 'demo_ig_token',
                        refreshToken: 'demo_ig_refresh',
                        profile: {
                            name: 'Instagram Channel',
                            handle: '@demo_instagram',
                            avatar: '',
                        },
                        postingSchedule: DEFAULT_SCHEDULE,
                        organizationId,
                        isConnected: true,
                    },
                    {
                        platform: 'facebook',
                        accessToken: 'demo_fb_token',
                        refreshToken: 'demo_fb_refresh',
                        profile: {
                            name: 'Facebook Page',
                            handle: '@demo_facebook',
                            avatar: '',
                        },
                        postingSchedule: DEFAULT_SCHEDULE,
                        organizationId,
                        isConnected: true,
                    },
                    {
                        platform: 'linkedin',
                        accessToken: 'demo_li_token',
                        refreshToken: 'demo_li_refresh',
                        profile: {
                            name: 'LinkedIn Profile',
                            handle: '@demo_linkedin',
                            avatar: '',
                        },
                        postingSchedule: DEFAULT_SCHEDULE,
                        organizationId,
                        isConnected: true,
                    },
                ]);
                channels = await Channel_model_1.Channel.find({ organizationId, isConnected: true }).select('platform profile postingSchedule createdAt updatedAt');
            }
            catch {
                // Ignore duplicate seeding collision
            }
        }
        return channels;
    }
    static async getChannel(channelId, organizationId) {
        const channel = await Channel_model_1.Channel.findOne({ _id: channelId, organizationId, isConnected: true });
        if (!channel) {
            throw AppError_1.AppError.notFound('Channel not found');
        }
        return channel;
    }
    static async connectChannel(organizationId, data) {
        // Check channel quota against organization plan
        const org = await Organization_model_1.Organization.findById(organizationId);
        if (!org) {
            throw AppError_1.AppError.notFound('Organization not found');
        }
        const currentChannelCount = await Channel_model_1.Channel.countDocuments({ organizationId, isConnected: true });
        if (currentChannelCount >= org.channelLimit) {
            throw AppError_1.AppError.badRequest(`Channel limit of ${org.channelLimit} reached for your plan (${org.plan}). Please upgrade.`);
        }
        const channel = await Channel_model_1.Channel.create({
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
    static async disconnectChannel(channelId, organizationId) {
        const channel = await Channel_model_1.Channel.findOne({ _id: channelId, organizationId });
        if (!channel) {
            throw AppError_1.AppError.notFound('Channel not found');
        }
        channel.isConnected = false;
        await channel.save();
        return { message: 'Channel disconnected successfully' };
    }
    static async updatePostingSchedule(channelId, organizationId, postingSchedule) {
        const channel = await Channel_model_1.Channel.findOne({ _id: channelId, organizationId, isConnected: true });
        if (!channel) {
            throw AppError_1.AppError.notFound('Channel not found');
        }
        channel.postingSchedule = postingSchedule;
        await channel.save();
        return channel;
    }
}
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map