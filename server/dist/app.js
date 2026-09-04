"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cors_2 = require("./config/cors");
const env_1 = require("./config/env");
const rate_limit_middleware_1 = require("./middleware/rate-limit.middleware");
const not_found_middleware_1 = require("./middleware/not-found.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const routes_1 = __importDefault(require("./routes"));
function createApp() {
    const app = (0, express_1.default)();
    // 1. Security HTTP headers
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow static uploads to load in client
        crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }, // Allow Google OAuth and auth popups
    }));
    // 2. CORS configuration
    app.use((0, cors_1.default)(cors_2.corsOptions));
    // 3. HTTP request logging
    if (env_1.env.NODE_ENV !== 'test') {
        app.use((0, morgan_1.default)(env_1.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
    }
    // 4. Rate limiting
    app.use(rate_limit_middleware_1.globalRateLimiter);
    // 5. Body parsers
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cookie_parser_1.default)(env_1.env.COOKIE_SECRET));
    // 6. Static files for uploads (VPS disk storage)
    const uploadsPath = path_1.default.join(process.cwd(), 'public', 'uploads');
    app.use('/uploads', express_1.default.static(uploadsPath));
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
    app.use('/api/v1', routes_1.default);
    // 9. 404 Handler
    app.use(not_found_middleware_1.notFoundHandler);
    // 10. Global Error Handler
    app.use(error_middleware_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map