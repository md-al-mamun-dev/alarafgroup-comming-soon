import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "dark" | "outline" | "white";
  className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const variantClasses = {
    neutral: "bg-corp-light text-corp-dark border border-corp-border",
    dark: "bg-corp-dark text-white border border-corp-dark",
    outline: "bg-transparent text-corp-muted border border-corp-border",
    white: "bg-white text-corp-dark border border-corp-border shadow-xs",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

