"use client";

import React from "react";
import Link from "next/link";
import type { LumivestButtonRotate } from "./BookCallButton";

export type LumivestInteractiveSecondaryVariant =
  | "expand"
  | "invert"
  | "slide"
  | "outline-fill"
  | "gold-fill"
  | "elevate-shadow"
  | "border-glow";

export type LumivestInteractiveSecondaryBorderStyle =
  | "none"
  | "subtle"
  | "prominent"
  | "accent";

export type LumivestInteractiveSecondarySurface = "sand" | "light";

export type LumivestIconAnimation = "rotate" | "slide" | "pop";

export type LumivestSocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "whatsapp";

export type { LumivestButtonRotate };

export function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export interface LumivestInteractiveSecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: LumivestInteractiveSecondaryVariant;
  borderStyle?: LumivestInteractiveSecondaryBorderStyle;
  surface?: LumivestInteractiveSecondarySurface;
  href?: string;
  isExternal?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  social?: LumivestSocialPlatform;
  iconAnimation?: LumivestIconAnimation;
  rotate?: LumivestButtonRotate;
  showIcon?: boolean;
  iconCircle?: boolean;
  size?: "default" | "md" | "sm";
  className?: string;
  labelClassName?: string;
}

function renderIcon(
  icon: React.ReactNode | React.ComponentType<{ className?: string }> | undefined,
  social: LumivestSocialPlatform | undefined,
  isMd: boolean
) {
  if (social) {
    const iconClass = isMd ? "w-3.5 h-3.5 text-current" : "w-4 h-4 text-current";
    switch (social) {
      case "facebook":
        return <FacebookIcon className={iconClass} />;
      case "instagram":
        return <InstagramIcon className={iconClass} />;
      case "linkedin":
        return <LinkedInIcon className={iconClass} />;
      case "whatsapp":
        return <WhatsAppIcon className={iconClass} />;
    }
  }

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
          stroke="currentColor"
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

  if (
    typeof icon === "function" ||
    (typeof icon === "object" && icon !== null && "$$typeof" in icon)
  ) {
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return (
      <IconComponent
        className={isMd ? "w-3 h-3 text-current" : "w-3.5 h-3.5 text-current"}
      />
    );
  }

  return null;
}

/**
 * LumivestInteractiveSecondaryButton
 *
 * Micro-interactive secondary pill button adhering to Lumivest design language.
 * Provides rich organic hover interactions while maintaining strict 60fps
 * smoothness and anti-flickering GPU hardware acceleration.
 *
 * Surface Tones (`surface`):
 * - "sand" (default): Base #F2F0EA (Light Sand), reveal #DBD7CA.
 * - "light": Base #FAFAF7 (Luminous Off-White), reveal #EAE6DD (Soft Warm Sand).
 *
 * Border Prominences (`borderStyle`):
 * - "none": `ring-0` borderless flat look.
 * - "subtle" (default): `ring-1 ring-inset ring-[#EAE6DD]` refined hairline.
 * - "prominent": `ring-2 ring-inset ring-[#1C1C1A]/30` crisp architectural boundary.
 * - "accent": `ring-[1.5px] ring-inset ring-[#8C7B5E]/70` signature luxury gold outline.
 *
 * Hover Animation Archetypes (`variant`):
 * 1. "expand" (default):
 *    - Circular wave expands from icon position, filling the pill.
 *    - Label: Fixed #1C1C1A text, stable without jitter.
 *    - Icon: Rotating arrow badge.
 *
 * 2. "invert":
 *    - A dark #1C1C1A circle expands from icon position, turning pill dark.
 *    - Label: Flips smoothly from #1C1C1A to #FAFAF7.
 *    - Icon: Badge and arrow flip to #FAFAF7 while rotating.
 *
 * 3. "slide":
 *    - Icon-centered wave reveal expanding outward.
 *    - Icon: Arrow smoothly translates forward (+6px / +4px) and tilts.
 *
 * 4. "outline-fill":
 *    - Base: Transparent background, defined outline.
 *    - Hover: Dark #1C1C1A circle sweeps outward from icon, text and badge invert to #FAFAF7.
 *
 * 5. "elevate-shadow":
 *    - Physical lift (-translate-y-0.5) with soft ambient luxury drop shadow.
 *
 * 6. "border-glow":
 *    - Border blooms into a vibrant gold ring (#8C7B5E) with a soft ambient halo glow.
 */
