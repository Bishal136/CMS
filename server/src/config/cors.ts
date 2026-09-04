import { CorsOptions } from 'cors';
import { env } from './env';

const parseAllowedOrigins = (): string[] => {
  const defaults = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://localhost:4173',
  ];

  const configured = (env.FRONTEND_URL || '')
    .split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean);

  return Array.from(new Set([...defaults, ...configured]));
};

const allowedOrigins = parseAllowedOrigins();

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server, or Render health check)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, '');

    if (
      allowedOrigins.includes(normalizedOrigin) ||
      (env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(normalizedOrigin))
    ) {
      return callback(null, true);
    }

    // Cleanly reject unauthorized origin without throwing 500
    console.warn(`[CORS] Rejected origin: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
};

