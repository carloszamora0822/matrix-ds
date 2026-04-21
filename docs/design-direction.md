# Design Direction

Companion to `design-brief.md`. The brief defines the **visual language** (tone, color, type, rhythm). This document defines the **UX direction** — what Matrix chooses to render, what it deliberately refuses to render, and the user constraint that governs both.

---

## The constraint that governs everything

A non-technical user spends **five minutes a day** here. Every component in the design system must justify its existence against that. If a component requires explanation, it doesn't ship.

---

## Components to keep and invest in

### Vestaboard preview (hero component)

The character grid, the dashed borders, the color rendering. Make it feel physical. Give it generous sizing. It should dominate any screen it appears on.

Two variants:

- **Large canvas** — composition view, right rail. Full-width, room-readable proportions.
- **Small card** — library grid, inline chat artifacts. Compact but still legible.

### Chat bubble and input bar

Simple message thread. User messages right-aligned (cobalt tint), agent messages left-aligned (shell tint). The suggested action pills at the bottom of the input ("close early next Tuesday," "plan next week") are good — tappable, casual, never toolbar buttons.

### Board selector

Simple dropdown or single-line switcher. The user picks which board they're talking about. No tab bar, no status dots, no health indicators in the selector.

---

## Components to simplify or constrain

### Calendar / date awareness

Kill the multi-day grid with per-day status counts. If date awareness is needed at all, it's a single-line label: "Today is Saturday Apr 18." Schedule visibility belongs in the chat or in a simple "what's next" list on the board detail view.

### Timeline

No horizontal scrolling timeline with overlapping blocks, duration badges, and holding indicators. Replace with a flat list: what's playing now, what's next. Rendered as simple cards with the Vestaboard preview thumbnail and a time label. Two or three items visible max.

### Status badges

No "AIRED," "DRAFTED," "ON AIR 1H 47M," "UNTIL NEXT FI," "4H HOLDING." Those are system internals. The design system has exactly two states a user ever sees on a screen or deck:

- **Green dot** — live right now
- **Nothing** — everything else

Everything else the agent communicates in words through the chat.

---

## Components to cut entirely

### Batch action bars

No "APPROVE ALL 6." No bulk operations. The agent works through things one at a time in conversation.

### Multi-board tab bar with health status dots

Board health is something the agent mentions when relevant, not something the user monitors visually.

### Calendar day cells with status counts

No "3 DONE 2 LEFT." This is project management UI. Matrix is not a content calendar tool.

---

## Components to add

### Full-screen composition view

Two things side by side: chat thread on the left, large Vestaboard preview on the right. No chrome, no sidebar, no toolbar. This is where the user spends 90% of their time.

### Inline preview expansion in chat

When the agent drafts a screen, it renders as a small Vestaboard card right inside the message thread. Tapping it expands to the large canvas view.

### Scheduling confirmation card

"Show this Saturday 8am to 6pm on Storefront?" with two buttons: confirm and edit. Not a timeline. Not a calendar picker. Just a card with the facts and a yes/no.

---

## Design system rules

### Hierarchy

Max two levels of hierarchy on any screen. If you're nesting UI inside UI inside UI, the screen is too complex.

### Interactive density

No more than three interactive elements visible at once outside of the chat thread itself.

### Visual dominance

The Vestaboard preview is always the largest element on screen. Nothing competes with it visually.

### Color discipline

Color in the UI is reserved for:

1. Vestaboard content rendering (tile colors)
2. The green "live" indicator dot

The app chrome stays neutral and dark. Do not use red/yellow/blue for UI status when those same colors mean things on the board.

### Typography

Three sizes total in the system. No more.

- **Body text** — `var(--text-md)` / Manrope. Interface copy, chat messages, descriptions.
- **Labels** — `var(--text-xs)` / IBM Plex Mono, uppercase, letter-spaced. Metadata, eyebrows, status.
- **Board preview** — scaled per board product variant. The renderer owns its own type sizing.

Instrument Serif is reserved for the product name and rare display moments (empty states, section titles). If serif appears on every card, it's doing nothing.

---

## Layout

### Composition view (primary surface)

```
+---------------------------------------------+
|  Chat thread (1fr)  |  Board canvas (380px) |
+---------------------------------------------+
```

No sidebar visible during composition. Board selector is inline in the chat header or a minimal top bar.

### Navigation

Sidebar with nav items only visible when not in composition mode, or collapsed to icons. Nav items: Chat, Boards, Library, Data Sources, Settings. Active item gets `--line-medium` border + strong text.

### Max page width

`min(1440px, 100vw - 40px)`

### Section rhythm

`--space-9` (56px) between sections, `--space-6` between cards.

---

## Voice and tone (UI copy)

- Second-person: "Your board is live." Never "I" — Matrix is a tool.
- Declarative, never conversational filler: "Sign in to run your boards." not "Let's get you signed in."
- No emoji in UI chrome. Ever.
- No exclamation marks in system copy.
- Sentence case for headlines and buttons with one decisive verb.
- Mono metadata in UPPERCASE with `0.08em` letter-spacing.

---

## Icons

Lucide (CDN or bundled). 1.5px stroke, 24px grid. Icons are 16–20px, never bigger than body copy. Color inherits `currentColor`.

---

## Stop conditions for prototype or primitive work

Halt and surface if any of these are true:

- A proposed component doesn't clear the five-minute-user test.
- A proposed state would introduce a fourth type size, or reintroduce a status badge beyond the green dot.
- A proposed layout would give any element more visual weight than the Vestaboard preview on screens that include one.
- A proposed surface adds a dashboard, analytics, or calendar page outside the four nav destinations.
