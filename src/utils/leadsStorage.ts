export interface AuditLeadRecord {
  id: string;
  businessName: string;
  city: string;
  category: string;
  websiteUrl?: string;
  score: number;
  grade: string;
  monthlyLoss: number; // in INR
  rating: number;
  reviewCount: number;
  unansweredReviews: number;
  hasWhatsApp: boolean;
  auditType: 'single' | 'compare';
  createdAt: string;
  formattedDate: string;
  followUpStatus: 'New Lead' | 'Contacted' | 'Call Booked' | 'Closed Won' | 'Archived';
  notes?: string;
  // Lead Capture info
  leadName?: string;
  leadPhone?: string;
  leadRole?: string;
}

const STORAGE_KEY = 'aimerger_business_xray_leads_v1';

// Initial sample leads for Indian small businesses with realistic contact data
const INITIAL_DEMO_LEADS: AuditLeadRecord[] = [
  {
    id: 'lead-1',
    businessName: 'Clove Dental Clinic',
    city: 'Indiranagar, Bengaluru',
    category: 'Dental Clinic / Healthcare',
    websiteUrl: 'https://clovedental.in',
    score: 68,
    grade: 'B',
    monthlyLoss: 145000,
    rating: 4.2,
    reviewCount: 420,
    unansweredReviews: 54,
    hasWhatsApp: false,
    auditType: 'single',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    formattedDate: 'Today, 10:15 AM',
    followUpStatus: 'New Lead',
    notes: 'Missing WhatsApp booking button. 54 negative reviews unanswered.',
    leadName: 'Dr. Sameer Kapoor',
    leadPhone: '+91 98201 44521',
    leadRole: 'Clinic Director',
  },
  {
    id: 'lead-2',
    businessName: 'Theobroma Patisserie',
    city: 'Bandra West, Mumbai',
    category: 'Bakery & Cafe',
    websiteUrl: 'https://theobroma.in',
    score: 74,
    grade: 'B',
    monthlyLoss: 210000,
    rating: 4.3,
    reviewCount: 3420,
    unansweredReviews: 240,
    hasWhatsApp: false,
    auditType: 'single',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    formattedDate: 'Today, 06:30 AM',
    followUpStatus: 'Contacted',
    notes: 'High walk-in volume. Interested in automated WhatsApp order bot.',
    leadName: 'Rohan Mehra',
    leadPhone: '+91 99304 88129',
    leadRole: 'General Manager',
  },
  {
    id: 'lead-3',
    businessName: 'Kailash Parbat Pure Veg',
    city: 'Kothrud, Pune',
    category: 'Casual Dining Restaurant',
    websiteUrl: 'https://kailashparbat.in',
    score: 62,
    grade: 'C',
    monthlyLoss: 165000,
    rating: 4.1,
    reviewCount: 880,
    unansweredReviews: 95,
    hasWhatsApp: false,
    auditType: 'single',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    formattedDate: 'Yesterday, 04:45 PM',
    followUpStatus: 'Call Booked',
    notes: 'Discussed missed-call lead follow up bot for weekend peak rush.',
    leadName: 'Kishore Mulchandani',
    leadPhone: '+91 98902 33140',
    leadRole: 'Owner / Partner',
  },
  {
    id: 'lead-4',
    businessName: 'Chai Point vs Chaayos',
    city: 'Koramangala, Bengaluru',
    category: 'Quick Service Restaurant (QSR)',
    websiteUrl: 'https://chaipoint.com',
    score: 71,
    grade: 'B',
    monthlyLoss: 180000,
    rating: 4.2,
    reviewCount: 1540,
    unansweredReviews: 120,
    hasWhatsApp: true,
    auditType: 'compare',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    formattedDate: '2 days ago',
    followUpStatus: 'New Lead',
    notes: 'Compared against Chaayos; Chaayos leads by +6 points on Google Maps velocity.',
    leadName: 'Vikram Joshi',
    leadPhone: '+91 97410 55902',
    leadRole: 'Marketing Head',
  },
];

