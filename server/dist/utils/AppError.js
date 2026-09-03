"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    errors;
    constructor(message, statusCode = 500, errors) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message = 'Bad request', errors) {
        return new AppError(message, 400, errors);
    }
    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, 401);
    }
    static forbidden(message = 'Forbidden') {
        return new AppError(message, 403);
    }
    static notFound(message = 'Resource not found') {
        return new AppError(message, 404);
    }
    static conflict(message = 'Resource already exists') {
        return new AppError(message, 409);
    }
    static internal(message = 'Internal server error') {
        return new AppError(message, 500);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map