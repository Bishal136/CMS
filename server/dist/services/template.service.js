"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = exports.SEEDED_DISCOVER_TEMPLATES = void 0;
const Template_model_1 = require("../models/Template.model");
const AppError_1 = require("../utils/AppError");
exports.SEEDED_DISCOVER_TEMPLATES = [
    // Category: Creator Camp Consistency: Week 1
    {
        title: 'The first time you felt out of place',
        content: "Many of us have been in a room, a meeting, or a group chat where everyone else seemed to know exactly what they were doing. This one's about what that was like, and how you found your footing.\n\n- The setting:\n- How I felt:\n- What changed my perspective:\n\nHave you ever felt out of place early on?",
        category: 'Creator Camp Consistency: Week 1',
        emoji: '🤔',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: 'Something you learned from an early boss or mentor',
        content: "Think back to a first boss, a manager, or a mentor from early in your journey. What was the single most valuable lesson they passed down?\n\nHere is what they taught me: ...\n\nWho was that person for you?",
        category: 'Creator Camp Consistency: Week 1',
        emoji: '🧭',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: 'Someone who gave you a chance',
        content: "There's always that someone in our story who said yes before they had proof.\n\nIn [Year], I had zero track record, but [Name] gave me a shot. Here is what happened next:\n\nNever forget the people who believed in you first.",
        category: 'Creator Camp Consistency: Week 1',
        emoji: '🙏',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: 'Something you learned from a past job',
        content: "If you've changed jobs or careers, some of your best skills made the leap with you.\n\nWhen I worked in [Past Role], I learned how to [Key Skill]. Even today, I use that exact lesson every single week.",
        category: 'Creator Camp Consistency: Week 1',
        emoji: '🎒',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: "The lucky break you're grateful for",
        content: "Was there a moment when good timing or someone else's decision changed everything?\n\nLooking back, my biggest turning point wasn't planned—it was a lucky break:\n\nSometimes luck happens, but being prepared is what makes it count.",
        category: 'Creator Camp Consistency: Week 1',
        emoji: '☘️',
        isDiscoverable: true,
        isPersonal: false,
    },
    // Category: Tip
    {
        title: 'Share a metric milestone',
        content: "Hit a key milestone today: [Metric] reached [Number]! 📊\n\nHere are 3 tactical takeaways that got us here:\n1. \n2. \n3. \n\nWhat milestone are you celebrating this week?",
        category: 'Tip',
        emoji: '📊',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: 'Repurpose your best performing insight',
        content: "Don't create from scratch every week. ♻️\n\nTake your #1 performing post from last month and expand on bullet #2 into a full breakdown.\n\nHere is how to repurpose effectively:",
        category: 'Tip',
        emoji: '♻️',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: 'A quick 3-step checklist',
        content: "A quick 3-step checklist before hitting publish: 📝\n\n1. Is the hook clear and compelling in the first 2 seconds?\n2. Does the body deliver immediate value?\n3. Is the CTA conversational and easy to answer?",
        category: 'Tip',
        emoji: '📝',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: 'The key rule you never break',
        content: "The #1 rule in my content creation routine: 🔑\n\nNever publish when in a rush or frustrated. Always draft, step away for 30 minutes, then refine.\n\nWhat rule keeps your quality consistent?",
        category: 'Tip',
        emoji: '🔑',
        isDiscoverable: true,
        isPersonal: false,
    },
    {
        title: 'A contrarian opinion in your industry',
        content: "Contrarian take in [Industry]: 💡\n\nEveryone thinks [Common belief], but in reality [Surprising truth].\n\nHere is why this matters for your workflow:",
        category: 'Tip',
        emoji: '💡',
        isDiscoverable: true,
        isPersonal: false,
    },
];
class TemplateService {
    static async ensureSeeded() {
        const count = await Template_model_1.Template.countDocuments({ isDiscoverable: true });
        if (count === 0) {
            try {
                await Template_model_1.Template.insertMany(exports.SEEDED_DISCOVER_TEMPLATES);
            }
            catch {
                // Ignore duplicate seeding error
            }
        }
    }
    static async listTemplates(organizationId, filter) {
        await this.ensureSeeded();
        const query = {
            $or: [{ isDiscoverable: true }, { organizationId }],
        };
        if (filter?.category) {
            query.category = filter.category;
        }
        if (filter?.isPersonal !== undefined) {
            query.isPersonal = filter.isPersonal;
        }
        if (filter?.search) {
            const searchRegex = new RegExp(filter.search, 'i');
            query.$and = [
                {
                    $or: [{ title: searchRegex }, { content: searchRegex }],
                },
            ];
        }
        return Template_model_1.Template.find(query).sort({ createdAt: -1 });
    }
    static async listDiscoverTemplates() {
        await this.ensureSeeded();
        return Template_model_1.Template.find({ isDiscoverable: true }).sort({ category: 1, createdAt: -1 });
    }
    static async createTemplate(userId, organizationId, data) {
        return Template_model_1.Template.create({
            title: data.title,
            content: data.content,
            category: data.category || 'General',
            emoji: data.emoji || '📝',
            isPersonal: data.isPersonal ?? true,
            isDiscoverable: false,
            organizationId,
            createdBy: userId,
        });
    }
    static async updateTemplate(templateId, organizationId, data) {
        const template = await Template_model_1.Template.findOne({ _id: templateId, organizationId });
        if (!template)
            throw AppError_1.AppError.notFound('Template not found');
        if (data.title !== undefined)
            template.title = data.title;
        if (data.content !== undefined)
            template.content = data.content;
        if (data.category !== undefined)
            template.category = data.category;
        if (data.emoji !== undefined)
            template.emoji = data.emoji;
        await template.save();
        return template;
    }
    static async deleteTemplate(templateId, organizationId) {
        const template = await Template_model_1.Template.findOneAndDelete({ _id: templateId, organizationId });
        if (!template)
            throw AppError_1.AppError.notFound('Template not found');
        return { message: 'Template deleted successfully' };
    }
}
exports.TemplateService = TemplateService;
//# sourceMappingURL=template.service.js.map