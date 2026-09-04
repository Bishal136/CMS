import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

import { corsOptions } from './config/cors';
import { env } from './config/env';
import { globalRateLimiter } from './middleware/rate-limit.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import { errorHandler } from './middleware/error.middleware';
import apiRouter from './routes';

export function createApp(): Application {
  const app = express();

  // Trust reverse proxy (Render, AWS, Heroku, Nginx)
  app.set('trust proxy', 1);

  // 1. Security HTTP headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow static uploads to load in client
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }, // Allow Google OAuth and auth popups
    })
  );

  // 2. CORS configuration
  app.use(cors(corsOptions));

  // 3. HTTP request logging
  if (env.NODE_ENV !== 'test') {
    app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  }

  // 4. Rate limiting
  app.use(globalRateLimiter);

  // 5. Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser(env.COOKIE_SECRET));

  // 6. Static files for uploads (VPS disk storage)
  const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // 7. Base API route
  app.get('/', (_req, res) => {
    res.json({
      name: 'CMS Management API',
      version: '1.0.0',
      description: 'Your social media workspace backend API',
      apiDocs: '/api/v1/health',
    });
  });

  // 8. Mount all routes under /api/v1
  app.use('/api/v1', apiRouter);

  // 9. 404 Handler
  app.use(notFoundHandler);

  // 10. Global Error Handler
  app.use(errorHandler);

  return app;
}
