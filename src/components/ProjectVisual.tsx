import React, { useState, useEffect } from 'react';
import { ProjectVisualItem } from '../types';
import { Maximize2 } from 'lucide-react';
import { useImageStorage } from '../context/ImageStorageContext';
import { DigitalPosterCard } from './DigitalPosterCard';
import { ProjectImageFallback } from './ProjectImageFallback';

interface ProjectVisualProps {
  item: ProjectVisualItem;
  className?: string;
  isHero?: boolean;
  contain?: boolean;
  showOverlayHover?: boolean;
  onMagnify?: () => void;
  projectTitle?: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  item,
  className = '',
  contain = false,
  showOverlayHover = true,
  onMagnify,
  projectTitle
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { getImageForSlot } = useImageStorage();

  // Custom user uploaded image from storage takes top priority, then explicit imageSrc
  const customUploaded = getImageForSlot(item.id);
  const activeImage = customUploaded || item.imageSrc || '';

  // Derive prominent project title fallback if not explicitly provided
  const resolvedProjectTitle =
    projectTitle ||
    (item as any).parentProject?.name ||
    (item.id.startsWith('lumiere')
      ? 'LUMIÈRE'
      : item.id.startsWith('noir')
      ? 'NOIR & BEAN'
      : item.id.startsWith('elan')
      ? 'ÉLAN'
      : item.id.startsWith('saree')
      ? 'SAREE COLLECTIONS'
      : item.id.startsWith('muse')
      ? 'MUSE BEAUTY LONDON'
      : 'ARKAJA STUDIO');

  // Reset loading and error states whenever the image source switches
  useEffect(() => {
    setImageLoaded(false);
    setHasError(false);

    if (!activeImage) return;

    // Check if the image is already cached and loaded by the browser
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setImageLoaded(true);
        return;
      }
    }

    // Safety watchdog: If an image takes longer than 2.5 seconds (network stall / blocked CDN),
    // mark error to display graceful fallback rather than indefinite loading spinner
    const timer = window.setTimeout(() => {
      if (imgRef.current) {
        if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
          setImageLoaded(true);
        } else {
          setHasError(true);
        }
      } else {
        setHasError(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [activeImage]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#181715] group ${className}`}
      style={{ backgroundColor: item.themeBg || '#181715' }}
    >
      {/* 1. If an image exists and has not errored, render the photo with digital poster as instant underlay */}
      {activeImage && !hasError ? (
        <div className="relative w-full h-full">
          {/* Base poster underlay while image is decoding or loading so user never sees a blank screen */}
          {!imageLoaded && (
            <div className="absolute inset-0 z-0">
              <DigitalPosterCard item={item} />
            </div>
          )}
          <img
            ref={imgRef}
            key={activeImage}
            src={activeImage}
            alt={item.title}
            decoding="async"
            onLoad={() => {
              setImageLoaded(true);
              setHasError(false);
            }}
            onError={() => {
              setHasError(true);
              setImageLoaded(false);
            }}
            className={`relative z-1 w-full h-full transition-all duration-500 ease-out group-hover:scale-[1.03] ${
              contain ? 'object-contain' : 'object-cover object-center'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      ) : hasError ? (
        /* 2. Fallback UI displaying placeholder with project title when image fails to load */
        <ProjectImageFallback
          projectTitle={resolvedProjectTitle}
          itemTitle={item.title}
          badge={item.badge || item.type}
          headline={item.headline}
          themeBg={item.themeBg}
          onRetry={() => {
            setHasError(false);
            setImageLoaded(false);
          }}
        />
      ) : (
        /* 3. Otherwise render the digital poster matching the exact user poster design */
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
