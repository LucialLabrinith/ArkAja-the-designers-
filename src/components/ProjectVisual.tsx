import React, { useState, useEffect } from 'react';
import { ProjectVisualItem } from '../types';
import { Maximize2 } from 'lucide-react';
import { useImageStorage } from '../context/ImageStorageContext';
import { DigitalPosterCard } from './DigitalPosterCard';

interface ProjectVisualProps {
  item: ProjectVisualItem;
  className?: string;
  isHero?: boolean;
  contain?: boolean;
  showOverlayHover?: boolean;
  onMagnify?: () => void;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  item,
  className = '',
  contain = false,
  showOverlayHover = true,
  onMagnify
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { getImageForSlot } = useImageStorage();

  // Custom user uploaded image from storage takes top priority, then explicit imageSrc
  const customUploaded = getImageForSlot(item.id);
  const activeImage = customUploaded || item.imageSrc || '';

  // Reset loading and error states whenever the image source switches
  useEffect(() => {
    setImageLoaded(false);
    setHasError(false);
  }, [activeImage]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#181715] group ${className}`}
      style={{ backgroundColor: item.themeBg || '#181715' }}
    >
      {/* 1. If an image exists and has not errored, render the photo */}
      {activeImage && !hasError ? (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1A1816] z-0">
              <div className="w-6 h-6 border-2 border-[#D4B98C] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            key={activeImage}
            src={activeImage}
            alt={item.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
              contain ? 'object-contain' : 'object-cover object-center'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      ) : (
        /* 2. Otherwise render the digital poster matching the exact user poster design */
        <DigitalPosterCard item={item} />
      )}

      {/* Subtle bottom gradient for card readability */}
      {showOverlayHover && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-4">
          <div className="text-white">
            <span className="text-[10px] uppercase tracking-widest text-[#D4B98C] font-semibold block">
              {item.badge || item.type}
            </span>
            <span className="text-sm font-serif font-medium line-clamp-1">{item.title}</span>
          </div>
        </div>
      )}

      {/* Action buttons (Magnify) */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {onMagnify && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMagnify();
            }}
            aria-label="Enlarge artwork"
            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#141312] transition-all hover:scale-105"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
