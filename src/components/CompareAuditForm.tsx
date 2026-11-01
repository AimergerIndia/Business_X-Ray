import React, { useState } from 'react';
import { Search, MapPin, Globe, ArrowRight, Swords, Zap, Building2, ChevronDown } from 'lucide-react';
import { ComparisonRequestPayload, Language } from '../types/audit';
import { AimergerSpark } from './AimergerBrand';

interface CompareAuditFormProps {
  onStartComparison: (payload: ComparisonRequestPayload) => void;
  isLoading: boolean;
  currentLanguage: Language;
}

const POPULAR_RIVALRIES = [
  {
    nameA: 'Theobroma Patisserie',
    cityA: 'Bandra West, Mumbai',
    websiteA: 'https://theobroma.in',
    nameB: 'Le15 Patisserie',
    cityB: 'Bandra West, Mumbai',
    websiteB: 'https://le15.com',
    category: 'Bakery & Cafe / Food',
    label: 'Theobroma vs Le15 (Mumbai)',
  },
  {
    nameA: 'Clove Dental Clinic',
    cityA: 'Indiranagar, Bengaluru',
    websiteA: 'https://clovedental.in',
    nameB: 'Sabka Dentist',
    cityB: 'Indiranagar, Bengaluru',
    websiteB: 'https://sabkadentist.com',
    category: 'Dental Clinic / Healthcare',
    label: 'Clove Dental vs Sabka Dentist (Bengaluru)',
  },
  {
    nameA: 'Chai Point',
    cityA: 'Koramangala, Bengaluru',
    websiteA: 'https://chaipoint.com',
    nameB: 'Chaayos',
    cityB: 'Koramangala, Bengaluru',
    websiteB: 'https://chaayos.com',
    category: 'Quick Service Restaurant (QSR)',
    label: 'Chai Point vs Chaayos (Bengaluru)',
  },
  {
    nameA: 'Kailash Parbat Pure Veg',
    cityA: 'Kothrud, Pune',
    websiteA: 'https://kailashparbat.in',
    nameB: 'Haldiram\'s Sweets & Dining',
    cityB: 'Kothrud, Pune',
    websiteB: '',
    category: 'Casual Dining Restaurant',
    label: 'Kailash Parbat vs Haldiram\'s (Pune)',
  },
  {
    nameA: 'VLCC Salon & Wellness',
    cityA: 'South Extension, New Delhi',
    websiteA: 'https://vlcc.com',
    nameB: 'Looks Salon',
    cityB: 'South Extension, New Delhi',
    websiteB: '',
    category: 'Salon, Spa & Wellness',
    label: 'VLCC vs Looks Salon (Delhi)',
  },
];

const CATEGORIES = [
  'Dental Clinic / Healthcare',
  'Restaurant / Cafe / Bakery',
  'Salon, Spa & Wellness',
  'Retail Store & Supermarket',
  'Coaching Institute & Education',
  'Home & Interior Services',
  'Real Estate & Property',
  'Gym & Fitness Studio',
  'Automotive & Bike Repair',
  'Other Local Business',
];

