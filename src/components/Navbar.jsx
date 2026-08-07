import { memo, useCallback } from 'react';

const WhatsAppIcon = memo(function WhatsAppIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className="w-3.5 h-3.5 stroke-zinc-200 fill-none stroke-[1.8]"
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
});

const NavLink = memo(function NavLink({ page, activePage, onChangePage, children }) {
  const handleClick = useCallback(() => {
    onChangePage(page);
  }, [onChangePage, page]);

  return (
    <button 
      type="button"
      onClick={handleClick}
      className={`text-[11px] md:text-[12.5px] font-semibold tracking-wide relative py-1 cursor-pointer focus:outline-none transition-colors ${
        activePage === page ? 'text-white' : 'text-zinc-200 hover:text-white'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] transition-transform origin-left duration-305 ${
        activePage === page ? 'scale-x-100' : 'scale-x-0'
      }`}></span>
    </button>
  );
});

const Navbar = memo(function Navbar({ onOpenLeadModal, activePage, onChangePage }) {
  const handleHomeClick = useCallback(() => {
    onChangePage('home');
  }, [onChangePage]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 pt-2 px-4 sm:px-6 bg-transparent pointer-events-none">
      <div className="max-w-[1140px] mx-auto w-full pointer-events-auto">
        
        {/* Responsive Navbar Container: Flex-col on mobile, grid on desktop */}
        <div className="bg-[#111111]/95 backdrop-blur-md border border-zinc-800 rounded-[16px] px-4 md:px-6 py-2 md:py-0 md:h-[58px] flex flex-col md:grid md:grid-cols-3 md:items-center shadow-[0_10px_35px_rgba(0,0,0,0.8)] gap-2 md:gap-0">
          
          {/* Row 1 (Mobile) / Left Column (Desktop): Logo & Mobile Actions */}
          <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
            <button 
              type="button"
              onClick={handleHomeClick}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
              aria-label="Go to home page"
            >
              <img 
                src="/images/logo.png" 
                alt="TRV Studio Logo" 
                className="h-10 w-10 md:h-11 md:w-11 rounded-full object-contain border border-zinc-800/50 shadow-sm transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col text-[11.5px] md:text-[12.5px] font-bold text-white leading-[1.1]">
                <span>TRV</span>
                <span className="text-zinc-300 font-medium">Studio</span>
              </div>
            </button>

            {/* Mobile-only contact & CTA actions */}
            <div className="flex md:hidden items-center gap-3">
              <a 
                href="https://wa.me/2349133135923" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-zinc-200 hover:text-white text-[10.5px] font-semibold transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <WhatsAppIcon />
                <span>Chat with Us</span>
              </a>
              
              <button
                type="button"
                onClick={onOpenLeadModal}
                className="px-3 py-1.5 rounded-[6px] text-[9.5px] font-extrabold text-white bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-zinc-700 cursor-pointer"
              >
                Start project
              </button>
            </div>
          </div>

          {/* Row 2 (Mobile) / Center Column (Desktop): Navigation links (always visible) */}
          <nav className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 w-full border-t border-zinc-800/30 md:border-none pt-2.5 md:pt-0">
            <NavLink page="solution" activePage={activePage} onChangePage={onChangePage}>
              Services
            </NavLink>
            <NavLink page="case-studies" activePage={activePage} onChangePage={onChangePage}>
              Case Studies
            </NavLink>
            <NavLink page="about" activePage={activePage} onChangePage={onChangePage}>
              About Us
            </NavLink>
            <NavLink page="reviews" activePage={activePage} onChangePage={onChangePage}>
              Reviews
            </NavLink>
          </nav>

          {/* Desktop-only Right Column: CTA WhatsApp & Button */}
          <div className="hidden md:flex items-center justify-end gap-5">
            <a 
              href="https://wa.me/2349133135923" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-zinc-200 hover:text-white text-[11.5px] font-semibold transition-colors tracking-wide"
              aria-label="Contact us on WhatsApp"
            >
              <WhatsAppIcon />
              <span>Chat with Us</span>
            </a>
            
            <button
              type="button"
              onClick={onOpenLeadModal}
              className="px-4 py-2 rounded-[6px] text-[11px] font-extrabold text-white bg-[#1E1E1E] hover:bg-[#2A2A2A] transition-colors border border-zinc-700 cursor-pointer"
            >
              Start your project
            </button>
          </div>

        </div>

      </div>
    </header>
  );
});

export default Navbar;
