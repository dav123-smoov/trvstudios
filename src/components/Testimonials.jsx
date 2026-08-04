import { memo } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

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

const Testimonials = memo(function Testimonials() {
  return (
    <section className="py-24 bg-[#0E0E12] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D4AF37]" />
            ))}
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            What Our Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF1C5] via-[#D4AF37] to-[#AA771C]">Say About Us.</span>
          </h2>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="p-8 rounded-3xl bg-[#121216] border border-[#D4AF37]/20 flex flex-col justify-between text-left space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/40" />

              <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">{rev.name}</h4>
                  <span className="text-[11px] text-zinc-400 font-medium block">{rev.role}</span>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

export default Testimonials;
