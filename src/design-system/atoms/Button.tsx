import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-8 py-3.5 text-sm sm:text-base",
  }[size];

  const variantClasses = {
    primary:
      "bg-corp-dark text-white border-2 border-corp-dark font-bold hover:bg-white hover:text-corp-dark hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-white text-corp-dark border-2 border-corp-dark font-bold hover:bg-corp-dark hover:text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "bg-transparent text-corp-dark border border-corp-border font-medium hover:border-corp-dark hover:bg-white",
    ghost:
      "bg-transparent text-corp-dark font-medium hover:bg-corp-light/60",
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-[7px] transition-all duration-300 shadow-xs cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-corp-dark ${sizeClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </>
  );

  if (href) {
    if (isExternal || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
      return (
        <a href={href} className={baseClasses} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}

