export type Language = 'en' | 'hi' | 'hinglish';

export interface GroundingSource {
  title: string;
  uri: string;
  type: 'maps' | 'web' | 'review' | 'search';
  snippet?: string;
}

export interface ReviewComplaint {
  theme: string;
  frequency: 'High' | 'Medium' | 'Low';
  exampleSnippet: string;
  businessRisk: string;
}

export interface GoogleBusinessProfileAudit {
  name: string;
  city: string;
  fullAddress?: string;
  category: string;
  rating: number;
  reviewCount: number;
  mapsUrl?: string;
  sentiment: {
    positive: number; // percentage, e.g. 72
    neutral: number;  // percentage, e.g. 18
    negative: number; // percentage, e.g. 10
  };
  topComplaints: ReviewComplaint[];
  unansweredReviewsCount: number;
  responseRatePercentage: number;
  listingFreshness: 'Active' | 'Needs Update' | 'Inactive';
  claimedStatus: 'Verified' | 'Unclaimed' | 'Likely Claimed';
}

export interface WebsiteAudit {
  url?: string;
  hasWebsite: boolean;
  speedRating: 'Fast' | 'Average' | 'Slow';
  mobileFriendly: boolean;
  mobileScore: number; // 0 - 100
  hasWhatsAppButton: boolean;
  hasOnlineBooking: boolean;
  seoScore: number; // 0 - 100
  issues: string[];
  conversionKillers: string[];
}

export interface CompetitorComparison {
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  keyAdvantage: string;
  threatLevel: 'High' | 'Moderate' | 'Low';
}

export interface RevenueLossBreakdown {
  unansweredReviewsLoss: number; // in INR e.g. 45000
  slowOrNoWhatsAppResponseLoss: number; // in INR e.g. 65000
  lackOfRepeatBookingAutomationLoss: number; // in INR e.g. 35000
  totalMonthlyLoss: number; // in INR
  totalAnnualLoss: number; // in INR
  avgCustomerValueUsed: number; // in INR e.g. 1200
  explanation: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  category: 'WhatsApp Automation' | 'Reputation & Reviews' | 'Lead Conversion' | 'Local SEO & Maps' | 'Customer Retention';
  description: string;
  expectedRevenueImpact: string; // e.g. "+₹65,000 / month"
  timeSavedPerWeek: string; // e.g. "12 hours/week"
  implementationEffort: 'Quick (1-2 days)' | 'Moderate (3-5 days)' | 'Comprehensive (1 week)';
  aimergerAdvantage: string;
}

export interface ReviewReplyDraft {
  ratingScenario: '5-Star Positive' | '3-Star Mixed' | '1-Star Complaint';
  originalCustomerContext: string;
  replyText: string;
  strategyRationale: string;
}

export interface BusinessXRayReport {
  id: string;
  generatedAt: string;
  language: Language;
  businessName: string;
  city: string;
  category: string;
  websiteUrl?: string;
  instagramHandle?: string;

  // Digital Health Score (0 - 100)
  overallScore: number;
  scoreGrade: 'A+' | 'A' | 'B' | 'C' | 'D';
  scoreVerdict: string;
  scoreBreakdown: {
    googleMapsPresence: number; // 0 - 100
    reputationAndReviews: number; // 0 - 100
    websiteAndMobileConversion: number; // 0 - 100
    aiReadiness: number; // 0 - 100
  };

  gbpAudit: GoogleBusinessProfileAudit;
  websiteAudit: WebsiteAudit;
  competitors: CompetitorComparison[];
  revenueLoss: RevenueLossBreakdown;
  recommendations: AIRecommendation[];
  reviewReplies: ReviewReplyDraft[];
  citations: GroundingSource[];
  quickWinsSummary: string[];
}

export interface AuditRequestPayload {
  businessName: string;
  city: string;
  websiteUrl?: string;
  instagramHandle?: string;
  category?: string;
  language?: Language;
}

export interface AuditProgressUpdate {
  stage: 'maps' | 'reviews' | 'website' | 'competitors' | 'revenue' | 'synthesis' | 'done';
  title: string;
  detail: string;
  progressPercent: number;
}

export interface ComparisonRequestPayload {
  businessA: {
    name: string;
    city: string;
    websiteUrl?: string;
  };
  businessB: {
    name: string;
    city: string;
    websiteUrl?: string;
  };
  category: string;
  language?: Language;
}

export interface ComparisonMetricRow {
  metric: string;
  valA: string | number;
  valB: string | number;
  winner: 'A' | 'B' | 'Tied';
  insight: string;
}

export interface ComparisonBattlePlaybookItem {
  id: string;
  title: string;
  tactic: string;
  expectedEdge: string;
}

export interface ComparisonReport {
  id: string;
  generatedAt: string;
  language: Language;
  category: string;
  reportA: BusinessXRayReport;
  reportB: BusinessXRayReport;
  overallWinner: 'A' | 'B' | 'Tied';
  leaderVerdict: string;
  scoreGap: number;
  monthlyRevenueGap: number;
  metricsTable: ComparisonMetricRow[];
  playbookToWin: ComparisonBattlePlaybookItem[];
  keyTakeaway: string;
}
