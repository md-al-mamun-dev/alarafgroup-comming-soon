import React from "react";

export interface SectionContainerProps {
  id?: string;
  bgColor?: "white" | "light" | "dark";
  paddingY?: "default" | "compact" | "spacious";
  hasBorderBottom?: boolean;
  hasBorderTop?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  id,
  bgColor = "white",
  paddingY = "default",
  hasBorderBottom = true,
  hasBorderTop = false,
  children,
  className = "",
}: SectionContainerProps) {
  const bgClasses = {
    white: "bg-white text-corp-dark",
    light: "bg-corp-light text-corp-dark",
    dark: "bg-corp-dark text-white",
  }[bgColor];

  const pyClasses = {
    compact: "py-12 sm:py-16",
    default: "py-16 sm:py-24",
    spacious: "py-20 sm:py-28",
  }[paddingY];

  const borderBottomClass = hasBorderBottom ? "border-b border-corp-border" : "";
  const borderTopClass = hasBorderTop ? "border-t border-corp-border" : "";

  return (
    <section
      id={id}
      className={`w-full ${bgClasses} ${pyClasses} ${borderBottomClass} ${borderTopClass} ${className}`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        {children}
      </div>
    </section>
  );
}

