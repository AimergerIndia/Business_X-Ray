import React from 'react';
import { MessageCircle, Share2, Users, FileText } from 'lucide-react';
import { Language } from '../types/audit';
import { AimergerLogo, AimergerSpark } from './AimergerBrand';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onShareWhatsApp?: () => void;
  reportLoaded?: boolean;
  currentView?: 'audit' | 'admin';
  onToggleView?: (view: 'audit' | 'admin') => void;
  leadsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onShareWhatsApp,
  reportLoaded = false,
  currentView = 'audit',
  onToggleView,
  leadsCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#E4DED1] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Official Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleView && onToggleView('audit')}
            className="text-left focus:outline-none"
          >
            <AimergerLogo />
          </button>
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFFFFF] text-[#0B0D12] border border-[#E4DED1]">
            <AimergerSpark className="w-3 h-3" />
            <span>Business X-Ray</span>
          </span>
        </div>

        {/* Right side controls: Admin Leads + Language Selector + WhatsApp CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Leads Link Button */}
          {onToggleView && (
            <button
              type="button"
              onClick={() => onToggleView(currentView === 'admin' ? 'audit' : 'admin')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all font-['Space_Grotesk'] border ${
                currentView === 'admin'
                  ? 'bg-[#0B0D12] text-[#F5F1E8] border-[#0B0D12]'
                  : 'bg-[#FFFFFF] text-[#0B0D12] hover:bg-[#F5F1E8] border-[#E4DED1]'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span className="hidden sm:inline">Admin Leads</span>
              <span className="sm:hidden">Leads</span>
              {leadsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#FF5A1F] text-[#0B0D12] font-black">
                  {leadsCount}
                </span>
              )}
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center bg-[#E4DED1]/60 p-1 rounded-full border border-[#E4DED1]">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                currentLanguage === 'en'
                  ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-xs'
                  : 'text-[#4A4F58] hover:text-[#0B0D12]'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                currentLanguage === 'hi'
                  ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-xs'
                  : 'text-[#4A4F58] hover:text-[#0B0D12]'
              }`}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hinglish')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                currentLanguage === 'hinglish'
                  ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-xs'
                  : 'text-[#4A4F58] hover:text-[#0B0D12]'
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Share on WhatsApp if report is ready */}
          {reportLoaded && onShareWhatsApp && (
            <button
              type="button"
              onClick={onShareWhatsApp}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full text-[#0B0D12] bg-[#FFFFFF] hover:bg-[#F5F1E8] border border-[#E4DED1] transition-colors"
              title="Share report on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>Share</span>
            </button>
          )}

          {/* Official Ember CTA button */}
          <a
            href="https://wa.me/918796925824?text=Hi%20Aimerger%2C%20I%20am%20interested%20in%20an%20AI%20consultation%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#0B0D12] bg-[#FF5A1F] hover:bg-[#FF8A5B] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm font-['Space_Grotesk'] shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Book call →</span>
            <span className="sm:hidden">Book</span>
          </a>
        </div>
      </div>
    </header>
  );
};
