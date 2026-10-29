---
name: nextjs-security
description: Activate when work involves authentication, authorization, Server Actions, Route Handlers, secrets, or inputs.
---

# Next.js Security Skill

## Trust Boundaries
Treat every Server Action and Route Handler as a potentially public server entry point.
Do not trust a request because the UI is supposed to call it.
Perform authorization at the server-side operation.
Authentication and authorization are separate checks.
Validate that the current user can perform the requested operation against the requested resource.
Prevent IDOR/BOLA-style resource access mistakes.

## Input Validation
Treat client-controlled values as untrusted.
Validate:
- form data
- JSON bodies
- query parameters
- path parameters
- headers when used as input
- uploaded files
- redirect targets
- IDs
Use the repository's existing validation mechanism.
Do not introduce another validation library unnecessarily.

## Secrets
Never expose server credentials to client bundles.
Do not log secrets.
Do not commit secrets.
Do not expose arbitrary server environment variables using `NEXT_PUBLIC_*`.
Never place private API keys in browser-accessible code.

## Rendering / XSS
Prefer normal React rendering.
Avoid `dangerouslySetInnerHTML`.
If HTML rendering is truly required, ensure untrusted HTML goes through an established sanitization strategy.
Do not build HTML from untrusted strings manually.

## Authentication
Do not assume that UI route protection provides sufficient authorization.
Critical mutations and sensitive reads require server-side authorization.
Do not implement custom cryptography when an established project solution exists.
Respect secure cookie configuration and the project's existing session strategy.

