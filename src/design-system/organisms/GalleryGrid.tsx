import React from "react";
import { SectionHeader } from "../molecules/SectionHeader";

export interface GalleryItem {
  title: string;
  tag: string;
  spec?: string;
}

export interface GalleryGridProps {
  items: GalleryItem[];
  brandName: string;
  headerTitle?: string;
  countLabel?: string;
  aspectRatio?: "fashion" | "agro";
  columns?: 3 | 4;
  className?: string;
}

export function GalleryGrid({
  items,
  brandName,
  headerTitle = "Gallery",
  countLabel,
  aspectRatio = "fashion",
  columns = 4,
  className = "",
}: GalleryGridProps) {
  const aspectClass = aspectRatio === "fashion" ? "aspect-[281/239]" : "aspect-[383/239]";
  const colClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-corp-dark tracking-tight">
          {headerTitle}
        </h2>
        {countLabel && (
          <span className="text-xs font-mono text-corp-muted">{countLabel}</span>
        )}
      </div>

      <div className={`grid ${colClass} gap-6`}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${aspectClass} rounded-xl bg-corp-light border border-corp-border p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md transition-shadow`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-corp-dark bg-white/90 px-2 py-0.5 rounded border border-corp-border">
                {item.tag}
              </span>
              <span className="font-mono text-[10px] text-corp-muted">0{index + 1}</span>
            </div>

            <div className="relative z-10 text-center my-auto">
              <h4 className="font-heading text-sm sm:text-base font-bold text-corp-dark leading-snug">
                {item.title}
              </h4>
              <span className="text-[11px] text-corp-muted block mt-1 font-mono">
                {aspectRatio === "fashion" ? "281 × 239 Media Frame" : "383 × 239 Media Frame"}
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] text-corp-muted border-t border-corp-border pt-2">
              <span>{brandName}</span>
              <span className="font-medium text-corp-dark">Operational</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

