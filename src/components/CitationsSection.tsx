import React from 'react';
import { ExternalLink, CheckCircle, MapPin, Globe, Search } from 'lucide-react';
import { GroundingSource } from '../types/audit';
import { AimergerSpark } from './AimergerBrand';

interface CitationsSectionProps {
  citations: GroundingSource[];
  businessName: string;
}

export const CitationsSection: React.FC<CitationsSectionProps> = ({ citations, businessName }) => {
  const getIcon = (type: GroundingSource['type']) => {
    switch (type) {
      case 'maps':
        return MapPin;
      case 'web':
        return Globe;
      default:
        return Search;
    }
  };

  return (
    <div className="bg-[#FFFFFF] rounded-[20px] border border-[#E4DED1] p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <AimergerSpark className="w-4 h-4" color="#FF5A1F" />
        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B0D12] font-['Space_Grotesk']">
          Source Citations & Verifiable Grounding
        </h4>
      </div>
      <p className="text-xs text-[#8A8F98] mb-4">
        Every insight, rating, and competitor metric in this Business X-Ray is derived from live Google Maps and Search grounding.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {citations.map((cite, idx) => {
          const Icon = getIcon(cite.type);

          return (
            <a
              key={idx}
              href={cite.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#F5F1E8]/50 rounded-[16px] border border-[#E4DED1] hover:border-[#FF5A1F] hover:bg-[#FFFFFF] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#8A8F98] mb-1.5 font-['Space_Grotesk']">
                  <span className="flex items-center gap-1 uppercase tracking-wider text-[#FF5A1F]">
                    <Icon className="w-3 h-3" /> {cite.type}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#8A8F98] group-hover:text-[#FF5A1F]" />
                </div>
                <div className="text-xs font-bold text-[#0B0D12] line-clamp-1 group-hover:text-[#FF5A1F] font-['Space_Grotesk']">
                  {cite.title}
                </div>
                {cite.snippet && (
                  <p className="text-[11px] text-[#4A4F58] line-clamp-2 mt-1">
                    {cite.snippet}
                  </p>
                )}
              </div>
              <span className="text-[10px] text-[#8A8F98] truncate mt-2 font-mono">
                {cite.uri.replace(/^https?:\/\//, '')}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
