"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentionController = void 0;
const mention_service_1 = require("../services/mention.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
const pagination_1 = require("../utils/pagination");
class MentionController {
    static listMentions = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const pagination = (0, pagination_1.getPaginationOptions)(req.query.page, req.query.limit);
        const filter = {
            channelId: req.query.channelId,
            isRead: req.query.isRead ? req.query.isRead === 'true' : undefined,
        };
        const { mentions, total } = await mention_service_1.MentionService.listMentions(req.organizationId, filter, pagination);
        return ApiResponse_1.ApiResponse.paginated(res, mentions, pagination.page, pagination.limit, total, 'Mentions retrieved successfully');
    });
    static markAsRead = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const mention = await mention_service_1.MentionService.markAsRead(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, mention, 'Mention marked as read');
    });
}
exports.MentionController = MentionController;
//# sourceMappingURL=mention.controller.js.map