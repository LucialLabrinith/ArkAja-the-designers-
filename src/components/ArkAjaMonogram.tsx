import React from 'react';

interface MonogramProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const ArkAjaMonogram: React.FC<MonogramProps> = ({
  className = '',
  size = 40,
  glow = false
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="ArkAja Studio Monogram"
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4B98C 0%, transparent 70%)' }}
        />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="arkajaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E6CA" />
            <stop offset="50%" stopColor="#D4B98C" />
            <stop offset="100%" stopColor="#9C7E52" />
          </linearGradient>
          <linearGradient id="arkajaGoldLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2DC" />
            <stop offset="100%" stopColor="#C4A36E" />
          </linearGradient>
        </defs>

        {/* Primary upright 'A' */}
        {/* Left leg of upright A */}
        <polygon
          points="50,10 56,10 32,84 24,84"
          fill="url(#arkajaGoldGrad)"
        />
        {/* Right leg of upright A */}
        <polygon
          points="50,10 44,10 68,84 76,84"
          fill="url(#arkajaGoldGrad)"
        />
        {/* Horizontal crossbar */}
        <polygon
          points="31,58 69,58 67,64 33,64"
          fill="url(#arkajaGoldLight)"
        />

        {/* Inverted intertwined 'A' / 'V' creating the monogram diamond lock */}
        {/* Left arm of inverted mark */}
        <polygon
          points="20,26 27,26 50,78 44,78"
          fill="url(#arkajaGoldGrad)"
          opacity="0.95"
        />
        {/* Right arm of inverted mark */}
        <polygon
          points="80,26 73,26 50,78 56,78"
          fill="url(#arkajaGoldGrad)"
          opacity="0.95"
        />
        {/* Lower crossbar for the inverted A */}
        <polygon
          points="35,36 65,36 67,41 33,41"
          fill="url(#arkajaGoldLight)"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

export const StarAccent: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 14
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: size, height: size }}
    className={`inline-block text-[#D4B98C] ${className}`}
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const ArkAjaWordmark: React.FC<{
  monogramSize?: number;
  showSubtitle?: boolean;
  className?: string;
}> = ({ monogramSize = 32, showSubtitle = true, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      <ArkAjaMonogram size={monogramSize} />
      <div className="flex flex-col leading-none">
        <span className="font-editorial text-lg md:text-xl font-bold tracking-[0.25em] text-[#F7F5EF] uppercase group-hover:text-[#D4B98C] transition-colors">
          ARKAJA
        </span>
        {showSubtitle && (
          <span className="text-[9px] tracking-[0.38em] text-[#A7A19A] uppercase font-sans mt-0.5 font-medium">
            STUDIO
          </span>
        )}
      </div>
    </div>
  );
};
