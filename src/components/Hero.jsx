import { memo } from 'react';
import { Star } from 'lucide-react';

const Hero = memo(function Hero({ onOpenLeadModal }) {
  return (
    <section className="relative w-full bg-diagonal-stripes flex flex-col items-center justify-start overflow-hidden font-sans pt-32 sm:pt-28 md:pt-16 pb-8 min-h-[660px]">
      
      {/* Container holding the layout */}
      <div className="w-full max-w-[1000px] px-4 sm:px-6 relative z-10 mx-auto">
        
        {/* The Dark Box Container */}
        <div className="w-full bg-[#111111]/90 backdrop-blur-md border border-zinc-850 rounded-[24px] pt-8 pb-11 flex flex-col items-center text-center shadow-[0_15px_50px_rgba(0,0,0,0.6)] relative z-10">
          
          {/* Top Rated Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-700/50 bg-[#1A1A1A] mb-4">
            <div className="p-[1px] rounded-full">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            </div>
            <span className="text-[10px] font-semibold text-zinc-300 tracking-wider uppercase">
              Top Rated
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[28px] sm:text-[44px] md:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.03em] max-w-[700px] mx-auto px-2">
            Build a premium brand that <br className="hidden sm:block" />
            your customers remember and trust.
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 text-zinc-400 text-[11px] sm:text-[12px] font-medium max-w-xl mx-auto px-4">
            Custom brand identity, packaging, and web design.
          </p>

          {/* CTA Button */}
          <button
            type="button"
            id="hero-cta-btn"
            onClick={onOpenLeadModal}
            className="mt-5 px-6 py-2.5 rounded-[5px] bg-[#D4AF37] text-black text-[12.5px] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:brightness-110 transition-all cursor-pointer relative z-30"
          >
            Start your project
          </button>
          
        </div>

        {/* Founder Portrait & Floating Cards Area - Fully responsive with scale down and inward offsets */}
        <div className="relative -mt-[90px] sm:-mt-[110px] w-full max-w-[680px] mx-auto h-[260px] z-20 flex justify-center items-end pointer-events-none">
          
          {/* Subtle Gold Glow behind person */}
          <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[180px] sm:w-[200px] h-[180px] bg-[#D4AF37] rounded-full blur-[80px] opacity-[0.15]" />

          {/* scattered floating cards, updated with responsive scale and offsets to prevent overflow */}
          
          {/* Card 1: Top Left - Logo Design */}
          <div className="absolute left-[15px] sm:left-[110px] bottom-[120px] sm:bottom-[130px] bg-[#161616]/95 border border-zinc-800 rounded-[14px] p-3 sm:p-4 shadow-2xl w-[115px] sm:w-[135px] z-30 pointer-events-auto scale-[0.75] sm:scale-100 origin-bottom-left">
             <div className="flex items-center gap-1.5 mb-1.5 text-zinc-500">
               <div className="w-3 h-3 rounded-full border-[1.8px] border-zinc-500 border-t-transparent animate-spin" />
               <span className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider">Service</span>
             </div>
             <div className="text-[14px] sm:text-[17px] font-extrabold text-white leading-none mb-2">Logo Design</div>
             <svg viewBox="0 0 100 20" className="w-full h-4 sm:h-4.5 stroke-[#D4AF37] fill-transparent stroke-[2]">
               <path d="M0,15 Q20,15 40,5 T80,10 T100,2" />
             </svg>
          </div>

          {/* Card 2: Bottom Left - Web Dev */}
          <div className="absolute left-[5px] sm:left-[40px] bottom-[10px] sm:bottom-[20px] bg-[#161616]/95 border border-zinc-800 rounded-[14px] p-3 sm:p-4 shadow-2xl w-[130px] sm:w-[155px] z-30 pointer-events-auto scale-[0.75] sm:scale-100 origin-bottom-left">
             <div className="flex items-center gap-1.5 mb-1.5 text-zinc-500">
               <div className="w-3 h-3 rounded-full border-[1.8px] border-zinc-500 border-t-transparent animate-spin" />
               <span className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider">Service</span>
             </div>
             <div className="text-[14px] sm:text-[17px] font-extrabold text-white leading-none mb-2">Web Dev</div>
             <svg viewBox="0 0 100 20" className="w-full h-4 sm:h-4.5 stroke-[#D4AF37] fill-transparent stroke-[2]">
               <path d="M0,15 Q20,15 40,5 T80,10 T100,2" />
             </svg>
          </div>

          {/* Card 3: Far Left - CAC Setup */}
          <div className="absolute left-[-15px] sm:left-[-20px] bottom-[70px] sm:bottom-[100px] bg-[#161616]/95 border border-zinc-800/80 rounded-[14px] p-3 sm:p-4 shadow-2xl w-[105px] sm:w-[125px] z-30 opacity-90 pointer-events-auto scale-[0.75] sm:scale-100 origin-bottom-left">
             <div className="flex items-center gap-1.5 mb-1.5 text-zinc-500">
               <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Service</span>
             </div>
             <div className="text-[14px] sm:text-[17px] font-extrabold text-white leading-none mb-2">CAC Setup</div>
             <svg viewBox="0 0 100 20" className="w-full h-3.5 sm:h-4 stroke-[#D4AF37] fill-transparent stroke-[2]">
               <path d="M0,18 Q30,12 60,15 T100,5" />
             </svg>
          </div>

          {/* Card 4: Right Top - Branding */}
          <div className="absolute right-[20px] sm:right-[130px] bottom-[140px] sm:bottom-[150px] bg-[#161616]/95 border border-zinc-800 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-2xl flex items-center gap-2.5 sm:gap-3.5 z-30 pointer-events-auto scale-[0.75] sm:scale-100 origin-bottom-right">
             <div className="w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black fill-black" />
             </div>
             <span className="text-[14px] sm:text-[17px] font-bold text-white tracking-tight">Branding</span>
          </div>

          {/* Card 5: Right Bottom - Packaging */}
          <div className="absolute right-[5px] sm:right-[50px] bottom-[15px] sm:bottom-[30px] bg-[#161616]/95 border border-zinc-800 rounded-[14px] p-3 sm:p-4 shadow-2xl w-[115px] sm:w-[135px] z-30 pointer-events-auto scale-[0.75] sm:scale-100 origin-bottom-right">
             <div className="flex items-center gap-1.5 mb-1.5 text-zinc-500">
               <div className="w-3 h-3 rounded-full border-[1.8px] border-zinc-500 border-t-transparent animate-spin" />
               <span className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider">Service</span>
             </div>
             <div className="text-[14px] sm:text-[17px] font-extrabold text-white leading-none mb-2">Packaging</div>
             <svg viewBox="0 0 100 20" className="w-full h-4 sm:h-4.5 stroke-[#D4AF37] fill-transparent stroke-[2]">
               <path d="M0,15 Q30,10 50,12 T100,5" />
             </svg>
          </div>

          {/* Card 6: Far Right - Printing */}
          <div className="absolute right-[-15px] sm:right-[-20px] bottom-[75px] sm:bottom-[95px] bg-[#161616]/95 border border-zinc-800/80 rounded-[14px] p-3 sm:p-4 shadow-2xl w-[105px] sm:w-[125px] z-30 opacity-90 pointer-events-auto scale-[0.75] sm:scale-100 origin-bottom-right">
             <div className="flex items-center gap-1.5 mb-1.5 text-zinc-500">
               <span className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider">Service</span>
             </div>
             <div className="text-[14px] sm:text-[17px] font-extrabold text-white leading-none mb-2">Printing</div>
             <svg viewBox="0 0 100 20" className="w-full h-3.5 sm:h-4 stroke-[#D4AF37] fill-transparent stroke-[2]">
               <path d="M0,12 L30,18 L60,8 L100,10" />
             </svg>
          </div>

          {/* The Portrait Image (Cutout) */}
          <img 
            src="/images/new_founder.png" 
            alt="Founder" 
            loading="lazy"
            className="relative z-10 h-[190px] sm:h-[210px] w-auto object-contain [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] mt-8"
          />
        </div>

      </div>

      {/* Marquee Section */}
      <div className="w-full mt-8 z-10 flex flex-col items-center">
        <p className="text-[9px] font-bold text-zinc-500 mb-4 tracking-wider uppercase">
          Trusted by 7 & 8-Figure D2C Brands
        </p>
        <div className="w-full max-w-[1000px] overflow-hidden flex justify-center items-center opacity-30 grayscale gap-8 sm:gap-12 pb-4 px-4">
          <span className="text-[13px] font-black text-white tracking-tighter">nauke</span>
          <span className="text-[12px] font-bold text-white flex items-center gap-1">
             ICECARTEL
          </span>
          <span className="text-[13px] font-bold text-white tracking-tight flex items-center gap-1">
             WLOOM
          </span>
          <span className="text-[12px] font-bold text-white flex items-center gap-1">
             ICECARTEL
          </span>
          <span className="text-[15px] font-semibold text-white tracking-tighter">everydays</span>
          <span className="text-[15px] font-serif text-white tracking-tight">mylky</span>
          <span className="text-[13px] font-black text-white">DRY</span>
        </div>
      </div>

    </section>
  );
});

export default Hero;
