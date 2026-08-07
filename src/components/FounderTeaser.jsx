import { memo } from 'react';
import { ArrowRight } from 'lucide-react';

const FounderTeaser = memo(function FounderTeaser({ onChangePage }) {
  return (
    <section className="py-24 bg-[#050505] relative border-t border-zinc-900">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="bg-[#0A0A0A] border border-zinc-800 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 shadow-2xl">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border border-zinc-700 shrink-0 bg-zinc-900">
            {/* Placeholder Image */}
            <img 
              src="/images/new_founder.png" 
              alt="Founder" 
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] block">
              Meet the Founder
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-medium text-white leading-tight">
              "Built by a founder obsessed with execution and scaling businesses."
            </h3>
            <p className="text-zinc-400 font-medium text-sm max-w-xl mx-auto md:mx-0">
              TRV Studio was born out of a desire to see brands win. We don't just design; we build premium legacies that attract high-paying clients.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => onChangePage('about')}
                className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#D4AF37] transition-colors flex items-center gap-2 group/btn mx-auto md:mx-0 cursor-pointer"
              >
                Read our story
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FounderTeaser;
