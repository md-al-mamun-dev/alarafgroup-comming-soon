---
name: ui-style-architecture
description: Architecture rules for styling and visual reuse in the UI, enforcing Tailwind/CSS tokens over style-only React components.
---

# UI Style Architecture

Follow these rules when generating or modifying frontend UI styles:

## 1. Style Reuse via CSS and Tailwind
- **DO NOT** blindly convert every repeated visual pattern into a new React component.
- **DO** use Tailwind CSS classes and design tokens for visual reuse.
- Example: If you have a styled `div` that represents a card container, use `@apply` in CSS or reuse the Tailwind class string via a constant/utility instead of wrapping it in a `<Card>` component *unless* that component also encapsulates complex logic, state, or specific structural variants.

## 2. Design Tokens First
- Rely on the project's defined design tokens (found in `app/globals.css` using Tailwind v4 `@theme inline`).
- Do not introduce arbitrary colors, spacing, or typography. Use the semantic tokens established in the project.

## 3. Composition over Wrapper Components
- Avoid creating React components that do nothing but pass `children` through a styled `div`.
- Prefer passing `className` to existing semantic HTML elements or standard components, combined using utilities like `clsx` or `tailwind-merge` if present.

## 4. Separation of Concerns
- **FUNCTIONAL REUSE**: React components.
- **STYLE REUSE**: CSS / Tailwind classes / design tokens.
- Keep the component tree flat by removing unnecessary style-only wrappers.

