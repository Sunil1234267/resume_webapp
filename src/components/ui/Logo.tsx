import React from "react";
import { motion } from "framer-motion";

export interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  showText?: boolean;
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
  textClassName?: string;
  subtitleClassName?: string;
}

export const LogoEmblem: React.FC<{ sizePx: number; animated?: boolean; className?: string }> = ({
  sizePx,
  animated = false,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FF8000]/30 via-[#FFAA00]/15 to-[#00E5FF]/25 blur-[6px] -z-10 opacity-70 group-hover:opacity-100 transition-opacity"
      />

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Radial carbon background */}
          <radialGradient id="logoBgGrad" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stop-color="#181B2B" />
            <stop offset="70%" stop-color="#0B0C15" />
            <stop offset="100%" stop-color="#05060A" />
          </radialGradient>

          {/* Papaya flame gradient */}
          <linearGradient id="logoPapaya" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFAA00" />
            <stop offset="45%" stop-color="#FF8000" />
            <stop offset="100%" stop-color="#FF3700" />
          </linearGradient>

          {/* Aerodynamic Cyan electric gradient */}
          <linearGradient id="logoCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#70F3FF" />
            <stop offset="50%" stop-color="#00E5FF" />
            <stop offset="100%" stop-color="#0088FF" />
          </linearGradient>

          {/* Shield rim gradient */}
          <linearGradient id="logoRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF8000" stop-opacity="0.95" />
            <stop offset="40%" stop-color="#FFAA00" stop-opacity="0.6" />
            <stop offset="75%" stop-color="#00E5FF" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#FF3700" stop-opacity="0.9" />
          </linearGradient>

          {/* Soft bloom glow filter */}
          <filter id="logoBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Outer Aerodynamic Hex Shield */}
        <path
          d="M 48,6 C 49.3,5.3 50.7,5.3 52,6 L 86,24.5 C 89,26 91,29 91,32.5 L 91,66 C 91,69.5 89,72.5 86,74 L 52,92.5 C 50.7,93.2 49.3,93.2 48,92.5 L 14,74 C 11,72.5 9,69.5 9,66 L 9,32.5 C 9,29 11,26 14,24.5 Z"
          fill="url(#logoBgGrad)"
          stroke="url(#logoRim)"
          strokeWidth="2"
        />

        {/* 2. Inner Telemetry Track Dashes */}
        <path
          d="M 48.5,12 C 49.4,11.5 50.6,11.5 51.5,12 L 81,28 C 83.5,29.3 85,31.8 85,34.5 L 85,63.5 C 85,66.2 83.5,68.7 81,70 L 51.5,86 C 50.6,86.5 49.4,86.5 48.5,86 L 19,70 C 16.5,68.7 15,66.2 15,63.5 L 15,34.5 C 15,31.8 16.5,29.3 19,28 Z"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          strokeDasharray="3 3"
        />

        {/* 3. Automotive Caliper & Telemetry Ticks */}
        <line x1="12" y1="41" x2="16" y2="41" stroke="#FF8000" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="11" y1="49" x2="17" y2="49" stroke="#FFAA00" strokeWidth="1.6" />
        <line x1="12" y1="57" x2="16" y2="57" stroke="#FF8000" strokeWidth="1.2" strokeOpacity="0.8" />

        <line x1="84" y1="41" x2="88" y2="41" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="83" y1="49" x2="89" y2="49" stroke="#00E5FF" strokeWidth="1.6" />
        <line x1="84" y1="57" x2="88" y2="57" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.8" />

        {/* 4. Top Apex Status Beacon */}
        <circle cx="50" cy="14" r="1.8" fill="#00E5FF" filter="url(#logoBloom)" />
        <circle cx="50" cy="14" r="3.2" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />

        {/* 5. Monogram Glyph 'S' */}
        <path
          d="M 44,29 L 28,29 C 24.5,29 23,31 23,34.5 L 23,43 C 23,46.5 25,48.5 28,49.5 L 39,52.5 C 42,53.5 44,55.5 44,59 L 44,65.5 C 44,69 42.5,71 39,71 L 23,71"
          fill="none"
          stroke="url(#logoPapaya)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 6. Monogram Glyph 'K' - Vertical Spine */}
        <line
          x1="54"
          y1="29"
          x2="54"
          y2="71"
          stroke="url(#logoPapaya)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* 7. Monogram Glyph 'K' - Upper Diagonal Papaya Wing */}
        <line
          x1="55"
          y1="48"
          x2="74"
          y2="29"
          stroke="url(#logoPapaya)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* 8. Monogram Glyph 'K' - Lower Diagonal Cyan Electric Wing */}
        <line
          x1="55"
          y1="52"
          x2="74"
          y2="71"
          stroke="url(#logoCyan)"
          strokeWidth="5.5"
          strokeLinecap="round"
          filter="url(#logoBloom)"
        />

        {/* 9. Central Kinetic Energy Core */}
        <circle cx="54" cy="50" r="2.2" fill="#00E5FF" />
        <circle cx="54" cy="50" r="4.2" stroke="#00E5FF" strokeWidth="0.7" strokeOpacity="0.6" fill="none" />

        {/* 10. Dynamic Lightning Vector between S & K */}
        <path
          d="M 41,47 L 46,41 L 44,48 L 49,43"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logoBloom)"
        />
      </svg>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = false,
  showSubtitle = false,
  animated = false,
  className = "",
  textClassName = "",
  subtitleClassName = "hidden md:inline-block",
}) => {
  // Size conversion
  const sizeMap: Record<string, number> = {
    xs: 24,
    sm: 34,
    md: 42,
    lg: 56,
    xl: 72,
  };
  const sizePx = typeof size === "number" ? size : sizeMap[size] || 42;

  const content = (
    <div className={`inline-flex items-center gap-2.5 group ${className}`}>
      <LogoEmblem sizePx={sizePx} animated={animated} />

      {showText && (
        <div className={`flex flex-col flex-shrink-0 ${textClassName}`}>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-white transition-colors">
              Sunil Khatri
            </span>

            {/* Shift light telemetry dots */}
            <div
              className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/70 border border-white/10"
              title="Vehicle Telemetry Shift Lights"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8000]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A42]" />
            </div>
          </div>

          {showSubtitle && (
            <span className={`text-[10px] text-[#FF8000] font-mono tracking-wider uppercase whitespace-nowrap ${subtitleClassName}`}>
              AUTOMOTIVE & AI SYSTEMS ENGINEER
            </span>
          )}
        </div>
      )}
    </div>
  );

  return content;
};

export default Logo;
