import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { AppError } from '../utils/AppError';

// Ensure base upload directories exist
const uploadBase = path.join(process.cwd(), 'public', 'uploads');
const folders = ['avatars', 'posts', 'templates', 'feeds', 'temp', 'organizations'];

folders.forEach((folder) => {
  const dir = path.join(uploadBase, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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
