import React from "react";

export interface DressIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * DressIcon
 *
 * Flowing haute-couture A-line dress with scoop neckline, natural waist, and flared hem.
 * Continuous single-contour silhouette engineered for Lucide 24x24 2px line grid.
 */
export function DressIcon({
  className = "",
  size = 24,
  ...props
}: DressIconProps) {
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
      {/* Scoop neckline */}
      <path d="M8 3c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5" />
      {/* Unified dress contour from shoulder straps through waist to flared hem */}
      <path d="M8 3v5c0 1.5.8 2.5 1.5 3L5 21h14l-4.5-10c.7-.5 1.5-1.5 1.5-3V3" />
      {/* Waist accent sash */}
      <line x1="9.5" y1="11" x2="14.5" y2="11" />
    </svg>
  );
}
