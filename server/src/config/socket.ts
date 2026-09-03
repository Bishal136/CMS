import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { corsOptions } from './cors';

let io: SocketIOServer | null = null;

export function initializeSocket(httpServer: HttpServer): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: corsOptions,
    transports: ['websocket', 'polling'],
  });

  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Client connected to Socket.IO: ${socket.id}`);

    // Join organization room
    socket.on('join:organization', (organizationId: string) => {
      if (organizationId) {
        socket.join(`org:${organizationId}`);
        console.log(`Socket ${socket.id} joined org:${organizationId}`);
      }
    });

    // Leave organization room
    socket.on('leave:organization', (organizationId: string) => {
      if (organizationId) {
        socket.leave(`org:${organizationId}`);
        console.log(`Socket ${socket.id} left org:${organizationId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): SocketIOServer | null {
  return io;
}

export function emitToOrganization(organizationId: string, event: string, payload: unknown): void {
  if (io) {
    io.to(`org:${organizationId}`).emit(event, payload);
  }
}
