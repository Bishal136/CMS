"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const env_1 = require("./env");
const allowedOrigins = [
    env_1.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
];
exports.corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(`CORS blocked for origin: ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
};
//# sourceMappingURL=cors.js.map