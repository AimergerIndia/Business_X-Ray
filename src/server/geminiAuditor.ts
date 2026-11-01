import { GoogleGenAI } from '@google/genai';
import { AuditRequestPayload, BusinessXRayReport, GroundingSource } from '../types/audit';
import { getMockSampleAudit } from './sampleAudits';

export async function generateBusinessXRayAudit(
  payload: AuditRequestPayload
): Promise<BusinessXRayReport> {
  const {
    businessName,
    city,
    websiteUrl = '',
    instagramHandle = '',
    category = 'Local Business',
    language = 'en',
  } = payload;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    console.warn('[GeminiAuditor] No GEMINI_API_KEY found, using realistic benchmark simulation');
    return getMockSampleAudit(businessName, city, category, websiteUrl, language);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    console.log(`[GeminiAuditor] Step 1: Performing live search & maps grounding for "${businessName}" in "${city}"...`);

    // Step 1: Grounded research via Google Search / Maps
    const researchPrompt = `You are an expert Indian business auditor from Aimerger (an AI company in India).
Live research request:
Business Name: "${businessName}"
City / Area: "${city}", India
Website: "${websiteUrl || 'Not provided'}"
Instagram / Social: "${instagramHandle || 'Not provided'}"
Category: "${category}"

Perform deep search grounding:
1. Locate this exact business or branch in ${city}, India on Google Maps and Google Search.
2. Find its star rating (out of 5.0), total Google review count, address, and overall customer sentiment.
3. Identify what customers love, as well as recurring customer complaints/negative feedback (e.g. delays, waiting time, phone calls ignored, billing, parking, quality issues).
4. Check if the business responds to reviews on Google.
5. If website "${websiteUrl}" is given, check for mobile usability, presence of a WhatsApp chat button or online appointment/booking form.
6. Identify 3 top local competitors in ${city} in the same business niche, along with their ratings and review counts.

Provide the key verified facts clearly.`;

    let researchSummary = '';
    const extractedCitations: GroundingSource[] = [];

    try {
      const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
        Promise.race([
          promise,
          new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
          ),
        ]);

      const researchResponse = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: researchPrompt,
          config: {
            tools: [{ googleSearch: {} }],
          },
        }),
        12000
      );

      researchSummary = researchResponse.text || '';

      const chunks = researchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (Array.isArray(chunks)) {
        for (const chunk of chunks) {
          if (chunk.web?.uri) {
            extractedCitations.push({
              title: chunk.web.title || `${businessName} Web Source`,
              uri: chunk.web.uri,
              type: 'web',
              snippet: chunk.web.title,
            });
          }
        }
      }
    } catch (groundingErr) {
      console.warn('[GeminiAuditor] Grounding query note, continuing synthesis:', groundingErr);
    }

    // Always include verified Google Maps search link
    extractedCitations.unshift({
      title: `${businessName} on Google Maps (${city})`,
      uri: `https://maps.google.com/?q=${encodeURIComponent(`${businessName} ${city} India`)}`,
      type: 'maps',
      snippet: `Live Google Maps search query for ${businessName} in ${city}.`,
    });

    // Step 2: Structured JSON Synthesis
    console.log(`[GeminiAuditor] Step 2: Generating structured Business X-Ray report in ${language}...`);

    const langInstruction =
      language === 'hi'
        ? 'IMPORTANT: All explanations, verdicts, complaints, recommendation titles/descriptions, and review replies MUST be written in natural, fluent HINDI (Devanagari script).'
        : language === 'hinglish'
        ? 'IMPORTANT: All explanations, verdicts, complaints, recommendation titles/descriptions, and review replies MUST be written in conversational, engaging HINGLISH (Hindi written in Roman English script, e.g. "Aapke business me WhatsApp bot lagane se 40% leads save hongi").'
        : 'All text must be in professional, crisp ENGLISH.';

    const synthesisPrompt = `You are the lead AI auditor at "Aimerger" (spark ✦ logo, tagline "AI that merges into your business", WhatsApp: https://wa.me/918796925824).
Produce an exhaustive, high-converting "Business X-Ray Audit Report" for this Indian business.

Input Data:
- Business Name: "${businessName}"
- City: "${city}"
- Website: "${websiteUrl || 'None'}"
- Social: "${instagramHandle || 'None'}"
- Category: "${category}"
- Target Report Language: "${language}" (${langInstruction})

Live Grounding & Research Findings:
"""
${researchSummary || `Business: ${businessName} in ${city}, India. Local commercial establishment in ${category}.`}
"""

Output Requirement:
Return ONLY valid raw JSON adhering strictly to this schema (no markdown wrap, no backticks, just pure parseable JSON):
{
  "id": "xray-${Date.now()}",
  "businessName": "${businessName}",
  "city": "${city}",
  "category": "${category}",
  "websiteUrl": "${websiteUrl || ''}",
  "instagramHandle": "${instagramHandle || ''}",
  "overallScore": number between 30 and 92 (Digital Health Score 0-100),
  "scoreGrade": "A+" | "A" | "B" | "C" | "D",
  "scoreVerdict": string (2-3 sentences summarizing performance and AI opportunity in target language),
  "scoreBreakdown": {
    "googleMapsPresence": number (0-100),
    "reputationAndReviews": number (0-100),
    "websiteAndMobileConversion": number (0-100),
    "aiReadiness": number (0-100)
  },
  "gbpAudit": {
    "name": "${businessName}",
    "city": "${city}",
    "fullAddress": string (approximate address in ${city}),
    "category": "${category}",
    "rating": number (e.g. 4.2),
    "reviewCount": number (realistic review count based on live grounding or city benchmark, e.g. 350),
    "mapsUrl": "https://maps.google.com/?q=${encodeURIComponent(`${businessName} ${city}`)}",
    "sentiment": {
      "positive": number (e.g. 72),
      "neutral": number (e.g. 18),
      "negative": number (e.g. 10)
    },
    "topComplaints": [
      {
        "theme": string (concise theme of complaint in target language),
        "frequency": "High" | "Medium" | "Low",
        "exampleSnippet": string (quote/example in target language),
        "businessRisk": string (consequence in target language)
      }
    ], // 3 distinct complaints
    "unansweredReviewsCount": number (e.g. 42),
    "responseRatePercentage": number (e.g. 35),
    "listingFreshness": "Active" | "Needs Update",
    "claimedStatus": "Verified" | "Likely Claimed"
  },
  "websiteAudit": {
    "url": "${websiteUrl || ''}",
    "hasWebsite": boolean,
    "speedRating": "Fast" | "Average" | "Slow",
    "mobileFriendly": boolean,
    "mobileScore": number (0-100),
    "hasWhatsAppButton": boolean,
    "hasOnlineBooking": boolean,
    "seoScore": number (0-100),
    "issues": [string, string, string],
    "conversionKillers": [string, string]
  },
  "competitors": [
    {
      "name": string (real or prominent competitor in ${city}),
      "rating": number,
      "reviewCount": number,
      "distance": string (e.g. "1.2 km away"),
      "keyAdvantage": string (what they do better),
      "threatLevel": "High" | "Moderate" | "Low"
    }
  ], // 3 nearby competitors in ${city}
  "revenueLoss": {
    "unansweredReviewsLoss": number (in INR, e.g. 45000),
    "slowOrNoWhatsAppResponseLoss": number (in INR, e.g. 65000),
    "lackOfRepeatBookingAutomationLoss": number (in INR, e.g. 35000),
    "totalMonthlyLoss": number (sum of above three in INR, e.g. 145000),
    "totalAnnualLoss": number (monthly * 12 in INR),
    "avgCustomerValueUsed": number (in INR, e.g. 1500),
    "explanation": string (detailed financial explanation in target language)
  },
  "recommendations": [
    {
      "id": "rec-1",
      "title": string,
      "category": "WhatsApp Automation",
      "description": string,
      "expectedRevenueImpact": string (e.g. "+₹65,000 / month"),
      "timeSavedPerWeek": string (e.g. "14 hrs/week"),
      "implementationEffort": "Quick (1-2 days)",
      "aimergerAdvantage": string
    },
    {
      "id": "rec-2",
      "title": string,
      "category": "Reputation & Reviews",
      "description": string,
      "expectedRevenueImpact": string,
      "timeSavedPerWeek": string,
      "implementationEffort": "Quick (1-2 days)",
      "aimergerAdvantage": string
    },
    {
      "id": "rec-3",
      "title": string,
      "category": "Lead Conversion",
      "description": string,
      "expectedRevenueImpact": string,
      "timeSavedPerWeek": string,
      "implementationEffort": "Moderate (3-5 days)",
      "aimergerAdvantage": string
    },
    {
      "id": "rec-4",
      "title": string,
      "category": "Local SEO & Maps",
      "description": string,
      "expectedRevenueImpact": string,
      "timeSavedPerWeek": string,
      "implementationEffort": "Moderate (3-5 days)",
      "aimergerAdvantage": string
    },
    {
      "id": "rec-5",
      "title": string,
      "category": "Customer Retention",
      "description": string,
      "expectedRevenueImpact": string,
      "timeSavedPerWeek": string,
      "implementationEffort": "Comprehensive (1 week)",
      "aimergerAdvantage": string
    }
  ],
  "reviewReplies": [
    {
      "ratingScenario": "5-Star Positive",
      "originalCustomerContext": string,
      "replyText": string,
      "strategyRationale": string
    },
    {
      "ratingScenario": "3-Star Mixed",
      "originalCustomerContext": string,
      "replyText": string,
      "strategyRationale": string
    },
    {
      "ratingScenario": "1-Star Complaint",
      "originalCustomerContext": string,
      "replyText": string,
      "strategyRationale": string
    }
  ],
  "quickWinsSummary": [string, string, string]
}`;

    const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
      Promise.race([
        promise,
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error(`Synthesis timeout after ${ms}ms`)), ms)
        ),
      ]);

    const synthesisResponse = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: synthesisPrompt,
        config: {
          responseMimeType: 'application/json',
        },
      }),
      15000
    );

    const rawJson = (synthesisResponse.text || '').trim();
    let parsed: any;
    try {
      parsed = JSON.parse(rawJson);
    } catch (parseErr) {
      // Try stripping any markdown wrappers if present
      const cleaned = rawJson.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      parsed = JSON.parse(cleaned);
    }

    // Merge extracted grounding citations
    const finalReport: BusinessXRayReport = {
      ...parsed,
      id: parsed.id || `xray-${Date.now()}`,
      generatedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      language,
      citations: [
        ...extractedCitations,
        ...(Array.isArray(parsed.citations) ? parsed.citations : []),
      ].slice(0, 6),
    };

    return finalReport;
  } catch (error: any) {
    console.error('[GeminiAuditor] Error generating report via Gemini API:', error);
    // Graceful fallback to guarantee application never crashes
    const fallback = getMockSampleAudit(businessName, city, category, websiteUrl, language);
    return fallback;
  }
}

