"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const Subscription_model_1 = require("../models/Subscription.model");
const Organization_model_1 = require("../models/Organization.model");
const Invoice_model_1 = require("../models/Invoice.model");
const AppError_1 = require("../utils/AppError");
const constants_1 = require("../config/constants");
class BillingService {
    static getPlans() {
        return [
            {
                id: 'free',
                name: 'Free',
                priceMonthly: 0,
                priceYearly: 0,
                description: 'For individuals starting out with social media.',
                features: [
                    'Up to 3 channels',
                    '10 scheduled posts per channel',
                    '100 content ideas',
                    '1 user account',
                    'Basic analytics',
                    'Community comments inbox',
                ],
                limits: constants_1.PLAN_LIMITS.free,
            },
            {
                id: 'essentials',
                name: 'Essentials',
                priceMonthly: 6,
                priceYearly: 60,
                description: 'For creators and solo entrepreneurs publishing regularly.',
                popular: true,
                features: [
                    'Up to 10 channels',
                    'Unlimited scheduled posts',
                    'Unlimited content ideas',
                    '1 user account',
                    'Advanced analytics & export',
                    'Hashtag manager',
                    'First comment automation',
                ],
                limits: constants_1.PLAN_LIMITS.essentials,
            },
            {
                id: 'team',
                name: 'Team',
                priceMonthly: 12,
                priceYearly: 120,
                description: 'For growing teams and agencies collaborating on content.',
                features: [
                    'Up to 50 channels',
                    'Unlimited scheduled posts',
                    'Unlimited team members',
                    'Approval workflows',
                    'Channel groups',
                    'Notes & annotations',
                    'Priority support',
                ],
                limits: constants_1.PLAN_LIMITS.team,
            },
        ];
    }
    static async getCurrentSubscription(organizationId) {
        const [subscription, invoices, org] = await Promise.all([
            Subscription_model_1.Subscription.findOne({ organizationId }),
            Invoice_model_1.Invoice.find({ organizationId }).sort({ createdAt: -1 }),
            Organization_model_1.Organization.findById(organizationId),
        ]);
        return {
            plan: org?.plan || 'free',
            channelLimit: org?.channelLimit || 3,
            subscription,
            invoices,
        };
    }
    static async changePlan(organizationId, newPlan) {
        const org = await Organization_model_1.Organization.findById(organizationId);
        if (!org)
            throw AppError_1.AppError.notFound('Organization not found');
        const limits = constants_1.PLAN_LIMITS[newPlan];
        org.plan = newPlan;
        org.channelLimit = limits.maxChannels;
        org.postLimitPerChannel = limits.maxScheduledPostsPerChannel === Infinity ? 99999 : limits.maxScheduledPostsPerChannel;
        await org.save();
        await Subscription_model_1.Subscription.findOneAndUpdate({ organizationId }, { plan: newPlan, status: 'active' }, { upsert: true, new: true });
        return {
            message: `Plan changed successfully to ${newPlan}`,
            plan: org.plan,
            channelLimit: org.channelLimit,
        };
    }
}
exports.BillingService = BillingService;
//# sourceMappingURL=billing.service.js.map