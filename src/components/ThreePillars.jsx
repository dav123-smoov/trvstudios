import { memo } from 'react';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    id: '01',
    title: 'Strategic Foundation',
    description: 'We don\'t just design logos; we build frameworks. Every aesthetic decision is rooted in your business goals, target audience psychology, and market positioning.',
    image: '/images/p_strategy.jpg',
    label: '01 / STRATEGIC FOUNDATION'
  },
  {
    id: '02',
    title: 'Visual Architecture',
    description: 'Clean, minimalist, and timeless design. From typography to color theory, we ensure your brand commands attention and communicates premium value instantly.',
    image: '/images/p_design.jpg',
    label: '02 / VISUAL ARCHITECTURE'
  },
  {
    id: '03',
    title: 'Seamless Execution',
    description: 'Digital and physical rollout. Whether it\'s a custom React web application or premium structural packaging, the final product is executed flawlessly.',
    image: '/images/helmet_brief.png',
    label: '03 / SEAMLESS EXECUTION'
  }
];

const ThreePillars = memo(function ThreePillars({ onOpenLeadModal }) {
  return (
    <section id="strategy" className="py-16 md:py-32 bg-[#050505] relative border-t border-zinc-900">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
            Methodology
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1]">
            Our three-pillar <br />
            <span className="text-zinc-500 italic font-light">framework.</span>
          </h2>
        </div>

        {/* Pillars Grid matching screenshot exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="bg-[#0D0D0D]/60 border border-zinc-900 rounded-none overflow-hidden flex flex-col justify-between group hover:border-zinc-800 transition-all duration-300 shadow-2xl">
              <div>
                {/* Image on top, full width, rectangular layout */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-900 border-b border-zinc-900 rounded-none">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Text Area below image */}
                <div className="p-5 md:p-8 space-y-3 md:space-y-4">
                  <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.25em] block uppercase">
                    {pillar.label}
                  </span>
                  <h3 className="text-2xl font-display font-medium text-white leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 font-medium leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-20 border-t border-zinc-900 pt-8 md:pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-400 font-medium text-sm max-w-md">
            Ready to structure your brand for scale and attract higher-paying clients?
          </p>
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors flex items-center gap-2 border border-zinc-800 cursor-pointer"
          >
            Start your project
            <ArrowRight className="w-4 h-4 text-zinc-500" />
          </button>
        </div>

      </div>
    </section>
  );
});

export default ThreePillars;
