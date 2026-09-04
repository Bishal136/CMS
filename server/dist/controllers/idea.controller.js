"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaController = void 0;
const idea_service_1 = require("../services/idea.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class IdeaController {
    static listIdeas = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const data = await idea_service_1.IdeaService.listIdeas(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, data);
    });
    static createIdea = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const idea = await idea_service_1.IdeaService.createIdea(req.user._id.toString(), req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, idea, 'Idea created successfully');
    });
    static updateIdea = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const idea = await idea_service_1.IdeaService.updateIdea(req.params.id, req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.success(res, idea, 'Idea updated successfully');
    });
    static deleteIdea = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await idea_service_1.IdeaService.deleteIdea(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
    static createGroup = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const group = await idea_service_1.IdeaService.createGroup(req.organizationId, req.body.name);
        return ApiResponse_1.ApiResponse.created(res, group, 'Group created successfully');
    });
    static generateIdeas = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { topic, count } = req.body;
        const ideas = await idea_service_1.IdeaService.generateIdeas(req.user._id.toString(), req.organizationId, topic, count || 3);
        return ApiResponse_1.ApiResponse.created(res, ideas, 'Ideas generated successfully');
    });
}
exports.IdeaController = IdeaController;
//# sourceMappingURL=idea.controller.js.map