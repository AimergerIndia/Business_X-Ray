import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SearchAuditForm } from './components/SearchAuditForm';
import { CompareAuditForm } from './components/CompareAuditForm';
import { AuditProgressTracker } from './components/AuditProgressTracker';
import { ReportHeaderActions } from './components/ReportHeaderActions';
import { DigitalHealthScoreCard } from './components/DigitalHealthScoreCard';
import { GoogleBusinessProfileCard } from './components/GoogleBusinessProfileCard';
import { WebsiteAuditCard } from './components/WebsiteAuditCard';
import { CompetitorComparisonTable } from './components/CompetitorComparisonTable';
import { RevenueLossCalculator } from './components/RevenueLossCalculator';
import { AIRecommendationsCard } from './components/AIRecommendationsCard';
import { ReviewRepliesCard } from './components/ReviewRepliesCard';
import { CitationsSection } from './components/CitationsSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { ComparisonBattleReport } from './components/ComparisonBattleReport';
import { AdminLeadsPage } from './components/AdminLeadsPage';
import { Footer } from './components/Footer';
import {
  AuditRequestPayload,
  BusinessXRayReport,
  ComparisonRequestPayload,
  ComparisonReport,
  Language,
} from './types/audit';
import { formatINR } from './utils/formatters';
import { saveLead, getStoredLeads, updateLeadContactInfo } from './utils/leadsStorage';
import { AlertTriangle, MessageCircle, Swords, FileSearch } from 'lucide-react';
import { AimergerSpark } from './components/AimergerBrand';
import { LeadUnlockModal } from './components/LeadUnlockModal';
import { PdfReportCoverPage } from './components/PdfReportCoverPage';
import { PdfContactFooter } from './components/PdfContactFooter';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentView, setCurrentView] = useState<'audit' | 'admin'>('audit');
  const [auditMode, setAuditMode] = useState<'single' | 'compare'>('single');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isRetranslating, setIsRetranslating] = useState(false);
  const [leadsCount, setLeadsCount] = useState<number>(0);

  // Lead capture gating state
  const [capturedLead, setCapturedLead] = useState<{ name: string; phone: string; role: string } | null>(() => {
    try {
      const saved = localStorage.getItem('aimerger_captured_lead_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isReportUnlocked, setIsReportUnlocked] = useState(false);

  // Single business audit states
  const [activePayload, setActivePayload] = useState<AuditRequestPayload | null>(null);
  const [report, setReport] = useState<BusinessXRayReport | null>(null);

  // Comparison mode states
  const [activeComparePayload, setActiveComparePayload] = useState<ComparisonRequestPayload | null>(null);
  const [comparisonReport, setComparisonReport] = useState<ComparisonReport | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize leads count on mount
  React.useEffect(() => {
    setLeadsCount(getStoredLeads().length);
  }, []);

  // Start single business audit
  const handleStartAudit = async (payload: AuditRequestPayload) => {
    setActivePayload(payload);
    setReport(null);
    setComparisonReport(null);
    setIsLoading(true);
    setErrorMessage(null);
    setIsReportUnlocked(Boolean(capturedLead));

    window.scrollTo({ top: 120, behavior: 'smooth' });

    try {
      const response = await fetch('/api/audit/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          language: currentLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate audit. Please try again.');
      }

      setReport(data.report);

      // Persist lead to localStorage for admin follow-up
      try {
        saveLead({
          businessName: data.report.businessName,
          city: data.report.city,
          category: data.report.category,
          websiteUrl: data.report.websiteUrl,
          score: data.report.overallScore,
          grade: data.report.scoreGrade,
          monthlyLoss: data.report.revenueLoss.totalMonthlyLoss,
          rating: data.report.gbpAudit.rating,
          reviewCount: data.report.gbpAudit.reviewCount,
          unansweredReviews: data.report.gbpAudit.unansweredReviewsCount,
          hasWhatsApp: data.report.websiteAudit.hasWhatsAppButton,
          auditType: 'single',
          leadName: capturedLead?.name,
          leadPhone: capturedLead?.phone,
          leadRole: capturedLead?.role,
          notes: `Automated scan. ${data.report.gbpAudit.unansweredReviewsCount} reviews unanswered. Leakage: ${formatINR(data.report.revenueLoss.totalMonthlyLoss)}/mo.`,
        });
        setLeadsCount(getStoredLeads().length);
      } catch (e) {
        console.warn('Lead saving error:', e);
      }

      setTimeout(() => {
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      console.error('Audit generation error:', err);
      setErrorMessage(
        err.message || 'Could not locate this business on Google Maps. Please refine the name or pick a verified example below.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Start competitor comparison
  const handleStartComparison = async (payload: ComparisonRequestPayload) => {
    setActiveComparePayload(payload);
    setReport(null);
    setComparisonReport(null);
    setIsLoading(true);
    setErrorMessage(null);
    setIsReportUnlocked(Boolean(capturedLead));

    window.scrollTo({ top: 120, behavior: 'smooth' });

    try {
      const response = await fetch('/api/audit/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          language: currentLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to compare businesses. Please try again.');
      }

      setComparisonReport(data.comparison);

      // Persist competitor matchup lead to localStorage
      try {
        saveLead({
          businessName: `${data.comparison.reportA.businessName} vs ${data.comparison.reportB.businessName}`,
          city: data.comparison.reportA.city,
          category: data.comparison.category,
          websiteUrl: data.comparison.reportA.websiteUrl,
          score: data.comparison.reportA.overallScore,
          grade: data.comparison.reportA.scoreGrade,
          monthlyLoss: data.comparison.monthlyRevenueGap,
          rating: data.comparison.reportA.gbpAudit.rating,
          reviewCount: data.comparison.reportA.gbpAudit.reviewCount,
          unansweredReviews: data.comparison.reportA.gbpAudit.unansweredReviewsCount,
          hasWhatsApp: data.comparison.reportA.websiteAudit.hasWhatsAppButton,
          auditType: 'compare',
          leadName: capturedLead?.name,
          leadPhone: capturedLead?.phone,
          leadRole: capturedLead?.role,
          notes: `Rivalry matchup vs ${data.comparison.reportB.businessName}. Gap: ${formatINR(data.comparison.monthlyRevenueGap)}/mo.`,
        });
        setLeadsCount(getStoredLeads().length);
      } catch (e) {
        console.warn('Lead saving error:', e);
      }

      setTimeout(() => {
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      console.error('Comparison error:', err);
      setErrorMessage(
        err.message || 'Could not benchmark these competitors. Please verify business names or select a popular matchup.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockReport = (leadData: { name: string; phone: string; role: string }) => {
    setCapturedLead(leadData);
    setIsReportUnlocked(true);

    try {
      localStorage.setItem('aimerger_captured_lead_profile', JSON.stringify(leadData));
      const targetBusiness = report
        ? report.businessName
        : comparisonReport
        ? `${comparisonReport.reportA.businessName} vs ${comparisonReport.reportB.businessName}`
        : '';
      const targetCity = report
        ? report.city
        : comparisonReport
        ? comparisonReport.reportA.city
        : '';

      updateLeadContactInfo(targetBusiness, targetCity, {
        leadName: leadData.name,
        leadPhone: leadData.phone,
        leadRole: leadData.role,
      });
      setLeadsCount(getStoredLeads().length);
    } catch (e) {
      console.warn('Error saving lead contact:', e);
    }

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Optional confetti
    }
  };

  // Language switch
  const handleLanguageChange = async (newLang: Language) => {
    setCurrentLanguage(newLang);

    if (report) {
      setIsRetranslating(true);
      try {
        const response = await fetch('/api/audit/retranslate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            report,
            targetLanguage: newLang,
          }),
        });
        const data = await response.json();
        if (data.success && data.report) {
          setReport(data.report);
        }
      } catch (e) {
        console.warn('Retranslate error, keeping existing report language:', e);
      } finally {
        setIsRetranslating(false);
      }
    } else if (comparisonReport && activeComparePayload) {
      handleStartComparison({
        ...activeComparePayload,
        language: newLang,
      });
    }
  };

  const handleShareWhatsApp = () => {
    if (!report) return;
    const shareMessage = encodeURIComponent(
      `📊 *Aimerger Business X-Ray Audit Report*\n` +
      `🏢 Business: ${report.businessName} (${report.city})\n` +
      `⚡ Digital Health Score: ${report.overallScore}/100 (Grade ${report.scoreGrade})\n` +
      `💸 Estimated Monthly Revenue Leakage: ${formatINR(report.revenueLoss.totalMonthlyLoss)}/month\n` +
      `⭐ Google Maps Rating: ${report.gbpAudit.rating.toFixed(1)}/5 (${report.gbpAudit.reviewCount} reviews)\n\n` +
      `👉 See full audit and 5 AI automation recommendations with Aimerger: https://wa.me/918796925824`
    );
    window.open(`https://wa.me/?text=${shareMessage}`, '_blank');
  };

  const handleReset = () => {
    setReport(null);
    setComparisonReport(null);
    setActivePayload(null);
    setActiveComparePayload(null);
    setErrorMessage(null);
    setIsReportUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isReportActive = Boolean(report || comparisonReport);

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#0B0D12] flex flex-col font-sans selection:bg-[#FF8A5B]/30 selection:text-[#0B0D12]">
      {/* Top Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onShareWhatsApp={handleShareWhatsApp}
        reportLoaded={isReportActive}
        currentView={currentView}
        onToggleView={(view) => setCurrentView(view)}
        leadsCount={leadsCount}
      />

      {/* Sticky Quick-Action Bar when Single Report is loaded and in audit view */}
      {report && currentView === 'audit' && isReportUnlocked && (
        <ReportHeaderActions
          report={report}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onNewAudit={handleReset}
          onShareWhatsApp={handleShareWhatsApp}
          isRetranslating={isRetranslating}
        />
      )}

      {/* Main Container */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <AdminLeadsPage onBackToAuditor={() => setCurrentView('audit')} />
        ) : (
          <>
            {/* Executive Printable Cover Page for Single Report (Only in Print / PDF) */}
            {report && (
              <PdfReportCoverPage
                report={report}
                leadName={capturedLead?.name}
                leadPhone={capturedLead?.phone}
              />
            )}

        {/* Mode Switcher Tabs (Shown when no report is active) */}
        {!isReportActive && !isLoading && (
          <div className="max-w-md mx-auto pt-6 px-4 no-print">
            <div className="flex items-center bg-[#FFFFFF] p-1.5 rounded-full border border-[#E4DED1] shadow-2xs font-['Space_Grotesk']">
              <button
                type="button"
                onClick={() => setAuditMode('single')}
                className={`flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  auditMode === 'single'
                    ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-xs'
                    : 'text-[#4A4F58] hover:text-[#0B0D12]'
                }`}
              >
                <FileSearch className="w-4 h-4 text-[#FF5A1F]" />
                <span>Single Business X-Ray</span>
              </button>

              <button
                type="button"
                onClick={() => setAuditMode('compare')}
                className={`flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  auditMode === 'compare'
                    ? 'bg-[#0B0D12] text-[#F5F1E8] shadow-xs'
                    : 'text-[#4A4F58] hover:text-[#0B0D12]'
                }`}
              >
                <Swords className="w-4 h-4 text-[#FF5A1F]" />
                <span>Compare Competitors</span>
              </button>
            </div>
          </div>
        )}

        {/* Mode 1: Search Form for Single Business */}
        {!isReportActive && auditMode === 'single' && (
          <SearchAuditForm
            onStartAudit={handleStartAudit}
            isLoading={isLoading}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Mode 2: Search Form for Competitor Comparison */}
        {!isReportActive && auditMode === 'compare' && (
          <CompareAuditForm
            onStartComparison={handleStartComparison}
            isLoading={isLoading}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Live Research Progress Timeline during scanning */}
        {isLoading && (
          <AuditProgressTracker
            businessName={
              activePayload
                ? activePayload.businessName
                : activeComparePayload
                ? `${activeComparePayload.businessA.name} vs ${activeComparePayload.businessB.name}`
                : 'Local Business'
            }
            city={
              activePayload
                ? activePayload.city
                : activeComparePayload
                ? activeComparePayload.businessA.city
                : 'India'
            }
          />
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="max-w-3xl mx-auto px-4 my-6">
            <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E4DED1] text-[#0B0D12] shadow-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm font-['Space_Grotesk']">Notice: Google Maps Search Ambiguity</h4>
                <p className="text-xs sm:text-sm text-[#4A4F58] mt-1">{errorMessage}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      if (activePayload) {
                        handleStartAudit({
                          ...activePayload,
                          category: 'Local Business',
                        });
                      } else if (activeComparePayload) {
                        handleStartComparison({
                          ...activeComparePayload,
                          category: 'Local Business',
                        });
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#0B0D12] text-[#F5F1E8] text-xs font-semibold hover:bg-[#FF5A1F] hover:text-[#0B0D12] transition-colors font-['Space_Grotesk']"
                  >
                    Run Industry Benchmark Simulation
                  </button>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="px-3.5 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E4DED1] text-[#0B0D12] text-xs font-semibold hover:bg-[#E4DED1] font-['Space_Grotesk']"
                  >
                    Change Search Term
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Single Generated Report View */}
        {report && (
          <div className="relative">
            {/* Lead Capture Unlock Modal Gate */}
            {!isReportUnlocked && (
              <LeadUnlockModal
                businessName={report.businessName}
                city={report.city}
                category={report.category}
                overallScore={report.overallScore}
                monthlyLoss={report.revenueLoss.totalMonthlyLoss}
                onUnlock={handleUnlockReport}
              />
            )}

            <div
              className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-all duration-300 ${
                !isReportUnlocked
                  ? 'filter blur-sm pointer-events-none select-none max-h-[750px] overflow-hidden opacity-50'
                  : ''
              }`}
            >
              {/* Retranslating overlay banner */}
              {isRetranslating && (
                <div className="p-3 bg-[#FFFFFF] text-[#0B0D12] rounded-full text-center text-xs font-semibold animate-pulse border border-[#E4DED1] font-['Space_Grotesk'] shadow-2xs">
                  <AimergerSpark className="w-3.5 h-3.5 inline mr-1" color="#FF5A1F" />
                  Translating Business X-Ray report into{' '}
                  {currentLanguage === 'hi' ? 'हिंदी (Hindi)' : currentLanguage === 'hinglish' ? 'Hinglish' : 'English'}…
                </div>
              )}

              {/* Quick Action Bar for Mobile View */}
              <div className="sm:hidden flex items-center justify-between p-4 bg-[#FFFFFF] rounded-[16px] shadow-2xs border border-[#E4DED1] no-print">
                <div>
                  <span className="text-xs text-[#8A8F98]">Business Health Score</span>
                  <div className="text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">{report.overallScore}/100</div>
                </div>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2 rounded-full text-xs font-bold text-[#0B0D12] bg-[#FF5A1F] flex items-center gap-1.5 font-['Space_Grotesk']"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Share WhatsApp</span>
                </button>
              </div>

              {/* 1. Overall Digital Health Score Card */}
              <div className="print-break-inside-avoid">
                <DigitalHealthScoreCard report={report} />
              </div>

              {/* 2. Customers You Are Losing (Revenue Leakage Highlight) */}
              <div className="print-break-inside-avoid">
                <RevenueLossCalculator revenueLoss={report.revenueLoss} />
              </div>

              {/* 3. Google Business Profile & Website Audits in 2 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print-break-inside-avoid">
                <GoogleBusinessProfileCard audit={report.gbpAudit} />
                <WebsiteAuditCard audit={report.websiteAudit} businessName={report.businessName} />
              </div>

              {/* 4. Top 3 Competitors Comparison Table */}
              <div className="print-break-inside-avoid">
                <CompetitorComparisonTable
                  businessName={report.businessName}
                  yourRating={report.gbpAudit.rating}
                  yourReviewCount={report.gbpAudit.reviewCount}
                  city={report.city}
                  competitors={report.competitors}
                />
              </div>

              {/* 5. 5 AI Automation Recommendations */}
              <div className="print-break-inside-avoid">
                <AIRecommendationsCard
                  recommendations={report.recommendations}
                  businessName={report.businessName}
                />
              </div>

              {/* 6. 3 Ready-to-Use Review Replies */}
              <div className="print-break-inside-avoid">
                <ReviewRepliesCard
                  replies={report.reviewReplies}
                  businessName={report.businessName}
                />
              </div>

              {/* 7. Grounding Citations */}
              <div className="print-break-inside-avoid">
                <CitationsSection
                  citations={report.citations}
                  businessName={report.businessName}
                />
              </div>

              {/* 8. Bottom Lead Magnet CTA Banner */}
              <div className="print-break-inside-avoid">
                <CallToActionBanner report={report} />
              </div>

              {/* 9. Executive Printable Contact Footer */}
              <PdfContactFooter
                businessName={report.businessName}
                monthlyLoss={report.revenueLoss.totalMonthlyLoss}
              />
            </div>
          </div>
        )}

        {/* Side-by-Side Competitor Comparison Battle Report */}
        {comparisonReport && (
          <div className="relative">
            {/* Lead Capture Unlock Modal Gate for Comparison */}
            {!isReportUnlocked && (
              <LeadUnlockModal
                businessName={`${comparisonReport.reportA.businessName} vs ${comparisonReport.reportB.businessName}`}
                city={comparisonReport.reportA.city}
                category={comparisonReport.category}
                overallScore={comparisonReport.reportA.overallScore}
                monthlyLoss={comparisonReport.monthlyRevenueGap}
                onUnlock={handleUnlockReport}
              />
            )}

            <div
              className={`transition-all duration-300 ${
                !isReportUnlocked
                  ? 'filter blur-sm pointer-events-none select-none max-h-[750px] overflow-hidden opacity-50'
                  : ''
              }`}
            >
              <ComparisonBattleReport
                comparison={comparisonReport}
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                onNewComparison={handleReset}
                leadName={capturedLead?.name}
                leadPhone={capturedLead?.phone}
              />
            </div>
          </div>
        )}
      </>
    )}
  </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setCurrentView('admin')} />
    </div>
  );
}
