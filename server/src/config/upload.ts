import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { Request } from 'express';
import { AppError } from '../utils/AppError';

// Check if running in a serverless environment (Vercel, AWS Lambda, Netlify, etc.)
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT ||
  (process.cwd() && process.cwd().startsWith('/var/task'))
);

export const folders = ['avatars', 'posts', 'templates', 'feeds', 'temp', 'organizations'] as const;

/**
 * Resolves the base upload directory.
 * In serverless environments (e.g. Vercel / AWS Lambda), the root filesystem (/var/task)
 * is read-only, so uploads must be stored in os.tmpdir() (/tmp).
 */
export const resolveUploadBase = (): string => {
  if (process.env.UPLOAD_DIR) {
    return process.env.UPLOAD_DIR;
  }

  if (isServerless) {
    return path.join(os.tmpdir(), 'cms_uploads');
  }

  // Check if running from repository root where 'server/public' exists
  const serverPublicUploads = path.join(process.cwd(), 'server', 'public', 'uploads');
  if (fs.existsSync(path.join(process.cwd(), 'server', 'public'))) {
    return serverPublicUploads;
  }

  return path.join(process.cwd(), 'public', 'uploads');
};

export let uploadBase = resolveUploadBase();

/**
 * Safely ensure directory exists without throwing unhandled exceptions.
 * Returns boolean indicating whether directory exists and is accessible.
 */
export const ensureDirectoryExists = (targetDir: string): boolean => {
  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    return true;
  } catch (error) {
    console.warn(`[Upload Config] Warning: Could not create directory '${targetDir}': ${(error as Error).message}`);
    return false;
  }
};

// Initialize upload directories safely (never throws uncaught exception during startup)
const initUploadDirectories = () => {
  let canWrite = true;
  for (const folder of folders) {
    const dir = path.join(uploadBase, folder);
    if (!ensureDirectoryExists(dir)) {
      canWrite = false;
      break;
    }
  }

  // If writing to primary uploadBase failed (e.g. read-only filesystem), fallback to os.tmpdir()
  if (!canWrite && !uploadBase.startsWith(os.tmpdir())) {
    const fallbackBase = path.join(os.tmpdir(), 'cms_uploads');
    console.warn(`[Upload Config] Read-only or inaccessible path detected. Falling back to writable scratch directory: ${fallbackBase}`);
    uploadBase = fallbackBase;
    for (const folder of folders) {
      ensureDirectoryExists(path.join(uploadBase, folder));
    }
  }
};

initUploadDirectories();

const storage = multer.diskStorage({
  destination: (_req: Request, file: Express.Multer.File, cb) => {
    let dest = path.join(uploadBase, 'temp');
    if (file.fieldname === 'avatar') {
      dest = path.join(uploadBase, 'avatars');
    } else if (file.fieldname === 'postMedia' || file.fieldname === 'media') {
      dest = path.join(uploadBase, 'posts');
    } else if (file.fieldname === 'templateCover') {
      dest = path.join(uploadBase, 'templates');
    }

    // Ensure the folder exists before storing the file
    if (!ensureDirectoryExists(dest)) {
      const fallback = path.join(os.tmpdir(), 'cms_uploads', 'temp');
      ensureDirectoryExists(fallback);
      return cb(null, fallback);
    }

    cb(null, dest);
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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
  } else {
    cb(new AppError(`Unsupported file type: ${file.mimetype}. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM`, 400));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB max
  },
});
