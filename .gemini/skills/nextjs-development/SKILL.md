---
name: nextjs-development
description: Activate whenever implementing or modifying Next.js or React application behavior.
---

# Next.js Development Skill

## Version-Aware Development
Read the relevant installed Next.js documentation before relying on framework behavior.
Do not assume current online examples match the project's installed version (`16.3.8`).
Do not perform framework upgrades as part of unrelated work.
The installed documentation (`node_modules/next/dist/docs/`) is the authoritative source.

## Server Components First
Server Components are the default.
Do NOT automatically add `"use client"`.
Only create/use a Client Component where client capabilities are actually needed, such as:
- state
- event handlers
- effects
- browser APIs
- other genuinely client-only behavior
Keep client boundaries as narrow as practical.
Do not turn an entire page/layout into a Client Component merely because one small interactive element needs client state.
Extract the interactive section when appropriate.

## Server/Client Boundary
Never import server-only modules into Client Components.
Keep these on the server unless explicitly designed otherwise:
- secrets
- private environment variables
- DB clients
- filesystem access
- privileged SDKs
- server-only service credentials
- internal administrative logic
Use `server-only` or equivalent protections where the project convention requires it.
Only expose environment variables intentionally designed for browser usage.
Never rename a secret to `NEXT_PUBLIC_*` merely to make it accessible.

## Data Fetching
Prefer data fetching in Server Components when that matches the architecture.
Do not add unnecessary internal HTTP hops from one server-side Next.js component to its own Route Handler when the underlying server service/data layer can be called directly and safely.
Prevent accidental sequential waterfalls when independent work can run in parallel.
Use Suspense/loading boundaries intentionally.
Do not add `useEffect` merely to perform data fetching that belongs on the server.

## Caching
Never assume Next.js caching semantics from old knowledge.
Inspect the installed version documentation.
Make caching behavior explicit when important.
Do not add caching to:
- personalized data
- authorization-dependent data
- rapidly changing data
unless the semantics are deliberately designed.
When using cache tags/revalidation, use APIs compatible with the installed Next.js version.
Do not mix legacy and modern caching patterns without verifying them.

## Routing
Respect the router already used by the application (`app/` App Router).
Do not convert Pages Router to App Router during unrelated work.
Do not create duplicate competing routes.
Respect:
- layouts
- route groups
- dynamic segments
- parallel routes
- intercepting routes
- loading/error/not-found boundaries
where they exist.
For Next.js versions that use `proxy.ts`, do not generate obsolete `middleware.ts` patterns unless the installed version or runtime specifically requires them.
Do not use Proxy/Middleware as a general business-logic layer.

## React Correctness
Follow React's rules.
Never:
- conditionally call hooks
- create unnecessary effects
- mutate props/state
- derive state through effects when it can be calculated during render
- create unstable dependencies unnecessarily
- misuse client-only APIs during server rendering
Avoid hydration mismatches.
Do not use browser-only values during server rendering without an appropriate client boundary.
Avoid nondeterministic initial server/client output.

## Performance
Do not optimize blindly.
Prefer framework primitives where appropriate:
- `next/image`
- `next/font`
- metadata APIs
- lazy/dynamic loading when justified
Avoid:
- sending unnecessary JavaScript to the browser
- converting large component trees into Client Components
- duplicating data fetching unnecessarily
- importing large libraries for trivial functionality
Preserve accessibility while optimizing.

