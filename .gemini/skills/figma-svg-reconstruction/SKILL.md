---
name: figma-svg-reconstruction
description: Reconstructs Figma-exported SVG screens into extremely high-fidelity semantic Next.js web UI. Use whenever implementing, reviewing, fixing, comparing, or translating a Figma SVG, Figma-exported screen, SVG mockup, design-to-code, screen reconstruction, pixel-perfect UI, design implementation, UI replication, frontend visual matching, design reference, or pixel-accurate frontend screen.
---

# Figma SVG Reconstruction

The provided Figma-exported SVG is the absolute visual source of truth. The goal is controlled, measurable visual reconstruction of the design, not an approximation.

## 1. Do Not Render the Screen as an Image
- **DO NOT** embed the full Figma screen as `<img src="design.svg" />` or a massive `<svg>` block.
- Reconstruct the page using real web semantics: HTML text, `<button>`, `<a>`, `<input>`, layout CSS (Tailwind), and existing functional components.

## 2. Inspect SVG and Establish Canvas
Before coding:
1. Extract `width`, `height`, `viewBox` to establish the REFERENCE CANVAS (e.g., 1440x1024).
2. Create an inventory of all UI elements (Header, inputs, buttons, cards).
3. The element count must match precisely. Do not invent missing UI or remove supplied UI.
4. Use SVG geometry (x/y, widths) to deduce flexbox/grid layouts. Do not blindly map absolute coordinates into `position: absolute`.

## 3. Strict Typography and Color
- **Text must match exactly**: wording, capitalization, line breaks.
- If text is outlined as `<path>`, rely on other design sources or report ambiguity.
- **Typography**: Match font family, weight, size, line-height, and letter-spacing exactly. Do not round font sizes or compensate for a missing font with random margin/padding changes.
- **Color**: Extract exact hex/rgba. Use the project's design tokens if they map exactly; otherwise, use the exact values.
- Verify font availability first. Report if the exact font is missing.

## 4. Reconstruct Relationships
- Group elements using semantic HTML (`<nav>`, `<section>`, `<article>`).
- Translate repetitive structures into `display: grid` or `display: flex` rather than hardcoding positions.
- Follow the project's hook-first and CSS-reuse architecture. Do not create React components solely to reuse styles; use CSS/Tailwind utilities.

## 5. Viewports and Responsive Design
- The original SVG establishes the exact baseline.
- For other viewports, infer behavior (wrapping, stacking, grid changes) using standard breakpoints.
- Do not distort the desktop reference just to make responsiveness easier to code.

## 6. Reconstruction Workflow
RECEIVE SVG → PRESERVE ORIGINAL REFERENCE → INSPECT SVG STRUCTURE → DETERMINE REFERENCE FRAME → INVENTORY UI ELEMENTS → EXTRACT TYPOGRAPHY/COLOR/GEOMETRY → CLASSIFY ELEMENTS (HTML vs Asset) → AUDIT PROJECT UI → REUSE STYLES/COMPONENTS → IMPLEMENT HTML/CSS → ADD HOOKS → RENDER AT EXACT VIEWPORT → COMPARE → FIX CAUSES → REPORT FIDELITY.
