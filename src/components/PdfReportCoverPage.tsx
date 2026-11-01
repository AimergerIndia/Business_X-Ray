import React from 'react';
import { ShieldCheck, Calendar, MapPin, Building2, TrendingDown, Star, Phone, Mail, Globe, Award, Sparkles } from 'lucide-react';
import { BusinessXRayReport, ComparisonReport } from '../types/audit';
import { formatINR } from '../utils/formatters';
import { AimergerLogo, AimergerSpark, AimergerIcon } from './AimergerBrand';

interface PdfReportCoverPageProps {
  report?: BusinessXRayReport | null;
  comparisonReport?: ComparisonReport | null;
  leadName?: string;
  leadPhone?: string;
}

export const PdfReportCoverPage: React.FC<PdfReportCoverPageProps> = ({
  report,
  comparisonReport,
  leadName,
  leadPhone,
}) => {
  if (!report && !comparisonReport) return null;

  const isComparison = Boolean(comparisonReport && !report);

  const businessName = isComparison
    ? `${comparisonReport!.reportA.businessName} vs ${comparisonReport!.reportB.businessName}`
    : report!.businessName;

  const city = isComparison ? comparisonReport!.reportA.city : report!.city;
  const category = isComparison ? comparisonReport!.category : report!.category;
  const auditDate = isComparison
    ? comparisonReport!.reportA.generatedAt
    : report!.generatedAt;

  const reportId = isComparison
    ? `AXR-BATTLE-${comparisonReport!.reportA.id.slice(-6).toUpperCase()}`
    : `AXR-${report!.id.slice(-6).toUpperCase()}`;

  return (
    <section className="hidden print:flex flex-col justify-between min-h-[265mm] p-10 bg-[#FFFFFF] text-[#0B0D12] border-8 border-[#0B0D12] print-cover-page">
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between pb-8 border-b-2 border-[#0B0D12]">
          <AimergerLogo variant="light" className="scale-110 origin-left" />

          <div className="text-right">
            <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#0B0D12] text-[#F5F1E8] rounded-full font-['Space_Grotesk']">
              CONFIDENTIAL AUDIT
            </span>
            <p className="text-xs text-[#4A4F58] font-mono mt-1 font-semibold">
              ID: {reportId}
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E4DED1] text-xs font-bold text-[#FF5A1F] uppercase tracking-wider font-['Space_Grotesk'] mb-4">
            <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
            <span>Autonomous AI Business Intelligence</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight font-['Space_Grotesk'] text-[#0B0D12] leading-tight">
            {isComparison
              ? 'Competitive Battle & Market Dominance X-Ray'
              : 'Digital Health & Revenue Leakage X-Ray Report'}
          </h1>

          <p className="text-base text-[#4A4F58] mt-3 font-sans max-w-2xl leading-relaxed">
            A comprehensive, data-driven diagnostic examining Google Business Profile visibility,
            reputation sentiment, website conversion leaks, and high-ROI AI automation roadmaps.
          </p>
        </div>

        {/* Prepared Exclusively For Box */}
        <div className="mt-10 p-6 rounded-2xl bg-[#F5F1E8] border border-[#E4DED1]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8F98] block mb-3 font-['Space_Grotesk']">
            PREPARED EXCLUSIVELY FOR
          </span>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold font-['Space_Grotesk'] text-[#0B0D12]">
                <Building2 className="w-5 h-5 text-[#FF5A1F] shrink-0" />
                <span>{businessName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#4A4F58] mt-2">
                <MapPin className="w-3.5 h-3.5 text-[#8A8F98]" />
                <span>{city}, India • {category}</span>
              </div>
            </div>

            <div className="border-l border-[#E4DED1] pl-6 text-xs space-y-1.5 text-[#4A4F58]">
              <div className="flex items-center justify-between">
                <span className="text-[#8A8F98]">Audit Date:</span>
                <span className="font-semibold text-[#0B0D12]">{auditDate}</span>
              </div>
              {leadName && (
                <div className="flex items-center justify-between">
                  <span className="text-[#8A8F98]">Requested By:</span>
                  <span className="font-semibold text-[#0B0D12]">{leadName}</span>
                </div>
              )}
              {leadPhone && (
                <div className="flex items-center justify-between">
                  <span className="text-[#8A8F98]">Contact Phone:</span>
                  <span className="font-mono font-semibold text-[#0B0D12]">{leadPhone}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#8A8F98]">Intelligence Engine:</span>
                <span className="font-semibold text-[#FF5A1F]">Gemini 3.8 Flash + Maps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Highlights Grid */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {report && (
            <>
              <div className="p-4 rounded-xl border border-[#0B0D12] bg-[#FFFFFF]">
                <span className="text-[10px] font-bold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk'] block">
                  HEALTH SCORE
                </span>
                <div className="text-3xl font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1">
                  {report.overallScore}<span className="text-sm text-[#8A8F98]">/100</span>
                </div>
                <div className="text-xs font-semibold text-[#FF5A1F] mt-1">
                  Grade {report.scoreGrade}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#FF5A1F] bg-[#FFF8F5]">
                <span className="text-[10px] font-bold text-[#FF5A1F] uppercase tracking-wider font-['Space_Grotesk'] block">
                  MONTHLY LEAKAGE
                </span>
                <div className="text-2xl font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1">
                  {formatINR(report.revenueLoss.totalMonthlyLoss)}
                </div>
                <div className="text-[11px] text-[#A50E0E] font-medium mt-1">
                  ~{formatINR(report.revenueLoss.totalAnnualLoss)}/yr lost
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E4DED1] bg-[#FFFFFF]">
                <span className="text-[10px] font-bold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk'] block">
                  MAPS RATING
                </span>
                <div className="text-3xl font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1 flex items-center gap-1">
                  <span>{report.gbpAudit.rating.toFixed(1)}</span>
                  <Star className="w-4 h-4 fill-[#FF5A1F] text-[#FF5A1F]" />
                </div>
                <div className="text-[11px] text-[#4A4F58] mt-1">
                  {report.gbpAudit.reviewCount} total reviews
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E4DED1] bg-[#FFFFFF]">
                <span className="text-[10px] font-bold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk'] block">
                  AI RECOMMENDATIONS
                </span>
                <div className="text-3xl font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1">
                  5 <span className="text-xs font-medium text-[#8A8F98]">Agents</span>
                </div>
                <div className="text-[11px] text-[#137333] font-medium mt-1">
                  Ready to deploy
                </div>
              </div>
            </>
          )}

          {comparisonReport && (
            <>
              <div className="p-4 rounded-xl border border-[#0B0D12] bg-[#FFFFFF]">
                <span className="text-[10px] font-bold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk'] block">
                  MARKET LEADER
                </span>
                <div className="text-lg font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1 truncate">
                  {comparisonReport.overallWinner === 'A'
                    ? comparisonReport.reportA.businessName
                    : comparisonReport.reportB.businessName}
                </div>
                <div className="text-xs font-semibold text-[#FF5A1F] mt-1">
                  +{comparisonReport.scoreGap} pts advantage
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#FF5A1F] bg-[#FFF8F5]">
                <span className="text-[10px] font-bold text-[#FF5A1F] uppercase tracking-wider font-['Space_Grotesk'] block">
                  MONTHLY REVENUE GAP
                </span>
                <div className="text-2xl font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1">
                  {formatINR(comparisonReport.monthlyRevenueGap)}
                </div>
                <div className="text-[11px] text-[#A50E0E] font-medium mt-1">
                  Monthly business at risk
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E4DED1] bg-[#FFFFFF]">
                <span className="text-[10px] font-bold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk'] block">
                  {comparisonReport.reportA.businessName.slice(0, 12)}
                </span>
                <div className="text-2xl font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1">
                  {comparisonReport.reportA.overallScore}/100
                </div>
                <div className="text-[11px] text-[#4A4F58] mt-1">
                  {comparisonReport.reportA.gbpAudit.rating.toFixed(1)} ★ ({comparisonReport.reportA.gbpAudit.reviewCount})
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E4DED1] bg-[#FFFFFF]">
                <span className="text-[10px] font-bold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk'] block">
                  {comparisonReport.reportB.businessName.slice(0, 12)}
                </span>
                <div className="text-2xl font-extrabold font-['Space_Grotesk'] text-[#0B0D12] mt-1">
                  {comparisonReport.reportB.overallScore}/100
                </div>
                <div className="text-[11px] text-[#4A4F58] mt-1">
                  {comparisonReport.reportB.gbpAudit.rating.toFixed(1)} ★ ({comparisonReport.reportB.gbpAudit.reviewCount})
                </div>
              </div>
            </>
          )}
        </div>

        {/* Executive Summary Statement */}
        <div className="mt-8 p-5 border-l-4 border-[#FF5A1F] bg-[#F5F1E8]/60 rounded-r-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0D12] font-['Space_Grotesk']">
            Executive Summary & AI Opportunity
          </h4>
          <p className="text-xs text-[#4A4F58] mt-1.5 leading-relaxed">
            {report
              ? report.scoreVerdict
              : comparisonReport?.leaderVerdict}
          </p>
        </div>
      </div>

      {/* Bottom Footer & Seal on Cover Page */}
      <div className="pt-8 border-t-2 border-[#0B0D12] mt-auto">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B0D12] font-['Space_Grotesk']">
              <span>Prepared by Aimerger Technologies</span>
              <AimergerSpark className="w-3 h-3" color="#FF5A1F" />
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#4A4F58] font-['Space_Grotesk']">
              <span>WhatsApp: +91 87969 25824</span>
              <span>•</span>
              <span>aimergerindia@gmail.com</span>
              <span>•</span>
              <span>aimerger.in</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#FF5A1F] flex flex-col items-center justify-center p-1 text-center bg-[#FFF8F5]">
              <span className="text-[7px] font-bold text-[#FF5A1F] uppercase leading-tight font-['Space_Grotesk']">
                VERIFIED
              </span>
              <AimergerSpark className="w-3 h-3" color="#FF5A1F" />
              <span className="text-[7px] font-bold text-[#0B0D12] uppercase leading-tight font-['Space_Grotesk']">
                AIMERGER
              </span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[#8A8F98] mt-4 text-center font-sans">
          Strictly Private & Confidential. Prepared solely for the internal management of {businessName}.
          Turn the page for the full diagnostic breakdown.
        </p>
      </div>
    </section>
  );
};
