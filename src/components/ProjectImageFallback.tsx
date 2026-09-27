import React, { useState } from 'react';
import { ImageOff, RefreshCw, AlertCircle } from 'lucide-react';

interface ProjectImageFallbackProps {
  projectTitle: string;
  itemTitle?: string;
  badge?: string;
  headline?: string;
  themeBg?: string;
  themeAccent?: string;
  onRetry?: () => void;
  className?: string;
}

export const ProjectImageFallback: React.FC<ProjectImageFallbackProps> = ({
  projectTitle,
  itemTitle,
  badge,
  headline,
  themeBg = '#181614',
  onRetry,
  className = ''
}) => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRetry) {
      setRetrying(true);
      setTimeout(() => {
        setRetrying(false);
        onRetry();
      }, 400);
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-5 sm:p-7 select-none overflow-hidden border border-[#3A342E]/50 ${className}`}
      style={{ backgroundColor: themeBg || '#181614' }}
    >
      {/* Background subtle radial texture & ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#D4B98C]/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#D4B98C]/10 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4B98C_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Bar: Badge & Network Fallback Status */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="text-[10px] tracking-widest uppercase font-mono px-2.5 py-1 rounded bg-[#25221F]/90 border border-[#443C34] text-[#D4B98C] font-semibold">
          {badge || 'CAMPAIGN VISUAL'}
        </span>

        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono">
          <AlertCircle size={11} className="shrink-0" />
          <span>Network Fallback</span>
        </span>
      </div>

      {/* Center: Placeholder with Project Title */}
      <div className="relative z-10 my-auto py-3 sm:py-4 flex flex-col items-center justify-center text-center px-2">
        {/* Placeholder Graphic / Frame */}
        <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#23201C] border border-[#443C34] flex items-center justify-center text-[#D4B98C] shadow-lg mb-3 group-hover:scale-105 transition-transform">
          <ImageOff size={22} className="opacity-80 text-[#D4B98C]" />
        </div>

        {/* Project Title (Prominent) */}
        <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[#F7F5EF] uppercase leading-tight">
          {projectTitle}
        </h3>

        {/* Item Title / Subtext */}
        {itemTitle && (
          <p className="text-xs sm:text-sm text-[#D4B98C] font-serif font-medium mt-1.5 max-w-sm line-clamp-2">
            {itemTitle}
          </p>
        )}

        {headline && (
          <p className="text-[11px] text-[#A7A19A] mt-1 max-w-xs line-clamp-1 italic font-sans">
            &ldquo;{headline}&rdquo;
          </p>
        )}

        {/* Network guidance & Retry Button */}
        <p className="text-[10px] sm:text-[11px] text-[#8C827A] mt-2 max-w-xs font-sans">
          Image preview temporarily unavailable
        </p>

        {onRetry && (
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="mt-3.5 px-3.5 py-1.5 rounded-md bg-[#25221F] hover:bg-[#322C26] active:bg-[#1E1B18] border border-[#52483E] text-white text-[11px] font-mono font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            aria-label="Retry loading image"
          >
            <RefreshCw size={12} className={`text-[#D4B98C] ${retrying ? 'animate-spin' : ''}`} />
            <span>{retrying ? 'Connecting...' : 'Retry Image'}</span>
          </button>
        )}
      </div>

      {/* Bottom Bar: Editorial Studio Attribution */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-[#8C827A] font-mono border-t border-[#3A342E]/60 pt-2.5">
        <span>ARKAJA STUDIO</span>
        <span className="text-[#D4B98C]/80 uppercase tracking-wider">Concept Editorial</span>
      </div>
    </div>
  );
};
