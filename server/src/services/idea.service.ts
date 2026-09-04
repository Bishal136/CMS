import { Idea } from '../models/Idea.model';
import { IdeaGroup } from '../models/IdeaGroup.model';
import { AppError } from '../utils/AppError';

export class IdeaService {
  static async listIdeas(organizationId: string) {
    let [ideas, groups] = await Promise.all([
      Idea.find({ organizationId }).populate('tagIds', 'name color').sort({ order: 1 }),
      IdeaGroup.find({ organizationId }).sort({ order: 1 }),
    ]);

    // If no ideas exist yet for this organization, initialize with the 2 ideas shown in the screenshot
    if (ideas.length === 0) {
      try {
        const seededIdeas = await Idea.create([
          {
            title: 'This is a place to plan ✍️ your content',
            content: 'Save your Ideas before converting them into posts. Brainstorm, plan ahead, and organize your thoughts.',
            status: 'unassigned',
            groupName: 'Unassigned',
            order: 0,
            organizationId,
            createdBy: organizationId, // fallback ObjectId
          },
          {
            title: 'Save Inspirations you find online with one click 🤩',
            content: 'Use ⬇️ Buffer browser extension to save Ideas from the Web. Highlight text, grab images, and stash ideas directly.',
            status: 'unassigned',
            groupName: 'Unassigned',
            previewIllustration: 'extension-mockup',
            order: 1,
            organizationId,
            createdBy: organizationId,
          },
        ]);
        ideas = seededIdeas as any;
      } catch (err) {
        // Fallback gracefully if creation failed
      }
    }

    return { ideas, groups };
  }

  static async createIdea(
    userId: string,
    organizationId: string,
    data: {
      title: string;
      content?: string;
      status?: 'unassigned' | 'todo' | 'in-progress' | 'done';
      groupName?: string;
      order?: number;
      previewIllustration?: string;
      tagIds?: string[];
    }
  ) {
    const normStatus = data.status === ('in_progress' as any) ? 'in-progress' : (data.status || 'unassigned');
    const highestOrder = await Idea.findOne({ organizationId, status: normStatus })
      .sort({ order: -1 })
      .select('order');

    const nextOrder = data.order !== undefined ? data.order : (highestOrder?.order ?? -1) + 1;

    return Idea.create({
      title: data.title,
      content: data.content || '',
      status: normStatus,
      groupName: data.groupName || 'General',
      order: nextOrder,
      previewIllustration: data.previewIllustration || '',
      tagIds: data.tagIds || [],
      organizationId,
      createdBy: userId,
    });
  }

  static async updateIdea(
    ideaId: string,
    organizationId: string,
    data: {
      title?: string;
      content?: string;
      status?: 'unassigned' | 'todo' | 'in-progress' | 'done';
      groupName?: string;
      order?: number;
      previewIllustration?: string;
      tagIds?: string[];
    }
  ) {
    const idea = await Idea.findOne({ _id: ideaId, organizationId });
    if (!idea) throw AppError.notFound('Idea not found');

    if (data.title !== undefined) idea.title = data.title;
    if (data.content !== undefined) idea.content = data.content;
    if (data.status !== undefined) {
      idea.status = data.status === ('in_progress' as any) ? 'in-progress' : data.status;
    }
    if (data.groupName !== undefined) idea.groupName = data.groupName;
    if (data.order !== undefined) idea.order = data.order;
    if (data.previewIllustration !== undefined) idea.previewIllustration = data.previewIllustration;
    if (data.tagIds !== undefined) idea.tagIds = data.tagIds as unknown as typeof idea.tagIds;

    await idea.save();
    return idea;
  }

  static async deleteIdea(ideaId: string, organizationId: string) {
    const idea = await Idea.findOneAndDelete({ _id: ideaId, organizationId });
    if (!idea) throw AppError.notFound('Idea not found');
    return { message: 'Idea deleted successfully' };
  }

  static async createGroup(organizationId: string, name: string) {
    const highestOrder = await IdeaGroup.findOne({ organizationId }).sort({ order: -1 });
    const order = (highestOrder?.order ?? -1) + 1;

    return IdeaGroup.create({
      name,
      order,
      organizationId,
    });
  }

  static async generateIdeas(
    userId: string,
    organizationId: string,
    topic: string,
    count = 3
  ) {
    const promptTopic = topic || 'Social Media Growth';
    const templates = [
      {
        title: `How we achieved 10x engagement with ${promptTopic} 🚀`,
        content: `Breaking down our exact playbook for ${promptTopic}:\n\n1. Stop overcomplicating\n2. Focus on consistency\n3. Engage directly with your audience\n\nWhat’s your top strategy this month?`,
      },
      {
        title: `3 common mistakes creators make with ${promptTopic} ⚠️`,
        content: `Are you making these mistakes with ${promptTopic}?\n\n❌ Mistake 1: Ignoring analytics\n❌ Mistake 2: Inconsistent posting schedule\n❌ Mistake 3: Talking at your followers instead of with them`,
      },
      {
        title: `The unexpected lesson I learned about ${promptTopic} 💡`,
        content: `When we first started exploring ${promptTopic}, we assumed more content meant more growth.\n\nHere is what the data actually proved: Quality beats volume every single time.`,
      },
      {
        title: `A quick framework for mastering ${promptTopic} in 30 days ⏱️`,
        content: `Week 1: Audit & define goals\nWeek 2: Test 3 distinct content hooks\nWeek 3: Double down on top performers\nWeek 4: Automate & schedule queue`,
      },
    ];

    const selected = templates.slice(0, Math.min(count, templates.length));
    const created = await Promise.all(
      selected.map((item, idx) =>
        Idea.create({
          title: item.title,
          content: item.content,
          status: 'unassigned',
          groupName: 'Unassigned',
          order: idx,
          organizationId,
          createdBy: userId,
        })
      )
    );

    return created;
  }
}
