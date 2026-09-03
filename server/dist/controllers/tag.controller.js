"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const tag_service_1 = require("../services/tag.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class TagController {
    static listTags = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const tags = await tag_service_1.TagService.listTags(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, tags);
    });
    static createTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const tag = await tag_service_1.TagService.createTag(req.organizationId, req.body.name, req.body.color);
        return ApiResponse_1.ApiResponse.created(res, tag, 'Tag created successfully');
    });
    static updateTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const tag = await tag_service_1.TagService.updateTag(req.params.id, req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.success(res, tag, 'Tag updated successfully');
    });
    static deleteTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await tag_service_1.TagService.deleteTag(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
}
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map