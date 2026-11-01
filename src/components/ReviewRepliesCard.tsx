import React, { useState } from 'react';
import { Copy, Check, Star, ShieldCheck } from 'lucide-react';
import { ReviewReplyDraft } from '../types/audit';
import { AimergerSpark } from './AimergerBrand';

interface ReviewRepliesCardProps {
  replies: ReviewReplyDraft[];
  businessName: string;
}

export const ReviewRepliesCard: React.FC<ReviewRepliesCardProps> = ({ replies, businessName }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const getScenarioBadge = (scenario: ReviewReplyDraft['ratingScenario']) => {
    switch (scenario) {
      case '5-Star Positive':
        return {
          bg: 'bg-[#E3F4E8] text-[#11632E] border-[#B7E1CD]',
          stars: 5,
        };
      case '3-Star Mixed':
        return {
          bg: 'bg-[#F5F1E8] text-[#0B0D12] border-[#E4DED1]',
          stars: 3,
        };
      case '1-Star Complaint':
        return {
          bg: 'bg-[#FCE8E6] text-[#A50E0E] border-[#F5C2C7]',
          stars: 1,
        };
      default:
        return {
          bg: 'bg-[#F5F1E8] text-[#0B0D12] border-[#E4DED1]',
          stars: 5,
        };
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
              Instant AI Value Deliverable
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
            3 Ready-to-Use Google Review Replies
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98]">
            Copy and paste directly into your Google Business Profile dashboard right now
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-[#0B0D12] bg-[#F5F1E8] px-3.5 py-1.5 rounded-full border border-[#E4DED1] w-fit font-['Space_Grotesk']">
          <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
          <span>Tailored for Indian customer & hospitality etiquette</span>
        </div>
      </div>

      {/* Replies Grid */}
      <div className="mt-6 space-y-4">
        {replies.map((item, idx) => {
          const badge = getScenarioBadge(item.ratingScenario);
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-[16px] border border-[#E4DED1] bg-[#F5F1E8]/30 hover:bg-[#FFFFFF] hover:border-[#FF5A1F] transition-all"
            >
              {/* Scenario Top Bar */}
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border font-['Space_Grotesk'] ${badge.bg}`}
                  >
                    <span>{item.ratingScenario}</span>
                    <span className="flex text-[#FF5A1F] ml-1">
                      {[...Array(badge.stars)].map((_, s) => (
                        <Star key={s} className="w-3 h-3 fill-[#FF5A1F] text-[#FF5A1F]" />
                      ))}
                    </span>
                  </span>
                  <span className="text-xs text-[#8A8F98] hidden sm:inline">
                    Context: {item.originalCustomerContext}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item.replyText, idx)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs font-['Space_Grotesk'] ${
                    isCopied
                      ? 'bg-[#11632E] text-white'
                      : 'bg-[#0B0D12] text-[#F5F1E8] hover:bg-[#FF5A1F] hover:text-[#0B0D12]'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Reply</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reply Box */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E4DED1] font-sans text-xs sm:text-sm text-[#0B0D12] leading-relaxed">
                "{item.replyText}"
              </div>

              {/* Strategy Rationale */}
              <div className="mt-3 text-xs text-[#4A4F58] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                <span>
                  <strong className="font-semibold text-[#0B0D12] font-['Space_Grotesk']">AI Strategy:</strong>{' '}
                  {item.strategyRationale}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
