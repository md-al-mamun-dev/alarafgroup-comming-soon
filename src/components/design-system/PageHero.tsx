import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-corp-muted ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-corp-dark transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-corp-dark font-bold">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

interface PageHeroProps {
  breadcrumbs?: BreadcrumbItem[];
  badgeLabel?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  mediaSlot?: React.ReactNode;
  bgColor?: "white" | "light";
  className?: string;
}

export function PageHero({
  breadcrumbs,
  badgeLabel,
  title,
  subtitle,
  description,
  actions,
  mediaSlot,
  bgColor = "light",
  className = "",
}: PageHeroProps) {
  const bgClass = bgColor === "light" ? "bg-corp-light border-b border-corp-border" : "bg-white border-b border-corp-border";

  return (
    <section className={`w-full ${bgClass} py-14 sm:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {mediaSlot ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
              {badgeLabel && (
                <div className="inline-flex items-center gap-2 self-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-corp-gray bg-white border border-corp-border px-3 py-1 rounded-full shadow-xs">
                    {badgeLabel}
                  </span>
                </div>
              )}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-corp-dark tracking-tight leading-[1.1]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-base sm:text-lg text-corp-gray leading-relaxed font-medium">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-sm sm:text-base text-corp-muted leading-relaxed">
                  {description}
                </p>
              )}
              {actions && <div className="flex flex-wrap items-center gap-4 pt-2">{actions}</div>}
            </div>
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              {mediaSlot}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl flex flex-col space-y-4">
            {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
            {badgeLabel && (
              <div className="inline-flex items-center gap-2 self-start">
                <span className="text-xs font-bold uppercase tracking-wider text-corp-gray bg-white border border-corp-border px-3 py-1 rounded-full shadow-xs">
                  {badgeLabel}
                </span>
              </div>
            )}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-corp-dark tracking-tight leading-[1.1]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base sm:text-lg text-corp-gray leading-relaxed font-medium pt-1">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-sm sm:text-base text-corp-muted leading-relaxed">
                {description}
              </p>
            )}
            {actions && <div className="flex flex-wrap items-center gap-4 pt-4">{actions}</div>}
          </div>
        )}
      </div>
    </section>
  );
}

