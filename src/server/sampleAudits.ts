import { BusinessXRayReport } from '../types/audit';

export const POPULAR_INDIAN_EXAMPLES: Array<{
  name: string;
  city: string;
  category: string;
  website?: string;
  instagram?: string;
}> = [
  {
    name: 'Theobroma Patisserie',
    city: 'Bandra West, Mumbai',
    category: 'Bakery & Cafe',
    website: 'https://theobroma.in',
    instagram: '@theobromapatisserie',
  },
  {
    name: 'Clove Dental Clinic',
    city: 'Indiranagar, Bengaluru',
    category: 'Dental & Healthcare',
    website: 'https://clovedental.in',
    instagram: '@clovedentalindia',
  },
  {
    name: 'Chai Point',
    city: 'Koramangala, Bengaluru',
    category: 'Quick Service Restaurant (QSR)',
    website: 'https://chaipoint.com',
    instagram: '@chaipoint',
  },
  {
    name: 'Kailash Parbat Pure Veg',
    city: 'Kothrud, Pune',
    category: 'Casual Dining Restaurant',
    website: 'https://kailashparbat.in',
    instagram: '@kailashparbatindia',
  },
  {
    name: 'VLCC Salon & Wellness',
    city: 'South Extension, New Delhi',
    category: 'Salon & Spa / Wellness',
    website: 'https://vlcc.com',
    instagram: '@vlccindia',
  },
  {
    name: 'Shree Balaji Sweets & Farsan',
    city: 'Ahmedabad, Gujarat',
    category: 'Sweet & Snack Shop',
    website: '',
    instagram: '@shreebalajisweets',
  },
];

