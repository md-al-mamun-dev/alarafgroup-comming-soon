"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Layers,
  ChevronDown
} from "lucide-react";
import { designTokens } from "@/src/design-system/tokens";
import { BookCallButton, LumivestSecondaryButton, LumivestCourseCard } from "@/src/design-system";

interface ColorItem {
  id: string;
  key: keyof typeof designTokens.colors;
  name: string;
  cssVar: string;
  role: string;
  usage: string;
}

const COLOR_DEFINITIONS: ColorItem[] = [
  {
    id: "color-primary",
    key: "primary",
    name: "primary",
    cssVar: "--color-primary",
    role: "Brand Primary & Dark Elements",
    usage: "Headings, primary CTA buttons, navigation highlights, active tabs, and dominant brand contrast across all pages.",
  },
  {
    id: "color-surface",
    key: "surface",
    name: "surface",
    cssVar: "--color-surface",
    role: "Base Surface / Canvas",
    usage: "The foundation background for the entire page body, modal sheets, and white card backgrounds.",
  },
  {
    id: "color-surface-subtle",
    key: "surfaceSubtle",
    name: "surface-subtle",
    cssVar: "--color-surface-subtle",
    role: "Subtle Surface / Alternate Sections",
    usage: "Background for alternating sections (e.g. Who We Are, Value Pillars), breadcrumb tracks, and secondary badge fills.",
  },
  {
    id: "color-border",
    key: "border",
    name: "border",
    cssVar: "--color-border",
    role: "Border & Dividers",
    usage: "Card outlines, section separators, horizontal dividers, input borders, and table line strokes.",
  },
  {
    id: "color-text-primary",
    key: "textPrimary",
    name: "text-primary",
    cssVar: "--color-text-primary",
    role: "Text Primary",
    usage: "Main page titles (H1, H2, H3), bold lead sentences, and primary high-contrast typography.",
  },
  {
    id: "color-text-body",
    key: "textBody",
    name: "text-body",
    cssVar: "--color-text-body",
    role: "Text Body",
    usage: "Body paragraphs, long descriptive copy, article prose, and form help text.",
  },
  {
    id: "color-text-muted",
    key: "textMuted",
    name: "text-muted",
    cssVar: "--color-text-muted",
    role: "Text Muted / Captions",
    usage: "Eyebrow overlines, captions, timestamps, placeholder text, and subtle metadata.",
  },
  {
    id: "color-accent",
    key: "accent",
    name: "accent",
    cssVar: "--color-accent",
    role: "Interactive Accent",
    usage: "Hover states, active focus outlines, and emphasized button states.",
  },
];

const LOCAL_STORAGE_KEY = "alaraf_design_tokens_v3";

