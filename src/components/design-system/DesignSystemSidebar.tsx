"use client";

import React, { useEffect, useState } from "react";

interface SidebarSection {
  id: string;
  label: string;
  subsections?: { id: string; label: string }[];
}

const sections: SidebarSection[] = [
  {
    id: "colors",
    label: "Semantic Colors",
    subsections: [
      { id: "color-primary", label: "primary" },
      { id: "color-surface", label: "surface" },
      { id: "color-surface-subtle", label: "surface-subtle" },
      { id: "color-border", label: "border" },
      { id: "color-text-primary", label: "text-primary" },
      { id: "color-text-body", label: "text-body" },
      { id: "color-text-muted", label: "text-muted" },
    ],
  },
  {
    id: "typography",
    label: "Typography Scale",
    subsections: [
      { id: "type-heading", label: "Headings Scale" },
      { id: "type-body", label: "Body & Labels" },
    ],
  },
  {
    id: "spacing",
    label: "Spacing & Geometry",
    subsections: [
      { id: "spacing-radii", label: "Border Radii" },
      { id: "spacing-layout", label: "Layout Dimensions" },
    ],
  },
  {
    id: "live-preview",
    label: "Live Components",
    subsections: [
      { id: "components-live", label: "Interactive Showcase" },
    ],
  },
];

export function DesignSystemSidebar() {
  const [activeId, setActiveId] = useState<string>("colors");

  useEffect(() => {
    const allIds = sections.flatMap((s) => [
      s.id,
      ...(s.subsections?.map((sub) => sub.id) ?? []),
    ]);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="sticky top-[93px] h-[calc(100vh-93px)] w-60 shrink-0 overflow-y-auto border-r border-corp-border bg-white py-6 px-4">
      <div className="px-2 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-corp-muted">
          Design System
        </p>
        <p className="text-xs font-bold text-corp-dark">Semantic Architecture</p>
      </div>

      <nav className="flex flex-col gap-1">
        {sections.map((section) => {
          const sectionActive =
            activeId === section.id ||
            section.subsections?.some((s) => s.id === activeId);

          return (
            <div key={section.id} className="space-y-0.5">
              {/* Section label */}
              <button
                onClick={() => scrollTo(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  sectionActive
                    ? "bg-corp-dark text-white shadow-xs"
                    : "text-corp-dark hover:bg-corp-light"
                }`}
              >
                {section.label}
              </button>

              {/* Subsection labels — visible when section is active */}
              {sectionActive && section.subsections && (
                <div className="ml-3 my-1 flex flex-col gap-0.5 border-l-2 border-corp-border pl-2.5">
                  {section.subsections.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => scrollTo(sub.id)}
                      className={`w-full text-left px-2 py-1 rounded-md text-[11px] font-mono transition-colors ${
                        activeId === sub.id
                          ? "text-corp-dark font-bold bg-corp-light"
                          : "text-corp-muted hover:text-corp-dark"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="mt-8 px-2 pt-6 border-t border-corp-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-bold text-corp-dark">Live Editable</span>
        </div>
        <p className="text-[10px] text-corp-muted leading-relaxed">
          Tweak tokens live and export production CSS.
        </p>
      </div>
    </aside>
  );
}
