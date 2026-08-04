import { memo } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';

const CaseStudiesPage = memo(function CaseStudiesPage({ onChangePage, onOpenLeadModal }) {
  return (
    <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans pt-32 pb-24 relative overflow-hidden">
      
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 bg-[#D4AF37] blur-[180px] opacity-10 pointer-events-none" />

      <div className="max-w-[700px] mx-auto px-6 relative z-10">
        
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
        <div className="mb-20 text-center sm:text-left">
          <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
            Selected Case Studies
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
            From Client Brief to <br />
            <span className="text-zinc-500 italic font-light">Branded Reality.</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-xl font-medium leading-relaxed">
            A deep-dive analysis of visual executions where raw start-up inquiries were structured into pristine, industry-leading branding setups.
          </p>
        </div>

        {/* Case Studies Stack */}
        <div className="space-y-24">
          
          {/* Case Study 1: Megatex Paints */}
          <div className="space-y-8 pb-16 border-b border-zinc-900">
            <div className="space-y-4">
              <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
                Case Study 01 / Megatex Paints
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                Branding the Safety Gear of a Painting Crew
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                Megatex Paints requested their paint roller logo printed onto their field safety helmets. We processed the raw layout, calibrated the paint logo spacing, and applied a high-density, weather-proof print coating to withstand rigorous construction and paint environments.
              </p>
            </div>

            {/* Images Grid - rounded-none */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg">
                <img src="/images/helmet_brief.png" alt="Megatex Helmet Stack" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg">
                <img src="/images/helmet_fulfillment.png" alt="Branded Helmets completed" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-zinc-800/80 rounded-none p-6 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Execution Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Logo Aligned Front Center
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  High-Visibility Contrast Checked
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Scratch-Resistant Resin Coating
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  100% Uniform Batch Completion
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2: Matte Black & Gold */}
          <div className="space-y-8 pb-16">
            <div className="space-y-4">
              <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
                Case Study 02 / TRV Exclusive
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                Premium Matte Black & Gold Packaging
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                For our premium clients, we designed custom dieline boxes featuring an elegant matte-black background paired with embossed gold-foil typography. We calibrated stamp lines and thickness variables so that printing remains crisp and commands authority on luxury shelves.
              </p>
            </div>

            {/* Images Grid - rounded-none */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg">
                <img src="/images/case_box.jpg" alt="Matte Black Box" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg">
                <img src="/images/packaging.jpg" alt="Packaging dieline flatlay" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-zinc-800/80 rounded-none p-6 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Execution Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Precision Cardboard Dielines
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Gold Foil Hot Stamping
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Heavy-Duty Cardboard Weight
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  Saturated Ink Finish Checks
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA Card - rounded-none */}
        <div className="mt-20 p-8 sm:p-12 rounded-none bg-[#0A0A0A] border border-zinc-800 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">
            Ready to Build Your Case Study?
          </h3>
          <p className="text-zinc-500 font-medium text-sm max-w-lg mx-auto mb-8">
            Consult with our branding team to design safety helmets, premium retail boxes, and high-end digital sites.
          </p>
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="px-8 py-4 rounded-none bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Inquire Project</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
});

export default CaseStudiesPage;
