import React from 'react';
import { Bot, MessageSquare, PhoneCall, MapPin, Repeat, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { AIRecommendation } from '../types/audit';
import { AimergerSpark } from './AimergerBrand';

interface AIRecommendationsCardProps {
  recommendations: AIRecommendation[];
  businessName: string;
}

export const AIRecommendationsCard: React.FC<AIRecommendationsCardProps> = ({
  recommendations,
  businessName,
}) => {
  const getCategoryIcon = (category: AIRecommendation['category']) => {
    switch (category) {
      case 'WhatsApp Automation':
        return MessageSquare;
      case 'Reputation & Reviews':
        return Bot;
      case 'Lead Conversion':
        return PhoneCall;
      case 'Local SEO & Maps':
        return MapPin;
      case 'Customer Retention':
        return Repeat;
      default:
        return AimergerSpark;
    }
  };

  return (
    <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DED1]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF5A1F] font-['Space_Grotesk']">
              Aimerger Implementation Roadmap
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
            5 High-Impact AI Automation Recommendations
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98]">
            Engineered specifically to solve {businessName}'s digital bottlenecks and recover lost revenue
          </p>
        </div>

        <div className="px-4 py-1.5 rounded-full bg-[#F5F1E8] text-[#0B0D12] text-xs font-bold border border-[#E4DED1] w-fit font-['Space_Grotesk']">
          Estimated Total Uplift: +₹2,20,000+/mo
        </div>
      </div>

      {/* 5 Recommendation Cards */}
      <div className="mt-6 space-y-4">
        {recommendations.map((rec, idx) => {
          const Icon = getCategoryIcon(rec.category);

          return (
            <div
              key={rec.id || idx}
              className="p-5 sm:p-6 rounded-[16px] border border-[#E4DED1] bg-[#F5F1E8]/40 hover:bg-[#FFFFFF] hover:border-[#FF5A1F] transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Title & Category */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0B0D12] text-[#F5F1E8] flex items-center justify-center shrink-0 group-hover:bg-[#FF5A1F] group-hover:text-[#0B0D12] transition-colors shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E4DED1] text-[#0B0D12] font-['Space_Grotesk']">
                        {rec.category}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8A8F98] font-['Space_Grotesk']">
                        Priority #{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0B0D12] mt-1 font-['Space_Grotesk']">
                      {rec.title}
                    </h4>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <div className="px-3 py-1 rounded-full bg-[#E3F4E8] text-[#11632E] text-xs font-bold flex items-center gap-1 shrink-0 font-['Space_Grotesk']">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{rec.expectedRevenueImpact}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#F5F1E8] border border-[#E4DED1] text-[#0B0D12] text-xs font-semibold flex items-center gap-1 shrink-0 font-['Space_Grotesk']">
                    <Clock className="w-3.5 h-3.5 text-[#8A8F98]" />
                    <span>{rec.timeSavedPerWeek}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-[#4A4F58] leading-relaxed">
                {rec.description}
              </p>

              {/* How Aimerger Sets this up */}
              <div className="mt-3.5 pt-3.5 border-t border-[#E4DED1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#0B0D12] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                  <span>
                    <strong className="font-bold text-[#0B0D12] font-['Space_Grotesk']">Aimerger Deployment:</strong>{' '}
                    {rec.aimergerAdvantage}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#8A8F98] bg-[#FFFFFF] px-2.5 py-0.5 rounded-full border border-[#E4DED1] shrink-0 font-['Space_Grotesk']">
                  Effort: {rec.implementationEffort}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