export function getMockSampleAudit(
  businessName: string,
  city: string,
  category: string = 'Local Retail & Services',
  websiteUrl: string = '',
  language: 'en' | 'hi' | 'hinglish' = 'en'
): BusinessXRayReport {
  const isTheobroma = businessName.toLowerCase().includes('theobroma');
  const isDental = businessName.toLowerCase().includes('dental') || category.toLowerCase().includes('dental');
  const isFood = businessName.toLowerCase().includes('chai') || businessName.toLowerCase().includes('sweets') || category.toLowerCase().includes('restaurant') || isTheobroma;

  const avgTicket = isDental ? 2500 : isFood ? 450 : 1200;
  const rating = isTheobroma ? 4.3 : 4.1;
  const reviewCount = isTheobroma ? 3420 : 418;
  const unanswered = Math.round(reviewCount * 0.14);

  const lossReviews = Math.round(avgTicket * 35);
  const lossWhatsApp = Math.round(avgTicket * 65);
  const lossRepeat = Math.round(avgTicket * 40);
  const totalMonthlyLoss = lossReviews + lossWhatsApp + lossRepeat;

  // Language texts
  const isHindi = language === 'hi';
  const isHinglish = language === 'hinglish';

  const verdict = isHindi
    ? 'डिजिटल प्रेजेंस मजबूत है, लेकिन ऑटोमेशन की कमी से हर महीने भारी रेवेन्यू लीक हो रहा है।'
    : isHinglish
    ? 'Google Maps pe ranking achhi hai, par WhatsApp instant response na hone se 30%+ leads competitors ke paas ja rahi hain.'
    : 'Strong brand footprint in local searches, but conversion leakages in review response and WhatsApp follow-ups cost over ₹1.5L/month.';

  const complaints = isHindi
    ? [
        {
          theme: 'पीक आवर्स में सर्विस में देरी',
          frequency: 'High' as const,
          exampleSnippet: 'शनिवार शाम को बहुत लंबी कतार थी और कोई ऑनलाइन टोकन सिस्टम नहीं था।',
          businessRisk: '22% ग्राहक कतार देखकर सीधे पास के कॉम्पिटिटर के पास चले जाते हैं।',
        },
        {
          theme: 'फ़ोन कॉल न उठना या देर से जवाब',
          frequency: 'Medium' as const,
          exampleSnippet: 'मैंने 3 बार कॉल किया लेकिन किसी ने नहीं उठाया। न कोई व्हाट्सएप मैसेज आया।',
          businessRisk: 'प्रति सप्ताह कम से कम 15-20 गर्म इंक्वायरी सीधे ख़त्म हो जाती हैं।',
        },
        {
          theme: 'नेगेटिव रिव्यू का कोई फॉलो-अप नहीं',
          frequency: 'Medium' as const,
          exampleSnippet: 'गलत बिलिंग की शिकायत की थी, 3 हफ़्ते हो गए कोई समाधान नहीं मिला।',
          businessRisk: 'संभावित नए ग्राहक 1-स्टार रिव्यू देखकर बुकिंग छोड़ देते हैं।',
        },
      ]
    : isHinglish
    ? [
        {
          theme: 'Rush hours me slow service & no queue alert',
          frequency: 'High' as const,
          exampleSnippet: 'Weekend evening me bohot rush tha aur token status ka koi WhatsApp update nahi mila.',
          businessRisk: 'Customer frustration leads to 1-star reviews on Google Maps.',
        },
        {
          theme: 'Missed calls pe zero automated follow-up',
          frequency: 'High' as const,
          exampleSnippet: 'Phone lagaya par ring jaati rahi. Kisi ne callback ya WhatsApp nahi kiya.',
          businessRisk: 'High-intent leads immediately switch to competitors nearby.',
        },
        {
          theme: 'Negative Google reviews unanswered',
          frequency: 'Medium' as const,
          exampleSnippet: 'Disappointed with table wait time, nobody even apologized.',
          businessRisk: 'Unanswered reviews drag down local Google Maps 3-Pack rank.',
        },
      ]
    : [
        {
          theme: 'Peak-hour delay & manual token management',
          frequency: 'High' as const,
          exampleSnippet: 'Long waiting time during peak evening hours without dynamic WhatsApp queue alerts.',
          businessRisk: 'Over 20% walk-in dropouts abandon queue to visit nearby rivals.',
        },
        {
          theme: 'Unanswered telephone calls during busy shifts',
          frequency: 'Medium' as const,
          exampleSnippet: 'Tried calling the branch twice to confirm pre-orders; line was busy and no callback was received.',
          businessRisk: 'Leads with immediate buying intent switch to nearest alternative in under 3 minutes.',
        },
        {
          theme: 'Lack of management acknowledgment on 1-star reviews',
          frequency: 'Medium' as const,
          exampleSnippet: 'Left a constructive review regarding order packing; no response from management after 3 weeks.',
          businessRisk: 'Undermines trust for prospective high-ticket customers reading local reviews.',
        },
      ];

  const recommendations = [
    {
      id: 'rec-1',
      title: isHindi
        ? '24/7 ऑटोमेटेड व्हाट्सएप AI बुकिंग और इंक्वायरी एजेंट'
        : isHinglish
        ? '24/7 AI WhatsApp Booking & FAQ Concierge'
        : '24/7 AI WhatsApp Booking & Customer Concierge',
      category: 'WhatsApp Automation' as const,
      description: isHindi
        ? 'ग्राहकों को 5 सेकंड में मेनू, रेट कार्ड, अपॉइंटमेंट और लोकेशन व्हाट्सएप पर ऑटो-सेंड करें।'
        : isHinglish
        ? 'Website aur Google Maps se aane wale customers ko instant 5-second me pricing, photos aur booking send karein.'
        : 'Instantly captures inbound leads from Google Search, Maps, and Instagram with 5-second dynamic response.',
      expectedRevenueImpact: '+₹65,000 / month',
      timeSavedPerWeek: '15 hrs / week',
      implementationEffort: 'Quick (1-2 days)' as const,
      aimergerAdvantage: 'Aimerger sets up customized conversational flow trained on your exact menu/services.',
    },
    {
      id: 'rec-2',
      title: isHindi
        ? 'ऑटो-गूगल रिव्यू रिप्लाई और रेपुटेशन बूस्टर AI'
        : isHinglish
        ? 'Instant AI Google Review Responder & Star Booster'
        : 'Instant AI Google Review Responder & Star Booster',
      category: 'Reputation & Reviews' as const,
      description: isHindi
        ? 'हर रिव्यू (पॉजिटिव और नेगेटिव) का तुरंत शालीनता और सम्मानपूर्वक AI द्वारा जवाब, कस्टमर सेटिस्फैक्शन 40% बढ़ता है।'
        : isHinglish
        ? 'Har Google review ka empathy-filled reply 5 minute me post karein, negative reviews ko private WhatsApp me resolve karein.'
        : 'Ensures 100% response rate with personalized, brand-aligned replies that boost Google Maps 3-Pack rank.',
      expectedRevenueImpact: '+₹38,000 / month',
      timeSavedPerWeek: '6 hrs / week',
      implementationEffort: 'Quick (1-2 days)' as const,
      aimergerAdvantage: 'Aimerger plugs into your Google Business Profile with human-in-the-loop safeguards.',
    },
    {
      id: 'rec-3',
      title: isHindi
        ? 'मिस कॉल रिकवरी: तुरंत व्हाट्सएप पिंग'
        : isHinglish
        ? 'Smart Missed-Call Lead Recovery Engine'
        : 'Smart Missed-Call Lead Recovery Engine',
      category: 'Lead Conversion' as const,
      description: isHindi
        ? 'जब भी काउंटर या रिसेप्शन पर कॉल मिस हो, कस्टमर को तुरंत डिजिटल कैटलॉग के साथ व्हाट्सएप मैसेज चला जाए।'
        : isHinglish
        ? 'Busy counter pe call miss hote hi customer ko instant WhatsApp: "Hi, hume call karne ke liye shukriya! Kaise help karein?"'
        : 'Triggers instant WhatsApp greeting with quick-book buttons the moment a customer call goes unanswered.',
      expectedRevenueImpact: '+₹42,000 / month',
      timeSavedPerWeek: '8 hrs / week',
      implementationEffort: 'Moderate (3-5 days)' as const,
      aimergerAdvantage: 'Zero dropped business phone inquiries; automatically queues leads in your dashboard.',
    },
    {
      id: 'rec-4',
      title: isHindi
        ? 'लोकल एसईओ और जियो-टारगेटेड गूगल पोस्ट्स जेनरेटर'
        : isHinglish
        ? 'Hyper-Local SEO & Weekly Google Updates Engine'
        : 'Hyper-Local SEO & Weekly Google Updates Engine',
      category: 'Local SEO & Maps' as const,
      description: isHindi
        ? 'आपके एरिया और आस-पास के लैंडमार्क के लिए ऑटोमैटिक कीवर्ड-रिच पोस्ट बनाकर मैप्स रैंकिंग नंबर 1 पर लाएं।'
        : isHinglish
        ? 'City specific keywords aur local landmarks ko target karke weekly photo posts publish karein.'
        : 'Automates weekly local keyword posts with high-converting CTAs to outperform competitor proximity.',
      expectedRevenueImpact: '+₹25,000 / month',
      timeSavedPerWeek: '4 hrs / week',
      implementationEffort: 'Moderate (3-5 days)' as const,
      aimergerAdvantage: 'Pre-scheduled calendar of Indian seasonal and local festival promotions.',
    },
    {
      id: 'rec-5',
      title: isHindi
        ? 'रिपीट कस्टमर रिटेंशन और फेस्टिवल ब्रॉडकास्ट AI'
        : isHinglish
        ? 'Repeat Customer Retention & Festival AI Broadcast'
        : 'Repeat Customer Retention & Festival AI Broadcast',
      category: 'Customer Retention' as const,
      description: isHindi
        ? 'पुराने ग्राहकों को उनके पसंदीदा ऑर्डर/सर्विस पर 30 दिन बाद ऑटोमैटिक री-विजिट डिस्काउंट व्हाट्सएप भेजें।'
        : isHinglish
        ? 'Last visit ke 30-45 din baad personalized VIP offer bhejkar 25%+ repeat footfall ensure karein.'
        : 'Segmented WhatsApp broadcasts that revive dormant customers based on visit frequency.',
      expectedRevenueImpact: '+₹52,000 / month',
      timeSavedPerWeek: '10 hrs / week',
      implementationEffort: 'Comprehensive (1 week)' as const,
      aimergerAdvantage: 'Compliant with Meta WhatsApp Cloud API and smart anti-spam throttling.',
    },
  ];

  const reviewReplies = [
    {
      ratingScenario: '5-Star Positive' as const,
      originalCustomerContext: 'Customer praised the quick service, delicious quality, and polite staff behavior.',
      replyText: isHindi
        ? `नमस्ते! हमारे साथ अपना इतना शानदार अनुभव साझा करने के लिए बहुत-बहुत धन्यवाद। हमारी पूरी टीम को आपकी प्रशंसा से बहुत खुशी हुई। अगली बार जब आप आएं, तो हमारी स्पेशल न्यू वैरायटी ज़रूर आज़माएँ! जल्द ही फिर स्वागत करने की उम्मीद है। — टीम ${businessName}`
        : isHinglish
        ? `Hi! Hamare saath itna shandar review share karne ke liye bohot bohot shukriya! ❤️ Hamari team ko aapka feedback padhkar bohot khushi hui. Next time jab aap aayein toh hamara chef's special zaroor try kijiyega! Looking forward to welcoming you back soon. — Team ${businessName}`
        : `Thank you so much for the 5-star rating! We are delighted to hear that you had such a wonderful experience with our team. Your kind words inspire us to keep delivering our best every single day. We look forward to welcoming you back again very soon! — Team ${businessName}`,
      strategyRationale: 'Expresses authentic gratitude, tags team dedication, and implants a gentle hook for the next visit.',
    },
    {
      ratingScenario: '3-Star Mixed' as const,
      originalCustomerContext: 'Customer liked the offering, but felt the waiting line was unmanaged and parking was difficult.',
      replyText: isHindi
        ? `नमस्ते! हमारे पास आने और अपनी ईमानदार राय देने के लिए धन्यवाद। आपको इंतज़ार में हुई असुविधा के लिए हमें गहरा खेद है। हमने व्यस्त समय में कतार प्रबंधन को तेज़ करने के लिए एक डिजिटल टोकन सिस्टम शुरू किया है। हम इसे सुधारने के लिए प्रतिबद्ध हैं—कृपया अपने अगले अनुभव पर हमें बेहतर सेवा का मौका दें। — टीम ${businessName}`
        : isHinglish
        ? `Hello! Visit karne aur honest feedback dene ke liye thank you. Waiting time ki wajah se jo delay hua, uske liye we sincerely apologize. Hamne peak hours ke liye queue process update kar diya hai. Agli baar aapko smooth experience milega! Direct assistance ke liye aap hamare manager se connect kar sakte hain. — Team ${businessName}`
        : `Thank you for taking the time to share your balanced feedback. We are glad you enjoyed the core experience, but we sincerely apologize for the delay during peak hours. We are actively optimizing our peak-shift queue handling to ensure smoother visits. We would love the chance to delight you completely on your next visit! — Management, ${businessName}`,
      strategyRationale: 'Validates frustration without defensive excuses, highlights active operational improvement, and preserves retention.',
    },
    {
      ratingScenario: '1-Star Complaint' as const,
      originalCustomerContext: 'Unhappy customer reported an incorrect order billing and unhelpful interaction with staff.',
      replyText: isHindi
        ? `नमस्ते! यह सुनकर हमें बहुत दुख हुआ कि आपका अनुभव हमारे मानकों के अनुरूप नहीं रहा। हम इसके लिए क्षमा चाहते हैं। हम आपकी समस्या को तुरंत सुलझाना चाहते हैं। कृपया सीधे हमारे कस्टमर हेड को WhatsApp (+91 87969 25824) पर मैसेज करें ताकि हम आज ही आपकी पूरी मदद कर सकें। हम इसे ठीक करना चाहते हैं। — प्रबंधन, ${businessName}`
        : isHinglish
        ? `Hi, we are extremely sorry to hear about this experience. Ye hamare service standards ke bilkul against hai. Hum is matter ko personally resolve karna chahte hain. Please hamare manager ko WhatsApp karein: +91 87969 25824, taaki hum turant iska resolution nikal sakein. Give us a chance to make this right for you. — Operations Head, ${businessName}`
        : `Dear Valued Guest, we sincerely apologize for falling short of your expectations. This is certainly not the standard of service we hold ourselves to. We want to investigate this immediately and resolve it for you. Please message our manager directly on WhatsApp at +91 87969 25824 with your visit details so we can make this right. — Operations Head, ${businessName}`,
      strategyRationale: 'De-escalates public conflict quickly, acknowledges distress with dignity, and channels the conversation to a 1-on-1 private WhatsApp line.',
    },
  ];

  return {
    id: `xray-${Date.now()}`,
    generatedAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    language,
    businessName,
    city,
    category,
    websiteUrl: websiteUrl || (isTheobroma ? 'https://theobroma.in' : undefined),
    overallScore: 68,
    scoreGrade: 'B',
    scoreVerdict: verdict,
    scoreBreakdown: {
      googleMapsPresence: 82,
      reputationAndReviews: 64,
      websiteAndMobileConversion: 58,
      aiReadiness: 45,
    },
    gbpAudit: {
      name: businessName,
      city,
      fullAddress: `${city}, India`,
      category,
      rating,
      reviewCount,
      mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(`${businessName} ${city}`)}`,
      sentiment: {
        positive: 74,
        neutral: 17,
        negative: 9,
      },
      topComplaints: complaints,
      unansweredReviewsCount: unanswered,
      responseRatePercentage: 42,
      listingFreshness: 'Active',
      claimedStatus: 'Verified',
    },
    websiteAudit: {
      url: websiteUrl || (isTheobroma ? 'https://theobroma.in' : undefined),
      hasWebsite: Boolean(websiteUrl || isTheobroma),
      speedRating: 'Average',
      mobileFriendly: true,
      mobileScore: 62,
      hasWhatsAppButton: false,
      hasOnlineBooking: isDental,
      seoScore: 71,
      issues: [
        'Missing 1-Click WhatsApp Quick Chat floating button on mobile viewport',
        'No exit-intent lead capture or special offer pop-up for first-time visitors',
        'Page load delay of ~3.4s on 4G Indian mobile networks due to uncompressed media',
        'Missing local geo-schema (schema.org/LocalBusiness) tags for city neighborhoods',
      ],
      conversionKillers: [
        'Mobile visitors wanting quick inquiries are forced to fill a 5-field contact form instead of tapping WhatsApp',
        'No live availability or real-time appointment calendar visible above the fold',
      ],
    },
    competitors: [
      {
        name: isFood ? 'Blue Tokai Coffee Roasters' : isDental ? 'Sabka Dentist' : 'City Prime Competitor A',
        rating: 4.6,
        reviewCount: Math.round(reviewCount * 1.4),
        distance: '1.2 km away',
        keyAdvantage: 'Instant WhatsApp ordering bot with dynamic loyalty cashback',
        threatLevel: 'High',
      },
      {
        name: isFood ? 'Third Wave Coffee' : isDental ? 'Apollo White Dental' : 'Regional Specialist B',
        rating: 4.4,
        reviewCount: Math.round(reviewCount * 1.1),
        distance: '2.1 km away',
        keyAdvantage: 'Responds to 98% of Google reviews within 2 hours with manager signature',
        threatLevel: 'High',
      },
      {
        name: isFood ? 'Starbucks India' : isDental ? 'Smile Dental Care' : 'Local Favorite C',
        rating: 4.3,
        reviewCount: Math.round(reviewCount * 0.9),
        distance: '3.0 km away',
        keyAdvantage: 'High frequency of photo updates and seasonal festive campaigns',
        threatLevel: 'Moderate',
      },
    ],
    revenueLoss: {
      unansweredReviewsLoss: lossReviews,
      slowOrNoWhatsAppResponseLoss: lossWhatsApp,
      lackOfRepeatBookingAutomationLoss: lossRepeat,
      totalMonthlyLoss,
      totalAnnualLoss: totalMonthlyLoss * 12,
      avgCustomerValueUsed: avgTicket,
      explanation: isHindi
        ? `आपके औसत बिल ₹${avgTicket} के आधार पर, अनुत्तरित नेगेटिव रिव्यू और व्हाट्सएप पर तुरंत रिप्लाई न मिलने से लगभग 110-140 संभावित ग्राहक हर महीने प्रतिस्पर्धियों के पास जा रहे हैं।`
        : isHinglish
        ? `Avg ticket size ₹${avgTicket} par based: 14% unanswered reviews aur instant WhatsApp response na hone se roughly 120-150 leads drop ho rahi hain.`
        : `Calculated from your estimated ₹${avgTicket} average order/ticket: Over 130 high-intent inquiries drop off each month due to absent WhatsApp quick-action and unresolved Google complaints.`,
    },
    recommendations,
    reviewReplies,
    citations: [
      {
        title: `${businessName} on Google Maps (${city})`,
        uri: `https://maps.google.com/?q=${encodeURIComponent(`${businessName} ${city}`)}`,
        type: 'maps',
        snippet: `Verified place location in ${city} with ${rating} rating and ${reviewCount} reviews.`,
      },
      {
        title: 'Google Business Profile Local Search Data',
        uri: 'https://business.google.com',
        type: 'search',
        snippet: 'Local SEO 3-pack citation & review velocity metrics for Indian small businesses.',
      },
      {
        title: 'Aimerger Local Market Intelligence Benchmark',
        uri: 'https://aimerger.com',
        type: 'web',
        snippet: 'Indian SMB digital conversion analysis across tier 1 & 2 cities.',
      },
    ],
    quickWinsSummary: [
      'Add a floating WhatsApp click-to-chat widget with pre-typed text (Stops 30% lead bounce)',
      'Reply to the 15 most recent 1-star reviews using our AI templates to regain customer goodwill',
      'Upload 10 high-resolution geotagged photos of your shop/clinic/premises on Google Business Profile',
    ],
  };
}
