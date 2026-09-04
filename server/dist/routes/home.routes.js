"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRoutes = void 0;
const express_1 = require("express");
const home_controller_1 = require("../controllers/home.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.homeRoutes = (0, express_1.Router)();
// All home routes require authentication
exports.homeRoutes.use(auth_middleware_1.authenticate);
exports.homeRoutes.get('/', home_controller_1.HomeController.getHomeDashboard);
exports.homeRoutes.get('/dashboard', home_controller_1.HomeController.getHomeDashboard);
exports.homeRoutes.get('/stats', home_controller_1.HomeController.getHomeStats);
//# sourceMappingURL=home.routes.js.map