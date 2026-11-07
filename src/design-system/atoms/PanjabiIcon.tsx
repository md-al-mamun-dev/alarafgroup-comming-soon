import React from "react";

export interface PanjabiIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * PanjabiIcon
 *
 * Traditional South Asian / Islamic mandarin-collar panjabi/kurta tunic
 * with long sleeves, stand collar, button placket, and side slits.
 * Engineered for Lucide 24x24 2px line grid.
 */
export function PanjabiIcon({
  className = "",
  size = 24,
  ...props
}: PanjabiIconProps) {
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
      {/* Long Panjabi/Kurta tunic silhouette with angled sleeves */}
      <path d="M7 5l-3 4 2 1.5 1.5-2.5V21a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9l1.5 2.5 2-1.5-3-4-2-2H9L7 5z" />
      {/* Traditional Mandarin stand collar */}
      <path d="M10 3a2 2 0 0 0 4 0" />
      {/* Front buttoned chest placket */}
      <line x1="12" y1="5" x2="12" y2="12" />
      {/* Visible horizontal button stitches (crisp at 20px) */}
      <line x1="11" y1="7.5" x2="13" y2="7.5" />
      <line x1="11" y1="10" x2="13" y2="10" />
    </svg>
  );
}
