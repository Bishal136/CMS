import { Template } from '../models/Template.model';

export const initialTemplates = [
  {
    title: 'Weekly Wins Roundup',
    content: "🎉 Celebrating our team's biggest wins of the week!\n\n1. [Achievement 1]\n2. [Achievement 2]\n3. [Achievement 3]\n\nWhat was your favorite milestone this week? Drop it below! 👇 #WeeklyWins #Growth",
    category: 'Consistency',
    emoji: '🏆',
    isDiscoverable: true,
    isPersonal: false,
  },
  {
    title: 'Product Tip of the Day',
    content: "💡 Pro-Tip: Did you know you can [insert key feature or tip]?\n\nHere is how to do it in 3 steps:\n👉 Step 1\n👉 Step 2\n👉 Step 3\n\nSave this post for later! 🔖 #TipsAndTricks #Productivity",
    category: 'Educational',
    emoji: '💡',
    isDiscoverable: true,
    isPersonal: false,
  },
  {
    title: 'Behind The Scenes Sneak Peek',
    content: "👀 A little sneak peek into what our team has been building behind the curtains!\n\n[Attach photo/video]\n\nCan you guess what's coming next? Tell us in the comments! 👇 #BehindTheScenes #BuildingInPublic",
    category: 'Engagement',
    emoji: '🎬',
    isDiscoverable: true,
    isPersonal: false,
  },
  {
    title: 'Ask Me Anything (AMA)',
    content: "🎙️ AMA Time! Ask me anything about [Industry / Skill / Topic] in the replies.\n\nI'll be answering every question for the next 2 hours. Go! 🚀 #AMA #QandA",
    category: 'Community',
    emoji: '❓',
    isDiscoverable: true,
    isPersonal: false,
  },
  {
    title: 'Quote & Reflection',
    content: "“The secret of getting ahead is getting started.” — Mark Twain\n\nWhat is one project you started this month that pushed you out of your comfort zone? #Motivation #Mindset",
    category: 'Inspiration',
    emoji: '✨',
    isDiscoverable: true,
    isPersonal: false,
  },
];

export async function seedTemplates() {
  console.log('🌱 Seeding discoverable templates...');
  for (const tpl of initialTemplates) {
    await Template.findOneAndUpdate(
      { title: tpl.title, isDiscoverable: true },
      tpl,
      { upsert: true, new: true }
    );
  }
  console.log('✅ Discoverable templates seeded.');
}
