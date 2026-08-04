import { memo } from 'react';

const LogoSVG = memo(function LogoSVG({ className = "h-12 w-auto", showSubtext = true }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="h-full w-auto aspect-square shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="trvGoldCircle" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF1C5" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA771C" />
            <stop offset="100%" stopColor="#F5D061" />
          </linearGradient>
          <linearGradient id="trvGoldText" x1="50" y1="120" x2="350" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996E14" />
          </linearGradient>
        </defs>

        {/* Outer Circular Frame */}
        <circle cx="200" cy="200" r="185" stroke="url(#trvGoldCircle)" strokeWidth="9" fill="#0A0A0C" />
        <circle cx="200" cy="200" r="189" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" fill="none" />

        {/* TRV Main Monogram */}
        <text
          x="200"
          y="215"
          textAnchor="middle"
          fill="url(#trvGoldText)"
          fontFamily="'Montserrat', 'Outfit', sans-serif"
          fontWeight="900"
          fontSize="118"
          letterSpacing="4"
        >
          TRV
        </text>

        {/* STUDIO Subtext */}
        <text
          x="200"
          y="262"
          textAnchor="middle"
          fill="url(#trvGoldCircle)"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="600"
          fontSize="30"
          letterSpacing="18"
        >
          STUDIO
        </text>

        {/* Divider Line */}
        <line x1="140" y1="282" x2="260" y2="282" stroke="url(#trvGoldCircle)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Tagline */}
        {showSubtext && (
          <>
            <text
              x="200"
              y="312"
              textAnchor="middle"
              fill="#E4E4E7"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="500"
              fontSize="16"
              letterSpacing="8"
            >
              BUILDING BRANDS
            </text>
            <text
              x="200"
              y="336"
              textAnchor="middle"
              fill="#E4E4E7"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="500"
              fontSize="16"
              letterSpacing="8"
            >
              BEYOND VISUALS
            </text>
          </>
        )}
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-['Montserrat'] font-black tracking-wider text-white text-lg leading-tight">
          TRV <span className="text-[#D4AF37]">STUDIO</span>
        </span>
        <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-medium uppercase">
          Building Brands Beyond Visuals
        </span>
      </div>
    </div>
  );
});

export default LogoSVG;
