import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../atoms/Button";
import { ScrollReveal } from "./ScrollReveal";

export interface CtaBannerProps {
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  actions?: React.ReactNode;
  bgColor?: "light" | "white" | "dark";
  className?: string;
}

export function CtaBanner({
  title,
  description,
  primaryCta,
  secondaryCta,
  actions,
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
        <ScrollReveal delay={0}>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-8 opacity-80 max-w-2xl mx-auto">
            {description}
          </p>
        </ScrollReveal>

        {actions ? (
          <ScrollReveal delay={150}>
            {actions}
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={150}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {primaryCta && (
                <Button
                  href={primaryCta.href}
                  isExternal={primaryCta.isExternal}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {primaryCta.label}
                </Button>
              )}

              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

