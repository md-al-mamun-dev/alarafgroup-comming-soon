"use client";

import React from "react";
import Link from "next/link";

export type LumivestButtonRotate = "45" | "90" | "180" | "none";

export interface BookCallButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  isExternal?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  rotate?: LumivestButtonRotate;
  showIcon?: boolean;
  iconCircle?: boolean;
  size?: "default" | "md";
  className?: string;
}

function renderIcon(
  icon: React.ReactNode | React.ComponentType<{ className?: string }> | undefined,
  isMd: boolean
) {
  if (!icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${isMd ? "p-[3px]" : "p-[4px]"}`}
      >
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="#1C1C1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (React.isValidElement(icon)) {
    return icon;
  }

  if (typeof icon === "function" || (typeof icon === "object" && icon !== null)) {
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return (
      <IconComponent
        className={isMd ? "w-3 h-3 text-[#1C1C1A]" : "w-3.5 h-3.5 text-[#1C1C1A]"}
      />
    );
  }

  return icon as React.ReactNode;
}

/**
 * Pixel-perfect clone of the "Book Call" button from https://lumivest.framer.website/
 *
 * Default State:
 * - Dimensions: approx 195px x 56px (fluid from content & padding: py-4 px-[34px])
 * - Background: #1C1C1A (dark charcoal)
 * - Border Radius: 87px fully rounded pill shape
 * - Text: "Book Call", #FAFAF7, General Sans 20px, weight 500, line-height 24px
 * - Right Icon: 24px x 24px #FAFAF7 circle with dark arrow pointing up-right (↗)
 * - Clipping: overflow-hidden
 *
 * Hover Animation (400–600ms, tuned to Framer's cubic-bezier(0.5, 0, 0.2, 1)):
 * - Layer 1: Separate #8C7B5E gold circle beneath the arrow expands outward (scale 1 -> 18),
 *   creating a circular reveal clipped by the pill shape, while button background resolves to #8C7B5E.
 * - Layer 2: Label remains stationary, off-white (#FAFAF7), above the expanding circle (z-10).
 * - Layer 3: Icon circle remains stationary, off-white (#FAFAF7), above the expanding circle (z-10).
 * - Arrow smoothly rotates clockwise according to the `rotate` prop (default 45°: ↗ to →).
 * - Reverses smoothly on pointer leave.
 */
export function BookCallButton({
  href,
  isExternal,
  children = "Book Call",
  icon,
  rotate = "45",
  showIcon = true,
  iconCircle = true,
  size = "default",
  className = "",
  onClick,
  type = "button",
  ...props
}: BookCallButtonProps) {
  const isMd = size === "md";

  const rotationClass = {
    "45": "group-hover:rotate-45",
    "90": "group-hover:rotate-90",
    "180": "group-hover:rotate-180",
    "none": "group-hover:rotate-0",
  }[rotate];

  const content = (
    <>
      {/* ── Layer 1: The Expander Gold Circle (#8C7B5E) ──────── */}
      {showIcon && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-[#8C7B5E] z-0 transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover:scale-[18] motion-reduce:transition-none motion-reduce:transform-none origin-center will-change-transform ${
            iconCircle ? "scale-100" : "scale-0"
          } ${
            isMd ? "w-[22px] h-[22px] right-6" : "w-6 h-6 right-[34px]"
          }`}
        />
      )}

      {/* ── Layer 2: Button Label ────────────────────────────── */}
      <span
        className={`relative z-10 text-[#FAFAF7] font-['General_Sans',sans-serif] font-medium leading-[24px] tracking-normal select-none transform-gpu translate-z-0 backface-hidden antialiased will-change-transform ${
          isMd ? "text-[16px]" : "text-[20px]"
        }`}
      >
        {children}
      </span>

      {/* ── Layer 3: Icon Container & Rotating Arrow ─── */}
      {showIcon && (
        <span
          aria-hidden="true"
          className={`relative z-10 flex items-center justify-center shrink-0 ${
            iconCircle
              ? `rounded-full bg-[#FAFAF7] text-[#1C1C1A] overflow-hidden ${
                  isMd ? "w-[22px] h-[22px]" : "w-6 h-6"
                }`
              : `bg-transparent text-[#FAFAF7] ${
                  isMd ? "w-[22px] h-[22px]" : "w-6 h-6"
                }`
          }`}
        >
          <span
            className={`w-full h-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] ${rotationClass} motion-reduce:transition-none motion-reduce:transform-none origin-center will-change-transform`}
          >
            {renderIcon(icon, isMd)}
          </span>
        </span>
      )}
    </>
  );

  const sizeClasses = isMd
    ? showIcon
      ? "gap-3 py-3 px-6"
      : "py-3 px-6"
    : showIcon
      ? "gap-4 py-4 px-[34px]"
      : "py-4 px-8";

  const baseClasses =
    `group relative inline-flex items-center justify-center rounded-[87px] bg-[#1C1C1A] text-[#FAFAF7] overflow-hidden no-underline cursor-pointer select-none isolate transform-gpu transition-colors duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] hover:bg-[#8C7B5E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C7B5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1A] motion-reduce:transition-none ${sizeClasses}`;

  const combinedClasses = `${baseClasses} ${className}`.trim();

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

export { BookCallButton as LumivestPrimaryButton };
export type { BookCallButtonProps as LumivestPrimaryButtonProps };