export function DesignSystemPlayground() {
  const defaultColors = useMemo(() => ({ ...designTokens.colors }), []);
  const defaultRadii = useMemo(() => ({
    button: 7,
    card: 12,
    slot: 16,
  }), []);
  const defaultTypography = useMemo(() => ({
    h1: 44,
    h2: 28,
    h3: 20,
    body: 14,
    caption: 11,
  }), []);

  const [colors, setColors] = useState(defaultColors);
  const [radii, setRadii] = useState(defaultRadii);
  const [typography, setTypography] = useState(defaultTypography);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.colors) setColors(parsed.colors);
        if (parsed.radii) setRadii(parsed.radii);
        if (parsed.typography) setTypography(parsed.typography);
      }
    } catch {
      // Ignore parsing errors
    }
  }, []);

  // Persist changes
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ colors, radii, typography })
      );
    } catch {
      // Ignore storage errors
    }
  }, [colors, radii, typography, mounted]);

  const handleColorChange = (key: keyof typeof designTokens.colors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setColors(defaultColors);
    setRadii(defaultRadii);
    setTypography(defaultTypography);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const isCustomized = useMemo(() => {
    const colorChanged = Object.keys(defaultColors).some(
      (k) => colors[k as keyof typeof defaultColors] !== defaultColors[k as keyof typeof defaultColors]
    );
    const radiusChanged = radii.button !== defaultRadii.button || radii.card !== defaultRadii.card || radii.slot !== defaultRadii.slot;
    const typeChanged = typography.h1 !== defaultTypography.h1 || typography.h2 !== defaultTypography.h2 || typography.h3 !== defaultTypography.h3;
    return colorChanged || radiusChanged || typeChanged;
  }, [colors, radii, typography, defaultColors, defaultRadii, defaultTypography]);

  const copyCssVariables = () => {
    const css = `:root {
  /* Semantic Design Tokens */
  --color-primary: ${colors.primary};
  --color-surface: ${colors.surface};
  --color-surface-subtle: ${colors.surfaceSubtle};
  --color-border: ${colors.border};
  --color-text-primary: ${colors.textPrimary};
  --color-text-body: ${colors.textBody};
  --color-text-muted: ${colors.textMuted};
  --color-accent: ${colors.accent};

  /* Radii */
  --radius-button: ${radii.button}px;
  --radius-card: ${radii.card}px;
  --radius-slot: ${radii.slot}px;

  /* Typography Scales */
  --font-size-h1: ${typography.h1}px;
  --font-size-h2: ${typography.h2}px;
  --font-size-h3: ${typography.h3}px;
  --font-size-body: ${typography.body}px;
  --font-size-caption: ${typography.caption}px;
}`;

    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Inline CSS variables injected dynamically into preview container
  const containerStyle = {
    "--color-primary": colors.primary,
    "--color-surface": colors.surface,
    "--color-surface-subtle": colors.surfaceSubtle,
    "--color-border": colors.border,
    "--color-text-primary": colors.textPrimary,
    "--color-text-body": colors.textBody,
    "--color-text-muted": colors.textMuted,
    "--color-accent": colors.accent,
    "--color-corp-dark": colors.primary,
    "--color-corp-light": colors.surfaceSubtle,
    "--color-corp-border": colors.border,
    "--color-corp-gray": colors.textBody,
    "--color-corp-muted": colors.textMuted,
  } as React.CSSProperties;

  return (
    <div style={containerStyle} className="w-full flex flex-col font-sans">
      {/* ── Sticky Top Action Bar ──────────────────────────────── */}
      <div className="sticky top-[93px] z-30 bg-white/95 backdrop-blur-md border-b border-corp-border px-6 sm:px-12 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-corp-dark">
            {isCustomized ? "Custom Theme Active" : "Default Theme Active"}
          </span>
          {isCustomized && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
              Edited in Browser
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isCustomized && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-corp-border text-xs font-semibold text-corp-gray hover:bg-corp-light hover:text-corp-dark transition-all"
              title="Reset all tokens back to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          )}

          <button
            onClick={copyCssVariables}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-corp-dark text-white text-xs font-semibold hover:bg-gray-800 transition-all shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">CSS Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy CSS</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="px-6 sm:px-12 py-10 space-y-20 max-w-5xl">
        {/* ─────────────────────────── SECTION 1: COLORS ─────────── */}
        <section id="colors" className="scroll-mt-36">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-corp-muted block mb-1">
              Foundation Tokens
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight">
              Semantic Color Roles
            </h2>
            <p className="text-sm text-corp-gray mt-2 max-w-3xl leading-relaxed">
              Every color in our system represents a clear functional purpose (primary, surface, border, text).
              Pick a new shade below or type a hex code to live-preview the changes instantly across the entire interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLOR_DEFINITIONS.map((token) => {
              const currentColor = colors[token.key];

              return (
                <div
                  key={token.id}
                  id={token.id}
                  className="p-4 rounded-xl border border-corp-border bg-white shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between gap-3 scroll-mt-36"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Interactive Color Picker Swatch */}
                      <div className="relative group shrink-0">
                        <input
                          type="color"
                          value={currentColor}
                          onChange={(e) => handleColorChange(token.key, e.target.value)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                          title="Click to pick a color"
                        />
                        <div
                          className="w-12 h-12 rounded-xl border border-corp-border shadow-xs flex items-center justify-center transition-transform group-hover:scale-105"
                          style={{ backgroundColor: currentColor }}
                        >
                          <span
                            className="text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                              color: token.key === "surface" || token.key === "surfaceSubtle" || token.key === "border" ? "#000" : "#fff",
                            }}
                          >
                            Edit
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-heading font-bold text-sm text-corp-dark">
                            {token.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md bg-corp-light border border-corp-border text-[11px] font-mono text-corp-dark">
                            {token.cssVar}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-corp-muted mt-0.5">
                          {token.role}
                        </p>
                      </div>
                    </div>

                    {/* Hex Text Input */}
                    <div className="shrink-0 flex items-center gap-1">
                      <span className="text-xs text-corp-muted font-mono">#</span>
                      <input
                        type="text"
                        maxLength={7}
                        value={currentColor.replace("#", "")}
                        onChange={(e) => {
                          const val = `#${e.target.value.replace(/[^0-9A-Fa-f]/g, "")}`;
                          handleColorChange(token.key, val);
                        }}
                        className="w-20 px-2 py-1 rounded-md border border-corp-border text-xs font-mono font-medium text-corp-dark uppercase focus:outline-none focus:ring-1 focus:ring-corp-dark"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-corp-gray leading-relaxed pt-2 border-t border-corp-border/60">
                    {token.usage}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────── SECTION 2: TYPOGRAPHY ──────── */}
        <section id="typography" className="scroll-mt-36">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-corp-muted block mb-1">
              Typography Scale
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight">
              Type Scale & Hierarchy
            </h2>
            <p className="text-sm text-corp-gray mt-2 max-w-3xl leading-relaxed">
              Standardized font sizes calibrated for high legibility. Drag the sliders to tweak the hierarchy in real time.
            </p>
          </div>

          <div className="space-y-6">
            {/* Display H1 */}
            <div id="type-heading" className="p-5 rounded-xl border border-corp-border bg-white shadow-xs scroll-mt-36">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-corp-dark">Display H1 (Page Title)</span>
                  <span className="text-xs text-corp-muted ml-2 font-mono">font-heading font-extrabold</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="32"
                    max="64"
                    value={typography.h1}
                    onChange={(e) => setTypography({ ...typography, h1: Number(e.target.value) })}
                    className="w-32 accent-corp-dark cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-corp-dark w-12 text-right">
                    {typography.h1}px
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-corp-light border border-corp-border">
                <h1
                  className="font-heading font-extrabold text-corp-dark tracking-tight"
                  style={{ fontSize: `${typography.h1}px`, lineHeight: 1.15 }}
                >
                  Three Brands. One Promise of Trust.
                </h1>
              </div>
            </div>

            {/* Section H2 */}
            <div className="p-5 rounded-xl border border-corp-border bg-white shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-corp-dark">Section Title H2</span>
                  <span className="text-xs text-corp-muted ml-2 font-mono">font-heading font-bold</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="22"
                    max="40"
                    value={typography.h2}
                    onChange={(e) => setTypography({ ...typography, h2: Number(e.target.value) })}
                    className="w-32 accent-corp-dark cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-corp-dark w-12 text-right">
                    {typography.h2}px
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-corp-light border border-corp-border">
                <h2
                  className="font-heading font-bold text-corp-dark tracking-tight"
                  style={{ fontSize: `${typography.h2}px`, lineHeight: 1.25 }}
                >
                  Corporate Excellence & Governance
                </h2>
              </div>
            </div>

            {/* Card Title H3 */}
            <div className="p-5 rounded-xl border border-corp-border bg-white shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-corp-dark">Card Title H3</span>
                  <span className="text-xs text-corp-muted ml-2 font-mono">font-heading font-bold</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="16"
                    max="28"
                    value={typography.h3}
                    onChange={(e) => setTypography({ ...typography, h3: Number(e.target.value) })}
                    className="w-32 accent-corp-dark cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-corp-dark w-12 text-right">
                    {typography.h3}px
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-corp-light border border-corp-border">
                <h3
                  className="font-heading font-bold text-corp-dark"
                  style={{ fontSize: `${typography.h3}px`, lineHeight: 1.3 }}
                >
                  Al-Araf Fashion Sourcing & Export
                </h3>
              </div>
            </div>

            {/* Body Copy */}
            <div id="type-body" className="p-5 rounded-xl border border-corp-border bg-white shadow-xs scroll-mt-36">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-corp-dark">Body Paragraph Text</span>
                  <span className="text-xs text-corp-muted ml-2 font-mono">font-sans text-corp-gray</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="12"
                    max="18"
                    value={typography.body}
                    onChange={(e) => setTypography({ ...typography, body: Number(e.target.value) })}
                    className="w-32 accent-corp-dark cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-corp-dark w-12 text-right">
                    {typography.body}px
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-corp-light border border-corp-border">
                <p
                  className="text-corp-gray leading-relaxed"
                  style={{ fontSize: `${typography.body}px` }}
                >
                  AL Araf Group is a progressive Bangladeshi conglomerate built on foundational values of integrity,
                  quality, and mutual partnership. Through our dedicated operating divisions, we connect local excellence with international markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────── SECTION 3: SPACING & RADII ── */}
        <section id="spacing" className="scroll-mt-36">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-corp-muted block mb-1">
              Geometry & Shape
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight">
              Border Radii & Dimensions
            </h2>
            <p className="text-sm text-corp-gray mt-2 max-w-3xl leading-relaxed">
              Crisp, subtle rounding gives the brand its tailored corporate identity. Adjust the sliders below to see how shapes respond.
            </p>
          </div>

          <div id="spacing-radii" className="grid grid-cols-1 sm:grid-cols-3 gap-6 scroll-mt-36">
            {/* Button Radius */}
            <div className="p-5 rounded-xl border border-corp-border bg-white shadow-xs flex flex-col items-center text-center">
              <div
                className="w-20 h-12 bg-corp-dark text-white text-xs font-bold flex items-center justify-center transition-all mb-4 shadow-xs"
                style={{ borderRadius: `${radii.button}px` }}
              >
                Button
              </div>
              <h4 className="font-bold text-sm text-corp-dark mb-1">Button Radius</h4>
              <p className="text-xs text-corp-gray mb-3">Applied to all buttons and pill badges</p>
              <div className="flex items-center gap-2 w-full max-w-[160px]">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={radii.button}
                  onChange={(e) => setRadii({ ...radii, button: Number(e.target.value) })}
                  className="w-full accent-corp-dark cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-corp-dark w-10 text-right">
                  {radii.button}px
                </span>
              </div>
            </div>

            {/* Card Radius */}
            <div className="p-5 rounded-xl border border-corp-border bg-white shadow-xs flex flex-col items-center text-center">
              <div
                className="w-24 h-16 border-2 border-corp-dark bg-corp-light text-corp-dark text-xs font-bold flex items-center justify-center transition-all mb-4"
                style={{ borderRadius: `${radii.card}px` }}
              >
                Card Box
              </div>
              <h4 className="font-bold text-sm text-corp-dark mb-1">Card Radius</h4>
              <p className="text-xs text-corp-gray mb-3">Applied to feature cards & form containers</p>
              <div className="flex items-center gap-2 w-full max-w-[160px]">
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={radii.card}
                  onChange={(e) => setRadii({ ...radii, card: Number(e.target.value) })}
                  className="w-full accent-corp-dark cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-corp-dark w-10 text-right">
                  {radii.card}px
                </span>
              </div>
            </div>

            {/* Media Slot Radius */}
            <div className="p-5 rounded-xl border border-corp-border bg-white shadow-xs flex flex-col items-center text-center">
              <div
                className="w-24 h-16 border border-corp-border bg-corp-dark text-white text-xs font-bold flex items-center justify-center transition-all mb-4"
                style={{ borderRadius: `${radii.slot}px` }}
              >
                Media Frame
              </div>
              <h4 className="font-bold text-sm text-corp-dark mb-1">Media Slot Radius</h4>
              <p className="text-xs text-corp-gray mb-3">Applied to photo wireframes & maps</p>
              <div className="flex items-center gap-2 w-full max-w-[160px]">
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={radii.slot}
                  onChange={(e) => setRadii({ ...radii, slot: Number(e.target.value) })}
                  className="w-full accent-corp-dark cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-corp-dark w-10 text-right">
                  {radii.slot}px
                </span>
              </div>
            </div>
          </div>

          {/* Dimensions Table */}
          <div id="spacing-layout" className="mt-8 rounded-xl border border-corp-border overflow-hidden bg-white scroll-mt-36">
            <div className="px-5 py-3 bg-corp-light border-b border-corp-border">
              <h3 className="font-bold text-xs uppercase tracking-wider text-corp-dark">
                Fixed Structural Layout Dimensions
              </h3>
            </div>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-corp-border">
                <tr className="hover:bg-corp-light/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-corp-dark">Header Height</td>
                  <td className="px-5 py-3 font-mono font-bold text-corp-dark">93px</td>
                  <td className="px-5 py-3 text-corp-gray">Reference geometry across 01_header.svg and all landing pages.</td>
                </tr>
                <tr className="hover:bg-corp-light/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-corp-dark">Max Canvas Width</td>
                  <td className="px-5 py-3 font-mono font-bold text-corp-dark">1440px</td>
                  <td className="px-5 py-3 text-corp-gray">Standard corporate desktop container bound.</td>
                </tr>
                <tr className="hover:bg-corp-light/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-corp-dark">CTA Button Size</td>
                  <td className="px-5 py-3 font-mono font-bold text-corp-dark">145 × 50px</td>
                  <td className="px-5 py-3 text-corp-gray">Touch target spec for header and hero primary actions.</td>
                </tr>
                <tr className="hover:bg-corp-light/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-corp-dark">Logo Box Size</td>
                  <td className="px-5 py-3 font-mono font-bold text-corp-dark">43 × 43px</td>
                  <td className="px-5 py-3 text-corp-gray">Exact lockup size with 7.5px radius rounding.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─────────────────────────── SECTION 4: LIVE COMPONENTS ── */}
        <section id="live-preview" className="scroll-mt-36">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-corp-muted block mb-1">
              Interactive Preview
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-corp-dark tracking-tight">
              Live Component Showcase
            </h2>
            <p className="text-sm text-corp-gray mt-2 max-w-3xl leading-relaxed">
              These live components dynamically inherit your custom color tokens and border radii above.
            </p>
          </div>

          <div id="components-live" className="space-y-8 scroll-mt-36">
            {/* Buttons & Badges */}
            <div className="p-6 rounded-xl border border-corp-border bg-white shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-corp-muted mb-4">
                Interactive Buttons & Badges
              </h3>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.surface,
                    borderRadius: `${radii.button}px`,
                  }}
                  className="px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-xs"
                >
                  <span>Primary Button</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.primary,
                    borderColor: colors.primary,
                    borderRadius: `${radii.button}px`,
                  }}
                  className="px-6 py-3 text-sm font-semibold border inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <span>Secondary Button</span>
                </button>

                <button
                  style={{
                    borderColor: colors.border,
                    color: colors.textBody,
                    borderRadius: `${radii.button}px`,
                  }}
                  className="px-5 py-2.5 text-xs font-semibold border hover:bg-gray-50 transition-colors"
                >
                  Outline Button
                </button>
              </div>

              {/* Lumivest Hero Button Pair Showcase */}
              <div className="pt-4 border-t border-corp-border/60 mb-6 flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-corp-muted">
                  Lumivest Hero Pill Buttons (Primary & Secondary Pair)
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <BookCallButton href="#book-call">Book Call</BookCallButton>
                  <LumivestSecondaryButton href="#courses">Explore Courses</LumivestSecondaryButton>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <BookCallButton href="#custom-rotate" icon={ArrowRight} rotate="90">
                    Rotate 90°
                  </BookCallButton>
                  <BookCallButton href="#static-icon" icon={Sparkles} rotate="none">
                    No Rotate
                  </BookCallButton>
                  <BookCallButton href="#no-icon" showIcon={false}>
                    Icon-less
                  </BookCallButton>
                </div>
              </div>

              {/* Lumivest Course Card Showcase */}
              <div className="pt-4 border-t border-corp-border/60 mb-6 flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-corp-muted">
                  Lumivest Course Card ("Master skills that shape your future")
                </span>
                <div className="max-w-[480px]">
                  <LumivestCourseCard
                    category="Foundation"
                    title="Real Estate Fundamentals"
                    imageUrl="/images/landing/lumivest-course.jpg"
                    imageAlt="Real Estate Fundamentals"
                    details={["Beginner", "6 Weeks", "24 Lessons"]}
                    buttonText="View Details"
                    href="#details"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <span
                  style={{
                    backgroundColor: colors.surfaceSubtle,
                    color: colors.textPrimary,
                    borderColor: colors.border,
                    borderRadius: `${radii.button}px`,
                  }}
                  className="px-3 py-1 text-xs font-semibold border"
                >
                  Neutral Badge
                </span>
                <span
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.surface,
                    borderRadius: `${radii.button}px`,
                  }}
                  className="px-3 py-1 text-xs font-semibold"
                >
                  Primary Dark Badge
                </span>
                <span
                  style={{
                    backgroundColor: colors.surface,
                    color: colors.textBody,
                    borderColor: colors.border,
                    borderRadius: `${radii.button}px`,
                  }}
                  className="px-3 py-1 text-xs font-semibold border shadow-xs"
                >
                  White Surface Badge
                </span>
              </div>
            </div>

            {/* Feature Card Preview */}
            <div className="p-6 rounded-xl border border-corp-border bg-white shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-corp-muted mb-4">
                Feature Card Composite Preview
              </h3>

              <div className="max-w-md">
                <div
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderRadius: `${radii.card}px`,
                  }}
                  className="border overflow-hidden shadow-xs p-6 flex flex-col space-y-4"
                >
                  {/* Media Frame Slot */}
                  <div
                    style={{
                      backgroundColor: colors.surfaceSubtle,
                      borderColor: colors.border,
                      borderRadius: `${radii.slot}px`,
                    }}
                    className="w-full h-44 border flex flex-col items-center justify-center p-4 text-center relative overflow-hidden"
                  >
                    <div
                      style={{
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      }}
                      className="w-10 h-10 rounded-full border flex items-center justify-center mb-2 shadow-xs"
                    >
                      <Shield className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: colors.textPrimary }}>
                      Al-Araf Fashion Division
                    </span>
                    <span className="text-[11px]" style={{ color: colors.textMuted }}>
                      Verified Manufacturing Ecosystem
                    </span>
                  </div>

                  {/* Body Content */}
                  <div>
                    <span
                      style={{
                        backgroundColor: colors.surfaceSubtle,
                        color: colors.textPrimary,
                        borderRadius: `${radii.button}px`,
                      }}
                      className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2"
                    >
                      Division 01
                    </span>
                    <h4
                      className="font-heading font-bold"
                      style={{
                        fontSize: `${typography.h3}px`,
                        color: colors.textPrimary,
                      }}
                    >
                      Apparel & RMG Sourcing
                    </h4>
                    <p
                      className="mt-1 leading-relaxed"
                      style={{
                        fontSize: `${typography.body}px`,
                        color: colors.textBody,
                      }}
                    >
                      End-to-end supply chain execution, in-line compliance inspections, and global export coordination.
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 pt-2 border-t" style={{ borderColor: colors.border }}>
                    {["OEKO-TEX and SEDEX certified", "In-line needle detection"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs" style={{ color: colors.textBody }}>
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: colors.primary }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Action */}
                  <button
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.surface,
                      borderRadius: `${radii.button}px`,
                    }}
                    className="w-full py-2.5 text-xs font-bold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-xs"
                  >
                    <span>View Brand Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Form Input Preview */}
            <div className="p-6 rounded-xl border border-corp-border bg-white shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-corp-muted mb-4">
                Form Controls & Interactive Fields
              </h3>

              <div className="max-w-md space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: colors.textPrimary }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Md. Al-Araf"
                    style={{
                      borderColor: colors.border,
                      color: colors.textPrimary,
                      borderRadius: `${radii.button}px`,
                    }}
                    className="w-full px-3.5 py-2.5 text-xs border focus:outline-none focus:ring-2"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: colors.textPrimary }}>
                    Interested Service
                  </label>
                  <div className="relative">
                    <select
                      defaultValue="fashion"
                      style={{
                        borderColor: colors.border,
                        color: colors.textPrimary,
                        borderRadius: `${radii.button}px`,
                      }}
                      className="w-full px-3.5 py-2.5 text-xs border bg-white appearance-none pr-8 cursor-pointer"
                    >
                      <option value="fashion">Al-Araf Fashion (Apparel Sourcing)</option>
                      <option value="travel">Artful Travel International</option>
                      <option value="agro">Al-Araf Agro</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: colors.textMuted }} />
                  </div>
                </div>

                <button
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.surface,
                    borderRadius: `${radii.button}px`,
                  }}
                  className="px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-xs"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom breathing room */}
        <div className="h-16" />
      </div>
    </div>
  );
}

