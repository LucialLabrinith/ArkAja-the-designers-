import React, { useState, useEffect } from 'react';
import { ArkAjaMonogram, StarAccent } from './ArkAjaMonogram';
import { Search, Menu, X, ArrowRight, Sparkles, Upload } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onStartProject: () => void;
  onOpenAiChat?: () => void;
  onOpenUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenSearch,
  onStartProject,
  onOpenAiChat,
  onOpenUpload
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', id: 'work' },
    { label: 'SERVICES', id: 'services' },
    { label: 'PROCESS', id: 'process' },
    { label: 'PRICING', id: 'pricing' },
    { label: 'ENQUIRY', id: 'enquiry' },
    { label: 'ABOUT', id: 'about' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#E5E0D8] shadow-xs py-3.5'
            : 'bg-[#F7F5EF]/80 backdrop-blur-xs py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Lockup with AA Monogram */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <ArkAjaMonogram size={34} glow={false} className="group-hover:scale-105 transition-transform" />
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-lg md:text-xl font-bold tracking-[0.2em] text-[#141312] uppercase group-hover:text-[#B38F5B] transition-colors">
                ARKAJA
              </span>
              <span className="hidden sm:inline-block text-[9px] tracking-[0.35em] text-[#8C827A] uppercase font-sans font-medium">
                STUDIO
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#66605B]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="hover:text-[#141312] hover:underline underline-offset-4 decoration-[#B38F5B] transition-colors relative py-1 focus-visible:outline-hidden"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Primary Actions (AI Consultant + Search + START A PROJECT) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenAiChat && (
              <button
                onClick={onOpenAiChat}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#B38F5B]/40 hover:border-[#B38F5B] bg-white/70 hover:bg-[#FAF8F5] text-[#8F6F3A] hover:text-[#141312] text-xs font-semibold tracking-wider uppercase transition-all shadow-2xs"
                title="Open Studio Creative AI Chat"
              >
                <Sparkles size={13} className="text-[#8F6F3A]" />
                <span>AI Brief</span>
              </button>
            )}

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-[#66605B] hover:text-[#141312] hover:bg-[#EAE5DC] transition-all"
              aria-label="Search ArkAja Studio projects and services"
              title="Search projects & services"
            >
              <Search size={18} />
            </button>

            {/* Start a project primary CTA */}
            <button
              onClick={onStartProject}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141312] hover:bg-[#2C2825] text-[#F7F5EF] text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-xs"
            >
              <span>START A PROJECT</span>
              <ArrowRight size={13} className="text-[#D4B98C]" />
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#141312] hover:text-[#B38F5B] transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#F7F5EF] flex flex-col justify-between pt-24 pb-8 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-5 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left font-editorial text-2xl font-bold tracking-wider text-[#141312] hover:text-[#B38F5B] transition-colors border-b border-[#E5E0D8] pb-3"
              >
                {link.label}
              </button>
            ))}

            {onOpenAiChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiChat();
                }}
                className="flex items-center gap-3 text-left font-sans text-xs tracking-widest uppercase text-[#8F6F3A] font-bold pt-3"
              >
                <Sparkles size={16} />
                <span>STUDIO AI BRIEF GENERATOR</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-3 text-left font-sans text-xs tracking-widest uppercase text-[#B38F5B] font-bold pt-2"
            >
              <Search size={16} />
              <span>SEARCH PROJECTS &amp; SERVICES</span>
            </button>
          </div>

          <div className="pt-6 border-t border-[#E5E0D8]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full py-4 bg-[#141312] text-[#F7F5EF] text-xs font-bold tracking-[0.25em] uppercase rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>START A PROJECT</span>
              <ArrowRight size={16} className="text-[#D4B98C]" />
            </button>

            <div className="mt-4 text-center text-[10px] tracking-widest text-[#8C827A] uppercase font-mono">
              AI-ASSISTED PRODUCTION • HUMAN-LED ART DIRECTION
            </div>
          </div>
        </div>
      )}
    </>
  );
};
