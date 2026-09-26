/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from './data/portfolioData';
import { SERVICES_DATA } from './data/servicesData';
import { Category, Project, ProjectVisualItem } from './types';
import { ImageStorageProvider } from './context/ImageStorageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { LightboxModal } from './components/LightboxModal';
import { ServicesSection } from './components/ServicesSection';
import { WhySection } from './components/WhySection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ProjectBookingModal } from './components/ProjectBookingModal';
import { AiCreativeChatModal } from './components/AiCreativeChatModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState<'STARTER' | 'SIGNATURE' | 'CUSTOM'>('SIGNATURE');
  const [bookingCategory, setBookingCategory] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<string>('');

  const [standaloneLightbox, setStandaloneLightbox] = useState<{
    isOpen: boolean;
    items: ProjectVisualItem[];
    currentIndex: number;
    projectName: string;
  }>({
    isOpen: false,
    items: [],
    currentIndex: 0,
    projectName: ''
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = (
    packageId?: 'STARTER' | 'SIGNATURE' | 'CUSTOM',
    category?: string,
    details?: string
  ) => {
    if (packageId) setBookingPackage(packageId);
    if (category) setBookingCategory(category);
    if (details) setBookingDetails(details);
    setIsBookingModalOpen(true);
  };

  return (
    <ImageStorageProvider>
      <div className="min-h-screen bg-[#F7F5EF] text-[#141312] flex flex-col font-sans selection:bg-[#D4B98C]/30 selection:text-[#141312]">
        {/* 1. Sticky Navigation Bar */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onStartProject={() => handleStartProject('SIGNATURE')}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section: 3-5 second immediate clarity */}
        <Hero
          onExploreWork={() => scrollToSection('work')}
          onStartProject={() => handleStartProject('SIGNATURE')}
        />

        {/* 3. Selected Work: Immediate Portfolio Browsing, Filters & Search */}
        <PortfolioGrid
          projects={PORTFOLIO_PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenLightbox={(items, index, title) => {
            setStandaloneLightbox({
              isOpen: true,
              items,
              currentIndex: index,
              projectName: title
            });
          }}
        />

        {/* 4. What We Create: 4 Service Blocks */}
        <ServicesSection
          onSelectService={(serviceTitle) =>
            handleStartProject('SIGNATURE', serviceTitle)
          }
        />

        {/* 5. Why ArkAja: "Creative Direction, Not Just Content" */}
        <WhySection />

        {/* 6. Process: 4-Step Timeline (Brief, Direction, Create, Deliver) */}
        <ProcessSection />

        {/* 7. Pricing: 3 Project Packages (Starter, Signature, Custom) */}
        <PricingSection
          onSelectPackage={(pkg) => handleStartProject(pkg)}
        />

        {/* 8. About The Studio: Concise & Authentic */}
        <AboutSection />

        {/* 9. Final Closing CTA */}
        <FinalCtaSection
          onStartProject={() => handleStartProject('SIGNATURE')}
        />
      </main>

      {/* 10. Footer */}
      <Footer
        onNavigate={scrollToSection}
        onStartProject={() => handleStartProject('SIGNATURE')}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Modals & Overlays */}
      {/* Dedicated Project Detail View with continuous traversal */}
      <ProjectDetailModal
        project={selectedProject}
        allProjects={PORTFOLIO_PROJECTS}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
        onStartProject={(cat) => {
          setSelectedProject(null);
          handleStartProject('SIGNATURE', cat);
        }}
      />

      {/* Global Search Interface */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        projects={PORTFOLIO_PROJECTS}
        services={SERVICES_DATA}
        onSelectProject={(project) => setSelectedProject(project)}
        onSelectService={() => {
          setIsSearchModalOpen(false);
          scrollToSection('services');
        }}
      />

      {/* Direct Fullscreen Lightbox for any individual visual */}
      <LightboxModal
        isOpen={standaloneLightbox.isOpen}
        onClose={() =>
          setStandaloneLightbox((prev) => ({ ...prev, isOpen: false }))
        }
        items={standaloneLightbox.items}
        currentIndex={standaloneLightbox.currentIndex}
        onSelectIndex={(index) =>
          setStandaloneLightbox((prev) => ({ ...prev, currentIndex: index }))
        }
        projectName={standaloneLightbox.projectName}
      />

      {/* Project Booking & Direct Razorpay Payment Checkout Flow */}
      <ProjectBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialPackage={bookingPackage}
        initialCategory={bookingCategory}
        initialDetails={bookingDetails}
      />

      {/* ArkAja Studio Creative AI Consultation Modal */}
      <AiCreativeChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onApplyRequirementsToBooking={(reqs) => {
          setBookingDetails(reqs);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Private Studio Admin & Enquiry Management Modal (Password: jamessu) */}
      <AdminAuthModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Floating Studio AI Assistant Trigger Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#141312] text-[#F7F5EF] border border-[#B38F5B]/50 shadow-[0_8px_25px_rgba(20,19,18,0.25)] hover:scale-105 hover:bg-[#2C2825] transition-all duration-300"
          aria-label="Open ArkAja Creative AI consultation"
        >
          <div className="w-6 h-6 rounded-full bg-[#8F6F3A] flex items-center justify-center text-[#F7F5EF] group-hover:rotate-12 transition-transform">
            <Sparkles size={13} />
          </div>
          <div className="text-left">
            <span className="block text-[11px] font-bold tracking-wider uppercase text-[#D4B98C] font-mono leading-none">
              Studio AI
            </span>
            <span className="block text-[9px] text-[#A7A19A] tracking-wide mt-0.5 leading-none">
              Creative Brief
            </span>
          </div>
        </button>
      </div>
    </div>
  </ImageStorageProvider>
  );
}
