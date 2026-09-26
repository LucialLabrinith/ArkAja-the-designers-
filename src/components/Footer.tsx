import React from 'react';
import { ArkAjaWordmark, StarAccent } from './ArkAjaMonogram';
import { Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onStartProject: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onStartProject, onOpenAdmin }) => {
  return (
    <footer className="bg-[#F7F5EF] text-[#141312] border-t border-[#E5E0D8] py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <ArkAjaWordmark monogramSize={36} />
          <p className="text-xs text-[#66605B] mt-3 font-sans max-w-sm leading-relaxed">
            AI-assisted creative production. Human-led art direction. Based in Mumbai, working worldwide.
          </p>
        </div>

        {/* Clean Nav Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs tracking-wider uppercase text-[#66605B] font-sans font-semibold">
          <button
            onClick={() => onNavigate('work')}
            className="hover:text-[#141312] hover:underline underline-offset-4 decoration-[#B38F5B] transition-colors"
          >
            WORK
          </button>
          <button
            onClick={() => onNavigate('services')}
            className="hover:text-[#141312] hover:underline underline-offset-4 decoration-[#B38F5B] transition-colors"
          >
            SERVICES
          </button>
          <button
            onClick={() => onNavigate('process')}
            className="hover:text-[#141312] hover:underline underline-offset-4 decoration-[#B38F5B] transition-colors"
          >
            PROCESS
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="hover:text-[#141312] hover:underline underline-offset-4 decoration-[#B38F5B] transition-colors"
          >
            PRICING
          </button>
          <button
            onClick={() => onNavigate('enquiry')}
            className="hover:text-[#141312] hover:underline underline-offset-4 decoration-[#B38F5B] transition-colors"
          >
            ENQUIRY
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-[#141312] hover:underline underline-offset-4 decoration-[#B38F5B] transition-colors"
          >
            ABOUT
          </button>
          <a
            href="mailto:arkajastudio@gmail.com?subject=ArkAja%20Studio%20Inquiry"
            className="text-[#8F6F3A] font-bold hover:underline"
            title="Email arkajastudio@gmail.com"
          >
            arkajastudio@gmail.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C827A] font-mono">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} ARKAJA STUDIO. ALL RIGHTS RESERVED.</span>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[#8C827A] hover:text-[#141312] transition-colors flex items-center gap-1 opacity-60 hover:opacity-100"
              title="Studio Administration (Protected)"
            >
              <Lock size={10} />
              <span>Studio Access</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span>CREATIVE CONTENT FOR BRANDS</span>
          <StarAccent size={10} className="text-[#8F6F3A]" />
          <span>MUMBAI • WORLDWIDE</span>
        </div>
      </div>
    </footer>
  );
};
