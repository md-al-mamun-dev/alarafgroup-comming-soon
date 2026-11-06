import React from "react";
import { ContentCard, ContentCardItem } from "../molecules/ContentCard";
import { SectionHeader } from "../molecules/SectionHeader";

export interface CardGridProps {
  items: ContentCardItem[];
  columns?: 2 | 3 | 4;
  cardVariant?: "white" | "light";
  cardAlign?: "left" | "center" | "center-justify";
  header?: {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
  };
  className?: string;
}

export function CardGrid({
  items,
  columns = 4,
  cardVariant = "white",
  cardAlign = "left",
  header,
  className = "",
}: CardGridProps) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`w-full ${className}`}>
      {header && (
        <SectionHeader
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
          align={header.align}
          className="mb-12"
        />
      )}

      <div className={`grid ${colClasses} gap-6 sm:gap-8`}>
        {items.map((item) => (
          <ContentCard key={item.id} item={item} variant={cardVariant} align={cardAlign} />
        ))}
      </div>
    </div>
  );
}

