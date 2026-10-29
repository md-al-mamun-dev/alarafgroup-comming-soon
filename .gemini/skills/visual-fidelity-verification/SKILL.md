---
name: visual-fidelity-verification
description: Compares rendered application UI with supplied reference designs (screenshots, Figma matches, SVG matches). Use for pixel comparison, visual regression, design audit, UI mismatch, visual verification, and verifying pixel-perfect UI.
---

# Visual Fidelity Verification

Fidelity requires rendering. Code correctness alone is insufficient to prove a UI matches a design specification.

## 1. Visual Comparison Loop
IMPLEMENT → RENDER AT REFERENCE VIEWPORT → CAPTURE SCREENSHOT → COMPARE WITH REFERENCE → CLASSIFY DIFFERENCES → FIX ROOT CAUSE → RENDER AGAIN.
Repeat until remaining differences are acceptable.

## 2. Reference Canvas and Screenshots
- The implementation screenshot and reference SVG/image must be compared at the EXACT same viewport dimensions (the reference canvas).
- Disable nondeterminism during visual tests: animations, cursors, loading states, random data, or time-dependent UI.
- Use Playwright (if available) for deterministic screenshot capture (`toHaveScreenshot()`). **Note: Playwright is currently NOT installed in this repository. Recommend installing it for robust visual testing if requested.**

## 3. Difference Classification
When a mismatch occurs, trace its root cause in this order:
1. Font loaded?
2. Correct font weight?
3. Correct viewport?
4. Correct container width / box sizing?
5. Correct line height / spacing?
6. Image crop / transform / layering?
Do not randomly modify margins or add absolute offsets to "clean up" the difference. Fix the underlying layout or typography mismatch.

## 4. Difference Threshold and Truth
- Aim for effectively pixel-identical reproduction at the reference viewport, excluding known browser font rasterization differences.
- Do NOT test-cheat: do not modify the golden baseline to hide errors, increase tolerance arbitrarily, or crop the screenshot to ignore mistakes.
- Use `FIDELITY VERIFIED`, `PARTIALLY VERIFIED` (explain what couldn't be checked), or `BLOCKED` (missing fonts/assets) as your status.

## 5. Overlay Comparison
When possible, overlay the reference and implementation to spot 1–2 pixel shifts, incorrect line heights, or slightly wrong colors.
