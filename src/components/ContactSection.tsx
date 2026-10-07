import React from 'react';
import { Phone, Mail, Globe, MapPin, ExternalLink, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';

interface ContactSectionProps {
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContactModal }) => {
  const { content, setIsLoginModalOpen, isAdminLoggedIn, setIsAdminPanelOpen } = useContent();
  const { contact, branding } = content;

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <footer id="contact" className="bg-[#071c16] text-white relative overflow-hidden border-t-2 border-[#dfba73]">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-[#103b2e]/30 via-transparent to-transparent pointer-events-none" />

      {/* Main Contact Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Title & Intro Description */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#e3c078] uppercase font-semibold">
              CONTACT
            </span>
            <h2 className="font-serif-jp text-2xl sm:text-3xl font-bold text-white mt-0.5 tracking-wider">
              お問い合わせ
            </h2>
            <div className="w-12 h-[2px] bg-[#dfba73] my-3 mx-auto lg:mx-0" />
            <p className="text-xs sm:text-sm text-[#bed5cb] leading-relaxed tracking-wide">
              {contact.description ||
                '企業視察・工場見学・医療ツーリズム・ハラール対応・海外展開・輸出入・ビジネスマッチングなど、まずはお気軽にご相談ください。'}
            </p>
          </div>

          {/* Center Column: Phone, Email, Website */}
          <div className="lg:col-span-4 space-y-3.5 border-y lg:border-y-0 lg:border-x border-[#1a4437] py-6 lg:py-0 lg:px-6">
            {/* Phone Numbers */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#11382c] border border-[#dfba73]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#eed08d]">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm space-y-1">
                <div>
                  <a
                    href={contact.phone1.link}
                    className="hover:text-[#fae59e] transition-colors font-medium tracking-wider"
                  >
                    {contact.phone1.number}
                  </a>
                  {contact.phone1.label && (
                    <span className="text-[#88ada0] ml-1 text-xs">({contact.phone1.label})</span>
                  )}
                </div>
                <div>
                  <a
                    href={contact.phone2.link}
                    className="hover:text-[#fae59e] transition-colors font-medium tracking-wider"
                  >
                    {contact.phone2.number}
                  </a>
                  {contact.phone2.label && (
                    <span className="text-[#88ada0] ml-1 text-xs">({contact.phone2.label})</span>
                  )}
                </div>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#11382c] border border-[#dfba73]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#eed08d]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm space-y-1">
                <div>
                  <a
                    href={`mailto:${contact.email1}`}
                    className="hover:text-[#fae59e] transition-colors hover:underline tracking-wide"
                  >
                    {contact.email1}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${contact.email2}`}
                    className="hover:text-[#fae59e] transition-colors hover:underline tracking-wide"
                  >
                    {contact.email2}
                  </a>
                </div>
              </div>
            </div>

            {/* Website URL */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#11382c] border border-[#dfba73]/40 flex items-center justify-center shrink-0 text-[#eed08d]">
                <Globe className="w-4 h-4" />
              </div>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-[#bed5cb] hover:text-[#fae59e] transition-colors hover:underline flex items-center gap-1"
              >
                <span>{contact.website}</span>
                <ExternalLink className="w-3 h-3 text-[#eed08d]" />
              </a>
            </div>
          </div>

          {/* Right Column: Postal Address & Action Button */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start space-y-5">
            {/* Postal Address */}
            <div className="flex items-start gap-3 text-center lg:text-left">
              <div className="w-8 h-8 rounded-full bg-[#11382c] border border-[#dfba73]/40 flex items-center justify-center shrink-0 text-[#eed08d] mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm text-[#d4e5de] leading-relaxed">
                <div className="font-semibold text-white tracking-wider">{contact.postalCode}</div>
                <div>{contact.address}</div>
              </div>
            </div>

            {/* Golden Button "お問い合わせフォーム >" */}
            <button
              onClick={onOpenContactModal}
              className="w-full sm:w-auto bg-gold-btn text-[#15231c] font-bold text-xs sm:text-sm px-7 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Mail className="w-4 h-4 text-[#15231c]" />
              <span className="tracking-wider">お問い合わせフォーム &gt;</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Logo, Copyright & Admin Settings Button */}
        <div className="mt-12 pt-8 border-t border-[#163a2f] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <Logo
            variant="compact"
            size="sm"
            customLogoUrl={branding.customLogoUrl}
            brandName={branding.brandName}
            brandSub={branding.brandSub}
            brandTagline={branding.brandTagline}
            brandJp={branding.brandJp}
          />

          <div className="flex items-center gap-6">
            <div className="text-[11px] text-[#719588] tracking-wider">
              &copy; {new Date().getFullYear()} Enblossom International. All Rights Reserved.
            </div>

            {/* Admin Settings Button with Gear Icon */}
            <button
              onClick={handleAdminClick}
              className="flex items-center gap-1.5 text-xs text-[#6e9384] hover:text-[#fae59e] py-1 px-2.5 rounded-lg hover:bg-[#0f2e23] border border-[#1b4335] hover:border-[#dfba73]/50 transition-all cursor-pointer group"
              title="Pengaturan Admin (Password: 12345)"
            >
              <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-[11px] font-medium tracking-wide">
                {isAdminLoggedIn ? 'Panel Admin' : 'Admin'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
