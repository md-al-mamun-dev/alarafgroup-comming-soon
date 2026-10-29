import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  bgColor?: "light" | "white" | "dark";
  className?: string;
}

export function CtaBanner({
  title,
  description,
  primaryCta,
  secondaryCta,
  bgColor = "light",
  className = "",
}: CtaBannerProps) {
  const bgClasses = {
    light: "bg-corp-light text-corp-dark border-t border-corp-border",
    white: "bg-white text-corp-dark border-t border-corp-border",
    dark: "bg-corp-dark text-white",
  }[bgColor];

  return (
    <section className={`w-full ${bgClasses} py-20 sm:py-24 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed mb-8 opacity-80 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCta.isExternal || primaryCta.href.startsWith("mailto:") || primaryCta.href.startsWith("http") ? (
            <a
              href={primaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-corp-dark text-white font-semibold hover:bg-gray-800 transition-colors shadow-xs"
            >
              <span>{primaryCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <Link
              href={primaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-corp-dark text-white font-semibold hover:bg-gray-800 transition-colors shadow-xs"
            >
              <span>{primaryCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-corp-dark text-corp-dark font-semibold hover:bg-white transition-colors"
            >
              <span>{secondaryCta.label}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

