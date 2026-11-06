---
name: git-commit-workflow
description: Standard operating procedure for staging and committing changes with conventional two-part commit messages and explicit file paths from the repository root.
---

# Git Commit and Staging Workflow

This skill standardizes Git staging and commit message suggestions for all AI agent code modifications.

## 1. Execution Directory
All suggested Git commands MUST be executable directly from the repository root directory (`/Users/.../Agency-app`). Do not suggest commands that assume a nested working directory.

## 2. Explicit Staging Principle
- **Always specify modified files explicitly**: Use `git add <file1> <file2> ...` with relative paths from the repository root.
- **Avoid blanket staging**: Never suggest `git add .` or `git add -A` blindly, to prevent staging untracked scratch files, experimental assets, or unintended environment artifacts.

## 3. Two-Part Commit Message Format
Every commit command must use a two-part `-m` structure:
1. **Title (First `-m`)**: Conventional Commits standard:
   `<type>(<scope>): <concise imperative summary>`
   - Common types: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `test`.
   - Scope: Target feature, page, or component (e.g., `landing`, `brands`, `cards`, `button`, `contact`).
   - Subject: Imperative, present tense, lowercase start, no ending period.
2. **Body (Second `-m`)**: Detailed multi-line bullet points explaining what was changed and why.

### Example Template
```bash
git add src/design-system/molecules/ContentCard.tsx src/design-system/organisms/CardGrid.tsx
git commit -m "style(cards): center card icons and justify body text" -m "- Add center-justify alignment mode to ContentCard
- Expose cardAlign prop on CardGrid
- Center section headers and justify card descriptions on brand pages"
```

## 4. Automatic Suggestion Trigger
Whenever a task involves creating, modifying, or deleting files, the final completion report MUST include the exact copy-pasteable Git command block containing both the explicit `git add` and two-part `git commit` commands.
