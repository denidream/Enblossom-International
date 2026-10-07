import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const OurTeam: React.FC = () => {
  const { content } = useContent();
  const { team, galleryStrip } = content;

  return (
    <section id="team" className="py-16 sm:py-24 bg-[#faf8f2] relative overflow-hidden">
      {/* Decorative Golden Lotus Background Watermarks */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" stroke="#aa771c" strokeWidth="2">
          <circle cx="100" cy="100" r="90" />
          <path d="M 50 140 C 70 80 130 80 150 140 Z" />
          <path d="M 80 150 C 90 90 110 90 120 150 Z" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" stroke="#aa771c" strokeWidth="2">
          <circle cx="100" cy="100" r="90" />
          <path d="M 50 140 C 70 80 130 80 150 140 Z" />
          <path d="M 80 150 C 90 90 110 90 120 150 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#8e6e2f] uppercase font-semibold">
            {team.sectionEn}
          </p>
          <h2 className="font-serif-jp text-2xl sm:text-3xl md:text-4xl font-bold text-[#142921] mt-1 tracking-wider">
            {team.sectionJa}
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#c89e47] to-transparent mx-auto mt-3" />
        </div>

        {/* Co-CEOs Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {team.members.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 sm:p-9 border border-[#e8dfcf] hover:border-[#dfba73] shadow-sm hover:shadow-xl transition-all duration-300 text-center relative group"
            >
              <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-widest text-[#a88031] uppercase">
                {member.role}
              </span>
              <h3 className="font-serif-jp text-2xl sm:text-3xl font-bold text-[#152a22] mt-1 tracking-wider">
                {member.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#73857b] tracking-wider mt-0.5">
                {member.furigana}
              </p>

              <div className="w-10 h-[1.5px] bg-[#dfba73] mx-auto my-4" />

              {/* Direct Contact Links */}
              <div className="space-y-3 pt-1">
                <a
                  href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-3 text-sm sm:text-base font-semibold text-[#183126] hover:text-[#9c7526] transition-colors py-1 group/link"
                >
                  <span className="w-9 h-9 rounded-full bg-[#0d3428] text-[#edd08d] flex items-center justify-center shadow group-hover/link:bg-[#c89e47] group-hover/link:text-[#0d3428] transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="tracking-wider">{member.phone}</span>
                </a>

                <div className="block">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-3 text-xs sm:text-sm text-[#38433e] hover:text-[#9c7526] transition-colors py-1 group/link"
                  >
                    <span className="w-9 h-9 rounded-full bg-[#0d3428] text-[#edd08d] flex items-center justify-center shadow group-hover/link:bg-[#c89e47] group-hover/link:text-[#0d3428] transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="tracking-wide underline-offset-2 hover:underline">{member.email}</span>
                  </a>
                </div>
              </div>

              {member.note && (
                <p className="mt-4 text-xs text-[#5f6f67] leading-relaxed border-t border-[#f4ede2] pt-3">
                  {member.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Photo Strip (matching the original 5-photo strip right above contact) */}
      <div className="mt-14 sm:mt-20 border-y-2 border-[#dfba73]/40">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-28 sm:h-36 lg:h-44 overflow-hidden">
          {galleryStrip.map((item, index) => (
            <div key={index} className="relative group overflow-hidden border-r border-[#dfba73]/20 last:border-r-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-2.5 sm:p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-[11px] sm:text-xs font-serif-jp tracking-wider truncate">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
