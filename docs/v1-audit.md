# v1.0 Audit — Kill / Keep / Add

Pass 1 output. Walks every surface against `design-direction.md` + `design-brief.md` + `CLAUDE.md`. Decisions are the contract for Passes 2–5.

**Audited:** 2026-04-21 against v0.2.0-alpha.1.

---

## A. prototype.html (2708 lines)

### Verdict: REBUILD, don't trim

The current `prototype.html` is a single composed screen (`data-screen-label="01 Strip"`, lines 243–390) — a weekly strip view with a calendar-day row, a multi-board tab bar with live dots, a horizontal scrolling timeline with AIRED/ON AIR/NEEDS YOU/AUTO status badges, holding-duration gaps, and a batch-approve CTA.

Every one of those is in the kill column of `design-direction.md`. Trimming this screen would leave almost nothing, and even the nothing would be the wrong shape — this is a composed product view, not a specimen gallery. `CLAUDE.md` says *"prototype.html is not a demo, it is the single canonical gallery of every visible state."* The current file isn't that.

**Rebuild target for Pass 3:** prototype.html becomes a scrollable artboard grid with labeled sections, one section per primitive, rendering every shipped variant + state + theme inline.

Target sections (in order):

1. **Foundations** — color surfaces, color text, color signal, radii, shadows, spacing scale, type scale
2. **Primitives** — button (primary / secondary / ghost / danger × idle / hover / focus / active / disabled / loading), field (input, textarea × idle / focus / filled / error / disabled), chip (idle / active), nav-item (collapsed / expanded × idle / active), live-dot (live / not-live)
3. **Domain modules** — board card (small, large), chat message (user, agent, agent-with-artifact), composer input with suggestion pills, confirmation card (schedule confirm shape), auth card (paper-toned magic-link), board selector (dropdown at rest + open)
4. **Composed surfaces** — the composition view (chat + canvas) rendered inline at ~80% width, the boards list at ~80% width
5. **Theme switcher** — inline controls that re-render everything above in Editorial Control Room / Signal Atelier / Amber Broadcast

### What survives from the current body (copy-paste candidates)

- The `.ask` pattern (line 346) — agent input with quick-reply pills. Correct shape, rename `.ask` → `.composer`, keep.
- The `.sheet` modal (line 357) — the "three lines × 22 chars" editor. Core to the screen-edit flow. Keep as a specimen for the inline editor primitive, trim the "Delete slot / Move time" pair to just Cancel / Save (destructive actions surface in chat per direction).

### What dies

| Thing | Lines | Why |
|---|---|---|
| `<header class="top">` with brand + `Carlos · Austin · 13:47` | 247–250 | Personal status line belongs in chat if anywhere, not app chrome. |
| `<div class="agent">` with "Approve all 6" | 252–262 | Batch action bar. Direction: kill. |
| `<div class="days">` — 11 day cells with "5 aired / 6 aired / 3 done 2 left" | 264–276 | Calendar grid with status counts. Direction: kill. |
| `<div class="boards-tabs">` — multi-board tab bar with live dots | 278–286 | Multi-board tab bar. Direction: kill. Board selector is a dropdown, not a tab strip. |
| `<div class="strip">` horizontal timeline with AIRED/ON AIR/NEEDS YOU/AGENT DRAFT/AUTO/WEEKLY/OPEN badges and gap/holding text | 288–344 | Timeline with status badge menagerie + holding durations. Direction: kill. |
| CSS/JS for the above | ~81–241, 392–427 | Remove once the markup above is gone. |

---

## B. preview/ (18 cards)

18 per-primitive review cards. Each is 80–95 lines of self-contained HTML with inlined tokens + a small demo.

### Systemic problems in all 18 cards

- **Each file inlines the full token block** (lines 1–74 of `timeline.html`, same in all others). 18 copies of the same tokens = 18 places to update when tokens move. **Fix in Pass 3:** all preview cards `<link>` to `../tokens.css` + `../colors_and_type.css` instead of inlining. Single source of truth restored.

### Per-card decisions

