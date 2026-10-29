---
name: nextjs-ui-architecture
description: Enforces structured, reusable, component-driven Next.js UI architecture whenever creating or modifying pages, components, layouts, forms, dashboards, navigation, cards, tables, dialogs, or other application UI.
---

# Next.js UI Architecture

## 1. UI Directory Structure
Future UI development should conceptually follow this established layout:
- `components/ui/`: Reusable low-level UI primitives (e.g., buttons, inputs, dialogs).
- `components/layout/`: Reusable structural layout components (e.g., headers, containers, sidebars).
- `components/shared/`: Application-wide reusable composites (e.g., search fields, empty states).
- `features/<feature>/components/`: Components specific to a single business feature.
- `app/`: Next.js pages, layouts, and route-specific components (`app/<route>/_components/`).

## 2. Component Hierarchy
UI should be composed following this hierarchy:
`Design Tokens` → `UI Primitives` → `Reusable Shared Components` → `Feature Components` → `Page Sections` → `Pages`

Pages should compose existing components; they should NOT repeatedly recreate primitive controls. Avoid enormous `page.tsx` files filled with markup and logic; split them based on clear responsibilities.

## 3. Server Components First
Keep components as Server Components unless client-side behavior is needed. Do NOT automatically add `"use client"` to every generated UI component.
Use Client Components only for:
- State, event handlers, effects, browser APIs, interactive client libraries.
Keep client boundaries narrow.

## 4. Component Reuse is Mandatory
Before creating ANY new UI component, ask internally:
- Does this component or a similar one already exist?
- Can an existing component accept another variant?
- Can existing primitives be composed?
- Is this component feature-specific, or should it go in `shared/`?
Do not create duplicates simply to save time.

## 5. Primitives vs. Premature Abstraction
- **Primitives**: Before creating a primitive, search `components/ui/`. DO NOT create `PrimaryButton.tsx` or `BigButton.tsx` when a reusable `<Button>` with variants solves the requirement.
- **Premature Abstraction**: Do not turn every `div` into its own component. Create reusable components only when there is repeated structure, meaningful UI responsibility, multiple states, or clear reuse.

## 6. Layout Components
Do not repeatedly hand-code `max-width`, horizontal padding, and page spacing on every route. Reuse established layout primitives in `components/layout/`.

## 7. Component Variants
Visual variations of the same semantic component should be represented as variants (`<Button variant="outline" />`). Do not copy an entire component just because one color or radius changed. Reuse the project's existing variant system.

## 8. State Ownership
Keep state at the lowest appropriate common owner. Do not introduce global state for simple local interactions. Do not use effects for values that can be derived directly during render.

## 9. File Placement Decision
Classify before creating a file:
- Primitive: `components/ui/`
- Application-wide composition: `components/shared/`
- Structural layout: `components/layout/`
- Feature-specific: `features/<feature>/components/`
- Route-specific (if project conventions support it): `app/<route>/_components/`

