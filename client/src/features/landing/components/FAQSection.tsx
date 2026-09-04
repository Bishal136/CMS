import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface IFAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: IFAQItem[] = [
    {
      question: 'Can I schedule posts to multiple social accounts at the same time?',
      answer:
        'Yes! With CMSFlow’s multi-channel composer, you can draft one piece of content and customize it with platform-specific hashtags, mentions, and media formatting for YouTube, Instagram, Facebook, LinkedIn, X, and TikTok simultaneously.',
    },
    {
      question: 'Do I need a credit card to start the 14-day free trial?',
      answer:
        'No credit card is required. You can register with just your email and immediately connect your social profiles to test all features risk-free for 14 days.',
    },
    {
      question: 'How do team approval workflows work?',
      answer:
        'On our Team plan, you can assign roles such as Creator, Publisher, or Admin. Creators can draft and queue posts, but content will remain in "Pending Approval" status until an Admin or Publisher reviews and approves it.',
    },
    {
      question: 'Which social platforms are supported natively?',
      answer:
        'We support YouTube, Instagram, Facebook Pages, LinkedIn (personal and company pages), X (Twitter), TikTok, Threads, Pinterest, Google Business Profile, and Mastodon using official OAuth integrations.',
    },
    {
      question: 'Can I import media from Canva, Google Drive, and Dropbox?',
      answer:
        'Yes! CMSFlow integrates directly with Canva, Google Drive, and Dropbox so you can import high-resolution images, carousels, and videos directly into your composer without downloading them to your desktop.',
    },
    {
      question: 'Can I cancel or change my subscription at any time?',
      answer:
        'Absolutely. You can upgrade, downgrade, or cancel your plan at any moment from your billing settings. If you cancel, your account will remain active until the end of your current billing period.',
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-white border-b border-[#E8E8E8]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3.5 py-1 bg-[#FFF1F7] text-[#FF1493] text-xs font-semibold rounded-full mb-3 border border-[#FF1493]/20">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Everything you need to know about the product, plans, and onboarding.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E8E8E8] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-neutral-50/70 transition-colors cursor-pointer"
                >
                  <span className="text-base font-semibold text-[#0D0D0D]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#FF1493]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#6B6B6B] leading-relaxed bg-white border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
