"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelRoutes = void 0;
const express_1 = require("express");
const channel_controller_1 = require("../controllers/channel.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const channel_validator_1 = require("../validators/channel.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', channel_controller_1.ChannelController.listChannels);
router.get('/:id', channel_controller_1.ChannelController.getChannel);
router.post('/', (0, role_middleware_1.requireRole)('admin'), (0, validate_middleware_1.validate)(channel_validator_1.connectChannelSchema), channel_controller_1.ChannelController.connectChannel);
router.delete('/:id', (0, role_middleware_1.requireRole)('admin'), channel_controller_1.ChannelController.disconnectChannel);
router.put('/:id/schedule', (0, role_middleware_1.requireRole)('admin'), (0, validate_middleware_1.validate)(channel_validator_1.updateChannelSettingsSchema), channel_controller_1.ChannelController.updateSchedule);
exports.channelRoutes = router;
//# sourceMappingURL=channel.routes.js.map