export const CompareAuditForm: React.FC<CompareAuditFormProps> = ({
  onStartComparison,
  isLoading,
  currentLanguage,
}) => {
  // Business A (Your Business)
  const [nameA, setNameA] = useState('');
  const [cityA, setCityA] = useState('');
  const [websiteA, setWebsiteA] = useState('');

  // Business B (Competitor)
  const [nameB, setNameB] = useState('');
  const [cityB, setCityB] = useState('');
  const [websiteB, setWebsiteB] = useState('');

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameA.trim() || !cityA.trim()) {
      setErrorMsg('Please enter Business A (Your business name & city).');
      return;
    }
    if (!nameB.trim() || !cityB.trim()) {
      setErrorMsg('Please enter Business B (Competitor name & city).');
      return;
    }
    setErrorMsg('');
    onStartComparison({
      businessA: {
        name: nameA.trim(),
        city: cityA.trim(),
        websiteUrl: websiteA.trim(),
      },
      businessB: {
        name: nameB.trim(),
        city: cityB.trim(),
        websiteUrl: websiteB.trim(),
      },
      category,
      language: currentLanguage,
    });
  };

  const handleSelectRivalry = (rival: typeof POPULAR_RIVALRIES[0]) => {
    setNameA(rival.nameA);
    setCityA(rival.cityA);
    setWebsiteA(rival.websiteA);
    setNameB(rival.nameB);
    setCityB(rival.cityB);
    setWebsiteB(rival.websiteB);
    setCategory(rival.category);
    setErrorMsg('');
    onStartComparison({
      businessA: {
        name: rival.nameA,
        city: rival.cityA,
        websiteUrl: rival.websiteA,
      },
      businessB: {
        name: rival.nameB,
        city: rival.cityB,
        websiteUrl: rival.websiteB,
      },
      category: rival.category,
      language: currentLanguage,
    });
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20 bg-[#F5F1E8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Eyebrow & Headline */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4DED1] text-xs font-semibold uppercase tracking-[0.14em] text-[#FF5A1F] mb-4 shadow-2xs font-['Space_Grotesk']">
            <Swords className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Head-to-Head Competitor Battle</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-bold text-[#0B0D12] tracking-tight leading-[1.08] font-['Space_Grotesk']">
            Compare with <span className="text-[#FF5A1F]">Competitor</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#4A4F58] max-w-2xl mx-auto font-normal">
            Enter 2 local businesses to generate an instant side-by-side AI X-Ray report. Benchmark Google Maps rankings, review response speeds, customer sentiment, and reveal who is dominating your local area.
          </p>
        </div>

        {/* Dual Input Form Card */}
        <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-9 transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-[#FCE8E6] border border-[#F5C2C7] text-[#A50E0E] text-xs sm:text-sm font-medium">
                <strong>Notice:</strong> {errorMsg}
              </div>
            )}

            {/* Category Selector */}
            <div>
              <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-2 font-['Space_Grotesk']">
                Industry / Business Category
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                  <Building2 className="h-4 w-4" />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isLoading}
                  className="block w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/40 focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-all text-[#0B0D12] appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Side-by-Side Dual Column Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Business A (You) */}
              <div className="p-5 rounded-[16px] bg-[#F5F1E8]/50 border border-[#E4DED1] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4DED1]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0B0D12] text-[#F5F1E8] text-xs font-bold flex items-center justify-center font-['Space_Grotesk']">
                      A
                    </span>
                    <span className="text-sm font-bold text-[#0B0D12] font-['Space_Grotesk']">
                      Business 1 (Your Business)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0B0D12] text-[#F5F1E8] font-['Space_Grotesk']">
                    You
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1 font-['Space_Grotesk']">
                    Business Name <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8F98]">
                      <Search className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={nameA}
                      onChange={(e) => setNameA(e.target.value)}
                      placeholder="e.g. Clove Dental Clinic"
                      disabled={isLoading}
                      className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E4DED1] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] text-[#0B0D12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1 font-['Space_Grotesk']">
                    City / Neighborhood <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8F98]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={cityA}
                      onChange={(e) => setCityA(e.target.value)}
                      placeholder="e.g. Indiranagar, Bengaluru"
                      disabled={isLoading}
                      className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E4DED1] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] text-[#0B0D12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1 font-['Space_Grotesk']">
                    Website URL (Optional)
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8F98]">
                      <Globe className="h-4 w-4" />
                    </div>
                    <input
                      type="url"
                      value={websiteA}
                      onChange={(e) => setWebsiteA(e.target.value)}
                      placeholder="https://yourclinic.in"
                      disabled={isLoading}
                      className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E4DED1] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] text-[#0B0D12]"
                    />
                  </div>
                </div>
              </div>

              {/* Business B (Competitor) */}
              <div className="p-5 rounded-[16px] bg-[#F5F1E8]/50 border border-[#E4DED1] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4DED1]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FF5A1F] text-[#0B0D12] text-xs font-bold flex items-center justify-center font-['Space_Grotesk']">
                      B
                    </span>
                    <span className="text-sm font-bold text-[#0B0D12] font-['Space_Grotesk']">
                      Business 2 (Competitor)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF5A1F] text-[#0B0D12] font-['Space_Grotesk']">
                    Rival
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1 font-['Space_Grotesk']">
                    Competitor Name <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8F98]">
                      <Search className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={nameB}
                      onChange={(e) => setNameB(e.target.value)}
                      placeholder="e.g. Sabka Dentist"
                      disabled={isLoading}
                      className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E4DED1] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] text-[#0B0D12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1 font-['Space_Grotesk']">
                    City / Neighborhood <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8F98]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={cityB}
                      onChange={(e) => setCityB(e.target.value)}
                      placeholder="e.g. Indiranagar, Bengaluru"
                      disabled={isLoading}
                      className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E4DED1] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] text-[#0B0D12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-1 font-['Space_Grotesk']">
                    Website URL (Optional)
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8F98]">
                      <Globe className="h-4 w-4" />
                    </div>
                    <input
                      type="url"
                      value={websiteB}
                      onChange={(e) => setWebsiteB(e.target.value)}
                      placeholder="https://competitor.in"
                      disabled={isLoading}
                      className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E4DED1] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] text-[#0B0D12]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-full font-bold text-[#0B0D12] text-base bg-[#FF5A1F] hover:bg-[#FF8A5B] shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none font-['Space_Grotesk']"
              >
                <Swords className="w-5 h-5 text-[#0B0D12]" />
                <span>Run Head-to-Head AI Comparison</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Rivalry Presets */}
          <div className="mt-8 pt-6 border-t border-[#E4DED1]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A8F98] mb-3 font-['Space_Grotesk']">
              <Zap className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>Or test with verified local rivalry matchups:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_RIVALRIES.map((rival) => (
                <button
                  key={rival.label}
                  type="button"
                  onClick={() => handleSelectRivalry(rival)}
                  disabled={isLoading}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#F5F1E8] text-[#0B0D12] hover:bg-[#0B0D12] hover:text-[#F5F1E8] border border-[#E4DED1] transition-all flex items-center gap-1.5"
                >
                  <Swords className="w-3 h-3 text-[#FF5A1F]" />
                  <span>{rival.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
