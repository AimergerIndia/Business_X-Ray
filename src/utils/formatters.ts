/**
 * Format numbers using the Indian numbering system (e.g. ₹1,25,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIndianNumber(value: number): string {
  if (isNaN(value)) return '0';
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatInLakhs(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  }
  return formatINR(amount);
}

export const LANGUAGE_LABELS = {
  en: {
    label: 'English',
    badge: 'EN',
    tagline: 'AI that merges into your business',
    auditButton: 'Generate Free Business X-Ray',
    bookCall: 'Book a free 30-min call with Aimerger',
  },
  hi: {
    label: 'हिंदी (Hindi)',
    badge: 'हिं',
    tagline: 'AI जो आपके बिजनेस में आसानी से घुल-मिल जाए',
    auditButton: 'मुफ़्त बिजनेस एक्स-रे रिपोर्ट निकालें',
    bookCall: 'Aimerger के साथ 30 मिनट का फ़्री कॉल बुक करें',
  },
  hinglish: {
    label: 'Hinglish',
    badge: 'Hing',
    tagline: 'AI that merges into your business',
    auditButton: 'Free Business X-Ray Report Nikalein',
    bookCall: 'Book a free 30-min call with Aimerger',
  },
};
