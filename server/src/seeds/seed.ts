import { connectDB, disconnectDB } from '../config/db';
import { seedTemplates } from './templates.seed';
import { seedDemoUser } from './users.seed';

async function runSeed() {
  console.log('🚀 Starting database seeding...');
  await connectDB();

  try {
    await seedTemplates();
    await seedDemoUser();
    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

runSeed();
