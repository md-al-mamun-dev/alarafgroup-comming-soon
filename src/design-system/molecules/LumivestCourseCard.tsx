"use client";

import React from "react";
import Link from "next/link";
import { LumivestSecondaryButton } from "../atoms/LumivestSecondaryButton";

export interface LumivestCourseCardProps {
  category?: string;
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
  details?: string[];
  buttonText?: string;
  href?: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * Pixel-perfect clone of the card item from the "Master skills that shape your future"
 * section on https://lumivest.framer.website/
 *
 * Structure & Styling:
 * - Card Container: bg-[#F2F0EA] (light sand/ivory), rounded-[16px], p-4, gap-4 flex-col
 * - Image Box: rounded-[16px] overflow-hidden with smooth zoom on hover
 * - Top Badge: "Foundation" (or custom category), bg-[#F2F0EA], rounded-[8px], py-2 px-4, text-[#1C1C1A]
 * - Hover Overlay: backdrop-blur-[5px] + subtle dark tint
 * - Hover Action: Centered "View Details" LumivestSecondaryButton revealed on hover
 * - Title: 24px General Sans font-semibold text-[#1C1C1A]
 * - Metadata Row: 6px #8C7B5E accent circle bullets + text-[#545454] (e.g. Beginner, 6 Weeks, 24 Lessons)
 */
export function LumivestCourseCard({
  category = "Foundation",
  title = "Real Estate Fundamentals",
  imageUrl = "/images/landing/lumivest-course.jpg",
  imageAlt = "Real Estate Fundamentals Course",
  details = ["Beginner", "6 Weeks", "24 Lessons"],
  buttonText = "View Details",
  href = "#details",
  onButtonClick,
  className = "",
}: LumivestCourseCardProps) {
  return (
    <div
      className={`group relative flex flex-col gap-4 p-4 rounded-[16px] bg-[#F2F0EA] border border-transparent hover:border-[#E2DED2] transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer select-none overflow-hidden max-w-[556px] w-full [transform-style:preserve-3d] ${className}`.trim()}
    >
      {/* ── Top Media Container ───────────────────────────────── */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[16px] overflow-hidden bg-stone-200 [transform-style:preserve-3d]">
        {/* Category Pill Tag */}
        {category && (
          <div className="absolute top-[18px] left-[16px] z-10 px-4 py-2 rounded-[8px] bg-[#F2F0EA] text-[#1C1C1A] font-['General_Sans',sans-serif] text-[13px] font-semibold tracking-wide shadow-xs [transform:translateZ(18px)] transition-transform duration-300">
            {category}
          </div>
        )}

        {/* Course Image */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Hover Blur Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/10 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
        />

        {/* Hover Action Button ("View Details") */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-auto [transform:translateZ(20px)]">
          <LumivestSecondaryButton
            href={href}
            variant="light"
            onClick={onButtonClick}
          >
            {buttonText}
          </LumivestSecondaryButton>
        </div>
      </div>

      {/* ── Bottom Content & Metadata ─────────────────────────── */}
      <div className="flex flex-col gap-2.5 w-full pt-1">
        {/* Title */}
        <h3 className="font-['General_Sans',sans-serif] text-[22px] sm:text-[24px] font-semibold leading-[28px] text-[#1C1C1A] tracking-tight group-hover:text-black transition-colors">
          {title}
        </h3>

        {/* Metadata Details Row */}
        {details && details.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] sm:text-[15px] text-[#545454] font-['General_Sans',sans-serif] font-normal">
            {details.map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[#8C7B5E] shrink-0"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

