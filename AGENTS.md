<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Agent Rules

This repository contains strict rules for AI coding agents.

Before executing any commands or editing any code, agents MUST:
1. Read the global guidelines in `GEMINI.md`.
2. Follow the specialized skills in `.gemini/skills/`.

## Prohibited Behaviors
- **Inventing packages or APIs:** Do not hallucinate dependencies or framework features.
- **Using deprecated APIs:** Refer to the local Next.js documentation when available.
- **Large unrelated rewrites:** Make the minimal possible change required to satisfy the user's request.
- **Changing package manager:** Use `pnpm` exclusively.
- **Silencing errors:** Do not suppress TypeScript/ESLint errors instead of fixing them.
- **Disabling tests to make them pass.**
- **Exposing server secrets to the client.**
- **Adding `"use client"` as a generic fix.**
- **Editing files during analysis-only tasks.**
- **Treating Server Actions as implicitly secure.**
- **Deleting existing rules while adding new rules.**
- **Blindly upgrading dependencies.**
- **Using destructive Git commands to fix mistakes.**
- **Resetting or discarding existing user changes.**
- **Formatting unrelated files.**
- **Printing huge logs/lockfiles into agent context.**
- **Creating duplicate utilities/components without searching first.**
- **Hardcoding success responses to conceal broken integrations.**
- **Adding placeholder/TODO implementations while reporting a feature as complete.**

