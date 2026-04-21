# Changelog

All notable changes to `MATRIX-DS` should be documented in this file.

The format is intentionally simple and release-oriented.

## [0.2.0-alpha.1] - 2026-04-21

- Consolidated Claude Design handoff bundle into the repo proper; deleted the `matrix-ds-design-system/` wrapper.
- Replaced `prototype.html` with the expanded, self-contained specimen page (inlined tokens, more states and variants).
- Added `colors_and_type.css` — semantic token aliases layered over `tokens.css`, plus Google Font imports.
- Added `preview/` — per-primitive review cards (buttons, cards, chips, fields, nav-items, messages, timeline, type scales, radii, shadows, spacing, colors, logo).
- Added `ui_kits/` — composed product surfaces: `app/` (Matrix chat workspace), `marketing/` (public site), `vestaboard/` (board renderer kit).
- Added `docs/design-direction.md` — UX direction document codifying the five-minute-user constraint, components to keep/simplify/cut/add, and the green-dot-or-nothing status discipline. Absorbed from the Matrix repo's `DESIGN-DIRECTION.md`.
- Updated `CLAUDE.md` to reference `docs/design-direction.md`, document the new folders, and fold the five-minute-user and single-source-of-status filters into the design principles.
- Skipped bundle's stale copies of `system/`, `tokens.css`, `docs/`, `uploads/`, `screenshots/`, and `matrix-system.js` — the in-repo versions are newer.

## [0.1.0-alpha.1] - 2026-04-18

- Created the standalone public `MATRIX-DS/` package directory.
- Added shared theme, button, and registry modules.
- Added the split-flap board renderer with optimized streaming flip playback.
- Added custom board glyph rendering and optical centering work.
- Added the public prototype page and character-study board showcase.
- Added public release/versioning documentation for GitHub publication.
