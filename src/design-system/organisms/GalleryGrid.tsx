import React from "react";
import { SectionHeader } from "../molecules/SectionHeader";

export interface GalleryItem {
  title: string;
  tag?: string;
  spec?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface GalleryGridProps {
  items: GalleryItem[];
  brandName?: string;
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
            className={`${aspectClass} rounded-xl bg-corp-light border border-corp-border p-5 sm:p-6 flex flex-col justify-end relative overflow-hidden group shadow-xs hover:shadow-lg transition-all duration-300`}
          >
            {item.imageUrl ? (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            )}

            <div className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <span
                className={`font-mono text-xs font-semibold tracking-wider block mb-1 ${
                  item.imageUrl ? "text-white/70" : "text-corp-muted"
                }`}
              >
                0{index + 1}
              </span>
              <h4
                className={`font-heading text-base sm:text-lg font-bold leading-snug ${
                  item.imageUrl ? "text-white drop-shadow-sm" : "text-corp-dark"
                }`}
              >
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

