"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const user_validator_1 = require("../validators/user.validator");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/profile', user_controller_1.UserController.getProfile);
router.put('/profile', (0, validate_middleware_1.validate)(user_validator_1.updateProfileSchema), user_controller_1.UserController.updateProfile);
router.put('/password', (0, validate_middleware_1.validate)(auth_validator_1.updatePasswordSchema), user_controller_1.UserController.updatePassword);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map