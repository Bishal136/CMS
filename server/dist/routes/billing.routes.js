"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingRoutes = void 0;
const express_1 = require("express");
const billing_controller_1 = require("../controllers/billing.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.get('/plans', billing_controller_1.BillingController.getPlans);
router.use(auth_middleware_1.authenticate);
router.get('/current', billing_controller_1.BillingController.getCurrentSubscription);
router.post('/change-plan', (0, role_middleware_1.requireRole)('admin'), billing_controller_1.BillingController.changePlan);
exports.billingRoutes = router;
//# sourceMappingURL=billing.routes.js.map