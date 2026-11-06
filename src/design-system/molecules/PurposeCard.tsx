import React from "react";
import { LucideIcon } from "lucide-react";

export interface PurposeCardProps {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}

/**
 * PurposeCard
 * Architectural card used for Guiding Purpose, Mission, and Vision sections.
 * Features 3D preserve-3d layers, subtle elevation depth, and corp-dark border hover.
 */
export function PurposeCard({
  icon: Icon,
  title,
  description,
  className = "",
}: PurposeCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-corp-border p-8 shadow-xs flex items-start gap-5 hover:border-corp-dark transition-colors h-full [transform-style:preserve-3d] ${className}`.trim()}
    >
      <div className="w-12 h-12 rounded-lg bg-corp-light border border-corp-border flex items-center justify-center text-corp-dark shrink-0 [transform:translateZ(16px)]">
        <Icon className="w-6 h-6 stroke-[1.8]" />
      </div>
      <div className="[transform:translateZ(10px)]">
        <h3 className="font-heading text-xl font-bold text-corp-dark mb-2">
          {title}
        </h3>
        <p className="text-sm text-corp-gray leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
