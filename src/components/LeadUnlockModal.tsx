import React, { useState } from 'react';
import { User, Phone, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building2, Lock, Flame } from 'lucide-react';
import { AimergerSpark, AimergerIcon } from './AimergerBrand';

interface LeadUnlockModalProps {
  businessName: string;
  city: string;
  category?: string;
  overallScore?: number;
  monthlyLoss?: number;
  onUnlock: (leadData: { name: string; phone: string; role: string }) => void;
}

const ROLES = [
  'Business Owner / Founder',
  'Partner / Co-founder',
  'General Manager',
  'Marketing Head',
];

export const LeadUnlockModal: React.FC<LeadUnlockModalProps> = ({
  businessName,
  city,
  category,
  overallScore,
  monthlyLoss,
  onUnlock,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    if (!trimmedName || trimmedName.length < 2) {
      setError('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const formattedPhone = cleanPhone.length === 10 ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}` : `+${cleanPhone}`;

    setTimeout(() => {
      onUnlock({
        name: trimmedName,
        phone: formattedPhone,
        role,
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0D12]/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] rounded-[24px] border border-[#E4DED1] shadow-2xl overflow-hidden my-8">
        {/* Top Ember Glow Banner */}
        <div className="bg-[#0B0D12] text-[#F5F1E8] px-6 py-5 sm:px-8 border-b border-[#232836]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AimergerSpark className="w-4 h-4" color="#FF5A1F" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF5A1F] font-['Space_Grotesk']">
                ✦ Live AI Audit Complete
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#151923] text-[#F5F1E8] border border-[#2a3040] font-['Space_Grotesk']">
              <Lock className="w-3 h-3 text-[#FF5A1F]" /> 1-Step Free Unlock
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] mt-2 text-[#F5F1E8]">
            Your Business X-Ray is Ready
          </h2>
          <p className="text-xs sm:text-sm text-[#b9bdc6] mt-1 font-['Inter']">
            Comprehensive audit generated for <strong className="text-[#FF5A1F]">{businessName}</strong> ({city}).
          </p>
        </div>

        {/* Teaser Preview Box with Locked Stats */}
        <div className="px-6 sm:px-8 pt-5 pb-2 bg-[#F5F1E8]/60 border-b border-[#E4DED1]">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
            {/* Health Score Teaser */}
            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E4DED1] relative overflow-hidden">
              <span className="text-[10px] text-[#8A8F98] uppercase font-bold tracking-wider block font-['Space_Grotesk']">
                Health Score
              </span>
              <div className="text-lg sm:text-xl font-black text-[#0B0D12] mt-0.5 font-['Space_Grotesk']">
                {overallScore ? `${overallScore}/100` : '✦✦/100'}
              </div>
              <span className="text-[10px] text-[#11632E] font-semibold block">Calculated</span>
            </div>

            {/* Monthly Loss Teaser */}
            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E4DED1] relative overflow-hidden">
              <span className="text-[10px] text-[#8A8F98] uppercase font-bold tracking-wider block font-['Space_Grotesk']">
                Monthly Leak
              </span>
              <div className="text-lg sm:text-xl font-black text-[#A50E0E] mt-0.5 font-['Space_Grotesk']">
                ₹?,??,???
              </div>
              <span className="text-[10px] text-[#A50E0E] font-semibold block">5 Root Causes</span>
            </div>

            {/* AI Automations Teaser */}
            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E4DED1] relative overflow-hidden">
              <span className="text-[10px] text-[#8A8F98] uppercase font-bold tracking-wider block font-['Space_Grotesk']">
                AI Roadmap
              </span>
              <div className="text-lg sm:text-xl font-black text-[#0B0D12] mt-0.5 font-['Space_Grotesk']">
                5 Fixes
              </div>
              <span className="text-[10px] text-[#FF5A1F] font-semibold block">Custom Drafted</span>
            </div>
          </div>
        </div>

        {/* Lead Capture Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="text-xs sm:text-sm text-[#4A4F58]">
            Enter your name and WhatsApp number to unlock your complete report, review replies, and competitor intelligence.
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#FCE8E6] border border-[#F5C2C7] text-[#A50E0E] text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1.5 font-['Space_Grotesk']">
              Your Full Name <span className="text-[#FF5A1F]">*</span>
            </label>
            <div className="relative rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Sharma"
                required
                className="block w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/30 focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-all text-[#0B0D12] font-medium"
              />
            </div>
          </div>

          {/* WhatsApp Phone Number */}
          <div>
            <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1.5 font-['Space_Grotesk']">
              WhatsApp Number <span className="text-[#FF5A1F]">*</span>
            </label>
            <div className="relative rounded-xl flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="text-xs font-bold text-[#0B0D12] bg-[#E4DED1] px-2 py-1 rounded-md font-['Space_Grotesk']">
                  🇮🇳 +91
                </span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                maxLength={14}
                required
                className="block w-full pl-22 pr-4 py-3 text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/30 focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-all text-[#0B0D12] font-medium"
              />
            </div>
            <span className="text-[11px] text-[#8A8F98] mt-1 block">
              We send your report link and action items straight to WhatsApp.
            </span>
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1.5 font-['Space_Grotesk']">
              Your Role in Business
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left font-['Space_Grotesk'] border ${
                    role === r
                      ? 'bg-[#0B0D12] text-[#F5F1E8] border-[#0B0D12]'
                      : 'bg-[#F5F1E8] text-[#4A4F58] border-[#E4DED1] hover:border-[#FF5A1F]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Unlock Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full font-bold text-[#0B0D12] text-sm sm:text-base bg-[#FF5A1F] hover:bg-[#FF8A5B] shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] font-['Space_Grotesk'] disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4 text-[#0B0D12]" />
              <span>{isSubmitting ? 'Unlocking X-Ray…' : 'Unlock Full Free Report →'}</span>
            </button>
          </div>

          {/* Privacy & Trust Footnote */}
          <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-[#8A8F98]">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#11632E]" />
              100% Free Audit
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#11632E]" />
              Zero Spam Policy
            </span>
            <span>•</span>
            <span>Instant Access</span>
          </div>
        </form>
      </div>
    </div>
  );
};
