"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDemoUser = seedDemoUser;
const mongoose_1 = require("mongoose");
const User_model_1 = require("../models/User.model");
const Organization_model_1 = require("../models/Organization.model");
const Subscription_model_1 = require("../models/Subscription.model");
async function seedDemoUser() {
    console.log('🌱 Checking / Seeding role-based demo users (Admin & User)...');
    // ==========================================
    // 1. Seed / Update Admin User
    // ==========================================
    const adminEmail = 'admin@cmsmanagement.com';
    let adminUser = await User_model_1.User.findOne({ email: adminEmail });
    if (!adminUser) {
        const tempOwnerId = new mongoose_1.Types.ObjectId();
        const adminOrg = await Organization_model_1.Organization.create({
            name: 'CMSFlow Master Agency',
            plan: 'team',
            channelLimit: 50,
            postLimitPerChannel: 99999,
            ownerId: tempOwnerId,
        });
        adminUser = await User_model_1.User.create({
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
        await Subscription_model_1.Subscription.create({
            organizationId: adminOrg._id,
            plan: 'team',
            status: 'active',
        });
        console.log(`✅ Admin User created: ${adminEmail} | Role: admin (Password: Password123!)`);
    }
    else {
        // Ensure existing user has role: 'admin' and clean password (pre-save will hash once)
        adminUser.role = 'admin';
        adminUser.isVerified = true;
        adminUser.password = 'Password123!';
        await adminUser.save();
        // Ensure org and subscription are active team plan
        await Organization_model_1.Organization.updateOne({ _id: adminUser.organizationId }, { plan: 'team', channelLimit: 50, postLimitPerChannel: 99999 });
        await Subscription_model_1.Subscription.findOneAndUpdate({ organizationId: adminUser.organizationId }, { plan: 'team', status: 'active' }, { upsert: true });
        console.log(`✅ Admin User updated: ${adminEmail} | Role: admin (Password: Password123!)`);
    }
    // ==========================================
    // 2. Seed / Update Regular User
    // ==========================================
    const userEmail = 'user1@gmail.com';
    let regularUser = await User_model_1.User.findOne({ email: userEmail });
    if (!regularUser) {
        const tempOwnerId = new mongoose_1.Types.ObjectId();
        const userOrg = await Organization_model_1.Organization.create({
            name: 'Personal Website & Channels',
            plan: 'free',
            channelLimit: 3,
            postLimitPerChannel: 20,
            ownerId: tempOwnerId,
        });
        regularUser = await User_model_1.User.create({
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
        await Subscription_model_1.Subscription.create({
            organizationId: userOrg._id,
            plan: 'free',
            status: 'active',
        });
        console.log(`✅ Regular User created: ${userEmail} | Role: user (Password: 12345678)`);
    }
    else {
        // Ensure existing user has role: 'user'
        regularUser.role = 'user';
        regularUser.isVerified = true;
        regularUser.password = '12345678';
        await regularUser.save();
        await Organization_model_1.Organization.updateOne({ _id: regularUser.organizationId }, { plan: 'free', channelLimit: 3, postLimitPerChannel: 20 });
        await Subscription_model_1.Subscription.findOneAndUpdate({ organizationId: regularUser.organizationId }, { plan: 'free', status: 'active' }, { upsert: true });
        console.log(`✅ Regular User updated: ${userEmail} | Role: user (Password: Password123!)`);
    }
}
//# sourceMappingURL=users.seed.js.map