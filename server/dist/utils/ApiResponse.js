"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(res, data, message = 'Operation successful', statusCode = 200, meta) {
        const payload = {
            success: true,
            message,
            data,
            ...(meta && { meta })
        };
        return res.status(statusCode).json(payload);
    }
    static created(res, data, message = 'Resource created successfully', meta) {
        return ApiResponse.success(res, data, message, 201, meta);
    }
    static paginated(res, data, page, limit, total, message = 'Data retrieved successfully') {
        const totalPages = Math.ceil(total / limit);
        return ApiResponse.success(res, data, message, 200, {
            page,
            limit,
            total,
            totalPages
        });
    }
    static error(res, message = 'An error occurred', statusCode = 500, errors) {
        const payload = {
            success: false,
            message,
            ...(errors !== undefined && { errors })
        };
        return res.status(statusCode).json(payload);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map