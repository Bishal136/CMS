"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
const AppError_1 = require("../utils/AppError");
function notFoundHandler(req, _res, next) {
    next(AppError_1.AppError.notFound(`Cannot find ${req.method} ${req.originalUrl} on this server`));
}
//# sourceMappingURL=not-found.middleware.js.map