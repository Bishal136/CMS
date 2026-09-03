"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const AppError_1 = require("../utils/AppError");
function requireRole(...allowedRoles) {
    return (req, _res, next) => {
        if (!req.user) {
            return next(AppError_1.AppError.unauthorized('Authentication required'));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(AppError_1.AppError.forbidden(`Access forbidden. Requires one of roles: ${allowedRoles.join(', ')}`));
        }
        next();
    };
}
//# sourceMappingURL=role.middleware.js.map