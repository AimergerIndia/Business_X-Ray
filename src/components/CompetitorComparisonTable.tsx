import React from 'react';
import { Star, Flame } from 'lucide-react';
import { CompetitorComparison } from '../types/audit';
import { formatIndianNumber } from '../utils/formatters';
import { AimergerSpark } from './AimergerBrand';

interface CompetitorComparisonTableProps {
  businessName: string;
  yourRating: number;
  yourReviewCount: number;
  city: string;
  competitors: CompetitorComparison[];
}

export const CompetitorComparisonTable: React.FC<CompetitorComparisonTableProps> = ({
  businessName,
  yourRating,
  yourReviewCount,
  city,
  competitors,
}) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DED1]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF5A1F] font-['Space_Grotesk']">
              Local Competitive Landscape
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
            Top 3 Nearby Competitors in {city}
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98]">
            Benchmarking against local rivals fighting for the same customer searches
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F1E8] border border-[#E4DED1] text-[#0B0D12] text-xs font-semibold w-fit font-['Space_Grotesk']">
          <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
          <span>Local Competition: Active</span>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="mt-6 overflow-x-auto rounded-[16px] border border-[#E4DED1]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0B0D12] text-[#F5F1E8] text-xs font-medium font-['Space_Grotesk']">
              <th className="py-3.5 px-4 font-medium">Business Name</th>
              <th className="py-3.5 px-3 font-medium">Rating</th>
              <th className="py-3.5 px-3 font-medium">Reviews</th>
              <th className="py-3.5 px-3 font-medium">Distance</th>
              <th className="py-3.5 px-4 font-medium">Key Advantage Over You</th>
              <th className="py-3.5 px-3 text-right font-medium">Threat Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4DED1] text-xs sm:text-sm">
            {/* Your Business (Row 0) */}
            <tr className="bg-[#F5F1E8] font-medium">
              <td className="py-4 px-4 font-bold text-[#0B0D12] flex items-center gap-2">
                <AimergerSpark className="w-3 h-3" color="#FF5A1F" />
                <span className="truncate max-w-[180px] font-['Space_Grotesk']">{businessName}</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#0B0D12] text-[#F5F1E8] font-['Space_Grotesk']">
                  You
                </span>
              </td>
              <td className="py-4 px-3">
                <div className="flex items-center gap-1 font-bold text-[#0B0D12]">
                  <Star className="w-3.5 h-3.5 fill-[#FF5A1F] text-[#FF5A1F]" />
                  <span>{yourRating.toFixed(1)}</span>
                </div>
              </td>
              <td className="py-4 px-3 font-semibold text-[#0B0D12]">
                {formatIndianNumber(yourReviewCount)}
              </td>
              <td className="py-4 px-3 text-[#8A8F98] text-xs">Current</td>
              <td className="py-4 px-4 text-xs text-[#8A8F98] italic">
                Baseline (Subject of this audit)
              </td>
              <td className="py-4 px-3 text-right">
                <span className="text-[11px] font-semibold text-[#8A8F98]">Baseline</span>
              </td>
            </tr>

            {/* Competitors */}
            {competitors.map((comp, idx) => {
              const ratingDiff = comp.rating - yourRating;
              const hasHigherRating = ratingDiff > 0;

              return (
                <tr key={idx} className="hover:bg-[#F5F1E8]/50 transition-colors bg-[#FFFFFF]">
                  <td className="py-4 px-4 font-semibold text-[#0B0D12]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#8A8F98] font-mono text-xs">#{idx + 1}</span>
                      <span className="font-bold text-[#0B0D12] font-['Space_Grotesk']">{comp.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-1 font-bold text-[#0B0D12]">
                      <Star className="w-3.5 h-3.5 fill-[#FF5A1F] text-[#FF5A1F]" />
                      <span>{comp.rating.toFixed(1)}</span>
                      {hasHigherRating && (
                        <span className="text-[10px] font-bold text-[#FF5A1F] bg-[#FCE8E6] px-1.5 py-0.5 rounded-sm ml-0.5">
                          +{ratingDiff.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3 font-semibold text-[#0B0D12]">
                    {formatIndianNumber(comp.reviewCount)}
                  </td>
                  <td className="py-4 px-3 text-[#8A8F98] text-xs">
                    {comp.distance}
                  </td>
                  <td className="py-4 px-4 text-xs text-[#4A4F58]">
                    {comp.keyAdvantage}
                  </td>
                  <td className="py-4 px-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold font-['Space_Grotesk'] ${
                        comp.threatLevel === 'High'
                          ? 'bg-[#FCE8E6] text-[#A50E0E]'
                          : comp.threatLevel === 'Moderate'
                          ? 'bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1]'
                          : 'bg-[#E3F4E8] text-[#11632E]'
                      }`}
                    >
                      {comp.threatLevel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-[#F5F1E8] border border-[#E4DED1] text-xs text-[#0B0D12] flex items-center justify-between">
        <span>
          <strong className="font-bold font-['Space_Grotesk']">Aimerger Strategy:</strong> By deploying automated WhatsApp follow-ups and AI review replies, you can outrank these 3 competitors in under 45 days.
        </span>
      </div>
    </div>
  );
};
