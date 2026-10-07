import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Compass } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AboutUsProps {
  onOpenContactModal: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenContactModal }) => {
  const { content } = useContent();
  const { about } = content;
  const [showFullMission, setShowFullMission] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#fffefc] relative overflow-hidden border-t border-[#f0ebd8]">
      {/* Decorative Background Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#dfba73]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: About Us Text & Philosophy */}
          <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#8e6e2f] uppercase font-semibold">
              {about.sectionEn}
            </span>
            <h2 className="font-serif-jp text-3xl sm:text-4xl font-bold text-[#142921] mt-1 tracking-wider">
              {about.sectionJa}
            </h2>
            <div className="w-12 h-[2px] bg-[#c89e47] my-4" />

            <p className="font-serif-jp text-[#3e4842] text-sm sm:text-base leading-relaxed tracking-wide mb-6">
              {about.description}
            </p>

            <button
              onClick={() => setShowFullMission(!showFullMission)}
              className="inline-flex items-center gap-2 bg-[#0d3428] hover:bg-[#144837] text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer group"
            >
              <span>{showFullMission ? '閉じる' : about.moreButtonText}</span>
              <ChevronRight className={`w-4 h-4 text-[#e3c078] transition-transform duration-300 ${showFullMission ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
            </button>

            {/* Expanded Mission & Values */}
            {showFullMission && (
              <div className="mt-6 p-5 bg-[#faf6ee] rounded-xl border border-[#dfba73]/40 text-left text-xs sm:text-sm text-[#38433d] space-y-3 animate-in fade-in duration-300 shadow-inner">
                <h4 className="font-serif-jp font-bold text-[#142921] text-sm flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#a88031]" />
                  <span>私たちのミッション</span>
                </h4>
                <p className="leading-relaxed">
                  国境や言語の壁を越え、日本の繊細で高い品質・おもてなしの心と、インドネシアの活力・温かな人間味を融合。持続可能で互いに成長できるパートナーシップを紡ぎ出します。
                </p>
                <div className="pt-2 border-t border-[#dfba73]/20 flex flex-col gap-1.5 text-xs text-[#526058]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>相互理解と異文化への深いリスペクト</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>一過性でない、息の長い信頼関係づくり</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Center Column: Glowing Earth Globe with Seedling & Blossoming Connections */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center relative py-4">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
              {/* Soft Radial Backlight Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#10b981]/20 via-[#fcd34d]/25 to-transparent rounded-full blur-2xl" />

              {/* High-Resolution Seedling Earth Image */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={about.earthImage}
                  alt="Planet Earth with green blooming seedling"
                  className="w-full h-full object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Curved Blossoming Connections Script in Gold */}
              <div className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 transform rotate-[-15deg] pointer-events-none select-none">
                <span className="font-script italic text-2xl sm:text-3xl text-gold-metallic font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Blossoming
                  <br />
                  Connections
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Enblossomだからできること (3 Numbered Benefit Points) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="text-center lg:text-left mb-6">
              <h3 className="font-serif-jp text-xl sm:text-2xl font-bold text-[#142921] tracking-wider">
                {about.advantagesHeading}
              </h3>
              <div className="w-12 h-[2px] bg-[#c89e47] mt-2 mx-auto lg:mx-0" />
            </div>

            <div className="space-y-4 sm:space-y-5">
              {about.advantages.map((adv) => (
                <div
                  key={adv.number}
                  className="bg-[#faf7f0] hover:bg-white rounded-xl p-4 sm:p-5 border border-[#ece4d5] hover:border-[#dfba73] shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
                >
                  {/* Golden Circle Number (01, 02, 03) */}
                  <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#c89e47] via-[#e2be72] to-[#a3792a] text-[#13231a] flex items-center justify-center font-cinzel font-bold text-base sm:text-lg shadow-md group-hover:scale-105 transition-transform">
                    {adv.number}
                  </div>

                  {/* Text Content */}
                  <div>
                    <h4 className="font-serif-jp text-sm sm:text-base font-bold text-[#142921] group-hover:text-[#9c7526] transition-colors leading-snug">
                      {adv.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4d5952] mt-1.5 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
