import React from 'react';
import { ArkAjaMonogram, StarAccent } from './ArkAjaMonogram';
import { ArrowRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onStartProject: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onStartProject }) => {
  return (
    <section className="py-24 sm:py-36 bg-[#FAF8F5] text-[#141312] relative overflow-hidden text-center border-b border-[#E5E0D8]">
      {/* Ambient warm gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,_rgba(212,185,140,0.25),_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-6 flex flex-col items-center">
          <ArkAjaMonogram size={52} glow={true} className="mb-3" />
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#8F6F3A] font-mono font-bold">
            ARKAJA STUDIO
          </span>
        </div>

        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#141312] leading-[1.1] text-balance">
          Have something worth showing?
        </h2>

        <p className="font-editorial italic text-xl sm:text-2xl text-[#8F6F3A] mt-4 font-normal">
          Let&apos;s create the visual language around it.
        </p>

        <div className="mt-10">
          <button
            onClick={onStartProject}
            className="px-10 py-4 bg-[#141312] hover:bg-[#2C2825] text-[#F7F5EF] text-xs font-semibold tracking-[0.25em] uppercase rounded-lg transition-all shadow-[0_8px_30px_rgba(20,19,18,0.18)] hover:scale-105 inline-flex items-center gap-2 group"
          >
            <span>START A PROJECT</span>
            <ArrowRight size={16} className="text-[#D4B98C] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
