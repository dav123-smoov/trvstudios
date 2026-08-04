import { memo } from 'react';
import { Briefcase, DollarSign, Zap, Flag, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Secure Immediate Fuel',
    sub: 'The Counter-Intuitive Truth',
    text: 'Counter the internet narrative ("working is slavery"). If you are hungry, secure a stable income first so you never make desperate business decisions.',
    icon: Briefcase
  },
  {
    num: '02',
    title: 'Build Multiple Income Streams',
    sub: 'Financial Freedom Engine',
    text: 'Structure assets and brand systems that generate value and cash flow for you—even when you are not actively working.',
    icon: DollarSign
  },
  {
    num: '03',
    title: 'Turn Uncertainty Into Opportunity',
    sub: 'Strategic Execution Plan',
    text: 'A business without a strategic plan is a gamble. Having a clear blueprint turns market chaos into competitive advantage.',
    icon: Zap
  },
  {
    num: '04',
    title: 'Build Step-by-Step with Zeal',
    sub: 'Unstoppable Growth Engine',
    text: 'Build patiently, securing your growth at every stage. Discipline today leads to absolute freedom tomorrow.',
    icon: Flag
  }
];

const EntrepreneurPhilosophy = memo(function EntrepreneurPhilosophy({ onOpenLeadModal }) {
  return (
    <section id="philosophy" className="py-24 bg-[#0E0E12] relative overflow-hidden border-t border-[#D4AF37]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#181820]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFF1C5]">
              The Founder Philosophy
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Survive Today. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF1C5] via-[#D4AF37] to-[#AA771C]">Build Tomorrow.</span>
          </h2>

          <p className="text-base text-zinc-400">
            <span className="text-white font-semibold">Discipline now. Freedom later.</span> Real advice for ambitious founders starting from zero.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="p-8 rounded-3xl bg-[#121216] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-mono text-[#D4AF37]">{item.num}</span>
                    <div className="p-3 rounded-xl bg-[#1A1A22] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold uppercase text-white mb-1 group-hover:text-[#FFF1C5]">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-medium text-[#D4AF37] uppercase tracking-wider block mb-3">
                    {item.sub}
                  </span>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800/80 mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-[#D4AF37]">
                  <span>Step {idx + 1} Framework</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual Legacy Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14141C] via-[#1A1A24] to-[#14141C] border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-left max-w-2xl">
            <h3 className="text-2xl font-black uppercase text-white">
              The Dual Mission of TRV Studio
            </h3>
            <p className="text-sm text-zinc-300">
              <strong className="text-[#FFF1C5]">1. Build Businesses:</strong> Create genuine value and build your long-term legacy.
              <br />
              <strong className="text-[#D4AF37]">2. Create Jobs:</strong> Empower people and strengthen local communities.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenLeadModal}
            className="shrink-0 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFF1C5] via-[#D4AF37] to-[#AA771C] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 cursor-pointer"
          >
            <span>Start Building Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </section>
  );
});

export default EntrepreneurPhilosophy;
