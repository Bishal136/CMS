"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.coerce.number().default(5000),
    MONGODB_URI: zod_1.z.string().default('mongodb://127.0.0.1:27017/cms_management'),
    JWT_SECRET: zod_1.z.string().default('default_dev_jwt_secret_please_change_in_production'),
    JWT_EXPIRES_IN: zod_1.z.string().default('15m'),
    JWT_REFRESH_SECRET: zod_1.z.string().default('default_dev_jwt_refresh_secret_please_change'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('7d'),
    COOKIE_SECRET: zod_1.z.string().default('default_dev_cookie_secret'),
    ENCRYPTION_KEY: zod_1.z.string().default('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'),
    FRONTEND_URL: zod_1.z.string().default('http://localhost:5173'),
    REDIS_URL: zod_1.z.string().optional(),
    STRIPE_SECRET_KEY: zod_1.z.string().optional(),
    STRIPE_WEBHOOK_SECRET: zod_1.z.string().optional(),
    GOOGLE_CLIENT_ID: zod_1.z.string().optional(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string().optional(),
    GOOGLE_CALLBACK_URL: zod_1.z.string().optional(),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map