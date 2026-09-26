import React from 'react';
import { StarAccent } from './ArkAjaMonogram';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'BRIEF',
      desc: 'Tell us about your business, campaign objectives, and what you need.'
    },
    {
      num: '02',
      title: 'DIRECTION',
      desc: 'We define the visual direction, color story, and creative approach.'
    },
    {
      num: '03',
      title: 'CREATE',
      desc: 'AI-assisted production + human art direction + typographic design.'
    },
    {
      num: '04',
      title: 'DELIVER',
      desc: 'Final assets delivered in full resolution, ready for immediate publication.'
    }
  ];

  return (
    <section id="process" className="py-20 sm:py-28 bg-[#F7F5EF] text-[#141312] border-b border-[#E5E0D8] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.3em] uppercase text-[#8F6F3A] font-bold mb-2">
            <StarAccent size={12} />
            <span>HOW IT WORKS</span>
            <StarAccent size={12} />
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312]">
            FROM BRIEF TO FINAL VISUAL.
          </h2>
          <p className="text-sm sm:text-base text-[#66605B] mt-2 font-sans">
            A streamlined 4-step creative pipeline built for velocity without sacrificing craft.
          </p>
        </div>

        {/* 4-Step Timeline (Horizontal on desktop, vertical on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-12 right-12 h-px bg-[#E5E0D8] z-0" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="relative z-10 flex flex-col items-start md:items-center text-left md:text-center group"
            >
              {/* Step Number Circle */}
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#E5E0D8] group-hover:border-[#8F6F3A] group-hover:bg-[#FAF6EE] flex items-center justify-center font-mono text-base font-bold text-[#8F6F3A] transition-all shadow-xs mb-6">
                {step.num}
              </div>

              <h3 className="font-editorial text-xl font-bold tracking-wider text-[#141312] group-hover:text-[#8F6F3A] transition-colors">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#66605B] mt-2 font-sans leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
