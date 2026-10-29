---
name: context-state-architecture
description: Architecture rules for managing shared client state using the Context API and reducers.
---

# Context State Architecture

Follow these rules when managing state across the component tree:

## 1. Shared Client State
- Use the **React Context API** for cross-tree shared client state.
- **DO NOT** introduce global state management libraries (like Redux, Zustand, Jotai) unless explicitly instructed or if the state requirements grow significantly beyond what Context can efficiently handle.

## 2. Complex Shared Client State
- When shared client state becomes complex (e.g., deeply nested state, multiple related sub-values, complex state transitions), combine Context with `useReducer`.
- This keeps state transition logic centralized and predictable.

## 3. Scoped Providers
- Keep Context Providers scoped to the part of the tree that actually needs the state.
- **DO NOT** wrap the entire application in a Context Provider unless the state is genuinely global (e.g., authentication state, global theme).
- This prevents unnecessary re-renders and keeps the application modular.

## 4. Avoid Context for Everything
- **DO NOT** use Context for every piece of state.
- If state is only needed by a single component or its immediate children, use local state (`useState` or `useReducer` within a custom hook) and pass it down via props.
