import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/pricingData';
import { StarAccent } from './ArkAjaMonogram';
import { Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (packageId: 'STARTER' | 'SIGNATURE' | 'CUSTOM') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'GBP'>('INR');

  const formatPrice = (plan: typeof PRICING_PLANS[0]) => {
    if (plan.id === 'CUSTOM') return 'Modular Pricing';
    if (currency === 'INR') return `₹${plan.priceINR.toLocaleString('en-IN')}`;
    if (currency === 'USD') return `$${plan.priceUSD}`;
    return `£${plan.priceGBP}`;
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#FAF8F5] text-[#141312] border-b border-[#E5E0D8] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.3em] uppercase text-[#8F6F3A] font-bold mb-2">
            <StarAccent size={12} />
            <span>INVESTMENT</span>
            <StarAccent size={12} />
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312]">
            READY TO CREATE?
          </h2>
          <p className="text-sm sm:text-base text-[#66605B] mt-2 font-sans">
            Transparent creative project packages. No hidden retainers, no recurring lock-ins.
          </p>

          {/* Currency / Region Toggle for USA, UK, and India */}
          <div className="mt-6 inline-flex items-center p-1 rounded-lg bg-white border border-[#E5E0D8] text-xs shadow-2xs">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                currency === 'USD'
                  ? 'bg-[#141312] text-[#F7F5EF]'
                  : 'text-[#66605B] hover:text-[#141312]'
              }`}
            >
              USA ($)
            </button>
            <button
              onClick={() => setCurrency('GBP')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                currency === 'GBP'
                  ? 'bg-[#141312] text-[#F7F5EF]'
                  : 'text-[#66605B] hover:text-[#141312]'
              }`}
            >
              UK (£)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                currency === 'INR'
                  ? 'bg-[#141312] text-[#F7F5EF]'
                  : 'text-[#66605B] hover:text-[#141312]'
              }`}
            >
              India (₹)
            </button>
          </div>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isSignature = plan.id === 'SIGNATURE';

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 bg-white ${
                  isSignature
                    ? 'border-2 border-[#8F6F3A] shadow-[0_16px_40px_rgba(143,111,58,0.12)] lg:-translate-y-2'
                    : 'border border-[#E5E0D8] hover:border-[#8F6F3A]/60 shadow-xs'
                }`}
              >
                {isSignature && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8F6F3A] text-white text-[10px] font-bold tracking-[0.25em] uppercase font-mono shadow-sm">
                    MOST POPULAR • SIGNATURE
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-2xl font-bold tracking-wider text-[#141312]">
                      {plan.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#8F6F3A] font-bold tracking-wide">
                      {plan.turnaround}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#141312]">
                      {formatPrice(plan)}
                    </span>
                    {plan.id !== 'CUSTOM' && (
                      <span className="text-xs text-[#66605B] font-sans">
                        / project package
                      </span>
                    )}
                  </div>

                  {/* Deliverables Section */}
                  <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
                    <span className="block text-[10px] tracking-[0.25em] uppercase text-[#8F6F3A] font-bold mb-3">
                      DELIVERABLES INCLUDED
                    </span>
                    <ul className="space-y-2.5 text-xs text-[#36322E] font-sans">
                      {plan.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#8F6F3A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-[#E5E0D8]">
                    <span className="block text-[10px] tracking-[0.25em] uppercase text-[#8C827A] font-bold mb-3">
                      PRODUCTION HIGHLIGHTS
                    </span>
                    <ul className="space-y-2 text-xs text-[#66605B] font-sans">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#8C827A]">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-10 pt-4">
                  <button
                    onClick={() => onSelectPackage(plan.id)}
                    className={`w-full py-3.5 px-6 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 ${
                      isSignature
                        ? 'bg-[#141312] hover:bg-[#2C2825] text-[#F7F5EF] shadow-sm'
                        : 'border border-[#141312]/30 hover:border-[#141312] text-[#141312] hover:bg-black/5'
                    }`}
                  >
                    <span>{plan.id === 'CUSTOM' ? 'CUSTOMIZE PARCEL' : 'ENQUIRE PACKAGE'}</span>
                    <ArrowRight size={14} className={isSignature ? 'text-[#D4B98C]' : 'text-[#8F6F3A]'} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
