import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon-only' | 'image';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string;
  brandName?: string;
  brandSub?: string;
  brandTagline?: string;
  brandJp?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md',
  customLogoUrl,
  brandName = 'ENBLOSSOM',
  brandSub = 'INTERNATIONAL',
  brandTagline = '~ Blossoming Connections ~',
  brandJp = 'ご縁を咲かせる',
}) => {
  // Size scaling factors
  const sizeMap = {
    sm: { icon: 42, imgHeight: 'h-10', title: 'text-xl', sub: 'text-[9px]', script: 'text-[11px]', jp: 'text-[11px]', spacing: 'gap-2.5' },
    md: { icon: 54, imgHeight: 'h-13', title: 'text-2xl lg:text-[28px]', sub: 'text-[10px] tracking-[0.28em]', script: 'text-[13px]', jp: 'text-[13px]', spacing: 'gap-3.5' },
    lg: { icon: 70, imgHeight: 'h-16', title: 'text-3xl lg:text-4xl', sub: 'text-xs tracking-[0.3em]', script: 'text-base', jp: 'text-base', spacing: 'gap-4' },
    xl: { icon: 90, imgHeight: 'h-20', title: 'text-4xl lg:text-5xl', sub: 'text-sm tracking-[0.32em]', script: 'text-lg', jp: 'text-lg', spacing: 'gap-5' },
  };

  const currentSize = sizeMap[size];

  // If user uploaded a custom logo PNG, render it!
  if (customLogoUrl) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={customLogoUrl}
          alt={brandName}
          className={`${currentSize.imgHeight} w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] transition-all`}
        />
      </div>
    );
  }

  // SVG Emblem component: Gold Globe Ring + Emerald Lotus
  const Emblem = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]"
      aria-hidden="true"
    >
      <defs>
        {/* Metallic Gold Gradients */}
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e197" />
          <stop offset="25%" stopColor="#c59837" />
          <stop offset="50%" stopColor="#fef3c7" />
          <stop offset="75%" stopColor="#aa771c" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>

        <linearGradient id="goldLines" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#fcf6ba" />
          <stop offset="100%" stopColor="#aa771c" stopOpacity="0.8" />
        </linearGradient>

        {/* Emerald Deep Globe Background */}
        <radialGradient id="emeraldBackdrop" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0b3829" />
          <stop offset="65%" stopColor="#06251b" />
          <stop offset="100%" stopColor="#02140e" />
        </radialGradient>

        {/* Jade / Emerald Lotus Petal Gradients */}
        <linearGradient id="petalCenter" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="35%" stopColor="#10b981" />
          <stop offset="85%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        <linearGradient id="petalLeft" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="40%" stopColor="#34d399" />
          <stop offset="80%" stopColor="#059669" />
          <stop offset="100%" stopColor="#044e37" />
        </linearGradient>

        <linearGradient id="petalRight" x1="90%" y1="0%" x2="10%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="40%" stopColor="#10b981" />
          <stop offset="80%" stopColor="#047857" />
          <stop offset="100%" stopColor="#022c1f" />
        </linearGradient>

        <filter id="lotusGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Golden Globe Rim */}
      <circle cx="100" cy="100" r="95" stroke="url(#goldRim)" strokeWidth="6" fill="url(#emeraldBackdrop)" />
      <circle cx="100" cy="100" r="90" stroke="url(#goldRim)" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Globe Meridian and Parallels (Golden Wireframe) */}
      <ellipse cx="100" cy="100" rx="90" ry="46" stroke="url(#goldLines)" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      <ellipse cx="100" cy="100" rx="46" ry="90" stroke="url(#goldLines)" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="url(#goldLines)" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="url(#goldLines)" strokeWidth="1" strokeOpacity="0.3" />

      {/* Inner subtle glow */}
      <circle cx="100" cy="108" r="45" fill="#10b981" fillOpacity="0.15" filter="url(#lotusGlow)" />

      {/* Layer 1: Outermost Lower Petals */}
      <path
        d="M 28 122 C 38 152 75 168 100 168 C 125 168 162 152 172 122 C 150 142 122 152 100 152 C 78 152 50 142 28 122 Z"
        fill="url(#petalCenter)"
        stroke="url(#goldRim)"
        strokeWidth="1.5"
      />

      {/* Layer 2: Side Wing Petals */}
      {/* Far Left Petal */}
      <path
        d="M 32 108 C 45 78 80 82 86 114 C 70 114 48 116 32 108 Z"
        fill="url(#petalLeft)"
        stroke="url(#goldRim)"
        strokeWidth="1.2"
      />
      {/* Far Right Petal */}
      <path
        d="M 168 108 C 155 78 120 82 114 114 C 130 114 152 116 168 108 Z"
        fill="url(#petalRight)"
        stroke="url(#goldRim)"
        strokeWidth="1.2"
      />

      {/* Layer 3: Mid-Tier Lotus Petals */}
      {/* Left Mid Petal */}
      <path
        d="M 48 90 C 62 50 96 64 94 125 C 80 125 60 112 48 90 Z"
        fill="url(#petalLeft)"
        stroke="url(#goldRim)"
        strokeWidth="1.5"
      />
      {/* Right Mid Petal */}
      <path
        d="M 152 90 C 138 50 104 64 106 125 C 120 125 140 112 152 90 Z"
        fill="url(#petalRight)"
        stroke="url(#goldRim)"
        strokeWidth="1.5"
      />

      {/* Layer 4: Upper Graceful Inner Petals */}
      <path
        d="M 70 65 C 85 36 100 42 100 95 C 92 88 80 78 70 65 Z"
        fill="url(#petalLeft)"
        stroke="url(#goldRim)"
        strokeWidth="1.5"
      />
      <path
        d="M 130 65 C 115 36 100 42 100 95 C 108 88 120 78 130 65 Z"
        fill="url(#petalRight)"
        stroke="url(#goldRim)"
        strokeWidth="1.5"
      />

      {/* Center Blooming Heart / Core Bud with Swirl */}
      <path
        d="M 100 35 C 108 55 116 80 108 120 C 100 138 90 148 100 156 C 106 150 112 136 116 115 C 122 85 114 55 100 35 Z"
        fill="url(#petalCenter)"
        stroke="url(#goldRim)"
        strokeWidth="1.8"
      />

      {/* Golden Lotus Stem / Ribbon Accent at Base */}
      <path
        d="M 96 152 C 90 140 85 130 92 110 C 94 105 100 105 102 112 C 104 125 99 142 104 158 C 101 156 98 154 96 152 Z"
        fill="url(#goldRim)"
      />

      {/* Delicate Golden Sparkle at Apex */}
      <circle cx="100" cy="35" r="3" fill="#fef3c7" stroke="#aa771c" strokeWidth="0.8" />
    </svg>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <Emblem />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${currentSize.spacing} select-none ${className}`}>
      {/* Left Lotus Globe Emblem */}
      <Emblem />

      {/* Right Brand Typography */}
      <div className="flex flex-col justify-center text-left">
        {/* Main Title: ENBLOSSOM */}
        <div className="flex items-center">
          <span
            className={`font-cinzel font-bold tracking-[0.06em] leading-none ${currentSize.title} text-gold-metallic drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}
          >
            {brandName}
          </span>
        </div>

        {/* Golden Divider Line with Centered Bead */}
        <div className="relative flex items-center my-1 w-full max-w-[280px]">
          <div className="h-[1px] w-full bg-gradient-to-r from-[#aa771c] via-[#fef3c7] to-[#aa771c] opacity-80" />
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-b from-[#fef3c7] to-[#aa771c] shadow-[0_0_4px_#fef3c7]" />
        </div>

        {/* INTERNATIONAL */}
        <div className="flex items-center justify-between">
          <span
            className={`font-cinzel font-semibold uppercase ${currentSize.sub} text-gold-metallic opacity-95`}
          >
            {brandSub}
          </span>
        </div>

        {/* Subtitles: ~ Blossoming Connections ~ & ご縁を咲かせる */}
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`font-script italic font-semibold ${currentSize.script} text-[#eed48f] tracking-wide`}
          >
            {brandTagline}
          </span>
        </div>
        <div className="mt-0.5">
          <span
            className={`font-serif-jp font-medium ${currentSize.jp} text-gold-metallic tracking-widest`}
          >
            {brandJp}
          </span>
        </div>
      </div>
    </div>
  );
};
