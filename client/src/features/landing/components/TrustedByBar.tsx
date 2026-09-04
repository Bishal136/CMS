import React from 'react';

interface IBrandItem {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

export const TrustedByBar: React.FC = () => {
  const brands: IBrandItem[] = [
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      renderLogo: () => (
        <span className="font-extrabold tracking-tighter text-lg md:text-xl font-mono text-neutral-400 group-hover:text-neutral-700 transition-colors">
          IIElevenLabs
        </span>
      ),
    },
    {
      id: 'pizzahut',
      name: 'Pizza Hut',
      renderLogo: () => (
        <span className="font-serif italic font-bold tracking-tight text-lg md:text-xl text-neutral-400 group-hover:text-neutral-700 transition-colors">
          Pizza Hut
        </span>
      ),
    },
    {
      id: 'vice',
      name: 'VICE',
      renderLogo: () => (
        <span className="font-black italic tracking-widest text-lg md:text-2xl text-neutral-400 group-hover:text-neutral-700 transition-colors font-sans">
          VICE
        </span>
      ),
    },
    {
      id: 'clashofclans',
      name: 'Clash of Clans',
      renderLogo: () => (
        <span className="font-black uppercase tracking-tighter text-xs md:text-sm text-neutral-400 group-hover:text-neutral-700 transition-colors border border-current px-2 py-0.5 rounded">
          CLASH OF CLANS
        </span>
      ),
    },
    {
      id: 'metallica',
      name: 'Metallica',
      renderLogo: () => (
        <span className="font-black tracking-widest text-sm md:text-base text-neutral-400 group-hover:text-neutral-700 transition-colors uppercase font-mono">
          METALLICA
        </span>
      ),
    },
    {
      id: 'benefit',
      name: 'benefit',
      renderLogo: () => (
        <span className="font-serif lowercase tracking-wide text-lg md:text-xl text-neutral-400 group-hover:text-neutral-700 transition-colors">
          benefit
        </span>
      ),
    },
    {
      id: 'wired',
      name: 'WIRED',
      renderLogo: () => (
        <span className="font-mono font-bold tracking-widest text-sm md:text-base text-neutral-400 group-hover:text-neutral-700 transition-colors border-2 border-current px-1.5 py-0.5">
          WIRED
        </span>
      ),
    },
    {
      id: 'semrush',
      name: 'SEMRUSH',
      renderLogo: () => (
        <span className="font-sans font-extrabold tracking-wider text-sm md:text-base text-neutral-400 group-hover:text-neutral-700 transition-colors uppercase flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-current opacity-70"></span>
          SEMRUSH
        </span>
      ),
    },
    {
      id: 'crocs',
      name: 'crocs',
      renderLogo: () => (
        <span className="font-sans font-black lowercase tracking-tighter text-lg md:text-xl text-neutral-400 group-hover:text-neutral-700 transition-colors">
          crocs™
        </span>
      ),
    },
  ];

  return (
    <section className="py-14 border-t border-b border-[#E8E8E8] bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header with hairline dividers matching design/Landing page.png */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-[#E8E8E8] flex-1 max-w-[120px] hidden sm:block" />
          <p className="text-sm font-medium text-[#6B6B6B]">
            <strong className="text-[#0D0D0D] font-semibold">254,106</strong> creators, brands, and agencies using CMSFlow
          </p>
          <div className="h-px bg-[#E8E8E8] flex-1 max-w-[120px] hidden sm:block" />
        </div>

        {/* Monochrome Logos Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-6 md:gap-8 items-center justify-items-center">
          {brands.map((b) => (
            <div
              key={b.id}
              className="group flex items-center justify-center cursor-default transition-all duration-200 hover:-translate-y-0.5"
              title={b.name}
            >
              {b.renderLogo()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
