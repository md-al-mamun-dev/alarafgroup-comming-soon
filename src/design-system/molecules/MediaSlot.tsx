import React from "react";
import { LucideIcon } from "lucide-react";

export interface MediaSlotProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  footerSpec?: string;
  footerStatus?: string;
  aspectRatio?: "hero" | "brand-card" | "brand-feature" | "standard" | "square";
  variant?: "gray" | "ivory" | "dark";
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

export function MediaSlot({
  icon: Icon,
  badgeText,
  title,
  subtitle,
  footerSpec,
  footerStatus,
  aspectRatio = "brand-feature",
  variant = "gray",
  imageUrl,
  imageAlt = "Visual representation",
  className = "",
}: MediaSlotProps) {
  const aspectClass = {
    hero: "aspect-[584/399]",
    "brand-card": "aspect-[333/199]",
    "brand-feature": "aspect-[584/319]",
    standard: "aspect-[16/10]",
    square: "aspect-square",
  }[aspectRatio];

  const variantClass = {
    gray: "bg-corp-light border-[#6B7280] text-corp-dark",
    ivory: "bg-[#F9FAFB] border-corp-border text-corp-dark",
    dark: "bg-corp-dark border-gray-800 text-white",
  }[variant];

  const hasImage = Boolean(imageUrl);

  return (
    <div
      className={`w-full max-w-xl ${aspectClass} rounded-2xl ${
        hasImage ? "border border-corp-border/80 bg-stone-900" : `${variantClass} border`
      } p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-xs group ${className}`}
    >
      {/* Background: Either real image with gradient scrim OR geometric pattern */}
      {hasImage ? (
        <>
          <img
            src={imageUrl}
            alt={imageAlt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Elegant gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      )}

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        {Icon && (
          <div
            className={`w-11 h-11 rounded-xl ${
              hasImage
                ? "bg-black/40 text-white border border-white/20 backdrop-blur-md"
                : "bg-white border border-corp-border text-corp-dark"
            } shadow-xs flex items-center justify-center`}
          >
            <Icon className="w-5 h-5 stroke-[1.75]" />
          </div>
        )}
        {badgeText && (
          <span
            className={`text-[11px] font-bold uppercase tracking-widest ${
              hasImage
                ? "text-white bg-black/50 border-white/25 backdrop-blur-md"
                : "text-corp-gray bg-white/95 border-corp-border"
            } px-3 py-1 rounded-md border shadow-xs ml-auto`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Center content */}
      {(title || subtitle) && (
        <div className="relative z-10 my-auto text-center py-3">
          {title && (
            <span
              className={`font-heading text-lg sm:text-xl font-bold ${
                hasImage ? "text-white drop-shadow-sm" : "text-corp-dark"
              } block mb-1`}
            >
              {title}
            </span>
          )}
          {subtitle && (
            <span
              className={`text-xs ${
                hasImage ? "text-stone-200" : "text-corp-muted"
              } font-medium max-w-sm mx-auto block leading-relaxed`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Bottom Footer info */}
      {(footerSpec || footerStatus) && (
        <div
          className={`relative z-10 flex items-center justify-between text-xs ${
            hasImage
              ? "text-stone-300 border-t border-white/20"
              : "text-corp-muted border-t border-corp-border/80"
          } pt-3 mt-auto`}
        >
          {footerSpec && (
            <span className="font-mono text-[11px] tracking-wide">{footerSpec}</span>
          )}
          {footerStatus && (
            <span
              className={`font-semibold ${
                hasImage ? "text-white drop-shadow-xs" : "text-corp-dark"
              }`}
            >
              {footerStatus}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
