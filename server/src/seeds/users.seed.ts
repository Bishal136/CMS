import { Types } from 'mongoose';
import { User } from '../models/User.model';
import { Organization } from '../models/Organization.model';
import { Subscription } from '../models/Subscription.model';

export async function seedDemoUser() {
  console.log('🌱 Checking / Seeding role-based demo users (Admin & User)...');

  // ==========================================
  // 1. Seed / Update Admin User
  // ==========================================
  const adminEmail = 'admin@cmsmanagement.com';
  let adminUser = await User.findOne({ email: adminEmail });

  if (!adminUser) {
    const tempOwnerId = new Types.ObjectId();
    const adminOrg = await Organization.create({
      name: 'CMSFlow Master Agency',
      plan: 'team',
      channelLimit: 50,
      postLimitPerChannel: 99999,
      ownerId: tempOwnerId,
    });

    adminUser = await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: 'Password123!', // pre-save hook will hash with bcrypt (12 rounds)
      role: 'admin',
      organizationId: adminOrg._id,
      isVerified: true,
      preferences: {
        theme: 'light',
        timezone: 'UTC',
        timeFormat: '12h',
        startOfWeek: 'monday',
      },
    });

    adminOrg.ownerId = adminUser._id;
    await adminOrg.save();

    await Subscription.create({
      organizationId: adminOrg._id,
      plan: 'team',
      status: 'active',
    });

    console.log(`✅ Admin User created: ${adminEmail} | Role: admin (Password: Password123!)`);
  } else {
    // Ensure existing user has role: 'admin' and clean password (pre-save will hash once)
    adminUser.role = 'admin';
    adminUser.isVerified = true;
    adminUser.password = 'Password123!';
    await adminUser.save();

    // Ensure org and subscription are active team plan
    await Organization.updateOne(
      { _id: adminUser.organizationId },
      { plan: 'team', channelLimit: 50, postLimitPerChannel: 99999 }
    );
    await Subscription.findOneAndUpdate(
      { organizationId: adminUser.organizationId },
      { plan: 'team', status: 'active' },
      { upsert: true }
    );

    console.log(`✅ Admin User updated: ${adminEmail} | Role: admin (Password: Password123!)`);
  }

  // ==========================================
  // 2. Seed / Update Regular User
  // ==========================================
  const userEmail = 'user1@gmail.com';
  let regularUser = await User.findOne({ email: userEmail });

  if (!regularUser) {
    const tempOwnerId = new Types.ObjectId();
    const userOrg = await Organization.create({
      name: 'Personal Website & Channels',
      plan: 'free',
      channelLimit: 3,
      postLimitPerChannel: 20,
      ownerId: tempOwnerId,
    });

    regularUser = await User.create({
      name: 'Demo Creator User',
      email: userEmail,
      password: '12345678', // pre-save hook will hash with bcrypt
      role: 'user',
      organizationId: userOrg._id,
      isVerified: true,
      preferences: {
        theme: 'light',
        timezone: 'UTC',
        timeFormat: '12h',
        startOfWeek: 'monday',
      },
    });

    userOrg.ownerId = regularUser._id;
    await userOrg.save();

    await Subscription.create({
      organizationId: userOrg._id,
      plan: 'free',
      status: 'active',
    });

    console.log(`✅ Regular User created: ${userEmail} | Role: user (Password: 12345678)`);
  } else {
    // Ensure existing user has role: 'user'
    regularUser.role = 'user';
    regularUser.isVerified = true;
    regularUser.password = '12345678';
    await regularUser.save();

    await Organization.updateOne(
      { _id: regularUser.organizationId },
      { plan: 'free', channelLimit: 3, postLimitPerChannel: 20 }
    );
    await Subscription.findOneAndUpdate(
      { organizationId: regularUser.organizationId },
      { plan: 'free', status: 'active' },
      { upsert: true }
    );

    console.log(`✅ Regular User updated: ${userEmail} | Role: user (Password: Password123!)`);
  }
}
