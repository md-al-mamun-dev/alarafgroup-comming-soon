import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-corp-muted ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-corp-dark transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-corp-dark font-bold">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

