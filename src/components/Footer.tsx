import React from 'react';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { AimergerLogo, AimergerSpark } from './AimergerBrand';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#0B0D12] text-[#8A8F98] py-14 border-t border-[#232836] no-print web-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-[#232836]">
          {/* Brand Logo & Tagline */}
          <AimergerLogo variant="dark" />

          {/* Quick contact tags */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-['Space_Grotesk']">
            <a
              href="https://aimerger.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F1E8] flex items-center gap-1.5 transition-colors bg-[#151923] px-3.5 py-1.5 rounded-full border border-[#232836]"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>aimerger.in</span>
            </a>
            <a
              href="https://wa.me/918796925824"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F1E8] flex items-center gap-1.5 transition-colors bg-[#151923] px-3.5 py-1.5 rounded-full border border-[#232836]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>WhatsApp: +91 87969 25824</span>
            </a>
            <a
              href="mailto:aimergerindia@gmail.com"
              className="hover:text-[#F5F1E8] flex items-center gap-1.5 transition-colors bg-[#151923] px-3.5 py-1.5 rounded-full border border-[#232836]"
            >
              <Mail className="w-3.5 h-3.5 text-[#8A8F98]" />
              <span>aimergerindia@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8F98]">
          <p>© {new Date().getFullYear()} Aimerger Technologies. Grow together.</p>
          <div className="flex items-center gap-4 flex-wrap">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-[#FF5A1F] hover:underline font-['Space_Grotesk'] font-semibold"
              >
                ✦ Admin Leads CRM & CSV Export
              </button>
            )}
            <span>Powered by Gemini 3.8 Flash, Google Maps & Search Grounding</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
