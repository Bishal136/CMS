"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDemoUser = seedDemoUser;
const mongoose_1 = require("mongoose");
const User_model_1 = require("../models/User.model");
const Organization_model_1 = require("../models/Organization.model");
const Subscription_model_1 = require("../models/Subscription.model");
async function seedDemoUser() {
    console.log('🌱 Checking / Seeding demo admin user...');
    const demoEmail = 'admin@cmsmanagement.com';
    let user = await User_model_1.User.findOne({ email: demoEmail });
    if (!user) {
        // 1. Create Organization
        const tempOwnerId = new mongoose_1.Types.ObjectId();
        const org = await Organization_model_1.Organization.create({
            name: 'Acme Media Agency',
            plan: 'team',
            channelLimit: 50,
            postLimitPerChannel: 99999,
            ownerId: tempOwnerId,
        });
        // 2. Create User
        user = await User_model_1.User.create({
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
        await Subscription_model_1.Subscription.create({
            organizationId: org._id,
            plan: 'team',
            status: 'active',
        });
        console.log(`✅ Demo Admin User created: ${demoEmail} (Password: Password123!)`);
    }
    else {
        console.log(`ℹ️ Demo user already exists: ${demoEmail}`);
    }
}
//# sourceMappingURL=users.seed.js.map