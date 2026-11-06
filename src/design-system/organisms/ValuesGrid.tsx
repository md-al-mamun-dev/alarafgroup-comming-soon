import React from "react";
import { LucideIcon } from "lucide-react";
import { IconFrame } from "../atoms/IconFrame";
import { SectionHeader } from "../molecules/SectionHeader";
import { ScrollReveal } from "../molecules/ScrollReveal";

export interface ValuePillarItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
}

export interface ValuesGridProps {
  pillars: ValuePillarItem[];
  columns?: 4 | 5;
  header?: {
    eyebrow?: string;
    title: string;
    description?: string;
  };
  itemAlign?: "left" | "center";
  className?: string;
}

export function ValuesGrid({
  pillars,
  columns = 4,
  header,
  itemAlign = "left",
  className = "",
}: ValuesGridProps) {
  const colClasses =
    columns === 5
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  const itemAlignmentClass =
    itemAlign === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`w-full ${className}`}>
      {header && (
        <ScrollReveal delay={0}>
          <SectionHeader
            eyebrow={header.eyebrow}
            title={header.title}
            description={header.description}
            className="mb-16"
          />
        </ScrollReveal>
      )}

      <div className={`grid ${colClasses} gap-8`}>
        {pillars.map((pillar, idx) => (
          <ScrollReveal
            key={pillar.id}
            delay={idx * 150}
            className={`flex flex-col space-y-4 ${itemAlignmentClass}`}
          >
            <IconFrame
              icon={pillar.icon}
              shape="circle"
              variant="white"
              size="md"
            />
            <h3 className="font-heading text-lg font-bold text-corp-dark">
              {pillar.title}
            </h3>
            <p className="text-sm text-corp-gray leading-relaxed">
              {pillar.description}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

