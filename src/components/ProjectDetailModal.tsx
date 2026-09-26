import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ProjectVisual } from './ProjectVisual';
import { LightboxModal } from './LightboxModal';
import { ArrowLeft, ArrowRight, X, Maximize2, CheckCircle2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onStartProject: (suggestedCategory?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
  onStartProject
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !lightboxOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, lightboxOpen, onClose]);

  if (!isOpen || !project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 overflow-y-auto bg-[#F7F5EF] text-[#141312] animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} Project Detail`}
      >
        {/* Sticky top action header */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E5E0D8] bg-[#F7F5EF]/95 backdrop-blur-md px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs tracking-widest text-[#66605B] uppercase hover:text-[#141312] transition-colors focus-visible:outline-hidden font-semibold"
          >
            <ArrowLeft size={16} />
            <span>BACK TO WORK</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[11px] tracking-widest text-[#8F6F3A] uppercase font-sans font-bold">
              {project.category}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[#E5E0D8] bg-white hover:bg-[#EAE5DC] text-[#141312] transition-colors shadow-2xs"
              aria-label="Close project view"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-5xl mx-auto px-6 py-10 sm:py-16">
          {/* Top metadata header */}
          <div className="border-b border-[#E5E0D8] pb-8 sm:pb-12">
            <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase text-[#8C827A] mb-3">
              <span className="text-[#8F6F3A] font-bold">{project.category}</span>
              <span>·</span>
              <span>{project.subcategory}</span>
              <span>·</span>
              <span className="text-[#66605B] font-mono">{project.label}</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#141312] mt-2">
              {project.name}
            </h1>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#8F6F3A] mt-3">
              &ldquo;{project.tagline}&rdquo;
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-[#E5E0D8] text-sm">
              <div className="md:col-span-2">
                <span className="block text-[10px] tracking-[0.25em] uppercase text-[#8C827A] mb-2 font-bold">
                  PROJECT BRIEF &amp; EXECUTION
                </span>
                <p className="text-[#36322E] font-sans leading-relaxed text-base">
                  {project.description}
                </p>
              </div>

              <div>
                <span className="block text-[10px] tracking-[0.25em] uppercase text-[#8C827A] mb-2 font-bold">
                  ART DIRECTION
                </span>
                <p className="text-xs text-[#66605B] font-sans leading-relaxed">
                  {project.creativeDirection}
                </p>
              </div>
            </div>

            {/* Deliverables tags */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#66605B]">
              <span className="text-[10px] tracking-widest uppercase text-[#8F6F3A] font-bold mr-2">
                DELIVERABLES:
              </span>
              {project.deliverables.map((del, idx) => (
                <span key={idx} className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={13} className="text-[#8F6F3A]" />
                  <span>{del}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Large Editorial Gallery: Where the work shines! */}
          <div className="py-12 sm:py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C827A] font-bold">
                  EDITORIAL GALLERY
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141312] mt-1">
                  Creative Visual Suite
                </h2>
              </div>
              <span className="text-xs text-[#8C827A] font-sans font-medium">
                Click any visual to enlarge
              </span>
            </div>

            <div className="space-y-12">
              {project.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white shadow-xl transition-all duration-300 group-hover:border-[#B38F5B]">
                    <div className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full">
                      <ProjectVisual item={item} />
                    </div>

                    {/* Hover enlarge button overlay */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2.5 rounded-full bg-black/75 backdrop-blur-sm text-white border border-white/20">
                      <Maximize2 size={18} />
                    </div>
                  </div>

                  <div className="mt-3 flex items-start justify-between text-xs text-[#66605B] px-1">
                    <div>
                      <span className="font-editorial text-base text-[#141312] font-bold block">
                        {item.title}
                      </span>
                      <p className="text-xs text-[#66605B] mt-0.5">{item.caption}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#8F6F3A] uppercase tracking-wider shrink-0 ml-4 font-bold">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Continuous Traversal / CTAs */}
          <div className="border-t border-[#E5E0D8] pt-10 pb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={onClose}
              className="text-xs tracking-widest text-[#66605B] uppercase hover:text-[#141312] transition-colors font-semibold"
            >
              ← BACK TO ALL WORK
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onStartProject(project.category)}
                className="px-6 py-3.5 bg-[#141312] hover:bg-[#2C2825] text-[#F7F5EF] text-xs font-semibold tracking-widest uppercase rounded-lg transition-colors shadow-sm"
              >
                START A PROJECT LIKE THIS
              </button>

              <button
                onClick={() => onSelectProject(nextProject)}
                className="px-5 py-3.5 border border-[#141312]/30 hover:border-[#141312] text-xs tracking-widest text-[#141312] uppercase rounded-lg hover:bg-black/5 transition-all flex items-center gap-2 font-semibold"
              >
                <span>NEXT: {nextProject.name}</span>
                <ArrowRight size={14} className="text-[#8F6F3A]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for single asset zooming */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={project.items}
        currentIndex={lightboxIndex}
        onSelectIndex={setLightboxIndex}
        projectName={project.name}
      />
    </>
  );
};