| File | Verdict | Notes |
|---|---|---|
| `buttons.html` | **KEEP** — primary/secondary/ghost/danger are the four button intents the direction implies. Extend to show all states (idle/hover/focus/active/disabled/loading) in Pass 3. |
| `cards.html` | **KEEP** — card is the core container primitive. Extend to show rest/hover/selected variants. |
| `chips.html` | **AUDIT** — chips are fine as an element, but review what variants it shows. Kill any "Draft / Ready / Needs you" status chips. Keep suggestion-pill chip variant (used in composer). |
| `colors-signal.html` | **KEEP** — palette swatches. |
| `colors-surfaces.html` | **KEEP** — shell / panel / paper swatches. |
| `colors-text.html` | **KEEP** — text-strong / body / muted / dark / dark-muted swatches. |
| `fields.html` | **KEEP** — input + textarea. Extend to show focus / error / disabled / filled states. |
| `logo.html` | **KEEP** — wordmark specimen. |
| `messages.html` | **KEEP** — chat bubble variants (user / agent / agent-with-artifact). Audit what's there against direction, may need additions rather than trim. |
| `nav-items.html` | **KEEP** — update to show 4 destinations (Boards / Data Sources / Library / Settings) only. No "Chat" nav item. |
| `radii.html` | **KEEP** — radius specimen. |
| `shadows.html` | **KEEP** — shadow-1 / shadow-2 / shadow-inset specimen. |
| `spacing-scale.html` | **KEEP** — `--space-1` through `--space-10` specimen. |
| `timeline.html` | **KEEP, rename** — content is actually a flat "what's next" list (3 time-labeled cards), which is the direction's replacement for the killed horizontal timeline. Rename to `whats-next.html`. Pass 3: add a small board-preview thumbnail to each item. |
| `type-body.html` | **KEEP** — Manrope body scale. |
| `type-display.html` | **KEEP** — Instrument Serif specimen. |
| `type-mono.html` | **KEEP** — IBM Plex Mono specimen. |
| `type-scale.html` | **KEEP** — full type scale specimen. |

### Missing primitives (to add in Pass 3)

- `live-dot.html` — the green-dot-or-nothing status primitive. This is the ONE status primitive; every place that would have had a status badge uses this (or renders nothing).
- `confirmation-card.html` — the scheduling confirmation card shape ("Show this Saturday 8am to 6pm on Storefront?" + confirm/edit).
- `board-card.html` — small board card used in the Boards list and as inline chat artifacts.
- `board-canvas.html` — the large Vestaboard preview frame used in the composition view's right rail.
- `auth-card.html` — paper-toned magic-link card.
- `board-selector.html` — simple single-line switcher / dropdown.

---

## C. ui_kits/app/index.html (2453 lines — mostly inlined JS bundle)

### Verdict: SURGICAL TRIM, don't rebuild

Structure is right: `<aside class="side">` sidebar + `<section class="chat">` chat column + `<aside class="canvas paper">` canvas rail. This IS the composition view the direction calls the primary surface.

### Kill list (targeted edits to the body, lines 131–173)

| Thing | Line | Why |
|---|---|---|
| `<div class="nav-item active"><span class="dot"></span>Chat</div>` | 135 | Chat is not a nav destination (decision A). Remove. The remaining four (Boards / Library / Data sources / Settings) become the nav; the active state moves to whichever destination is open, or nothing when in the composition view. |
| `<small>Control room / v0.1</small>` | 133 | Build version chrome. Remove. |
| `<small style="...">Magic link only. No password flow in v1.</small>` in composer footer | 163 | Sign-in copy leaked into composer. Remove. |
| `<span class="chip info">3 screens</span>` | 149 | Screen-count chip. Metadata chrome that competes with the artifact. Remove — if the user needs this, the agent tells them in chat. |
| `<span class="chip">Draft</span>` | 149 | "Draft" status badge. Direction: kill. |
| `<span class="chip live"><span class="dot"></span>Ready</span>` inside artifact | 155 | "Ready" label on a status chip with a dot. Keep the dot (as the live-dot primitive when something is live); kill the "Ready" text. |
| `<div class="rundown">Planned composition</div>` | 148 | Eyebrow over the chat header. Pulls too much weight from the artifact. Remove or replace with simple date/time line. |
| `<h2>Saturday reopening deck</h2>` chat-head title | 148 | The chat-head title pattern is OK as a primitive, but the content in the demo should be board-name-aware, not deck-name-aware (in the direction, the deck is the artifact, not the page title). Keep shape, change demo content. |
| `<button>Open schedule preview</button>` in canvas rail | 171 | Schedule preview is a conversation, not a separate rail button. Remove — the scheduling confirmation card renders inline in chat when the agent is ready. |

