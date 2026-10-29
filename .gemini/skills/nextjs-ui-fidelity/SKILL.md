---
name: nextjs-ui-fidelity
description: Activate when implementing designs, working from visual references, or modifying existing layouts.
---

# UI Fidelity Skill

## Strict Design Implementation
A supplied design is a specification, not inspiration.
Do not invent UI.
Do not add:
- extra inputs
- extra labels
- extra buttons
- extra cards
- extra icons
- extra sections
- extra text
unless requested or required by demonstrated application functionality.
Do not remove design elements.

## Pre-Implementation Inventory
Before implementing a design, create an internal inventory of:
- text
- input fields
- controls
- icons
- images
- cards
- sections
- ordering
- spacing relationships
- states
Then implement all items exactly once unless the design indicates repetition.

## Layout and Styling
Preserve existing responsive conventions.
Do not sacrifice semantic HTML or accessibility solely for pixel similarity.
Do not use arbitrary absolute positioning when a normal layout system can reproduce the design reliably.
The styling solution for this project is Tailwind CSS. Use it appropriately according to established conventions.

## Post-Implementation Validation
After implementation, compare output against the supplied design when tools allow it.
Treat missing or extra fields as implementation defects.

