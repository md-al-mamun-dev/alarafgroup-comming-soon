import React from "react";

export interface KaabaIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * KaabaIcon
 *
 * Front-elevation 2D line icon of the Holy Kaaba in Makkah,
 * crafted to perfectly match Lucide-react 24x24 line grid with 2px stroke.
 */
export function KaabaIcon({
  className = "",
  size = 24,
  ...props
}: KaabaIconProps) {
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
      {/* Outer Kaaba cube outline */}
      <rect x="4" y="4" width="16" height="17" rx="1" />
      {/* Upper Kiswah band (Hizam) */}
      <line x1="4" y1="9" x2="20" y2="9" />
      {/* Door of Kaaba (Bab al-Kaaba) */}
      <path d="M12 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
      {/* Base marble foundation line (Shadharwan) */}
      <line x1="2" y1="21" x2="22" y2="21" />
    </svg>
  );
}
