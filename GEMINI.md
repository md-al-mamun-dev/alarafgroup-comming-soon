# Gemini Agent Configuration

These rules are ALWAYS-ON for this repository. Follow them strictly.

## 1. Inspect Before Editing
Before changing code:
1. Read the relevant files.
2. Inspect their imports and callers.
3. Inspect related types/interfaces.
4. Understand existing conventions.
5. Determine the smallest safe change.
Never modify a file based solely on its filename. Never invent unseen code.

## 2. Analysis Mode vs Modification Mode
Interpret requests carefully:
- **Analysis Mode**: If the user asks to inspect, audit, analyze, explain, review, investigate, or diagnose, do NOT modify application files unless explicitly requested.
- **Modification Mode**: If the user asks to implement, fix, update, change, add, remove, or refactor, modification is allowed within the requested scope.
Never convert an analysis request into an implementation task on your own.

## 3. Minimal Change Principle
Make the smallest change that correctly satisfies the task.
Do NOT:
- Rewrite entire files for a local change.
- Reformat unrelated code.
- Rename unrelated symbols.
- Reorganize folders unnecessarily.
- Change architecture without need.
- Replace libraries because you personally prefer another library.
- Alter unrelated UI.
- Perform unsolicited cleanup.
Preserve behavior outside the requested scope. Before replacing a large file, determine whether a targeted edit is possible.

## 4. No Hallucinated Dependencies or APIs
Never invent:
- npm packages
- package versions
- package exports
- command-line flags
- Next.js APIs
- React APIs
- environment variables
- config keys
- library functions
- filenames
- database fields
- routes

Before using a dependency:
1. Inspect `package.json`.
2. Inspect the lockfile (`pnpm-lock.yaml`) when relevant.
3. Inspect installed types/package source when necessary.
4. Verify the API against local or authoritative documentation.

If a new dependency is genuinely required:
- Explain why the existing stack cannot solve the problem.
- Use the repository's package manager (`pnpm`).
- Verify the package actually exists.
- Verify compatibility.
- Avoid unnecessary dependency additions.
Never silently add a package.

## 5. Package Manager Integrity
The package manager is **pnpm** (specifically version `11.9.0` via `package.json` packageManager).
Use `pnpm` consistently.
Never create a second lockfile (e.g., `package-lock.json`, `yarn.lock`).
Never switch package managers unless explicitly requested.

## 6. Preserve Existing Architecture
Follow existing project conventions for:
- Folder layout (Root-level `app/` directory, no `src/`)
- Path aliases (`@/*` maps to `./*`)
- Styling (Tailwind CSS v4)
- Feature organization, services, API clients, hooks, schemas, validation, error handling, naming, imports, authentication, testing.
Do not introduce a new architectural pattern when a suitable existing pattern already exists.

## 7. Type Safety
Keep TypeScript strictness intact (TS 7.0.2).
Do not use shortcuts such as:
- `any`
- unnecessary type assertions
- `@ts-ignore`
- `@ts-nocheck`
- blanket eslint-disable
- disabling strict compiler options
unless there is an exceptional, documented technical reason. Fix the real type problem.
Validate external/untrusted data at runtime when appropriate; TypeScript alone is not runtime validation.

## 8. Never Fake Success
Do NOT:
- Hardcode successful responses to hide failures.
- Remove failing assertions.
- Disable tests to make CI green.
- Catch and ignore errors merely to silence them.
- Fabricate health-check results.
- Mock production behavior merely to hide a bug.
- Claim a command passed without running it.
Fix root causes.

## 9. Completion Evidence
Never say a task is complete simply because code was written.
For code changes, run the relevant available validation such as:
- Targeted tests
- TypeScript/typecheck
- ESLint (`pnpm lint`)
- Unit tests
- Integration tests
- E2E tests when applicable
- Production build where appropriate (`pnpm build`)
Use repository scripts rather than inventing commands.
If full validation cannot be performed, explicitly say what was and was not verified. A task with required tests is NOT complete when the tests were not created.

## 10. Context Discipline
Do not put huge generated outputs into the agent context.
Avoid reading or printing entire:
- lockfiles
- minified files
- build artifacts
- huge logs
- generated bundles
- database dumps
- coverage dumps
unless absolutely required. Use targeted commands such as filtering, searching, line ranges, `head`, `tail`, or equivalent techniques. Inspect only the data required to make the decision.

## 11. Change-Safety Workflow
Encode this workflow for tasks:
UNDERSTAND → LOCATE → READ → TRACE DEPENDENCIES → VERIFY API → PLAN MINIMAL CHANGE → IMPLEMENT → REVIEW DIFF → TEST → VERIFY → REPORT
Never jump directly from request to broad implementation without understanding affected code.

## 12. Source-of-Truth Priority
When sources disagree, follow this priority:
1. Explicit current user instruction
2. Repository requirements and existing architecture
3. Installed dependency/API documentation (`node_modules/next/dist/docs/`)
4. Installed Next.js version-matched documentation
5. Existing tests and contracts
6. Official current documentation
7. Model memory
Model memory must NEVER override contradictory version-matched project evidence.


## 13. Backend Architecture
All Next.js backend changes must follow the repository's `nextjs-backend-architecture` skill. Route Handlers and Server Actions must remain thin; business logic belongs under `server/modules` (or `src/server/modules`); database access must not be scattered through UI/routing files; Server Components should access same-application backend services directly instead of unnecessarily calling internal API routes.

## 14. UI Architecture and Fidelity
All UI development must follow the project's UI architecture, design-system consistency, and UI fidelity skills. Reuse existing components and tokens before creating new ones. Do not introduce arbitrary visual patterns or duplicate primitives.

## 15. Frontend and UI Logic Architecture
All UI behavior and state must follow the project's hook-first and context-based architecture skills. Use CSS/Tailwind for style reuse rather than style-only wrapper components. Move interaction logic into custom hooks. Do not use raw `useEffect` in component files. Keep Context providers scoped. Minimize client boundaries and prefer Server Components.

