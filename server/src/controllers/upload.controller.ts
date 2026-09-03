import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';

export class UploadController {
  static uploadFile = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
      throw AppError.badRequest('No file uploaded');
    }

    // Determine subfolder
    let subfolder = 'temp';
    if (req.file.fieldname === 'avatar') subfolder = 'avatars';
    if (req.file.fieldname === 'postMedia' || req.file.fieldname === 'media') subfolder = 'posts';
    if (req.file.fieldname === 'templateCover') subfolder = 'templates';

    const fileUrl = `/uploads/${subfolder}/${req.file.filename}`;

    return ApiResponse.success(
      res,
      {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
      },
      'File uploaded successfully'
    );
  });
}
