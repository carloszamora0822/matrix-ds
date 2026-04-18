# MATRIX-DS

`MATRIX-DS` is the public design-system workspace for Matrix.

It packages the current UI language, theme system, shared button primitives, and the split-flap board renderer prototypes into a standalone directory that can be published to GitHub without requiring the rest of the product codebase.

## What is in here

- `prototype.html`
  Public prototype page for reviewing the design system in the browser.
- `tokens.css`
  Shared design tokens used by the prototype.
- `system/`
  Source-of-truth modules for themes, buttons, registry bootstrapping, and board rendering.
- `docs/design-brief.md`
  Product and visual direction for the system.
- `docs/research-notes.md`
  Research notes for loading states, motion, and premium UI behavior.
- `CHANGELOG.md`
  Release history for this package.
- `VERSIONING.md`
  Tagging and release rules for public updates.

## Current scope

This package currently focuses on:

- theme tokens and theme switching
- shared button primitives
- auth/chat/board mock page patterns
- Vestaboard-style board rendering prototypes
- interactive character-study surfaces for glyph review

This is still a design-system lab, not a published npm library or production React package.

## Run locally

From the repo root:

```bash
python3 -m http.server 4173 --directory MATRIX-DS
```

Then open:

```text
http://127.0.0.1:4173/prototype.html
```

## Release model

Use Git tags with a directory-specific prefix:

```text
matrix-ds/v0.1.0
matrix-ds/v0.1.1
matrix-ds/v0.2.0-alpha.1
```

Rules are documented in [VERSIONING.md](./VERSIONING.md).
