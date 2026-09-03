"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const AppError_1 = require("../utils/AppError");
// Ensure base upload directories exist
const uploadBase = path_1.default.join(process.cwd(), 'public', 'uploads');
const folders = ['avatars', 'posts', 'templates', 'feeds', 'temp', 'organizations'];
folders.forEach((folder) => {
    const dir = path_1.default.join(uploadBase, folder);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
});
const storage = multer_1.default.diskStorage({
    destination: (_req, file, cb) => {
        let dest = path_1.default.join(uploadBase, 'temp');
        if (file.fieldname === 'avatar') {
            dest = path_1.default.join(uploadBase, 'avatars');
        }
        else if (file.fieldname === 'postMedia' || file.fieldname === 'media') {
            dest = path_1.default.join(uploadBase, 'posts');
        }
        else if (file.fieldname === 'templateCover') {
            dest = path_1.default.join(uploadBase, 'templates');
        }
        cb(null, dest);
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});
const fileFilter = (_req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'video/mp4',
        'video/quicktime',
        'video/webm',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.AppError(`Unsupported file type: ${file.mimetype}. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM`, 400));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB max
    },
});
//# sourceMappingURL=upload.js.map