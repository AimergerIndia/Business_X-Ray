import React, { useState, useEffect } from 'react';
import {
  Download,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  MessageCircle,
  FileText,
  Star,
  TrendingDown,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  Plus,
  Edit3,
  User,
  Phone,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';
import {
  AuditLeadRecord,
  getStoredLeads,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  clearAllLeads,
  exportLeadsToCSV,
} from '../utils/leadsStorage';
import { formatINR, formatIndianNumber } from '../utils/formatters';
import { AimergerSpark, AimergerIcon } from './AimergerBrand';

interface AdminLeadsPageProps {
  onBackToAuditor: () => void;
}

export const AdminLeadsPage: React.FC<AdminLeadsPageProps> = ({ onBackToAuditor }) => {
  const [leads, setLeads] = useState<AuditLeadRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  const loadLeads = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = (id: string, newStatus: AuditLeadRecord['followUpStatus']) => {
    updateLeadStatus(id, newStatus);
    loadLeads();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete lead record for "${name}"?`)) {
      deleteLead(id);
      loadLeads();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete ALL saved audit leads? This cannot be undone.')) {
      clearAllLeads();
      setLeads([]);
    }
  };

  const handleSaveNotes = (id: string) => {
    updateLeadNotes(id, tempNotes);
    setEditingNotesId(null);
    loadLeads();
  };

  // Filter leads based on search and status
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.leadName && lead.leadName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.leadPhone && lead.leadPhone.includes(searchTerm));
    const matchesStatus = statusFilter === 'All' || lead.followUpStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate high-level pipeline stats
  const totalLeads = leads.length;
  const totalLeakedPipeline = leads.reduce((acc, curr) => acc + (curr.monthlyLoss || 0), 0);
  const avgScore = totalLeads > 0 ? Math.round(leads.reduce((acc, c) => acc + c.score, 0) / totalLeads) : 0;
  const highIntentLeads = leads.filter((l) => l.score < 75 || l.monthlyLoss > 100000).length;

  const handleDirectWhatsAppPitch = (lead: AuditLeadRecord) => {
    const cleanDigits = (lead.leadPhone || '').replace(/[^0-9]/g, '');
    let targetNumber = '';
    if (cleanDigits.length === 10) {
      targetNumber = `91${cleanDigits}`;
    } else if (cleanDigits.length > 10) {
      targetNumber = cleanDigits;
    }

    const greeting = lead.leadName ? `Hi ${lead.leadName}` : `Hi Team ${lead.businessName}`;
    const pitchText = encodeURIComponent(
      `${greeting}, we recently performed an AI Business X-Ray audit on ${lead.businessName} in ${lead.city}.\n\n` +
      `Our scan identified an estimated ${formatINR(lead.monthlyLoss)}/month in lost customers due to ${lead.unansweredReviews} unanswered Google reviews and slow lead response.\n\n` +
      `Aimerger has built 5 custom AI automations (including an instant 24/7 WhatsApp concierge bot) tailored for ${lead.category}. Would you like a 10-minute demo this week?`
    );

    const waUrl = targetNumber
      ? `https://wa.me/${targetNumber}?text=${pitchText}`
      : `https://wa.me/?text=${pitchText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DED1]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToAuditor}
            className="p-2 rounded-full bg-[#FFFFFF] border border-[#E4DED1] text-[#0B0D12] hover:bg-[#F5F1E8] transition-colors"
            title="Back to Auditor"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0B0D12] font-['Space_Grotesk']">
                Lead CRM & Audit Records
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FF5A1F] text-[#0B0D12] font-['Space_Grotesk']">
                {totalLeads} Captured
              </span>
            </div>
            <p className="text-xs text-[#8A8F98]">
              Saved locally in your browser (localStorage). Ready for instant WhatsApp outreach or CSV export.
            </p>
          </div>
        </div>

        {/* Action Buttons: Export CSV & Back */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => exportLeadsToCSV(leads)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#0B0D12] bg-[#FF5A1F] hover:bg-[#FF8A5B] transition-all font-['Space_Grotesk'] shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV ({totalLeads})</span>
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-[#A50E0E] bg-[#FFFFFF] hover:bg-[#FCE8E6] border border-[#E4DED1] transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear All</span>
          </button>

          <button
            type="button"
            onClick={onBackToAuditor}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#0B0D12] bg-[#FFFFFF] hover:bg-[#F5F1E8] border border-[#E4DED1] transition-colors font-['Space_Grotesk']"
          >
            <span>Back to Auditor →</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pipeline Leaked Revenue */}
        <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E4DED1] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">
            <span>Total Leaked Revenue</span>
            <TrendingDown className="w-4 h-4 text-[#FF5A1F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0D12] mt-2 font-['Space_Grotesk']">
            {formatINR(totalLeakedPipeline)}
            <span className="text-xs font-semibold text-[#8A8F98] ml-1">/mo</span>
          </div>
          <span className="text-[11px] text-[#FF5A1F] mt-1 block font-medium">
            Prime pitch angle for outreach
          </span>
        </div>

        {/* High Intent Leads */}
        <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E4DED1] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">
            <span>High-Intent Leads</span>
            <AimergerSpark className="w-4 h-4" color="#FF5A1F" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0D12] mt-2 font-['Space_Grotesk']">
            {highIntentLeads}
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">
            Severe leakage (Score &lt; 75)
          </span>
        </div>

        {/* Average Digital Health */}
        <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E4DED1] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">
            <span>Average Health Score</span>
            <Star className="w-4 h-4 text-[#8A8F98]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0D12] mt-2 font-['Space_Grotesk']">
            {avgScore}/100
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">
            Across scanned Indian businesses
          </span>
        </div>

        {/* Total Captured */}
        <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E4DED1] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8A8F98] uppercase tracking-wider font-['Space_Grotesk']">
            <span>Captured Records</span>
            <FileText className="w-4 h-4 text-[#8A8F98]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0B0D12] mt-2 font-['Space_Grotesk']">
            {totalLeads}
          </div>
          <span className="text-[11px] text-[#8A8F98] mt-1 block">
            Stored persistently in browser
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E4DED1] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8F98]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search business name, city, category…"
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-full border border-[#E4DED1] bg-[#F5F1E8]/50 focus:bg-[#FFFFFF] focus:outline-none focus:border-[#FF5A1F] text-[#0B0D12]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 font-['Space_Grotesk']">
          <span className="text-xs text-[#8A8F98] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {['All', 'New Lead', 'Contacted', 'Call Booked', 'Closed Won'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#0B0D12] text-[#F5F1E8]'
                  : 'bg-[#F5F1E8] text-[#4A4F58] hover:text-[#0B0D12]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#0B0D12] text-[#F5F1E8] font-['Space_Grotesk'] text-xs">
                <th className="py-4 px-4 font-medium whitespace-nowrap">Business / Shop</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">Lead Contact</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">City & Industry</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">Health Score</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">Monthly Loss</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">Google Rating</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">WhatsApp</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">Date Scanned</th>
                <th className="py-4 px-3 font-medium whitespace-nowrap">Follow-Up Status</th>
                <th className="py-4 px-4 text-right font-medium whitespace-nowrap">Outreach Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DED1]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[#8A8F98]">
                    No leads found matching your search. Run an audit to record leads automatically!
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F5F1E8]/40 transition-colors">
                    {/* Business Name */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0B0D12] font-['Space_Grotesk'] text-sm">
                        {lead.businessName}
                      </div>
                      {lead.websiteUrl && (
                        <a
                          href={lead.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#FF5A1F] hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span>{lead.websiteUrl.replace(/^https?:\/\//, '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {lead.auditType === 'compare' && (
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold bg-[#151923] text-[#F5F1E8] px-2 py-0.5 rounded-full font-['Space_Grotesk']">
                          Competitor Matchup
                        </span>
                      )}
                    </td>

                    {/* Lead Contact Info */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      {lead.leadName ? (
                        <div>
                          <div className="font-bold text-[#0B0D12] text-xs flex items-center gap-1 font-['Space_Grotesk']">
                            <User className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                            <span className="truncate max-w-[130px]">{lead.leadName}</span>
                          </div>
                          <div className="text-[11px] text-[#4A4F58] flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-[#11632E] shrink-0" />
                            <span className="font-mono">{lead.leadPhone}</span>
                          </div>
                          {lead.leadRole && (
                            <span className="text-[10px] text-[#8A8F98] block mt-0.5">{lead.leadRole}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#8A8F98] italic">Direct Scan</span>
                      )}
                    </td>

                    {/* City & Category */}
                    <td className="py-4 px-3">
                      <div className="font-medium text-[#0B0D12]">{lead.city}</div>
                      <div className="text-[11px] text-[#8A8F98] truncate max-w-[140px]">{lead.category}</div>
                    </td>

                    {/* Score */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-bold font-['Space_Grotesk']">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            lead.score >= 80
                              ? 'bg-[#E3F4E8] text-[#11632E]'
                              : lead.score >= 65
                              ? 'bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1]'
                              : 'bg-[#FCE8E6] text-[#A50E0E]'
                          }`}
                        >
                          {lead.score}/100
                        </span>
                        <span className="text-[11px] text-[#8A8F98]">({lead.grade})</span>
                      </div>
                    </td>

                    {/* Monthly Loss */}
                    <td className="py-4 px-3 font-bold text-[#A50E0E] font-['Space_Grotesk'] whitespace-nowrap">
                      {formatINR(lead.monthlyLoss)}
                      <span className="text-[10px] text-[#8A8F98] block font-normal">/ month</span>
                    </td>

                    {/* Google Rating */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-bold text-[#0B0D12] font-['Space_Grotesk']">
                        <Star className="w-3.5 h-3.5 fill-[#FF5A1F] text-[#FF5A1F]" />
                        <span>{lead.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[11px] text-[#8A8F98]">
                        {formatIndianNumber(lead.reviewCount)} rev ({lead.unansweredReviews} unreplied)
                      </span>
                    </td>

                    {/* WhatsApp */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-['Space_Grotesk'] leading-none whitespace-nowrap ${
                          lead.hasWhatsApp ? 'bg-[#E3F4E8] text-[#11632E]' : 'bg-[#FCE8E6] text-[#A50E0E]'
                        }`}
                      >
                        {lead.hasWhatsApp ? (
                          <>
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5 shrink-0" />
                            <span>Missing</span>
                          </>
                        )}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-3 text-[#8A8F98] text-xs whitespace-nowrap">
                      {lead.formattedDate}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="relative inline-flex items-center">
                        <select
                          value={lead.followUpStatus}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                          className={`text-xs font-bold rounded-full pl-3 pr-7 py-1.5 border appearance-none transition-all cursor-pointer font-['Space_Grotesk'] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 ${
                            lead.followUpStatus === 'Call Booked'
                              ? 'bg-[#E3F4E8] text-[#11632E] border-[#B7E1CD]'
                              : lead.followUpStatus === 'Contacted'
                              ? 'bg-[#F5F1E8] text-[#0B0D12] border-[#E4DED1]'
                              : lead.followUpStatus === 'Closed Won'
                              ? 'bg-[#FF5A1F] text-[#0B0D12] border-[#FF5A1F]'
                              : 'bg-[#FFFFFF] text-[#FF5A1F] border-[#FF5A1F]/30'
                          }`}
                        >
                          <option value="New Lead">New Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Call Booked">Call Booked</option>
                          <option value="Closed Won">Closed Won</option>
                          <option value="Archived">Archived</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-current opacity-70" />
                      </div>
                    </td>

                    {/* Outreach Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Click WhatsApp Pitch */}
                        <button
                          type="button"
                          onClick={() => handleDirectWhatsAppPitch(lead)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-[#0B0D12] bg-[#FF5A1F] hover:bg-[#FF8A5B] transition-all font-['Space_Grotesk'] shadow-2xs"
                          title="Open pre-filled pitch in WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Pitch</span>
                        </button>

                        {/* Notes button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setTempNotes(lead.notes || '');
                          }}
                          className="p-1.5 rounded-full text-[#8A8F98] hover:text-[#0B0D12] hover:bg-[#F5F1E8] transition-colors"
                          title="Add/Edit Lead Notes"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete single lead */}
                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id, lead.businessName)}
                          className="p-1.5 rounded-full text-[#8A8F98] hover:text-[#A50E0E] hover:bg-[#FCE8E6] transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Display note snippet if present */}
                      {lead.notes && (
                        <div className="text-[11px] text-[#8A8F98] italic truncate max-w-[200px] mt-1 text-right">
                          "{lead.notes}"
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes Modal */}
      {editingNotesId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D12]/60 backdrop-blur-xs p-4">
          <div className="bg-[#FFFFFF] rounded-[20px] p-6 max-w-md w-full border border-[#E4DED1] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4DED1]">
              <h3 className="font-bold text-base text-[#0B0D12] font-['Space_Grotesk']">
                Lead Notes & Owner Phone
              </h3>
              <button
                type="button"
                onClick={() => setEditingNotesId(null)}
                className="text-[#8A8F98] hover:text-[#0B0D12]"
              >
                ✕
              </button>
            </div>

            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              placeholder="e.g. Spoke with owner Ramesh on phone. Wants demo of WhatsApp bot on Friday. Contact: 9876543210..."
              rows={4}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/50 focus:bg-[#FFFFFF] focus:outline-none focus:border-[#FF5A1F] text-[#0B0D12]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingNotesId(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#8A8F98] hover:bg-[#F5F1E8]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveNotes(editingNotesId)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#FF5A1F] text-[#0B0D12] hover:bg-[#FF8A5B] font-['Space_Grotesk']"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
