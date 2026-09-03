"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedReplyService = void 0;
const SavedReply_model_1 = require("../models/SavedReply.model");
const AppError_1 = require("../utils/AppError");
class SavedReplyService {
    static async listReplies(organizationId) {
        return SavedReply_model_1.SavedReply.find({ organizationId }).sort({ createdAt: -1 });
    }
    static async createReply(userId, organizationId, data) {
        return SavedReply_model_1.SavedReply.create({
            title: data.title,
            content: data.content,
            organizationId,
            createdBy: userId,
        });
    }
    static async updateReply(replyId, organizationId, data) {
        const reply = await SavedReply_model_1.SavedReply.findOne({ _id: replyId, organizationId });
        if (!reply)
            throw AppError_1.AppError.notFound('Saved reply not found');
        if (data.title)
            reply.title = data.title;
        if (data.content)
            reply.content = data.content;
        await reply.save();
        return reply;
    }
    static async deleteReply(replyId, organizationId) {
        const reply = await SavedReply_model_1.SavedReply.findOneAndDelete({ _id: replyId, organizationId });
        if (!reply)
            throw AppError_1.AppError.notFound('Saved reply not found');
        return { message: 'Saved reply deleted successfully' };
    }
}
exports.SavedReplyService = SavedReplyService;
//# sourceMappingURL=saved-reply.service.js.map