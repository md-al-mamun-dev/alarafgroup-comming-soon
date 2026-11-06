import React from "react";
import { ScrollReveal } from "./ScrollReveal";

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatsBarProps {
  stats: StatItem[];
  bgColor?: "white" | "light";
  className?: string;
}

export function StatsBar({ stats, bgColor = "white", className = "" }: StatsBarProps) {
  const bgClass = bgColor === "white" ? "bg-white" : "bg-corp-light";

  return (
    <section className={`w-full ${bgClass} py-16 sm:py-20 border-b border-corp-border ${className}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div
          className={`grid grid-cols-1 md:grid-cols-${stats.length} gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-corp-border`}
        >
          {stats.map((stat, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 150}
              className="pt-6 md:pt-0 px-4 first:pl-0 last:pr-0"
            >
              <div className="font-heading text-4xl sm:text-5xl font-extrabold text-corp-dark tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-corp-muted">
                {stat.label}
              </div>
              {stat.description && (
                <p className="mt-2 text-xs text-corp-gray max-w-xs mx-auto">
                  {stat.description}
                </p>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

