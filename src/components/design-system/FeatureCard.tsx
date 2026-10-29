import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  badge?: string;
  title: string;
  description: string;
  highlights?: string[];
  ctaText?: string;
  ctaHref?: string;
  mediaSlot?: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  badge,
  title,
  description,
  highlights,
  ctaText,
  ctaHref,
  mediaSlot,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-corp-border overflow-hidden flex flex-col p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow ${className}`}
    >
      {mediaSlot && <div className="mb-6">{mediaSlot}</div>}

      {badge && (
        <span className="self-start text-[11px] font-bold uppercase tracking-wider text-corp-muted bg-corp-light px-3 py-1 rounded-md mb-4">
          {badge}
        </span>
      )}

      <h3 className="font-heading text-xl font-bold text-corp-dark mb-3">
        {title}
      </h3>

      <p className="text-sm text-corp-gray leading-relaxed flex-1 mb-6">
        {description}
      </p>

      {highlights && highlights.length > 0 && (
        <ul className="space-y-2 mb-6 border-t border-corp-border/60 pt-4">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-corp-gray">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="w-full py-2.5 rounded-lg border border-corp-dark text-sm font-medium text-corp-dark hover:bg-corp-dark hover:text-white text-center transition-colors block mt-auto"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}

interface HighlightListProps {
  items: string[];
  title?: string;
  className?: string;
}

export function HighlightList({ items, title, className = "" }: HighlightListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <h4 className="text-xs font-bold uppercase tracking-wider text-corp-dark">
          {title}
        </h4>
      )}
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-corp-gray">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

