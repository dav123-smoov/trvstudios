import { useState, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreePillars from './components/ThreePillars';
import Services from './components/Services';
import CaseStudyMegatex from './components/CaseStudyMegatex';
import BrandHealthChecker from './components/BrandHealthChecker';
import PortfolioGrid from './components/PortfolioGrid';
import Footer from './components/Footer';
import LeadMagnetModal from './components/LeadMagnetModal';

// Dynamic sub-pages
const SolutionPage = lazy(() => import('./components/SolutionPage'));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleOpenLeadModal = useCallback(() => setIsLeadModalOpen(true), []);
  const handleCloseLeadModal = useCallback(() => setIsLeadModalOpen(false), []);

  const handleChangePage = useCallback((pageName) => {
    setActivePage(pageName);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Sticky Header */}
      {activePage !== 'admin' && (
        <Navbar 
          onOpenLeadModal={handleOpenLeadModal} 
          activePage={activePage} 
          onChangePage={handleChangePage} 
        />
      )}

      {/* Main Content Router */}
      <main>
        {activePage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero onOpenLeadModal={handleOpenLeadModal} />

            {/* 3 Pillars Methodology */}
            <ThreePillars onOpenLeadModal={handleOpenLeadModal} />

            {/* Agency Services Suite */}
            <Services onOpenLeadModal={handleOpenLeadModal} />

            {/* Megatex Paints Case Study */}
            <CaseStudyMegatex />

            {/* Interactive Brand Diagnostic Quiz */}
            <BrandHealthChecker onOpenLeadModal={handleOpenLeadModal} />

            {/* Crafted Portfolio Showcase */}
            <PortfolioGrid />
          </>
        )}

        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-[#D4AF37] animate-spin" /></div>}>
          {activePage === 'solution' && (
            <SolutionPage onChangePage={handleChangePage} onOpenLeadModal={handleOpenLeadModal} />
          )}

          {activePage === 'case-studies' && (
            <CaseStudiesPage onChangePage={handleChangePage} onOpenLeadModal={handleOpenLeadModal} />
          )}

          {activePage === 'about' && (
            <AboutUsPage onChangePage={handleChangePage} onOpenLeadModal={handleOpenLeadModal} />
          )}

          {activePage === 'reviews' && (
            <ReviewsPage onChangePage={handleChangePage} onOpenLeadModal={handleOpenLeadModal} />
          )}

          {activePage === 'admin' && (
            <AdminDashboard onChangePage={handleChangePage} />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      {activePage !== 'admin' && (
        <Footer 
          onOpenLeadModal={handleOpenLeadModal} 
          onChangePage={handleChangePage} 
        />
      )}

      {/* Lead Magnet Popup Drawer */}
      <LeadMagnetModal isOpen={isLeadModalOpen} onClose={handleCloseLeadModal} />

    </div>
  );
}
