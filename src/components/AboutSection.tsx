import React from 'react';
import { ArkAjaMonogram, StarAccent } from './ArkAjaMonogram';
import { MapPin, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F7F5EF] text-[#141312] border-b border-[#E5E0D8] relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left Monogram Emblem representation */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-[#E5E0D8] text-center shadow-xs">
            <ArkAjaMonogram size={80} glow={true} className="mb-4" />
            <span className="font-editorial text-xl font-bold tracking-[0.2em] text-[#141312]">
              ARKAJA
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#8F6F3A] uppercase font-sans mt-0.5 font-bold">
              STUDIO
            </span>
            <div className="w-12 h-px bg-[#8F6F3A]/30 my-4" />
            <p className="text-[11px] text-[#66605B] tracking-wider font-mono font-medium">
              CREATE · ELEVATE · TRANSFORM
            </p>
          </div>

          {/* Right Concise About Text */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#8F6F3A] font-bold mb-3">
              <StarAccent size={12} />
              <span>ABOUT</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312]">
              THE STUDIO
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#36322E] font-sans leading-relaxed">
              <p>
                ArkAja Studio is an independent creative studio focused on modern, visually-led content for brands and businesses.
              </p>
              <p>
                We combine AI-assisted creative production with human art direction, visual design, and content strategy.
              </p>
            </div>

            {/* Studio Footprint */}
            <div className="mt-8 pt-6 border-t border-[#E5E0D8] flex flex-wrap items-center gap-6 text-xs text-[#66605B] font-sans">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#8F6F3A]" />
                <span className="text-[#141312] font-semibold">Based in Mumbai, India.</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-[#8F6F3A]" />
                <span className="text-[#141312] font-semibold">Working worldwide.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
