import React, { useEffect, useState } from 'react';
import { MapPin, MessageSquare, Globe, Users, TrendingDown, CheckCircle2, Loader2 } from 'lucide-react';
import { AimergerSpark } from './AimergerBrand';

interface AuditProgressTrackerProps {
  businessName: string;
  city: string;
}

interface StepItem {
  id: string;
  label: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AUDIT_STEPS: StepItem[] = [
  {
    id: 'maps',
    label: 'Finding on Google Maps…',
    subtext: 'Scanning Google Maps listing, verified address, category & geo-coordinates',
    icon: MapPin,
  },
  {
    id: 'reviews',
    label: 'Reading reviews & sentiment…',
    subtext: 'Analyzing star ratings, customer praise, recurring complaints & response rate',
    icon: MessageSquare,
  },
  {
    id: 'website',
    label: 'Checking website & conversion killers…',
    subtext: 'Inspecting mobile speed, WhatsApp chat button, appointment booking flow',
    icon: Globe,
  },
  {
    id: 'competitors',
    label: 'Analysing top local competitors…',
    subtext: 'Benchmarking against the 3 nearest rivals in the same city radius',
    icon: Users,
  },
  {
    id: 'revenue',
    label: 'Calculating revenue leakage in ₹…',
    subtext: 'Simulating lost customers from unanswered reviews & slow response',
    icon: TrendingDown,
  },
  {
    id: 'synthesis',
    label: 'Compiling Aimerger AI Blueprint…',
    subtext: 'Generating 5 custom automations and 3 ready-to-post review replies',
    icon: AimergerSpark,
  },
];

const LOCAL_INSIGHTS = [
  '78% of Indian consumers search on Google Maps before visiting a local outlet.',
  'Unanswered 1-star reviews drag local Google Maps 3-Pack ranking down by up to 2 positions.',
  'Businesses with an instant WhatsApp chat button see 2.8x higher inbound inquiry conversions in India.',
  'Indian customers expect a reply within 10 minutes on WhatsApp before texting a competitor.',
];

export const AuditProgressTracker: React.FC<AuditProgressTrackerProps> = ({
  businessName,
  city,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < AUDIT_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2400);

    const insightTimer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % LOCAL_INSIGHTS.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(insightTimer);
    };
  }, []);

  const progressPercent = Math.min(
    95,
    Math.round(((currentStepIndex + 0.8) / AUDIT_STEPS.length) * 100)
  );

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DED1]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1] mb-2 font-['Space_Grotesk']">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FF5A1F]" />
              <span>Live AI Research in Progress</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
              Auditing <span className="text-[#FF5A1F]">{businessName}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8F98]">
              Location: {city}, India • Google Maps & Search Grounding
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold text-[#0B0D12] font-['Space_Grotesk']">
              {progressPercent}%
            </span>
            <div className="w-36 h-2 bg-[#F5F1E8] border border-[#E4DED1] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#FF5A1F] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step-by-Step Timeline */}
        <div className="mt-6 space-y-3.5">
          {AUDIT_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-3.5 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#F5F1E8] border border-[#E4DED1] shadow-2xs'
                    : isCompleted
                    ? 'bg-[#FFFFFF] opacity-90'
                    : 'opacity-40'
                }`}
              >
                {/* Step Icon */}
                <div className="mt-0.5">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-[#E3F4E8] text-[#11632E] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-8 h-8 rounded-full bg-[#FF5A1F] text-[#0B0D12] flex items-center justify-center shadow-sm animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#F5F1E8] text-[#8A8F98] border border-[#E4DED1] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm sm:text-base font-semibold ${
                        isCurrent
                          ? 'text-[#0B0D12] font-bold font-[\'Space_Grotesk\']'
                          : isCompleted
                          ? 'text-[#0B0D12]'
                          : 'text-[#8A8F98]'
                      }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <span className="text-[11px] font-semibold text-[#0B0D12] bg-[#FF8A5B]/30 border border-[#FF5A1F]/40 px-2 py-0.5 rounded-full font-['Space_Grotesk'] animate-pulse">
                        Scanning…
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[11px] font-semibold text-[#11632E] bg-[#E3F4E8] px-2 py-0.5 rounded-full font-['Space_Grotesk']">
                        Verified ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8A8F98] mt-0.5">{step.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fact Ticker */}
        <div className="mt-6 p-4 rounded-xl bg-[#F5F1E8] border border-[#E4DED1] flex items-center gap-3 text-xs sm:text-sm text-[#0B0D12]">
          <AimergerSpark className="w-4 h-4 shrink-0" color="#FF5A1F" />
          <div className="flex-1">
            <span className="font-bold font-['Space_Grotesk']">Indian SMB Fact: </span>
            <span className="text-[#4A4F58]">{LOCAL_INSIGHTS[insightIndex]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
