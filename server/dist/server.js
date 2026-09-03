"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const socket_1 = require("./config/socket");
async function startServer() {
    // 1. Connect to Database
    await (0, db_1.connectDB)();
    // 2. Initialize Express application
    const app = (0, app_1.createApp)();
    // 3. Create HTTP Server & attach Socket.IO
    const httpServer = http_1.default.createServer(app);
    (0, socket_1.initializeSocket)(httpServer);
    // 4. Start listening
    const server = httpServer.listen(env_1.env.PORT, () => {
        console.log(`
🚀 ====================================================
   CMS Management Server is running!
   Mode:     ${env_1.env.NODE_ENV}
   Port:     ${env_1.env.PORT}
   API URL:  http://localhost:${env_1.env.PORT}/api/v1
   Health:   http://localhost:${env_1.env.PORT}/api/v1/health
🚀 ====================================================
    `);
    });
    // 5. Graceful shutdown handler
    const shutdown = async (signal) => {
        console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
        server.close(async () => {
            console.log('HTTP and Socket server closed');
            await (0, db_1.disconnectDB)();
            console.log('Database connections closed');
            process.exit(0);
        });
        // Force close after 10s if graceful fails
        setTimeout(() => {
            console.error('⚠️ Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
}
startServer().catch((error) => {
    console.error('Fatal server startup error:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map