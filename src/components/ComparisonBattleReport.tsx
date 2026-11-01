import React from 'react';
import {
  Trophy,
  Swords,
  Star,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  Printer,
  Share2,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react';
import { ComparisonReport, Language } from '../types/audit';
import { formatINR } from '../utils/formatters';
import { AimergerSpark } from './AimergerBrand';
import { PdfReportCoverPage } from './PdfReportCoverPage';
import { PdfContactFooter } from './PdfContactFooter';

interface ComparisonBattleReportProps {
  comparison: ComparisonReport;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNewComparison: () => void;
  leadName?: string;
  leadPhone?: string;
}

export const ComparisonBattleReport: React.FC<ComparisonBattleReportProps> = ({
  comparison,
  currentLanguage,
  onLanguageChange,
  onNewComparison,
  leadName,
  leadPhone,
}) => {
  const {
    reportA,
    reportB,
    overallWinner,
    leaderVerdict,
    scoreGap,
    monthlyRevenueGap,
    metricsTable,
    playbookToWin,
    category,
  } = comparison;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const winnerName = overallWinner === 'A' ? reportA.businessName : overallWinner === 'B' ? reportB.businessName : 'Tie';
    const message = encodeURIComponent(
      `⚔️ *Aimerger Business Battle Report*\n` +
      `🏢 ${reportA.businessName} (${reportA.overallScore}/100) vs ${reportB.businessName} (${reportB.overallScore}/100)\n` +
      `🏆 Market Leader: ${winnerName} (+${scoreGap} points)\n` +
      `💸 Monthly Revenue Gap: ${formatINR(monthlyRevenueGap)}/mo\n\n` +
      `👉 See full head-to-head AI comparison & battle playbook by Aimerger: https://wa.me/918796925824`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const isAWinner = overallWinner === 'A';
  const isBWinner = overallWinner === 'B';

  const whatsappConsultUrl = `https://wa.me/918796925824?text=${encodeURIComponent(
    `Hi Aimerger team, I ran a head-to-head comparison between "${reportA.businessName}" and "${reportB.businessName}". I want to book a free 30-minute strategy call to discuss the AI battle playbook to win more local market share.`
  )}`;

  return (
    <>
      {/* Executive Printable Cover Page (Only visible on print / PDF) */}
      <PdfReportCoverPage
        comparisonReport={comparison}
        leadName={leadName}
        leadPhone={leadPhone}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sticky Top Bar for Comparison */}
        <div className="bg-[#FFFFFF] border-b border-[#E4DED1] sticky top-18 z-40 py-3.5 px-4 sm:px-6 shadow-2xs -mx-4 sm:-mx-6 lg:-mx-8 mb-6 no-print">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A1F] flex items-center gap-1 font-['Space_Grotesk']">
                <Swords className="w-3.5 h-3.5" />
                <span>Head-to-Head Battle:</span>
              </span>
              <span className="font-bold text-[#0B0D12] text-sm sm:text-base font-['Space_Grotesk']">
                {reportA.businessName} vs {reportB.businessName}
              </span>
              <span className="text-xs text-[#8A8F98]">({reportA.city})</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {/* Language switcher */}
              <div className="flex items-center bg-[#F5F1E8] p-1 rounded-full border border-[#E4DED1] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
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
                  className={`px-3 py-1 rounded-full transition-all ${
                    currentLanguage === 'hinglish'
                      ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-2xs'
                      : 'text-[#4A4F58] hover:text-[#0B0D12]'
                  }`}
                >
                  Hinglish
                </button>
              </div>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B0D12] bg-[#FFFFFF] hover:bg-[#F5F1E8] border border-[#E4DED1] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>Share Battle</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                title="Download/Print full PDF Battle Report with Aimerger Cover Page & Executive Summary"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B0D12] bg-[#FFFFFF] hover:bg-[#F5F1E8] border border-[#E4DED1] transition-colors hover:border-[#0B0D12]"
              >
                <Printer className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>Download PDF</span>
              </button>

            <button
              type="button"
              onClick={onNewComparison}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B0D12] bg-[#F5F1E8] hover:bg-[#0B0D12] hover:text-[#F5F1E8] border border-[#E4DED1] transition-colors font-['Space_Grotesk']"
            >
              <span>New Matchup</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Winner Crown Banner */}
      <div className="bg-[#0B0D12] text-[#F5F1E8] rounded-[24px] p-6 sm:p-9 border border-[#232836] relative overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151923] border border-[#2a3040] text-[#FF5A1F] text-xs font-bold uppercase tracking-[0.14em] mb-3 font-['Space_Grotesk']">
              <Trophy className="w-4 h-4 text-[#FF5A1F]" />
              <span>Local Market Battle Outcome</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-[#F5F1E8] tracking-tight">
              {isAWinner ? (
                <>
                  <span className="text-[#FF5A1F]">{reportA.businessName}</span> leads by +{scoreGap} points
                </>
              ) : isBWinner ? (
                <>
                  <span className="text-[#FF5A1F]">{reportB.businessName}</span> leads by +{scoreGap} points
                </>
              ) : (
                <>Dead Heat: Tied at {reportA.overallScore}/100</>
              )}
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-[#b9bdc6] max-w-2xl leading-relaxed">
              {leaderVerdict}
            </p>
          </div>

          <div className="text-center md:text-right shrink-0 bg-[#151923] p-4 rounded-[16px] border border-[#232836]">
            <span className="text-xs text-[#8A8F98] block uppercase tracking-wider font-['Space_Grotesk']">
              Monthly Revenue Gap
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#FF5A1F] font-['Space_Grotesk']">
              {formatINR(monthlyRevenueGap)}/mo
            </span>
            <span className="text-[11px] text-[#8A8F98] block mt-0.5">
              Opportunity at stake in {reportA.city}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Dual Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-break-inside-avoid">
        {/* Business A Card */}
        <div
          className={`bg-[#FFFFFF] rounded-[20px] p-6 sm:p-7 border transition-all ${
            isAWinner ? 'border-[#FF5A1F] shadow-md ring-2 ring-[#FF5A1F]/20' : 'border-[#E4DED1] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#E4DED1]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B0D12] text-[#F5F1E8] text-xs font-bold flex items-center justify-center font-['Space_Grotesk']">
                  A
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8F98] font-['Space_Grotesk']">
                  Your Business
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0B0D12] mt-1 font-['Space_Grotesk']">
                {reportA.businessName}
              </h3>
              <p className="text-xs text-[#8A8F98]">{reportA.city}</p>
            </div>

            <div className="text-right">
              <span className="text-3xl sm:text-4xl font-black text-[#0B0D12] font-['Space_Grotesk']">
                {reportA.overallScore}
              </span>
              <span className="text-xs text-[#8A8F98] block font-['Space_Grotesk']">Score / 100</span>
              {isAWinner && (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E3F4E8] text-[#11632E] font-['Space_Grotesk']">
                  Winner 🏆
                </span>
              )}
            </div>
          </div>

          {/* Metrics Quick List */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block">Google Rating</span>
              <span className="text-base font-bold text-[#0B0D12] font-['Space_Grotesk'] flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FF5A1F] text-[#FF5A1F]" />
                {reportA.gbpAudit.rating.toFixed(1)} ({reportA.gbpAudit.reviewCount})
              </span>
            </div>
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block">Response Rate</span>
              <span className="text-base font-bold text-[#0B0D12] font-['Space_Grotesk']">
                {reportA.gbpAudit.responseRatePercentage}%
              </span>
            </div>
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block mb-1">WhatsApp Bot</span>
              <span className="inline-flex items-center gap-1 font-bold font-['Space_Grotesk'] whitespace-nowrap leading-none">
                {reportA.websiteAudit.hasWhatsAppButton ? (
                  <span className="inline-flex items-center gap-1 text-[#11632E] text-xs font-bold">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[#A50E0E] text-xs font-bold">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>Missing</span>
                  </span>
                )}
              </span>
            </div>
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block">Leaked Revenue</span>
              <span className="text-sm font-bold text-[#A50E0E] font-['Space_Grotesk']">
                {formatINR(reportA.revenueLoss.totalMonthlyLoss)}/mo
              </span>
            </div>
          </div>

          {/* Maps Link */}
          {reportA.gbpAudit.mapsUrl && (
            <div className="mt-4 pt-3 border-t border-[#E4DED1]">
              <a
                href={reportA.gbpAudit.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#FF5A1F] hover:text-[#FF8A5B] flex items-center gap-1 font-['Space_Grotesk'] font-semibold"
              >
                <span>View {reportA.businessName} on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Business B Card */}
        <div
          className={`bg-[#FFFFFF] rounded-[20px] p-6 sm:p-7 border transition-all ${
            isBWinner ? 'border-[#FF5A1F] shadow-md ring-2 ring-[#FF5A1F]/20' : 'border-[#E4DED1] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#E4DED1]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FF5A1F] text-[#0B0D12] text-xs font-bold flex items-center justify-center font-['Space_Grotesk']">
                  B
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8F98] font-['Space_Grotesk']">
                  Competitor
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0B0D12] mt-1 font-['Space_Grotesk']">
                {reportB.businessName}
              </h3>
              <p className="text-xs text-[#8A8F98]">{reportB.city}</p>
            </div>

            <div className="text-right">
              <span className="text-3xl sm:text-4xl font-black text-[#0B0D12] font-['Space_Grotesk']">
                {reportB.overallScore}
              </span>
              <span className="text-xs text-[#8A8F98] block font-['Space_Grotesk']">Score / 100</span>
              {isBWinner && (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E3F4E8] text-[#11632E] font-['Space_Grotesk']">
                  Winner 🏆
                </span>
              )}
            </div>
          </div>

          {/* Metrics Quick List */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block">Google Rating</span>
              <span className="text-base font-bold text-[#0B0D12] font-['Space_Grotesk'] flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FF5A1F] text-[#FF5A1F]" />
                {reportB.gbpAudit.rating.toFixed(1)} ({reportB.gbpAudit.reviewCount})
              </span>
            </div>
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block">Response Rate</span>
              <span className="text-base font-bold text-[#0B0D12] font-['Space_Grotesk']">
                {reportB.gbpAudit.responseRatePercentage}%
              </span>
            </div>
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block mb-1">WhatsApp Bot</span>
              <span className="inline-flex items-center gap-1 font-bold font-['Space_Grotesk'] whitespace-nowrap leading-none">
                {reportB.websiteAudit.hasWhatsAppButton ? (
                  <span className="inline-flex items-center gap-1 text-[#11632E] text-xs font-bold">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[#A50E0E] text-xs font-bold">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>Missing</span>
                  </span>
                )}
              </span>
            </div>
            <div className="p-3 bg-[#F5F1E8] rounded-xl border border-[#E4DED1]">
              <span className="text-[#8A8F98] block">Leaked Revenue</span>
              <span className="text-sm font-bold text-[#A50E0E] font-['Space_Grotesk']">
                {formatINR(reportB.revenueLoss.totalMonthlyLoss)}/mo
              </span>
            </div>
          </div>

          {/* Maps Link */}
          {reportB.gbpAudit.mapsUrl && (
            <div className="mt-4 pt-3 border-t border-[#E4DED1]">
              <a
                href={reportB.gbpAudit.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#FF5A1F] hover:text-[#FF8A5B] flex items-center gap-1 font-['Space_Grotesk'] font-semibold"
              >
                <span>View {reportB.businessName} on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 3. Comprehensive Head-to-Head Comparison Table */}
      <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-8 print-break-inside-avoid">
        <div className="flex items-center gap-2 mb-4">
          <AimergerSpark className="w-4 h-4" color="#FF5A1F" />
          <h3 className="text-xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
            Direct Metric-by-Metric Comparison Matrix
          </h3>
        </div>

        <div className="overflow-x-auto rounded-[16px] border border-[#E4DED1]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#0B0D12] text-[#F5F1E8] font-['Space_Grotesk'] text-xs">
                <th className="py-3.5 px-4 font-medium">Metric Analyzed</th>
                <th className="py-3.5 px-4 font-medium">{reportA.businessName} (A)</th>
                <th className="py-3.5 px-4 font-medium">{reportB.businessName} (B)</th>
                <th className="py-3.5 px-4 text-right font-medium">Head-to-Head Leader</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DED1]">
              {metricsTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F5F1E8]/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#0B0D12]">
                    <div className="font-['Space_Grotesk']">{row.metric}</div>
                    <span className="text-[11px] text-[#8A8F98] font-normal">{row.insight}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0B0D12] font-['Space_Grotesk']">
                    {row.valA}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0B0D12] font-['Space_Grotesk']">
                    {row.valB}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold font-['Space_Grotesk'] ${
                        row.winner === 'A'
                          ? 'bg-[#E3F4E8] text-[#11632E]'
                          : row.winner === 'B'
                          ? 'bg-[#FF5A1F] text-[#0B0D12]'
                          : 'bg-[#F5F1E8] text-[#8A8F98]'
                      }`}
                    >
                      {row.winner === 'A'
                        ? `${reportA.businessName} Leads`
                        : row.winner === 'B'
                        ? `${reportB.businessName} Leads`
                        : 'Tied'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Strategic Battle Playbook to Win */}
      <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-8 print-break-inside-avoid">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DED1]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF5A1F] font-['Space_Grotesk']">
                Aimerger Action Plan
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
              How {reportA.businessName} Can Outcompete {reportB.businessName} with AI
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8F98]">
              3 autonomous AI moves engineered to capture market share from this rival
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-[#F5F1E8] text-[#0B0D12] text-xs font-bold border border-[#E4DED1] font-['Space_Grotesk'] w-fit">
            30-Day Battle Roadmap
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {playbookToWin.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-5 rounded-[16px] bg-[#F5F1E8]/40 border border-[#E4DED1] hover:bg-[#FFFFFF] hover:border-[#FF5A1F] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B0D12] text-[#F5F1E8] flex items-center justify-center shrink-0 font-bold text-xs font-['Space_Grotesk']">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0B0D12] font-['Space_Grotesk']">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A4F58] mt-1 leading-relaxed">
                      {item.tactic}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#E3F4E8] text-[#11632E] text-xs font-bold font-['Space_Grotesk'] shrink-0 flex items-center gap-1 self-start">
                  <span>Edge: {item.expectedEdge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Direct Battle CTA Banner */}
      <div className="bg-[#0B0D12] text-[#F5F1E8] rounded-[24px] p-8 sm:p-12 text-center border border-[#232836] relative overflow-hidden print-break-inside-avoid">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151923] border border-[#2a3040] text-[#FF5A1F] text-xs font-semibold font-['Space_Grotesk']">
            <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
            <span>Ready to dominate your local market?</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-[#F5F1E8] tracking-tight">
            Deploy Aimerger AI and win {reportA.city}
          </h3>

          <p className="text-xs sm:text-sm text-[#b9bdc6]">
            Book a free 30-minute consultation. We'll show you an exact working demo of the WhatsApp booking agent and automated review engine for {reportA.businessName}.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#0B0D12] bg-[#FF5A1F] hover:bg-[#FF8A5B] transition-all hover:scale-105 font-['Space_Grotesk'] shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-[#0B0D12]" />
              <span>Book free 30-min call to execute playbook →</span>
            </a>
          </div>
        </div>
      </div>

      {/* Executive Printable Contact Footer */}
      <PdfContactFooter
        businessName={`${reportA.businessName} vs ${reportB.businessName}`}
        monthlyLoss={monthlyRevenueGap}
      />
    </div>
  </>
  );
};
