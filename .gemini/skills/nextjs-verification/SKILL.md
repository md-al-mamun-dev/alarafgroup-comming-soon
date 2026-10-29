---
name: nextjs-verification
description: Activate whenever code has been added, fixed, refactored, or reviewed for completion.
---

# Next.js Verification Skill

## Verification Ladder
Use the following verification ladder to ensure code quality and safety:
1. Review the final diff.
2. Check for unrelated modifications.
3. Check imports and dependency changes.
4. Run the most targeted relevant test.
5. Run TypeScript/typecheck if available.
6. Run lint if available (`pnpm lint`).
7. Run broader relevant tests.
8. Run build when warranted (`pnpm build`).
9. Inspect runtime/browser behavior when the task affects UI/runtime behavior and suitable tools exist.

## Proportional Verification
Do not blindly run every expensive command for every tiny documentation edit.
Use proportional verification according to the scope of the change.

## Test Maintenance
Never modify tests just because they fail after an implementation.
First determine whether:
- implementation is wrong
- test is legitimately obsolete
- environment is broken
- failure is unrelated
If changing a test is genuinely required, preserve its behavioral intent.
Never remove coverage merely to obtain a green result.

## Completion Reporting
Before reporting completion, classify validation as:
- **VERIFIED** — requested behavior and relevant checks passed.
- **PARTIALLY VERIFIED** — some checks could not be run; explain exactly which.
- **BLOCKED** — a concrete external/environmental issue prevents validation.
Do not use VERIFIED unless concrete evidence exists.

