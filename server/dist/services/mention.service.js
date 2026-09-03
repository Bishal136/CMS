"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentionService = void 0;
const Mention_model_1 = require("../models/Mention.model");
const AppError_1 = require("../utils/AppError");
class MentionService {
    static async listMentions(organizationId, filter, pagination) {
        const query = { organizationId };
        if (filter.channelId)
            query.channelId = filter.channelId;
        if (filter.isRead !== undefined)
            query.isRead = filter.isRead;
        const [mentions, total] = await Promise.all([
            Mention_model_1.Mention.find(query)
                .populate('channelId', 'platform profile')
                .sort({ mentionedAt: -1 })
                .skip(pagination.skip)
                .limit(pagination.limit),
            Mention_model_1.Mention.countDocuments(query),
        ]);
        return { mentions, total };
    }
    static async markAsRead(mentionId, organizationId) {
        const mention = await Mention_model_1.Mention.findOne({ _id: mentionId, organizationId });
        if (!mention)
            throw AppError_1.AppError.notFound('Mention not found');
        mention.isRead = true;
        await mention.save();
        return mention;
    }
}
exports.MentionService = MentionService;
//# sourceMappingURL=mention.service.js.map