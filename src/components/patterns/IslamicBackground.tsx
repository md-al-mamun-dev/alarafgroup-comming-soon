import React from "react";
import { cn } from "@/src/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function IslamicBackground({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-jade via-brand-emerald to-brand-emerald" />
      
      {/* Central glow */}
      <div className="absolute inset-0 flex items-start justify-center pt-[5%] md:pt-[2%]">
        <div className="w-[120vw] h-[120vw] md:w-[75vw] md:h-[75vw] rounded-full bg-brand-gold/25 blur-[150px] mix-blend-screen" />
      </div>

      {/* Abstract Architectural Frame SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.4]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arch-glow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#C5A46D" stopOpacity="1" />
            <stop offset="50%" stopColor="#C5A46D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C5A46D" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A46D" stopOpacity="0" />
            <stop offset="20%" stopColor="#C5A46D" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C5A46D" stopOpacity="1" />
            <stop offset="80%" stopColor="#C5A46D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C5A46D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central subtle arch outline */}
        <path
          d="M320 800 V400 C320 200, 520 120, 720 50 C920 120, 1120 200, 1120 400 V800"
          fill="none"
          stroke="url(#arch-glow)"
          strokeWidth="1.5"
          className="animate-fade-in"
          style={{ animationDuration: '2s' }}
        />
        
        {/* Inner parallel arch */}
        <path
          d="M340 800 V405 C340 215, 530 140, 720 80 C910 140, 1100 215, 1100 405 V800"
          fill="none"
          stroke="url(#arch-glow)"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Top Horizontal geometric accents */}
        <line x1="0" y1="40" x2="1440" y2="40" stroke="url(#line-glow)" strokeWidth="0.5" opacity="0.4" />
        <line x1="0" y1="50" x2="1440" y2="50" stroke="url(#line-glow)" strokeWidth="1.5" opacity="0.6" />
        <line x1="0" y1="60" x2="1440" y2="60" stroke="url(#line-glow)" strokeWidth="0.5" opacity="0.4" />
        
        {/* Center geometric star accent at the peak of the arch */}
        <g transform="translate(720, 50) scale(0.6)" stroke="#C5A46D" fill="none" strokeWidth="2" opacity="0.8">
          <path d="M0 -30 L10 -10 L30 0 L10 10 L0 30 L-10 10 L-30 0 L-10 -10 Z" />
          <path d="M0 -15 L5 -5 L15 0 L5 5 L0 15 L-5 5 L-15 0 L-5 -5 Z" fill="#C5A46D" />
          <circle cx="0" cy="0" r="45" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="60" strokeWidth="0.25" />
        </g>

        {/* Side geometric nodes */}
        <g transform="translate(150, 250) scale(0.4)" stroke="#C5A46D" fill="none" strokeWidth="1.5" opacity="0.5">
          <path d="M0 -30 L10 -10 L30 0 L10 10 L0 30 L-10 10 L-30 0 L-10 -10 Z" />
          <circle cx="0" cy="0" r="45" strokeWidth="0.5" />
        </g>
        <g transform="translate(1290, 250) scale(0.4)" stroke="#C5A46D" fill="none" strokeWidth="1.5" opacity="0.5">
          <path d="M0 -30 L10 -10 L30 0 L10 10 L0 30 L-10 10 L-30 0 L-10 -10 Z" />
          <circle cx="0" cy="0" r="45" strokeWidth="0.5" />
        </g>

        {/* Vertical subtle guides */}
        <line x1="10%" y1="0" x2="10%" y2="800" stroke="#C5A46D" strokeWidth="1" strokeDasharray="4 12" opacity="0.2" />
        <line x1="90%" y1="0" x2="90%" y2="800" stroke="#C5A46D" strokeWidth="1" strokeDasharray="4 12" opacity="0.2" />
      </svg>
    </div>
  );
}
