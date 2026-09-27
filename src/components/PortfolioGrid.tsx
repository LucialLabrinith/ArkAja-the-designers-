import React, { useState, useMemo } from 'react';
import { Project, Category, ProjectVisualItem } from '../types';
import { ProjectVisual } from './ProjectVisual';
import { Search, X, ArrowUpRight, Grid3X3, Layers, Maximize2 } from 'lucide-react';
import { StarAccent } from './ArkAjaMonogram';

interface PortfolioGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenLightbox?: (items: ProjectVisualItem[], index: number, title: string) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects,
  onSelectProject,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenLightbox
}) => {
  const [viewMode, setViewMode] = useState<'campaigns' | 'all-visuals'>('campaigns');
  const categories: Category[] = ['ALL', 'BEAUTY', 'FASHION', 'HOSPITALITY'];

  // Flatten all 12 visual items with their parent project reference
  const allVisualItems = useMemo(() => {
    return projects.flatMap((project) =>
      project.items.map((item) => ({
        ...item,
        parentProject: project
      }))
    );
  }, [projects]);

  // Filtered campaigns
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'ALL' || project.category === activeCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesName = project.name.toLowerCase().includes(q);
      const matchesCat = project.category.toLowerCase().includes(q);
      const matchesSubcat = project.subcategory.toLowerCase().includes(q);
      const matchesDesc = project.description.toLowerCase().includes(q);
      const matchesDirection = project.creativeDirection.toLowerCase().includes(q);
      const matchesItems = project.items.some(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          (item.headline && item.headline.toLowerCase().includes(q)) ||
          item.caption.toLowerCase().includes(q)
      );

      const isCafeSearch =
        (q === 'café' || q === 'cafe' || q === 'coffee' || q === 'food' || q === 'latte') &&
        project.id === 'noir-and-bean';
      const isSkincareSearch =
        (q === 'skincare' || q === 'skin' || q === 'salon' || q === 'facial' || q === 'beauty') &&
        (project.id === 'lumiere' || project.id === 'muse-beauty-london');
      const isSareeSearch =
        (q === 'saree' || q === 'sari' || q === 'ethnic' || q === 'banarasi' || q === 'indian') &&
        project.id === 'saree-edit';
      const isFashionSearch =
        (q === 'fashion' || q === 'blazer' || q === 'suit' || q === 'coat') &&
        (project.id === 'elan' || project.id === 'saree-edit');

      return (
        matchesCategory &&
        (matchesName ||
          matchesCat ||
          matchesSubcat ||
          matchesDesc ||
          matchesDirection ||
          matchesItems ||
          isCafeSearch ||
          isSkincareSearch ||
          isSareeSearch ||
          isFashionSearch)
      );
    });
  }, [projects, activeCategory, searchQuery]);

  // Filtered individual visuals
  const filteredVisuals = useMemo(() => {
    return allVisualItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'ALL' || item.parentProject.category === activeCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesType = item.type.toLowerCase().includes(q);
      const matchesHeadline = item.headline ? item.headline.toLowerCase().includes(q) : false;
      const matchesCaption = item.caption.toLowerCase().includes(q);
      const matchesProjectName = item.parentProject.name.toLowerCase().includes(q);
      const matchesCategoryName = item.parentProject.category.toLowerCase().includes(q);

      const isCafeSearch =
        (q === 'café' || q === 'cafe' || q === 'coffee' || q === 'food' || q === 'latte') &&
        item.parentProject.id === 'noir-and-bean';
      const isSkincareSearch =
        (q === 'skincare' || q === 'skin' || q === 'salon' || q === 'facial' || q === 'beauty') &&
        (item.parentProject.id === 'lumiere' || item.parentProject.id === 'muse-beauty-london');
      const isSareeSearch =
        (q === 'saree' || q === 'sari' || q === 'ethnic' || q === 'banarasi') &&
        item.parentProject.id === 'saree-edit';

      return (
        matchesCategory &&
        (matchesTitle ||
          matchesType ||
          matchesHeadline ||
          matchesCaption ||
          matchesProjectName ||
          matchesCategoryName ||
          isCafeSearch ||
          isSkincareSearch ||
          isSareeSearch)
      );
    });
  }, [allVisualItems, activeCategory, searchQuery]);

  const handleVisualClick = (visual: typeof allVisualItems[0]) => {
    if (onOpenLightbox) {
      const idx = visual.parentProject.items.findIndex((it) => it.id === visual.id);
      onOpenLightbox(visual.parentProject.items, idx >= 0 ? idx : 0, visual.parentProject.name);
    } else {
      onSelectProject(visual.parentProject);
    }
  };

  return (
    <section id="work" className="py-16 sm:py-24 bg-[#FAF8F5] text-[#141312] relative border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E0D8] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#8F6F3A] font-sans font-bold mb-2">
              <StarAccent size={12} />
              <span>THE WORK CREATED</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312]">
              SELECTED WORK
            </h2>
            <p className="text-sm sm:text-base text-[#66605B] mt-2 font-sans max-w-xl">
              A selection of visual concepts and social content created by ArkAja Studio.
            </p>
          </div>

          {/* View Mode Switcher: Campaign Suites vs All Visual Assets */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E5E0D8] shadow-2xs self-start md:self-end">
            <button
              onClick={() => setViewMode('campaigns')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
                viewMode === 'campaigns'
                  ? 'bg-[#141312] text-[#F7F5EF] shadow-xs'
                  : 'text-[#66605B] hover:text-[#141312]'
              }`}
            >
              <Layers size={13} />
              <span>Campaigns ({projects.length})</span>
            </button>
            <button
              onClick={() => setViewMode('all-visuals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
                viewMode === 'all-visuals'
                  ? 'bg-[#141312] text-[#F7F5EF] shadow-xs'
                  : 'text-[#66605B] hover:text-[#141312]'
              }`}
            >
              <Grid3X3 size={13} />
              <span>All Visuals ({allVisualItems.length})</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Horizontally scrollable Category buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-md transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#141312] text-[#F7F5EF] shadow-xs'
                      : 'bg-white text-[#66605B] hover:text-[#141312] hover:bg-[#EFECE6] border border-[#E5E0D8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C827A]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search (e.g. beauty, café, saree, blazer)..."
              className="w-full bg-white border border-[#E5E0D8] rounded-md pl-10 pr-9 py-2 text-xs text-[#141312] placeholder-[#8C827A] focus:outline-hidden focus:border-[#141312] focus:ring-1 focus:ring-[#141312] transition-all font-sans shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#141312] transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Indicator */}
        {(activeCategory !== 'ALL' || searchQuery) && (
          <div className="mt-4 flex items-center gap-2 text-xs text-[#66605B]">
            <span>Active filters:</span>
            {activeCategory !== 'ALL' && (
              <span className="text-[#141312] font-semibold">Category: {activeCategory}</span>
            )}
            {searchQuery && (
              <span className="text-[#141312] font-semibold">Query: &ldquo;{searchQuery}&rdquo;</span>
            )}
            <button
              onClick={() => {
                onSelectCategory('ALL');
                onSearchChange('');
              }}
              className="ml-3 text-[11px] underline hover:text-[#141312] font-medium"
            >
              Reset all
            </button>
          </div>
        )}

        {/* 1. CAMPAIGN SUITES VIEW */}
        {viewMode === 'campaigns' && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center border border-[#E5E0D8] rounded-xl bg-white my-8 shadow-xs">
                <p className="font-editorial text-2xl text-[#141312]">No matching work found.</p>
                <p className="text-xs text-[#66605B] mt-2 max-w-sm mx-auto">
                  Try another search term or click reset to browse all ArkAja projects.
                </p>
                <button
                  onClick={() => {
                    onSelectCategory('ALL');
                    onSearchChange('');
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#141312] text-[#F7F5EF] text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-[#2C2825] transition-colors shadow-xs"
                >
                  BROWSE ALL WORK
                </button>
              </div>
            ) : (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                {filteredProjects.map((project, index) => {
                  const isLarge = index === 0 || index === 3;
                  const gridSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';
                  const coverItem = project.items[project.coverItemIndex] || project.items[0];

                  return (
                    <div
                      key={project.id}
                      onClick={() => onSelectProject(project)}
                      className={`group cursor-pointer flex flex-col justify-between ${gridSpan}`}
                    >
                      {/* Card Artwork Frame: The visual is the primary hero */}
                      <div className="relative overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white transition-all duration-300 group-hover:border-[#B38F5B] group-hover:shadow-[0_16px_36px_rgba(20,19,18,0.12)]">
                        <div className="aspect-[4/3] sm:aspect-[16/11] w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                          <ProjectVisual item={coverItem} projectTitle={project.name} />
                        </div>

                        {/* Concept Project Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="text-[10px] tracking-widest uppercase font-mono px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white/95 border border-white/20">
                            {project.label}
                          </span>
                        </div>

                        {/* Hover Action Badge */}
                        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#D4B98C]/70 text-[#D4B98C] text-xs font-medium tracking-wider">
                            <span>VIEW PROJECT →</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Details Footer */}
                      <div className="mt-4 flex items-start justify-between gap-4 px-1">
                        <div>
                          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#8F6F3A] font-sans font-bold">
                            <span>{project.category}</span>
                            <span>·</span>
                            <span className="text-[#8C827A] text-[11px] lowercase font-normal">
                              {project.items.length} visuals
                            </span>
                          </div>
                          <h3 className="font-editorial text-2xl font-bold text-[#141312] group-hover:text-[#8F6F3A] transition-colors mt-1">
                            {project.name}
                          </h3>
                          <p className="text-xs text-[#66605B] font-sans mt-0.5 line-clamp-1">
                            {project.tagline}
                          </p>
                        </div>

                        <div className="p-2 rounded-full border border-[#E5E0D8] group-hover:border-[#141312] group-hover:text-[#141312] text-[#8C827A] transition-colors shrink-0 mt-1 bg-white shadow-2xs">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* 2. ALL VISUAL ARTWORK VIEW (Focus is 100% on individual images) */}
        {viewMode === 'all-visuals' && (
          <>
            {filteredVisuals.length === 0 ? (
              <div className="py-20 text-center border border-[#E5E0D8] rounded-xl bg-white my-8 shadow-xs">
                <p className="font-editorial text-2xl text-[#141312]">No matching visuals found.</p>
                <p className="text-xs text-[#66605B] mt-2 max-w-sm mx-auto">
                  Try another search query or reset filters.
                </p>
                <button
                  onClick={() => {
                    onSelectCategory('ALL');
                    onSearchChange('');
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#141312] text-[#F7F5EF] text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-[#2C2825] transition-colors shadow-xs"
                >
                  VIEW ALL VISUALS
                </button>
              </div>
            ) : (
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredVisuals.map((visual) => (
                  <div
                    key={visual.id}
                    onClick={() => handleVisualClick(visual)}
                    className="group cursor-pointer flex flex-col justify-between"
                  >
                    {/* Visual Card Artwork */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white transition-all duration-300 group-hover:border-[#B38F5B] group-hover:shadow-[0_16px_36px_rgba(20,19,18,0.12)]">
                      <div className="aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                        <ProjectVisual item={visual} projectTitle={visual.parentProject.name} />
                      </div>

                      {/* Top Deliverable Pill */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="text-[10px] tracking-wider uppercase font-mono px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white/95 border border-white/20">
                          {visual.type}
                        </span>
                      </div>

                      {/* Enlarge Hover Overlay */}
                      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/75 backdrop-blur-sm text-white border border-white/20">
                        <Maximize2 size={15} />
                      </div>

                      {/* Bottom Quick Bar */}
                      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#D4B98C]/70 text-[#D4B98C] text-[11px] font-medium tracking-wider">
                          <span>ENLARGE →</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="mt-3.5 flex items-start justify-between gap-3 px-1">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#8F6F3A] font-sans font-bold">
                          <span>{visual.parentProject.name}</span>
                          <span>·</span>
                          <span className="text-[#8C827A] font-normal">{visual.parentProject.category}</span>
                        </div>
                        <h4 className="font-editorial text-lg font-bold text-[#141312] group-hover:text-[#8F6F3A] transition-colors mt-0.5">
                          {visual.title}
                        </h4>
                        <p className="text-xs text-[#66605B] font-sans line-clamp-1 mt-0.5">
                          {visual.caption}
                        </p>
                      </div>

                      <div className="p-1.5 rounded-full border border-[#E5E0D8] group-hover:border-[#141312] group-hover:text-[#141312] text-[#8C827A] transition-colors shrink-0 mt-1 bg-white">
                        <Maximize2 size={13} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
