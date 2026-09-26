import React from 'react';
import { ArkAjaMonogram, StarAccent } from './ArkAjaMonogram';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useImageStorage } from '../context/ImageStorageContext';

interface HeroProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onStartProject }) => {
  const { getImageForSlot } = useImageStorage();

  const heroSlots = [
    { id: 'lumiere-1', sector: 'SECTOR 01', title: 'LUMIÈRE BEAUTY', sub: 'Aesthetic & Skincare' },
    { id: 'saree-1', sector: 'SECTOR 02', title: 'SAREE COLLECTIONS', sub: 'Heritage Silk & Handloom' },
    { id: 'elan-1', sector: 'SECTOR 03', title: 'ÉLAN FASHION', sub: 'Contemporary Womenswear' },
    { id: 'noir-1', sector: 'SECTOR 04', title: 'NOIR & BEAN', sub: 'Artisanal Coffee & Brunch' },
  ];
  return (
    <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#F7F5EF] text-[#141312] overflow-hidden border-b border-[#E5E0D8]">
      {/* Background warm ivory lighting & radial elegance */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(212,185,140,0.22),_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* AA Monogram Logo */}
          <div className="mb-6 flex flex-col items-center">
            <ArkAjaMonogram size={56} glow={true} className="mb-3 hover:scale-105 transition-transform" />
            <span className="text-[11px] tracking-[0.45em] uppercase text-[#B38F5B] font-mono font-semibold">
              ARKAJA STUDIO
            </span>
          </div>

          {/* Primary Statement */}
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#141312] leading-[1.08] max-w-3xl text-balance">
            Creative content for brands with something to say.
          </h1>

          {/* Studio Philosophy & Pillars */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-[#4A4540] font-sans">
            <span className="font-semibold text-[#8F6F3A]">
              AI-assisted creative production.
            </span>
            <span className="hidden sm:inline text-[#A7A19A]">•</span>
            <span className="font-medium text-[#141312]">
              Human-led art direction.
            </span>
          </div>

          {/* Clear Deliverable Tagline */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm tracking-wider uppercase text-[#78716C] font-semibold">
            <span>Social Content</span>
            <span className="text-[#B38F5B]">·</span>
            <span>Campaign Creatives</span>
            <span className="text-[#B38F5B]">·</span>
            <span>Promotional Visuals</span>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreWork}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#141312] hover:bg-[#2C2825] text-[#F7F5EF] font-semibold text-xs tracking-[0.2em] uppercase rounded-lg transition-all shadow-[0_4px_20px_rgba(20,19,18,0.15)] flex items-center justify-center gap-2 group"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform text-[#D4B98C]" />
            </button>

            <button
              onClick={onStartProject}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#141312]/30 hover:border-[#141312] text-[#141312] hover:bg-black/5 font-semibold text-xs tracking-[0.2em] uppercase rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <span>START A PROJECT</span>
              <ArrowRight size={14} className="text-[#8F6F3A]" />
            </button>
          </div>

          {/* Immediate Photographic Proof Strip: 3-5 seconds to see actual work! */}
          <div className="mt-12 w-full pt-8 border-t border-[#E5E0D8]">
            <div className="flex items-center justify-between text-[11px] text-[#78716C] tracking-wider uppercase font-mono mb-4">
              <span>SELECTED CAMPAIGN VISUALS</span>
              <span className="flex items-center gap-1.5 text-[#8F6F3A] font-semibold">
                <StarAccent size={10} />
                <span>BEAUTY · FASHION · HOSPITALITY</span>
              </span>
              <span className="hidden sm:inline">HIGH-FIDELITY ASSETS</span>
            </div>

            {/* Quick 4-card discipline showcase or custom uploaded artwork */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto cursor-pointer" onClick={onExploreWork}>
              {heroSlots.map((slot) => {
                const img = getImageForSlot(slot.id);
                return (
                  <div
                    key={slot.id}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E5E0D8] bg-[#1C1A18] text-[#F7F5EF] group hover:border-[#D4B98C] transition-all shadow-sm"
                  >
                    {img ? (
                      <>
                        <img
                          src={img}
                          alt={slot.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-[10px] sm:text-xs font-editorial font-bold text-white tracking-wide">
                            {slot.title}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 h-full flex flex-col justify-between">
                        <span className="text-[10px] tracking-widest uppercase text-[#D4B98C] font-mono">{slot.sector}</span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-editorial font-bold tracking-wide text-white">{slot.title}</h3>
                          <p className="text-[10px] text-[#A7A19A]">{slot.sub}</p>
                        </div>
                        <span className="text-[9px] text-[#D4B98C]/80 uppercase tracking-wider font-mono">Ready for Assets →</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
