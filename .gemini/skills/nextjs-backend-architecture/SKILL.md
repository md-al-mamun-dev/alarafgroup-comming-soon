---
name: nextjs-backend-architecture
description: Enforces the project's approved Next.js backend architecture whenever creating, modifying, reviewing, or refactoring Route Handlers, Server Actions, server-side business logic, database access, authentication, integrations, webhooks, API endpoints, or backend modules.
---

# Next.js Backend Architecture

## 1. Directory Structure Standard
The project conceptually follows this backend structure:
- `app/` (or `src/app/`): Framework entry points, Pages, Route Handlers.
- `actions/` (or `src/actions/`): Server Actions.
- `server/db/` (or `src/server/db/`): Database and ORM infrastructure.
- `server/auth/` (or `src/server/auth/`): Shared authentication infrastructure.
- `server/modules/<feature>/` (or `src/server/modules/`): Domain-driven business logic.
- `server/integrations/<provider>/` (or `src/server/integrations/`): External third-party integrations (Stripe, email, etc.).
- `server/shared/` (or `src/server/shared/`): Cross-domain backend utilities (errors, logger).
- `lib/` (or `src/lib/`): Lightweight shared generic utilities (not for complex backend domain logic).

*Note: The current repository uses the root for `app/` and has a barebones setup. Follow this pattern (root-level `server/`, `actions/`, etc.) unless the project explicitly migrates to `src/`.*

## 2. Core Dependency Direction
- **Route Handler** → **Service** → **Repository** → **Database**
- **Server Action** → **Service** → **Repository** → **Database**
- **Server Component** → **Service / DAL** → **Repository** → **Database**
- **Service** → **Integration Adapter** → **External Service**

Never reverse these dependency directions without a strong architectural reason. Transactions belong in backend services/repositories, not Route Handlers.

## 3. Framework Entry Points Must Be Thin
`app/` is NOT the business layer. Keep framework entry points (`page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`) thin. 
- **Route Handlers** (`api/.../route.ts`) are HTTP transport adapters. They handle parsing, auth context, and status codes, but NOT major business logic or direct DB access.
- **Server Actions** (`actions/...`) are UI mutation adapters. They must not contain the main business logic.
Never duplicate business logic between Route Handlers, Server Actions, and Server Components; all should reuse the same backend service.

## 4. Feature-Based Server Modules
Backend domain logic must be organized by feature under `server/modules/<feature>/`. 
Create files based on actual responsibilities (e.g., `user.service.ts`, `user.repository.ts`, `user.schema.ts`, `user.dto.ts`, `user.policy.ts`). Do not create empty architectural boilerplate.
- **Service** (`*.service.ts`): Orchestrates business rules, calculations, and integrations. Must NOT know about HTTP concerns (`NextRequest`, `NextResponse`, React).
- **Repository** (`*.repository.ts`): Centralizes database operations.

## 5. Internal API Calls
**Server Components must not call internal API routes.** Never use `fetch('/api/v1/...')` from a Server Component to hit the same Next.js app. Import and call the server-side service directly (e.g., `import { getUsers } from '@/server/modules/users/user.service'`).

## 6. DTOs and Data Shaping
Do not blindly expose complete database records. Use a DTO or mapper (e.g., `user.dto.ts`) to shape output and prevent leaking sensitive internal fields (password hashes, private metadata, DB-only fields).

## 7. Validation and Authorization
- **Validation**: Use the project's existing validation library. Keep schemas beside the feature (`server/modules/<feature>/<feature>.schema.ts`). Validate untrusted inputs at boundaries (Route Handlers, Server Actions, webhooks).
- **Authorization**: Domain-specific authorization belongs close to the domain (`*.policy.ts`). Server-side operations must perform real authorization; UI-level hiding is NOT sufficient.

## 8. Integrations and Webhooks
- **Integrations**: Keep third-party provider code in `server/integrations/<provider>/`. Do not mix SDK initialization into business services.
- **Webhooks**: Keep webhooks separate from normal REST endpoints (e.g., `api/webhooks/<provider>/route.ts`). Move complex webhook business logic out of `route.ts` into a backend service.

## 9. API Versioning
If the API is consumed externally (mobile apps, third parties), prefer `api/v1/`. Do not introduce versioning unnecessarily for internal-only endpoints.

## 10. Server-Only Protection
Backend-only modules should use `import 'server-only'` where appropriate. Never make server modules client-compatible merely to solve an import error. Never import database clients, repositories, server services, or secrets into Client Components.

## 11. Strict Prohibitions
1. Putting complex business logic in `route.ts` or Server Actions.
2. Putting database queries directly inside Client Components or unnecessarily throughout pages.
3. Calling internal Next.js HTTP APIs from Server Components when direct server-layer access is available.
4. Treating `lib/` as the backend dumping ground.
5. Creating random root-level `services/` and `repositories/` folders.
6. Duplicating services/repositories or business logic.
7. Mixing HTTP-specific logic into domain services.
8. Exposing database entities directly when sensitive fields may exist.
9. Importing server-only modules into Client Components.
10. Putting external SDK initialization randomly throughout the codebase.
11. Creating empty architecture boilerplate or rebuilding Next.js into NestJS-style components.
12. Performing massive architecture refactors during unrelated tasks.
13. Ignoring existing repository conventions without reason.
14. Introducing another validation/ORM/state library unnecessarily.
15. Bypassing authorization because the frontend hides a feature.
16. Creating new backend files without first searching for an existing suitable abstraction.

## 12. Review Checklist
Whenever completing backend development, verify:
- Are entry points (Route Handlers, Server Actions) thin?
- Is business logic in the correct feature service?
- Is database access centralized in repositories?
- Are Server Components avoiding self-HTTP calls?
- Is authorization enforced server-side?
- Are DTOs used for sensitive data?
- Are external integrations properly isolated?
- Does the dependency direction remain clean?
- Are server-only modules protected?
- Is anything incorrectly placed in `lib/`?
- Did we duplicate an existing abstraction?

*Fundamental Rule*: Next.js entry points are adapters. Services contain business logic. Repositories contain persistence logic. Integrations contain provider-specific logic. Do not violate this separation for short-term convenience.
