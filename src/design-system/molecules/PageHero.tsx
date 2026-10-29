import React from "react";
import { Breadcrumb, BreadcrumbItem } from "../atoms/Breadcrumb";
import { Badge } from "../atoms/Badge";

export interface PageHeroProps {
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
  const bgClass =
    bgColor === "light"
      ? "bg-corp-light border-b border-corp-border"
      : "bg-white border-b border-corp-border";

  return (
    <section className={`w-full ${bgClass} py-14 sm:py-20 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        {mediaSlot ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
              {badgeLabel && <Badge variant="white" className="self-start">{badgeLabel}</Badge>}
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
            {badgeLabel && <Badge variant="white" className="self-start">{badgeLabel}</Badge>}
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

