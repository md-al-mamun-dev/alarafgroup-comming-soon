"use client";

import React, { useState } from "react";
import { PerspectiveCard } from "../molecules/PerspectiveCard";

export interface PurposeFocalGridProps {
  children: React.ReactNode[];
  className?: string;
}

export function PurposeFocalGrid({ children, className = "" }: PurposeFocalGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {React.Children.map(children, (child, idx) => {
        const isHovered = hoveredIndex === idx;
        const isDimmed = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-[opacity,transform] ${
              isHovered
                ? "z-20 scale-[1.015]"
                : isDimmed
                ? "z-0 opacity-70 scale-[0.985]"
                : "z-10 opacity-100 scale-100"
            }`}
          >
            <PerspectiveCard maxTilt={6} className="w-full h-full">
              {child}
            </PerspectiveCard>
          </div>
        );
      })}
    </div>
  );
}

