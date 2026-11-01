import React from 'react';
import { Download, Share2, RefreshCw, Printer } from 'lucide-react';
import { BusinessXRayReport, Language } from '../types/audit';
import { formatINR } from '../utils/formatters';
import { AimergerSpark } from './AimergerBrand';

interface ReportHeaderActionsProps {
  report: BusinessXRayReport;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNewAudit: () => void;
  onShareWhatsApp: () => void;
  isRetranslating: boolean;
}

export const ReportHeaderActions: React.FC<ReportHeaderActionsProps> = ({
  report,
  currentLanguage,
  onLanguageChange,
  onNewAudit,
  onShareWhatsApp,
  isRetranslating,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E4DED1] sticky top-18 z-40 py-3.5 px-4 sm:px-6 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Report Title & Score Pill */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#0B0D12] tracking-tight font-['Space_Grotesk']">
              {report.businessName}
            </h2>
            <span className="text-xs text-[#8A8F98] font-medium">({report.city})</span>
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1] font-['Space_Grotesk']">
            <AimergerSpark className="w-3 h-3" />
            <span>Score: {report.overallScore}/100</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#A50E0E] font-semibold bg-[#FCE8E6] px-2.5 py-1 rounded-full border border-[#F5C2C7]">
            Leakage: {formatINR(report.revenueLoss.totalMonthlyLoss)}/mo
          </span>
        </div>

        {/* Right: Language switch + PDF + WhatsApp share + New Audit */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Language selector in sticky bar */}
          <div className="flex items-center bg-[#F5F1E8] p-1 rounded-full border border-[#E4DED1] text-xs font-semibold">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              disabled={isRetranslating}
              className={`px-3 py-1 rounded-full transition-all ${
                currentLanguage === 'en'
                  ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-2xs'
                  : 'text-[#4A4F58] hover:text-[#0B0D12]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              disabled={isRetranslating}
              className={`px-3 py-1 rounded-full transition-all ${
                currentLanguage === 'hi'
                  ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-2xs'
                  : 'text-[#4A4F58] hover:text-[#0B0D12]'
              }`}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hinglish')}
              disabled={isRetranslating}
              className={`px-3 py-1 rounded-full transition-all ${
                currentLanguage === 'hinglish'
                  ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-2xs'
                  : 'text-[#4A4F58] hover:text-[#0B0D12]'
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Share on WhatsApp */}
          <button
            type="button"
            onClick={onShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B0D12] bg-[#FFFFFF] hover:bg-[#F5F1E8] border border-[#E4DED1] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Share</span>
          </button>

          {/* Download PDF / Print */}
          <button
            type="button"
            onClick={handlePrint}
            title="Download/Print full PDF Report with Aimerger Cover Page & Executive Summary"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B0D12] bg-[#FFFFFF] hover:bg-[#F5F1E8] border border-[#E4DED1] transition-colors hover:border-[#0B0D12]"
          >
            <Printer className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Download PDF</span>
          </button>

          {/* Run New Audit */}
          <button
            type="button"
            onClick={onNewAudit}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B0D12] bg-[#F5F1E8] hover:bg-[#0B0D12] hover:text-[#F5F1E8] border border-[#E4DED1] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Audit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
