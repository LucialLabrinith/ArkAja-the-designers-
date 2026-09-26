import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { StarAccent } from './ArkAjaMonogram';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F7F5EF] text-[#141312] border-b border-[#E5E0D8] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#8F6F3A] font-bold mb-2">
            <StarAccent size={12} />
            <span>SERVICES &amp; CAPABILITIES</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312]">
            WHAT WE CREATE
          </h2>
          <p className="text-sm sm:text-base text-[#66605B] mt-3 font-sans leading-relaxed">
            High-aesthetic visual content tailored to your brand&apos;s unique voice, engineered to command attention on modern social channels.
          </p>
        </div>

        {/* Four Service Blocks */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="group p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E0D8] hover:border-[#B38F5B] hover:shadow-[0_12px_30px_rgba(20,19,18,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8F6F3A] font-bold mb-6">
                  <span>0{index + 1}</span>
                  <span className="text-[10px] text-[#8C827A] uppercase tracking-wider font-sans font-semibold">
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#141312] group-hover:text-[#8F6F3A] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-[#66605B] font-sans mt-3 leading-relaxed">
                  {service.description}
                </p>

                <div className="w-8 h-px bg-[#E5E0D8] my-6 group-hover:w-16 group-hover:bg-[#8F6F3A] transition-all" />

                <ul className="space-y-2.5 text-xs text-[#4A4540] font-sans">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8F6F3A] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {service.note && (
                  <div className="mt-6 p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-[11px] text-[#66605B] italic">
                    {service.note}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-[#E5E0D8]">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full flex items-center justify-between text-xs tracking-wider uppercase font-bold text-[#8F6F3A] group-hover:text-[#141312] transition-colors"
                >
                  <span>REQUEST INQUIRY</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
