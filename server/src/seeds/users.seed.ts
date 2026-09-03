import { Types } from 'mongoose';
import { User } from '../models/User.model';
import { Organization } from '../models/Organization.model';
import { Subscription } from '../models/Subscription.model';

export async function seedDemoUser() {
  console.log('🌱 Checking / Seeding demo admin user...');

  const demoEmail = 'admin@cmsmanagement.com';
  let user = await User.findOne({ email: demoEmail });

  if (!user) {
    // 1. Create Organization
    const tempOwnerId = new Types.ObjectId();
    const org = await Organization.create({
      name: 'Acme Media Agency',
      plan: 'team',
      channelLimit: 50,
      postLimitPerChannel: 99999,
      ownerId: tempOwnerId,
    });

    // 2. Create User
    user = await User.create({
      name: 'Admin User',
      email: demoEmail,
      password: 'Password123!', // pre-save hook will hash with bcrypt (12 rounds)
      role: 'admin',
      organizationId: org._id,
      isVerified: true,
      preferences: {
        theme: 'light',
        timezone: 'UTC',
        timeFormat: '12h',
        startOfWeek: 'monday',
      },
    });

    org.ownerId = user._id;
    await org.save();

    // 3. Create Subscription
    await Subscription.create({
      organizationId: org._id,
      plan: 'team',
      status: 'active',
    });

    console.log(`✅ Demo Admin User created: ${demoEmail} (Password: Password123!)`);
  } else {
    console.log(`ℹ️ Demo user already exists: ${demoEmail}`);
  }
}
