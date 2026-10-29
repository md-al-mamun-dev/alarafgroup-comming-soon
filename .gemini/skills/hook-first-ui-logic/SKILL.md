---
name: hook-first-ui-logic
description: Enforces custom hooks for UI behavior and interaction logic, prohibiting raw useEffect calls inside React component files.
---

# Hook-First UI Logic

Follow these rules for managing behavior and side effects in React components:

## 1. Behavior Belongs in Hooks
- Move interaction logic, state derivations, and event handling logic into custom hooks (`use...`).
- Components should primarily be responsible for rendering, composition, semantic markup, and event wiring.

## 2. No Raw `useEffect` in Components
- **DO NOT** put raw `useEffect` calls directly inside component files.
- If an effect is absolutely necessary, encapsulate it inside a custom hook that clearly describes its purpose (e.g., `useAutosave`, `useClickOutside`).
- This makes components easier to read, test, and refactor.

## 3. Minimize Effects
- Effects should only be used when a real side effect is necessary (e.g., synchronizing with an external system, setting up subscriptions, DOM measurements).
- **DO NOT** use `useEffect` to derive state from props or to synchronize state within the application. Calculate derived state directly during render.

## 4. Separation of Logic and Presentation
- Keep business and interaction logic out of presentation components.
- Use custom hooks to provide the state and handlers required by the presentation component.
