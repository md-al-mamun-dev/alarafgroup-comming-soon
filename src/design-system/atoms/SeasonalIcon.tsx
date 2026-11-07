import React from "react";

export interface SeasonalIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * SeasonalIcon
 *
 * Perfectly balanced dual-climate emblem for Seasonal Collections:
 * Symmetrical summer sun on the left, crystal winter snowflake on the right.
 * Engineered for Lucide 24x24 2px line grid.
 */
export function SeasonalIcon({
  className = "",
  size = 24,
  ...props
}: SeasonalIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Central dividing axis */}
      <line x1="12" y1="2" x2="12" y2="22" />
      {/* Left Summer Sun (smooth semicircle + balanced radial rays) */}
      <path d="M12 7a5 5 0 0 0 0 10" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="5.6" y1="5.6" x2="7.8" y2="7.8" />
      <line x1="5.6" y1="18.4" x2="7.8" y2="16.2" />
      {/* Right Winter Snowflake (symmetrical crystal branches) */}
      <line x1="12" y1="12" x2="21" y2="12" />
      <path d="M16 8l2-2" />
      <path d="M18 10l2 2-2 2" />
      <path d="M16 16l2 2" />
      <path d="M14 6l2-3" />
      <path d="M14 18l2 3" />
    </svg>
  );
}
