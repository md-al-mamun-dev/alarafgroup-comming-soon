import React from "react";
import { Badge } from "../atoms/Badge";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-widest text-corp-muted mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-corp-dark tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-corp-gray leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

