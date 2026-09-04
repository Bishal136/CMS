import http from 'http';
import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { env } from './config/env';
import { initializeSocket } from './config/socket';

async function startServer() {
  // 1. Connect to Database
  await connectDB();

  // 2. Initialize Express application
  const app = createApp();

  // 3. Create HTTP Server & attach Socket.IO
  const httpServer = http.createServer(app);
  initializeSocket(httpServer);

  // 4. Start listening
  const server = httpServer.listen(env.PORT, () => {
    console.log(`
🚀 ====================================================
   CMS Management Server is running!
   Mode:     ${env.NODE_ENV}
   Port:     ${env.PORT}
   API URL:  http://localhost:${env.PORT}/api/v1
   Health:   http://localhost:${env.PORT}/api/v1/health
🚀 ====================================================
    `);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${env.PORT} is already in use. Please terminate the existing process or set a different PORT in .env.`);
    } else {
      console.error('❌ Server startup error:', error);
    }
    process.exit(1);
  });

  // 5. Graceful shutdown handler
  const shutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
    server.close(async () => {
      console.log('HTTP and Socket server closed');
      await disconnectDB();
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
