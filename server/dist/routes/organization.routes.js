"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRoutes = void 0;
const express_1 = require("express");
const organization_controller_1 = require("../controllers/organization.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', organization_controller_1.OrganizationController.getOrg);
router.put('/', (0, role_middleware_1.requireRole)('admin'), organization_controller_1.OrganizationController.updateOrg);
router.get('/members', organization_controller_1.OrganizationController.getMembers);
router.post('/members/invite', (0, role_middleware_1.requireRole)('admin'), organization_controller_1.OrganizationController.inviteMember);
exports.organizationRoutes = router;
//# sourceMappingURL=organization.routes.js.map