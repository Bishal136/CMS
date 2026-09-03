import { Subscription } from '../models/Subscription.model';
import { Organization } from '../models/Organization.model';
import { Invoice } from '../models/Invoice.model';
import { AppError } from '../utils/AppError';
import { PLAN_LIMITS } from '../config/constants';

export class BillingService {
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
        limits: PLAN_LIMITS.free,
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
        limits: PLAN_LIMITS.essentials,
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
        limits: PLAN_LIMITS.team,
      },
    ];
  }

  static async getCurrentSubscription(organizationId: string) {
    const [subscription, invoices, org] = await Promise.all([
      Subscription.findOne({ organizationId }),
      Invoice.find({ organizationId }).sort({ createdAt: -1 }),
      Organization.findById(organizationId),
    ]);

    return {
      plan: org?.plan || 'free',
      channelLimit: org?.channelLimit || 3,
      subscription,
      invoices,
    };
  }

  static async changePlan(
    organizationId: string,
    newPlan: 'free' | 'essentials' | 'team'
  ) {
    const org = await Organization.findById(organizationId);
    if (!org) throw AppError.notFound('Organization not found');

    const limits = PLAN_LIMITS[newPlan];
    org.plan = newPlan;
    org.channelLimit = limits.maxChannels;
    org.postLimitPerChannel = limits.maxScheduledPostsPerChannel === Infinity ? 99999 : limits.maxScheduledPostsPerChannel;
    await org.save();

    await Subscription.findOneAndUpdate(
      { organizationId },
      { plan: newPlan, status: 'active' },
      { upsert: true, new: true }
    );

    return {
      message: `Plan changed successfully to ${newPlan}`,
      plan: org.plan,
      channelLimit: org.channelLimit,
    };
  }
}
