import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurBusiness } from './components/OurBusiness';
import { AboutUs } from './components/AboutUs';
import { OurTeam } from './components/OurTeam';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { ContactModal } from './components/ContactModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceItem } from './types';
import { Phone, ArrowUp, Settings } from 'lucide-react';
import { ContentProvider, useContent } from './context/ContentContext';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

function MainLandingPage() {
  const { content, isAdminLoggedIn, setIsAdminPanelOpen, setIsLoginModalOpen } = useContent();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('');
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactWithService = (serviceName: string) => {
    setSelectedServiceForModal(serviceName);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f2] text-[#2c332e] font-sans selection:bg-[#dfba73] selection:text-[#11261d]">
      {/* Top Navbar */}
      <Navbar onOpenContactModal={() => handleOpenContactWithService('')} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenContactModal={() => handleOpenContactWithService('')} />

        {/* Our Business Services (4 Cards with Badges) */}
        <OurBusiness
          onSelectService={(service) => setActiveServiceDetail(service)}
          onOpenContactModalWithService={handleOpenContactWithService}
        />

        {/* About Us (Philosophy, Seedling Earth & 3 Key Advantages) */}
        <AboutUs onOpenContactModal={() => handleOpenContactWithService('')} />

        {/* Our Team (Co-CEOs & 5-Photo Gallery Strip) */}
        <OurTeam />

        {/* News & Topics Section */}
        <NewsSection />

        {/* Footer Contact Section */}
        <ContactSection onOpenContactModal={() => handleOpenContactWithService('')} />
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
        {/* Admin Quick Launch Button (Visible to logged in admin or subtle shortcut) */}
        {isAdminLoggedIn && (
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="w-10 h-10 rounded-full bg-[#12382b] text-[#fae59e] border-2 border-[#dfba73] shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            title="Buka Panel Admin CMS"
          >
            <Settings className="w-5 h-5 animate-spin-slow" />
          </button>
        )}

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#dfba73] text-[#142921] shadow-lg flex items-center justify-center hover:bg-[#dfba73] hover:text-white transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Quick Phone Call Button for Mobile */}
        <a
          href={content.contact.phone1.link}
          className="sm:hidden w-12 h-12 rounded-full bg-[#0d3428] text-[#edd08d] border-2 border-[#dfba73] shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          aria-label="電話をかける"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultService={selectedServiceForModal}
      />

      {/* Detailed Service Information Modal */}
      <ServiceDetailModal
        service={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onInquire={(serviceTitle) => handleOpenContactWithService(serviceTitle)}
      />

      {/* Admin Login Modal (Password: 12345) */}
      <AdminLoginModal />

      {/* Admin CMS Dashboard Modal */}
      <AdminDashboardModal />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainLandingPage />
    </ContentProvider>
  );
}
