import { memo } from 'react';

const Footer = memo(function Footer({ onOpenLeadModal, onChangePage }) {
  return (
    <footer className="bg-[#050505] pt-32 pb-12 border-t border-zinc-900 relative overflow-hidden">
      
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D4AF37] blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top CTA */}
        <div className="flex flex-col items-center text-center mb-32">
          <h2 className="text-5xl sm:text-7xl font-display font-medium text-white tracking-tight mb-8">
            Ready to scale?
          </h2>
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="px-10 py-5 rounded-xl bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            Start Your Project
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <button 
              type="button"
              onClick={() => onChangePage('home')}
              className="flex items-center gap-3.5 mb-6 group cursor-pointer text-left focus:outline-none"
              aria-label="Go to home page"
            >
              <img 
                src="/images/logo.png" 
                alt="TRV Studio Logo" 
                className="h-10 w-10 rounded-full object-contain border border-zinc-800/50 shadow-sm"
              />
              <span className="font-semibold text-white leading-tight">
                TRV<br/>
                <span className="text-zinc-400 font-medium">Studio</span>
              </span>
            </button>
            <p className="text-zinc-500 font-medium max-w-sm">
              We help D2C brands and businesses scale with direct-response brand identity, web design, and high-converting packaging.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-4">
              <li>
                <button type="button" onClick={onOpenLeadModal} className="text-sm font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer focus:outline-none text-left">
                  Brand Identity
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenLeadModal} className="text-sm font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer focus:outline-none text-left">
                  Packaging Design
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenLeadModal} className="text-sm font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer focus:outline-none text-left">
                  Web Application
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenLeadModal} className="text-sm font-medium text-zinc-500 hover:text-white transition-colors cursor-pointer focus:outline-none text-left">
                  CAC Setup
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="https://www.instagram.com/trventurestudio" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-500 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@trv_studio?_r=1&_t=ZS-98Q2hAnUVnR" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-500 hover:text-white transition-colors">TikTok</a></li>
              <li><a href="https://wa.me/2349133135923?text=Hello%20TRV%20Studio" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#D4AF37] hover:text-white transition-colors">WhatsApp Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-zinc-600">
            © {new Date().getFullYear()} TRV Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-medium text-zinc-600 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs font-medium text-zinc-600 hover:text-white">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
});

export default Footer;
