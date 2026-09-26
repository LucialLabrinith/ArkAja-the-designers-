import React, { useState, useEffect, useRef } from 'react';
import { Project, ServiceBlock } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  services: ServiceBlock[];
  onSelectProject: (project: Project) => void;
  onSelectService: (serviceTitle: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  projects,
  services,
  onSelectProject,
  onSelectService
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search in projects
  const matchedProjects = projects.filter((project) => {
    if (!q) return false;
    const isSkincare = (q === 'skincare' || q === 'skin' || q === 'beauty') && (project.id === 'lumiere' || project.id === 'muse-beauty-london');
    const isFashion = (q === 'fashion' || q === 'clothing' || q === 'wear') && (project.id === 'elan' || project.id === 'saree-edit');
    const isSaree = (q === 'saree' || q === 'sari' || q === 'ethnic') && project.id === 'saree-edit';
    const isCafe = (q === 'cafe' || q === 'café' || q === 'coffee' || q === 'latte' || q === 'hospitality') && project.id === 'noir-and-bean';

    return (
      isSkincare ||
      isFashion ||
      isSaree ||
      isCafe ||
      project.name.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q) ||
      project.subcategory.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.deliverables.some((d) => d.toLowerCase().includes(q))
    );
  });

  // Search in services
  const matchedServices = services.filter((srv) => {
    if (!q) return false;
    return (
      srv.title.toLowerCase().includes(q) ||
      srv.subtitle.toLowerCase().includes(q) ||
      srv.description.toLowerCase().includes(q) ||
      srv.items.some((item) => item.toLowerCase().includes(q))
    );
  });

  const hasResults = matchedProjects.length > 0 || matchedServices.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-16 sm:pt-24 px-4 pb-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white border border-[#E5E0D8] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-[#141312]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header & input */}
        <div className="p-4 sm:p-6 border-b border-[#E5E0D8] flex items-center gap-3 bg-[#FAF8F5]">
          <Search size={20} className="text-[#8F6F3A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, services or categories (e.g. skincare, café, fashion)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#141312] placeholder-[#8C827A] focus:outline-hidden font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-[#8C827A] hover:text-[#141312]"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md border border-[#E5E0D8] text-xs text-[#8C827A] hover:text-[#141312] font-mono shrink-0 ml-1"
          >
            ESC
          </button>
        </div>

        {/* Content results */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!query ? (
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C827A] font-bold block mb-3">
                QUICK SEARCH SUGGESTIONS
              </span>
              <div className="flex flex-wrap gap-2">
                {['Beauty', 'Skincare', 'Fashion', 'Saree', 'Café', 'Social Content', 'Campaign Creative'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#EFECE6] text-xs text-[#8F6F3A] font-semibold border border-[#E5E0D8] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center">
              <p className="font-editorial text-xl text-[#141312]">
                No matching work found.
              </p>
              <p className="text-xs text-[#66605B] mt-2">
                Try searching for “beauty”, “fashion”, “café”, or “saree”.
              </p>
            </div>
          ) : (
            <>
              {/* Project Results */}
              {matchedProjects.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#8F6F3A] font-bold mb-3">
                    <span>PROJECTS ({matchedProjects.length})</span>
                    <span>CONCEPT SUITES</span>
                  </div>
                  <div className="space-y-2">
                    {matchedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          onSelectProject(proj);
                          onClose();
                        }}
                        className="group p-4 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#E5E0D8] transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#8F6F3A] font-bold">
                            <span>{proj.category}</span>
                            <span>•</span>
                            <span className="text-[#8C827A]">{proj.label}</span>
                          </div>
                          <h4 className="font-editorial text-lg font-bold text-[#141312] group-hover:text-[#8F6F3A] transition-colors mt-0.5">
                            {proj.name}
                          </h4>
                          <p className="text-xs text-[#66605B] font-sans mt-0.5">
                            {proj.tagline}
                          </p>
                        </div>
                        <ArrowRight size={16} className="text-[#8C827A] group-hover:text-[#141312] group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Results */}
              {matchedServices.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#8F6F3A] font-bold mb-3">
                    <span>SERVICES &amp; CAPABILITIES ({matchedServices.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedServices.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => {
                          onSelectService(srv.title);
                          onClose();
                        }}
                        className="group p-4 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#E5E0D8] transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-[#8C827A]">
                            {srv.subtitle}
                          </span>
                          <h4 className="font-editorial text-base font-bold text-[#141312] group-hover:text-[#8F6F3A] transition-colors mt-0.5">
                            {srv.title}
                          </h4>
                          <p className="text-xs text-[#66605B] font-sans mt-0.5 line-clamp-1">
                            {srv.description}
                          </p>
                        </div>
                        <ArrowRight size={16} className="text-[#8C827A] group-hover:text-[#141312] group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
