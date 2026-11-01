import React from 'react';

interface AimergerSparkProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * The official 8-arm star spark from aimerger.in/brand/
 * "Where your business and AI meet, there is a spark. That spark is Aimerger."
 */
export const AimergerSpark: React.FC<AimergerSparkProps> = ({
  className = 'w-4 h-4',
  size = 32,
  color = '#FF5A1F',
}) => {
  return (
    <svg
      role="img"
      aria-label="Aimerger Spark"
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} strokeWidth="5.5" strokeLinecap="round">
        <line x1="16.00" y1="16.00" x2="16.00" y2="4.00" />
        <line x1="16.00" y1="16.00" x2="24.49" y2="7.51" />
        <line x1="16.00" y1="16.00" x2="28.00" y2="16.00" />
        <line x1="16.00" y1="16.00" x2="24.49" y2="24.49" />
        <line x1="16.00" y1="16.00" x2="16.00" y2="28.00" />
        <line x1="16.00" y1="16.00" x2="7.51" y2="24.49" />
        <line x1="16.00" y1="16.00" x2="4.00" y2="16.00" />
        <line x1="16.00" y1="16.00" x2="7.51" y2="7.51" />
      </g>
    </svg>
  );
};

interface AimergerIconProps {
  className?: string;
  variant?: 'light' | 'dark' | 'ember';
}

/**
 * The official Aimerger mark:
 * Left chevron > (Your business) + Right chevron < (AI) + Center 8-arm star spark (Aimerger merge point)
 */
export const AimergerIcon: React.FC<AimergerIconProps> = ({
  className = 'w-10 h-10',
  variant = 'dark',
}) => {
  const chevronStroke = variant === 'dark' ? '#F5F1E8' : variant === 'light' ? '#0B0D12' : '#0B0D12';
  const starStroke = variant === 'ember' ? '#F5F1E8' : '#FF5A1F';
  const bgClass =
    variant === 'dark'
      ? 'bg-[#0B0D12]'
      : variant === 'light'
      ? 'bg-[#F5F1E8] border border-[#E4DED1]'
      : 'bg-[#FF5A1F]';

  return (
    <div
      className={`rounded-xl flex items-center justify-center p-2 shrink-0 ${bgClass} ${className}`}
    >
      <svg
        role="img"
        aria-label="Aimerger"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
      >
        {/* Left and Right chevrons merging inward */}
        <g fill="none" stroke={chevronStroke} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 16 L18 32 L6 48" />
          <path d="M58 16 L46 32 L58 48" />
        </g>
        {/* 8-arm spark in center */}
        <g stroke={starStroke} strokeWidth="3.2" strokeLinecap="round">
          <line x1="32.00" y1="32.00" x2="32.00" y2="25.50" />
          <line x1="32.00" y1="32.00" x2="36.60" y2="27.40" />
          <line x1="32.00" y1="32.00" x2="38.50" y2="32.00" />
          <line x1="32.00" y1="32.00" x2="36.60" y2="36.60" />
          <line x1="32.00" y1="32.00" x2="32.00" y2="38.50" />
          <line x1="32.00" y1="32.00" x2="27.40" y2="36.60" />
          <line x1="32.00" y1="32.00" x2="25.50" y2="32.00" />
          <line x1="32.00" y1="32.00" x2="27.40" y2="27.40" />
        </g>
      </svg>
    </div>
  );
};

interface AimergerLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const AimergerLogo: React.FC<AimergerLogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <AimergerIcon className="w-10 h-10" variant={isDark ? 'ember' : 'dark'} />
      <div>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-2xl font-bold tracking-tight font-['Space_Grotesk'] leading-none ${
              isDark ? 'text-[#F5F1E8]' : 'text-[#0B0D12]'
            }`}
          >
            Aimerger
          </span>
          <AimergerSpark className="w-3.5 h-3.5 -mt-2" color="#FF5A1F" />
        </div>
        {showTagline && (
          <p
            className={`text-[11px] font-medium tracking-tight ${
              isDark ? 'text-[#8A8F98]' : 'text-[#4A4F58]'
            }`}
          >
            AI that merges into your business
          </p>
        )}
      </div>
    </div>
  );
};
