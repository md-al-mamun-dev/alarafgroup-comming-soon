"use client";

import React from "react";
import Link from "next/link";

export interface LumivestSecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "light" | "dark" | "accent";
  href?: string;
  isExternal?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Pixel-perfect clone of the secondary pill button ("Explore Courses" / "View Details")
 * from https://lumivest.framer.website/
 *
 * Light Variant (Default - paired with Book Call in Hero):
 * - Default Background: #F2F0EA (rgb(242, 240, 234))
 * - Hover Background: #DBD7CA (rgb(219, 215, 202))
 * - Text Color: #1C1C1A (rgb(28, 28, 26))
 * - Font: General Sans 20px, weight 500, line-height 24px
 * - Padding: py-4 px-[34px] (16px vertical, 34px horizontal)
 * - Border Radius: 244px fully rounded pill
 * - Transition: 400ms ease-out
 *
 * Dark Variant (Navbar / Footer):
 * - Default Background: #1C1C1A, Text: #FAFAF7
 * - Hover Background: #121211 (rgb(18, 18, 17))
 *
 * Accent Variant:
 * - Default Background: #8C7B5E (rgb(140, 123, 94)), Text: #FAFAF7
 * - Hover Background: #6E5D41 (rgb(110, 93, 65))
 */
export function LumivestSecondaryButton({
  variant = "light",
  href,
  isExternal,
  children = "Explore Courses",
  className = "",
  onClick,
  type = "button",
  ...props
}: LumivestSecondaryButtonProps) {
  const variantStyles = {
    light:
      "bg-[#F2F0EA] text-[#1C1C1A] ring-1 ring-inset ring-[#EAE6DD] hover:bg-[#DBD7CA] hover:ring-[#DDD8CD] focus-visible:ring-[#1C1C1A] focus-visible:ring-offset-[#F2F0EA]",
    dark:
      "bg-[#1C1C1A] text-[#FAFAF7] hover:bg-[#121211] focus-visible:ring-[#8C7B5E] focus-visible:ring-offset-[#1C1C1A]",
    accent:
      "bg-[#8C7B5E] text-[#FAFAF7] hover:bg-[#6E5D41] focus-visible:ring-[#8C7B5E] focus-visible:ring-offset-[#8C7B5E]",
  }[variant];

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2.5 py-4 px-[34px] rounded-[244px] no-underline cursor-pointer select-none transition-all duration-400 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none";

  const textClasses =
    "font-['General_Sans',sans-serif] text-[20px] font-medium leading-[24px] tracking-normal select-none";

  const combinedClasses = `${baseClasses} ${variantStyles} ${className}`.trim();

  const content = <span className={textClasses}>{children}</span>;

  if (href) {
    const isOutbound =
      isExternal ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isOutbound) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={isExternal || href.startsWith("http") ? "_blank" : undefined}
          rel={
            isExternal || href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

