---
name: nextjs-client-boundaries
description: Guidelines for managing Next.js Client Boundaries, ensuring Server Components remain the default.
---

# Next.js Client Boundaries

Follow these strict rules when working with Client and Server Components in Next.js:

## 1. Server Components by Default
- Treat **Server Components** as the default.
- Only introduce a Client Component when absolutely necessary.

## 2. Minimal `"use client"` Boundaries
- Keep the boundary of `"use client"` as small and low in the component tree as possible.
- **DO NOT** add `"use client"` at the top of a page or large layout file just to use a hook or event handler deep within the tree.
- Instead, extract the specific interactive part into its own small Client Component and import it into the Server Component.

## 3. Passing Data Across Boundaries
- Be mindful of data serialization across the Server/Client boundary.
- Pass simple, serializable data as props to Client Components.
- When passing React nodes, use the `children` prop or standard component composition patterns.

## 4. Interleaving Server and Client Components
- Remember that Server Components can be passed as `children` or props to Client Components, allowing you to interleave server-rendered content within interactive client wrappers.

## 5. Server Data
- Use Next.js server mechanisms (Server Components, Route Handlers, Server Actions) for fetching and mutating server data whenever practical.
- **DO NOT** reach for client-side fetching (`useEffect` + `fetch` or SWR/React Query) unless you specifically need client-side data updates, real-time subscriptions, or complex client-side caching beyond what the Next.js router provides.
