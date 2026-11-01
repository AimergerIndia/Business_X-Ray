import React, { useState } from 'react';
import { Search, MapPin, Globe, Instagram, Building2, ArrowRight, Zap, ChevronDown } from 'lucide-react';
import { AuditRequestPayload, Language } from '../types/audit';
import { AimergerSpark } from './AimergerBrand';

interface SearchAuditFormProps {
  onStartAudit: (payload: AuditRequestPayload) => void;
  isLoading: boolean;
  currentLanguage: Language;
}

const POPULAR_EXAMPLES = [
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
];

const POPULAR_CITIES = [
  'Mumbai',
  'Bengaluru',
  'Delhi NCR',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Ahmedabad',
  'Kolkata',
  'Jaipur',
  'Chandigarh',
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

export const SearchAuditForm: React.FC<SearchAuditFormProps> = ({
  onStartAudit,
  isLoading,
  currentLanguage,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setErrorMsg('Please enter your business or shop name.');
      return;
    }
    if (!city.trim()) {
      setErrorMsg('Please enter the city or neighborhood in India (e.g., Koramangala, Bengaluru).');
      return;
    }
    setErrorMsg('');
    onStartAudit({
      businessName: businessName.trim(),
      city: city.trim(),
      websiteUrl: websiteUrl.trim(),
      instagramHandle: instagramHandle.trim(),
      category,
      language: currentLanguage,
    });
  };

  const handleSelectExample = (ex: typeof POPULAR_EXAMPLES[0]) => {
    setBusinessName(ex.name);
    setCity(ex.city);
    setCategory(ex.category);
    setWebsiteUrl(ex.website || '');
    setInstagramHandle(ex.instagram || '');
    setErrorMsg('');
    onStartAudit({
      businessName: ex.name,
      city: ex.city,
      websiteUrl: ex.website || '',
      instagramHandle: ex.instagram || '',
      category: ex.category,
      language: currentLanguage,
    });
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20 bg-[#F5F1E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Eyebrow & Headline */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4DED1] text-xs font-semibold uppercase tracking-[0.14em] text-[#FF5A1F] mb-4 shadow-2xs font-['Space_Grotesk']">
            <AimergerSpark className="w-3.5 h-3.5" color="#FF5A1F" />
            <span>Free AI Audit · Indian Small Businesses</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-bold text-[#0B0D12] tracking-tight leading-[1.08] font-['Space_Grotesk']">
            Business <span className="text-[#FF5A1F]">X-Ray</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#4A4F58] max-w-2xl mx-auto font-normal">
            Real-time AI audit of your Google Business Profile, local search presence, and conversion bottlenecks. Discover how many ₹ you are losing each month and 5 custom AI automations to plug it.
          </p>
        </div>

        {/* Audit Form Card (20px radius, Paper background with Line border) */}
        <div className="bg-[#FFFFFF] rounded-[20px] shadow-sm border border-[#E4DED1] p-6 sm:p-9 transition-all">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-[#FCE8E6] border border-[#F5C2C7] text-[#A50E0E] text-xs sm:text-sm font-medium">
                <strong>Notice:</strong> {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Business Name */}
              <div>
                <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-2 font-['Space_Grotesk']">
                  Business / Store / Clinic Name <span className="text-[#FF5A1F]">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Clove Dental, Chai Point, Dr. Sharma Clinic"
                    disabled={isLoading}
                    className="block w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/40 focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-all text-[#0B0D12] placeholder:text-[#8A8F98]"
                  />
                </div>
              </div>

              {/* City / Locality */}
              <div>
                <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-2 font-['Space_Grotesk']">
                  City / Locality in India <span className="text-[#FF5A1F]">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Indiranagar, Bengaluru or Bandra, Mumbai"
                    disabled={isLoading}
                    className="block w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/40 focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-all text-[#0B0D12] placeholder:text-[#8A8F98]"
                  />
                </div>
              </div>
            </div>

            {/* Quick city pills */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-xs text-[#8A8F98] font-medium mr-1">Quick city:</span>
              {POPULAR_CITIES.slice(0, 6).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity((prev) => (prev ? `${prev.split(',')[0]}, ${c}` : c))}
                  className="px-2.5 py-1 text-xs rounded-full bg-[#F5F1E8] text-[#0B0D12] border border-[#E4DED1] hover:border-[#FF5A1F] transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Business Category */}
            <div>
              <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-2 font-['Space_Grotesk']">
                Industry / Category
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

            {/* Advanced toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-semibold text-[#0B0D12] hover:text-[#FF5A1F] flex items-center gap-1 transition-colors"
              >
                <span>{showAdvanced ? '− Hide website & Instagram fields' : '+ Add website URL or Instagram (Optional for deeper scan)'}</span>
              </button>
            </div>

            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E4DED1]">
                {/* Website */}
                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-2 font-['Space_Grotesk']">
                    Website URL (Optional)
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                      <Globe className="h-4 w-4" />
                    </div>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourbusiness.in"
                      disabled={isLoading}
                      className="block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/40 focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-all text-[#0B0D12] placeholder:text-[#8A8F98]"
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-2 font-['Space_Grotesk']">
                    Instagram Handle (Optional)
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                      <Instagram className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="@yourbusiness"
                      disabled={isLoading}
                      className="block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-[#E4DED1] bg-[#F5F1E8]/40 focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/30 focus:border-[#FF5A1F] transition-all text-[#0B0D12] placeholder:text-[#8A8F98]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Action Button: Official Ember CTA button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-full font-bold text-[#0B0D12] text-base bg-[#FF5A1F] hover:bg-[#FF8A5B] shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none font-['Space_Grotesk']"
              >
                <AimergerSpark className="w-5 h-5" color="#0B0D12" />
                <span>Run Free AI Business X-Ray Audit</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Example Presets */}
          <div className="mt-8 pt-6 border-t border-[#E4DED1]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A8F98] mb-3 font-['Space_Grotesk']">
              <Zap className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>Or test with verified Indian business examples:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_EXAMPLES.map((ex) => (
                <button
                  key={ex.name}
                  type="button"
                  onClick={() => handleSelectExample(ex)}
                  disabled={isLoading}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#F5F1E8] text-[#0B0D12] hover:bg-[#0B0D12] hover:text-[#F5F1E8] border border-[#E4DED1] transition-all flex items-center gap-1.5"
                >
                  <span>{ex.name}</span>
                  <span className="text-[#8A8F98] font-normal">({ex.city.split(',')[1] || ex.city})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
