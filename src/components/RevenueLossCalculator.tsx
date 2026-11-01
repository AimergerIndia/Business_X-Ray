import React, { useState } from 'react';
import { TrendingDown, Sliders, ArrowRight } from 'lucide-react';
import { RevenueLossBreakdown } from '../types/audit';
import { formatINR, formatInLakhs } from '../utils/formatters';
import { AimergerSpark } from './AimergerBrand';

interface RevenueLossCalculatorProps {
  revenueLoss: RevenueLossBreakdown;
}

export const RevenueLossCalculator: React.FC<RevenueLossCalculatorProps> = ({ revenueLoss }) => {
  const [avgTicket, setAvgTicket] = useState(revenueLoss.avgCustomerValueUsed || 1200);

  // Dynamic scale multiplier
  const multiplier = avgTicket / (revenueLoss.avgCustomerValueUsed || 1200);

  const dynamicReviewsLoss = Math.round(revenueLoss.unansweredReviewsLoss * multiplier);
  const dynamicWhatsAppLoss = Math.round(revenueLoss.slowOrNoWhatsAppResponseLoss * multiplier);
  const dynamicRepeatLoss = Math.round(revenueLoss.lackOfRepeatBookingAutomationLoss * multiplier);
  const dynamicTotalMonthly = dynamicReviewsLoss + dynamicWhatsAppLoss + dynamicRepeatLoss;
  const dynamicTotalAnnual = dynamicTotalMonthly * 12;

  return (
    <div className="bg-[#0B0D12] text-[#F5F1E8] rounded-[20px] shadow-lg p-6 sm:p-9 relative overflow-hidden border border-[#232836]">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232836]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151923] border border-[#2a3040] text-[#FF5A1F] text-xs font-bold uppercase tracking-[0.14em] mb-2 font-['Space_Grotesk']">
              <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
              <span>Revenue Leakage Analysis</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F1E8] font-['Space_Grotesk']">
              Customers You Are Losing Every Month
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8F98]">
              Estimated business lost directly to nearby competitors due to response & conversion friction
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A8F98] block font-['Space_Grotesk']">
              Estimated Monthly Loss
            </span>
            <div className="text-3xl sm:text-5xl font-black text-[#FF5A1F] font-['Space_Grotesk'] tracking-tight">
              {formatINR(dynamicTotalMonthly)}
              <span className="text-xs sm:text-sm font-semibold text-[#8A8F98] block sm:inline sm:ml-1">
                / month
              </span>
            </div>
            <span className="text-xs text-[#8A8F98] font-medium">
              (~{formatInLakhs(dynamicTotalAnnual)} / year in lost revenue)
            </span>
          </div>
        </div>

        {/* 3 Pillar Cards in Ink-2 with clean borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {/* Pillar 1 */}
          <div className="p-5 rounded-[16px] bg-[#151923] border border-[#232836] hover:border-[#FF5A1F]/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A5B] font-['Space_Grotesk']">
                1. Unanswered Reviews
              </span>
              <span className="text-xs font-bold text-[#FF5A1F] font-['Space_Grotesk']">
                {formatINR(dynamicReviewsLoss)}/mo
              </span>
            </div>
            <p className="text-xs text-[#b9bdc6] leading-relaxed">
              New prospects who read unaddressed 1-star complaints or silent reviews and choose a competitor with 4.5+ active responses.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-[16px] bg-[#151923] border border-[#232836] hover:border-[#FF5A1F]/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A5B] font-['Space_Grotesk']">
                2. Absent WhatsApp Bot
              </span>
              <span className="text-xs font-bold text-[#FF5A1F] font-['Space_Grotesk']">
                {formatINR(dynamicWhatsAppLoss)}/mo
              </span>
            </div>
            <p className="text-xs text-[#b9bdc6] leading-relaxed">
              Mobile inquiries that bounce when forced to call during busy shifts or fill lengthy static forms with no instant 24/7 quote.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-[16px] bg-[#151923] border border-[#232836] hover:border-[#FF5A1F]/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A5B] font-['Space_Grotesk']">
                3. Zero Retention System
              </span>
              <span className="text-xs font-bold text-[#FF5A1F] font-['Space_Grotesk']">
                {formatINR(dynamicRepeatLoss)}/mo
              </span>
            </div>
            <p className="text-xs text-[#b9bdc6] leading-relaxed">
              Dormant existing clients who never receive a personalized re-booking WhatsApp reminder or festive VIP invitation.
            </p>
          </div>
        </div>

        {/* Interactive Average Order Value Slider */}
        <div className="p-5 rounded-[16px] bg-[#151923] border border-[#232836] my-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5F1E8] font-['Space_Grotesk']">
              <Sliders className="w-4 h-4 text-[#FF5A1F]" />
              <span>Interactive Calculator: Adjust Your Average Customer Order / Ticket (₹)</span>
            </div>
            <div className="text-sm font-bold font-['Space_Grotesk'] text-[#0B0D12] bg-[#FF5A1F] px-3.5 py-1 rounded-full">
              Avg Ticket: {formatINR(avgTicket)}
            </div>
          </div>

          <input
            type="range"
            min="200"
            max="15000"
            step="100"
            value={avgTicket}
            onChange={(e) => setAvgTicket(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#232836] rounded-lg appearance-none cursor-pointer accent-[#FF5A1F]"
          />

          <div className="flex justify-between text-[11px] text-[#8A8F98] mt-1.5 font-['Space_Grotesk']">
            <span>₹200 (Cafe / Snack)</span>
            <span>₹2,500 (Salon / Dental)</span>
            <span>₹7,500 (Clinic / Specialist)</span>
            <span>₹15,000+ (Specialist / B2B)</span>
          </div>
        </div>

        {/* Detailed Explanation */}
        <p className="text-xs sm:text-sm text-[#b9bdc6] mt-4 leading-relaxed font-normal bg-[#151923]/60 p-4 rounded-xl border border-[#232836]">
          {revenueLoss.explanation}
        </p>

        {/* Action Link to plug the leak */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#232836]">
          <span className="text-xs sm:text-sm text-[#8A8F98]">
            Aimerger builds autonomous AI agents to recover 70%+ of this lost revenue within 30 days.
          </span>
          <a
            href="https://wa.me/918796925824?text=Hi%20Aimerger%2C%20I%20want%20to%20plug%20my%20revenue%20leakage%20found%20in%20the%20X-Ray%20audit."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#FF5A1F] hover:bg-[#FF8A5B] text-[#0B0D12] transition-all hover:scale-[1.02] shrink-0 font-['Space_Grotesk']"
          >
            <span>Stop This Leak on WhatsApp →</span>
          </a>
        </div>
      </div>
    </div>
  );
};
