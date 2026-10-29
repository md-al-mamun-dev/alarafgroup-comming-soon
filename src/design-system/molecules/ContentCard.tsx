import React from "react";
import { LucideIcon } from "lucide-react";
import { IconFrame } from "../atoms/IconFrame";

export interface ContentCardItem {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  tag?: string;
  badge?: string;
}

export interface ContentCardProps {
  item: ContentCardItem;
  variant?: "white" | "light";
  align?: "left" | "center";
  className?: string;
}

export function ContentCard({
  item,
  variant = "white",
  align = "left",
  className = "",
}: ContentCardProps) {
  const bgClasses =
    variant === "white"
      ? "bg-white border-corp-border hover:border-corp-dark"
      : "bg-corp-light border-corp-border hover:border-corp-dark";

  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div
      className={`p-6 sm:p-7 rounded-xl border ${bgClasses} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col ${alignClass} ${className}`}
    >
      {item.icon && (
        <IconFrame
          icon={item.icon}
          shape="circle"
          variant="light"
          size="md"
          className="mb-5"
        />
      )}

      {item.badge && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-corp-muted bg-corp-light px-2.5 py-1 rounded-md mb-3 border border-corp-border">
          {item.badge}
        </span>
      )}

      <h3 className="font-heading text-lg sm:text-xl font-bold text-corp-dark mb-2">
        {item.title}
      </h3>

      <p className="text-xs sm:text-sm text-corp-gray leading-relaxed flex-1">
        {item.description}
      </p>
    </div>
  );
}

export interface StepCardItem {
  step: number;
  title: string;
  description: string;
}

export interface StepCardProps {
  item: StepCardItem;
  className?: string;
}

export function StepCard({ item, className = "" }: StepCardProps) {
  return (
    <div
      className={`p-6 sm:p-7 rounded-xl border border-corp-border bg-corp-light/50 flex flex-col shadow-xs ${className}`}
    >
      <div className="w-12 h-12 rounded-[7px] border-2 border-corp-dark bg-white flex items-center justify-center text-lg font-extrabold text-corp-dark mb-5 shadow-xs">
        {item.step}
      </div>
      <h3 className="font-heading text-lg font-bold text-corp-dark mb-2">
        {item.title}
      </h3>
      <p className="text-xs sm:text-sm text-corp-gray leading-relaxed flex-1">
        {item.description}
      </p>
    </div>
  );
}

