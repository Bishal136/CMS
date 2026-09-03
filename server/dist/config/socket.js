"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
exports.getIO = getIO;
exports.emitToOrganization = emitToOrganization;
const socket_io_1 = require("socket.io");
const cors_1 = require("./cors");
let io = null;
function initializeSocket(httpServer) {
    io = new socket_io_1.Server(httpServer, {
        cors: cors_1.corsOptions,
        transports: ['websocket', 'polling'],
    });
    io.on('connection', (socket) => {
        console.log(`🔌 Client connected to Socket.IO: ${socket.id}`);
        // Join organization room
        socket.on('join:organization', (organizationId) => {
            if (organizationId) {
                socket.join(`org:${organizationId}`);
                console.log(`Socket ${socket.id} joined org:${organizationId}`);
            }
        });
        // Leave organization room
        socket.on('leave:organization', (organizationId) => {
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
function getIO() {
    return io;
}
function emitToOrganization(organizationId, event, payload) {
    if (io) {
        io.to(`org:${organizationId}`).emit(event, payload);
    }
}
//# sourceMappingURL=socket.js.map