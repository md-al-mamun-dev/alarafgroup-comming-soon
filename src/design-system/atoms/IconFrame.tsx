import React from "react";
import { LucideIcon } from "lucide-react";

export interface IconFrameProps {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  shape?: "circle" | "square" | "rounded";
  variant?: "light" | "white" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconFrame({
  icon: Icon,
  shape = "circle",
  variant = "light",
  size = "md",
  className = "",
}: IconFrameProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
  }[size];

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-[7px]",
    rounded: "rounded-xl",
  }[shape];

  const variantClasses = {
    light: "bg-corp-light border border-corp-border text-corp-dark",
    white: "bg-white border border-corp-border text-corp-dark shadow-xs",
    dark: "bg-corp-dark border border-corp-dark text-white",
  }[variant];

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${sizeClasses} ${shapeClasses} ${variantClasses} ${className}`}
    >
      <Icon className={`${iconSizes} stroke-[1.75]`} />
    </div>
  );
}

