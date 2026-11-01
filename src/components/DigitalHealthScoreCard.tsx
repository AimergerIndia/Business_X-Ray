import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Compass } from 'lucide-react';
import { BusinessXRayReport } from '../types/audit';
import { AimergerSpark } from './AimergerBrand';

interface DigitalHealthScoreCardProps {
  report: BusinessXRayReport;
}

export const DigitalHealthScoreCard: React.FC<DigitalHealthScoreCardProps> = ({ report }) => {
  const { overallScore, scoreGrade, scoreVerdict, scoreBreakdown } = report;

  useEffect(() => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF5A1F', '#0B0D12', '#F5F1E8', '#FF8A5B'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  }, [report.id]);

  // Gauge calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-9 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
          {/* Left: Animated Score Gauge with Ember Stroke */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                {/* Background track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="text-[#F5F1E8]"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Score Arc in Ember #FF5A1F */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#FF5A1F"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Center Score Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black text-[#0B0D12] tracking-tight font-['Space_Grotesk']">
                  {overallScore}
                </span>
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#8A8F98] font-['Space_Grotesk']">
                  out of 100
                </span>
                <span className="mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1] font-['Space_Grotesk']">
                  Grade {scoreGrade}
                </span>
              </div>
            </div>

            <span className="mt-2 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1] font-['Space_Grotesk']">
              {overallScore >= 80 ? 'High Performing' : overallScore >= 60 ? 'Moderate with Leaks' : 'Critical Action Needed'}
            </span>
          </div>

          {/* Middle: Verdict & Summary */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#FF5A1F] mb-2 font-['Space_Grotesk']">
              <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
              <span>Overall Digital Health Score</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0D12] leading-snug font-['Space_Grotesk']">
              Digital Health Assessment
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#4A4F58] leading-relaxed font-normal">
              {scoreVerdict}
            </p>

            <div className="mt-5 pt-4 border-t border-[#E4DED1] flex flex-wrap gap-4 text-xs font-medium text-[#8A8F98]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#11632E]" />
                <span className="text-[#0B0D12]">Real-Time Google Grounding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#FF5A1F]" />
                <span className="text-[#0B0D12]">Benchmarked for Indian Local Market</span>
              </div>
            </div>
          </div>

          {/* Right: 4-Pillar Score Breakdown */}
          <div className="w-full lg:w-72 bg-[#F5F1E8] p-5 rounded-[16px] border border-[#E4DED1] space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8A8F98] mb-2 font-['Space_Grotesk']">
              Score Breakdown
            </div>

            {/* Google Maps Presence */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0B0D12] mb-1">
                <span>Google Maps Presence</span>
                <span className="font-bold font-['Space_Grotesk']">{scoreBreakdown.googleMapsPresence}%</span>
              </div>
              <div className="w-full h-2 bg-[#FFFFFF] border border-[#E4DED1] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0B0D12] rounded-full transition-all duration-700"
                  style={{ width: `${scoreBreakdown.googleMapsPresence}%` }}
                />
              </div>
            </div>

            {/* Reviews & Sentiment */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0B0D12] mb-1">
                <span>Reviews & Sentiment</span>
                <span className="font-bold font-['Space_Grotesk']">{scoreBreakdown.reputationAndReviews}%</span>
              </div>
              <div className="w-full h-2 bg-[#FFFFFF] border border-[#E4DED1] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5A1F] rounded-full transition-all duration-700"
                  style={{ width: `${scoreBreakdown.reputationAndReviews}%` }}
                />
              </div>
            </div>

            {/* Website & Mobile */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0B0D12] mb-1">
                <span>Website & Mobile UX</span>
                <span className="font-bold font-['Space_Grotesk']">{scoreBreakdown.websiteAndMobileConversion}%</span>
              </div>
              <div className="w-full h-2 bg-[#FFFFFF] border border-[#E4DED1] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#151923] rounded-full transition-all duration-700"
                  style={{ width: `${scoreBreakdown.websiteAndMobileConversion}%` }}
                />
              </div>
            </div>

            {/* AI Readiness */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0B0D12] mb-1">
                <span>AI Automation Readiness</span>
                <span className="font-bold font-['Space_Grotesk']">{scoreBreakdown.aiReadiness}%</span>
              </div>
              <div className="w-full h-2 bg-[#FFFFFF] border border-[#E4DED1] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF8A5B] rounded-full transition-all duration-700"
                  style={{ width: `${scoreBreakdown.aiReadiness}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
