import { memo } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Secure Immediate Fuel',
    sub: 'Counter Desperate Logic',
    text: 'Do not chase internet pipe dreams while you are struggling to pay rent. Secure a stable income framework first, so that you never make desperate business negotiations.'
  },
  {
    num: '02',
    title: 'Build Asset Pipelines',
    sub: 'Residual Value Strategy',
    text: 'Structure visual systems, packaging setups, and custom website layouts that continue to generate cash flow and authority for you over time.'
  },
  {
    num: '03',
    title: 'Turn Chaos Into Strategy',
    sub: 'Execute Clear BLUEPRINTS',
    text: 'A business setup without planning is a gamble. Formulating step-by-step branding outlines turns market volatility into a distinct competitive setup.'
  },
  {
    num: '04',
    title: 'Discipline Over Zeal',
    sub: 'Zealous Legacy Growth',
    text: 'Build patiently, verifying safety compliance and print quality at every iteration. Long-term legacy demands rigorous discipline today.'
  }
];

const AboutUsPage = memo(function AboutUsPage({ onChangePage, onOpenLeadModal }) {
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

        {/* Grid Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] block">
                Agency Philosophy
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1]">
              Survive Today. <br />
              <span className="text-zinc-500 italic font-light">Build Tomorrow.</span>
            </h1>

            <p className="text-zinc-400 text-sm font-medium leading-relaxed">
              We help ambitious teams and organizations build premium legacies. From simple WhatsApp concepts to pristine physical packaging and React codebase platforms, we manage your brand's rollout with extreme precision.
            </p>
          </div>

          {/* Profile cutout next to description - Straight Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[280px] h-[280px] bg-gradient-to-b from-zinc-900 to-black rounded-none border border-zinc-800 overflow-hidden flex items-end justify-center shadow-2xl">
              <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[80px] opacity-[0.1]" />
              <img 
                src="/images/new_founder.png" 
                alt="TRV Team Portrait" 
                loading="lazy"
                className="relative z-10 h-[240px] w-auto object-contain [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
              />
            </div>
          </div>
        </div>

        {/* 4 Steps Section */}
        <div className="mb-32">
          <div className="mb-16">
            <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
              Core Blueprint
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              The Agency Building Blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((item, idx) => (
              <div
                key={item.num}
                className="p-8 rounded-none bg-[#0A0A0A] border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-mono text-[#D4AF37]">{item.num}</span>
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                      {item.sub}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-medium text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Display split - Straight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-2 block">
              Our Studio
            </span>
            <h2 className="text-3xl font-display font-medium text-white">
              A Minimalist Creative Sanctuary
            </h2>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed">
              We operate from a quiet, neat workspace optimized for creative focus. Pristine monitor rigs, vector dieline calibrations, and ambient study light support our team as we mold concepts from digital drafts to physical prints.
            </p>

            <ul className="space-y-3 pt-6 border-t border-zinc-900">
              <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                Bespoke Design Infrastructure
              </li>
              <li className="flex items-center gap-3 text-xs font-semibold text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                Rigorous Dieline Quality Verification
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 aspect-[16/10] rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            <img 
              src="/images/about_office.jpg" 
              alt="TRV Studio Creative Sanctuary Office" 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
});

export default AboutUsPage;
