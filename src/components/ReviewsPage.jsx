import { memo } from 'react';
import { ArrowLeft, Star, Quote, CheckCircle2, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Ademola Abdul',
    role: 'Founder, Megatex Paints',
    comment: 'TRV Studio turned our WhatsApp request into immaculate branded safety helmets for our paint site crew. Fast turnaround, crisp logo printing, and 100% professional service.',
    stars: 5,
    verified: true
  },
  {
    name: 'Tunde Bakare',
    role: 'CEO, Apex Logistics',
    comment: 'The 3-pillar brand strategy transformed how our clients view us. We were able to increase our pricing by 40% simply because our branding finally reflects our true value.',
    stars: 5,
    verified: true
  },
  {
    name: 'Chidimma Okafor',
    role: 'Founder, GlowCraft Beauty',
    comment: 'They handled our CAC registration, custom product packaging dielines, and website all in one place. Best decision I made for my startup!',
    stars: 5,
    verified: true
  }
];

const ReviewsPage = memo(function ReviewsPage({ onChangePage, onOpenLeadModal }) {
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
            Client Testimonials
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
            Real Reviews from <br />
            <span className="text-zinc-500 italic font-light">Verified Founders.</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-xl font-medium leading-relaxed">
            Discover how Nigerian business owners and D2C brands partner with TRV Studio to upgrade their visual architecture and CAC setups.
          </p>
        </div>

        {/* Reviews Cards Stack - rounded-none */}
        <div className="space-y-6 mb-24">
          {reviews.map((rev, idx) => (
            <div
              key={rev.name}
              className="p-8 rounded-none bg-[#0A0A0A] border border-zinc-800 flex flex-col justify-between text-left space-y-6 relative shadow-xl"
            >
              <div className="flex items-center justify-between">
                <Quote className="w-8 h-8 text-[#D4AF37]/35" />
                <div className="inline-flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 italic leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">{rev.name}</h4>
                  <span className="text-[11px] text-zinc-400 font-medium block">{rev.role}</span>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Review</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card - rounded-none */}
        <div className="p-8 sm:p-12 rounded-none bg-[#0A0A0A] border border-zinc-800 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">
            Become Our Next Success Story
          </h3>
          <p className="text-zinc-500 font-medium text-sm max-w-lg mx-auto mb-8">
            Partner with us to create premium stationery, high-end packaging, and custom codebase websites.
          </p>
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="px-8 py-4 rounded-none bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Consult Strategy</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
});

export default ReviewsPage;