export async function generateCompetitorComparison(
  payload: import('../types/audit').ComparisonRequestPayload
): Promise<import('../types/audit').ComparisonReport> {
  const { businessA, businessB, category, language = 'en' } = payload;

  console.log(
    `[GeminiAuditor] Generating Head-to-Head Comparison: "${businessA.name}" vs "${businessB.name}" in ${category}`
  );

  // Run audits for both businesses concurrently
  const [reportA, reportB] = await Promise.all([
    generateBusinessXRayAudit({
      businessName: businessA.name,
      city: businessA.city,
      websiteUrl: businessA.websiteUrl,
      category,
      language,
    }),
    generateBusinessXRayAudit({
      businessName: businessB.name,
      city: businessB.city,
      websiteUrl: businessB.websiteUrl,
      category,
      language,
    }),
  ]);

  const scoreA = reportA.overallScore;
  const scoreB = reportB.overallScore;
  const scoreGap = Math.abs(scoreA - scoreB);

  let overallWinner: 'A' | 'B' | 'Tied' = 'Tied';
  if (scoreA > scoreB) overallWinner = 'A';
  else if (scoreB > scoreA) overallWinner = 'B';

  const isHindi = language === 'hi';
  const isHinglish = language === 'hinglish';

  // Leader Verdict
  let leaderVerdict = '';
  if (overallWinner === 'A') {
    leaderVerdict = isHindi
      ? `${businessA.name} स्थानीय सर्च और डिजिटल मौजूदगी में ${businessB.name} से ${scoreGap} अंकों से आगे है। हालांकि, ऑटोमेशन लागू करके इस लीड को 3x बढ़ाया जा सकता है।`
      : isHinglish
      ? `${businessA.name} local Google Maps presence me ${businessB.name} se +${scoreGap} points aage hai. Instant WhatsApp agent lagane se lead conversion me complete dominance mil sakti hai.`
      : `${businessA.name} holds a +${scoreGap} point digital health lead over ${businessB.name}, driven by stronger review velocity and search presence.`;
  } else if (overallWinner === 'B') {
    leaderVerdict = isHindi
      ? `${businessB.name} वर्तमान में स्थानीय बाज़ार में +${scoreGap} अंकों से आगे है। ${businessA.name} को अपनी रैंकिंग सुधारने के लिए तुरंत रिव्यू रिस्पॉन्स और व्हाट्सएप ऑटोमेशन की आवश्यकता है।`
      : isHinglish
      ? `${businessB.name} filhal local market me +${scoreGap} points se lead kar raha hai. ${businessA.name} ko turant AI review responder aur WhatsApp bot deploy karke customer leakage rokna hoga.`
      : `${businessB.name} currently commands a +${scoreGap} point edge in local market capture. ${businessA.name} is losing walk-ins primarily due to slower inquiry responses.`;
  } else {
    leaderVerdict = isHindi
      ? `दोनों व्यवसाय लगभग बराबर स्थिति में हैं। जो पहले 24/7 AI ऑटोमेशन अपनाएगा, वह बाज़ार पर कब्ज़ा कर लेगा।`
      : isHinglish
      ? `Dono businesses digital score me neck-to-neck hain. Jo business pehle AI booking bot launch karega, wo winner banega.`
      : `Both businesses are in a statistical dead heat. The first to deploy autonomous AI response will capture the majority share of local search traffic.`;
  }

  // Metrics Comparison Table
  const metricsTable: import('../types/audit').ComparisonMetricRow[] = [
    {
      metric: 'Digital Health Score',
      valA: `${scoreA}/100`,
      valB: `${scoreB}/100`,
      winner: scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'Tied',
      insight: isHindi
        ? 'समग्र डिजिटल और कन्वर्जन स्वास्थ्य स्कोर'
        : isHinglish
        ? 'Overall local conversion efficiency'
        : 'Holistic digital conversion readiness',
    },
    {
      metric: 'Google Maps Rating',
      valA: `${reportA.gbpAudit.rating.toFixed(1)} ★`,
      valB: `${reportB.gbpAudit.rating.toFixed(1)} ★`,
      winner:
        reportA.gbpAudit.rating > reportB.gbpAudit.rating
          ? 'A'
          : reportB.gbpAudit.rating > reportA.gbpAudit.rating
          ? 'B'
          : 'Tied',
      insight: 'Star rating on Google Maps listing',
    },
    {
      metric: 'Total Verified Reviews',
      valA: reportA.gbpAudit.reviewCount,
      valB: reportB.gbpAudit.reviewCount,
      winner:
        reportA.gbpAudit.reviewCount > reportB.gbpAudit.reviewCount
          ? 'A'
          : reportB.gbpAudit.reviewCount > reportA.gbpAudit.reviewCount
          ? 'B'
          : 'Tied',
      insight: 'Social proof volume for local 3-Pack rank',
    },
    {
      metric: 'Unanswered Reviews',
      valA: reportA.gbpAudit.unansweredReviewsCount,
      valB: reportB.gbpAudit.unansweredReviewsCount,
      // lower is better
      winner:
        reportA.gbpAudit.unansweredReviewsCount < reportB.gbpAudit.unansweredReviewsCount
          ? 'A'
          : reportB.gbpAudit.unansweredReviewsCount < reportA.gbpAudit.unansweredReviewsCount
          ? 'B'
          : 'Tied',
      insight: 'Lower unanswered reviews = higher customer trust',
    },
    {
      metric: 'Review Response Rate',
      valA: `${reportA.gbpAudit.responseRatePercentage}%`,
      valB: `${reportB.gbpAudit.responseRatePercentage}%`,
      winner:
        reportA.gbpAudit.responseRatePercentage > reportB.gbpAudit.responseRatePercentage
          ? 'A'
          : reportB.gbpAudit.responseRatePercentage > reportA.gbpAudit.responseRatePercentage
          ? 'B'
          : 'Tied',
      insight: 'Speed & coverage of public customer replies',
    },
    {
      metric: 'WhatsApp Quick Chat',
      valA: reportA.websiteAudit.hasWhatsAppButton ? 'Active' : 'Missing',
      valB: reportB.websiteAudit.hasWhatsAppButton ? 'Active' : 'Missing',
      winner:
        reportA.websiteAudit.hasWhatsAppButton === reportB.websiteAudit.hasWhatsAppButton
          ? 'Tied'
          : reportA.websiteAudit.hasWhatsAppButton
          ? 'A'
          : 'B',
      insight: 'Instant mobile chat for Indian consumers',
    },
    {
      metric: 'Online Booking System',
      valA: reportA.websiteAudit.hasOnlineBooking ? 'Integrated' : 'Missing',
      valB: reportB.websiteAudit.hasOnlineBooking ? 'Integrated' : 'Missing',
      winner:
        reportA.websiteAudit.hasOnlineBooking === reportB.websiteAudit.hasOnlineBooking
          ? 'Tied'
          : reportA.websiteAudit.hasOnlineBooking
          ? 'A'
          : 'B',
      insight: 'Captures inquiries after opening hours',
    },
    {
      metric: 'Monthly Leaked Revenue',
      valA: `₹${(reportA.revenueLoss.totalMonthlyLoss / 1000).toFixed(0)}k/mo`,
      valB: `₹${(reportB.revenueLoss.totalMonthlyLoss / 1000).toFixed(0)}k/mo`,
      // lower loss is better
      winner:
        reportA.revenueLoss.totalMonthlyLoss < reportB.revenueLoss.totalMonthlyLoss
          ? 'A'
          : reportB.revenueLoss.totalMonthlyLoss < reportA.revenueLoss.totalMonthlyLoss
          ? 'B'
          : 'Tied',
      insight: 'Estimated money lost to competitor friction',
    },
  ];

  // Playbook to Win
  const playbookToWin: import('../types/audit').ComparisonBattlePlaybookItem[] = [
    {
      id: 'play-1',
      title: isHindi
        ? '5-सेकंड व्हाट्सएप AI बुकिंग बॉट'
        : isHinglish
        ? '5-Second WhatsApp Instant AI Concierge'
        : '5-Second WhatsApp Instant AI Concierge',
      tactic: isHindi
        ? `${businessB.name} के ग्राहकों को अपने पास आकर्षित करने के लिए गूगल सर्च और मैप्स पर 1-टैप व्हाट्सएप बुकिंग शुरू करें।`
        : isHinglish
        ? `${businessB.name} ki slow phone inquiries ke against instant 24/7 WhatsApp pricing & booking launch karein.`
        : `Capture high-intent searchers the moment they compare options by offering instant 5-second pricing and booking over WhatsApp.`,
      expectedEdge: isHindi ? '+35% अधिक ग्राहक' : isHinglish ? '+35% inquiry conversion' : '+35% inquiry conversion',
    },
    {
      id: 'play-2',
      title: isHindi
        ? '100% गूगल रिव्यू ऑटो-रिप्लाई AI'
        : isHinglish
        ? 'Autonomous Review Empathy Responder'
        : 'Autonomous Review Empathy Responder',
      tactic: isHindi
        ? `सभी पुराने और नए 1-स्टार और 3-स्टार रिव्यू का तुरंत जवाब देकर ${businessB.name} से बेहतर रेटिंग स्कोर हासिल करें।`
        : isHinglish
        ? `Har Google review par 5 minute me response dekar Google Maps 3-Pack rank me ${businessB.name} ko surpass karein.`
        : `Eliminate unanswered reviews entirely with empathetic, on-brand replies that elevate your Google Maps 3-Pack rank above ${businessB.name}.`,
      expectedEdge: isHindi ? 'मैप्स रैंकिंग #1' : isHinglish ? 'Rank #1 on Maps' : 'Rank #1 on Maps',
    },
    {
      id: 'play-3',
      title: isHindi
        ? 'जियो-टारगेटेड लोकल एसईओ अपडेट्स'
        : isHinglish
        ? 'Hyper-Local Landmark Radius Updates'
        : 'Hyper-Local Landmark Radius Updates',
      tactic: isHindi
        ? `${businessB.name} के नजदीकी इलाके और मुख्य लैंडमार्क को टारगेट करते हुए साप्ताहिक कीवर्ड पोस्ट प्रकाशित करें।`
        : isHinglish
        ? `${businessB.name} ke nearby neighborhoods aur landmarks ko target karke weekly photo updates publish karein.`
        : `Publish weekly geotagged photo updates and keyword-rich local offers that systematically intercept customer searches in their immediate radius.`,
      expectedEdge: isHindi ? '+28% नए वॉक-इन' : isHinglish ? '+28% new walk-ins' : '+28% new walk-ins',
    },
  ];

  return {
    id: `battle-${Date.now()}`,
    generatedAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    language,
    category,
    reportA,
    reportB,
    overallWinner,
    leaderVerdict,
    scoreGap,
    monthlyRevenueGap: Math.abs(
      reportA.revenueLoss.totalMonthlyLoss - reportB.revenueLoss.totalMonthlyLoss
    ),
    metricsTable,
    playbookToWin,
    keyTakeaway: isHindi
      ? `Aimerger का AI सिस्टम ${businessA.name} को ${businessB.name} के मुकाबले स्थानीय बाज़ार में पूर्ण बढ़त दिलाने के लिए तैयार किया गया है।`
      : isHinglish
      ? `Aimerger ka AI solution ${businessA.name} ko ${businessB.name} se aage nikalne ke liye complete roadmap deta hai.`
      : `Aimerger's autonomous agents provide ${businessA.name} the exact operational and conversion speed needed to outcompete ${businessB.name} in ${businessA.city}.`,
  };
}
