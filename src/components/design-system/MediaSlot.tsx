import React from "react";
import { LucideIcon } from "lucide-react";

interface MediaSlotProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  footerSpec?: string;
  footerStatus?: string;
  aspectRatio?: "hero" | "brand-card" | "brand-feature" | "standard";
  variant?: "gray" | "ivory" | "dark";
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
  className = "",
}: MediaSlotProps) {
  const aspectClass = {
    hero: "aspect-[584/399]",
    "brand-card": "aspect-[333/199]",
    "brand-feature": "aspect-[584/319]",
    standard: "aspect-[16/10]",
  }[aspectRatio];

  const variantClass = {
    gray: "bg-corp-light border-gray-300 text-corp-dark",
    ivory: "bg-[#F9FAFB] border-corp-border text-corp-dark",
    dark: "bg-corp-dark border-gray-800 text-white",
  }[variant];

  return (
    <div
      className={`w-full max-w-xl ${aspectClass} rounded-2xl ${variantClass} border p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xs group ${className}`}
    >
      {/* Pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-white border border-corp-border shadow-xs flex items-center justify-center text-corp-dark">
            <Icon className="w-6 h-6 stroke-[1.75]" />
          </div>
        )}
        {badgeText && (
          <span className="text-[11px] font-bold uppercase tracking-widest text-corp-gray bg-white/95 px-3 py-1 rounded-md border border-corp-border backdrop-blur-xs ml-auto">
            {badgeText}
          </span>
        )}
      </div>

      {/* Center content */}
      {(title || subtitle) && (
        <div className="relative z-10 my-auto text-center py-4">
          {title && (
            <span className="font-heading text-lg sm:text-xl font-bold text-corp-dark block mb-1">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-corp-muted font-medium">
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Bottom Footer info */}
      {(footerSpec || footerStatus) && (
        <div className="relative z-10 flex items-center justify-between text-xs text-corp-muted border-t border-corp-border/80 pt-3 mt-auto">
          {footerSpec && <span className="font-mono text-[11px]">{footerSpec}</span>}
          {footerStatus && <span className="font-semibold text-corp-dark">{footerStatus}</span>}
        </div>
      )}
    </div>
  );
}
