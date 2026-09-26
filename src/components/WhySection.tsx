import React from 'react';
import { StarAccent } from './ArkAjaMonogram';

export const WhySection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] border-b border-[#E5E0D8] relative overflow-hidden">
      {/* Subtle atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,185,140,0.15),_transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 text-xs tracking-[0.35em] uppercase text-[#8F6F3A] font-bold mb-6">
          <StarAccent size={12} />
          <span>OUR CONVICTION</span>
          <StarAccent size={12} />
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#141312] leading-[1.15] text-balance">
          CREATIVE DIRECTION,
          <br />
          <span className="text-[#8F6F3A] italic font-normal">
            NOT JUST CONTENT.
          </span>
        </h2>

        <div className="mt-8 max-w-2xl mx-auto space-y-4 text-base sm:text-lg text-[#36322E] font-sans leading-relaxed">
          <p className="font-semibold text-[#141312]">
            AI-assisted production gives us speed.
            <br />
            Human art direction gives it intention.
          </p>
          <p className="text-sm sm:text-base text-[#66605B] leading-relaxed">
            Every visual is shaped around the brand, its audience, and the moment it needs to communicate. No generic templates, no cookie-cutter filler.
          </p>
        </div>

        {/* 3 Core pillars */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-[#E5E0D8] text-center">
          <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
            <span className="font-editorial text-2xl font-bold text-[#8F6F3A]">SPEED</span>
            <p className="text-xs text-[#66605B] mt-1 font-sans">
              48-hour turnarounds powered by modern generative workflows.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
            <span className="font-editorial text-2xl font-bold text-[#8F6F3A]">INTENTION</span>
            <p className="text-xs text-[#66605B] mt-1 font-sans">
              Carefully curated typography, color harmony, and taste.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
            <span className="font-editorial text-2xl font-bold text-[#8F6F3A]">IMPACT</span>
            <p className="text-xs text-[#66605B] mt-1 font-sans">
              Visuals built to elevate brand equity and drive bookings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
