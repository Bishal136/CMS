"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.ensureDirectoryExists = exports.uploadBase = exports.resolveUploadBase = exports.folders = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const AppError_1 = require("../utils/AppError");
// Check if running in a serverless environment (Vercel, AWS Lambda, Netlify, etc.)
const isServerless = Boolean(process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    (process.cwd() && process.cwd().startsWith('/var/task')));
exports.folders = ['avatars', 'posts', 'templates', 'feeds', 'temp', 'organizations'];
/**
 * Resolves the base upload directory.
 * In serverless environments (e.g. Vercel / AWS Lambda), the root filesystem (/var/task)
 * is read-only, so uploads must be stored in os.tmpdir() (/tmp).
 */
const resolveUploadBase = () => {
    if (process.env.UPLOAD_DIR) {
        return process.env.UPLOAD_DIR;
    }
    if (isServerless) {
        return path_1.default.join(os_1.default.tmpdir(), 'cms_uploads');
    }
    // Check if running from repository root where 'server/public' exists
    const serverPublicUploads = path_1.default.join(process.cwd(), 'server', 'public', 'uploads');
    if (fs_1.default.existsSync(path_1.default.join(process.cwd(), 'server', 'public'))) {
        return serverPublicUploads;
    }
    return path_1.default.join(process.cwd(), 'public', 'uploads');
};
exports.resolveUploadBase = resolveUploadBase;
exports.uploadBase = (0, exports.resolveUploadBase)();
/**
 * Safely ensure directory exists without throwing unhandled exceptions.
 * Returns boolean indicating whether directory exists and is accessible.
 */
const ensureDirectoryExists = (targetDir) => {
    try {
        if (!fs_1.default.existsSync(targetDir)) {
            fs_1.default.mkdirSync(targetDir, { recursive: true });
        }
        return true;
    }
    catch (error) {
        console.warn(`[Upload Config] Warning: Could not create directory '${targetDir}': ${error.message}`);
        return false;
    }
};
exports.ensureDirectoryExists = ensureDirectoryExists;
// Initialize upload directories safely (never throws uncaught exception during startup)
const initUploadDirectories = () => {
    let canWrite = true;
    for (const folder of exports.folders) {
        const dir = path_1.default.join(exports.uploadBase, folder);
        if (!(0, exports.ensureDirectoryExists)(dir)) {
            canWrite = false;
            break;
        }
    }
    // If writing to primary uploadBase failed (e.g. read-only filesystem), fallback to os.tmpdir()
    if (!canWrite && !exports.uploadBase.startsWith(os_1.default.tmpdir())) {
        const fallbackBase = path_1.default.join(os_1.default.tmpdir(), 'cms_uploads');
        console.warn(`[Upload Config] Read-only or inaccessible path detected. Falling back to writable scratch directory: ${fallbackBase}`);
        exports.uploadBase = fallbackBase;
        for (const folder of exports.folders) {
            (0, exports.ensureDirectoryExists)(path_1.default.join(exports.uploadBase, folder));
        }
    }
};
initUploadDirectories();
const storage = multer_1.default.diskStorage({
    destination: (_req, file, cb) => {
        let dest = path_1.default.join(exports.uploadBase, 'temp');
        if (file.fieldname === 'avatar') {
            dest = path_1.default.join(exports.uploadBase, 'avatars');
        }
        else if (file.fieldname === 'postMedia' || file.fieldname === 'media') {
            dest = path_1.default.join(exports.uploadBase, 'posts');
        }
        else if (file.fieldname === 'templateCover') {
            dest = path_1.default.join(exports.uploadBase, 'templates');
        }
        // Ensure the folder exists before storing the file
        if (!(0, exports.ensureDirectoryExists)(dest)) {
            const fallback = path_1.default.join(os_1.default.tmpdir(), 'cms_uploads', 'temp');
            (0, exports.ensureDirectoryExists)(fallback);
            return cb(null, fallback);
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