### Keeps (unchanged or tweaked)

- Sidebar brand + Matrix wordmark
- Four nav items (after Chat is removed): Boards / Data sources / Library / Settings
- `<div class="decision"><strong>Current board</strong>Studio / Austin / Central</div>` — this is the board selector primitive. Keep, move to chat-head or a minimal top bar per direction ("Board selector is inline in the chat header or a minimal top bar"), trim from sidebar footer.
- Chat stream (user message + agent message + artifact)
- Composer textarea + suggestion pills + Send button
- Canvas rail with large Vestaboard preview
- Canvas-card content cards ("Why this matters", "Next publish")

---

## D. ui_kits/marketing/ and ui_kits/vestaboard/

Not audited in Pass 1 — marketing site and board-renderer showcase are out of scope for Phase 8's DS gate. They ship primitives, not product surfaces. Revisit after v1.0 if needed.

---

## E. Summary

| Surface | Action | Scope |
|---|---|---|
| `prototype.html` | **Rebuild** as specimen grid | Pass 3 |
| `preview/timeline.html` | Rename → `whats-next.html`, add thumbnail | Pass 2 + Pass 3 |
| `preview/nav-items.html` | Update to 4 destinations | Pass 2 |
| `preview/chips.html` | Audit + trim status-chip variants | Pass 2 |
| `preview/*` other 15 cards | Keep, extend state coverage in Pass 3 | Pass 3 |
| `preview/live-dot.html` | New | Pass 3 |
| `preview/confirmation-card.html` | New | Pass 3 |
| `preview/board-card.html` | New | Pass 3 |
| `preview/board-canvas.html` | New | Pass 3 |
| `preview/auth-card.html` | New | Pass 3 |
| `preview/board-selector.html` | New | Pass 3 |
| `ui_kits/app/index.html` | Surgical trim | Pass 2 |
| `ui_kits/marketing/` + `ui_kits/vestaboard/` | Defer | Post-v1.0 |

### What Pass 2 actually deletes (code impact)

- `prototype.html`: ~150 lines of killed body markup + associated CSS (~160 lines) + `.days` / `.boards-tabs` / `.strip` / `.agent` JS (~35 lines). The rebuild in Pass 3 replaces this file entirely, so Pass 2 on prototype.html is effectively "zero it out and stub the new section shells."
- `ui_kits/app/index.html`: ~8 targeted inline edits, no structural change.
- `preview/timeline.html`: rename + light content touch.
- `preview/nav-items.html` + `preview/chips.html`: audit + trim.

### Open questions for Carlos (before Pass 2 starts)

1. **Theme switcher UI:** the current switcher is a set of `data-theme-switch` buttons defined in the JS bundle. Prototype rebuild should surface them visibly (top-right?) so review can swap themes live. Agree, or hide behind a keyboard shortcut?
2. **Board-selector placement:** direction says "inline in the chat header or a minimal top bar." The app kit currently has it in the sidebar footer. Pass 2 move to chat-head, or a tiny top bar above chat+canvas?
3. **Composition view: default collapsed sidebar?** Direction says *"No sidebar visible during composition"*. Should the app kit demo render the sidebar hidden by default (icon strip only?) with a way to open it, or render it expanded so reviewers see both states?
4. **Auth card scope:** direction lists sign-in as one of the three Phase 8 surfaces. Do we prototype a full sign-in screen in `ui_kits/app/` as a second `data-screen-label` artboard, or keep that as `preview/auth-card.html` only until Phase 8?
