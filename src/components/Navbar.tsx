import React, { useState, useEffect } from 'react';
import { Mail, Menu, X, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_ITEMS } from '../data/content';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const { content } = useContent();
  const { branding, contact } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081f18]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-[#c89e47]/30 py-2.5'
          : 'bg-[#081e18] border-b border-[#c89e47]/20 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3c078] rounded-md transition-opacity hover:opacity-95"
            aria-label="Enblossom International Home"
          >
            <Logo
              size="sm"
              customLogoUrl={branding.customLogoUrl}
              brandName={branding.brandName}
              brandSub={branding.brandSub}
              brandTagline={branding.brandTagline}
              brandJp={branding.brandJp}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group flex flex-col items-center text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3c078] py-1"
              >
                <span className="text-white text-sm font-medium tracking-wide group-hover:text-[#edd08e] transition-colors">
                  {item.labelJa}
                </span>
                <span className="text-[10px] tracking-[0.16em] text-[#93b3a4] uppercase font-light group-hover:text-[#f8e5b0] transition-colors">
                  {item.labelEn}
                </span>
                <span className="h-[2px] w-0 bg-gradient-to-r from-transparent via-[#dfba73] to-transparent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Button & Quick Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenContactModal}
              className="bg-gold-btn text-[#1a231d] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              <Mail className="w-4 h-4 text-[#1a231d]" />
              <span className="tracking-wider">お問い合わせ &gt;</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenContactModal}
              className="bg-gold-btn text-[#1a231d] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
              aria-label="お問い合わせ"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>相談</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-[#e3c078] hover:bg-[#0f3427] focus:outline-none focus:ring-2 focus:ring-[#e3c078] transition-colors"
              aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071a14] border-t border-[#c89e47]/30 px-5 py-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-[#143d30] text-left hover:text-[#eed08d] transition-colors"
              >
                <div>
                  <div className="text-white text-base font-medium">{item.labelJa}</div>
                  <div className="text-[11px] text-[#86a899] tracking-wider uppercase font-light">{item.labelEn}</div>
                </div>
                <span className="text-[#c89e47] text-sm">&rarr;</span>
              </a>
            ))}

            {/* Quick Contact Links in Drawer */}
            <div className="pt-3 space-y-2.5 text-xs text-[#a3c4b6]">
              <div className="text-[#eed48f] font-semibold text-xs tracking-wider">お電話でのお問い合わせ</div>
              <div className="flex flex-col gap-1.5">
                <a
                  href={`tel:${contact.phone1.number.replace(/-/g, '')}`}
                  className="flex items-center gap-2 text-white hover:text-[#eed08d] bg-[#0c2b21] p-2.5 rounded-lg border border-[#1b4e3d]"
                >
                  <Phone className="w-4 h-4 text-[#eed08d]" />
                  <span>{contact.phone1.number} ({contact.phone1.label})</span>
                </a>
                <a
                  href={`tel:${contact.phone2.number.replace(/-/g, '')}`}
                  className="flex items-center gap-2 text-white hover:text-[#eed08d] bg-[#0c2b21] p-2.5 rounded-lg border border-[#1b4e3d]"
                >
                  <Phone className="w-4 h-4 text-[#eed08d]" />
                  <span>{contact.phone2.number} ({contact.phone2.label})</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="mt-2 w-full bg-gold-btn text-[#1a231d] font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              <span>お問い合わせフォームへ &gt;</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

