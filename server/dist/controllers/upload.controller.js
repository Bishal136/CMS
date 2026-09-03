"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const AppError_1 = require("../utils/AppError");
const catchAsync_1 = require("../utils/catchAsync");
class UploadController {
    static uploadFile = (0, catchAsync_1.catchAsync)(async (req, res) => {
        if (!req.file) {
            throw AppError_1.AppError.badRequest('No file uploaded');
        }
        // Determine subfolder
        let subfolder = 'temp';
        if (req.file.fieldname === 'avatar')
            subfolder = 'avatars';
        if (req.file.fieldname === 'postMedia' || req.file.fieldname === 'media')
            subfolder = 'posts';
        if (req.file.fieldname === 'templateCover')
            subfolder = 'templates';
        const fileUrl = `/uploads/${subfolder}/${req.file.filename}`;
        return ApiResponse_1.ApiResponse.success(res, {
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            url: fileUrl,
        }, 'File uploaded successfully');
    });
}
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map