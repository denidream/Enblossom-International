import React from 'react';
import { Plane, Package, Handshake, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { useContent } from '../context/ContentContext';

interface OurBusinessProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenContactModalWithService: (serviceName: string) => void;
}

export const OurBusiness: React.FC<OurBusinessProps> = ({
  onSelectService,
  onOpenContactModalWithService,
}) => {
  const { content } = useContent();
  const services = content.services;

  // Render authentic icon badge overlay on the bottom-left of each card's image
  const renderIconBadge = (iconType: ServiceItem['iconType']) => {
    switch (iconType) {
      case 'tourism':
        return (
          <div className="w-12 h-12 rounded-full bg-[#0d3428] border-2 border-[#dfba73] flex items-center justify-center text-[#edd08d] shadow-lg">
            <Plane className="w-6 h-6 transform -rotate-45" />
          </div>
        );
      case 'halal':
        return (
          <div className="w-12 h-12 rounded-full bg-[#0a382a] border-2 border-[#dfba73] flex flex-col items-center justify-center shadow-lg text-white">
            <span className="text-[10px] font-bold tracking-tight text-[#4ade80] leading-none">حلال</span>
            <span className="text-[9px] font-extrabold tracking-widest text-[#facc15] leading-none mt-0.5">HALAL</span>
          </div>
        );
      case 'export':
        return (
          <div className="w-12 h-12 rounded-full bg-[#0d3428] border-2 border-[#dfba73] flex items-center justify-center text-[#edd08d] shadow-lg">
            <Package className="w-6 h-6" />
          </div>
        );
      case 'matching':
        return (
          <div className="w-12 h-12 rounded-full bg-[#0d3428] border-2 border-[#dfba73] flex items-center justify-center text-[#edd08d] shadow-lg">
            <Handshake className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <section id="business" className="py-16 sm:py-24 bg-[#faf8f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#8e6e2f] uppercase font-semibold">
            OUR BUSINESS
          </p>
          <h2 className="font-serif-jp text-2xl sm:text-3xl md:text-4xl font-bold text-[#142921] mt-1 tracking-wider">
            事業内容
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#c89e47] to-transparent mx-auto mt-3" />
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group bg-white rounded-xl overflow-hidden border border-[#e5dcce] hover:border-[#c89e47] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.titleJa}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Dark Gradient at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Circular Icon Badge (Positioned at bottom-left corner of the image) */}
                  <div className="absolute bottom-2.5 left-3">
                    {renderIconBadge(service.iconType)}
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 pt-4">
                  {/* Service Title */}
                  <div className="mb-3 text-center sm:text-left">
                    <h3 className="font-serif-jp text-lg font-bold text-[#142921] group-hover:text-[#9c7526] transition-colors leading-tight">
                      {service.titleJa}
                    </h3>
                    <p className="font-cinzel text-[11px] font-semibold text-[#8b734b] tracking-wider mt-0.5">
                      {service.titleEn}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-1.5 text-xs text-[#444f48] leading-relaxed pl-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#a47b2c] text-xs font-bold leading-none mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Footer with Arrow */}
              <div className="p-4 pt-1 border-t border-[#f2ede4] flex items-center justify-between text-xs text-[#a47b2c] font-medium group-hover:text-[#6a4f15] transition-colors">
                <span className="group-hover:underline">詳細・事例を見る</span>
                <span className="w-7 h-7 rounded-full bg-[#f8f4ec] group-hover:bg-[#dfba73] group-hover:text-[#182a22] flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Business Consultation Banner below cards */}
        <div className="mt-12 bg-gradient-to-r from-[#0d2e24] via-[#103a2e] to-[#0d2e24] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#c89e47]/40 shadow-md">
          <div className="text-center md:text-left">
            <h4 className="font-serif-jp text-lg sm:text-xl font-bold text-[#fae59e]">
              日本 × インドネシアの事業展開に関するご相談を承ります
            </h4>
            <p className="text-xs sm:text-sm text-[#bedad0] mt-1.5 leading-relaxed max-w-2xl">
              ハラール市場開拓、インドネシア企業とのアライアンス、現地視察ツアーの手配など、専任スタッフが丁寧にお応えします。
            </p>
          </div>
          <button
            onClick={() => onOpenContactModalWithService('事業総合相談')}
            className="shrink-0 bg-gold-btn text-[#15231c] font-bold text-xs sm:text-sm px-6 py-3 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg"
          >
            事業に関するお問い合わせ &gt;
          </button>
        </div>
      </div>
    </section>
  );
};
