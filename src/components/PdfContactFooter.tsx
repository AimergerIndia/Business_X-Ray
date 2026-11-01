import React from 'react';
import { MessageCircle, Mail, Phone, Globe, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { AimergerLogo, AimergerSpark } from './AimergerBrand';

interface PdfContactFooterProps {
  businessName?: string;
  monthlyLoss?: number;
}

export const PdfContactFooter: React.FC<PdfContactFooterProps> = ({
  businessName,
  monthlyLoss,
}) => {
  return (
    <div className="mt-12 pt-8 border-t-2 border-[#0B0D12] text-[#0B0D12] print-break-inside-avoid">
      <div className="p-8 rounded-2xl bg-[#0B0D12] text-[#F5F1E8] border border-[#232836]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#232836]">
          <AimergerLogo variant="dark" />

          <div className="text-left md:text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5A1F] font-['Space_Grotesk']">
              FREE 30-MINUTE AI STRATEGY ROADMAP
            </span>
            <p className="text-xs text-[#8A8F98] mt-0.5">
              Zero software bloat. Custom AI agents running inside WhatsApp.
            </p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 1. WhatsApp */}
          <div className="p-4 rounded-xl bg-[#151923] border border-[#232836]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F] font-['Space_Grotesk'] uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp</span>
            </div>
            <a
              href="https://wa.me/918796925824"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#F5F1E8] hover:text-[#FF5A1F] block mt-1 font-['Space_Grotesk']"
            >
              +91 87969 25824
            </a>
            <p className="text-[11px] text-[#8A8F98] mt-0.5">
              Instant response in ~15 mins
            </p>
          </div>

          {/* 2. Email */}
          <div className="p-4 rounded-xl bg-[#151923] border border-[#232836]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F] font-['Space_Grotesk'] uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Executive Inquiries</span>
            </div>
            <a
              href="mailto:aimergerindia@gmail.com"
              className="text-sm font-bold text-[#F5F1E8] hover:text-[#FF5A1F] block mt-1 font-['Space_Grotesk'] truncate"
            >
              aimergerindia@gmail.com
            </a>
            <p className="text-[11px] text-[#8A8F98] mt-0.5">
              Proposals & custom integration
            </p>
          </div>

          {/* 3. Official Website */}
          <div className="p-4 rounded-xl bg-[#151923] border border-[#232836]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F] font-['Space_Grotesk'] uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>Agency Website</span>
            </div>
            <a
              href="https://aimerger.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#F5F1E8] hover:text-[#FF5A1F] block mt-1 font-['Space_Grotesk']"
            >
              aimerger.in
            </a>
            <p className="text-[11px] text-[#8A8F98] mt-0.5">
              Case studies & live automations
            </p>
          </div>
        </div>

        {/* Agency Note & Legal */}
        <div className="mt-6 pt-5 border-t border-[#232836] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A8F98] gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>
              Aimerger Technologies • AI that merges into your business • Pune, India
            </span>
          </div>

          <div className="text-right">
            <span>© {new Date().getFullYear()} Aimerger. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
