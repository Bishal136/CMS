import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting reconnection...');
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('MongoDB disconnected successfully');
}
