"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const templates_seed_1 = require("./templates.seed");
const users_seed_1 = require("./users.seed");
async function runSeed() {
    console.log('🚀 Starting database seeding...');
    await (0, db_1.connectDB)();
    try {
        await (0, templates_seed_1.seedTemplates)();
        await (0, users_seed_1.seedDemoUser)();
        console.log('🎉 Seeding completed successfully!');
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
    }
    finally {
        await (0, db_1.disconnectDB)();
        process.exit(0);
    }
}
runSeed();
//# sourceMappingURL=seed.js.map