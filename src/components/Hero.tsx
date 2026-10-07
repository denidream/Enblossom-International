import React from 'react';
import { Plane, ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface HeroProps {
  onOpenContactModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContactModal }) => {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section id="home" className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[740px] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-16">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Japan and Indonesia cultural bridge - Mount Fuji and Ulun Danu Bali"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.04]"
        />
        {/* Artistic Gradient Overlays to match the authentic flyer look */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061813]/60 via-transparent to-[#faf8f2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061a14]/40 via-transparent to-[#061a14]/40" />
        {/* Soft Golden Sunburst in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#fdf2b8]/25 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Decorative Dotted Flight Trajectory & Plane */}
      <div className="absolute top-16 sm:top-24 right-6 sm:right-16 lg:right-28 z-10 pointer-events-none select-none">
        <div className="flex flex-col items-end">
          {/* Airplane Icon */}
          <div className="flex items-center gap-2 transform -rotate-12 translate-x-2">
            <Plane className="w-8 h-8 sm:w-11 sm:h-11 text-[#e8c374] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
          </div>
          {/* Curved flight trajectory line */}
          <svg className="w-52 sm:w-72 h-24 overflow-visible" viewBox="0 0 200 80" fill="none">
            <path
              d="M 190 10 Q 110 50 10 75"
              stroke="#edd291"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeOpacity="0.85"
            />
          </svg>
          {/* Handwritten / Script Tagline on flight path */}
          <div className="transform -rotate-6 -mt-3 text-right">
            <span className="font-script italic text-xl sm:text-2xl lg:text-3xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] tracking-wide font-medium">
              {hero.bridgeText}
            </span>
          </div>
        </div>
      </div>

      {/* Center Main Content Card / Typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-6 sm:mt-10">
        {/* Frosted Elegant Container for ultra-crisp legibility */}
        <div className="inline-block bg-[#09221b]/45 backdrop-blur-[5px] border border-[#d4af37]/35 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          {/* Main Japanese Headline */}
          <h1 className="font-serif-jp text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[0.08em] leading-[1.3] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            <span className="block">{hero.mainHeadingLine1}</span>
            <span className="block mt-1 sm:mt-2 text-[#fffbf0]">{hero.mainHeadingLine2}</span>
          </h1>

          {/* Blossoming Connections Script with Ornament */}
          <div className="my-4 sm:my-6 flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#dfba73]" />
            <div className="flex items-center gap-2">
              <span className="text-[#e2be72] text-xs sm:text-sm">◆</span>
              <span className="font-script italic text-2xl sm:text-3xl lg:text-4xl text-gold-metallic font-semibold tracking-wide drop-shadow-md">
                {hero.taglineEn}
              </span>
              <span className="text-[#e2be72] text-xs sm:text-sm">◆</span>
            </div>
            <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#dfba73]" />
          </div>

          {/* Subheading in Japanese */}
          <p className="font-serif-jp text-base sm:text-lg md:text-xl text-[#f3eedd] leading-relaxed tracking-wider font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            <span className="block sm:inline">{hero.subHeadingLine1}</span>
            <span className="block sm:inline">{hero.subHeadingLine2}</span>
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#business"
              className="bg-transparent hover:bg-white/10 text-white border border-[#edd08e] text-xs sm:text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-200 tracking-wider shadow-sm"
            >
              事業内容を見る &darr;
            </a>
            <button
              onClick={onOpenContactModal}
              className="bg-gold-btn text-[#1a231d] font-bold text-xs sm:text-sm px-7 py-2.5 rounded-full cursor-pointer tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              無料相談・お問い合わせ &gt;
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <a
            href="#business"
            aria-label="Scroll to Our Business"
            className="animate-bounce text-[#c89e47] hover:text-[#eed08d] transition-colors p-2 bg-[#09221b]/40 rounded-full backdrop-blur-sm border border-[#c89e47]/30"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};
