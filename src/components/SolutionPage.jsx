import { memo } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';

const SolutionPage = memo(function SolutionPage({ onChangePage, onOpenLeadModal }) {
  return (
    <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans pt-32 pb-24 relative overflow-hidden">
      
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 bg-[#D4AF37] blur-[180px] opacity-10 pointer-events-none" />

      <div className="max-w-[70rem] mx-auto px-6 relative z-10">
        
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => onChangePage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#D4AF37] transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-20">
          <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
            Core Solution
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
            The Brand Strategy & <br />
            <span className="text-zinc-500 italic font-light">Execution Framework.</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-xl font-medium leading-relaxed">
            We don't just design elements; we craft high-end corporate identity systems that command high ticket rates and stand out in physical and digital retail.
          </p>
        </div>

        {/* Detail Layout Grid - All cards rounded-none */}
        <div className="space-y-32">
          
          {/* Phase 1 Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
                Phase 01 / Strategic Foundation
              </span>
              <h2 className="text-3xl font-display font-medium text-white">
                Before Visuals: The Brand Positioning System
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                Most companies rush into a logo design without understanding their market. We define your pricing brackets, competitor vulnerabilities, and user demographics first. This allows us to build stationery, websites, and custom packaging dielines that align directly with high ticket sales.
              </p>
              
              <ul className="space-y-3 pt-4 border-t border-zinc-900">
                <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Competitor Brand Positioning Analysis
                </li>
                <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Aesthetics & Psychological Tone Mapping
                </li>
              </ul>
            </div>
            
            <div className="aspect-[4/3] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <img 
                src="/images/sol_concept.jpg" 
                alt="Brand Strategy Concept Table" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Phase 2 Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
            <div className="lg:order-2 space-y-6">
              <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
                Phase 02 / Visual Architecture
              </span>
              <h2 className="text-3xl font-display font-medium text-white">
                Bespoke Logos, Dielines, & Custom Packaging Mockups
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                We engineer high-fidelity packaging boxes, luxury dielines, and pristine vector graphics. Every color contrast is checked for legibility under physical retail lighting. We create custom layouts that translate concept briefs from simple WhatsApp chats into tangible, high-end branded realities.
              </p>
              
              <ul className="space-y-3 pt-4 border-t border-zinc-900">
                <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Print-Ready Vector Files & Formats
                </li>
                <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Gold Foil Hot Stamping
                </li>
              </ul>
            </div>
            
            <div className="lg:order-1 aspect-[4/3] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <img 
                src="/images/packaging.jpg" 
                alt="Bespoke Packaging Mockups" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Phase 3 Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
                Phase 03 / Seamless Web Architecture
              </span>
              <h2 className="text-3xl font-display font-medium text-white">
                React Web Applications & Google presence
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                Branding fails without a matching high-end digital presence. We construct responsive, custom web applications that load in milliseconds and display your products with pride. We optimize your Google Business Profiles and setup standard tracking tools to make sure local customers find you instantly.
              </p>
              
              <ul className="space-y-3 pt-4 border-t border-zinc-900">
                <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Custom React & Vite Layout Codebase
                </li>
                <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Google Business SEO & Map Integration
                </li>
              </ul>
            </div>
            
            <div className="aspect-[4/3] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <img 
                src="/images/sol_digital.jpg" 
                alt="React App Custom Code Mockup" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* Bottom CTA Card */}
        <div className="mt-32 p-8 sm:p-12 rounded-none bg-[#0A0A0A] border border-zinc-800 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">
            Build Your Execution Framework Today
          </h3>
          <p className="text-zinc-500 font-medium text-sm max-w-lg mx-auto mb-8">
            Let's translate your business objectives into a premium visual strategy that generates sales.
          </p>
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="px-8 py-4 rounded-none bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Consult with us</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
});

export default SolutionPage;
