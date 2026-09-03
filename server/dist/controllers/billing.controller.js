"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const billing_service_1 = require("../services/billing.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const catchAsync_1 = require("../utils/catchAsync");
class BillingController {
    static getPlans = (0, catchAsync_1.catchAsync)(async (_req, res) => {
        const plans = billing_service_1.BillingService.getPlans();
        return ApiResponse_1.ApiResponse.success(res, plans);
    });
    static getCurrentSubscription = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const data = await billing_service_1.BillingService.getCurrentSubscription(req.organizationId);
        return ApiResponse_1.ApiResponse.success(res, data);
    });
    static changePlan = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await billing_service_1.BillingService.changePlan(req.organizationId, req.body.plan);
        return ApiResponse_1.ApiResponse.success(res, result, result.message);
    });
}
exports.BillingController = BillingController;
//# sourceMappingURL=billing.controller.js.map