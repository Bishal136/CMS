"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
async function connectDB() {
    try {
        const conn = await mongoose_1.default.connect(env_1.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
        mongoose_1.default.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected. Attempting reconnection...');
        });
    }
    catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}
async function disconnectDB() {
    await mongoose_1.default.disconnect();
    console.log('MongoDB disconnected successfully');
}
//# sourceMappingURL=db.js.map