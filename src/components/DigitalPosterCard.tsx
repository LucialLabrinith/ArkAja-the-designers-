import React from 'react';
import { ProjectVisualItem } from '../types';

interface DigitalPosterCardProps {
  item: ProjectVisualItem;
  className?: string;
  onUploadClick?: () => void;
}

export const DigitalPosterCard: React.FC<DigitalPosterCardProps> = ({
  item,
  className = '',
  onUploadClick
}) => {
  const style = item.graphicStyle || '';

  // 1. Élan: "THE 9-5 LOOK BUT MAKE IT EXPENSIVE."
  if (style === 'elan_expensive_reel' || item.id === 'elan-3') {
    return (
      <div className={`relative w-full h-full bg-[#18191B] text-white overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}>
        {/* Background urban concrete architectural grid effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B2D31]/40 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8E939D_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top Bold Condensed Typography */}
        <div className="relative z-10 pt-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-[1.05] font-sans">
            THE 9–5 LOOK<br />
            BUT MAKE IT<br />
            <span className="italic font-black text-[#D4B98C]">EXPENSIVE.</span>
          </h2>
        </div>

        {/* Center Stylized Fashion Silhouette Frame */}
        <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center">
          <div className="w-36 h-48 rounded-md border border-white/20 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center p-3 shadow-2xl relative overflow-hidden group">
            <div className="w-12 h-16 border-t-2 border-r-2 border-white/40 mb-2 rotate-45" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4B98C]">ÉLAN TAILORING</span>
            <span className="text-[9px] text-white/50 font-sans mt-0.5">Charcoal Wool Suiting</span>
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-white/60 font-mono border-t border-white/10 pt-3">
          <span>OOTD REEL HOOK</span>
          <span className="text-[#D4B98C] font-semibold">ARKAJA STUDIO</span>
        </div>
      </div>
    );
  }

  // 2. Saree: "The Clothes of V. P. / The BIRLA SAREES"
  if (style === 'saree_birla' || item.id === 'saree-2') {
    return (
      <div className={`relative w-full h-full bg-[#EDE5D8] text-[#1C1917] overflow-hidden flex flex-col justify-between p-5 select-none ${className}`}>
        {/* Ornate border texture */}
        <div className="absolute inset-2 border-2 border-[#8A2B3A]/30 pointer-events-none" />
        <div className="absolute inset-3 border border-[#8A2B3A]/20 pointer-events-none" />

        {/* Top Vintage Script */}
        <div className="relative z-10 text-center pt-2">
          <h2 className="text-xl sm:text-2xl font-serif italic text-[#1D3557] font-bold tracking-wide">
            The Clothes of V. P.
          </h2>
        </div>

        {/* Center Layout with Vertical Text and Postage Stamp Centerpiece */}
        <div className="relative z-10 my-auto flex items-center justify-between px-2 gap-2">
          {/* Left Vertical Banner */}
          <div className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-bold tracking-[0.3em] text-[#8A2B3A] font-serif uppercase">
            INDIAN SAREES
          </div>

          {/* Scalloped Postage Stamp Photo Frame */}
          <div className="relative w-40 sm:w-44 h-48 bg-white p-2 shadow-lg border-2 border-dashed border-[#8A2B3A]/40 flex flex-col items-center justify-center text-center">
            <div className="w-full h-full bg-[#FAF6EE] border border-[#E0D5C3] p-2 flex flex-col items-center justify-center">
              <span className="text-xs font-serif font-bold text-[#8A2B3A]">ROYAL HERITAGE</span>
              <div className="w-10 h-0.5 bg-[#B38F5B] my-2" />
              <p className="text-[10px] text-[#4A4540] italic font-serif">Dual Regal Weaves</p>
              <span className="text-[9px] text-[#8A2B3A] mt-2 font-mono uppercase">Silk &amp; Zari</span>
            </div>
          </div>

          {/* Right Vertical Banner */}
          <div className="[writing-mode:vertical-rl] text-[11px] font-bold tracking-[0.25em] text-[#8A2B3A] font-serif uppercase">
            THE TRADEMARK OF INDIA
          </div>
        </div>

        {/* Bottom Vintage Brand Label */}
        <div className="relative z-10 text-center pb-2">
          <span className="text-lg sm:text-xl font-black font-sans tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#2B4C7E] to-[#B33951] uppercase">
            The BIRLA SAREES
          </span>
        </div>
      </div>
    );
  }

  // 3. Saree: "SAREE COLLECTIONS - Live Royal, Wear Royal. - KANKATALA"
  if (style === 'saree_royal_banarasi' || item.id === 'saree-1') {
    return (
      <div className={`relative w-full h-full bg-[#FAF7F2] text-[#141312] overflow-hidden flex flex-col justify-between p-5 select-none ${className}`}>
        <div className="absolute inset-3 border border-[#E7E1D7] pointer-events-none" />

        {/* Top Headings */}
        <div className="relative z-10 text-center pt-2">
          <span className="text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[#332F2B] block mb-1">
            SAREE COLLECTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-[#1E3A8A] font-bold">
            Live Royal, Wear Royal.
          </h2>
        </div>

        {/* Dual Framed Photos in Center */}
        <div className="relative z-10 my-auto grid grid-cols-2 gap-3 px-2">
          {/* Left Frame: Brocade Silk */}
          <div className="aspect-[3/4] bg-[#5C0D1B] border-2 border-[#1E1B18] shadow-md p-3 flex flex-col justify-end text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:8px_8px]" />
            <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">PURE SILK</span>
            <span className="text-xs font-serif font-bold text-white">Gold Zari Jaal</span>
          </div>

          {/* Right Frame: Peacock Blue Saree */}
          <div className="aspect-[3/4] bg-[#0E3A42] border-2 border-[#1E1B18] shadow-md p-3 flex flex-col justify-end text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:8px_8px]" />
            <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">PEACOCK BLUE</span>
            <span className="text-xs font-serif font-bold text-white">Temple Arch Drape</span>
          </div>
        </div>

        {/* Bottom Editorial Footer */}
        <div className="relative z-10 border-t border-[#E5DFD5] pt-3 flex items-center justify-between text-[10px] font-sans font-bold tracking-wider uppercase text-[#846834]">
          <span>SUSTAINABLE LIFESTYLE</span>
          <span>FAIR TRADE</span>
        </div>
      </div>
    );
  }

  // 4. Lumière: "POV: YOU FINALLY BOOKED THE FACIAL..."
  if (style === 'lumiere_reel_hook' || item.id === 'lumiere-3') {
    return (
      <div className={`relative w-full h-full bg-[#0D0C0B] text-white overflow-hidden flex flex-col justify-between select-none ${className}`}>
        {/* Split Screen Background */}
        <div className="absolute inset-0 grid grid-cols-2 divide-x divide-white/20">
          <div className="bg-[#1C1815] flex flex-col items-center justify-center p-3 opacity-60">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4B98C] mb-1">CLINICAL HYDRAFACIAL</span>
            <span className="text-[10px] text-white/70">Wand Extraction</span>
          </div>
          <div className="bg-[#241F1A] flex flex-col items-center justify-center p-3 opacity-60">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4B98C] mb-1">GLOWING RADIANCE</span>
            <span className="text-[10px] text-white/70">Restorative Care</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        {/* Center Typography Box */}
        <div className="relative z-10 m-auto p-5 text-center max-w-xs">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug drop-shadow-lg uppercase tracking-wide">
            POV: YOU FINALLY BOOKED THE FACIAL YOU&apos;VE BEEN POSTPONING.
          </h2>
          <div className="w-12 h-0.5 bg-[#D4B98C] mx-auto my-3" />
          <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-[#D4B98C] font-semibold">
            LUMIÈRE BEAUTY | CONCEPT BY ARKAJA STUDIO
          </span>
        </div>

        {/* Bottom Tag */}
        <div className="relative z-10 p-3 text-center bg-black/60 backdrop-blur-xs border-t border-white/10 text-[9px] font-mono text-white/60 uppercase tracking-widest">
          VERTICAL REEL COVER • 9:16 HIGH RETENTION
        </div>
      </div>
    );
  }

  // 5. Lumière: "YOUR GLOW. ELEVATED."
  if (style === 'lumiere_hero_ad' || item.id === 'lumiere-1') {
    return (
      <div className={`relative w-full h-full bg-[#181614] text-white overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,_rgba(212,185,140,0.18),_transparent_70%)] blur-2xl" />

        {/* Top Logo */}
        <div className="relative z-10">
          <h3 className="text-lg font-serif font-bold tracking-widest uppercase text-[#FAF7F2]">LUMIÈRE</h3>
          <span className="text-[9px] tracking-[0.3em] font-sans uppercase text-[#D4B98C]">Skin • Hair • Beauty</span>
        </div>

        {/* Center Glow Silhouette Accent */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
          <div className="w-24 h-24 rounded-full border border-[#D4B98C]/40 bg-[#D4B98C]/10 flex items-center justify-center shadow-[0_0_40px_rgba(212,185,140,0.2)]">
            <span className="text-xs font-serif italic text-[#D4B98C]">Luminous Skin</span>
          </div>
        </div>

        {/* Bottom Messaging and CTA Card */}
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white uppercase leading-none">
            YOUR GLOW.<br />
            <span className="text-[#D4B98C]">ELEVATED.</span>
          </h2>
          <p className="text-xs text-[#FAF7F2]/90 font-sans font-medium mt-2">Signature Hydrafacial</p>
          <p className="text-[10px] text-[#A7A19A]">Deep cleanse • Hydrate • Renew</p>

          <div className="mt-4 inline-block px-4 py-2 bg-[#9E8256] text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md">
            BOOK YOUR GLOW
          </div>
        </div>
      </div>
    );
  }

  // 6. Lumière: "THE GLOW EDIT - ₹2,499"
  if (style === 'lumiere_glow_offer' || item.id === 'lumiere-2') {
    return (
      <div className={`relative w-full h-full bg-[#FAF7F2] text-[#1C1917] overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}>
        {/* Top Header */}
        <div className="relative z-10 text-center border-b border-[#E5DFD5] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-[#4A402E] uppercase">
            THE GLOW EDIT
          </h2>
        </div>

        {/* Middle Visual Highlights */}
        <div className="relative z-10 my-auto grid grid-cols-2 gap-3 py-4 items-center">
          <div className="p-3 bg-white rounded-lg border border-[#E5DFD5] text-center shadow-xs">
            <span className="text-xs font-serif font-bold text-[#846834] block">TREATMENT</span>
            <p className="text-[10px] text-[#4A4540] mt-1">LED Therapy &amp; Facial Massage</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-[#E5DFD5] text-center shadow-xs">
            <span className="text-xs font-serif font-bold text-[#846834] block">SERUM ACTIVES</span>
            <p className="text-[10px] text-[#4A4540] mt-1">Hydra-Glow Elixir 30ml</p>
          </div>
        </div>

        {/* Bottom Offer Block */}
        <div className="relative z-10 text-center border-t border-[#E5DFD5] pt-3">
          <p className="text-xs font-serif text-[#1C1917]">Hydrafacial + LED Therapy + Face Massage</p>
          <div className="flex items-center justify-center gap-2 my-2">
            <span className="text-xs text-[#8C827A] line-through">₹3,499</span>
            <span className="text-lg font-bold text-[#1C1917]">₹2,499</span>
          </div>
          <span className="text-[10px] text-[#846834] block mb-3 font-medium">Limited appointments available</span>

          <div className="inline-block px-5 py-2 bg-[#9E8256] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-md">
            BOOK NOW
          </div>
        </div>
      </div>
    );
  }

  // 7. Noir & Bean: "YOUR 4PM DESERVES THIS."
  if (style === 'noir_afternoon_latte' || item.id === 'noir-1') {
    return (
      <div className={`relative w-full h-full bg-[#181411] text-white overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Bold Condensed Typography */}
        <div className="relative z-10 pt-2">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-[0.95] font-sans">
            YOUR 4PM<br />
            <span className="text-[#DDB382]">DESERVES THIS.</span>
          </h2>
          <p className="text-xs text-[#EAE5DC] font-serif italic mt-2">
            Vanilla Cloud Latte | Available this week
          </p>
        </div>

        {/* Center Latte Glass Silhouette */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
          <div className="w-24 h-36 rounded-t-lg rounded-b-xl border border-[#DDB382]/40 bg-gradient-to-t from-[#36261A] via-[#855B39] to-[#EAE0D2] p-2 flex flex-col justify-between shadow-2xl">
            <span className="text-[9px] font-mono text-black font-bold uppercase text-center">COLD FOAM</span>
            <span className="text-[9px] font-mono text-[#DDB382] uppercase text-center">ESPRESSO POUR</span>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-[#EAE5DC]/70 font-mono border-t border-white/10 pt-3">
          <span>SPECIALTY ICED BEVERAGE</span>
          <span className="text-[#DDB382] font-semibold">NOIR &amp; BEAN</span>
        </div>
      </div>
    );
  }

  // 8. Noir & Bean: "SATURDAY BRUNCH CLUB - ₹499"
  if (style === 'noir_brunch_club' || item.id === 'noir-2') {
    return (
      <div className={`relative w-full h-full bg-[#F5EFE6] text-[#1E1B18] overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}>
        {/* Top Branding and Offer */}
        <div className="relative z-10 text-center border-b border-[#E0D5C5] pb-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#825B36] font-semibold block mb-0.5">
            NOIR &amp; BEAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B18] leading-tight">
            SATURDAY<br />BRUNCH CLUB
          </h2>
        </div>

        {/* Center Spread Card */}
        <div className="relative z-10 my-auto py-3 text-center">
          <div className="p-4 bg-white/80 rounded-xl border border-[#D9CDBB] shadow-sm max-w-xs mx-auto">
            <p className="text-sm font-serif font-bold text-[#1E1B18]">Coffee + Croissant + Eggs</p>
            <span className="text-2xl font-black text-[#825B36] block my-1">₹499</span>
            <span className="text-[10px] font-mono text-[#66605B] uppercase tracking-wider">Saturdays • 9AM–1PM</span>
          </div>
        </div>

        {/* Bottom Reservation Button */}
        <div className="relative z-10 text-center pt-2">
          <div className="inline-block px-5 py-2 bg-[#1E1B18] text-[#F5EFE6] text-xs font-semibold tracking-wider uppercase rounded-md shadow-md">
            Reserve your table
          </div>
        </div>
      </div>
    );
  }

  // 9. Élan: "THE AUTUMN EDIT - COLLECTION 02 / 2026"
  if (style === 'elan_autumn_drop' || item.id === 'elan-1') {
    return (
      <div className={`relative w-full h-full bg-[#1C1A18] text-white overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

        {/* Top Typography */}
        <div className="relative z-10 text-center pt-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-white uppercase">
            THE AUTUMN EDIT
          </h2>
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#D4B98C] font-semibold block mt-1">
            COLLECTION 02 / 2026
          </span>
        </div>

        {/* Center Parisian Coat Visual Card */}
        <div className="relative z-10 my-auto text-center py-4">
          <div className="w-28 h-40 border border-white/20 bg-white/5 backdrop-blur-xs rounded-md mx-auto p-3 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-[#D4B98C] uppercase">PARISIAN COAT</span>
            <span className="text-[10px] font-serif italic text-white/90">Charcoal Tailored Wool</span>
            <span className="text-[9px] font-mono text-white/50 uppercase">RUE SAINT-PAUL</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 text-center pb-2">
          <span className="text-xs font-serif tracking-widest text-[#FAF7F2] uppercase font-semibold border-b border-[#FAF7F2]/40 pb-1">
            SHOP THE COLLECTION →
          </span>
        </div>
      </div>
    );
  }

  // 10. Élan: "3 WAYS TO STYLE ONE BLAZER"
  if (style === 'elan_blazer_guide' || item.id === 'elan-2') {
    return (
      <div className={`relative w-full h-full bg-[#EFEBE5] text-[#141312] overflow-hidden flex flex-col justify-between p-6 select-none ${className}`}>
        {/* Top Header */}
        <div className="relative z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B655D] font-semibold block">
            ÉLAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight uppercase leading-none mt-1">
            3 WAYS TO STYLE<br />ONE BLAZER
          </h2>
          <p className="text-[11px] font-serif font-medium text-[#4A4540] mt-2">
            01 Office • 02 Dinner • 03 Weekend
          </p>
        </div>

        {/* Center Studio Rack Silhouette */}
        <div className="relative z-10 my-auto grid grid-cols-3 gap-2 text-center py-3">
          <div className="p-2 bg-white/80 rounded-md border border-[#D9D3CA]">
            <span className="text-[9px] font-mono text-[#8C827A] block">01</span>
            <span className="text-[10px] font-bold text-[#141312]">OFFICE</span>
          </div>
          <div className="p-2 bg-white/80 rounded-md border border-[#D9D3CA]">
            <span className="text-[9px] font-mono text-[#8C827A] block">02</span>
            <span className="text-[10px] font-bold text-[#141312]">DINNER</span>
          </div>
          <div className="p-2 bg-white/80 rounded-md border border-[#D9D3CA]">
            <span className="text-[9px] font-mono text-[#8C827A] block">03</span>
            <span className="text-[10px] font-bold text-[#141312]">WEEKEND</span>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#6B655D] border-t border-[#D9D3CA] pt-3">
          <span>EDUCATIONAL CAROUSEL</span>
          <span className="font-semibold text-[#141312]">SWIPE TO VIEW →</span>
        </div>
      </div>
    );
  }

  // 11. Muse Beauty London: Curated 9-Grid System
  if (style === 'muse_beauty_grid' || item.id === 'muse-1') {
    return (
      <div className={`relative w-full h-full bg-[#FAF8F5] text-[#141312] overflow-hidden flex flex-col justify-between p-5 select-none ${className}`}>
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#E8E2D8] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAE4D9] border border-[#D5CCA6] flex flex-col items-center justify-center text-center">
              <span className="text-[8px] font-serif font-bold text-[#141312] leading-none">MUSE</span>
              <span className="text-[5px] uppercase tracking-tighter text-[#66605B]">LONDON</span>
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold tracking-wider text-[#141312] uppercase">
                MUSE BEAUTY LONDON
              </h2>
              <span className="text-[9px] text-[#66605B] font-mono">@musebeautyldn • Concept Project</span>
            </div>
          </div>
        </div>

        {/* 9-Grid Representation */}
        <div className="relative z-10 my-auto grid grid-cols-3 gap-1.5 py-3">
          {[
            'MUSE GLOW',
            'AMBER DROPPERS',
            'THE GLOW EDIT',
            'EDITORIAL BOOK',
            'DEW DROPS',
            'SHELF DISPLAY',
            'THE RITUAL',
            'APOTHECARY VIALS',
            'PURE ESSENCE'
          ].map((title, i) => (
            <div
              key={i}
              className="aspect-square bg-[#EFEAE2] border border-[#DDD5C7] rounded-sm flex flex-col items-center justify-center p-1 text-center"
            >
              <span className="text-[7px] font-mono text-[#8C827A] mb-0.5">0{i + 1}</span>
              <span className="text-[8px] font-serif font-semibold text-[#2C2723] line-clamp-2 leading-tight">
                {title}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Tag */}
        <div className="relative z-10 text-center text-[9px] font-mono text-[#66605B] uppercase tracking-widest border-t border-[#E8E2D8] pt-2">
          CURATED 9-GRID INSTAGRAM FEED • BRITISH MINIMALIST LUXURY
        </div>
      </div>
    );
  }

  // Fallback Generic Poster
  return (
    <div className={`relative w-full h-full bg-[#181614] text-[#FAF7F2] p-6 flex flex-col justify-between ${className}`}>
      <span className="text-[10px] font-mono text-[#D4B98C] uppercase tracking-widest">{item.badge || 'CAMPAIGN ASSET'}</span>
      <div className="my-auto text-center">
        <h3 className="text-lg font-serif font-bold text-white">{item.title}</h3>
        <p className="text-xs text-[#A7A19A] mt-1">{item.headline}</p>
      </div>
      <span className="text-[10px] text-white/50 font-mono text-center">ArkAja Studio</span>
    </div>
  );
};
