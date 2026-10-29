import React from "react";
import { Badge } from "../atoms/Badge";
import { Breadcrumb, BreadcrumbItem } from "../atoms/Breadcrumb";
import { Shield, Building2 } from "lucide-react";

export interface LandingHeroProps {
  breadcrumbs?: BreadcrumbItem[];
  badgeLabel?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  floatingCard?: {
    icon?: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    statusText?: string;
  };
  className?: string;
}

export function LandingHero({
  breadcrumbs,
  badgeLabel,
  title,
  subtitle,
  description,
  actions,
  imageUrl = "/images/landing/hero-corporate.jpg",
  imageAlt = "AL Araf Group Corporate Headquarters",
  floatingCard = {
    icon: Shield,
    title: "AL Araf Group HQ",
    subtitle: "Dhaka, Bangladesh • Corporate Excellence",
    statusText: "SPEC // 03_LANDING",
  },
  className = "",
}: LandingHeroProps) {
  const Icon = floatingCard.icon || Shield;

  return (
    <section
      className={`relative w-full min-h-[580px] lg:min-h-[660px] bg-white border-b border-corp-border overflow-hidden flex items-center ${className}`}
    >
      {/* ── Background Image Layer (Anchored Right) ──────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover object-[center_right] lg:object-[82%_center] opacity-95 transition-transform duration-1000 ease-out"
        />

        {/* Desktop Gradient Mask: Pure white on left, dissolving smoothly to transparent on right */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-[72%] z-10" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent w-[85%] z-10" />

        {/* Mobile & Tablet Gradient Mask: Vertical fade to protect readability */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/75 z-10" />

        {/* Ambient subtle corner glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ── Content Container ───────────────────────────────────── */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 w-full py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Copy, CTA Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6 max-w-2xl">
            {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-1" />}
            {badgeLabel && (
              <Badge variant="white" className="self-start border-corp-border/80 shadow-xs">
                {badgeLabel}
              </Badge>
            )}

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-corp-dark tracking-tight leading-[1.08]">
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

            {actions && (
              <div className="flex flex-wrap items-center gap-4 pt-3">
                {actions}
              </div>
            )}
          </div>

          {/* Right Column: Floating Glassmorphic Stat Card */}
          <div className="hidden lg:col-span-5 lg:flex justify-end items-center pr-4">
            <div className="bg-white/90 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-xl max-w-sm w-full transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-xl bg-corp-dark text-white flex items-center justify-center shadow-xs shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-corp-dark leading-tight">
                    {floatingCard.title}
                  </h3>
                  <p className="text-xs text-corp-muted font-medium mt-0.5">
                    {floatingCard.subtitle}
                  </p>
                </div>
              </div>

              {floatingCard.statusText && (
                <div className="pt-3 border-t border-corp-border/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Verified Headquarters
                  </span>
                  <span className="text-[11px] text-corp-muted font-mono">
                    {floatingCard.statusText}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

