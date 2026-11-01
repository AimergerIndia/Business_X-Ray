import React from 'react';
import { MessageCircle, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { BusinessXRayReport } from '../types/audit';
import { formatINR } from '../utils/formatters';
import { AimergerSpark, AimergerIcon } from './AimergerBrand';

interface CallToActionBannerProps {
  report: BusinessXRayReport;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ report }) => {
  const { businessName, city, revenueLoss } = report;

  const whatsappMessage = encodeURIComponent(
    `Hi Aimerger team, I just reviewed my AI Business X-Ray audit for "${businessName}" in ${city}. We found an estimated revenue leakage of ${formatINR(
      revenueLoss.totalMonthlyLoss
    )}/month. I would like to book a free 30-minute strategy call to discuss the 5 AI automations.`
  );

  const whatsappUrl = `https://wa.me/918796925824?text=${whatsappMessage}`;

  return (
    <div className="bg-[#0B0D12] text-[#F5F1E8] rounded-[24px] shadow-xl p-8 sm:p-14 relative overflow-hidden border border-[#232836]">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Brand spark tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151923] border border-[#2a3040] text-[#FF5A1F] text-xs sm:text-sm font-semibold mb-6 font-['Space_Grotesk']">
          <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
          <span>Aimerger · AI that merges into your business</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight font-['Space_Grotesk'] text-[#F5F1E8]">
          Ready to plug <span className="text-[#FF5A1F]">{formatINR(revenueLoss.totalMonthlyLoss)}/mo</span> in leaked revenue for {businessName}?
        </h3>

        <p className="mt-4 text-sm sm:text-base text-[#b9bdc6] max-w-xl mx-auto leading-relaxed">
          Stop losing high-intent leads to nearby competitors. We build custom AI agents that merge directly into WhatsApp, Google Business Profile, and your daily workflows.
        </p>

        {/* Benefits bullets */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#F5F1E8]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF5A1F]" />
            <span>Live working demo tailored to your exact business</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF5A1F]" />
            <span>Zero software bloat — merges into WhatsApp</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF5A1F]" />
            <span>No long-term contracts or lock-ins</span>
          </div>
        </div>

        {/* Primary CTA Button: Official Ember Pill */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-[#0B0D12] bg-[#FF5A1F] hover:bg-[#FF8A5B] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#FF5A1F]/20 font-['Space_Grotesk']"
          >
            <MessageCircle className="w-5 h-5 fill-[#0B0D12]" />
            <span>Book a free 30-min call with Aimerger →</span>
          </a>

          <a
            href="tel:+918796925824"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-[#F5F1E8] bg-[#151923] hover:bg-[#232836] border border-[#2a3040] transition-colors font-['Space_Grotesk']"
          >
            <PhoneCall className="w-4 h-4 text-[#8A8F98]" />
            <span>Call +91 87969 25824</span>
          </a>
        </div>

        <p className="mt-5 text-[11px] text-[#8A8F98]">
          Official Aimerger Studio • Direct line with AI Engineers • Response in under 15 minutes
        </p>
      </div>
    </div>
  );
};
