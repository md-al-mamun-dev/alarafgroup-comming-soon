import React from "react";

export interface SuitTieIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * SuitTieIcon
 *
 * Tailored men's suit blazer with bespoke lapels, necktie, and pocket welt.
 * Engineered for Lucide 24x24 2px line grid.
 */
export function SuitTieIcon({
  className = "",
  size = 24,
  ...props
}: SuitTieIconProps) {
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
      {/* Tailored blazer silhouette with natural sloping shoulders */}
      <path d="M6 3h12l3 5v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8l3-5z" />
      {/* Bespoke V-Lapels */}
      <path d="M6 3l6 11 6-11" />
      {/* Necktie with knot and tapered blade */}
      <path d="M11 3.5h2l.75 4-1.75 3-1.75-3L11 3.5z" />
      {/* Front jacket center seam */}
      <line x1="12" y1="14" x2="12" y2="21" />
      {/* Tailored pocket welt */}
      <line x1="15.5" y1="11" x2="18.5" y2="11" />
    </svg>
  );
}
