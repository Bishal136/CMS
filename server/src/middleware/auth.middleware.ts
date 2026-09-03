import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User } from '../models/User.model';
import { ITokenPayload } from '../types/auth.types';
import { AppError } from '../utils/AppError';

export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(AppError.unauthorized('Authentication required. Please log in.'));
    }

    let decoded: ITokenPayload;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as ITokenPayload;
    } catch {
      return next(AppError.unauthorized('Invalid or expired token. Please log in again.'));
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(AppError.unauthorized('User associated with this token no longer exists.'));
    }

    req.user = user;
    req.organizationId = user.organizationId.toString();

    next();
  } catch (error) {
    next(error);
  }
}
