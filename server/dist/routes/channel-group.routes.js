"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelGroupRoutes = void 0;
const express_1 = require("express");
const channel_group_controller_1 = require("../controllers/channel-group.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', channel_group_controller_1.ChannelGroupController.listGroups);
router.post('/', (0, role_middleware_1.requireRole)('admin'), channel_group_controller_1.ChannelGroupController.createGroup);
router.put('/:id', (0, role_middleware_1.requireRole)('admin'), channel_group_controller_1.ChannelGroupController.updateGroup);
router.delete('/:id', (0, role_middleware_1.requireRole)('admin'), channel_group_controller_1.ChannelGroupController.deleteGroup);
exports.channelGroupRoutes = router;
//# sourceMappingURL=channel-group.routes.js.map