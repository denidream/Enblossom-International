import React from 'react';
import { X, CheckCircle2, ChevronRight, Users, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquire,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#dfba73]/60 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img
            src={service.image}
            alt={service.titleJa}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09221b] via-[#09221b]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image bottom */}
          <div className="absolute bottom-5 left-6 right-6">
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#fbe7a4] uppercase font-semibold">
              {service.titleEn}
            </span>
            <h3 className="font-serif-jp text-2xl sm:text-3xl font-bold text-white mt-0.5">
              {service.titleJa}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h4 className="font-serif-jp text-sm sm:text-base font-bold text-[#142921] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c89e47]" />
              <span>事業概要</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#3b4740] leading-relaxed">
              {service.details.overview}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="bg-[#faf7ef] p-5 rounded-xl border border-[#e8deca]">
            <h4 className="font-serif-jp text-sm sm:text-base font-bold text-[#142921] mb-3">
              主なサービス内容 & 特長
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#414d46]">
              {service.details.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div>
            <h4 className="font-serif-jp text-sm sm:text-base font-bold text-[#142921] mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#c89e47]" />
              <span>対象となるお客様</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#4d5c54] leading-relaxed bg-[#f2f8f5] p-3.5 rounded-lg border border-[#c4e5d7]">
              {service.details.targetAudience}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#fbf9f4] border-t border-[#e8dfcf] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm text-[#67776f] hover:text-[#183126] px-4 py-2 font-medium"
          >
            閉じる
          </button>
          <button
            onClick={() => {
              onClose();
              onInquire(service.titleJa);
            }}
            className="bg-gold-btn text-[#15231c] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-transform"
          >
            <span>この事業について相談する</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
