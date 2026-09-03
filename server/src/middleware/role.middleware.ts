import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(AppError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        AppError.forbidden(`Access forbidden. Requires one of roles: ${allowedRoles.join(', ')}`)
      );
    }

    next();
  };
}
