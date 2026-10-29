---
name: design-system-consistency
description: Enforces consistency with existing design tokens, themes, component libraries, typography, color palettes, and styling conventions whenever developing UI.
---

# Design System Consistency

## 1. Existing Component Library is Authoritative
Inspect and reuse the existing component library (e.g., shadcn/ui, MUI, custom). Do not create custom replacements for existing primitives without a concrete requirement.
- **shadcn/ui**: If configured, use existing semantic CSS variables. Do not run force-overwrite commands against customized UI components.

## 2. Design Tokens
Design tokens are the source of visual consistency. Use the project's token/theme system for colors, spacing, typography, radii, shadows, and breakpoints.
- **Prefer semantic tokens**: Use `background`, `primary`, `muted-foreground`, etc.
- **Avoid arbitrary values**: Do not scatter meaningless hardcoded values (e.g., `#1f2937`) when semantic tokens exist.
- **Do not invent tokens casually**: Do not invent new colors, radii, spacing units, or breakpoints without inspecting the design system first.

## 3. Tailwind Consistency
If Tailwind is used, prefer existing theme utilities and semantic tokens. Avoid excessive arbitrary values (e.g., `w-[347px]`, `text-[17px]`) unless a supplied design genuinely requires a precise value that cannot become a reusable token.

## 4. Visual Consistency
The same semantic element must look the same throughout the application. Preserve consistency for buttons, inputs, labels, cards, headers, empty states, and pagination. Do not create a different visual language for each page.

## 5. Spacing and Typography
- **Spacing System**: Follow the established spacing scale. Standardize repeated spatial relationships (page padding, card padding, form gaps).
- **Typography System**: Maintain consistent roles (page title, section title, body, small, helper text). Do not independently choose font size, weight, and line height for every component.

## 6. Color Consistency
Colors must be semantic. Establish and reuse semantic roles (`success`, `warning`, `destructive`, `muted`, `primary`). The meaning should stay consistent across screens.

## 7. Form and State Consistency
- **Forms**: Reuse a consistent system for labels, descriptions, validation, error messages, and loading states.
- **UI States**: A component is not complete without its states (hover, focus, disabled, loading, empty, selected).
- **Loading/Empty/Error Patterns**: Reuse established patterns instead of creating unique spinners or empty states for each page.

## 8. Icons and Images
- **Icons**: Use the established icon library consistently. Do not mix Lucide, Heroicons, Font Awesome, etc., without reason.
- **Images**: Follow the installed Next.js version's recommendations. Prefer `next/image` and preserve aspect ratio, object fit, and responsive sizing.

## 9. Animation and Motion
Animation must support UX, not decorate everything automatically. Do not add arbitrary animations simply to look modern. If the design system defines motion tokens, use them, and respect reduced-motion preferences.

## 10. Avoid Inline Systems and Duplicate Strings
Do not create page-level inline design systems (`const COLORS = ...`). Abstract frequently repeated combinations of classes into a component, variant, or layout primitive when appropriate.

