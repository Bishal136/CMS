"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateController = void 0;
const template_service_1 = require("../services/template.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class TemplateController {
    static listTemplates = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const filter = {
            category: req.query.category,
            isPersonal: req.query.isPersonal ? req.query.isPersonal === 'true' : undefined,
        };
        const templates = await template_service_1.TemplateService.listTemplates(req.organizationId, filter);
        return ApiResponse_1.ApiResponse.success(res, templates);
    });
    static listDiscover = (0, catchAsync_1.catchAsync)(async (_req, res) => {
        const templates = await template_service_1.TemplateService.listDiscoverTemplates();
        return ApiResponse_1.ApiResponse.success(res, templates);
    });
    static createTemplate = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const template = await template_service_1.TemplateService.createTemplate(req.user._id.toString(), req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.created(res, template, 'Template created successfully');
    });
    static updateTemplate = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const template = await template_service_1.TemplateService.updateTemplate(req.params.id, req.organizationId, req.body);
        return ApiResponse_1.ApiResponse.success(res, template, 'Template updated successfully');
    });
    static deleteTemplate = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await template_service_1.TemplateService.deleteTemplate(req.params.id, req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
}
exports.TemplateController = TemplateController;
//# sourceMappingURL=template.controller.js.map