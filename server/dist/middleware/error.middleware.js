"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
const env_1 = require("../config/env");
function errorHandler(err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) {
    let statusCode = 500;
    let message = 'An unexpected server error occurred';
    let errors = undefined;
    if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    }
    else if (err.name === 'ValidationError') {
        // Mongoose validation error
        statusCode = 400;
        message = 'Validation error';
        errors = err.message;
    }
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }
    else if ('code' in err && err.code === 11000) {
        statusCode = 409;
        message = 'Duplicate field value entered';
    }
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }
    // Structured error logging
    if (statusCode >= 500) {
        console.error('🚨 SERVER ERROR:', {
            name: err.name,
            message: err.message,
            stack: err.stack,
            statusCode,
        });
    }
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors !== undefined && { errors }),
        ...(env_1.env.NODE_ENV === 'development' && statusCode >= 500 && { stack: err.stack }),
    });
}
//# sourceMappingURL=error.middleware.js.map