export function LumivestInteractiveSecondaryButton({
  variant = "expand",
  borderStyle = "subtle",
  surface = "sand",
  href,
  isExternal,
  target,
  rel,
  ariaLabel,
  children = "Explore Courses",
  icon,
  social,
  iconAnimation,
  rotate = "45",
  showIcon = true,
  iconCircle = true,
  size = "default",
  className = "",
  labelClassName = "",
  onClick,
  type = "button",
  ...props
}: LumivestInteractiveSecondaryButtonProps) {
  const isSm = size === "sm";
  const isMd = size === "md";
  const isLightSurface = surface === "light";

  const effectiveIconAnim: LumivestIconAnimation =
    iconAnimation ?? (variant === "slide" ? "slide" : "rotate");

  const rotationClass = {
    "45": "group-hover:rotate-45",
    "90": "group-hover:rotate-90",
    "180": "group-hover:rotate-180",
    "none": "group-hover:rotate-0",
  }[rotate];

  // Border prominence ring classes
  const borderRingStyles = {
    none: "ring-0",
    subtle: isLightSurface
      ? "ring-1 ring-inset ring-[#EAE6DD] hover:ring-[#D6D0C3]"
      : "ring-1 ring-inset ring-[#EAE6DD] hover:ring-[#DDD8CD]",
    prominent:
      variant === "outline-fill" || variant === "invert"
        ? "ring-2 ring-inset ring-[#1C1C1A]/30 group-hover:ring-[#1C1C1A]"
        : variant === "gold-fill"
        ? "ring-2 ring-inset ring-[#1C1C1A]/20 group-hover:ring-[#8C7B5E]"
        : "ring-2 ring-inset ring-[#1C1C1A]/30 hover:ring-[#1C1C1A]/60",
    accent: "ring-[1.5px] ring-inset ring-[#8C7B5E]/70 hover:ring-[#8C7B5E]",
  }[borderStyle];

  // Expander circle color and activation per variant & surface
  const hasExpander =
    variant === "expand" ||
    variant === "invert" ||
    variant === "slide" ||
    variant === "outline-fill" ||
    variant === "gold-fill";

  const defaultWaveColor = isLightSurface ? "bg-[#EAE6DD]" : "bg-[#DBD7CA]";

  const expanderColorClass = {
    expand: defaultWaveColor,
    invert: "bg-[#1C1C1A]",
    slide: defaultWaveColor,
    "outline-fill": "bg-[#1C1C1A]",
    "gold-fill": "bg-[#8C7B5E]",
    "elevate-shadow": "bg-transparent",
    "border-glow": "bg-transparent",
  }[variant];

  // Base background and hover background per surface & variant
  const baseBgClass = isLightSurface ? "bg-[#FAFAF7]" : "bg-[#F2F0EA]";
  const hoverBgClass = isLightSurface ? "hover:bg-[#EAE6DD]" : "hover:bg-[#DBD7CA]";

  const variantContainerStyles = {
    expand: `${baseBgClass} text-[#1C1C1A] ${hoverBgClass}`,
    invert: `${baseBgClass} text-[#1C1C1A] hover:bg-[#1C1C1A] hover:ring-[#1C1C1A]`,
    slide: `${baseBgClass} text-[#1C1C1A] ${hoverBgClass}`,
    "outline-fill": `${
      isLightSurface ? "bg-[#FAFAF7]" : "bg-transparent"
    } text-[#1C1C1A] hover:bg-[#1C1C1A] hover:ring-[#1C1C1A]`,
    "gold-fill": `${
      isLightSurface ? "bg-[#FAFAF7]" : "bg-[#F2F0EA]"
    } text-[#1C1C1A] hover:bg-[#8C7B5E] hover:ring-[#8C7B5E]`,
    "elevate-shadow": `${baseBgClass} text-[#1C1C1A] hover:bg-[#EDEAE2] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(28,28,26,0.08)]`,
    "border-glow": `${baseBgClass} text-[#1C1C1A] hover:ring-2 hover:ring-[#8C7B5E] hover:shadow-[0_0_18px_rgba(140,123,94,0.24)]`,
  }[variant];

  // Label text color transitions
  const labelColorClass = {
    expand: "text-[#1C1C1A]",
    invert:
      "text-[#1C1C1A] group-hover:text-[#FAFAF7] transition-colors duration-400 ease-[cubic-bezier(0.5,0,0.2,1)]",
    slide: "text-[#1C1C1A]",
    "outline-fill":
      "text-[#1C1C1A] group-hover:text-[#FAFAF7] transition-colors duration-400 ease-[cubic-bezier(0.5,0,0.2,1)]",
    "gold-fill":
      "text-[#4A4A45] group-hover:text-[#FAFAF7] transition-colors duration-1000 ease-[cubic-bezier(0.5,0,0.2,1)]",
    "elevate-shadow": "text-[#1C1C1A]",
    "border-glow": "text-[#1C1C1A]",
  }[variant];

  // Icon container badge styling per variant
  const iconBadgeStyles = {
    expand: isLightSurface ? "bg-[#F2F0EA] text-[#1C1C1A]" : "bg-[#EAE6DD] text-[#1C1C1A]",
    invert:
      "bg-[#EAE6DD] text-[#1C1C1A] group-hover:bg-[#FAFAF7]/15 group-hover:text-[#FAFAF7] transition-all duration-400 ease-[cubic-bezier(0.5,0,0.2,1)]",
    slide: isLightSurface ? "bg-[#F2F0EA] text-[#1C1C1A]" : "bg-[#EAE6DD] text-[#1C1C1A]",
    "outline-fill":
      "bg-[#1C1C1A]/5 text-[#1C1C1A] group-hover:bg-[#FAFAF7]/15 group-hover:text-[#FAFAF7] transition-all duration-400 ease-[cubic-bezier(0.5,0,0.2,1)]",
    "gold-fill":
      "bg-[#8C7B5E]/10 text-[#1C1C1A] group-hover:bg-[#FAFAF7]/20 group-hover:text-[#FAFAF7] transition-all duration-400 ease-[cubic-bezier(0.5,0,0.2,1)]",
    "elevate-shadow":
      "bg-[#EAE6DD] text-[#1C1C1A] transition-transform duration-400 group-hover:scale-105",
    "border-glow":
      "bg-[#EAE6DD] text-[#1C1C1A] group-hover:bg-[#8C7B5E]/15 group-hover:text-[#8C7B5E] transition-colors duration-400",
  }[variant];

  // Slide variant translation on the icon badge
  const iconSlideClass =
    effectiveIconAnim === "slide"
      ? "transition-transform duration-400 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover:translate-x-1.5"
      : "";

  const content = (
    <>
      {/* ── Layer 1: Expander Wave Circle (Centered precisely on the icon) ── */}
      {showIcon && hasExpander && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full ${expanderColorClass} z-0 transition-transform ${
            variant === "gold-fill" ? "duration-1000" : "duration-500"
          } ease-[cubic-bezier(0.5,0,0.2,1)] group-hover:scale-[25] motion-reduce:transition-none motion-reduce:transform-none origin-center will-change-transform ${
            iconCircle ? "scale-100" : "scale-0"
          } ${
            isSm
              ? "w-5 h-5 right-4"
              : isMd
              ? "w-[22px] h-[22px] right-6"
              : "w-6 h-6 right-[34px]"
          }`}
        />
      )}

      {/* ── Layer 2: Button Label ─────────────────────────────────── */}
      <span
        className={`relative z-10 font-['General_Sans',sans-serif] font-medium leading-[24px] tracking-normal select-none transform-gpu translate-z-0 backface-hidden antialiased will-change-transform ${labelColorClass} ${
          isSm ? "text-[13px]" : isMd ? "text-[16px]" : "text-[20px]"
        } ${labelClassName}`}
      >
        {children}
      </span>

      {/* ── Layer 3: Icon Container & Animated Arrow / Glyph ─────── */}
      {showIcon && (
        <span
          aria-hidden="true"
          className={`relative z-10 flex items-center justify-center shrink-0 will-change-transform ${iconSlideClass} ${
            iconCircle
              ? `rounded-full overflow-hidden ${iconBadgeStyles} ${
                  isSm
                    ? "w-5 h-5"
                    : isMd
                    ? "w-[22px] h-[22px]"
                    : "w-6 h-6"
                }`
              : `bg-transparent ${
                  variant === "gold-fill"
                    ? "text-[#4A4A45] group-hover:text-[#FAFAF7] transition-colors duration-1000 ease-[cubic-bezier(0.5,0,0.2,1)]"
                    : variant === "invert" || variant === "outline-fill"
                    ? "text-[#1C1C1A] group-hover:text-[#FAFAF7] transition-colors duration-400 ease-[cubic-bezier(0.5,0,0.2,1)]"
                    : "text-current"
                } ${
                  isSm
                    ? "w-4 h-4"
                    : isMd
                    ? "w-[22px] h-[22px]"
                    : "w-6 h-6"
                }`
          }`}
        >
          <span
            className={`w-full h-full flex items-center justify-center origin-center will-change-transform motion-reduce:transition-none motion-reduce:transform-none ${
              effectiveIconAnim === "pop"
                ? `transition-transform ${
                    variant === "gold-fill" ? "duration-700" : "duration-300"
                  } ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-115`
                : effectiveIconAnim === "slide"
                ? `transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] ${rotationClass}`
                : `transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] ${rotationClass}`
            }`}
          >
            {renderIcon(icon, social, isMd || isSm)}
          </span>
        </span>
      )}
    </>
  );

  const sizeClasses = isSm
    ? showIcon
      ? "gap-1.5 py-1.5 px-3.5 h-[34px]"
      : "py-1.5 px-3.5 h-[34px]"
    : isMd
      ? showIcon
        ? "gap-3 py-3 px-6"
        : "py-3 px-6"
      : showIcon
        ? "gap-4 py-4 px-[34px]"
        : "py-4 px-8";

  const baseClasses =
    `group relative inline-flex items-center justify-center rounded-[87px] overflow-hidden no-underline cursor-pointer select-none isolate transform-gpu transition-all duration-400 ease-[cubic-bezier(0.5,0,0.2,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1A] focus-visible:ring-offset-2 motion-reduce:transition-none ${borderRingStyles} ${variantContainerStyles} ${sizeClasses}`;

  const combinedClasses = `${baseClasses} ${className}`.trim();

  const effectiveTarget = target ?? (isExternal ? "_blank" : undefined);
  const effectiveRel =
    rel ??
    (effectiveTarget === "_blank" ? "noopener noreferrer" : undefined);
  const effectiveAriaLabel =
    ariaLabel ?? (props["aria-label"] as string | undefined);

  if (href) {
    const isOutbound =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isOutbound) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={effectiveTarget ?? (href.startsWith("http") ? "_blank" : undefined)}
          rel={effectiveRel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
          aria-label={effectiveAriaLabel}
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
        target={effectiveTarget}
        rel={effectiveRel}
        aria-label={effectiveAriaLabel}
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
      aria-label={effectiveAriaLabel}
      {...props}
    >
      {content}
    </button>
  );
}
