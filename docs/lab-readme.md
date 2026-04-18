# Matrix Design System Lab

This directory is an isolated UI workspace for Matrix.

It exists to let us make the visual system, component vocabulary, and mock page patterns first, without touching the real app routes or wiring.

## Goals

- Define a non-generic visual language for Matrix.
- Establish reusable tokens before building production components.
- Prototype the hardest surfaces early: auth, chat, and board operations.
- Keep all experimentation contained under `.design-system/`.

## Files

- `design-brief.md`
  Locks the initial visual direction, component priorities, and build rules.
- `tokens.css`
  Foundation tokens: color, type, radius, spacing, shadow, and motion.
- `prototype.html`
  A crafted static specimen showing the design system in context.
- `research-notes.md`
  Short rationale and official references behind the loading and motion decisions.
- `system/themes.js`
  Source of truth for fonts, color, spacing, radii, motion, and board variables.
- `system/button-system.js`
  Shared button registry and runtime hydration.
- `system/vestaboard-rendering.js`
  Shared Vestaboard renderer with same-shape prefill and live flip streaming.
- `system/registry.js`
  Master file that imports every design-system module and boots the prototype.

## How To Use This Folder

1. Open `prototype.html` in a browser.
   Better: serve `.design-system/` locally and open the page over `http://`.
2. Review the direction against the brief.
3. Adjust tokens first, components second, page composition third.
4. Only port patterns into the app once the design language feels intentional.

## Initial Component Set

- CTA buttons
- text inputs and helper text
- auth card
- sidebar shell
- chat messages
- composer module
- artifact card
- board status card
- schedule rail

## Rules For Future Additions

- Foundations like fonts, colors, spacing, and motion belong in `system/themes.js`.
- New components must be expressed in terms of existing tokens.
- Every shared component should have a dedicated module and be imported by `system/registry.js`.
- Every component should declare its purpose, variants, and states.
- Domain UI should feel like Matrix, not a third-party admin template.
- If a component only exists because "apps usually have one," it probably does not belong.
