import React, { useEffect } from 'react';
import { ProjectVisualItem } from '../types';
import { ProjectVisual } from './ProjectVisual';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ProjectVisualItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  projectName: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectIndex,
  projectName
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % items.length);
  };

  const [touchStart, setTouchStart] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left -> next
        onSelectIndex((currentIndex + 1) % items.length);
      } else {
        // Swiped right -> prev
        onSelectIndex((currentIndex - 1 + items.length) % items.length);
      }
    }
    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 select-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Editorial visual lightbox"
    >
      {/* Top bar controls */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20 text-[#F7F5EF]">
        <div className="flex items-center gap-3">
          <span className="font-editorial text-sm tracking-[0.2em] uppercase font-semibold text-[#D4B98C]">
            {projectName}
          </span>
          <span className="text-[#A7A19A] text-xs font-mono">
            [{currentIndex + 1} / {items.length}]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5EF] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4B98C]"
            aria-label="Close fullscreen visual"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main visual frame */}
      <div
        className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-3xl aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] max-h-[75vh] shadow-2xl relative rounded-xl overflow-hidden bg-black/40">
          <ProjectVisual
            item={currentItem}
            projectTitle={projectName}
            className="h-full w-full"
            contain={true}
            showOverlayHover={false}
          />
        </div>

        {/* Caption & Metadata */}
        <div className="mt-4 text-center max-w-xl px-4">
          <span className="text-[10px] tracking-widest uppercase font-mono text-[#D4B98C] font-semibold block mb-1">
            {currentItem.badge || currentItem.type}
          </span>
          <h4 className="font-editorial text-lg text-[#F7F5EF] font-medium">
            {currentItem.title}
          </h4>
          <p className="text-xs text-[#A7A19A] mt-1 font-sans leading-relaxed">
            {currentItem.caption}
          </p>
        </div>
      </div>

      {/* Previous / Next Arrow Controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/15 text-[#F7F5EF] hover:bg-[#D4B98C] hover:text-[#0B0B0B] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4B98C]"
            aria-label="Previous visual"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/15 text-[#F7F5EF] hover:bg-[#D4B98C] hover:text-[#0B0B0B] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4B98C]"
            aria-label="Next visual"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Keyboard hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 text-[11px] text-[#A7A19A]/80 font-sans">
        <span>Use arrow keys to navigate</span>
        <span>•</span>
        <span>Esc to close</span>
      </div>
    </div>
  );
};
