import { useState, useCallback } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const caseStudySteps = [
  {
    step: '01',
    title: 'The Brief',
    subtitle: 'Raw client inquiry transformed into precise specifications.',
    details: [
      'Client sent raw white safety helmet samples',
      'Requested octagonal roller logo on front center',
      'Requested brand name on side profile',
    ],
    image: '/images/helmet_brief.png'
  },
  {
    step: '02',
    title: 'Production',
    subtitle: 'Safety compliance combined with pristine visual placement.',
    details: [
      'Logo placement precision alignment',
      'Industrial safety compliance maintained',
      'Professional weather-proof finish'
    ],
    image: '/images/helmet_production.png'
  },
  {
    step: '03',
    title: 'Quality Check',
    subtitle: 'High-contrast typography for maximum site visibility.',
    details: [
      'High-density solvent print technology',
      'Scratch-resistant resin coating',
      '100% batch uniformity across all helmets'
    ],
    image: '/images/helmet_quality.png'
  },
  {
    step: '04',
    title: 'Fulfillment',
    subtitle: 'Successful delivery confirmed with verified transfer.',
    details: [
      'Helmet Branding: Completed',
      'Delivered Successfully',
      'Payment Confirmed Receipt'
    ],
    image: '/images/helmet_fulfillment.png'
  }
];

export default function CaseStudyMegatex() {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrev = useCallback(() => {
    setActiveStep(prev => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep(prev => prev + 1);
  }, []);

  return (
    <section id="case-study" className="py-32 bg-[#050505] relative border-t border-zinc-900">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
            Case Study
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1]">
            Megatex Paints <br />
            <span className="text-zinc-500 italic font-light">Safety Helmets.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Stepper Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {caseStudySteps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 rounded-none border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0A0A0A] border-zinc-700 shadow-xl'
                      : 'bg-[#0A0A0A]/50 border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <span className={`text-xs font-mono font-medium block mb-2 ${isActive ? 'text-[#D4AF37]' : 'text-zinc-600'}`}>
                    STAGE {s.step}
                  </span>
                  <h4 className={`text-lg font-display font-medium ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                    {s.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Step Content Card - Split Layout */}
          <div className="lg:col-span-8">
            <div className="bg-[#0A0A0A] border border-zinc-800/80 rounded-none shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-fade-in">
              
              {/* Left Side: Text Details */}
              <div className="p-10 sm:p-14 flex flex-col justify-center relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4 block">
                  Stage {caseStudySteps[activeStep].step} Overview
                </span>
                <h3 className="text-3xl font-display font-medium text-white mb-4">
                  {caseStudySteps[activeStep].title}
                </h3>
                <p className="text-zinc-400 text-sm font-medium mb-8 leading-relaxed">
                  {caseStudySteps[activeStep].subtitle}
                </p>

                <div className="space-y-4 pt-6 border-t border-zinc-900">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">Key Metrics</h4>
                  {caseStudySteps[activeStep].details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
                      <span className="text-xs text-zinc-300 font-semibold">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    disabled={activeStep === 0}
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-none border border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-900 hover:text-white transition-colors"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={activeStep === caseStudySteps.length - 1}
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-none bg-white text-black text-xs font-bold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Side: Mockup Image (Changes dynamically per stage) */}
              <div className="relative h-full min-h-[300px] md:min-h-full bg-zinc-900 border-l border-zinc-900 overflow-hidden">
                <img 
                  key={activeStep}
                  src={caseStudySteps[activeStep].image} 
                  alt={`Megatex Paints Helmet Branding - Stage ${caseStudySteps[activeStep].step}`} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-500 ease-in-out scale-100 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent hidden md:block" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
