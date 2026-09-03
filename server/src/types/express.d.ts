import { IUserDocument } from './models.types';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
      organizationId?: string;
    }
  }
}

export {};
