---
name: ui-fidelity-verification
description: Activates during UI implementation to enforce design fidelity, accessibility, responsiveness, and rigorous verification against provided specifications.
---

# UI Fidelity and Verification

## 1. Provided Design is a Specification
Treat Figma, SVG, screenshots, and wireframes as strict specifications, not merely inspiration.
- **Never invent UI**: Do not add extra inputs, buttons, or sections because they seem useful.
- **Never omit UI**: Do not skip visible functional elements. Missing and extra UI are both defects.

## 2. UI Inventory Before Implementation
Before coding from a design:
1. Inventory all elements (sections, text, headings, inputs, buttons, spacing, states).
2. Map these to existing project components.
3. Identify any missing primitives.

## 3. Responsive Design is Required
UI implementation must work beyond desktop. 
- Test across small mobile, large mobile, tablet, and desktop according to project breakpoints.
- Determine intentional behavior: Does it wrap, stack, scroll, hide, or change alignment? 
- Avoid fixing mobile layouts by simply applying `overflow-x-auto` everywhere.

## 4. Accessibility is Part of UI Quality
Accessibility must be built-in from the start.
- **Semantic HTML**: Prefer `<button>`, `<nav>`, `<main>`, `<form>`, `<label>` over generic clickable `<div>`s.
- **Keyboard Access**: Maintain logical focus order. Ensure dialogs, menus, and popovers are keyboard-accessible. Do not remove focus outlines without a replacement.
- **Labels and Targets**: Ensure inputs have labels and icon-only buttons have accessible names. Interactive targets should generally meet WCAG 2.2 size expectations.
- **Contrast**: Respect accessible contrast requirements. Use established theme tokens whose contrast is already validated.

## 5. Visual and Design Fidelity Check
Before considering UI work complete, perform a fidelity check:
- Do all visible elements exist?
- Were unrequested elements added?
- Do field counts, button counts, and icon placements match the design?
- Are layout hierarchy and spacing relationships reasonable?
- Do typography and colors follow the design system?
If visual verification tooling (screenshots, browser view) is available, use it. Do not declare visual fidelity based solely on reading JSX.

## 6. Final Quality Gate Check
A UI task is not complete just because TypeScript compiles. Evaluate:
- **Structure**: Is the component in the correct place?
- **Reuse**: Did we duplicate a primitive or bypass the existing UI library?
- **Consistency**: Are we using existing visual tokens and spacing scales?
- **Boundaries**: Was `"use client"` added only when necessary? Is the interactive portion isolated?

## 7. Recommended Workflow
1. UNDERSTAND DESIGN
2. INVENTORY ELEMENTS & MAP TO COMPONENTS
3. IMPLEMENT REUSABLE PRIMITIVES
4. IMPLEMENT COMPOSITES
5. ASSEMBLE PAGE
6. ADD INTERACTIVITY
7. CHECK RESPONSIVENESS & ACCESSIBILITY
8. VISUAL VERIFY & REVIEW FOR DUPLICATION