export function getStoredLeads(): AuditLeadRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic demo leads so admin page is immediately valuable
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to read leads from localStorage:', e);
    return [];
  }
}

export function saveLead(
  leadData: Omit<AuditLeadRecord, 'id' | 'createdAt' | 'formattedDate' | 'followUpStatus'>
): AuditLeadRecord {
  if (typeof window === 'undefined') {
    return {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      formattedDate: 'Just now',
      followUpStatus: 'New Lead',
    };
  }

  const existing = getStoredLeads();
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const newLead: AuditLeadRecord = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: now.toISOString(),
    formattedDate,
    followUpStatus: 'New Lead',
    notes: '',
  };

  // Add to top of list
  const updated = [newLead, ...existing.filter((item) => item.businessName !== newLead.businessName || item.city !== newLead.city)];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: AuditLeadRecord['followUpStatus']): void {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => (lead.id === id ? { ...lead, followUpStatus: status } : lead));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function updateLeadNotes(id: string, notes: string): void {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => (lead.id === id ? { ...lead, notes } : lead));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function updateLeadContactInfo(
  businessName: string,
  city: string,
  contact: { leadName: string; leadPhone: string; leadRole?: string }
): void {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => {
    // Match by businessName or id
    if (
      lead.businessName.toLowerCase() === businessName.toLowerCase() ||
      lead.city.toLowerCase() === city.toLowerCase()
    ) {
      return {
        ...lead,
        leadName: contact.leadName,
        leadPhone: contact.leadPhone,
        leadRole: contact.leadRole || lead.leadRole,
      };
    }
    return lead;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteLead(id: string): void {
  const existing = getStoredLeads();
  const updated = existing.filter((lead) => lead.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearAllLeads(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Exports leads to a well-formatted CSV file and triggers automatic browser download
 */
export function exportLeadsToCSV(leads: AuditLeadRecord[]): void {
  if (!leads || leads.length === 0) {
    alert('No audit leads to export.');
    return;
  }

  const headers = [
    'Lead ID',
    'Prospect Contact Name',
    'Prospect WhatsApp Phone',
    'Prospect Role',
    'Business Name',
    'City / Area',
    'Category',
    'Digital Health Score',
    'Grade',
    'Estimated Monthly Loss (INR)',
    'Estimated Annual Loss (INR)',
    'Google Rating',
    'Total Reviews',
    'Unanswered Reviews',
    'WhatsApp Detected',
    'Website URL',
    'Audit Type',
    'Date Scanned',
    'Follow-up Status',
    'Notes',
  ];

  const escapeCSV = (str: string | number | boolean | undefined) => {
    if (str === undefined || str === null) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = leads.map((lead) => [
    escapeCSV(lead.id),
    escapeCSV(lead.leadName || 'Pending Capture'),
    escapeCSV(lead.leadPhone || 'Not Provided'),
    escapeCSV(lead.leadRole || 'Business Owner'),
    escapeCSV(lead.businessName),
    escapeCSV(lead.city),
    escapeCSV(lead.category),
    escapeCSV(lead.score),
    escapeCSV(lead.grade),
    escapeCSV(lead.monthlyLoss),
    escapeCSV(lead.monthlyLoss * 12),
    escapeCSV(lead.rating),
    escapeCSV(lead.reviewCount),
    escapeCSV(lead.unansweredReviews),
    escapeCSV(lead.hasWhatsApp ? 'Yes' : 'No'),
    escapeCSV(lead.websiteUrl || 'None'),
    escapeCSV(lead.auditType === 'compare' ? 'Competitor Compare' : 'Single Audit'),
    escapeCSV(lead.formattedDate),
    escapeCSV(lead.followUpStatus),
    escapeCSV(lead.notes || ''),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const today = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `aimerger_xray_leads_${today}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
