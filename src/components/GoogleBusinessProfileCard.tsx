import React from 'react';
import { Star, MessageSquareWarning, ExternalLink, ThumbsUp, ThumbsDown, HelpCircle, AlertCircle } from 'lucide-react';
import { GoogleBusinessProfileAudit } from '../types/audit';
import { formatIndianNumber } from '../utils/formatters';
import { AimergerSpark } from './AimergerBrand';

interface GoogleBusinessProfileCardProps {
  audit: GoogleBusinessProfileAudit;
}

export const GoogleBusinessProfileCard: React.FC<GoogleBusinessProfileCardProps> = ({ audit }) => {
  const {
    name,
    city,
    rating,
    reviewCount,
    mapsUrl,
    sentiment,
    topComplaints,
    unansweredReviewsCount,
    responseRatePercentage,
  } = audit;

  return (
    <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DED1]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF5A1F] font-['Space_Grotesk']">
              Google Maps & Search Intelligence
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
            Google Business Profile (GBP) Audit
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98]">
            Live local search visibility for <strong className="text-[#0B0D12]">{name}</strong> in {city}
          </p>
        </div>

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#0B0D12] bg-[#F5F1E8] hover:bg-[#E4DED1] border border-[#E4DED1] transition-colors w-fit font-['Space_Grotesk']"
          >
            <span>View on Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
        {/* Star Rating */}
        <div className="p-4 rounded-[16px] bg-[#F5F1E8] border border-[#E4DED1]">
          <span className="text-xs font-semibold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">Average Rating</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#0B0D12] font-['Space_Grotesk']">{rating.toFixed(1)}</span>
            <div className="flex items-center text-[#FF5A1F]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(rating)
                      ? 'fill-[#FF5A1F] text-[#FF5A1F]'
                      : 'text-[#E4DED1]'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">Out of 5.0 on Google</span>
        </div>

        {/* Total Reviews */}
        <div className="p-4 rounded-[16px] bg-[#F5F1E8] border border-[#E4DED1]">
          <span className="text-xs font-semibold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">Total Reviews</span>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0D12] font-['Space_Grotesk'] mt-1">
            {formatIndianNumber(reviewCount)}
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">Verified feedback count</span>
        </div>

        {/* Unanswered Reviews */}
        <div className="p-4 rounded-[16px] bg-[#FCE8E6] border border-[#F5C2C7]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A50E0E] uppercase tracking-wider font-['Space_Grotesk']">Unanswered</span>
            <AlertCircle className="w-3.5 h-3.5 text-[#A50E0E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#A50E0E] font-['Space_Grotesk'] mt-1">
            {unansweredReviewsCount}
          </div>
          <span className="text-[11px] text-[#A50E0E] mt-1 block">Risk to 3-Pack rank</span>
        </div>

        {/* Response Rate */}
        <div className="p-4 rounded-[16px] bg-[#F5F1E8] border border-[#E4DED1]">
          <span className="text-xs font-semibold text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">Response Rate</span>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0D12] font-['Space_Grotesk'] mt-1">
            {responseRatePercentage}%
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">Studio benchmark: 95%+</span>
        </div>
      </div>

      {/* Review Sentiment Analysis */}
      <div className="my-6 p-5 rounded-[16px] bg-[#F5F1E8] border border-[#E4DED1]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0D12] mb-3 flex items-center justify-between font-['Space_Grotesk']">
          <span>AI Sentiment Distribution</span>
          <span className="text-[#8A8F98] font-normal">Based on recent customer comments</span>
        </h4>

        {/* Multi-segment sentiment bar */}
        <div className="w-full h-3.5 bg-[#FFFFFF] border border-[#E4DED1] rounded-full overflow-hidden flex shadow-2xs">
          <div
            className="h-full bg-[#11632E] transition-all duration-700"
            style={{ width: `${sentiment.positive}%` }}
            title={`Positive: ${sentiment.positive}%`}
          />
          <div
            className="h-full bg-[#8A8F98] transition-all duration-700"
            style={{ width: `${sentiment.neutral}%` }}
            title={`Neutral: ${sentiment.neutral}%`}
          />
          <div
            className="h-full bg-[#FF5A1F] transition-all duration-700"
            style={{ width: `${sentiment.negative}%` }}
            title={`Negative: ${sentiment.negative}%`}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-semibold mt-3 flex-wrap gap-2 font-['Space_Grotesk']">
          <div className="flex items-center gap-1.5 text-[#11632E]">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Positive: {sentiment.positive}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#4A4F58]">
            <HelpCircle className="w-3.5 h-3.5 text-[#8A8F98]" />
            <span>Neutral: {sentiment.neutral}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FF5A1F]">
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>Critical / Friction: {sentiment.negative}%</span>
          </div>
        </div>
      </div>

      {/* Top Complaints Identified */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquareWarning className="w-4 h-4 text-[#FF5A1F]" />
          <h4 className="text-sm sm:text-base font-bold text-[#0B0D12] font-['Space_Grotesk']">
            Top Friction Points & Complaints Detected
          </h4>
        </div>

        <div className="space-y-3">
          {topComplaints.map((c, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E4DED1] shadow-2xs hover:border-[#FF5A1F] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B0D12] text-[#F5F1E8] text-xs font-bold flex items-center justify-center font-['Space_Grotesk']">
                      {idx + 1}
                    </span>
                    <h5 className="text-sm font-bold text-[#0B0D12] font-['Space_Grotesk']">{c.theme}</h5>
                  </div>
                  <p className="mt-2 text-xs text-[#4A4F58] italic bg-[#F5F1E8] p-3 rounded-xl border border-[#E4DED1]">
                    "{c.exampleSnippet}"
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#0B0D12]">
                    <strong className="text-[#FF5A1F]">Business Impact:</strong> {c.businessRisk}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold font-['Space_Grotesk'] ${
                    c.frequency === 'High'
                      ? 'bg-[#FCE8E6] text-[#A50E0E] border border-[#F5C2C7]'
                      : 'bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1]'
                  }`}
                >
                  {c.frequency} Frequency
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
