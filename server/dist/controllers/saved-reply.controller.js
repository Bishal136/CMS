"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedReplyController = void 0;
const saved_reply_service_1 = require("../services/saved-reply.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class SavedReplyController {
    static listReplies = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const replies = await saved_reply_service_1.SavedReplyService.listReplies(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, replies);
    });
    static createReply = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const reply = await saved_reply_service_1.SavedReplyService.createReply(req.user._id.toString(), req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, reply, 'Saved reply created successfully');
    });
    static updateReply = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const reply = await saved_reply_service_1.SavedReplyService.updateReply(req.params.id, req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.success(res, reply, 'Saved reply updated successfully');
    });
    static deleteReply = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await saved_reply_service_1.SavedReplyService.deleteReply(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
}
exports.SavedReplyController = SavedReplyController;
//# sourceMappingURL=saved-reply.controller.js.map