import React from 'react';
import { Smartphone, Zap, MessageCircle, CalendarCheck, AlertTriangle, Check, X, ShieldAlert } from 'lucide-react';
import { WebsiteAudit } from '../types/audit';
import { AimergerSpark } from './AimergerBrand';

interface WebsiteAuditCardProps {
  audit: WebsiteAudit;
  businessName: string;
}

export const WebsiteAuditCard: React.FC<WebsiteAuditCardProps> = ({ audit, businessName }) => {
  const {
    url,
    hasWebsite,
    speedRating,
    mobileFriendly,
    mobileScore,
    hasWhatsAppButton,
    hasOnlineBooking,
    issues,
    conversionKillers,
  } = audit;

  return (
    <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DED1]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF5A1F] font-['Space_Grotesk']">
              Conversion & Digital Experience
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
            Website & Mobile Conversion Audit
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98]">
            {hasWebsite && url ? (
              <span>Auditing <strong className="text-[#0B0D12]">{url}</strong></span>
            ) : (
              <span>No official website registered — heavy reliance on Google Maps</span>
            )}
          </p>
        </div>

        {hasWebsite && url && (
          <a
            href={url.startsWith('http') ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#FF5A1F] hover:text-[#FF8A5B] underline truncate max-w-xs font-['Space_Grotesk']"
          >
            {url}
          </a>
        )}
      </div>

      {/* Conversion Core Checkers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
        {/* WhatsApp Button Check */}
        <div
          className={`p-4 rounded-[16px] border ${
            hasWhatsAppButton
              ? 'bg-[#E3F4E8] border-[#B7E1CD] text-[#11632E]'
              : 'bg-[#FCE8E6] border-[#F5C2C7] text-[#A50E0E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider font-['Space_Grotesk']">WhatsApp Button</span>
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            {hasWhatsAppButton ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold font-['Space_Grotesk'] whitespace-nowrap leading-none">
                <Check className="w-4 h-4 shrink-0 text-[#11632E]" />
                <span className="whitespace-nowrap">Detected</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold font-['Space_Grotesk'] whitespace-nowrap leading-none">
                <X className="w-4 h-4 shrink-0 text-[#A50E0E]" />
                <span className="whitespace-nowrap">Missing</span>
              </span>
            )}
          </div>
          <span className="text-[11px] opacity-80 mt-1 block">
            {hasWhatsAppButton
              ? 'Enables quick 1-tap customer chat'
              : '70% of Indian mobile buyers leave if no WhatsApp CTA'}
          </span>
        </div>

        {/* Online Booking / Lead Form */}
        <div
          className={`p-4 rounded-[16px] border ${
            hasOnlineBooking
              ? 'bg-[#E3F4E8] border-[#B7E1CD] text-[#11632E]'
              : 'bg-[#F5F1E8] border-[#E4DED1] text-[#0B0D12]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider font-['Space_Grotesk']">Online Booking</span>
            <CalendarCheck className="w-4 h-4 text-[#8A8F98]" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            {hasOnlineBooking ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#11632E] font-['Space_Grotesk'] whitespace-nowrap leading-none">
                <Check className="w-4 h-4 shrink-0 text-[#11632E]" />
                <span className="whitespace-nowrap">Present</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4A4F58] font-['Space_Grotesk'] whitespace-nowrap leading-none">
                <X className="w-4 h-4 shrink-0 text-[#A50E0E]" />
                <span className="whitespace-nowrap">Missing</span>
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">
            Captures appointments after-hours
          </span>
        </div>

        {/* Speed Rating */}
        <div className="p-4 rounded-[16px] bg-[#F5F1E8] border border-[#E4DED1]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">Page Speed</span>
            <Zap className="w-4 h-4 text-[#FF5A1F]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#0B0D12] mt-1 font-['Space_Grotesk']">
            {speedRating}
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">
            Target: &lt;2.5s on Indian 4G/5G
          </span>
        </div>

        {/* Mobile Experience */}
        <div className="p-4 rounded-[16px] bg-[#F5F1E8] border border-[#E4DED1]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">Mobile Score</span>
            <Smartphone className="w-4 h-4 text-[#0B0D12]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#0B0D12] mt-1 font-['Space_Grotesk']">
            {mobileScore}/100
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">
            {mobileFriendly ? 'Responsive viewport' : 'Requires viewport fix'}
          </span>
        </div>
      </div>

      {/* Critical Conversion Killers Callout */}
      <div className="p-5 rounded-[16px] bg-[#F5F1E8] border border-[#E4DED1] mb-6">
        <div className="flex items-center gap-2 text-[#0B0D12] font-bold text-sm mb-2 font-['Space_Grotesk']">
          <ShieldAlert className="w-4 h-4 text-[#FF5A1F]" />
          <span>Conversion Leaks Detected: Why Inquiries Drop Off</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-[#4A4F58]">
          {conversionKillers.map((killer, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#FF5A1F] font-bold mt-0.5">•</span>
              <span>{killer}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* SEO & Technical Issues */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8F98] mb-2 font-['Space_Grotesk']">
          Technical & SEO Optimizations Needed
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#F5F1E8]/70 text-xs text-[#0B0D12] border border-[#E4DED1] flex items-start gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0 mt-0.5" />
              <span>{issue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
